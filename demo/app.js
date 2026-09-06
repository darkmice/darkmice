const scenarios = {
  release: {
    id: 'M-1042', title: '修复折扣码导致的结账金额回归',
    goal: '保留现有税费逻辑；总金额必须确定性计算，重复提交不得产生二次扣款。',
    risk: 'HIGH', network: 'RESTRICTED', constraints: ['no schema change', 'idempotent submit', 'keep tax rules'],
    files: [['src/domain/totals.ts', '+18 −7'], ['tests/checkout.spec.ts', '+42 −0'], ['artifacts/verification.json', '+31 −0']],
    events: [
      ['intake','dispatch','目标与 3 条约束已写入任务契约'],
      ['plan','planner','建立 reproduce → patch → counter-test 依赖链'],
      ['implement','edge','创建隔离工作区 ws_demo_1042'],
      ['implement','agent','定位折扣在税费后被重复应用的分支','change'],
      ['verify','validator','反例失败：相同幂等键仍触发第二次计算','error'],
      ['implement','agent','增加 committed / processing 状态分支并保留失败证据'],
      ['verify','validator','12 个回归 + 4 个反例通过','tests'],
      ['package','artifact','生成可检查 diff 与验证报告','artifact'],
      ['package','ledger','封存 9 条事件，等待人工验收','audit']
    ]
  },
  feature: {
    id: 'M-1088', title: '交付可审计的 CSV 导出能力',
    goal: '只导出当前租户可见字段；大数据集采用流式写出，取消操作不得留下半成品。',
    risk: 'MEDIUM', network: 'OFFLINE', constraints: ['tenant scoped', 'streaming output', 'cancel safe'],
    files: [['src/export/job.ts', '+64 −3'], ['tests/export.spec.ts', '+55 −0'], ['artifacts/sample.csv', '+24 −0']],
    events: [
      ['intake','dispatch','权限、规模与取消语义已进入任务契约'],
      ['plan','planner','拆分授权查询、流式编码、原子落盘三阶段'],
      ['implement','edge','离线工作区已就绪；外部网络已禁用'],
      ['implement','agent','实现临时文件写入与成功后原子重命名','change'],
      ['verify','validator','反例失败：取消后残留 .partial 文件','error'],
      ['implement','agent','补充 abort 清理并记录取消原因'],
      ['verify','validator','权限边界、10k 行流式导出、取消清理通过','tests'],
      ['package','artifact','生成脱敏示例与验证报告','artifact'],
      ['package','ledger','封存 9 条事件，等待人工验收','audit']
    ]
  },
  incident: {
    id: 'M-1117', title: '恢复失联 Worker 上的预览服务',
    goal: '不丢失工作区；仅在共享存储可见时迁移，旧 Worker 恢复后不得重新取得所有权。',
    risk: 'CRITICAL', network: 'ALLOWLIST', constraints: ['shared storage only', 'generation fence', 'preserve audit trail'],
    files: [['runtime/route.json', '+8 −4'], ['tests/fencing.spec.ts', '+37 −0'], ['artifacts/recovery.json', '+28 −0']],
    events: [
      ['intake','dispatch','恢复目标与不可迁移条件已确认'],
      ['plan','planner','检查存储可见性、健康目标与 owner generation'],
      ['implement','scheduler','选择容量最低的健康 Worker'],
      ['implement','runtime','递增 generation 并切换预览路由','change'],
      ['verify','validator','反例失败：旧 generation 请求未被拒绝','error'],
      ['implement','runtime','在执行与路由入口增加 fencing 校验'],
      ['verify','validator','工作区哈希、路由与旧所有者拒绝均通过','tests'],
      ['package','artifact','生成恢复时间线与一致性报告','artifact'],
      ['package','ledger','封存 9 条事件，等待人工验收','audit']
    ]
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const state = { scenario: 'release', cursor: 0, timer: null, paused: false, ready: false, injected: false, disconnected: false };
const phaseOrder = ['intake', 'plan', 'implement', 'verify', 'package'];

function now() {
  const seconds = 12 + state.cursor * 3;
  return `09:41:${String(seconds).padStart(2, '0')}`;
}

function log(source, message, tone = '') {
  const row = document.createElement('div');
  row.className = `log ${tone}`;
  row.innerHTML = `<time>${now()}</time><b>${source.toUpperCase()}</b><span>${message}</span>`;
  $('#terminal').append(row);
  $('#terminal').scrollTop = $('#terminal').scrollHeight;
}

function setMissionState(label, tone) {
  const el = $('#mission-state');
  el.textContent = label;
  el.className = tone;
}

function renderScenario() {
  const s = scenarios[state.scenario];
  $('#mission-id').textContent = s.id;
  $('#mission-title').textContent = s.title;
  $('#mission-goal').textContent = s.goal;
  $('#risk-level').textContent = s.risk;
  $('#network-policy').textContent = s.network;
  $('#constraints').innerHTML = s.constraints.map(item => `<span class="chip">${item}</span>`).join('');
  reset(false);
}

function updatePipeline(activePhase) {
  const completed = new Set();
  scenarios[state.scenario].events.slice(0, state.cursor).forEach(([phase]) => {
    const activeIndex = phaseOrder.indexOf(activePhase);
    phaseOrder.forEach((p, index) => { if (index < activeIndex) completed.add(p); });
    if (phase === 'package' && state.cursor === scenarios[state.scenario].events.length) completed.add('package');
  });
  $$('#pipeline li').forEach(li => {
    li.className = '';
    const phase = li.dataset.phase;
    const label = li.querySelector(':scope > span');
    if (completed.has(phase)) { li.classList.add('done'); label.textContent = 'DONE'; }
    else if (phase === activePhase) { li.classList.add('running'); label.textContent = 'RUNNING'; }
    else label.textContent = 'QUEUED';
  });
  const doneCount = $$('#pipeline li.done').length;
  $('#plan-counter').textContent = `${doneCount} / 5`;
}

function addEvidence(key) {
  if (!key || !['change','tests','artifact','audit'].includes(key)) return;
  const li = $(`[data-evidence="${key}"]`);
  li.classList.add('done');
  li.querySelector('b').textContent = 'VERIFIED';
  const count = $$('.evidence-list li.done').length;
  $('#evidence-count').textContent = `${count} / 4`;
  if (key === 'change') renderFiles();
}

function renderFiles() {
  $('#files').innerHTML = scenarios[state.scenario].files.map(([path, delta]) => `<li><span>${path}</span><em>${delta}</em></li>`).join('');
}

function step() {
  const s = scenarios[state.scenario];
  if (state.cursor >= s.events.length) return completeRun();
  const [phase, source, message, flag] = s.events[state.cursor];
  updatePipeline(phase);
  log(source, message, flag === 'error' ? 'error' : flag ? 'ok' : '');
  addEvidence(flag);
  state.cursor += 1;
  $('#lease').textContent = `LEASE ${String(24 - state.cursor).padStart(2, '0')}s`;
  if (state.cursor >= s.events.length) completeRun();
}

function run() {
  if (state.ready) return;
  if (state.disconnected) {
    state.disconnected = false;
    log('scheduler', '模拟旧租约过期；从浏览器内游标恢复同一派工', 'warn');
  } else if (state.cursor === 0) {
    log('control', `模拟派工 ${scenarios[state.scenario].id} 已获得 30s 租约`);
  } else {
    log('control', '执行已恢复；历史事件保持不变');
  }
  state.paused = false;
  setMissionState('RUNNING', 'tone-running');
  $('#run').textContent = '● 执行中';
  clearInterval(state.timer);
  step();
  state.timer = setInterval(step, 760);
}

function pause() {
  if (!state.timer || state.ready) return;
  clearInterval(state.timer); state.timer = null; state.paused = true;
  setMissionState('PAUSED', 'tone-warn');
  $('#run').textContent = '▶ 继续';
  log('control', '人工暂停；浏览器内执行游标已保留', 'warn');
}

function injectConstraint() {
  if (state.injected || state.ready) return;
  state.injected = true;
  const chip = document.createElement('span');
  chip.className = 'chip new'; chip.textContent = 'no new dependency';
  $('#constraints').append(chip);
  log('human', '新增约束：不得引入第三方依赖；仅约束后续步骤', 'warn');
}

function disconnect() {
  if (state.ready || state.cursor === 0) return;
  clearInterval(state.timer); state.timer = null; state.disconnected = true;
  setMissionState('RECONNECT', 'tone-warn');
  $('#run').textContent = '▶ 恢复同一派工';
  $('#lease').textContent = 'LEASE EXPIRED';
  log('edge', '模拟 Worker 心跳中断；未创建重复派工', 'error');
}

function completeRun() {
  clearInterval(state.timer); state.timer = null; state.ready = true;
  updatePipeline('');
  $$('#pipeline li').forEach(li => { li.className = 'done'; li.querySelector(':scope > span').textContent = 'DONE'; });
  $('#plan-counter').textContent = '5 / 5';
  setMissionState('REVIEW', 'tone-ready');
  $('#lease').textContent = 'LEASE CLOSED';
  $('#run').textContent = '✓ 已提交';
  $('#score').textContent = state.injected ? '96' : '93';
  $('#verdict-title').textContent = '交付包已就绪，等待人工决定';
  $('#verdict-detail').textContent = '4/4 项证据已收集；失败记录和修复结果均已保留。';
  $('#accept').disabled = false; $('#reject').disabled = false;
}

function verdict(accepted) {
  $('#accept').disabled = true; $('#reject').disabled = true;
  if (accepted) {
    setMissionState('ACCEPTED', 'tone-ready');
    $('#verdict-title').textContent = '交付已由人工接受';
    $('#verdict-detail').textContent = '决定、证据摘要和事件游标已写入最终记录。';
    log('human', '接受交付；最终决定不由执行 Agent 自签', 'ok');
  } else {
    setMissionState('REJECTED', 'tone-warn');
    $('#verdict-title').textContent = '交付已驳回，原证据保留';
    $('#verdict-detail').textContent = '在真实系统中，驳回原因会形成新的约束与后续派工。';
    log('human', '驳回交付；保留当前证据包并创建后续动作', 'warn');
  }
}

function reset(clearSelection = true) {
  clearInterval(state.timer);
  Object.assign(state, { cursor: 0, timer: null, paused: false, ready: false, injected: false, disconnected: false });
  $('#terminal').innerHTML = '';
  $('#files').innerHTML = '<li class="empty">等待 Agent 产出…</li>';
  $$('.evidence-list li').forEach(li => { li.className = ''; li.querySelector('b').textContent = 'PENDING'; });
  $('#evidence-count').textContent = '0 / 4';
  $('#score').textContent = '—';
  $('#verdict-title').textContent = '尚未具备验收条件';
  $('#verdict-detail').textContent = '必须先完成全部阶段，并收集 4/4 项证据。';
  $('#accept').disabled = true; $('#reject').disabled = true;
  $('#run').textContent = '▶ 运行任务';
  $('#lease').textContent = 'LEASE —';
  setMissionState('READY', 'tone-idle');
  updatePipeline('');
  if (clearSelection) renderScenario();
}

$$('.scenario').forEach(button => button.addEventListener('click', () => {
  $$('.scenario').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  state.scenario = button.dataset.scenario;
  renderScenario();
}));
$('#run').addEventListener('click', run);
$('#pause').addEventListener('click', pause);
$('#constraint').addEventListener('click', injectConstraint);
$('#disconnect').addEventListener('click', disconnect);
$('#reset').addEventListener('click', () => reset());
$('#accept').addEventListener('click', () => verdict(true));
$('#reject').addEventListener('click', () => verdict(false));

renderScenario();

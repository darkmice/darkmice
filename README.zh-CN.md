<p align="center">
  <img src="./assets/profile-hero.svg" alt="Dark — AI 原生系统、数据基础设施与产品工程" width="100%" />
</p>

<p align="center">
  <a href="https://github.com/darkmice/darkmice/blob/main/README.md">English</a>
  ·
  <strong>简体中文</strong>
</p>

<p align="center">
  <strong>把 AI 能力做成可运行、可交付、可验证的系统。</strong><br />
  <sub>我关注的不只是模型能力，更是它如何进入真实产品并稳定完成工作。</sub>
</p>

<p align="center">
  <a href="https://github.com/darkmice?tab=repositories">项目</a>
  ·
  <a href="https://darkmice.github.io/darkmice/demo/">在线 Demo</a>
  ·
  <a href="./case-studies/README.zh-CN.md">工程案例</a>
  ·
  <a href="https://github.com/talon-org">Talon 组织</a>
  ·
  <a href="https://formilyjs.org/">Formily</a>
</p>

---

### 我在构建什么

| | 方向 | 落到实际系统里 |
|---|---|---|
| **01** | **AI 执行系统** | Agent 编排、本地执行、工具协议、沙箱，以及有人参与决策和验收的交付闭环。 |
| **02** | **AI 原生数据基础设施** | 将 SQL、KV、时序、消息队列、向量、全文检索、GEO、图与 AI 能力整合进统一运行时。 |
| **03** | **开发者产品** | 从产品定义和交互设计，到 SDK、组件系统、桌面客户端、文档、打包与发布流程。 |
| **04** | **质量系统** | 以证据为基础的工程方法：对抗审查、明确风险边界、失败路径测试和可核验验收。 |

### 公开证据与披露边界

我的主要生产项目大多是私有仓库。下列标签只描述链接指向的公开材料，不代表读者可以独立核验私有生产实现。

| 证据 | 你可以检查什么 |
|---|---|
| [**Evidence Lab →**](https://darkmice.github.io/darkmice/demo/) **`Live Demo`** | 仅在浏览器内运行的 clean-room 模拟：任务步骤、人工干预、模拟重连、证据和最终验收门。 |
| [**工程案例 →**](./case-studies/README.zh-CN.md) **`Case Study`** | 三篇中英文案例，分别展示 Agent 交付、多模型数据引擎和可恢复 Coding Sandbox。 |
| [**Talon 发行版 →**](https://github.com/darkmice/talon-bin/releases/latest) **`Public Release`** | 跨平台二进制与库；SHA-256 只验证文件完整性，不验证发布者身份。 |
| [**公开仓库 →**](https://github.com/darkmice?tab=repositories) **`Public Code`** | 数据、MCP、结构化文档、UI 和质量工作流的可检查实现。 |

### 代表项目

| 项目 | 核心方向 | 证据类型 |
|---|---|---|
| [**Formily**](https://github.com/alibaba/formily) | 跨端高性能表单方案；[贡献记录可核验](https://github.com/alibaba/formily/commits?author=darkmice) | **`Open Source`** |
| [**Talon Pilot Studio**](https://github.com/darkmice/talon-pilot-studio) | 任务拆解、执行可见性、预览和验收的公开产品界面；不含私有编排实现 | **`Public Code`** · **`Case Study`** |
| [**Talon**](https://github.com/darkmice/talon-bin) | SQL · KV · 时序 · MQ · 向量 · 全文 · GEO · 图 · AI 的统一运行时 | **`Public Release`** · **`Case Study`** |
| [**Talon MCP**](https://github.com/darkmice/talon-mcp) | 覆盖 Talon 九类引擎的 38 个有边界 MCP 工具 | **`Public Code`** |
| [**Talon Doc Runtime**](https://github.com/darkmice/talon-doc-runtime) | 30+ 语义组件，用紧凑 DSL 生成交互交付物 | **`Open Source`** · **`Live Demo`** |
| [**Talon UI**](https://github.com/darkmice/talon-ui) | 设计令牌与包含 45 个组件的 React 产品系统 | **`Open Source`** |
| [**Dark Tribunal**](https://github.com/darkmice/dark-team-review) | 将风险分级对抗审查连接到实现与验收证据 | **`Public Code`** |

### 我的工作方法

```text
产品目标
    ↓
系统边界  →  协议与数据模型  →  实现
    ↓                         ↓
风险账本  ←  对抗审查        ←  证据
    ↓
可验证交付
```

- **产品目标先于技术管线**——先明确系统必须改善的决策或工作流程。
- **建立唯一事实源**——把协议、状态归属和责任边界写清楚。
- **在重要处坚持本地优先**——尽可能让执行过程和数据留在用户控制之下。
- **证据胜过乐观判断**——测试变绿或代码推送成功，不等于结果已经通过验收。

### 用来完成交付的技术栈

<p>
  <img src="https://img.shields.io/badge/Rust-111827?style=flat-square&logo=rust&logoColor=white" alt="Rust" />
  <img src="https://img.shields.io/badge/TypeScript-111827?style=flat-square&logo=typescript&logoColor=60A5FA" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-111827?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Go-111827?style=flat-square&logo=go&logoColor=00ADD8" alt="Go" />
  <img src="https://img.shields.io/badge/Node.js-111827?style=flat-square&logo=nodedotjs&logoColor=5FA04E" alt="Node.js" />
  <img src="https://img.shields.io/badge/Docker-111827?style=flat-square&logo=docker&logoColor=2496ED" alt="Docker" />
  <img src="https://img.shields.io/badge/MCP-111827?style=flat-square&logoColor=white" alt="Model Context Protocol" />
</p>

<p align="center">
  <sub>持续构建 AI Agent、数据系统、产品工程与交付质量的交叉能力。</sub>
</p>

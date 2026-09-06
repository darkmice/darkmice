# 一个运行时，九类数据模型

**证据：** Public Code · [Public Release](https://github.com/darkmice/talon-bin/releases/latest) · [MCP 集成](https://github.com/darkmice/talon-mcp)

[English](./talon-data-engine.md) · [全部案例](./README.zh-CN.md)

## 问题

很多 Agent 应用在产品工作开始前，就要先拼接 SQL 数据库、缓存、向量库、搜索引擎、消息队列和追踪系统。每增加一个服务，就增加一组部署、凭据、故障与数据同步边界。

Talon 选择另一种取舍：把 SQL、KV、时序、消息队列、向量、全文检索、GEO、图，以及面向 AI 的数据能力放进一个可嵌入运行时和一个可分发二进制中。

## 架构

```text
SDK / CLI / MCP / HTTP / TCP
             │
         命令与查询边界
             │
 ┌───────────┼─────────────────────────────┐
 SQL   KV   时序  MQ  向量  全文  GEO  图
 └───────────┼─────────────────────────────┘
        会话 / 记忆 / RAG / 追踪
             │
        嵌入式或服务端部署
```

## 关键决策与取舍

- **统一分发边界。** 同一引擎既能作为库嵌入，也能作为服务运行；打包更复杂，但本地优先产品不必维护一组外部服务。
- **保留每类模型的有效语义。** 向量、队列、图和 SQL 不被压扁成最低公分母 API，同时共享部署和管理边界。
- **把 Agent 访问设计成协议面。** 公开 MCP 服务用 38 个有边界的工具映射九类引擎，而不是让 Agent 任意生成底层命令。
- **让发行物成为证据。** 跨平台二进制和库同时发布 `SHA256SUMS.txt`，比 README 中的宣传句更可核验。

## 关键失败路径

下列发行与 MCP 表面可以公开检查；发行包中的 AI/LLM/Agent 内部实现仍为私有，其细节属于自述，不作为公开源码证据。

| 风险 | 设计响应 |
|---|---|
| 模型流被 TCP 分片截断 | 按字节安全解析 SSE，并显式处理终态事件。*（私有实现说明）* |
| 某一引擎独占资源 | 在共享运行时边界内设置引擎级限制。 |
| 嵌入模式与服务模式漂移 | 共享命令语义，由不同适配器承接部署差异。 |
| Agent 工具输入错误 | 使用类型化工具 Schema 和有边界的操作面。 |
| 发行来源不清晰 | 版本化产物加公开校验文件。 |

## 公开证据

- [Talon 二进制与库](https://github.com/darkmice/talon-bin)——公开仓库、快速开始、跨平台发行产物和校验方式。
- [最新发行版](https://github.com/darkmice/talon-bin/releases/latest)——可下载的服务端与库包。
- [Talon MCP](https://github.com/darkmice/talon-mcp)——Agent 工具到九类引擎的公开映射。
- [Talon Doc Runtime](https://darkmice.github.io/talon-doc-runtime/)——把 Agent 输出变成结构化交互交付物的独立在线示例。

## 这个案例展示的能力

Rust 系统工程、多模型 API 设计、嵌入式/服务端边界、FFI 与分发、Agent 协议集成，以及发行验真。

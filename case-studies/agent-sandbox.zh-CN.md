# 给 Coding Agent 一台可恢复的电脑

**证据：** [Product Site](https://sandbox.talon.net.cn/) · Case Study · [Clean-room Demo](../demo/)

[English](./agent-sandbox.md) · [全部案例](./README.zh-CN.md)

## 问题

Coding Agent 需要的不只是一个容器进程。它需要工作区、交互终端、长驻进程、浏览器、预览路由、网络策略、暂停与恢复、审计事件，以及 Worker 消失后的恢复方案。

## 系统边界

```text
Agent / 用户 / SDK
        │
控制面：认证 · 生命周期 · 路由 · 审计
        │
Worker：进程监管 · PTY · 浏览器 · 预览
        │
运行时：OCI bundle · Namespace · cgroup v2 · seccomp
        │
工作区卷 + 运行元数据 + 只追加事件
```

控制面决定谁可以做什么、沙箱位于哪里；Worker 负责执行；运行时负责约束。工作区原始文件与控制面元数据必须分开管理。

## 私有实现说明

以下内容是 2026-09-06 本地私有代码检查后的自述清单：OCI/runc；mount、PID、network、IPC、UTS Namespace；cgroup v2 资源控制；只读根文件系统与可写工作区；精简 capabilities；`NoNewPrivileges`；默认 seccomp allowlist；offline、restricted-egress、full-egress 三种网络模式；生命周期、进程与文件系统 API；PTY；Chromium/CDP；签名预览 URL。

公开读者无法独立核验这份清单，因此它不作为公开实现证据。

## 关键决策与取舍

- **控制面和数据面分开。** 元数据、所有权、策略与路由，不和工作区、浏览器 Profile、产物文件混为一谈。
- **工作区是一等持久资源。** 进程停止不应抹掉项目；恢复能力更强，但调度和放置会更复杂。
- **预览是一种有限能力。** 签名 URL 只授权一个沙箱和端口，不能因此获得控制面权限。
- **保守迁移。** Worker 死亡并不等于一定能迁移；如果数据在其他节点不可见，就不应自动制造“已恢复”的假象。
- **说清隔离上限。** 当前运行时不被包装成可以安全执行任意外部恶意代码。

## 显式处理的失败路径

| 失败 | 系统必须怎么做 |
|---|---|
| Worker 心跳过期 | 只有共享存储可见、存在健康目标且冷却期允许时才迁移。 |
| 网络策略受限 | 保留必要 DNS 行为，其余出站流量继续拒绝。 |
| 预览 Token 泄漏 | 只允许访问一个沙箱和端口，不能调用控制 API。 |
| 浏览器或 Dev Server 仍在运行 | 暂停、恢复和进程状态必须明确呈现。 |
| 当前隔离强度不足 | 转入更强隔离层，或拒绝这类工作负载。 |

## 不作为已实现能力宣传

gVisor 和 Firecracker 是更强隔离的演进方向，不是当前公开能力。多节点高可用，以及安全执行任意恶意代码，也不在本案例的声明范围内。

## 读者可以公开核验什么

[Talon Sandbox 产品站](https://sandbox.talon.net.cn/)公开展示产品定位，并提供文档、Playground 和登录入口。站点文案不被视为独立实现证据。

[Evidence Lab](../demo/)用假数据演示生命周期、策略、Worker 丢失、重试、证据和验收行为。它不复制任何私有源码，也不冒充生产沙箱。

## 这个案例展示的能力

安全边界判断、运行时生命周期设计、Linux 隔离原语、浏览器/PTY/工作区的产品集成、恢复策略，以及诚实的能力披露。

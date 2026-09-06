<p align="center">
  <img src="./assets/profile-hero.svg" alt="Dark — AI-native systems, data infrastructure, and product engineering" width="100%" />
</p>

<p align="center">
  <strong>English</strong>
  ·
  <a href="https://github.com/darkmice/darkmice/blob/main/README.zh-CN.md">简体中文</a>
</p>

<p align="center">
  <strong>把 AI 能力做成可运行、可交付、可验证的系统。</strong><br />
  <sub>I turn AI capabilities into systems that can run, ship, and earn trust.</sub>
</p>

<p align="center">
  <a href="https://github.com/darkmice?tab=repositories">Projects</a>
  ·
  <a href="https://darkmice.github.io/darkmice/demo/">Live Demo</a>
  ·
  <a href="./case-studies/README.md">Case Studies</a>
  ·
  <a href="https://www.talon.net.cn/">Talon</a>
  ·
  <a href="https://sandbox.talon.net.cn/">Sandbox</a>
  ·
  <a href="https://formilyjs.org/">Formily</a>
</p>

---

### What I build

| | Direction | What it means in practice |
|---|---|---|
| **01** | **AI execution systems** | Agent orchestration, local execution, tool protocols, sandboxing, and human-in-the-loop delivery. |
| **02** | **AI-native data infrastructure** | Multi-model data engines that bring SQL, KV, time series, queues, vectors, full-text search, GEO, graph, and AI into one runtime. |
| **03** | **Developer products** | From product definition and interaction design to SDKs, component systems, desktop clients, docs, packaging, and release workflows. |
| **04** | **Quality systems** | Evidence-first engineering: adversarial review, explicit risk boundaries, failure-path testing, and verifiable acceptance. |

### Public evidence and disclosure boundaries

Most production work is private. Each label below describes only the linked public artifact; it does not make private production implementation independently verifiable.

| Evidence | What you can inspect |
|---|---|
| [**Evidence Lab →**](https://darkmice.github.io/darkmice/demo/) **`Live Demo`** | A browser-only clean-room simulation of task steps, intervention, reconnect behavior, evidence, and a human acceptance gate. |
| [**Engineering case studies →**](./case-studies/README.md) **`Case Study`** | Three bilingual deep dives covering agent delivery, a multi-model data engine, and a recoverable coding sandbox. |
| [**Talon releases →**](https://github.com/darkmice/talon-bin/releases/latest) **`Public Release`** | Cross-platform binaries and libraries; SHA-256 checksums verify file integrity, not publisher identity. |
| [**Talon**](https://www.talon.net.cn/) · [**Talon Sandbox**](https://sandbox.talon.net.cn/) **`Product Site`** | Public product positioning, documentation, download, Playground, and sign-in entry points; not implementation proof. |
| [**Public repositories →**](https://github.com/darkmice?tab=repositories) **`Public Code`** | Inspectable implementation across data, MCP, structured documents, UI, and quality workflows. |

### Selected work

| Project | Focus | Evidence |
|---|---|---|
| [**Formily**](https://github.com/alibaba/formily) | Cross-device, high-performance form solution; [verified contributions](https://github.com/alibaba/formily/commits?author=darkmice) | **`Open Source`** |
| [**Talon Pilot Studio**](https://github.com/darkmice/talon-pilot-studio) | Public product surface for task decomposition, execution visibility, previews, and acceptance; private orchestration is excluded | **`Public Code`** · **`Case Study`** |
| [**Talon**](https://www.talon.net.cn/) | SQL · KV · TimeSeries · MQ · Vector · FTS · GEO · Graph · AI in one runtime | **`Product Site`** · **`Public Release`** · **`Case Study`** |
| [**Talon Sandbox**](https://sandbox.talon.net.cn/) | A recoverable computer boundary for coding agents: workspace, terminal, browser, preview, and policy | **`Product Site`** · **`Case Study`** |
| [**Talon MCP**](https://github.com/darkmice/talon-mcp) | 38 bounded MCP tools across all nine Talon engines | **`Public Code`** |
| [**Talon Doc Runtime**](https://github.com/darkmice/talon-doc-runtime) | 30+ semantic components; compact DSL to interactive deliverables | **`Open Source`** · **`Live Demo`** |
| [**Talon UI**](https://github.com/darkmice/talon-ui) | Design tokens and a 45-component React product system | **`Open Source`** |
| [**Dark Tribunal**](https://github.com/darkmice/dark-team-review) | Risk-driven adversarial review connected to implementation and acceptance evidence | **`Public Code`** |

### My working model

```text
Product intent
    ↓
System boundary  →  Protocol & data model  →  Implementation
    ↓                                          ↓
Risk ledger      ←  Counter-review        ←  Evidence
    ↓
Verified delivery
```

- **Product before plumbing** — start from the decision or workflow the system must improve.
- **One source of truth** — make contracts, state ownership, and responsibility boundaries explicit.
- **Local-first where it matters** — keep execution and data under the user's control when possible.
- **Evidence over optimism** — a green test or a pushed commit is not the same as an accepted outcome.

### Stack I use to ship

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
  <sub>Building at the intersection of AI agents, data systems, product engineering, and delivery quality.</sub>
</p>

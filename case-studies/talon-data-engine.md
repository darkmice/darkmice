# One runtime, nine data models

**Evidence:** Public Code · [Public Release](https://github.com/darkmice/talon-bin/releases/latest) · [MCP integration](https://github.com/darkmice/talon-mcp)

[简体中文](./talon-data-engine.zh-CN.md) · [All cases](./README.md)

## The problem

Agent applications frequently assemble a SQL database, cache, vector store, search engine, queue, and tracing stack before product work begins. Each service adds deployment, credentials, failure modes, and data synchronization boundaries.

Talon explores the opposite trade-off: put SQL, KV, time series, message queue, vector, full-text search, GEO, graph, and AI-facing data primitives behind one embeddable runtime and one distributable binary.

## Architecture

```text
SDK / CLI / MCP / HTTP / TCP
             │
      command and query boundary
             │
 ┌───────────┼─────────────────────────────┐
 SQL   KV   TS   MQ   Vector   FTS   GEO   Graph
 └───────────┼─────────────────────────────┘
       session / memory / RAG / trace
             │
      embedded or server deployment
```

## Decisions and trade-offs

- **One distribution boundary.** The same engine can be embedded as a library or run as a server. Packaging gets harder, but local-first products avoid a fleet of services.
- **Model-specific APIs over a lowest-common-denominator API.** Vector search, queues, graphs, and SQL keep their useful semantics while sharing deployment and administration.
- **Agent access as a protocol surface.** The public MCP server maps 38 tools to the nine engines instead of making an agent generate unbounded raw commands.
- **Release artifacts as evidence.** Cross-platform binaries and libraries ship with `SHA256SUMS.txt`, making a downloadable build more meaningful than a README claim.

## Failure paths that matter

The distribution and MCP surfaces below are publicly inspectable. AI/LLM/Agent internals bundled with the release are private; their implementation details remain self-reported rather than public-source evidence.

| Risk | Design response |
|---|---|
| Partial or fragmented model streams | Byte-safe SSE parsing and explicit terminal events. *(private implementation description)* |
| A single engine monopolizes resources | Engine-specific limits behind a shared runtime boundary. |
| Embedded and server modes drift | Shared command semantics with separate adapters. |
| Agent tool input is malformed | Typed tool schemas and bounded operation surfaces. |
| Release provenance is unclear | Versioned artifacts plus published checksums. |

## Public evidence

- [Talon binaries and libraries](https://github.com/darkmice/talon-bin) — public repository, quick starts, cross-platform release artifacts, and checksum verification.
- [Latest release](https://github.com/darkmice/talon-bin/releases/latest) — downloadable server/library bundles.
- [Talon MCP](https://github.com/darkmice/talon-mcp) — public mapping from agent tools to all nine engines.
- [Talon Doc Runtime](https://darkmice.github.io/talon-doc-runtime/) — a separate live example of turning agent output into an interactive, structured deliverable.

## What this demonstrates

Rust systems engineering, multi-model API design, embedded/server boundaries, FFI and distribution, agent protocol integration, and release verification.

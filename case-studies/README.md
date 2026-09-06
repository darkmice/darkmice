# Engineering case studies

Private source code should not be the only way to evaluate engineering ability. These notes expose the problem framing, system boundaries, trade-offs, failure paths, and evidence without copying customer data or proprietary implementation.

[简体中文](./README.zh-CN.md)

## Evidence labels

| Label | Meaning |
|---|---|
| **Open Source** | Public implementation with an explicit open-source license. |
| **Public Code** | Source is publicly inspectable; no license grant is implied. |
| **Public Release** | Versioned artifacts and SHA-256 checksums are available; checksums verify file integrity, not publisher identity. |
| **Product Site** | A public product, documentation, or access surface; its marketing claims are not automatically implementation evidence. |
| **Live Demo** | A browser-operable synthetic implementation illustrates the interaction; backend and production behavior are not implied. |
| **Case Study** | Problem framing and engineering reasoning are public; implementation claims remain self-reported unless separately linked. |

## Cases

| Case | Engineering focus | Public material |
|---|---|---|
| [Acceptance-first agent delivery](./talon-pilot.md) | Durable orchestration, product workflow, explicit acceptance | **Case Study** · [Browser simulation](../demo/) |
| [One runtime, nine data models](./talon-data-engine.md) | Rust systems engineering, protocol surfaces, packaging | **Product Site** · **Public Code** · **Public Release** |
| [A recoverable computer for coding agents](./agent-sandbox.md) | Isolation boundaries, lifecycle design, browser/PTY/workspace integration | **Product Site** · **Case Study** · [Browser simulation](../demo/) |

## Disclosure boundary

The diagrams use generalized names and synthetic data. They exclude private source, credentials, customer identities, internal domains, production topology, and operational data. A statement marked **Case Study** describes an engineering approach, not independently inspectable source code.

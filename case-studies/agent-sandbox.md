# A recoverable computer for coding agents

**Evidence:** Case Study · [Clean-room Demo](../demo/)

[简体中文](./agent-sandbox.zh-CN.md) · [All cases](./README.md)

## The problem

A coding agent needs more than a container process. It needs a workspace, interactive terminal, long-running processes, a browser, preview routing, network policy, pause/resume behavior, audit events, and a recovery story when a worker disappears.

## System boundary

```text
Agent / user / SDK
        │
 control plane: auth · lifecycle · routing · audit
        │
 worker: process supervisor · PTY · browser · preview
        │
 runtime: OCI bundle · namespaces · cgroup v2 · seccomp
        │
 workspace volume + runtime metadata + append-only events
```

The control plane decides who may do what and where a sandbox lives. The worker executes. The runtime constrains. Workspace bytes are not confused with control-plane metadata.

## Private implementation described

The following is a self-reported inventory from a local private-code review on 2026-09-06. It includes OCI/runc execution; mount, PID, network, IPC, and UTS namespaces; cgroup v2 resource controls; a read-only root with a writable workspace; reduced capabilities; `NoNewPrivileges`; a default seccomp allowlist; offline, restricted-egress, and full-egress modes; lifecycle/process/filesystem APIs; PTY; Chromium/CDP; and signed preview URLs.

Public readers cannot independently verify this inventory, so it is not presented as public implementation evidence.

## Decisions and trade-offs

- **Separate control and data planes.** Metadata, ownership, policy, and routing remain distinct from workspaces, browser profiles, and artifacts.
- **Workspace as a durable first-class resource.** A stopped process should not erase the project. This improves recovery but complicates placement.
- **Preview is a scoped capability.** Signed, sandbox-and-port-scoped URLs expose applications without granting control-plane access.
- **Conservative reassignment.** A dead worker is not enough reason to move a sandbox if its data is not visible on another worker.
- **Name the isolation ceiling.** The current runtime is not presented as safe for arbitrary hostile multi-tenant code.

## Failure paths treated explicitly

| Failure | Required behavior |
|---|---|
| Worker heartbeat expires | Reassign only when storage is shared, a live target exists, and cooldown permits it. |
| Network policy is restrictive | Preserve required DNS behavior while denying other egress. |
| Preview token leaks | Limit it to one sandbox and port; never authorize control APIs. |
| Browser or dev server is still running | Pause/resume and process state must remain explicit. |
| Runtime isolation is insufficient | Route to a stronger isolation tier or refuse the workload. |

## Not claimed as implemented

gVisor and Firecracker are stronger-isolation directions, not current public capabilities. Multi-node high availability and safe execution of arbitrary hostile code are also outside the claim.

## What can be verified publicly

The [Evidence Lab](../demo/) uses synthetic data to demonstrate lifecycle, policy, worker-loss, retry, evidence, and acceptance behavior. It copies no private source and does not pretend to be the production sandbox.

## What this demonstrates

Security-boundary reasoning, runtime lifecycle design, Linux isolation primitives, browser/PTY/workspace product integration, recovery policy, and honest capability disclosure.

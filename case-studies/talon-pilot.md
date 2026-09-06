# Acceptance-first agent delivery

**Evidence:** Case Study · [Clean-room Demo](../demo/) · [Public product surface](https://github.com/darkmice/talon-pilot-studio)

[简体中文](./talon-pilot.zh-CN.md) · [All cases](./README.md)

## The problem

An agent producing a plausible answer is not the same as software being delivered. Real delivery needs durable task state, resumable execution, visible artifacts, independent validation, and a final decision owned by a person or policy—not by the agent that wrote the code.

## System boundary

```text
Conversation / project intent
            │
            ▼
  durable dispatch ledger ─────► dependency + timer scheduler
            │                                │
            ▼                                ▼
  local execution edge ◄──────── executor capability contract
            │
            ├────► artifacts and changed-file evidence
            └────► runtime events and failure signals
                              │
                              ▼
                 independent validation gate
                              │
                       accept / reject / retry
```

The control plane owns intent, dispatch state, retries, and acceptance. The edge owns the user's workspace and adapts an available coding runtime. Validators consume outputs; they do not silently redefine the task.

## Decisions and trade-offs

- **Conversation as the entry point.** Human instructions, agent work, artifacts, and acceptance stay in one auditable flow. This reduces context loss but requires a clear event contract.
- **Persistent dispatches, not in-memory jobs.** A durable ledger makes retries and reconnects explainable. The cost is more explicit state-machine work.
- **Capability-based executors.** Product semantics remain stable while coding runtimes vary. Provider-native events must be projected without erasing important differences.
- **Acceptance as a separate gate.** Completion is not inferred from a final message or a green command. Evidence must satisfy the declared checks.

## Failure paths treated as product behavior

| Failure | Required behavior |
|---|---|
| Connection drops mid-run | Reconnect to the same dispatch; do not duplicate the job. |
| Worker stops heartbeating | Expire its lease, preserve the ledger, and make retry state visible. |
| Agent says “done” with no artifact | Keep the delivery gate unresolved. |
| A validator fails | Preserve logs and failed evidence; do not overwrite history with a retry. |
| User changes a constraint | Record the new constraint and apply it to subsequent work. |

## What can be verified publicly

- The [public Studio repository](https://github.com/darkmice/talon-pilot-studio) exposes the product-facing command-center work.
- The [Evidence Lab](../demo/) is a clean-room, synthetic state-machine demo of dispatch, dependency, retry, intervention, evidence, and acceptance behavior.
- The production implementation, internal schemas, and operating data remain private. Claims about those details are intentionally not presented as open-source proof.

## What this demonstrates

Product definition across human and agent roles, durable orchestration, protocol design, local/cloud boundary design, failure-state UX, and evidence-based acceptance.

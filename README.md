# Legacy

**Legacy is an independent AI and AI-agent platform.**

This repository is the sole source of truth for Legacy. Its code, architecture, identity, requirements, and roadmap must remain independent from all other projects.

## Product principles

- One unified user experience. Users describe the outcome they want; they do not manually select agents.
- Route by intent, constraints, required capabilities, available tools, and risk.
- Use one capable agent when sufficient. Coordinate multiple agents only when collaboration adds value.
- Treat agent patterns as composable behaviors, not mutually exclusive agent species.
- Verify consequential outputs and report honestly what was and was not executed.
- Apply least-privilege tool access, approval gates for consequential actions, timeouts, budgets, and audit trails.
- Keep provider/model selection behind an internal interface.
- Never claim that a capability is operational until it is implemented and tested.

## Agent pattern catalog

Legacy's design catalog includes these 12 patterns:

1. Reactive
2. Model-based
3. Goal-based
4. Utility-based
5. Learning
6. Planning
7. Tool-using
8. Memory-enabled
9. Autonomous
10. Multi-agent
11. Collaborative / negotiating
12. Critic / evaluator / guardian

These are patterns that may be combined in one agent or workflow, not 12 required separate processes.

## Specialist capability catalog

Legacy's initial specialist roles:

1. Research
2. Data analysis
3. Software development
4. Browser research and navigation
5. Writing and editing
6. Planning and decomposition
7. Workflow automation
8. Customer support
9. Security review
10. Financial analysis
11. Knowledge retrieval
12. Computer-use workflows
13. Testing and quality assurance
14. Monitoring and anomaly detection

Specialist names are internal routing metadata. The user-facing experience remains unified.

## Target execution lifecycle

`request → intent and constraint analysis → capability plan → permission-aware tool/model selection → execution → verification → synthesis → response`

The orchestrator should prefer the simplest sufficient execution plan. It may delegate bounded subtasks to specialists, run independent tasks concurrently where safe, and use a critic/verifier for high-impact or uncertain outputs.

## Initial repository structure

- `src/agents/registry.ts`: typed catalog of patterns and specialist roles.
- `src/orchestration/router.ts`: deterministic capability selection from a normalized request.
- `src/orchestration/planner.ts`: single-agent versus multi-agent plan construction.
- `src/verification/policy.ts`: risk and approval policy primitives.
- `docs/AGENT_CATALOG.md`: full catalog and definitions.
- `tests/`: unit tests for routing and planning.

## Status

This repository starts from an empty baseline. The catalog and foundational code are the first step, not a claim that every external integration, autonomous execution path, or provider is already connected. Real execution adapters, persistent memory, model providers, sandboxing, and end-to-end tests must be implemented and verified before being described as production-ready.

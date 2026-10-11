# Legacy Agent Catalog

## How to interpret this catalog

Agent patterns describe *how* an agent behaves. Specialist roles describe *what work* it performs. These dimensions overlap. For example, the software development specialist can use planning, tool use, memory, bounded autonomy, and critic patterns in the same workflow.

The catalog is internal platform metadata. Users state their desired outcome and constraints; Legacy chooses capabilities internally and returns one synthesized response.

## 12 agent patterns

| Pattern | Purpose | Required design consideration |
|---|---|---|
| Reactive | Responds to current inputs using rules or a policy | Rules must be observable and testable |
| Model-based | Maintains a model of relevant state | Track freshness, uncertainty, and state transitions |
| Goal-based | Chooses actions that advance an outcome | Define measurable completion criteria |
| Utility-based | Ranks options by quality, cost, latency, and risk | Hard safety constraints cannot be traded away |
| Learning | Improves using evaluated feedback | Review data and changes; prevent feedback poisoning |
| Planning | Decomposes work into tasks and dependencies | Re-plan on failure and enforce budgets |
| Tool-using | Calls approved external capabilities | Allowlist tools and validate inputs/outputs |
| Memory-enabled | Uses relevant session or persistent memory | Consent, access, retention, and deletion controls |
| Autonomous | Executes bounded multi-step tasks | Stop conditions, budgets, permissions, approval gates |
| Multi-agent | Coordinates multiple specialists | Limit concurrency, delegation depth, and shared-state conflicts |
| Collaborative / negotiating | Exchanges proposals and resolves conflicts | Record decisions and use explicit conflict rules |
| Critic / evaluator / guardian | Checks quality, evidence, policy, and completion | Independent checks for high-impact outcomes |

## 14 specialist roles

1. **Research Agent:** evidence gathering, source comparison, synthesis.
2. **Data Analyst Agent:** dataset inspection, calculations, statistics, trends, and clear reporting.
3. **Software Development Agent:** implementation, debugging, refactoring, code review.
4. **Browser Agent:** navigation and extraction through permitted browser capabilities.
5. **Writing and Editing Agent:** drafting, revision, summarization, and document structure.
6. **Planning Agent:** task decomposition, milestones, dependencies, acceptance criteria.
7. **Workflow Automation Agent:** authorized repeatable processes and cross-tool workflows.
8. **Customer Support Agent:** product answers, issue triage, and escalation.
9. **Security Agent:** threat analysis, permission review, vulnerability assessment.
10. **Financial Analysis Agent:** budgets, financial scenarios, and risk analysis with stated assumptions.
11. **Knowledge Retrieval Agent:** relevant information from connected documents and knowledge sources.
12. **Computer-Use Agent:** authorized interactions with supported applications and interfaces.
13. **Testing and QA Agent:** test design, execution, regression detection, acceptance validation.
14. **Monitoring Agent:** telemetry analysis, anomaly detection, and actionable alerts.

## Internal routing and execution

1. Normalize the request, goal, constraints, and permissions.
2. Identify required capabilities and risk level.
3. Select the simplest sufficient specialist set.
4. Build a bounded plan with dependencies and acceptance criteria.
5. Check tool availability, authorization, budgets, and approvals.
6. Execute only through registered adapters.
7. Verify results, then synthesize one user-facing response.
8. Report blockers and uncertainty honestly.

### Routing rules

- A single specialist is preferred when it can complete the task.
- Multiple specialists are used when distinct expertise is materially useful.
- Parallelize only independent tasks and respect concurrency limits.
- A critic/verification step is required for all planned tasks; high-impact actions need stronger checks.
- Tool availability must be checked at runtime. A role in the registry does not mean its integrations are connected.
- Specialist classification based on keywords is only a baseline. Production routing should combine structured intent classification, context, policy, tool availability, and evaluation.
- User-facing responses should not expose internal agent selection unless the user explicitly asks for technical details.

## Safety and reliability baseline

- Least-privilege tools and scoped credentials.
- Explicit user approval before consequential external changes.
- Sandboxed code execution and strict resource limits.
- Timeouts, retries with caps, cancellation, and spend budgets.
- Traceable task IDs, decision logs, and redaction of secrets.
- Memory controls including consent, retention, correction, and deletion.
- Verification against acceptance criteria; no fabricated claims of execution.
- Adversarial testing for prompt injection, tool misuse, data leakage, and conflicting agent outputs.

## Implementation status

The initial TypeScript registry, deterministic router, bounded planner, and policy primitive provide a foundation. They are not a complete production runtime. Provider adapters, tool execution, persistent memory, secure sandboxing, observability, integration tests, and runtime policy enforcement remain separate implementation work.

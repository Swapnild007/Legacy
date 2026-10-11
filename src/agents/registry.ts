export type AgentPatternId =
  | "reactive" | "model-based" | "goal-based" | "utility-based"
  | "learning" | "planning" | "tool-using" | "memory-enabled"
  | "autonomous" | "multi-agent" | "collaborative" | "critic";

export interface AgentPattern {
  id: AgentPatternId;
  name: string;
  purpose: string;
  safeguards: string[];
}

export const AGENT_PATTERNS: readonly AgentPattern[] = [
  { id: "reactive", name: "Reactive Agent", purpose: "Responds to current input using explicit rules or simple policies.", safeguards: ["Keep rules observable and testable."] },
  { id: "model-based", name: "Model-Based Agent", purpose: "Maintains a representation of environment state and relevant context.", safeguards: ["Track state freshness and uncertainty."] },
  { id: "goal-based", name: "Goal-Based Agent", purpose: "Selects actions that advance a defined outcome.", safeguards: ["Make goals and completion criteria explicit."] },
  { id: "utility-based", name: "Utility-Based Agent", purpose: "Compares candidate actions against quality, cost, latency, and risk preferences.", safeguards: ["Do not trade away hard safety constraints for a higher score."] },
  { id: "learning", name: "Learning Agent", purpose: "Improves behavior using reviewed feedback or evaluation results.", safeguards: ["Do not silently train on untrusted feedback or change policy without review."] },
  { id: "planning", name: "Planning Agent", purpose: "Decomposes goals into ordered tasks, dependencies, and checkpoints.", safeguards: ["Re-plan when assumptions fail; respect budgets and deadlines."] },
  { id: "tool-using", name: "Tool-Using Agent", purpose: "Calls approved tools, APIs, browsers, databases, or execution environments.", safeguards: ["Use allowlists, input validation, and least privilege."] },
  { id: "memory-enabled", name: "Memory-Enabled Agent", purpose: "Uses relevant conversation, task, or persistent memory.", safeguards: ["Respect consent, retention, access controls, and deletion."] },
  { id: "autonomous", name: "Autonomous Agent", purpose: "Executes bounded multi-step work without requiring approval for every safe step.", safeguards: ["Enforce action limits, stop conditions, and approval gates."] },
  { id: "multi-agent", name: "Multi-Agent System", purpose: "Coordinates specialists for tasks that benefit from parallel or distinct expertise.", safeguards: ["Bound delegation depth, concurrency, token cost, and shared state."] },
  { id: "collaborative", name: "Collaborative / Negotiating Agent", purpose: "Exchanges information and resolves task ownership or conflicting proposals.", safeguards: ["Record decisions and resolve conflicts through explicit policies."] },
  { id: "critic", name: "Critic / Evaluator / Guardian", purpose: "Checks correctness, evidence, policy compliance, and task completion.", safeguards: ["Use independent checks for high-impact actions; never fabricate verification."] }
] as const;

export type SpecialistId =
  | "research" | "data-analysis" | "software-development" | "browser"
  | "writing" | "planning" | "workflow-automation" | "customer-support"
  | "security" | "financial-analysis" | "knowledge-retrieval"
  | "computer-use" | "testing" | "monitoring";

export interface SpecialistRole {
  id: SpecialistId;
  name: string;
  description: string;
  keywords: string[];
  defaultPatterns: AgentPatternId[];
  risk: "low" | "moderate" | "high";
}

export const SPECIALIST_ROLES: readonly SpecialistRole[] = [
  { id: "research", name: "Research Agent", description: "Finds, compares, and synthesizes evidence from available sources.", keywords: ["research", "investigate", "compare sources", "find information", "literature review"], defaultPatterns: ["goal-based", "planning", "tool-using", "critic"], risk: "moderate" },
  { id: "data-analysis", name: "Data Analyst Agent", description: "Inspects datasets, calculates metrics, explains patterns, and communicates uncertainty.", keywords: ["data", "dataset", "analyze", "analysis", "statistics", "spreadsheet", "trend", "chart"], defaultPatterns: ["goal-based", "tool-using", "utility-based", "critic"], risk: "moderate" },
  { id: "software-development", name: "Software Development Agent", description: "Designs, implements, debugs, and refactors software.", keywords: ["code", "coding", "program", "software", "bug", "debug", "implement", "repository", "build"], defaultPatterns: ["goal-based", "planning", "tool-using", "autonomous", "critic"], risk: "moderate" },
  { id: "browser", name: "Browser Agent", description: "Navigates permitted websites and extracts information using approved browser tools.", keywords: ["website", "web page", "browse", "browser", "navigate", "online", "web search"], defaultPatterns: ["goal-based", "tool-using", "critic"], risk: "moderate" },
  { id: "writing", name: "Writing and Editing Agent", description: "Drafts, edits, summarizes, and structures written material.", keywords: ["write", "draft", "edit", "rewrite", "summarize", "document", "article"], defaultPatterns: ["goal-based", "memory-enabled", "critic"], risk: "low" },
  { id: "planning", name: "Planning Agent", description: "Turns outcomes into milestones, tasks, dependencies, and acceptance criteria.", keywords: ["plan", "roadmap", "milestone", "strategy", "prioritize", "project", "schedule"], defaultPatterns: ["goal-based", "planning", "utility-based"], risk: "low" },
  { id: "workflow-automation", name: "Workflow Automation Agent", description: "Coordinates repeatable processes across explicitly authorized tools.", keywords: ["automate", "workflow", "repeat", "routine", "process automation"], defaultPatterns: ["planning", "tool-using", "autonomous", "critic"], risk: "high" },
  { id: "customer-support", name: "Customer Support Agent", description: "Answers product and service questions, gathers context, and escalates unresolved cases.", keywords: ["customer", "support", "ticket", "complaint", "help desk", "service issue"], defaultPatterns: ["reactive", "model-based", "memory-enabled", "critic"], risk: "moderate" },
  { id: "security", name: "Security Agent", description: "Reviews security posture, code, permissions, and threat scenarios.", keywords: ["security", "vulnerability", "threat", "secure", "permission", "audit", "incident"], defaultPatterns: ["planning", "tool-using", "critic"], risk: "high" },
  { id: "financial-analysis", name: "Financial Analysis Agent", description: "Analyzes financial data, budgets, scenarios, and risk with explicit assumptions.", keywords: ["finance", "financial", "budget", "investment", "revenue", "expense", "cash flow"], defaultPatterns: ["goal-based", "utility-based", "tool-using", "critic"], risk: "high" },
  { id: "knowledge-retrieval", name: "Knowledge Retrieval Agent", description: "Retrieves relevant information from connected documents and knowledge sources.", keywords: ["knowledge base", "document search", "internal docs", "retrieve", "policy document"], defaultPatterns: ["model-based", "memory-enabled", "tool-using", "critic"], risk: "moderate" },
  { id: "computer-use", name: "Computer-Use Agent", description: "Performs permitted actions in supported applications and interfaces.", keywords: ["click", "user interface", "computer use", "fill form", "operate app", "screen"], defaultPatterns: ["goal-based", "planning", "tool-using", "autonomous", "critic"], risk: "high" },
  { id: "testing", name: "Testing and QA Agent", description: "Creates and runs tests, validates acceptance criteria, and diagnoses regressions.", keywords: ["test", "testing", "qa", "quality assurance", "regression", "verify", "validation"], defaultPatterns: ["planning", "tool-using", "critic"], risk: "moderate" },
  { id: "monitoring", name: "Monitoring Agent", description: "Evaluates permitted telemetry, detects anomalies, and prepares actionable alerts.", keywords: ["monitor", "monitoring", "alert", "anomaly", "health check", "observability"], defaultPatterns: ["reactive", "model-based", "tool-using", "critic"], risk: "high" }
] as const;

export function getSpecialist(id: SpecialistId): SpecialistRole | undefined {
  return SPECIALIST_ROLES.find((role) => role.id === id);
}

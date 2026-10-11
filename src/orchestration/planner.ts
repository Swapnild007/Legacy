import { getSpecialist, type SpecialistId } from "../agents/registry.js";
import type { NormalizedRequest, RoutingDecision } from "./router.js";

export interface PlannedTask {
  id: string;
  specialist: SpecialistId;
  objective: string;
  dependsOn: string[];
  requiresApproval: boolean;
  verificationRequired: boolean;
}

export interface ExecutionPlan {
  goal: string;
  strategy: "single" | "collaborative";
  tasks: PlannedTask[];
  maxParallelTasks: number;
  maxDelegationDepth: number;
  requiresFinalSynthesis: boolean;
  safetyNotes: string[];
}

/** Builds a transparent plan only. This function does not execute tools or agents. */
export function buildExecutionPlan(
  request: NormalizedRequest,
  routing: RoutingDecision
): ExecutionPlan {
  const goal = request.goal?.trim() || request.text.trim() || "Clarify the user's desired outcome";
  const tasks = routing.specialists.map((specialist, index): PlannedTask => {
    const role = getSpecialist(specialist);
    const isHighRisk = role?.risk === "high";
    return {
      id: `task-${index + 1}`,
      specialist,
      objective: routing.specialists.length === 1
        ? goal
        : `Contribute the ${role?.name ?? specialist} perspective to: ${goal}`,
      dependsOn: [],
      requiresApproval: isHighRisk,
      verificationRequired: true
    };
  });

  return {
    goal,
    strategy: tasks.length > 1 ? "collaborative" : "single",
    tasks,
    maxParallelTasks: Math.min(3, Math.max(1, tasks.length)),
    maxDelegationDepth: 1,
    requiresFinalSynthesis: tasks.length > 1,
    safetyNotes: [
      "This plan describes intended work; it does not confirm that tools or integrations are connected.",
      "High-impact external actions require explicit authorization and applicable approval checks.",
      "Verify outputs against acceptance criteria before presenting them as complete."
    ]
  };
}

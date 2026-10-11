import { SPECIALIST_ROLES, type SpecialistId } from "../agents/registry.js";

export interface NormalizedRequest {
  text: string;
  goal?: string;
  constraints?: string[];
  requestedCapabilities?: SpecialistId[];
  riskTolerance?: "low" | "standard" | "high";
}

export interface RoutingDecision {
  specialists: SpecialistId[];
  matchedBy: Record<string, string[]>;
  strategy: "single" | "collaborative";
  rationale: string;
}

const MAX_SPECIALISTS = 4;

/**
 * Baseline deterministic router. In production, combine this with model-based
 * intent classification and tool availability checks; never treat keywords as
 * proof that a capability or external integration is available.
 */
export function routeRequest(request: NormalizedRequest): RoutingDecision {
  const text = `${request.goal ?? ""} ${request.text}`.toLowerCase();
  const explicitlyRequested = request.requestedCapabilities ?? [];
  const matchedBy: Record<string, string[]> = {};
  const scores = SPECIALIST_ROLES.map((role) => {
    const hits = role.keywords.filter((keyword) => text.includes(keyword.toLowerCase()));
    const explicit = explicitlyRequested.includes(role.id);
    if (hits.length > 0 || explicit) matchedBy[role.id] = explicit ? [...hits, "explicit capability"] : hits;
    return { id: role.id, score: hits.length + (explicit ? 100 : 0) };
  });

  const ranked = scores
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_SPECIALISTS)
    .map((entry) => entry.id);

  // If no specialist signal is found, planning is a safe internal default.
  const specialists: SpecialistId[] = ranked.length > 0 ? ranked : ["planning"];
  return {
    specialists,
    matchedBy,
    strategy: specialists.length > 1 ? "collaborative" : "single",
    rationale: ranked.length === 0
      ? "No specialist intent matched; use planning to clarify or structure the request."
      : specialists.length === 1
        ? "One specialist appears sufficient for the detected request."
        : "Multiple capabilities matched; coordinate bounded subtasks and synthesize one response."
  };
}

import type { SpecialistId } from "../agents/registry";

export type ActionRisk = "low" | "moderate" | "high" | "critical";

export interface ActionProposal {
  specialist: SpecialistId;
  risk: ActionRisk;
  changesExternalState: boolean;
  isReversible: boolean;
  exposesSensitiveData: boolean;
}

export interface PolicyDecision {
  allowedToPrepare: boolean;
  requiresHumanApproval: boolean;
  reasons: string[];
}

/**
 * Conservative policy primitive. It does not grant tool access; adapters must
 * enforce authorization independently at the point of execution.
 */
export function evaluateAction(proposal: ActionProposal): PolicyDecision {
  const reasons: string[] = [];
  const requiresHumanApproval =
    proposal.risk === "high" ||
    proposal.risk === "critical" ||
    proposal.changesExternalState ||
    proposal.exposesSensitiveData ||
    !proposal.isReversible;

  if (proposal.changesExternalState) reasons.push("Action changes external state.");
  if (proposal.exposesSensitiveData) reasons.push("Action may expose sensitive data.");
  if (!proposal.isReversible) reasons.push("Action is not readily reversible.");
  if (proposal.risk === "high" || proposal.risk === "critical") {
    reasons.push(`Action is classified as ${proposal.risk} risk.`);
  }
  if (requiresHumanApproval) reasons.push("Human approval is required before execution.");

  return {
    allowedToPrepare: true,
    requiresHumanApproval,
    reasons: reasons.length ? reasons : ["No elevated-risk signal detected; tool-specific authorization still applies."]
  };
}

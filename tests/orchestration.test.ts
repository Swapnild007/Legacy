import { describe, expect, it } from "vitest";
import { routeRequest } from "../src/orchestration/router.js";
import { buildExecutionPlan } from "../src/orchestration/planner.js";
import { evaluateAction } from "../src/verification/policy.js";

describe("Legacy internal agent routing", () => {
  it("routes a code debugging request to software development", () => {
    const decision = routeRequest({ text: "Debug this code and fix the build bug" });
    expect(decision.specialists).toContain("software-development");
  });

  it("routes multi-capability requests to a bounded collaborative plan", () => {
    const request = { text: "Research and analyze this dataset, then write a report" };
    const decision = routeRequest(request);
    expect(decision.specialists.length).toBeGreaterThan(1);
    const plan = buildExecutionPlan(request, decision);
    expect(plan.tasks.length).toBeLessThanOrEqual(4);
    expect(plan.requiresFinalSynthesis).toBe(true);
    expect(plan.maxDelegationDepth).toBe(1);
  });

  it("uses a safe planning fallback when no specialist matches", () => {
    const decision = routeRequest({ text: "Help me with something" });
    expect(decision.specialists).toEqual(["planning"]);
    expect(decision.strategy).toBe("single");
  });

  it("requires approval for irreversible external changes", () => {
    const decision = evaluateAction({
      specialist: "workflow-automation",
      risk: "moderate",
      changesExternalState: true,
      isReversible: false,
      exposesSensitiveData: false
    });
    expect(decision.requiresHumanApproval).toBe(true);
  });

  it("does not treat the policy helper as an execution grant", () => {
    const decision = evaluateAction({
      specialist: "writing",
      risk: "low",
      changesExternalState: false,
      isReversible: true,
      exposesSensitiveData: false
    });
    expect(decision.allowedToPrepare).toBe(true);
    expect(decision.requiresHumanApproval).toBe(false);
  });
});

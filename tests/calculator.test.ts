import { describe, expect, it } from "vitest";
import { calculate } from "../src/tools/calculator.js";

describe("safe calculator tool", () => {
  it("respects operator precedence and parentheses", () => {
    expect(calculate("2 + 3 * (4 - 1)").value).toBe(11);
  });

  it("supports decimals and unary signs", () => {
    expect(calculate("-2.5 * -4").value).toBe(10);
  });

  it("rejects division by zero", () => {
    expect(() => calculate("5 / 0")).toThrow(/Division by zero/);
  });

  it("rejects code and unsupported syntax", () => {
    expect(() => calculate("process.exit()")).toThrow();
  });

  it("rejects incomplete expressions", () => {
    expect(() => calculate("2 +")).toThrow();
  });
});

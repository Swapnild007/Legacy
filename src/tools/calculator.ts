export interface CalculationResult {
  expression: string;
  value: number;
}

/**
 * Evaluate basic arithmetic without eval(), Function(), or external code execution.
 * Supported operators: +, -, *, /, parentheses, and decimal numbers.
 */
export function calculate(expression: string): CalculationResult {
  const source = expression.trim();
  if (!source || source.length > 200) {
    throw new Error("Expression must contain 1 to 200 characters.");
  }

  const tokens = source.match(/\d+(?:\.\d+)?|\.\d+|[()+\-*/]/g) ?? [];
  const compact = source.replace(/\s+/g, "");
  if (tokens.join("") !== compact) {
    throw new Error("Only numbers, parentheses, +, -, *, and / are supported.");
  }

  let position = 0;
  const peek = () => tokens[position];
  const consume = () => tokens[position++];

  function primary(): number {
    const token = consume();
    if (token === undefined) throw new Error("Unexpected end of expression.");
    if (token === "+") return primary();
    if (token === "-") return -primary();
    if (token === "(") {
      const value = sum();
      if (consume() !== ")") throw new Error("Missing closing parenthesis.");
      return value;
    }
    if (/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(token)) return Number(token);
    throw new Error("Invalid arithmetic expression.");
  }

  function product(): number {
    let value = primary();
    while (peek() === "*" || peek() === "/") {
      const operator = consume();
      const right = primary();
      if (operator === "/" && right === 0) throw new Error("Division by zero is not allowed.");
      value = operator === "*" ? value * right : value / right;
    }
    return value;
  }

  function sum(): number {
    let value = product();
    while (peek() === "+" || peek() === "-") {
      const operator = consume();
      const right = product();
      value = operator === "+" ? value + right : value - right;
    }
    return value;
  }

  const value = sum();
  if (position !== tokens.length || !Number.isFinite(value)) {
    throw new Error("Expression is invalid or result is not finite.");
  }
  return { expression: source, value };
}

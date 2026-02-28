import { describe, it, expect } from "vitest";
import { computeOverallScore } from "@/internal/analyze/scoring";
import { Finding } from "@/internal/rules/types";

describe("scoring", () => {
  it("should return 0 for empty findings", () => {
    expect(computeOverallScore([])).toBe(0);
  });

  it("should compute score from findings", () => {
    const findings: Finding[] = [
      {
        ruleId: "rule-1",
        category: "Test",
        severity: "high",
        score: 80,
        page: 1,
        quote: "Test",
        explanation: "Test",
        suggestion: "Test",
      },
      {
        ruleId: "rule-2",
        category: "Test",
        severity: "medium",
        score: 60,
        page: 1,
        quote: "Test",
        explanation: "Test",
        suggestion: "Test",
      },
    ];

    const score = computeOverallScore(findings);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("should weight high severity more", () => {
    const highFinding: Finding[] = [
      {
        ruleId: "rule-1",
        category: "Test",
        severity: "high",
        score: 80,
        page: 1,
        quote: "Test",
        explanation: "Test",
        suggestion: "Test",
      },
    ];

    const lowFinding: Finding[] = [
      {
        ruleId: "rule-2",
        category: "Test",
        severity: "low",
        score: 80,
        page: 1,
        quote: "Test",
        explanation: "Test",
        suggestion: "Test",
      },
    ];

    const highScore = computeOverallScore(highFinding);
    const lowScore = computeOverallScore(lowFinding);
    expect(highScore).toBeGreaterThan(lowScore);
  });
});

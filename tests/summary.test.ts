import { describe, it, expect } from "vitest";
import { generateSummary } from "@/internal/analyze/summary";
import { Finding } from "@/internal/rules/types";

describe("summary generation", () => {
  it("should return default message for empty findings", () => {
    const summary = generateSummary([]);
    expect(summary).toHaveLength(1);
    expect(summary[0]).toContain("No significant");
  });

  it("should generate summary bullets", () => {
    const findings: Finding[] = [
      {
        ruleId: "rule-1",
        category: "Category A",
        severity: "high",
        score: 80,
        page: 1,
        quote: "Test",
        explanation: "Explanation A",
        suggestion: "Suggestion A",
      },
      {
        ruleId: "rule-2",
        category: "Category B",
        severity: "medium",
        score: 60,
        page: 1,
        quote: "Test",
        explanation: "Explanation B",
        suggestion: "Suggestion B",
      },
    ];

    const summary = generateSummary(findings);
    expect(summary.length).toBeGreaterThanOrEqual(2);
    expect(summary.length).toBeLessThanOrEqual(12);
  });

  it("should prioritize high-scored findings", () => {
    const findings: Finding[] = [
      {
        ruleId: "rule-1",
        category: "Low Score",
        severity: "low",
        score: 30,
        page: 1,
        quote: "Test",
        explanation: "Low",
        suggestion: "Test",
      },
      {
        ruleId: "rule-2",
        category: "High Score",
        severity: "high",
        score: 90,
        page: 1,
        quote: "Test",
        explanation: "High",
        suggestion: "Test",
      },
    ];

    const summary = generateSummary(findings);
    expect(summary[0]).toContain("High Score");
  });
});

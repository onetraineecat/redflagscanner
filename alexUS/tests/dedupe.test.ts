import { describe, it, expect } from "vitest";
import { dedupeFindings } from "@/internal/analyze/dedupe";
import { Finding } from "@/internal/rules/types";

describe("deduplication", () => {
  it("should keep highest scored finding when duplicates exist", () => {
    const findings: Finding[] = [
      {
        ruleId: "rule-1",
        category: "Test",
        severity: "high",
        score: 80,
        page: 1,
        quote: "This is a test quote with some words",
        explanation: "Test explanation",
        suggestion: "Test suggestion",
      },
      {
        ruleId: "rule-2",
        category: "Test",
        severity: "medium",
        score: 60,
        page: 1,
        quote: "This is a test quote with some words and more",
        explanation: "Test explanation 2",
        suggestion: "Test suggestion 2",
      },
    ];

    const deduped = dedupeFindings(findings);
    expect(deduped).toHaveLength(1);
    expect(deduped[0].score).toBe(80);
  });

  it("should not dedupe findings on different pages", () => {
    const findings: Finding[] = [
      {
        ruleId: "rule-1",
        category: "Test",
        severity: "high",
        score: 80,
        page: 1,
        quote: "Same quote text",
        explanation: "Test",
        suggestion: "Test",
      },
      {
        ruleId: "rule-2",
        category: "Test",
        severity: "medium",
        score: 60,
        page: 2,
        quote: "Same quote text",
        explanation: "Test",
        suggestion: "Test",
      },
    ];

    const deduped = dedupeFindings(findings);
    expect(deduped).toHaveLength(2);
  });

  it("should handle empty findings", () => {
    expect(dedupeFindings([])).toEqual([]);
  });
});

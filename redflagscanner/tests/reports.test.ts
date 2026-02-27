import { describe, it, expect } from "vitest";
import { generateJsonReport, generateMarkdownReport, AnalysisResult } from "@/internal/analyze/reports";

describe("reports", () => {
  const sampleResult: AnalysisResult = {
    docId: "test-doc-123",
    pagesCount: 2,
    overallScore: 65.5,
    summary: ["Test summary bullet 1", "Test summary bullet 2"],
    risks: [
      {
        ruleId: "rule-1",
        category: "Test Category",
        severity: "high",
        score: 80,
        page: 1,
        quote: "Test quote",
        explanation: "Test explanation",
        suggestion: "Test suggestion",
      },
    ],
  };

  it("should generate valid JSON report", () => {
    const json = generateJsonReport(sampleResult);
    expect(() => JSON.parse(json)).not.toThrow();
    const parsed = JSON.parse(json);
    expect(parsed.docId).toBe(sampleResult.docId);
  });

  it("should generate markdown report", () => {
    const md = generateMarkdownReport(sampleResult);
    expect(md).toContain("# Contract Risk Analysis Report");
    expect(md).toContain(sampleResult.docId);
    expect(md).toContain("Test Category");
    expect(md).toContain("Test quote");
  });

  it("should include disclaimer in markdown", () => {
    const md = generateMarkdownReport(sampleResult);
    expect(md).toContain("not legal advice");
  });
});

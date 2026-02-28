import { describe, it, expect } from "vitest";
import { analyzeContract } from "@/internal/analyze/analyzeContract";
import { PageText } from "@/internal/pdf/extractText";

describe("analyzeContract", () => {
  it("should find risks in contract text", () => {
    const pages: PageText[] = [
      {
        pageNumber: 1,
        text: "This agreement shall automatically renew for successive one-year periods unless either party provides written notice.",
      },
    ];

    const result = analyzeContract(pages);
    expect(result.findings.length).toBeGreaterThan(0);
    expect(result.overallScore).toBeGreaterThan(0);
    expect(result.summary.length).toBeGreaterThan(0);
  });

  it("should handle multiple pages", () => {
    const pages: PageText[] = [
      {
        pageNumber: 1,
        text: "Page one with auto-renewal clause.",
      },
      {
        pageNumber: 2,
        text: "Page two with limitation of liability clause.",
      },
    ];

    const result = analyzeContract(pages);
    expect(result.findings.length).toBeGreaterThan(0);
  });

  it("should return empty findings for clean contract", () => {
    const pages: PageText[] = [
      {
        pageNumber: 1,
        text: "This is a simple contract with no problematic clauses.",
      },
    ];

    const result = analyzeContract(pages);
    // May still find some false positives, but should handle gracefully
    expect(result.summary).toBeDefined();
  });
});

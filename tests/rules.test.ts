import { describe, it, expect } from "vitest";
import { US_RULES } from "@/internal/rules/usRules";

describe("US rules", () => {
  it("should have at least 45 patterns", () => {
    const totalPatterns = US_RULES.reduce((sum, rule) => sum + rule.patterns.length, 0);
    expect(totalPatterns).toBeGreaterThanOrEqual(45);
  });

  it("should have rules in all required categories", () => {
    const categories = new Set(US_RULES.map((r) => r.category));
    const requiredCategories = [
      "Auto-Renewal / Evergreen",
      "Termination",
      "Unilateral Changes",
      "Limitation of Liability",
      "Indemnification",
      "Arbitration / Class Action Waiver",
      "Governing Law / Venue / Jurisdiction",
      "Payment Terms / Late Fees / Interest / Acceleration",
      "Assignment / Change of Control",
      "Confidentiality",
      "IP Ownership / Work Made for Hire / License Grants",
      "Warranties / Disclaimers",
      "Force Majeure",
      "Audit Rights",
    ];

    for (const category of requiredCategories) {
      expect(categories.has(category)).toBe(true);
    }
  });

  it("should have valid rule structure", () => {
    for (const rule of US_RULES) {
      expect(rule.id).toBeTruthy();
      expect(rule.category).toBeTruthy();
      expect(["low", "medium", "high"]).toContain(rule.severityBase);
      expect(rule.score).toBeGreaterThanOrEqual(0);
      expect(rule.score).toBeLessThanOrEqual(100);
      expect(rule.patterns.length).toBeGreaterThan(0);
      expect(rule.explanationTemplate).toBeTruthy();
      expect(rule.suggestionTemplate).toBeTruthy();
    }
  });

  it("should match auto-renewal patterns", () => {
    const autoRenewalRule = US_RULES.find((r) => r.id === "auto-renewal-1");
    expect(autoRenewalRule).toBeDefined();
    const testText = "This agreement shall automatically renew";
    const matches = autoRenewalRule!.patterns.some((p) => p.test(testText));
    expect(matches).toBe(true);
  });
});

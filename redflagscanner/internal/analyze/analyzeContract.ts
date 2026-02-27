import { US_RULES } from "../rules/usRules";
import { Finding, Rule } from "../rules/types";
import { normalizeText } from "./normalization";
import { extractQuote } from "./quotes";
import { dedupeFindings } from "./dedupe";
import { computeOverallScore } from "./scoring";
import { generateSummary } from "./summary";

export interface PageText {
  pageNumber: number;
  text: string;
}

/**
 * Analyzes contract text and returns findings.
 */
export function analyzeContract(pages: PageText[]): {
  findings: Finding[];
  overallScore: number;
  summary: string[];
} {
  const allFindings: Finding[] = [];

  // Run rules on each page
  for (const page of pages) {
    const normalizedPageText = normalizeText(page.text);

    for (const rule of US_RULES) {
      for (const pattern of rule.patterns) {
        const matches = Array.from(page.text.matchAll(new RegExp(pattern, "gi")));

        for (const match of matches) {
          if (!match.index && match.index !== 0) continue;

          const quote = extractQuote(page.text, match.index, match[0].length);
          const severity = rule.severityBase; // Could be adjusted based on context

          const finding: Finding = {
            ruleId: rule.id,
            category: rule.category,
            severity,
            score: rule.score,
            page: page.pageNumber,
            quote,
            explanation: rule.explanationTemplate,
            suggestion: rule.suggestionTemplate,
          };

          allFindings.push(finding);
        }
      }
    }
  }

  // Deduplicate overlapping findings
  const deduped = dedupeFindings(allFindings);

  // Compute overall score
  const overallScore = computeOverallScore(deduped);

  // Generate summary
  const summary = generateSummary(deduped);

  return {
    findings: deduped,
    overallScore,
    summary,
  };
}

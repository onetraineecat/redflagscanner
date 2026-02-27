import { Finding } from "../rules/types";

/**
 * Generates 5-12 plain-English summary bullets from findings.
 */
export function generateSummary(findings: Finding[]): string[] {
  if (findings.length === 0) {
    return ["No significant red-flag clauses detected in this contract."];
  }

  // Group by category and sort by highest score
  const byCategory = new Map<string, Finding[]>();
  for (const finding of findings) {
    if (!byCategory.has(finding.category)) {
      byCategory.set(finding.category, []);
    }
    byCategory.get(finding.category)!.push(finding);
  }

  const summary: string[] = [];
  const categories = Array.from(byCategory.entries())
    .sort((a, b) => {
      const maxA = Math.max(...a[1].map((f) => f.score));
      const maxB = Math.max(...b[1].map((f) => f.score));
      return maxB - maxA;
    })
    .slice(0, 12); // Limit to top categories

  for (const [category, categoryFindings] of categories) {
    const topFinding = categoryFindings.sort((a, b) => b.score - a.score)[0];
    const count = categoryFindings.length;

    let bullet = `${category}: ${topFinding.explanation}`;
    if (count > 1) {
      bullet += ` (${count} instances found)`;
    }

    summary.push(bullet);
  }

  // Ensure we have at least 5 bullets if there are findings
  if (summary.length < 5 && findings.length > 0) {
    const remaining = findings
      .sort((a, b) => b.score - a.score)
      .slice(summary.length, 5)
      .map((f) => `${f.category}: ${f.explanation}`);
    summary.push(...remaining);
  }

  return summary.slice(0, 12);
}

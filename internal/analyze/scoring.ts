import { Finding } from "../rules/types";

/**
 * Computes overall risk score (0-100) from findings.
 */
export function computeOverallScore(findings: Finding[]): number {
  if (findings.length === 0) return 0;

  // Weight by severity and count
  const severityWeights: Record<string, number> = {
    high: 1.0,
    medium: 0.6,
    low: 0.3,
  };

  const weightedSum = findings.reduce((sum, f) => {
    return sum + f.score * severityWeights[f.severity];
  }, 0);

  const maxPossible = findings.length * 100 * 1.0; // Assuming all high severity
  const rawScore = (weightedSum / maxPossible) * 100;

  // Cap at 100 and apply diminishing returns for many findings
  const capped = Math.min(100, rawScore);
  const diminishingFactor = Math.min(1, 1 + Math.log(findings.length) / 10);
  return Math.min(100, capped * diminishingFactor);
}

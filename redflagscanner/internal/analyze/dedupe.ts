import { Finding } from "../rules/types";

/**
 * Merges findings that overlap significantly (same page, nearby quotes).
 * Keeps the finding with the highest score.
 */
export function dedupeFindings(findings: Finding[]): Finding[] {
  const merged: Finding[] = [];
  const processed = new Set<number>();

  // Sort by score descending
  const sorted = [...findings].sort((a, b) => b.score - a.score);

  for (let i = 0; i < sorted.length; i++) {
    if (processed.has(i)) continue;

    const current = sorted[i];
    const duplicates: number[] = [i];

    // Find overlapping findings on the same page
    for (let j = i + 1; j < sorted.length; j++) {
      if (processed.has(j)) continue;
      if (current.page !== sorted[j].page) continue;

      // Check if quotes overlap significantly (simple heuristic: shared words)
      const currentWords = new Set(
        current.quote
          .toLowerCase()
          .replace(/[^\w\s]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3)
      );
      const otherWords = new Set(
        sorted[j].quote
          .toLowerCase()
          .replace(/[^\w\s]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 3)
      );

      const intersection = new Set([...currentWords].filter((x) => otherWords.has(x)));
      const union = new Set([...currentWords, ...otherWords]);
      const similarity = intersection.size / union.size;

      // If quotes overlap >30%, consider duplicates
      if (similarity > 0.3) {
        duplicates.push(j);
      }
    }

    // Keep the highest-scored finding
    const best = duplicates
      .map((idx) => sorted[idx])
      .reduce((a, b) => (a.score > b.score ? a : b));

    merged.push(best);
    duplicates.forEach((idx) => processed.add(idx));
  }

  return merged;
}

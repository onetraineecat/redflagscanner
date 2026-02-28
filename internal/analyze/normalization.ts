/**
 * Normalizes text for matching: lowercase, collapse whitespace, remove punctuation, Unicode normalize.
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s]/g, " ") // Replace punctuation with space
    .replace(/\s+/g, " ") // Collapse whitespace
    .trim();
}

/**
 * Extracts significant tokens from text (words, excluding very short ones).
 */
export function extractSignificantTokens(text: string, minLength = 3): string[] {
  const normalized = normalizeText(text);
  return normalized
    .split(/\s+/)
    .filter((token) => token.length >= minLength)
    .filter((token) => !/^\d+$/.test(token)); // Exclude pure numbers
}

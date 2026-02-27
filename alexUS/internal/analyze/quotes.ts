/**
 * Extracts a quote around a match position, attempting to capture a sentence or ~200-400 chars.
 */
export function extractQuote(
  text: string,
  matchIndex: number,
  matchLength: number,
  targetLength = 300
): string {
  const start = Math.max(0, matchIndex - targetLength / 2);
  const end = Math.min(text.length, matchIndex + matchLength + targetLength / 2);

  let quote = text.slice(start, end);

  // Try to start at sentence boundary
  const sentenceStart = quote.search(/[.!?]\s+[A-Z]/);
  if (sentenceStart > 50 && sentenceStart < quote.length / 2) {
    quote = quote.slice(sentenceStart + 1).trim();
  }

  // Try to end at sentence boundary
  const sentenceEnd = quote.search(/[.!?]\s+(?:[A-Z]|$)/);
  if (sentenceEnd > quote.length / 2 && sentenceEnd < quote.length - 50) {
    quote = quote.slice(0, sentenceEnd + 1).trim();
  }

  // Ensure we include the match
  const matchInQuote = quote.includes(text.slice(matchIndex, matchIndex + matchLength));
  if (!matchInQuote) {
    // Fallback: center on match
    const matchStart = Math.max(0, matchIndex - 150);
    const matchEnd = Math.min(text.length, matchIndex + matchLength + 150);
    quote = text.slice(matchStart, matchEnd);
  }

  return quote.trim();
}

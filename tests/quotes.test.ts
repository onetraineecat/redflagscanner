import { describe, it, expect } from "vitest";
import { extractQuote } from "@/internal/analyze/quotes";

describe("quote extraction", () => {
  const longText =
    "This is the beginning of a long document. " +
    "Here is a sentence with a match term that we want to highlight. " +
    "This is more text after the match. " +
    "And here is the end of the document.";

  it("should extract quote around match", () => {
    const matchIndex = longText.indexOf("match term");
    const quote = extractQuote(longText, matchIndex, "match term".length, 100);
    expect(quote).toContain("match term");
    expect(quote.length).toBeGreaterThan("match term".length);
  });

  it("should prefer sentence boundaries", () => {
    const text = "First sentence. Second sentence with match term here. Third sentence.";
    const matchIndex = text.indexOf("match term");
    const quote = extractQuote(text, matchIndex, "match term".length);
    expect(quote).toMatch(/sentence.*match term.*sentence/i);
  });

  it("should handle match at start of text", () => {
    const text = "Match term at the start. More text here.";
    const quote = extractQuote(text, 0, "Match term".length);
    expect(quote).toContain("Match term");
  });

  it("should handle match at end of text", () => {
    const text = "Some text here. Match term at the end";
    const matchIndex = text.indexOf("Match term");
    const quote = extractQuote(text, matchIndex, "Match term".length);
    expect(quote).toContain("Match term");
  });
});

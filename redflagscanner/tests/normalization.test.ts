import { describe, it, expect } from "vitest";
import { normalizeText, extractSignificantTokens } from "@/internal/analyze/normalization";

describe("normalization", () => {
  it("should lowercase text", () => {
    expect(normalizeText("HELLO WORLD")).toBe("hello world");
  });

  it("should collapse whitespace", () => {
    expect(normalizeText("hello    world\n\t  test")).toBe("hello world test");
  });

  it("should remove punctuation", () => {
    expect(normalizeText("hello, world! test?")).toBe("hello world test");
  });

  it("should normalize unicode", () => {
    expect(normalizeText("café résumé")).toBe("cafe resume");
  });

  it("should extract significant tokens", () => {
    const tokens = extractSignificantTokens("This is a test of the system", 3);
    expect(tokens).toEqual(["this", "test", "the", "system"]);
  });

  it("should filter out short tokens", () => {
    const tokens = extractSignificantTokens("a an the test", 3);
    expect(tokens).toEqual(["the", "test"]);
  });
});

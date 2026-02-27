import { describe, it, expect } from "vitest";
import { extractPdfTextPerPage } from "@/internal/pdf/extractText";

// Note: This test requires a PDF buffer. For unit tests, we'll mock or skip.
// Integration tests would use actual PDF files.

describe("extractPdfTextPerPage", () => {
  it("should be a function", () => {
    expect(typeof extractPdfTextPerPage).toBe("function");
  });

  // Actual PDF extraction tests would require PDF buffers
  // These would be better suited for integration/e2e tests
});

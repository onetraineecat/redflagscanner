import pdfParse from "pdf-parse";

export interface PageText {
  pageNumber: number;
  text: string;
}

/**
 * Extracts text from PDF buffer, attempting to split by page.
 * pdf-parse doesn't always provide per-page text, so we do best-effort splitting.
 */
export async function extractPdfTextPerPage(buffer: Buffer): Promise<PageText[]> {
  const data = await pdfParse(buffer);

  // If pdf-parse provides page info, use it
  if (data.pages && Array.isArray(data.pages) && data.pages.length > 0) {
    return data.pages.map((page: any, index: number) => ({
      pageNumber: index + 1,
      text: page.text || "",
    }));
  }

  // Fallback: try to split by "Page" markers or use full text as page 1
  const fullText = data.text || "";

  // Attempt to find page breaks (common patterns: "Page X", "\f", etc.)
  const pageMatches = Array.from(fullText.matchAll(/\f|Page\s+\d+/gi));
  
  if (pageMatches.length > 0) {
    const pages: PageText[] = [];
    let lastIndex = 0;

    for (let i = 0; i < pageMatches.length; i++) {
      const match = pageMatches[i];
      if (match.index === undefined) continue;

      if (i > 0) {
        pages.push({
          pageNumber: i,
          text: fullText.slice(lastIndex, match.index).trim(),
        });
      }
      lastIndex = match.index + match[0].length;
    }

    // Add last page
    pages.push({
      pageNumber: pages.length + 1,
      text: fullText.slice(lastIndex).trim(),
    });

    if (pages.length > 1) {
      return pages;
    }
  }

  // Final fallback: single page
  return [
    {
      pageNumber: 1,
      text: fullText,
    },
  ];
}

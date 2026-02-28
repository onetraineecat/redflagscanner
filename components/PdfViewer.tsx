"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef, useEffect } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Finding } from "@/internal/rules/types";
import { normalizeText, extractSignificantTokens } from "@/internal/analyze/normalization";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

interface PdfViewerProps {
  file: string | File | null;
  highlightedRisk: Finding | null;
  onPageChange?: (page: number) => void;
}

export default function PdfViewer({ file, highlightedRisk, onPageChange }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [highlightFallback, setHighlightFallback] = useState(false);
  const [pdfLoadError, setPdfLoadError] = useState<string | null>(null);
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (highlightedRisk && file) {
      setPageNumber(highlightedRisk.page);
      setHighlightFallback(false);
      // Small delay to ensure page is rendered
      setTimeout(() => {
        highlightTextOnPage(highlightedRisk.page, highlightedRisk.quote);
      }, 300);
    }
  }, [highlightedRisk, file]);

  const highlightTextOnPage = (targetPage: number, quote: string) => {
    // Find the page container in the DOM (react-pdf structure)
    const pageContainers = document.querySelectorAll(".react-pdf__Page__container");
    let pageContainer: Element | null = null;
    
    // Find container for target page
    for (const container of pageContainers) {
      const pageEl = container.querySelector(".react-pdf__Page");
      if (pageEl) {
        const pageNumAttr = pageEl.getAttribute("data-page-number");
        if (pageNumAttr && parseInt(pageNumAttr) === targetPage) {
          pageContainer = container;
          break;
        }
      }
    }

    if (!pageContainer) {
      setHighlightFallback(true);
      return;
    }

    // Find textLayer
    const textLayer = pageContainer.querySelector(".react-pdf__Page__textContent");
    if (!textLayer) {
      setHighlightFallback(true);
      return;
    }

    // Clear previous highlights
    textLayer.querySelectorAll(".pdf-highlight, .pdf-highlight-fallback").forEach((el) => {
      el.classList.remove("pdf-highlight", "pdf-highlight-fallback");
      const parent = el.parentElement;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });

    // Get all text spans
    const spans = Array.from(textLayer.querySelectorAll("span"));
    if (spans.length === 0) {
      setHighlightFallback(true);
      return;
    }

    // Build normalized text from spans
    const pageText = spans.map((span) => span.textContent || "").join(" ");
    const normalizedPageText = normalizeText(pageText);
    const normalizedQuote = normalizeText(quote);

    // Try exact substring match in normalized text
    const matchIndex = normalizedPageText.indexOf(normalizedQuote);
    if (matchIndex !== -1) {
      // Map back to spans
      let charIndex = 0;
      let startSpanIdx = -1;
      let endSpanIdx = -1;
      let startCharInSpan = -1;
      let endCharInSpan = -1;

      for (let i = 0; i < spans.length; i++) {
        const spanText = spans[i].textContent || "";
        const normalizedSpan = normalizeText(spanText);
        const spanStart = charIndex;
        const spanEnd = charIndex + normalizedSpan.length;

        if (startSpanIdx === -1 && spanEnd > matchIndex) {
          startSpanIdx = i;
          startCharInSpan = matchIndex - spanStart;
        }
        if (spanEnd >= matchIndex + normalizedQuote.length) {
          endSpanIdx = i;
          endCharInSpan = matchIndex + normalizedQuote.length - spanStart;
          break;
        }
        charIndex = spanEnd;
      }

      if (startSpanIdx !== -1 && endSpanIdx !== -1) {
        // Highlight spans
        for (let i = startSpanIdx; i <= endSpanIdx; i++) {
          const span = spans[i];
          if (i === startSpanIdx && i === endSpanIdx) {
            // Single span: split if needed
            const spanText = span.textContent || "";
            const before = spanText.slice(0, startCharInSpan);
            const highlight = spanText.slice(startCharInSpan, endCharInSpan);
            const after = spanText.slice(endCharInSpan);

            const parent = span.parentElement;
            if (parent) {
              if (before) parent.insertBefore(document.createTextNode(before), span);
              const highlightSpan = document.createElement("span");
              highlightSpan.className = "pdf-highlight";
              highlightSpan.textContent = highlight;
              parent.insertBefore(highlightSpan, span);
              if (after) parent.insertBefore(document.createTextNode(after), span);
              parent.removeChild(span);
            }
          } else if (i === startSpanIdx) {
            // First span: highlight from startCharInSpan
            const spanText = span.textContent || "";
            const before = spanText.slice(0, startCharInSpan);
            const highlight = spanText.slice(startCharInSpan);

            const parent = span.parentElement;
            if (parent) {
              if (before) parent.insertBefore(document.createTextNode(before), span);
              const highlightSpan = document.createElement("span");
              highlightSpan.className = "pdf-highlight";
              highlightSpan.textContent = highlight;
              parent.insertBefore(highlightSpan, span);
              parent.removeChild(span);
            }
          } else if (i === endSpanIdx) {
            // Last span: highlight until endCharInSpan
            const spanText = span.textContent || "";
            const highlight = spanText.slice(0, endCharInSpan);
            const after = spanText.slice(endCharInSpan);

            const parent = span.parentElement;
            if (parent) {
              const highlightSpan = document.createElement("span");
              highlightSpan.className = "pdf-highlight";
              highlightSpan.textContent = highlight;
              parent.insertBefore(highlightSpan, span);
              if (after) parent.insertBefore(document.createTextNode(after), span);
              parent.removeChild(span);
            }
          } else {
            // Middle spans: highlight entire span
            const highlightSpan = document.createElement("span");
            highlightSpan.className = "pdf-highlight";
            highlightSpan.textContent = span.textContent || "";
            span.parentElement?.replaceChild(highlightSpan, span);
          }
        }
        return; // Success
      }
    }

    // Fallback: highlight spans containing significant tokens
    const tokens = extractSignificantTokens(quote, 4);
    if (tokens.length > 0) {
      let highlighted = false;
      for (const token of tokens.slice(0, 5)) {
        // Search for token in spans
        for (const span of spans) {
          const spanText = normalizeText(span.textContent || "");
          if (spanText.includes(token)) {
            const highlightSpan = document.createElement("span");
            highlightSpan.className = "pdf-highlight-fallback";
            highlightSpan.textContent = span.textContent || "";
            span.parentElement?.replaceChild(highlightSpan, span);
            highlighted = true;
            break;
          }
        }
        if (highlighted) break;
      }
      if (highlighted) {
        setHighlightFallback(true);
        return;
      }
    }

    setHighlightFallback(true);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPdfLoadError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("PDF load error:", error);
    setPdfLoadError(error.message || "Unknown PDF loading error");
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
      onPageChange?.(page);
    }
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded border-2 border-dashed border-gray-300">
        <p className="text-gray-500">No PDF loaded</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => goToPage(pageNumber + 1)}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {highlightFallback && (
          <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
            Highlight fallback used
          </span>
        )}
      </div>
      <div className="flex-1 overflow-auto border rounded bg-gray-50">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<div>Loading PDF...</div>}
          error={
            <div className="p-2 text-red-700 bg-red-50 border border-red-200 rounded">
              Failed to load PDF file.
              {pdfLoadError ? ` ${pdfLoadError}` : ""}
            </div>
          }
        >
          <div
            ref={(el) => {
              if (el) pageRefs.current.set(pageNumber, el);
            }}
            className="react-pdf__Page__container"
          >
            <Page
              pageNumber={pageNumber}
              width={Math.min(800, typeof window !== "undefined" ? window.innerWidth * 0.6 : 800)}
              renderTextLayer={true}
              renderAnnotationLayer={false}
              onRenderSuccess={() => {
                // Re-highlight after page renders
                if (highlightedRisk && highlightedRisk.page === pageNumber) {
                  setTimeout(() => {
                    highlightTextOnPage(pageNumber, highlightedRisk.quote);
                  }, 100);
                }
              }}
            />
          </div>
        </Document>
      </div>
    </div>
  );
}

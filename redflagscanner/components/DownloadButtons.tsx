"use client";

import { AnalysisResult } from "@/internal/analyze/reports";
import { generateJsonReport, generateMarkdownReport } from "@/internal/analyze/reports";

interface DownloadButtonsProps {
  result: AnalysisResult | null;
}

export default function DownloadButtons({ result }: DownloadButtonsProps) {
  if (!result) return null;

  const handleDownloadJson = () => {
    const json = generateJsonReport(result);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contract-analysis-${result.docId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdownReport(result);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contract-analysis-${result.docId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={handleDownloadJson}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        Download JSON
      </button>
      <button
        onClick={handleDownloadMarkdown}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
      >
        Download Markdown
      </button>
    </div>
  );
}

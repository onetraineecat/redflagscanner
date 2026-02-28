"use client";

import { AnalysisResult } from "@/internal/analyze/reports";

interface SummaryPanelProps {
  result: AnalysisResult | null;
}

export default function SummaryPanel({ result }: SummaryPanelProps) {
  if (!result) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">Human Summary</h2>
      <div className="bg-gray-50 p-4 rounded">
        <ul className="list-disc list-inside space-y-2 text-sm">
          {result.summary.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

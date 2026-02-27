"use client";

import { Finding } from "@/internal/rules/types";

interface RiskPanelProps {
  risks: Finding[];
  onRiskClick: (risk: Finding) => void;
}

export default function RiskPanel({ risks, onRiskClick }: RiskPanelProps) {
  if (risks.length === 0) {
    return (
      <div className="text-gray-500 text-sm text-center py-8">
        No risks match the current filters.
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 border-red-400 text-red-800";
      case "medium":
        return "bg-yellow-100 border-yellow-400 text-yellow-800";
      case "low":
        return "bg-blue-100 border-blue-400 text-blue-800";
      default:
        return "bg-gray-100 border-gray-400 text-gray-800";
    }
  };

  return (
    <div className="space-y-3">
      {risks.map((risk, idx) => (
        <div
          key={`${risk.ruleId}-${risk.page}-${idx}`}
          className={`border-l-4 p-4 rounded cursor-pointer hover:shadow-md transition-shadow ${getSeverityColor(
            risk.severity
          )}`}
          onClick={() => onRiskClick(risk)}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-sm">{risk.category}</span>
            <span className="text-xs px-2 py-1 bg-white rounded">
              {risk.severity.toUpperCase()}
            </span>
          </div>
          <p className="text-xs mb-2">{risk.explanation}</p>
          <p className="text-xs italic mb-2">"{risk.quote.substring(0, 150)}..."</p>
          <p className="text-xs font-medium">Suggestion: {risk.suggestion}</p>
          <div className="mt-2 text-xs text-gray-600">Page {risk.page} • Score: {risk.score}</div>
        </div>
      ))}
    </div>
  );
}

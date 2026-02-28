"use client";

import { AnalysisResult } from "@/internal/analyze/reports";
import { Severity } from "@/internal/rules/types";
import { useState, useMemo } from "react";

interface FiltersBarProps {
  result: AnalysisResult | null;
  onFilterChange: (filtered: AnalysisResult["risks"]) => void;
}

export default function FiltersBar({ result, onFilterChange }: FiltersBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeverity, setSelectedSeverity] = useState<Severity | "all">("all");

  const categories = useMemo(() => {
    if (!result) return [];
    const cats = new Set(result.risks.map((r) => r.category));
    return Array.from(cats).sort();
  }, [result]);

  useMemo(() => {
    if (!result) {
      onFilterChange([]);
      return;
    }

    let filtered = result.risks;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }

    if (selectedSeverity !== "all") {
      filtered = filtered.filter((r) => r.severity === selectedSeverity);
    }

    onFilterChange(filtered);
  }, [result, selectedCategory, selectedSeverity, onFilterChange]);

  if (!result) return null;

  return (
    <div className="mb-4 flex gap-4 flex-wrap">
      <div>
        <label className="text-sm font-medium mr-2">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium mr-2">Severity:</label>
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value as Severity | "all")}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
}

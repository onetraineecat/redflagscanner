"use client";

import { useState } from "react";
import PdfViewer from "@/components/PdfViewer";
import RiskPanel from "@/components/RiskPanel";
import SummaryPanel from "@/components/SummaryPanel";
import FiltersBar from "@/components/FiltersBar";
import DownloadButtons from "@/components/DownloadButtons";
import Disclaimer from "@/components/Disclaimer";
import { AnalysisResult } from "@/internal/analyze/reports";
import { Finding } from "@/internal/rules/types";

export default function Home() {
  const [file, setFile] = useState<string | File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [filteredRisks, setFilteredRisks] = useState<Finding[]>([]);
  const [highlightedRisk, setHighlightedRisk] = useState<Finding | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    if (uploadedFile.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setLoading(true);
    setResult(null);
    setHighlightedRisk(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setFilteredRisks(data.risks);
    } catch (err: any) {
      setError(err.message || "Failed to analyze PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = async () => {
    setFile("/demo-contract.pdf");
    setError(null);
    setLoading(true);
    setResult(null);
    setHighlightedRisk(null);

    try {
      // Fetch the demo PDF and upload it
      const response = await fetch("/demo-contract.pdf");
      const blob = await response.blob();
      const demoFile = new File([blob], "demo-contract.pdf", { type: "application/pdf" });

      const formData = new FormData();
      formData.append("file", demoFile);

      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      const data: AnalysisResult = await analyzeResponse.json();
      setResult(data);
      setFilteredRisks(data.risks);
    } catch (err: any) {
      setError(err.message || "Failed to analyze demo PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleRiskClick = (risk: Finding) => {
    setHighlightedRisk(risk);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Legal Red Flag Scanner</h1>

        <Disclaimer />

        <div className="mb-6 flex gap-4 items-center">
          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Upload PDF
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={loading}
            />
          </label>
          <button
            onClick={handleLoadDemo}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            Load Demo Contract
          </button>
          {loading && <span className="text-gray-600">Analyzing...</span>}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
            {error}
          </div>
        )}

        {result && (
          <div className="mb-4">
            <DownloadButtons result={result} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PDF Viewer - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded shadow p-4" style={{ minHeight: "800px" }}>
              <PdfViewer
                file={file}
                highlightedRisk={highlightedRisk}
                onPageChange={(page) => {
                  // Optional: handle page change
                }}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded shadow p-4">
              {result && (
                <>
                  <SummaryPanel result={result} />
                  <FiltersBar result={result} onFilterChange={setFilteredRisks} />
                  <h2 className="text-xl font-bold mb-3">Risks & Suggestions</h2>
                  <div className="max-h-[600px] overflow-y-auto">
                    <RiskPanel risks={filteredRisks} onRiskClick={handleRiskClick} />
                  </div>
                </>
              )}
              {!result && !loading && (
                <p className="text-gray-500 text-center py-8">
                  Upload a PDF or load the demo contract to see analysis results.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

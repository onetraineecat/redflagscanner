import { NextRequest, NextResponse } from "next/server";
import { extractPdfTextPerPage } from "@/internal/pdf/extractText";
import { analyzeContract } from "@/internal/analyze/analyzeContract";
import { AnalysisResult } from "@/internal/analyze/reports";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text per page
    const pages = await extractPdfTextPerPage(buffer);

    if (pages.length === 0 || pages.every((p) => !p.text.trim())) {
      return NextResponse.json(
        { error: "Could not extract text from PDF. The PDF may be image-based or encrypted." },
        { status: 400 }
      );
    }

    // Analyze contract
    const { findings, overallScore, summary } = analyzeContract(pages);

    // Generate docId (simple hash of file name + size + timestamp)
    const docId = `doc_${Date.now()}_${file.size}`;

    const result: AnalysisResult = {
      docId,
      pagesCount: pages.length,
      overallScore: Math.round(overallScore * 10) / 10,
      summary,
      risks: findings,
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze PDF" },
      { status: 500 }
    );
  }
}

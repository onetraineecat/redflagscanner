<video src="https://github.com/user-attachments/assets/1a837703-f220-429f-88a4-b51707768b98" controls></video>
[Смотреть видео](./redScaner.mp4)
https://github.com/user-attachments/assets/1a837703-f220-429f-88a4-b51707768b98


# Legal Red Flag Scanner

A Next.js application that scans US contracts (PDFs) for red-flag clauses, highlights them in a PDF viewer, and provides plain-English summaries and suggestions.

## Features

- Upload PDF contracts or load a demo contract
- Rule-based detection of 45+ common US contract red-flag clauses
- PDF viewer with text highlighting
- Risk panel with filtering by category and severity
- Downloadable JSON and Markdown reports
- Plain-English summary (5-12 bullets)

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

```bash
npm install
```

## Generate Demo PDF

Before running the app, generate the demo PDF:

```bash
npm run generate-demo
```

This creates `public/demo-contract.pdf` with sample clauses that trigger multiple rules.

## Running the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload a PDF**: Click "Upload PDF" and select a contract PDF file (max 25MB)
2. **Load Demo**: Click "Load Demo Contract" to analyze the included demo PDF
3. **View Results**: 
   - See the summary in the right panel
   - Filter risks by category or severity
   - Click a risk card to scroll to and highlight the relevant clause in the PDF
4. **Download Reports**: Use "Download JSON" or "Download Markdown" buttons to export analysis results

## Testing

### Unit Tests (Vitest)

```bash
npm test
```

Runs 18+ unit tests covering:
- Text normalization
- Rule matching
- Finding deduplication
- Scoring algorithms
- Summary generation
- Quote extraction
- Report generation

### E2E Tests (Playwright)

```bash
npm run e2e
```

Runs end-to-end tests that verify:
- App loads correctly
- Demo PDF upload and analysis
- Risk list display
- Click-to-highlight functionality

## Adding or Modifying Rules

Rules are defined in `internal/rules/usRules.ts`. Each rule includes:

- `id`: Unique identifier
- `category`: Risk category (e.g., "Auto-Renewal / Evergreen")
- `severityBase`: Base severity ("low", "medium", "high")
- `score`: Risk score (0-100)
- `patterns`: Array of RegExp patterns to match
- `explanationTemplate`: Plain-English explanation
- `suggestionTemplate`: Suggested action

Example:

```typescript
{
  id: "my-rule-1",
  category: "My Category",
  severityBase: "medium",
  score: 60,
  patterns: [
    /pattern\s+to\s+match/i,
    /another\s+pattern/i,
  ],
  explanationTemplate: "This clause does X, which may be problematic because Y.",
  suggestionTemplate: "Consider requesting Z instead.",
}
```

After modifying rules, restart the dev server and run tests to verify.

## Known Limitations

1. **PDF Text Extraction**: Uses `pdf-parse` which may not perfectly split text by page. Some PDFs may be treated as single-page.
2. **Highlighting**: Text highlighting relies on pdf.js textLayer. For PDFs with complex layouts or image-based text, highlighting may fall back to token-based matching or show "Highlight fallback used".
3. **Rule-Based Only**: This MVP uses regex patterns. It may produce false positives or miss nuanced clauses that require legal interpretation.
4. **US Contracts Only**: Rules are designed for US contract language and may not apply to international contracts.
5. **No Storage**: Analysis results are kept in memory for the session only. No database or file persistence.

## Project Structure

```
legal-redflag-scanner/
├── app/                    # Next.js app router
│   ├── api/analyze/       # PDF analysis API endpoint
│   ├── page.tsx           # Main page
│   └── layout.tsx          # Root layout
├── components/            # React components
│   ├── PdfViewer.tsx      # PDF viewer with highlighting
│   ├── RiskPanel.tsx      # Risk cards display
│   ├── SummaryPanel.tsx  # Summary display
│   └── ...
├── internal/
│   ├── rules/            # Rule definitions
│   ├── analyze/          # Analysis pipeline
│   └── pdf/              # PDF text extraction
├── tests/                # Vitest unit tests
├── tests-e2e/            # Playwright e2e tests
└── scripts/              # Utility scripts (demo PDF generation)
```

## Disclaimer

**This tool is for informational purposes only and does not constitute legal advice.** Consult with a qualified attorney for legal guidance on contract terms and negotiations.

## License

Private project - all rights reserved.

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const targetPath = path.join(projectRoot, "public", "pdf.worker.min.mjs");

const workerCandidates = [
  // Prefer worker bundled with react-pdf to match the API version used at runtime.
  path.join(
    projectRoot,
    "node_modules",
    "react-pdf",
    "node_modules",
    "pdfjs-dist",
    "build",
    "pdf.worker.min.mjs"
  ),
  // Fallback for flattened installs.
  path.join(projectRoot, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs"),
];

const sourcePath = workerCandidates.find((candidate) => fs.existsSync(candidate));

if (!sourcePath) {
  console.error("pdf.worker.min.mjs not found in node_modules.");
  process.exit(1);
}

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.copyFileSync(sourcePath, targetPath);

console.log(`Synced PDF worker: ${sourcePath} -> ${targetPath}`);

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument({ margin: 50 });
const outputPath = path.join(__dirname, "..", "public", "demo-contract.pdf");
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Page 1
doc.fontSize(16).text("SERVICE AGREEMENT", { align: "center" });
doc.moveDown();
doc.fontSize(12);

doc.text(
  "This Service Agreement (the 'Agreement') is entered into on January 1, 2025, between Company A ('Provider') and Company B ('Client')."
);
doc.moveDown();

doc.text("TERM AND AUTO-RENEWAL", { underline: true });
doc.text(
  "This Agreement shall commence on the Effective Date and shall automatically renew for successive one-year periods unless either party provides written notice of non-renewal at least thirty (30) days prior to the expiration of the then-current term. The Agreement shall continue indefinitely unless terminated in accordance with its terms."
);
doc.moveDown();

doc.text("TERMINATION", { underline: true });
doc.text(
  "Either party may terminate this Agreement for convenience upon thirty (30) days written notice. In the event of early termination by Client, Client shall pay an early termination fee equal to fifty percent (50%) of the remaining contract value. Provider may terminate this Agreement immediately for cause upon any material breach by Client."
);
doc.moveDown();

doc.text("UNILATERAL MODIFICATION", { underline: true });
doc.text(
  "Provider reserves the right to modify, amend, or change any terms of this Agreement, including pricing, at any time with thirty (30) days notice. Continued use of the services after such notice constitutes acceptance of the modified terms."
);
doc.moveDown();

doc.text("LIMITATION OF LIABILITY", { underline: true });
doc.text(
  "IN NO EVENT SHALL PROVIDER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, REGARDLESS OF THE THEORY OF LIABILITY. PROVIDER'S TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY CLIENT IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM."
);
doc.moveDown();

doc.text("INDEMNIFICATION", { underline: true });
doc.text(
  "Client agrees to indemnify, defend, and hold harmless Provider, its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to Client's use of the services, violation of this Agreement, or infringement of any third-party rights."
);

// Page 2
doc.addPage();
doc.fontSize(12);

doc.text("ARBITRATION AND CLASS ACTION WAIVER", { underline: true });
doc.text(
  "Any dispute arising out of or relating to this Agreement shall be resolved exclusively through binding arbitration administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted in New York, New York. Client waives any right to participate in a class action lawsuit or class-wide arbitration against Provider. Client agrees that disputes will be resolved on an individual basis only."
);
doc.moveDown();

doc.text("GOVERNING LAW AND VENUE", { underline: true });
doc.text(
  "This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. Any legal action or proceeding arising under this Agreement shall be brought exclusively in the federal or state courts located in Wilmington, Delaware, and Client hereby submits to the personal jurisdiction of such courts."
);
doc.moveDown();

doc.text("PAYMENT TERMS", { underline: true });
doc.text(
  "Client shall pay all fees within fifteen (15) days of invoice date. Late payments shall incur a late fee of five percent (5%) per month or the maximum allowed by law, whichever is less. In the event of non-payment, Provider may accelerate all outstanding amounts and suspend services immediately without notice."
);
doc.moveDown();

doc.text("ASSIGNMENT", { underline: true });
doc.text(
  "Client may not assign this Agreement or any rights hereunder without the prior written consent of Provider. Provider may assign this Agreement, in whole or in part, to any affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets."
);
doc.moveDown();

doc.text("CONFIDENTIALITY", { underline: true });
doc.text(
  "Each party agrees to maintain the confidentiality of all proprietary information received from the other party, whether marked confidential or not. Breach of confidentiality shall entitle the non-breaching party to seek injunctive relief and monetary damages. This obligation shall survive termination of this Agreement indefinitely."
);
doc.moveDown();

doc.text("INTELLECTUAL PROPERTY", { underline: true });
doc.text(
  "All work product, deliverables, and materials created under this Agreement shall be considered 'work made for hire' and shall be the exclusive property of Provider. To the extent any such work is not deemed work made for hire, Client hereby assigns all right, title, and interest in and to such work to Provider."
);
doc.moveDown();

doc.text("WARRANTIES AND DISCLAIMERS", { underline: true });
doc.text(
  "THE SERVICES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. PROVIDER DISCLAIMS ALL WARRANTIES TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW."
);
doc.moveDown();

doc.text("FORCE MAJEURE", { underline: true });
doc.text(
  "Provider shall not be liable for any failure or delay in performance due to circumstances beyond its reasonable control, including but not limited to acts of God, war, terrorism, labor disputes, or government actions. Client's payment obligations shall continue regardless of any force majeure event affecting Provider's performance."
);
doc.moveDown();

doc.text("AUDIT RIGHTS", { underline: true });
doc.text(
  "Provider shall have the right, upon reasonable notice, to audit Client's records, systems, and facilities to verify compliance with this Agreement, including usage of the services and payment obligations. Client shall cooperate fully with any such audit and provide all requested documentation."
);

doc.end();

stream.on("finish", () => {
  console.log(`Demo PDF generated at: ${outputPath}`);
});

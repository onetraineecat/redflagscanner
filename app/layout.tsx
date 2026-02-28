import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal Red Flag Scanner",
  description: "Scan US contracts for red-flag clauses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export type Severity = "low" | "medium" | "high";

export interface Rule {
  id: string;
  category: string;
  severityBase: Severity;
  score: number; // 0-100
  patterns: RegExp[];
  explanationTemplate: string;
  suggestionTemplate: string;
  examples?: string[];
}

export interface Finding {
  ruleId: string;
  category: string;
  severity: Severity;
  score: number;
  page: number;
  quote: string;
  explanation: string;
  suggestion: string;
}

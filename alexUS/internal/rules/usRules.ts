import { Rule } from "./types";

export const US_RULES: Rule[] = [
  // Auto-Renewal / Evergreen
  {
    id: "auto-renewal-1",
    category: "Auto-Renewal / Evergreen",
    severityBase: "medium",
    score: 60,
    patterns: [
      /automatically\s+renew/i,
      /auto[\s-]?renew/i,
      /evergreen/i,
      /shall\s+continue\s+indefinitely/i,
      /successive\s+(?:one[-\s]?year|annual)\s+periods/i,
    ],
    explanationTemplate:
      "This contract automatically renews without requiring explicit consent, which can lock you into long-term commitments.",
    suggestionTemplate:
      "Request a provision requiring mutual written consent for renewal, or ensure you can opt out with sufficient notice.",
  },
  {
    id: "auto-renewal-2",
    category: "Auto-Renewal / Evergreen",
    severityBase: "high",
    score: 75,
    patterns: [
      /unless\s+(?:either\s+)?party\s+provides\s+written\s+notice.*(?:days|months)\s+prior/i,
      /automatic\s+renewal.*unless.*notice/i,
    ],
    explanationTemplate:
      "Auto-renewal with short notice windows can trap you if you miss the deadline.",
    suggestionTemplate:
      "Negotiate a longer notice period (e.g., 60-90 days) and set calendar reminders for renewal dates.",
  },

  // Termination
  {
    id: "termination-convenience",
    category: "Termination",
    severityBase: "low",
    score: 30,
    patterns: [
      /terminate.*for\s+convenience/i,
      /terminate.*without\s+cause/i,
      /may\s+terminate.*upon\s+written\s+notice/i,
    ],
    explanationTemplate:
      "Termination for convenience clause allows either party to exit, which is generally favorable.",
    suggestionTemplate:
      "Ensure notice periods are reasonable (30-60 days) and that termination doesn't trigger excessive penalties.",
  },
  {
    id: "termination-cause",
    category: "Termination",
    severityBase: "medium",
    score: 50,
    patterns: [
      /terminate.*for\s+cause/i,
      /terminate.*material\s+breach/i,
      /immediate\s+termination.*breach/i,
    ],
    explanationTemplate:
      "Termination for cause provisions can be triggered by subjective 'material breach' definitions.",
    suggestionTemplate:
      "Request specific, objective criteria for what constitutes a material breach and a cure period before termination.",
  },
  {
    id: "early-termination-fee",
    category: "Termination",
    severityBase: "high",
    score: 80,
    patterns: [
      /early\s+termination\s+fee/i,
      /termination\s+fee.*(?:percent|%)/i,
      /liquidated\s+damages.*termination/i,
      /pay.*remaining\s+contract\s+value/i,
    ],
    explanationTemplate:
      "Early termination fees can be costly and may not reflect actual damages suffered by the other party.",
    suggestionTemplate:
      "Negotiate to remove or reduce early termination fees, or cap them at a reasonable percentage (e.g., 25% of remaining value).",
  },

  // Unilateral Changes
  {
    id: "unilateral-changes",
    category: "Unilateral Changes",
    severityBase: "high",
    score: 85,
    patterns: [
      /reserves\s+the\s+right\s+to\s+modify/i,
      /may\s+modify.*terms.*at\s+any\s+time/i,
      /change.*terms.*with\s+notice/i,
      /unilateral.*modification/i,
      /amend.*terms.*notice/i,
    ],
    explanationTemplate:
      "Unilateral modification clauses allow one party to change contract terms without your consent, potentially to your detriment.",
    suggestionTemplate:
      "Request that material changes require mutual written agreement, or at minimum, the right to terminate without penalty if you reject changes.",
  },

  // Limitation of Liability
  {
    id: "limitation-liability-1",
    category: "Limitation of Liability",
    severityBase: "medium",
    score: 55,
    patterns: [
      /limitation\s+of\s+liability/i,
      /total\s+liability.*shall\s+not\s+exceed/i,
      /liability.*limited\s+to/i,
    ],
    explanationTemplate:
      "Limitation of liability caps the other party's financial exposure, which may be insufficient if significant damages occur.",
    suggestionTemplate:
      "Evaluate whether the liability cap is reasonable relative to the contract value and potential risks. Consider negotiating exceptions for gross negligence or willful misconduct.",
  },
  {
    id: "limitation-liability-2",
    category: "Limitation of Liability",
    severityBase: "high",
    score: 70,
    patterns: [
      /no\s+liability.*indirect.*consequential/i,
      /exclude.*consequential\s+damages/i,
      /not\s+liable.*lost\s+profits/i,
      /no\s+liability.*punitive/i,
    ],
    explanationTemplate:
      "Exclusion of indirect, consequential, or punitive damages significantly limits your ability to recover for business losses.",
    suggestionTemplate:
      "Consider negotiating carve-outs for direct damages or specific types of losses that are foreseeable in your industry.",
  },

  // Indemnification
  {
    id: "indemnification-1",
    category: "Indemnification",
    severityBase: "medium",
    score: 60,
    patterns: [
      /indemnify.*hold\s+harmless/i,
      /indemnification/i,
      /agree\s+to\s+indemnify/i,
    ],
    explanationTemplate:
      "Indemnification clauses require you to cover the other party's losses, which can be expensive and broad in scope.",
    suggestionTemplate:
      "Request mutual indemnification, limit indemnification to your own negligence or breach, and exclude indemnification for the other party's sole negligence.",
  },
  {
    id: "indemnification-2",
    category: "Indemnification",
    severityBase: "high",
    score: 80,
    patterns: [
      /indemnify.*defend/i,
      /defend.*hold\s+harmless/i,
      /attorneys['\s]?fees/i,
      /defense\s+obligations/i,
    ],
    explanationTemplate:
      "Defense obligations require you to pay for the other party's legal costs, which can be substantial even if claims are unfounded.",
    suggestionTemplate:
      "Limit defense obligations to claims where you have actual liability, or negotiate that each party bears its own legal costs.",
  },
  {
    id: "indemnification-3",
    category: "Indemnification",
    severityBase: "high",
    score: 85,
    patterns: [
      /indemnify.*third[\s-]?party/i,
      /indemnify.*infringement/i,
      /indemnify.*any\s+and\s+all\s+claims/i,
    ],
    explanationTemplate:
      "Broad indemnification for third-party claims, including IP infringement, can expose you to unlimited liability.",
    suggestionTemplate:
      "Narrow indemnification scope to claims arising from your specific actions or breach, and exclude indemnification for the other party's products or services.",
  },

  // Arbitration / Class Action Waiver
  {
    id: "arbitration-1",
    category: "Arbitration / Class Action Waiver",
    severityBase: "medium",
    score: 50,
    patterns: [
      /binding\s+arbitration/i,
      /arbitration.*exclusive/i,
      /resolve.*arbitration/i,
    ],
    explanationTemplate:
      "Mandatory arbitration limits your access to courts and may favor repeat players in arbitration.",
    suggestionTemplate:
      "Consider whether arbitration is appropriate for your situation. If keeping it, ensure the arbitrator selection process is fair and neutral.",
  },
  {
    id: "arbitration-2",
    category: "Arbitration / Class Action Waiver",
    severityBase: "high",
    score: 75,
    patterns: [
      /waive.*class\s+action/i,
      /class[\s-]?wide\s+arbitration/i,
      /individual\s+basis\s+only/i,
      /no\s+class\s+action/i,
    ],
    explanationTemplate:
      "Class action waivers prevent you from joining with others who have similar claims, which can limit your leverage.",
    suggestionTemplate:
      "Evaluate whether the class action waiver is enforceable in your jurisdiction. Some states limit such waivers in consumer contracts.",
  },

  // Governing Law / Venue / Jurisdiction
  {
    id: "governing-law",
    category: "Governing Law / Venue / Jurisdiction",
    severityBase: "low",
    score: 40,
    patterns: [
      /governed\s+by.*laws\s+of/i,
      /construed.*accordance.*laws/i,
      /laws\s+of\s+the\s+State\s+of/i,
    ],
    explanationTemplate:
      "Governing law clauses determine which state's laws apply to disputes, which can affect your rights and remedies.",
    suggestionTemplate:
      "Ensure the chosen governing law is favorable to your position, or consider negotiating for your home state's laws.",
  },
  {
    id: "venue-jurisdiction",
    category: "Governing Law / Venue / Jurisdiction",
    severityBase: "medium",
    score: 55,
    patterns: [
      /exclusive\s+venue/i,
      /courts\s+located\s+in/i,
      /submit.*jurisdiction/i,
      /personal\s+jurisdiction/i,
    ],
    explanationTemplate:
      "Exclusive venue clauses require disputes to be litigated in a specific location, which can be inconvenient and costly if far from you.",
    suggestionTemplate:
      "Negotiate for a venue closer to your location, or request mutual venue selection or a neutral location.",
  },

  // Payment Terms
  {
    id: "late-fees",
    category: "Payment Terms / Late Fees / Interest / Acceleration",
    severityBase: "medium",
    score: 50,
    patterns: [
      /late\s+fee/i,
      /late\s+payment.*fee/i,
      /interest.*late\s+payment/i,
    ],
    explanationTemplate:
      "Late fees can add up quickly and may exceed what's legally permissible in your state.",
    suggestionTemplate:
      "Verify that late fees comply with state usury laws. Request a grace period and cap late fees at a reasonable rate.",
  },
  {
    id: "payment-acceleration",
    category: "Payment Terms / Late Fees / Interest / Acceleration",
    severityBase: "high",
    score: 70,
    patterns: [
      /accelerate.*outstanding/i,
      /immediate\s+payment.*all\s+amounts/i,
      /due\s+immediately.*default/i,
    ],
    explanationTemplate:
      "Acceleration clauses require immediate payment of all future amounts upon default, which can cause severe cash flow issues.",
    suggestionTemplate:
      "Request that acceleration only applies to material defaults and that you have a cure period before acceleration is triggered.",
  },
  {
    id: "payment-terms-short",
    category: "Payment Terms / Late Fees / Interest / Acceleration",
    severityBase: "low",
    score: 35,
    patterns: [
      /pay.*within\s+(?:7|10|15)\s+days/i,
      /payment\s+due.*(?:7|10|15)\s+days/i,
    ],
    explanationTemplate:
      "Short payment terms (7-15 days) can strain cash flow and increase the risk of late payment penalties.",
    suggestionTemplate:
      "Negotiate for standard net-30 payment terms, which are more common in business contracts.",
  },

  // Assignment / Change of Control
  {
    id: "assignment-restriction",
    category: "Assignment / Change of Control",
    severityBase: "medium",
    score: 45,
    patterns: [
      /may\s+not\s+assign/i,
      /assignment.*without.*consent/i,
      /prohibited.*assign/i,
    ],
    explanationTemplate:
      "Assignment restrictions can limit your ability to transfer the contract in a merger, acquisition, or business sale.",
    suggestionTemplate:
      "Request an exception for assignments to affiliates or in connection with a change of control or business sale.",
  },
  {
    id: "assignment-unilateral",
    category: "Assignment / Change of Control",
    severityBase: "medium",
    score: 55,
    patterns: [
      /may\s+assign.*without\s+consent/i,
      /assign.*merger.*acquisition/i,
      /assign.*affiliate/i,
    ],
    explanationTemplate:
      "One-sided assignment rights allow the other party to transfer the contract to a third party without your approval.",
    suggestionTemplate:
      "Request mutual assignment rights or the right to terminate if assignment occurs to an unacceptable third party.",
  },

  // Confidentiality
  {
    id: "confidentiality-overbroad",
    category: "Confidentiality",
    severityBase: "medium",
    score: 50,
    patterns: [
      /confidential.*whether\s+marked\s+or\s+not/i,
      /all\s+proprietary\s+information/i,
      /deemed\s+confidential/i,
    ],
    explanationTemplate:
      "Overbroad confidentiality clauses can restrict your ability to use information that should be public or that you already knew.",
    suggestionTemplate:
      "Request exceptions for publicly available information, information you already possessed, and information independently developed.",
  },
  {
    id: "confidentiality-injunction",
    category: "Confidentiality",
    severityBase: "medium",
    score: 60,
    patterns: [
      /injunctive\s+relief/i,
      /equitable\s+relief.*confidential/i,
      /seek\s+injunction/i,
    ],
    explanationTemplate:
      "Injunctive relief provisions can result in court orders stopping your business activities, even before a full trial.",
    suggestionTemplate:
      "Ensure injunctive relief is only available for actual breaches and that you have adequate notice and opportunity to defend.",
  },
  {
    id: "confidentiality-survival",
    category: "Confidentiality",
    severityBase: "low",
    score: 30,
    patterns: [
      /survive.*termination.*indefinitely/i,
      /survive.*termination.*perpetuity/i,
      /confidentiality.*survive/i,
    ],
    explanationTemplate:
      "Indefinite confidentiality obligations can restrict your business activities long after the contract ends.",
    suggestionTemplate:
      "Request a reasonable time limit on confidentiality obligations (e.g., 3-5 years) or tie it to when information becomes public.",
  },

  // IP Ownership / Work Made for Hire
  {
    id: "work-made-for-hire",
    category: "IP Ownership / Work Made for Hire / License Grants",
    severityBase: "high",
    score: 80,
    patterns: [
      /work\s+made\s+for\s+hire/i,
      /work\s+for\s+hire/i,
      /exclusive\s+property/i,
    ],
    explanationTemplate:
      "Work made for hire clauses transfer ownership of all work product to the other party, preventing you from reusing or licensing it.",
    suggestionTemplate:
      "Negotiate to retain ownership of pre-existing IP and background technology, or request a license back to use the work product.",
  },
  {
    id: "ip-assignment",
    category: "IP Ownership / Work Made for Hire / License Grants",
    severityBase: "high",
    score: 85,
    patterns: [
      /assign.*right.*title.*interest/i,
      /all\s+rights.*assigned/i,
      /exclusive\s+ownership/i,
    ],
    explanationTemplate:
      "IP assignment clauses transfer all intellectual property rights to the other party, which can be valuable and irreplaceable.",
    suggestionTemplate:
      "Retain ownership of your pre-existing IP and negotiate for a limited license grant instead of full assignment, or request fair compensation.",
  },
  {
    id: "license-grant-broad",
    category: "IP Ownership / Work Made for Hire / License Grants",
    severityBase: "medium",
    score: 55,
    patterns: [
      /grant.*perpetual.*license/i,
      /irrevocable.*license/i,
      /worldwide.*license/i,
    ],
    explanationTemplate:
      "Broad, perpetual licenses can limit your ability to control or monetize your intellectual property.",
    suggestionTemplate:
      "Limit license scope to what's necessary for the contract's purpose, include termination rights, and restrict sublicensing.",
  },

  // Warranties / Disclaimers
  {
    id: "as-is-disclaimer",
    category: "Warranties / Disclaimers",
    severityBase: "high",
    score: 70,
    patterns: [
      /as\s+is.*as\s+available/i,
      /provided.*as\s+is/i,
      /no\s+warranties/i,
      /disclaim.*warranties/i,
    ],
    explanationTemplate:
      "'As is' disclaimers eliminate all warranties, leaving you without recourse if the product or service is defective.",
    suggestionTemplate:
      "Request basic warranties of functionality and compliance with specifications, or at minimum, warranties against gross negligence.",
  },
  {
    id: "warranty-disclaimer-implied",
    category: "Warranties / Disclaimers",
    severityBase: "medium",
    score: 60,
    patterns: [
      /disclaim.*implied\s+warranties/i,
      /no\s+implied\s+warranty/i,
      /merchantability.*fitness/i,
    ],
    explanationTemplate:
      "Disclaimers of implied warranties (merchantability, fitness for purpose) remove legal protections you might otherwise have.",
    suggestionTemplate:
      "Some states limit the ability to disclaim implied warranties. Verify enforceability and request express warranties as a substitute.",
  },

  // Force Majeure
  {
    id: "force-majeure-overbroad",
    category: "Force Majeure",
    severityBase: "medium",
    score: 50,
    patterns: [
      /force\s+majeure/i,
      /beyond.*reasonable\s+control/i,
      /acts\s+of\s+god/i,
    ],
    explanationTemplate:
      "Overbroad force majeure clauses can excuse performance for events that should be manageable risks.",
    suggestionTemplate:
      "Request specific, limited force majeure events and require notice and mitigation efforts before performance is excused.",
  },
  {
    id: "force-majeure-payment",
    category: "Force Majeure",
    severityBase: "high",
    score: 75,
    patterns: [
      /payment.*obligations.*continue.*force\s+majeure/i,
      /force\s+majeure.*payment.*not\s+excused/i,
    ],
    explanationTemplate:
      "Force majeure clauses that don't excuse payment obligations can require you to pay even when you can't receive services.",
    suggestionTemplate:
      "Request that payment obligations are suspended during force majeure events, or at minimum, that payments are credited against future services.",
  },

  // Audit Rights
  {
    id: "audit-rights",
    category: "Audit Rights",
    severityBase: "low",
    score: 35,
    patterns: [
      /audit\s+rights/i,
      /right\s+to\s+audit/i,
      /audit.*records/i,
      /inspect.*records/i,
    ],
    explanationTemplate:
      "Audit rights allow the other party to examine your records and systems, which can be intrusive and time-consuming.",
    suggestionTemplate:
      "Limit audit frequency (e.g., once per year), require reasonable notice, restrict scope to contract compliance, and request mutual audit rights.",
  },
];

export type Language = "hinglish" | "hi" | "en";

export interface MatchResult {
  found: boolean;
  possible: boolean;
  score: number;
  best_match?: string;
  lender?: string;
  status: string;
  entity_type?: string;
  known_flagged: boolean;
  flagged_pattern?: string;
  reports_count?: number;
  matched_by?: string;
}

export interface VerifyResponse {
  query: string;
  match: MatchResult;
  permission_risk: number;
  red_flags: string[];
  verdict: "GREEN" | "AMBER" | "RED";
  explanation_hinglish: string;
}

export interface ExtractedLoanTerms {
  principal?: number | null;
  processing_fee?: number | null;
  gst_on_fee?: number | null;
  other_deductions?: number | null;
  insurance_fee?: number | null;
  disbursed_amount?: number | null;
  repayment_amount?: number | null;
  tenure_days?: number | null;
  stated_interest_text?: string | null;
  stated_apr_shown?: string | null;
  kfs_shown?: boolean;
  grievance_officer_shown?: boolean;
  cooling_off_mentioned?: boolean;
  lender_name?: string | null;
  app_name?: string | null;
  confidence: number;
}

export interface ComparisonItem {
  name: string;
  apr_pct: number;
  type: string;
}

export interface AprResponse {
  disbursed: number;
  repayment: number;
  total_cost: number;
  cost_pct_of_received: number;
  simple_apr_pct: number;
  compounded_apr_pct?: number | null;
  tenure_days: number;
  verdict: "SAFE" | "RISKY" | "PREDATORY";
  kfs_flags: string[];
  comparisons: ComparisonItem[];
  explanation: string;
}

export interface ClassifiedMessage {
  text: string;
  labels: string[];
  severity: number;
  language: string;
  key_phrases: string[];
  why: string;
}

export interface LegalInfoItem {
  label: string;
  title: string;
  bns_sections: string;
  it_act: string;
  description: string;
  rbi_directive: string;
}

export interface ThreatResponse {
  messages: ClassifiedMessage[];
  overall_severity: number;
  severity_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  message_count: number;
  summary: string;
  legal_info: LegalInfoItem[];
  safe_steps: string[];
}

export interface TimelineEvent {
  date: string;
  time?: string;
  channel: string;
  summary: string;
  evidence_file?: string;
}

export interface ComplaintResponse {
  complaint_id: string;
  draft_text: string;
  pdf_url: string;
  filing_guide: {
    cybercrime_steps: string[];
    call_script_1930: string;
    rbi_sachet_steps: string[];
  };
}

export interface FamilyResponse {
  headline: string;
  core_message: string;
  key_points: string[];
  what_to_say: string;
  helpline_info: string;
  share_text: string;
}

export interface DashboardStats {
  is_demo_data: boolean;
  data_disclaimer: string;
  total_reports_tracked: number;
  average_flagged_apr: number;
  top_flagged_apps: Array<{
    name: string;
    reports: number;
    risk_category: string;
  }>;
  scam_patterns: Array<{
    pattern: string;
    percentage: number;
    count: number;
  }>;
  monthly_trend: Array<{
    month: string;
    reports: number;
    resolved: number;
  }>;
  state_wise_distribution: Array<{
    state: string;
    reports: number;
    pct: number;
  }>;
  complaint_outcomes: {
    police_complaint_registered: string;
    sim_accounts_blocked: string;
    mule_upi_ids_frozen: string;
    avg_resolution_time_days: number;
  };
}

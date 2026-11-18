import {
  VerifyResponse,
  ExtractedLoanTerms,
  AprResponse,
  ThreatResponse,
  ComplaintResponse,
  FamilyResponse,
  DashboardStats,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function verifyApp(data: {
  query: string;
  play_url?: string;
  permissions?: string[];
  flags?: string[];
}): Promise<VerifyResponse> {
  const res = await fetch(`${API_BASE}/api/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Verification failed" }));
    throw new Error(err.detail || "Verification failed");
  }
  return res.json();
}

export async function extractFromScreenshot(file: File): Promise<ExtractedLoanTerms> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_BASE}/api/extract`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to extract terms from image" }));
    throw new Error(err.detail || "Extraction failed");
  }
  return res.json();
}

export async function extractFromText(text: string): Promise<ExtractedLoanTerms> {
  const res = await fetch(`${API_BASE}/api/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to extract terms from text" }));
    throw new Error(err.detail || "Extraction failed");
  }
  return res.json();
}

export async function calculateApr(payload: {
  principal: number;
  processing_fee?: number;
  gst_on_fee?: number;
  other_deductions?: number;
  insurance_fee?: number;
  disbursed_amount?: number;
  repayment_amount: number;
  tenure_days: number;
  kfs_checks?: Record<string, boolean>;
  language?: string;
}): Promise<AprResponse> {
  const res = await fetch(`${API_BASE}/api/apr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "APR calculation failed" }));
    throw new Error(err.detail || "APR calculation failed");
  }
  return res.json();
}

export async function analyzeThreats(
  messages: Array<{ text: string; timestamp?: string }>,
  language: string = "hinglish"
): Promise<ThreatResponse> {
  const res = await fetch(`${API_BASE}/api/threat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, language }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Threat classification failed" }));
    throw new Error(err.detail || "Classification failed");
  }
  return res.json();
}

export async function createComplaint(payload: any): Promise<ComplaintResponse> {
  const res = await fetch(`${API_BASE}/api/complaint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to generate complaint" }));
    throw new Error(err.detail || "Complaint generation failed");
  }
  return res.json();
}

export function getPdfDownloadUrl(pdfId: string): string {
  return `${API_BASE}/api/complaint/pdf/${pdfId}`;
}

export async function getFamilyAdvisory(
  message: string,
  language: string = "hinglish"
): Promise<FamilyResponse> {
  const res = await fetch(`${API_BASE}/api/family`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, language }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Failed to generate family guide" }));
    throw new Error(err.detail || "Guide generation failed");
  }
  return res.json();
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/api/dashboard`);
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return res.json();
}

import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../lib/i18n";
import Navbar from "../components/Navbar";
import PrivacyBanner from "../components/PrivacyBanner";
import Disclaimer from "../components/Disclaimer";

export const metadata: Metadata = {
  title: "Sahukar Shield | Check Loan Apps, Real Interest & Harassment Defense",
  description:
    "Free consumer defense against illegal digital loan apps. Verify RBI NBFC registration, calculate true 2,000%+ APR, and generate official cybercrime complaints.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#F8FAFC]" style={{ backgroundColor: "#F8FAFC" }}>
      <body
        className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased font-sans selection:bg-emerald-500 selection:text-white"
        style={{ backgroundColor: "#F8FAFC", color: "#0F172A" }}
      >
        <I18nProvider>
          <PrivacyBanner />
          <Navbar />
          <main className="flex-1 bg-[#F8FAFC] text-slate-900">{children}</main>
          <Disclaimer />
        </I18nProvider>
      </body>
    </html>
  );
}

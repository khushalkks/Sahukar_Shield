import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../lib/i18n";
import Navbar from "../components/Navbar";
import PrivacyBanner from "../components/PrivacyBanner";
import Disclaimer from "../components/Disclaimer";

export const metadata: Metadata = {
  title: "Sahukar Shield | Digital Lending Audit & Regulatory Defense",
  description:
    "Institutional credit audit, Reserve Bank of India (RBI) CoR verification, true effective APR deconstruction, and statutory cybercrime affidavit compilation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#080C14]" style={{ backgroundColor: "#080C14" }}>
      <body
        className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 antialiased font-sans selection:bg-emerald-500 selection:text-slate-950"
        style={{ backgroundColor: "#080C14" }}
      >
        <I18nProvider>
          <PrivacyBanner />
          <Navbar />
          <main className="flex-1 bg-[#080C14]">{children}</main>
          <Disclaimer />
        </I18nProvider>
      </body>
    </html>
  );
}

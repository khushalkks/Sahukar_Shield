import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../lib/i18n";
import Navbar from "../components/Navbar";
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
    <html lang="en" className="bg-[#FAFAFA]" style={{ backgroundColor: "#FAFAFA" }}>
      <body
        className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900 antialiased font-sans selection:bg-emerald-500 selection:text-white"
        style={{ backgroundColor: "#FAFAFA", color: "#09090B" }}
      >
        <I18nProvider>
          <Navbar />
          <main className="flex-1 bg-modern-ambient">{children}</main>
          <Disclaimer />
        </I18nProvider>
      </body>
    </html>
  );
}

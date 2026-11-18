import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "../lib/i18n";
import Navbar from "../components/Navbar";
import PrivacyBanner from "../components/PrivacyBanner";
import Disclaimer from "../components/Disclaimer";

export const metadata: Metadata = {
  title: "Sahukar Shield | Predatory Loan App Defense & APR X-Ray",
  description:
    "Loan lene se pehle check karo. Asli byaj jaano. Dhamki mile to jawab do. RBI directory verification, true APR calculation, and cybercrime complaint generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1F3A] antialiased">
        <I18nProvider>
          <PrivacyBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Disclaimer />
        </I18nProvider>
      </body>
    </html>
  );
}

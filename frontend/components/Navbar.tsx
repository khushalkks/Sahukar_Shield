"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  PhoneCall,
  Menu,
  X,
  FileText,
  Calculator,
  AlertTriangle,
  Users,
  BarChart3,
  HelpCircle,
  Activity,
  Radio,
  Scale,
  Building2,
  Landmark,
} from "lucide-react";
import LangToggle from "./LangToggle";
import { useI18n } from "../lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/verify", label: t("nav.verify", "Lender Audit"), icon: Landmark },
    { href: "/cost", label: t("nav.cost", "APR Deconstructor"), icon: Calculator },
    { href: "/threat", label: t("nav.threat", "Recovery Triage"), icon: AlertTriangle },
    { href: "/complaint", label: t("nav.complaint", "Regulatory Dossier"), icon: FileText },
    { href: "/family", label: t("nav.family", "Third-Party Advisory"), icon: Users },
    { href: "/dashboard", label: t("nav.dashboard", "Credit Telemetry"), icon: BarChart3 },
    { href: "/about", label: t("nav.about", "Audit Standards"), icon: Scale },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080C14]/95 backdrop-blur-md border-b border-[#1E2C4A] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Live Financial Status Dot */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full" />
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-black text-lg tracking-tight text-white">
                  SAHUKAR <span className="text-emerald-400">SHIELD</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  FINANCIAL AUDIT
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono -mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>RBI Master Registry &amp; True APR Engine</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-mono">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400/80" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Lang Toggle & Helpline */}
          <div className="hidden sm:flex items-center space-x-3">
            <LangToggle />
            <a
              href="tel:1930"
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-mono font-black shadow-lg shadow-rose-600/30 border border-rose-500/50 transition-all hover:scale-105"
              title="National Cyber Crime Reporting Helpline 1930"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1930 HELPLINE</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LangToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-200 hover:text-white focus:outline-none border border-slate-700"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080C14] border-b border-[#1E2C4A] px-4 pt-3 pb-6 space-y-2 font-mono">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href="tel:1930"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-rose-600 text-white font-black text-sm shadow-lg shadow-rose-600/30"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Dial 1930 Cybercrime Helpline</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, ShieldAlert, PhoneCall, Menu, X, FileText, Calculator, AlertTriangle, Users, BarChart3, HelpCircle } from "lucide-react";
import LangToggle from "./LangToggle";
import { useI18n } from "../lib/i18n";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/verify", label: t("nav.verify", "App Check"), icon: Shield },
    { href: "/cost", label: t("nav.cost", "True Cost"), icon: Calculator },
    { href: "/threat", label: t("nav.threat", "Threat Shield"), icon: AlertTriangle },
    { href: "/complaint", label: t("nav.complaint", "Complaint"), icon: FileText },
    { href: "/family", label: t("nav.family", "Family Alert"), icon: Users },
    { href: "/dashboard", label: t("nav.dashboard", "Dashboard"), icon: BarChart3 },
    { href: "/about", label: t("nav.about", "About"), icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B1F3A] text-white border-b border-navy-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                Sahukar <span className="text-teal-400">Shield</span>
              </span>
              <span className="block text-[10px] text-slate-300 font-medium -mt-1 hidden sm:block">
                Consumer Defense & Loan App Police
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                    isActive
                      ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                      : "text-slate-200 hover:text-white hover:bg-navy-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
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
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-colors animate-pulse"
              title="Cyber Crime Helpline 1930"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1930 Help</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <LangToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-navy-700 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071324] border-b border-navy-700 px-4 pt-2 pb-5 space-y-2">
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
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                    : "text-slate-200 hover:bg-navy-800"
                }`}
              >
                <Icon className="w-4 h-4 text-teal-400" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href="tel:1930"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-red-600 text-white font-bold text-sm shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Cybercrime Helpline 1930 Call Karein</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

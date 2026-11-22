"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  PhoneCall,
  Menu,
  X,
  LayoutDashboard,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center text-emerald-400 shadow-sm group-hover:bg-slate-900 transition-all">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-xl tracking-tight text-slate-950 font-sans">
                  Sahukar<span className="text-emerald-700">Shield</span>
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-900 border border-emerald-300 uppercase tracking-wider">
                  RBI Compliant
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 -mt-0.5">
                Consumer Credit Protection &amp; Anti-Usury Registry
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-extrabold text-slate-700">
            <Link
              href="/#features"
              className="hover:text-slate-950 transition-colors py-1"
            >
              Features
            </Link>
            <Link
              href="/#comparison"
              className="hover:text-slate-950 transition-colors py-1"
            >
              Predatory vs Regulated
            </Link>
            <Link
              href="/#rules"
              className="hover:text-slate-950 transition-colors py-1"
            >
              Legal Rights
            </Link>
            <Link
              href="/about"
              className={`hover:text-slate-950 transition-colors py-1 ${
                pathname === "/about" ? "text-slate-950 font-black" : ""
              }`}
            >
              RBI Directives
            </Link>
          </nav>

          {/* Right Action Hub */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* 1930 Emergency Helpline Pill */}
            <a
              href="tel:1930"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-black transition-all"
              title="National Cyber Crime Reporting Helpline 1930"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>Dial 1930</span>
            </a>

            {/* High-Contrast Dashboard CTA Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-xs sm:text-sm shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              href="/dashboard"
              className="px-3 py-2 rounded-xl bg-slate-950 text-white font-extrabold text-xs flex items-center space-x-1"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2 text-sm font-extrabold text-slate-800">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-300 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                <span>All-in-One Dashboard (All 6 Tools)</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Features &amp; Tools
            </Link>
            <Link
              href="/#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Predatory vs Regulated Loans
            </Link>
            <Link
              href="/#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Statutory Consumer Rights
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              RBI Fair Practices Directives
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <a
              href="tel:1930"
              className="w-full py-3 rounded-xl bg-rose-600 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>National Cyber Helpline (Dial 1930 Toll Free)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

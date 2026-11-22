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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform ring-1 ring-zinc-900/10">
              <Shield className="w-4.5 h-4.5 text-emerald-400" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-zinc-900">
                Sahukar<span className="text-emerald-600 font-extrabold">Shield</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
                Consumer Defense
              </span>
            </div>
          </Link>

          {/* Center: Modern Floating Pill Navigation */}
          <nav className="hidden md:flex items-center space-x-1 p-1 bg-zinc-100/70 rounded-full border border-zinc-200/60 text-xs font-semibold text-zinc-600 shadow-2xs">
            <Link
              href="/#features"
              className="px-3.5 py-1.5 rounded-full hover:text-zinc-950 hover:bg-white hover:shadow-2xs transition-all"
            >
              Features
            </Link>
            <Link
              href="/#comparison"
              className="px-3.5 py-1.5 rounded-full hover:text-zinc-950 hover:bg-white hover:shadow-2xs transition-all"
            >
              Predatory vs Safe
            </Link>
            <Link
              href="/#rules"
              className="px-3.5 py-1.5 rounded-full hover:text-zinc-950 hover:bg-white hover:shadow-2xs transition-all"
            >
              Borrower Rights
            </Link>
            <Link
              href="/about"
              className={`px-3.5 py-1.5 rounded-full hover:text-zinc-950 hover:bg-white hover:shadow-2xs transition-all ${
                pathname === "/about" ? "bg-white text-zinc-950 shadow-2xs font-bold" : ""
              }`}
            >
              RBI Directives
            </Link>
          </nav>

          {/* Right: Emergency Helpline + Launch Dashboard CTA */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* 1930 Cyber Helpline Pill */}
            <a
              href="tel:1930"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100/80 text-rose-700 border border-rose-200/70 text-xs font-bold transition-all"
              title="National Cyber Crime Reporting Helpline (Toll Free 1930)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>Dial 1930</span>
            </a>

            {/* Launch Dashboard Button */}
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs shadow-xs hover:shadow transition-all active:scale-95"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3 h-3 text-zinc-400" />
            </Link>
          </div>

          {/* Mobile Quick Action & Hamburger */}
          <div className="flex items-center space-x-2 md:hidden">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-full bg-zinc-950 text-white font-bold text-xs flex items-center space-x-1"
            >
              <span>Dashboard</span>
              <ArrowRight className="w-3 h-3 text-emerald-400" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-zinc-100 text-zinc-800 hover:bg-zinc-200 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1.5 text-sm font-semibold text-zinc-700">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 flex items-center justify-between font-bold"
            >
              <div className="flex items-center space-x-2.5">
                <LayoutDashboard className="w-4 h-4 text-emerald-700" />
                <span>Open All-in-One Dashboard</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </Link>

            <Link
              href="/#features"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Features &amp; Tools
            </Link>
            <Link
              href="/#comparison"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Predatory vs Regulated Loans
            </Link>
            <Link
              href="/#rules"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Statutory Consumer Rights
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              RBI Directives &amp; Fair Practices
            </Link>
          </div>

          <div className="pt-2 border-t border-zinc-200">
            <a
              href="tel:1930"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Cyber Crime Helpline: Dial 1930</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

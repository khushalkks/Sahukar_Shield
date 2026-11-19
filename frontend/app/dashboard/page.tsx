"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  AlertOctagon,
  TrendingUp,
  ShieldAlert,
  MapPin,
  Database,
  Search,
  Radio,
  Activity,
  Layers,
  Filter,
  Download,
  AlertTriangle,
  Lock,
  Smartphone,
  ExternalLink,
  Landmark,
  Scale,
} from "lucide-react";
import Disclaimer from "../../components/Disclaimer";
import { getDashboardStats } from "../../lib/api";
import { DashboardStats } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

const PIE_COLORS = ["#f43f5e", "#f59e0b", "#8b5cf6", "#10b981"];

const LIVE_INCIDENTS = [
  { id: 1, time: "JUST NOW", app: "RupeeBox Pro", state: "Maharashtra", type: "Morphed Photos Threat", severity: "CRITICAL" },
  { id: 2, time: "2 MIN AGO", app: "FastCoin Instant", state: "Karnataka", type: "2,840% APR (7-Day Trap)", severity: "PREDATORY" },
  { id: 3, time: "5 MIN AGO", app: "CashHero Loans", state: "Delhi NCR", type: "Contact List Blackmail", severity: "HIGH" },
  { id: 4, time: "9 MIN AGO", app: "SuperCredit App", state: "Telangana", type: "Fake Police Summons Notice", severity: "CRITICAL" },
  { id: 5, time: "14 MIN AGO", app: "QuickRupee Instant", state: "Uttar Pradesh", type: "3,120% APR Extortion", severity: "PREDATORY" },
];

export default function DashboardPage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "CRITICAL" | "HIGH">("ALL");

  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats(data))
      .catch((err) => console.error("Dashboard stats error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredApps = useMemo(() => {
    if (!stats) return [];
    return stats.top_flagged_apps.filter((app) => {
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (activeFilter === "CRITICAL") return matchesSearch && app.reports > 350;
      if (activeFilter === "HIGH") return matchesSearch && app.reports <= 350;
      return matchesSearch;
    });
  }, [stats, searchQuery, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 font-mono">
      {/* Top Header & Telemetry Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2C4A] pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>CENTRAL REGULATORY CREDIT TELEMETRY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Predatory Credit <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">Telemetry &amp; Watch-List</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1 font-sans font-normal">
            Macro-level empirical intelligence on predatory APR distributions, usurious tenure patterns, and nationwide regulatory enforcement freezes.
          </p>
        </div>

        {/* Cluster Status Badge */}
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-[#1E2C4A]">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="text-right">
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest">INGESTION STREAM</span>
              <span className="text-xs font-bold text-white font-mono">LIVE REGULATORY MATRIX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Cyber Incident Stream Ticker */}
      <div className="glass-panel-elevated rounded-2xl p-3 border border-emerald-500/30 flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-800 text-[10px] font-black text-emerald-400 shrink-0">
          <Activity className="w-3.5 h-3.5" />
          <span>LIVE CREDIT INCIDENT STREAM</span>
        </div>
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center space-x-6 text-xs font-mono">
          {LIVE_INCIDENTS.map((inc) => (
            <div key={inc.id} className="flex items-center space-x-2 shrink-0">
              <span className="text-[10px] text-slate-500 font-bold">{inc.time}</span>
              <span className="text-slate-200 font-bold">{inc.app}</span>
              <span className="text-slate-400">({inc.state})</span>
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                inc.severity === "CRITICAL" ? "bg-rose-950 text-rose-400 border border-rose-800" : "bg-amber-950 text-amber-400 border border-amber-800"
              }`}>
                {inc.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="glass-panel p-16 text-center text-slate-400 text-sm space-y-3">
          <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <span>Aggregating financial credit intelligence feeds &amp; incident logs...</span>
        </div>
      ) : stats ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-6 rounded-3xl border border-[#1E2C4A] text-center space-y-1 relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Tracked Regulatory Dossiers
              </span>
              <p className="text-3xl sm:text-4xl font-black text-white mt-1">
                {stats.total_reports_tracked.toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                Benchmark Sample Cluster
              </span>
            </div>

            <div className="glass-panel-danger p-6 rounded-3xl border border-rose-500/30 text-center space-y-1 relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 block">
                Average Flagged APR
              </span>
              <p className="text-3xl sm:text-4xl font-black text-rose-400 mt-1">
                {stats.average_flagged_apr.toFixed(0)}%
              </p>
              <span className="text-[10px] text-rose-300 font-semibold block">
                Usurious 7-15 Day Facilities
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-[#1E2C4A] text-center space-y-1 relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Harassment SIMs Blocked
              </span>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 mt-1">
                {stats.complaint_outcomes.sim_accounts_blocked.toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-300 font-semibold block">
                DoT / 1930 De-Registration
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-[#1E2C4A] text-center space-y-1 relative overflow-hidden">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Mule UPI IDs Frozen
              </span>
              <p className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                {stats.complaint_outcomes.mule_upi_ids_frozen.toLocaleString()}
              </p>
              <span className="text-[10px] text-amber-300 font-semibold block">
                NPCI / Banking Directives
              </span>
            </div>
          </div>

          {/* Charts Row 1: Top Reported Apps Bar Chart & Scam Pattern Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Chart 1: Top Reported Apps (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2C4A] space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-rose-400" />
                  <span>Top Flagged Lending Entities (Incident Volume)</span>
                </h3>
                <span className="text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                  UNLICENSED PERIMETER
                </span>
              </div>
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.top_flagged_apps.slice(0, 7)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={130}
                      tick={{ fontSize: 11, fill: "#e2e8f0", fontWeight: "bold" }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0E1526", borderColor: "#1E2C4A", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                    />
                    <Bar dataKey="reports" fill="#f43f5e" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Scam Pattern Split (5 cols) */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-[#1E2C4A] space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>Coercive Collection Tactics Distribution</span>
                </h3>
              </div>
              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.scam_patterns}
                      dataKey="percentage"
                      nameKey="pattern"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name.split(" ")[0]} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={{ stroke: "#64748b" }}
                    >
                      {stats.scam_patterns.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0E1526", borderColor: "#1E2C4A", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Interactive Searchable Watchlist Table */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#1E2C4A] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>High-Risk Digital Lending Watch-List</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Search active flagged APK packages, syndicate affiliations, and reported threat patterns.
                </p>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search flagged app name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === "ALL" ? "bg-emerald-500 text-slate-950" : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("CRITICAL")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeFilter === "CRITICAL" ? "bg-rose-500 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  Critical Volume
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="pb-3 font-bold">App Identifier</th>
                    <th className="pb-3 font-bold">Purported Entity</th>
                    <th className="pb-3 font-bold">Effective APR</th>
                    <th className="pb-3 font-bold">Dossier Volume</th>
                    <th className="pb-3 font-bold">Primary Infraction</th>
                    <th className="pb-3 font-bold text-right">Regulatory Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredApps.map((app, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>{app.name}</span>
                      </td>
                      <td className="py-3 text-slate-400">{app.name} Lending Syndicate</td>
                      <td className="py-3 font-bold text-rose-400">2,200% - 3,600%</td>
                      <td className="py-3 font-bold text-white">{app.reports}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-800 text-rose-300 text-[10px]">
                          Morphed Media / Extortion
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-[10px] border border-rose-500/40">
                          CRITICAL RISK
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Row 2: 12-Month Incident Ingestion vs Resolution Trajectory */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#1E2C4A] space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>12-Month Incident Reports vs Regulatory Enforcement Freezes</span>
              </h3>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                MACRO TRAJECTORY
              </span>
            </div>
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.monthly_trend} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0E1526", borderColor: "#1E2C4A", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", color: "#cbd5e1" }} />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    name="Reported Usury Incidents"
                    stroke="#f43f5e"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#f43f5e" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    name="Regulatory Freezes (1930 / NPCI)"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* State-Wise Geographic Hotspots */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-[#1E2C4A] space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  State-Wise Threat Incident Distribution
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">REGIONAL EXPOSURE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.state_wise_distribution.map((st, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#080C14] border border-white/5 space-y-1">
                  <span className="text-xs font-bold text-white block truncate font-sans">{st.state}</span>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{st.reports.toLocaleString()} cases</span>
                    <span className="font-bold text-emerald-400">{st.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full"
                      style={{ width: `${Math.min(st.pct * 4, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Disclaimer inline />
        </div>
      ) : null}
    </div>
  );
}

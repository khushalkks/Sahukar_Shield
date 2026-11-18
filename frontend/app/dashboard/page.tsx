"use client";

import React, { useState, useEffect } from "react";
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
import { BarChart3, AlertOctagon, TrendingUp, ShieldAlert, MapPin, Database } from "lucide-react";
import Disclaimer from "../../components/Disclaimer";
import { getDashboardStats } from "../../lib/api";
import { DashboardStats } from "../../lib/types";
import { useI18n } from "../../lib/i18n";

const PIE_COLORS = ["#DC2626", "#F59E0B", "#8B5CF6", "#0D9488"];

export default function DashboardPage() {
  const { t } = useI18n();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((data) => setStats(data))
      .catch((err) => console.error("Dashboard stats error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
            <span>Predatory Lending Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-800">
            {t("dashboard.title", "Predatory Loan Scam Dashboard")}
          </h1>
          <p className="text-sm text-slate-600">
            {t(
              "dashboard.subtitle",
              "Synthetic benchmark analytics: common predatory patterns, top reported fake apps, aur average APR."
            )}
          </p>
        </div>

        {/* Demo Data Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs shrink-0 self-start sm:self-center">
          <Database className="w-3.5 h-3.5 text-amber-600" />
          <span>{t("dashboard.demo_badge", "Synthetic Demo Data")}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-sm">
          Loading threat intelligence analytics...
        </div>
      ) : stats ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Tracked Reports
              </span>
              <p className="text-3xl font-black text-navy-800 mt-1">
                {stats.total_reports_tracked.toLocaleString()}
              </p>
              <span className="text-[11px] text-teal-600 font-semibold block mt-1">
                Synthetic Test Cluster
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Average Flagged APR
              </span>
              <p className="text-3xl font-black text-red-600 mt-1">
                {stats.average_flagged_apr.toFixed(0)}%
              </p>
              <span className="text-[11px] text-red-600 font-semibold block mt-1">
                Predatory 7-15 Day Loans
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sim Cards Blocked
              </span>
              <p className="text-3xl font-black text-teal-600 mt-1">
                {stats.complaint_outcomes.sim_accounts_blocked}
              </p>
              <span className="text-[11px] text-slate-500 block mt-1">
                Via 1930 Cyber Coordination
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Mule UPI IDs Frozen
              </span>
              <p className="text-3xl font-black text-navy-800 mt-1">
                {stats.complaint_outcomes.mule_upi_ids_frozen}
              </p>
              <span className="text-[11px] text-slate-500 block mt-1">
                NPCI / Bank Escalations
              </span>
            </div>
          </div>

          {/* Charts Row 1: Top Reported Apps & Pattern Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Top Reported Apps */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800">
                Top Reported Predatory Apps (Demo)
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.top_flagged_apps.slice(0, 7)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={120}
                      tick={{ fontSize: 11, fontWeight: "bold" }}
                    />
                    <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                    <Bar dataKey="reports" fill="#DC2626" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Scam Pattern Split */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800">
                Scam Tactics Distribution
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.scam_patterns}
                      dataKey="percentage"
                      nameKey="pattern"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {stats.scam_patterns.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Charts Row 2: 12-Month Trend Line Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800">
              12-Month Incident Report & Resolution Trajectory
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.monthly_trend} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    type="monotone"
                    dataKey="reports"
                    name="Incident Reports"
                    stroke="#DC2626"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolved"
                    name="Complaints Filed & Escalated"
                    stroke="#0D9488"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* State-Wise Heat Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy-800">
                State-Wise Incident Breakdown
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.state_wise_distribution.map((st, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-bold text-navy-800 block truncate">{st.state}</span>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-600">{st.reports} cases</span>
                    <span className="font-bold text-teal-700">{st.pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div
                      className="bg-teal-500 h-1.5 rounded-full"
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

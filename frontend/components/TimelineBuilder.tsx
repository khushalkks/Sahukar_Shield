"use client";

import React, { useState } from "react";
import { TimelineEvent } from "../lib/types";
import { Plus, Trash2, Calendar, Clock, MessageSquare, ShieldAlert } from "lucide-react";

interface TimelineBuilderProps {
  events: TimelineEvent[];
  onChange: (events: TimelineEvent[]) => void;
}

export default function TimelineBuilder({ events, onChange }: TimelineBuilderProps) {
  const [newDate, setNewDate] = useState(new Date().toISOString().split("T")[0]);
  const [newTime, setNewTime] = useState("");
  const [newChannel, setNewChannel] = useState("WhatsApp");
  const [newSummary, setNewSummary] = useState("");
  const [newEvidenceFile, setNewEvidenceFile] = useState("");

  const addEvent = () => {
    if (!newSummary.trim()) return;
    const item: TimelineEvent = {
      date: newDate,
      time: newTime || undefined,
      channel: newChannel,
      summary: newSummary.trim(),
      evidence_file: newEvidenceFile.trim() || undefined,
    };
    onChange([...events, item]);
    setNewSummary("");
    setNewEvidenceFile("");
  };

  const removeEvent = (index: number) => {
    onChange(events.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Existing Events List */}
      {events.length > 0 ? (
        <div className="space-y-2.5">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-sm"
            >
              <div className="space-y-1.5 flex-1 pr-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>{ev.date} {ev.time && `at ${ev.time}`}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-cyan-300 font-semibold border border-white/10 text-[11px]">
                    {ev.channel}
                  </span>
                  {ev.evidence_file && (
                    <span className="text-[10px] text-teal-400 font-mono bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                      [{ev.evidence_file}]
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {ev.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeEvent(idx)}
                className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-950/30 transition-colors"
                title="Remove event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 text-center text-xs text-slate-400">
          No incident timeline events recorded yet. Add chronological occurrences below or auto-import directly from Threat Shield.
        </div>
      )}

      {/* Add New Event Form */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Log New Harassment Occurrence:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Occurrence Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Time (e.g. 11:30 AM)</label>
            <input
              type="text"
              placeholder="11:30 AM"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono focus:border-teal-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">Communication Channel</label>
            <select
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono focus:border-teal-400 focus:outline-none"
            >
              <option value="WhatsApp">WhatsApp Message / Group</option>
              <option value="SMS">Cellular SMS</option>
              <option value="Phone Call">Audio Telephone Call</option>
              <option value="Social Media">Instagram / Facebook DM</option>
              <option value="Email">Email Demand</option>
              <option value="In-Person">Physical Recovery Agent Visit</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">
            Factual Summary of Harassment / Threat
          </label>
          <input
            type="text"
            placeholder="e.g. Agent sent abusive message threatening to contact employer unless 5,000 paid"
            value={newSummary}
            onChange={(e) => setNewSummary(e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono focus:border-teal-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1">
              Evidence Reference File (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. screenshot_threat_01.png"
              value={newEvidenceFile}
              onChange={(e) => setNewEvidenceFile(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono focus:border-teal-400 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={addEvent}
            disabled={!newSummary.trim()}
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Append Event to Timeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}

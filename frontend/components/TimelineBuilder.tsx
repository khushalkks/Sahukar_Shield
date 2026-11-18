"use client";

import React, { useState } from "react";
import { TimelineEvent } from "../lib/types";
import { Plus, Trash2, Calendar, Clock, MessageSquare } from "lucide-react";

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
    <div className="space-y-4">
      {/* Existing Events List */}
      {events.length > 0 ? (
        <div className="space-y-2.5">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-navy-800 dark:text-slate-200 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
                    {ev.date} {ev.time && `at ${ev.time}`}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                    {ev.channel}
                  </span>
                  {ev.evidence_file && (
                    <span className="text-[11px] text-teal-600 font-mono">
                      [{ev.evidence_file}]
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {ev.summary}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeEvent(idx)}
                className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
                title="Event hatayein"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500">
          Abhi koi timeline event add nahi hua hai. Niche form se add karein ya Threat Shield se import karein.
        </div>
      )}

      {/* Add New Event Form */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
          Naya Incident Event Jodein:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Time (Optional)</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Channel</label>
            <select
              value={newChannel}
              onChange={(e) => setNewChannel(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              <option value="WhatsApp">WhatsApp</option>
              <option value="Phone Call">Phone Call</option>
              <option value="SMS">SMS</option>
              <option value="App Notification">App Notification</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Incident Summary</label>
          <input
            type="text"
            placeholder="Jaise: Agent called using virtual number threatening to morph gallery photos"
            value={newSummary}
            onChange={(e) => setNewSummary(e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Evidence file name (e.g. screenshot_01.jpg)"
            value={newEvidenceFile}
            onChange={(e) => setNewEvidenceFile(e.target.value)}
            className="text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex-1"
          />
          <button
            type="button"
            onClick={addEvent}
            className="inline-flex items-center space-x-1 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Event Add Karein</span>
          </button>
        </div>
      </div>
    </div>
  );
}

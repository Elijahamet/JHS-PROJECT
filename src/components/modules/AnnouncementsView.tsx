import React, { useState } from 'react';
import { Megaphone, Plus, Clock, Users, Tag } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatDate } from '../../utils/formatters';

export const AnnouncementsView: React.FC = () => {
  const { announcements, setIsCreateAnnouncementOpen } = useApp();
  const [filterAudience, setFilterAudience] = useState('ALL');

  const filtered = announcements.filter(
    (a) => filterAudience === 'ALL' || a.audience === filterAudience
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            School Announcements & Circulars (SchoolConnect)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Broadcast official notices, PTA circulars, academic schedules, and emergency alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setIsCreateAnnouncementOpen(true)}
          >
            Create Announcement
          </Button>
        </div>
      </div>

      {/* Audience Filter Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        {['ALL', 'Whole School', 'Parents Only', 'Teachers Only', 'PTA'].map(
          (aud) => (
            <button
              key={aud}
              onClick={() => setFilterAudience(aud)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                filterAudience === aud
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {aud === 'ALL' ? 'All Audiences' : aud}
            </button>
          )
        )}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((ann) => (
          <div
            key={ann.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900">{ann.title}</h3>
                <Badge
                  variant={
                    ann.priority === 'Important'
                      ? 'warning'
                      : ann.priority === 'Urgent'
                      ? 'danger'
                      : 'neutral'
                  }
                >
                  {ann.priority}
                </Badge>
                <Badge variant="navy">{ann.audience}</Badge>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(ann.publishDate)}</span>
                <span>•</span>
                <span className="font-medium text-slate-600">
                  {ann.authorName} ({ann.authorRole})
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/50 p-3.5 rounded-lg border border-slate-100">
              {ann.message}
            </p>

            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
              <span>Status: <strong className="text-emerald-700 font-semibold">{ann.status}</strong></span>
              <button
                onClick={() => alert(`Notice link copied for: ${ann.title}`)}
                className="text-blue-600 hover:underline font-medium"
              >
                Copy Public Notice Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

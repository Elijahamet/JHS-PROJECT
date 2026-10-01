import React, { useState } from 'react';
import { Layers, Users, CalendarCheck, BookOpen, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const ClassesView: React.FC = () => {
  const { classes, setCurrentNav } = useApp();
  const [selectedStage, setSelectedStage] = useState<'ALL' | 'Primary' | 'JHS'>('ALL');

  const filteredClasses = classes.filter(
    (c) => selectedStage === 'ALL' || c.stage === selectedStage
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Classes & Academic Subjects
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Organized streams from Primary (Basic 1–6) to Junior High School (JHS 1–3).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" icon={Plus}>
            New Class Stream
          </Button>
        </div>
      </div>

      {/* Stage filter buttons */}
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setSelectedStage('ALL')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            selectedStage === 'ALL'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Stages ({classes.length})
        </button>
        <button
          onClick={() => setSelectedStage('Primary')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            selectedStage === 'Primary'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Primary (Basic 1 - 6)
        </button>
        <button
          onClick={() => setSelectedStage('JHS')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            selectedStage === 'JHS'
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Junior High School (JHS 1 - 3)
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{cls.name}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {cls.roomNumber}
                </p>
              </div>
              <Badge variant={cls.stage === 'JHS' ? 'navy' : 'info'}>
                {cls.stage}
              </Badge>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Class Teacher:</span>
                <span className="font-semibold text-slate-900">
                  {cls.classTeacherName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Students Enrolled:</span>
                <span className="font-semibold text-slate-900">
                  {cls.studentCount} / {cls.capacity} (Capacity)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Average Attendance:</span>
                <span className="font-semibold text-emerald-700">
                  {cls.averageAttendance}%
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Curriculum Subjects ({cls.subjects.length})
              </span>
              <div className="flex flex-wrap gap-1">
                {cls.subjects.slice(0, 5).map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded font-medium"
                  >
                    {sub}
                  </span>
                ))}
                {cls.subjects.length > 5 && (
                  <span className="px-1.5 py-0.5 text-slate-400 text-[10px] font-medium">
                    +{cls.subjects.length - 5} more
                  </span>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setCurrentNav('students')}
                className="text-blue-600 font-semibold hover:underline"
              >
                View Class Roster →
              </button>
              <button
                onClick={() => setCurrentNav('attendance')}
                className="text-slate-500 hover:text-slate-900 font-medium"
              >
                Attendance Log
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import {
  CalendarCheck,
  FileSpreadsheet,
  BookOpen,
  MessageSquare,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const TeacherPortalView: React.FC = () => {
  const { currentUser, setCurrentNav, classes } = useApp();

  const teacherClasses = [
    { name: 'JHS 2A', count: 34, role: 'Class Teacher & Mathematics', room: 'Block C - 302', attendanceToday: 'Submitted (94.2%)' },
    { name: 'JHS 2B', count: 31, role: 'Mathematics & Integrated Science', room: 'Block C - 303', attendanceToday: 'Submitted (91.5%)' },
    { name: 'Basic 4', count: 33, role: 'Science Instructor', room: 'Block B - 201', attendanceToday: 'Submitted (94.5%)' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Teacher Cockpit Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
              Teacher Workbench
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
              Good Morning, {currentUser.name}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              B.Ed Mathematics & Science (UEW) • Class Teacher for <strong>JHS 2A</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="primary"
              icon={CalendarCheck}
              onClick={() => setCurrentNav('attendance')}
            >
              Take Attendance
            </Button>
            <Button
              size="sm"
              variant="outline"
              icon={FileSpreadsheet}
              onClick={() => setCurrentNav('results')}
            >
              Enter Marks
            </Button>
          </div>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs">
          <button
            onClick={() => setCurrentNav('attendance')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
          >
            <div>
              <CalendarCheck className="w-5 h-5 text-blue-600 mb-1" />
              <p className="font-semibold text-slate-900">Today&apos;s Roll Call</p>
              <p className="text-[10px] text-slate-500">Record attendance</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>

          <button
            onClick={() => setCurrentNav('results')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
          >
            <div>
              <FileSpreadsheet className="w-5 h-5 text-emerald-600 mb-1" />
              <p className="font-semibold text-slate-900">Continuous Assessment</p>
              <p className="text-[10px] text-slate-500">Enter test/exam marks</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>

          <button
            onClick={() => alert('Homework assigner modal')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
          >
            <div>
              <BookOpen className="w-5 h-5 text-amber-600 mb-1" />
              <p className="font-semibold text-slate-900">Post Homework</p>
              <p className="text-[10px] text-slate-500">Assign exercises</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>

          <button
            onClick={() => setCurrentNav('announcements')}
            className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors flex items-center justify-between group"
          >
            <div>
              <MessageSquare className="w-5 h-5 text-purple-600 mb-1" />
              <p className="font-semibold text-slate-900">Message Parents</p>
              <p className="text-[10px] text-slate-500">Class broadcast</p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
          </button>
        </div>
      </div>

      {/* My Assigned Classes */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          My Teaching Schedules & Classes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teacherClasses.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">{cls.name}</h4>
                  <Badge variant="navy">{cls.count} Students</Badge>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  {cls.role}
                </p>
                <p className="text-[11px] text-slate-400">{cls.room}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-700 font-medium">
                  {cls.attendanceToday}
                </span>
                <button
                  onClick={() => setCurrentNav('results')}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Gradebook →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

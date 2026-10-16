import React, { useState } from 'react';
import { Layers, Users, CalendarCheck, BookOpen, Plus, UserCheck, Check, X, Edit3 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const ClassesView: React.FC = () => {
  const { classes, setCurrentNav, setIsAddClassOpen, teachers, assignTeacherToClass } = useApp();
  const [selectedStage, setSelectedStage] = useState<'ALL' | 'Primary' | 'JHS'>('ALL');
  const [editingTeacherClassId, setEditingTeacherClassId] = useState<string | null>(null);
  const [selectedTeacherIdForClass, setSelectedTeacherIdForClass] = useState<string>('');

  const filteredClasses = classes.filter(
    (c) => selectedStage === 'ALL' || c.stage === selectedStage
  );

  const handleStartEditTeacher = (classId: string, currentTeacherId: string) => {
    setEditingTeacherClassId(classId);
    setSelectedTeacherIdForClass(currentTeacherId || '');
  };

  const handleSaveTeacherAssignment = (classId: string) => {
    assignTeacherToClass(classId, selectedTeacherIdForClass);
    setEditingTeacherClassId(null);
  };

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
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setIsAddClassOpen(true)}
          >
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
        {filteredClasses.map((cls) => {
          const isEditingTeacher = editingTeacherClassId === cls.id;
          const isUnassigned = !cls.classTeacherName || cls.classTeacherName === 'Unassigned';

          return (
            <div
              key={cls.id}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-4 hover:shadow-xs transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{cls.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {cls.roomNumber} • Code: <span className="text-slate-700 font-mono font-semibold">{cls.code}</span>
                  </p>
                </div>
                <Badge variant={cls.stage === 'JHS' ? 'navy' : 'info'}>
                  {cls.stage}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                {/* Class Teacher with Assignment Controls */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      Class Teacher:
                    </span>
                    {!isEditingTeacher && (
                      <button
                        onClick={() => handleStartEditTeacher(cls.id, cls.classTeacherId)}
                        className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 hover:underline"
                        title="Assign or reassign class teacher"
                      >
                        <Edit3 className="w-3 h-3" />
                        {isUnassigned ? 'Assign Teacher' : 'Change'}
                      </button>
                    )}
                  </div>

                  {isEditingTeacher ? (
                    <div className="mt-2 space-y-2">
                      <select
                        value={selectedTeacherIdForClass}
                        onChange={(e) => setSelectedTeacherIdForClass(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-indigo-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                      >
                        <option value="">— Unassigned —</option>
                        {teachers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.fullName} ({t.staffId})
                          </option>
                        ))}
                      </select>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingTeacherClassId(null)}
                          className="px-2 py-1 text-[11px] rounded border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveTeacherAssignment(cls.id)}
                          className="px-2.5 py-1 text-[11px] rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-semibold ${
                          isUnassigned ? 'text-amber-600 italic' : 'text-slate-900'
                        }`}
                      >
                        {cls.classTeacherName || 'Unassigned'}
                      </span>
                      {isUnassigned && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded font-medium">
                          Action Needed
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between px-1">
                  <span className="text-slate-500">Students Enrolled:</span>
                  <span className="font-semibold text-slate-900">
                    {cls.studentCount} / {cls.capacity} (Capacity)
                  </span>
                </div>
                <div className="flex items-center justify-between px-1">
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
          );
        })}
      </div>
    </div>
  );
};

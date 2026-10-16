import React, { useState } from 'react';
import {
  Layers,
  Users,
  CalendarCheck,
  BookOpen,
  Plus,
  UserCheck,
  Check,
  Edit3,
  Search,
  Filter,
  Settings,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ClassRoom } from '../../types';
import { ManageClassModal } from '../modals/ManageClassModal';

export const ClassesView: React.FC = () => {
  const {
    classes,
    setCurrentNav,
    setIsAddClassOpen,
    teachers,
    assignTeacherToClass,
    setSelectedClassFilter,
  } = useApp();

  const [selectedStage, setSelectedStage] = useState<'ALL' | 'Primary' | 'JHS'>('ALL');
  const [teacherFilter, setTeacherFilter] = useState<'ALL' | 'ASSIGNED' | 'UNASSIGNED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeacherClassId, setEditingTeacherClassId] = useState<string | null>(null);
  const [selectedTeacherIdForClass, setSelectedTeacherIdForClass] = useState<string>('');
  const [managingClass, setManagingClass] = useState<ClassRoom | null>(null);

  // Filtered classes
  const filteredClasses = classes.filter((c) => {
    const matchStage = selectedStage === 'ALL' || c.stage === selectedStage;
    const isUnassigned = !c.classTeacherName || c.classTeacherName === 'Unassigned';
    const matchTeacher =
      teacherFilter === 'ALL' ||
      (teacherFilter === 'ASSIGNED' && !isUnassigned) ||
      (teacherFilter === 'UNASSIGNED' && isUnassigned);

    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.classTeacherName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchStage && matchTeacher && matchSearch;
  });

  // Calculate live stream statistics
  const totalStreams = classes.length;
  const primaryStreams = classes.filter((c) => c.stage === 'Primary').length;
  const jhsStreams = classes.filter((c) => c.stage === 'JHS').length;
  const assignedStreams = classes.filter(
    (c) => c.classTeacherName && c.classTeacherName !== 'Unassigned'
  ).length;
  const unassignedStreams = totalStreams - assignedStreams;

  const handleStartEditTeacher = (classId: string, currentTeacherId: string) => {
    setEditingTeacherClassId(classId);
    setSelectedTeacherIdForClass(currentTeacherId || '');
  };

  const handleSaveTeacherAssignment = (classId: string) => {
    assignTeacherToClass(classId, selectedTeacherIdForClass);
    setEditingTeacherClassId(null);
  };

  const handleViewRoster = (className: string) => {
    setSelectedClassFilter(className);
    setCurrentNav('students');
  };

  const handleGoToAttendance = () => {
    setCurrentNav('attendance');
  };

  return (
    <div className="space-y-4">
      {/* Header & New Stream Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Classes & Academic Streams
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Organized academic streams from Primary (Basic 1–6) to Junior High School (JHS 1–3) with dedicated Class Teachers.
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

      {/* Quick Stream KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
            Total Streams
          </span>
          <span className="text-lg font-bold text-slate-900">{totalStreams}</span>
          <span className="text-[10px] text-slate-500 block">Classrooms</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-0.5">
            Primary Stage
          </span>
          <span className="text-lg font-bold text-indigo-600">{primaryStreams}</span>
          <span className="text-[10px] text-slate-500 block">Basic 1–6</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-blue-400 block mb-0.5">
            JHS Stage
          </span>
          <span className="text-lg font-bold text-blue-600">{jhsStreams}</span>
          <span className="text-[10px] text-slate-500 block">JHS 1–3</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">
            Teachers Appointed
          </span>
          <span className="text-lg font-bold text-emerald-700">{assignedStreams}</span>
          <span className="text-[10px] text-emerald-600 font-medium block">Fully Staffed</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-amber-500 block mb-0.5">
            Teacher Needed
          </span>
          <span className="text-lg font-bold text-amber-600">{unassignedStreams}</span>
          <span className="text-[10px] text-amber-600 font-medium block">
            {unassignedStreams > 0 ? 'Requires Appointment' : 'All Assigned'}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          {/* Stage filter pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedStage('ALL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedStage === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Stages ({classes.length})
            </button>
            <button
              onClick={() => setSelectedStage('Primary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedStage === 'Primary'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Primary (Basic 1 - 6)
            </button>
            <button
              onClick={() => setSelectedStage('JHS')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedStage === 'JHS'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Junior High School (JHS 1 - 3)
            </button>
          </div>

          {/* Teacher assignment filter & Search input */}
          <div className="flex items-center gap-2">
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value as any)}
              className="px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
            >
              <option value="ALL">All Staffing Status</option>
              <option value="ASSIGNED">Teacher Assigned Only</option>
              <option value="UNASSIGNED">Unassigned Only (Needs Teacher)</option>
            </select>

            <div className="relative w-48 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search streams, rooms, teachers..."
                className="w-full pl-8 pr-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClasses.map((cls) => {
          const isEditingTeacher = editingTeacherClassId === cls.id;
          const isUnassigned =
            !cls.classTeacherName || cls.classTeacherName === 'Unassigned';
          const fillPercentage = Math.min(
            100,
            Math.round((cls.studentCount / (cls.capacity || 1)) * 100)
          );

          return (
            <div
              key={cls.id}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-4 hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{cls.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {cls.roomNumber} • Code:{' '}
                      <span className="text-slate-700 font-mono font-semibold">
                        {cls.code}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant={cls.stage === 'JHS' ? 'navy' : 'info'}>
                      {cls.stage}
                    </Badge>
                    <button
                      onClick={() => setManagingClass(cls)}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                      title="Manage Stream Settings & Subjects"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 mt-3">
                  {/* Class Teacher with Assignment Controls */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-500 font-medium flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        Class Teacher:
                      </span>
                      {!isEditingTeacher && (
                        <button
                          onClick={() =>
                            handleStartEditTeacher(cls.id, cls.classTeacherId)
                          }
                          className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1 hover:underline"
                          title="Assign or reassign class teacher"
                        >
                          <Edit3 className="w-3 h-3" />
                          {isUnassigned ? 'Appoint Teacher' : 'Change'}
                        </button>
                      )}
                    </div>

                    {isEditingTeacher ? (
                      <div className="mt-2 space-y-2">
                        <select
                          value={selectedTeacherIdForClass}
                          onChange={(e) =>
                            setSelectedTeacherIdForClass(e.target.value)
                          }
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
                            isUnassigned
                              ? 'text-amber-600 italic font-medium'
                              : 'text-slate-900 font-bold'
                          }`}
                        >
                          {cls.classTeacherName || 'Unassigned'}
                        </span>
                        {isUnassigned ? (
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded font-medium">
                            Action Needed
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded font-medium border border-emerald-200">
                            Active
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Student Capacity Occupancy Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Class Enrollment:</span>
                      <span className="font-semibold text-slate-900">
                        {cls.studentCount} / {cls.capacity} Students ({fillPercentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          fillPercentage > 90
                            ? 'bg-rose-500'
                            : fillPercentage > 75
                            ? 'bg-amber-500'
                            : 'bg-indigo-600'
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-500">Average Attendance:</span>
                    <span className="font-semibold text-emerald-700">
                      {cls.averageAttendance}%
                    </span>
                  </div>
                </div>

                {/* Curriculum Subjects */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Curriculum Subjects ({cls.subjects.length})
                    </span>
                    <button
                      onClick={() => setManagingClass(cls)}
                      className="text-[10px] text-indigo-600 hover:underline font-medium"
                    >
                      Edit Subjects
                    </button>
                  </div>
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
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                <button
                  onClick={() => handleViewRoster(cls.name)}
                  className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  View Class Roster →
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGoToAttendance}
                    className="text-slate-500 hover:text-slate-900 font-medium"
                  >
                    Attendance
                  </button>
                  <span className="text-slate-200">|</span>
                  <button
                    onClick={() => setManagingClass(cls)}
                    className="text-slate-500 hover:text-slate-900 font-medium"
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stream Management Modal */}
      <ManageClassModal
        isOpen={Boolean(managingClass)}
        onClose={() => setManagingClass(null)}
        classRoom={managingClass}
      />
    </div>
  );
};

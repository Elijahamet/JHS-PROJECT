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
  AlertTriangle,
  UserPlus,
  GraduationCap,
  Trash2,
  Coins,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ClassRoom, AcademicStage } from '../../types';
import { ManageClassModal } from '../modals/ManageClassModal';
import { formatCurrency } from '../../utils/formatters';

export const ClassesView: React.FC = () => {
  const {
    classes,
    students,
    openAddStudentForClass,
    seedStandardGhanaianClasses,
    setIsAddStudentOpen,
    setCurrentNav,
    setIsAddClassOpen,
    openSetClassFees,
    getClassFeeBreakdown,
    teachers,
    deleteClass,
    assignTeacherToClass,
    setSelectedClassFilter,
    classDraft,
    clearClassDraft,
    hasClassDraft,
  } = useApp();

  const [selectedStage, setSelectedStage] = useState<'ALL' | AcademicStage>('ALL');
  const [teacherFilter, setTeacherFilter] = useState<'ALL' | 'ASSIGNED' | 'UNASSIGNED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTeacherClassId, setEditingTeacherClassId] = useState<string | null>(null);
  const [selectedTeacherIdForClass, setSelectedTeacherIdForClass] = useState<string>('');
  const [managingClass, setManagingClass] = useState<ClassRoom | null>(null);
  const [classToDelete, setClassToDelete] = useState<ClassRoom | null>(null);

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
  const totalPupils = students.length;
  const kgStreams = classes.filter((c) => c.stage === 'Kindergarten').length;
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
            Organized academic streams across Kindergarten (KG 1–2 / Early Childhood), Primary (Basic 1–6), and Junior High School (JHS 1–3) with dedicated Class Teachers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {classes.length === 0 && (
            <Button
              size="sm"
              variant="outline"
              icon={BookOpen}
              onClick={seedStandardGhanaianClasses}
            >
              Seed Standard Classes
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            icon={Coins}
            onClick={() => openSetClassFees()}
          >
            Configure Class Fees
          </Button>
          <Button
            size="sm"
            variant="secondary"
            icon={UserPlus}
            onClick={() => setIsAddStudentOpen(true)}
          >
            Enroll Student
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setIsAddClassOpen(true)}
          >
            {hasClassDraft ? 'Resume Class Draft' : 'New Class Stream'}
          </Button>
        </div>
      </div>

      {/* Active Unfinished Draft Recovery Alert */}
      {hasClassDraft && (
        <div className="p-4 bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-amber-50/80 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                You have an unsaved class stream draft in progress
                {classDraft.name ? `: "${classDraft.name}"` : ''}
              </p>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                All information you entered has been automatically preserved. You can resume anytime or discard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={clearClassDraft}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-rose-600 font-semibold text-xs bg-white/70 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={() => setIsAddClassOpen(true)}
            >
              Resume Class Stream
            </Button>
          </div>
        </div>
      )}

      {/* Quick Stream KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-3">
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
            Total Streams
          </span>
          <span className="text-lg font-bold text-slate-900">{totalStreams}</span>
          <span className="text-[10px] text-slate-500 block">Classrooms</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-indigo-500 block mb-0.5">
            Total Pupils
          </span>
          <span className="text-lg font-bold text-indigo-700">{totalPupils}</span>
          <span className="text-[10px] text-slate-500 block">Enrolled Students</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-amber-500 block mb-0.5">
            Kindergarten
          </span>
          <span className="text-lg font-bold text-amber-600">{kgStreams}</span>
          <span className="text-[10px] text-slate-500 block">KG 1 & KG 2</span>
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

        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-rose-500 block mb-0.5">
            Teacher Needed
          </span>
          <span className="text-lg font-bold text-rose-600">{unassignedStreams}</span>
          <span className="text-[10px] text-rose-600 font-medium block">
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
              onClick={() => setSelectedStage('Kindergarten')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedStage === 'Kindergarten'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Kindergarten (KG 1 - 2)
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

      {/* Classes Grid or Empty State */}
      {filteredClasses.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-xl p-12 text-center shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {searchTerm || selectedStage !== 'ALL' || teacherFilter !== 'ALL'
              ? 'No matching classes found'
              : 'No Classes or Academic Streams Configured'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            {searchTerm || selectedStage !== 'ALL' || teacherFilter !== 'ALL'
              ? 'Try adjusting your search criteria or filter options to locate class streams.'
              : 'You can initialize standard Ghanaian curriculum classes (KG 1–2, Basic 1–6, JHS 1–3) in one click, enroll a student with a custom class, or create a custom stream.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              icon={BookOpen}
              onClick={seedStandardGhanaianClasses}
            >
              Initialize Standard Ghanaian Classes
            </Button>
            <Button
              size="sm"
              variant="secondary"
              icon={UserPlus}
              onClick={() => setIsAddStudentOpen(true)}
            >
              Enroll Student
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={() => setIsAddClassOpen(true)}
            >
              Create First Class Stream
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map((cls) => {
          const isEditingTeacher = editingTeacherClassId === cls.id;
          const isUnassigned =
            !cls.classTeacherName || cls.classTeacherName === 'Unassigned';
          const clsBreakdown = getClassFeeBreakdown(cls.id);

          // Dynamically compute students assigned to this class
          const classStudents = students.filter(
            (s) =>
              s.classId === cls.id ||
              (s.className && s.className.toLowerCase().trim() === cls.name.toLowerCase().trim())
          );
          const currentPupilCount = Math.max(cls.studentCount || 0, classStudents.length);
          const fillPercentage = Math.min(
            100,
            Math.round((currentPupilCount / (cls.capacity || 1)) * 100)
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
                    <Badge variant={cls.stage === 'JHS' ? 'navy' : cls.stage === 'Kindergarten' ? 'warning' : 'info'}>
                      {cls.stage}
                    </Badge>
                    <button
                      onClick={() => setManagingClass(cls)}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                      title="Manage Stream Settings & Subjects"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setClassToDelete(cls)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete Class Stream"
                    >
                      <Trash2 className="w-4 h-4" />
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
                      <span className="text-slate-500 font-medium">Class Enrollment:</span>
                      <span className="font-semibold text-slate-900">
                        {currentPupilCount} / {cls.capacity} Students ({fillPercentage}%)
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

                  {/* Distributed Fee Schedule Summary */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Term Fee Total:
                      </span>
                      <span className="font-bold text-slate-900 font-mono text-xs">
                        {clsBreakdown.totalFee > 0 ? (
                          <span className="text-emerald-700">{formatCurrency(clsBreakdown.totalFee)}</span>
                        ) : (
                          <span className="text-amber-600 font-normal italic">Not Set</span>
                        )}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openSetClassFees(cls)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      <Coins className="w-3 h-3" />
                      <span>{clsBreakdown.totalFee > 0 ? 'Edit Fees' : 'Set Fees'}</span>
                    </button>
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

                {/* Enrolled Pupils Preview */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Enrolled Pupils ({classStudents.length})
                    </span>
                    <button
                      onClick={() => handleViewRoster(cls.name)}
                      className="text-[10px] text-blue-600 hover:underline font-semibold"
                    >
                      Full Roster →
                    </button>
                  </div>
                  {classStudents.length === 0 ? (
                    <div className="flex items-center justify-between py-1 px-2 rounded bg-slate-50 text-[11px] text-slate-500">
                      <span>No pupils enrolled yet</span>
                      <button
                        onClick={() => openAddStudentForClass(cls.name)}
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        + Enroll Pupil
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {classStudents.slice(0, 4).map((st) => (
                        <span
                          key={st.id}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded-md font-medium border border-blue-100"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          {st.firstName} {st.lastName}
                        </span>
                      ))}
                      {classStudents.length > 4 && (
                        <span className="px-1.5 py-0.5 text-slate-500 text-[10px] font-medium bg-slate-100 rounded-md">
                          +{classStudents.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewRoster(cls.name)}
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    View Roster →
                  </button>
                  <span className="text-slate-200">|</span>
                  <button
                    onClick={() => openAddStudentForClass(cls.name)}
                    className="text-indigo-600 font-medium hover:underline flex items-center gap-1"
                  >
                    <UserPlus className="w-3 h-3" /> Enroll
                  </button>
                </div>
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
      )}

      {/* Stream Management Modal */}
      <ManageClassModal
        isOpen={Boolean(managingClass)}
        onClose={() => setManagingClass(null)}
        classRoom={managingClass}
      />

      {/* Delete Class Confirmation Modal */}
      {classToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Delete Class Stream?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-slate-900 font-semibold">{classToDelete.name}</strong> ({classToDelete.stage})?
              </p>
              <div className="mt-3 bg-rose-50/70 border border-rose-100 rounded-lg p-3 text-[11px] text-rose-800 leading-relaxed space-y-1">
                <p>Deleting this class stream will also delete:</p>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>All pupil enrollments and records in this stream</li>
                  <li>All fees and payment transactions associated with its pupils</li>
                  <li>Linked parent accounts without other enrolled children</li>
                  <li>Class-specific fee structure schedules</li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setClassToDelete(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteClass(classToDelete.id);
                    setClassToDelete(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Class Stream
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

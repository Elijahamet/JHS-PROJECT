import React, { useState } from 'react';
import {
  CalendarCheck,
  FileSpreadsheet,
  BookOpen,
  MessageSquare,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Award,
  Save,
  Check,
  Search,
  Filter,
  Eye,
  Megaphone,
  ScanLine,
  ShieldCheck,
  Send,
  Smartphone,
  Mail,
  GraduationCap,
  UserPlus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ReportCardSheet } from './ReportCardSheet';
import { PortalChatView } from './PortalChatView';
import { StudentTestDiagnosticView } from './StudentTestDiagnosticView';
import { StudentReportCardRecord } from '../../types';

interface TeacherPortalProps {
  tab?: 'cockpit' | 'classes' | 'attendance' | 'marks' | 'remarks' | 'announcements' | 'chat' | 'test-scanner';
}

export const TeacherPortalView: React.FC<TeacherPortalProps> = ({ tab = 'cockpit' }) => {
  const {
    currentUser,
    setCurrentUser,
    setCurrentNav,
    setIsReportCardModalOpen,
    setSelectedStudentId,
    setIsAddStudentOpen,
    setEnrollTargetClass,
    announcements,
    reportCards,
    students,
    classes,
    teachers,
    attendance,
    assessments,
    submitReportForInspection,
    sendReportToParent,
    bulkSendApprovedReports,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'cockpit' | 'classes' | 'attendance' | 'marks' | 'remarks' | 'announcements' | 'chat' | 'test-scanner'>(tab);
  const [remarksSubTab, setRemarksSubTab] = useState<'dispatch' | 'generator' | 'roster'>('dispatch');
  const [dispatchFilter, setDispatchFilter] = useState<'all' | 'ready' | 'sent' | 'pending'>('all');

  // Dispatch to Parent Modal
  const [dispatchModalReport, setDispatchModalReport] = useState<StudentReportCardRecord | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<('portal' | 'sms' | 'whatsapp')[]>(['portal', 'sms']);
  const [teacherCustomNote, setTeacherCustomNote] = useState('');

  React.useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Active Staff ID state (allows teacher to input ID given at any time)
  const initialStaffId = (currentUser as any).teacherStaffId || '';
  const [inputStaffId, setInputStaffId] = useState<string>(initialStaffId);
  const [activeStaffId, setActiveStaffId] = useState<string>(initialStaffId);
  const [idLookupError, setIdLookupError] = useState<string>('');
  const [selectedClassIndex, setSelectedClassIndex] = useState<number>(0);

  // Sync when currentUser.teacherStaffId changes
  React.useEffect(() => {
    if ((currentUser as any).teacherStaffId && (currentUser as any).teacherStaffId !== activeStaffId) {
      setActiveStaffId((currentUser as any).teacherStaffId);
      setInputStaffId((currentUser as any).teacherStaffId);
    }
  }, [(currentUser as any).teacherStaffId]);

  // Lookup teacher by entered Staff ID / ID given
  const handleLookupTeacher = (overrideId?: string) => {
    const query = (overrideId !== undefined ? overrideId : inputStaffId).trim();
    if (!query) {
      setIdLookupError('Please enter a Teacher Staff ID (e.g. STF-2025-001).');
      return;
    }
    const matched = teachers.find(
      (t) =>
        t.staffId.toLowerCase() === query.toLowerCase() ||
        t.id.toLowerCase() === query.toLowerCase() ||
        t.email.toLowerCase() === query.toLowerCase() ||
        t.fullName.toLowerCase() === query.toLowerCase()
    );
    if (matched) {
      setActiveStaffId(matched.staffId);
      setInputStaffId(matched.staffId);
      setIdLookupError('');
      setSelectedClassIndex(0);
      setCurrentUser({
        ...currentUser,
        id: matched.id,
        name: matched.fullName,
        email: matched.email,
        role: 'teacher',
        teacherStaffId: matched.staffId,
      });
      const isSubj = matched.teacherType === 'Subject Teacher' || (!matched.isClassTeacherOf && (!matched.classesAssigned || matched.classesAssigned.length === 0));
      if (isSubj) {
        setSaveToast(`Staff ID Verified: ${matched.fullName} — You are a Subject Teacher (No assigned class stream).`);
      } else {
        setSaveToast(`Staff ID Verified: ${matched.fullName} — Appointed Class Teacher for ${matched.isClassTeacherOf || 'assigned stream'}.`);
      }
      setTimeout(() => setSaveToast(null), 3500);
    } else {
      const availableList = teachers.map((t) => t.staffId).filter(Boolean).join(', ');
      setIdLookupError(
        `No teacher found with ID "${query}". Available Staff IDs in system: ${availableList || 'None registered yet'}`
      );
    }
  };

  // Current logged in teacher identity
  const currentTeacher =
    (activeStaffId ? teachers.find((t) => t.staffId.toLowerCase() === activeStaffId.toLowerCase() || t.id === activeStaffId) : null) ||
    teachers.find(
      (t) =>
        t.staffId === (currentUser as any).teacherStaffId ||
        t.id === currentUser.id ||
        t.fullName === currentUser.name ||
        (currentUser.email && t.email?.toLowerCase() === currentUser.email?.toLowerCase())
    ) ||
    (teachers.length > 0 ? teachers[0] : undefined);

  // Determine if this faculty member is a Subject Teacher (no class assigned) or Class Teacher (assigned a form class)
  const isSubjectTeacher =
    currentTeacher?.teacherType === 'Subject Teacher' ||
    (!currentTeacher?.isClassTeacherOf && (!currentTeacher?.classesAssigned || currentTeacher.classesAssigned.length === 0));

  // Dynamic assigned classes for this teacher (only populated if Class Teacher or has class streams)
  const teacherAssignedClasses = !isSubjectTeacher
    ? classes.filter(
        (c) =>
          c.classTeacherId === currentTeacher?.id ||
          c.classTeacherName === currentTeacher?.fullName ||
          (currentTeacher?.classesAssigned && currentTeacher.classesAssigned.includes(c.name)) ||
          (currentTeacher?.isClassTeacherOf && (currentTeacher.isClassTeacherOf === c.name || currentTeacher.isClassTeacherOf === c.id))
      )
    : [];

  // If teacher has assigned class name that is not yet in classes list (e.g. newly typed)
  const effectiveAssignedClasses = !isSubjectTeacher
    ? (teacherAssignedClasses.length > 0
        ? teacherAssignedClasses
        : (currentTeacher?.isClassTeacherOf
            ? [{
                id: `cls_virtual_${currentTeacher.id}`,
                name: currentTeacher.isClassTeacherOf,
                code: currentTeacher.isClassTeacherOf.replace(/\s+/g, '').toUpperCase(),
                stage: 'Primary' as const,
                classTeacherId: currentTeacher.id,
                classTeacherName: currentTeacher.fullName,
                studentCount: 0,
                capacity: 35,
                roomNumber: 'Assigned Classroom',
                averageAttendance: 100,
                subjects: currentTeacher.subjectsAssigned || ['Core Subjects'],
              }]
            : []))
    : [];

  const formClass = effectiveAssignedClasses[selectedClassIndex] || effectiveAssignedClasses[0];
  const formClassName = !isSubjectTeacher && formClass ? formClass.name : 'None (Subject Teacher)';
  const hasAssignedClass = !isSubjectTeacher && Boolean(formClass);

  const classStudents = !isSubjectTeacher
    ? students.filter(
        (s) =>
          formClass &&
          (s.classId === formClass.id ||
           s.className === formClass.name ||
           (s.className && formClass.name && s.className.toLowerCase().trim() === formClass.name.toLowerCase().trim()))
      )
    : [];

  const teacherClasses = effectiveAssignedClasses.map((cls) => {
    const classPupils = students.filter(
      (s) =>
        s.classId === cls.id ||
        s.className === cls.name ||
        (s.className && cls.name && s.className.toLowerCase().trim() === cls.name.toLowerCase().trim())
    );
    const classAtt = attendance.filter((a) => classPupils.some((s) => s.id === a.studentId));
    const present = classAtt.filter((a) => a.status === 'Present').length;
    const attText = classPupils.length > 0
      ? `${present} Present (${Math.round((present / classPupils.length) * 100)}%)`
      : 'No attendance recorded';
    return {
      name: cls.name,
      count: classPupils.length,
      role: cls.classTeacherId === currentTeacher?.id || cls.classTeacherName === currentTeacher?.fullName ? 'Form Class Master' : 'Subject Instructor',
      room: cls.roomNumber || 'Room Assigned',
      attendanceToday: attText,
    };
  });

  // Dynamic roster for the form class
  const [jhsStudents, setJhsStudents] = useState<Array<{
    id: string;
    name: string;
    gender: string;
    roll: string;
    attendance: string;
    classScore: number;
    examScore: number;
    remark: string;
    conduct: string;
  }>>([]);

  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedStudentForRemark, setSelectedStudentForRemark] = useState('');
  const [remarkText, setRemarkText] = useState('');
  const [conductRating, setConductRating] = useState('Good');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  React.useEffect(() => {
    const roster = classStudents.map((s) => {
      const att = attendance.find((a) => a.studentId === s.id)?.status || 'Present';
      const asm = assessments.find((a) => a.studentId === s.id);
      const rep = reportCards.find((r) => r.studentId === s.id);
      return {
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        gender: s.gender,
        roll: s.studentId,
        attendance: att,
        classScore: (asm?.classworkScore || 0) + (asm?.homeworkScore || 0),
        examScore: asm?.examScore || 0,
        remark: rep?.classTeacherRemarks || '',
        conduct: 'Good',
      };
    });
    setJhsStudents(roster);
    if (roster.length > 0 && !selectedStudentForRemark) {
      setSelectedStudentForRemark(roster[0].id);
      setRemarkText(roster[0].remark);
      setConductRating(roster[0].conduct);
    }
  }, [students, classes, attendance, assessments, reportCards, formClass]);

  const timetable = teacherAssignedClasses.length > 0
    ? teacherAssignedClasses.map((cls, idx) => ({
        period: `Period ${idx + 1}`,
        time: idx === 0 ? '08:00 - 08:45 AM' : idx === 1 ? '08:45 - 09:30 AM' : '10:30 - 11:15 AM',
        class: cls.name,
        subject: currentTeacher?.subjectsAssigned?.[0] || 'Core Subject',
        topic: 'Classroom Lecture & Exercises',
        room: cls.roomNumber || 'Classroom',
      }))
    : [];

  const classAttendanceRecords = attendance.filter((a) => classStudents.some((s) => s.id === a.studentId));
  const presentCount = classAttendanceRecords.filter((a) => a.status === 'Present').length;
  const lateCount = classAttendanceRecords.filter((a) => a.status === 'Late').length;
  const absentCount = classAttendanceRecords.filter((a) => a.status === 'Absent').length;
  const rollCallRate = classStudents.length > 0 ? ((presentCount / classStudents.length) * 100).toFixed(1) : '0.0';
  const marksRecordedCount = classStudents.filter((s) => assessments.some((a) => a.studentId === s.id)).length;

  const handleAttendanceChange = (studentId: string, status: string) => {
    setJhsStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, attendance: status } : s))
    );
  };

  const handleScoreChange = (studentId: string, field: 'classScore' | 'examScore', val: number) => {
    setJhsStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, [field]: Math.min(field === 'classScore' ? 30 : 70, Math.max(0, val)) } : s))
    );
  };

  const handleSaveAttendance = () => {
    setSaveToast("Roll Call attendance submitted successfully to School Administration!");
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleSaveMarks = () => {
    setSaveToast(`Continuous assessment and examination marks for ${selectedSubject} saved to SchoolOS gradebook!`);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleSyncDiagnosticScore = (studentId: string, subject: string, classScore: number) => {
    setJhsStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, classScore } : s))
    );
    setSaveToast(`Diagnostic test score (${classScore}/30) for ${subject} synced directly to Gradebook!`);
    setTimeout(() => setSaveToast(null), 3500);
  };

  const handleSaveRemarks = () => {
    setJhsStudents((prev) =>
      prev.map((s) => (s.id === selectedStudentForRemark ? { ...s, remark: remarkText, conduct: conductRating } : s))
    );
    setSaveToast("Class Teacher remarks & conduct evaluation updated for terminal report card!");
    setTimeout(() => setSaveToast(null), 3500);
  };

  const calculateGrade = (total: number) => {
    if (total >= 80) return { grade: '1', desc: 'Highest (Excellent)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (total >= 70) return { grade: '2', desc: 'Higher (Very Good)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    if (total >= 65) return { grade: '3', desc: 'High (Good)', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' };
    if (total >= 60) return { grade: '4', desc: 'High Average (Credit)', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    if (total >= 50) return { grade: '5', desc: 'Average (Credit)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    if (total >= 45) return { grade: '6', desc: 'Low Average (Pass)', color: 'text-orange-700 bg-orange-50 border-orange-200' };
    return { grade: '9', desc: 'Weak (Fail)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-400 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-semibold">{saveToast}</span>
        </div>
      )}

      {/* Teacher Staff ID Input & Verification Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Teacher Staff ID
                </span>
                {currentTeacher ? (
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1 ${
                    isSubjectTeacher
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  }`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isSubjectTeacher ? 'text-purple-600' : 'text-emerald-600'}`} />
                    ID: {currentTeacher.staffId} • {isSubjectTeacher ? 'Subject Teacher' : `Class Teacher (${formClassName})`}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    ID Required
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {currentTeacher ? (
                  isSubjectTeacher ? (
                    <>
                      Logged in as <strong>{currentTeacher.fullName}</strong> • <strong className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">You are a Subject Teacher</strong> (No assigned form class stream • Instructing: {currentTeacher.subjectsAssigned?.join(', ') || 'Curriculum Subjects'})
                    </>
                  ) : (
                    <>
                      Logged in as <strong>{currentTeacher.fullName}</strong> • Assigned Class:{' '}
                      <strong className="text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                        {formClassName}
                      </strong>{' '}
                      ({classStudents.length} enrolled pupils)
                    </>
                  )
                ) : (
                  'Input the ID given after registration to view your assigned class and students.'
                )}
              </p>
            </div>
          </div>

          {/* Input Form to enter the ID given */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookupTeacher();
            }}
            className="flex items-center gap-2 flex-wrap"
          >
            <div className="relative">
              <input
                type="text"
                value={inputStaffId}
                onChange={(e) => {
                  setInputStaffId(e.target.value);
                  setIdLookupError('');
                }}
                placeholder="Enter Staff ID (e.g. STF-2025-001)"
                className="w-52 sm:w-60 px-3.5 py-2 text-xs font-mono font-bold text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:font-sans placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Load My Class</span>
            </button>
            {teachers.length > 1 && (
              <select
                value={currentTeacher?.id || ''}
                onChange={(e) => {
                  const t = teachers.find((tch) => tch.id === e.target.value);
                  if (t) {
                    setInputStaffId(t.staffId);
                    handleLookupTeacher(t.staffId);
                  }
                }}
                className="px-2.5 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50 text-slate-700 focus:outline-none focus:border-indigo-600 transition-all cursor-pointer"
              >
                <option value="" disabled>
                  Quick switch staff...
                </option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName} ({t.staffId}) — {t.isClassTeacherOf || 'Subject'}
                  </option>
                ))}
              </select>
            )}
          </form>
        </div>

        {idLookupError && (
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{idLookupError}</span>
          </div>
        )}

        {/* Assigned Classes selector tabs if teacher has multiple classes */}
        {effectiveAssignedClasses.length > 1 && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Assigned Classes:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {effectiveAssignedClasses.map((cls, idx) => (
                <button
                  key={cls.id || idx}
                  type="button"
                  onClick={() => setSelectedClassIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedClassIndex === idx
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cls.name} ({students.filter((s) => s.classId === cls.id || s.className === cls.name).length} pupils)
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Teacher Top Workbench Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                {isSubjectTeacher ? 'Teacher Platform • Subject Teacher Desk' : 'Teacher Platform • Classroom Desk'}
              </span>
              <span className="text-xs text-blue-200">
                {isSubjectTeacher ? (
                  '• Role: Subject Teacher'
                ) : (
                  <>• Form Master: <strong>{formClassName}</strong></>
                )}
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Welcome, {currentTeacher?.fullName || currentUser.name}
            </h1>
            <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
              {isSubjectTeacher
                ? 'Faculty Desk • You are appointed as a Subject Teacher. You instruct specialized curriculum subjects without a form master stream assignment.'
                : 'Faculty Desk • Manage your assigned classes, take morning roll call, grade continuous assessments, and formulate terminal remarks.'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {!isSubjectTeacher && (
              <button
                onClick={() => setActiveTab('classes')}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'classes'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>My Class & Pupils ({classStudents.length})</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'attendance'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Roll Call</span>
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'marks'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Marks Entry</span>
            </button>
            <button
              onClick={() => setActiveTab('test-scanner')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'test-scanner'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40'
              }`}
            >
              <ScanLine className="w-4 h-4 text-amber-300" />
              <span>AI Test Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('remarks')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'remarks'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Report Card Generator</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Admin Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. COCKPIT VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'cockpit' && (
        <div className="space-y-6">
          {/* Subject Teacher Status Notification Banner */}
          {isSubjectTeacher && (
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50/60 to-white border border-purple-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-sm font-bold text-slate-900">
                        You are a Subject Teacher
                      </h2>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                        No Class Assigned
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                      Based on your Staff ID (<strong>{currentTeacher?.staffId}</strong>), you are registered as a <strong>Subject Teacher</strong>. You do not have an assigned Form Class. You can enter continuous assessment scores, homework, and examination marks for your subjects across any class stream.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('marks')}
                    className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Enter Subject Marks</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('test-scanner')}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <ScanLine className="w-4 h-4" />
                    <span>AI Test Scanner</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-purple-100 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Your Instructed Subjects:
                </span>
                {currentTeacher?.subjectsAssigned && currentTeacher.subjectsAssigned.length > 0 ? (
                  currentTeacher.subjectsAssigned.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-purple-900 border border-purple-200 shadow-2xs">
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400 italic">No specific subjects configured yet</span>
                )}
              </div>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {isSubjectTeacher ? 'Teaching Role' : 'Form Class'}
              </span>
              <p className="text-xl font-black text-slate-900 mt-1">
                {isSubjectTeacher ? 'Subject Teacher' : formClassName}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                {isSubjectTeacher ? (
                  <span className="text-purple-700 font-semibold">• No form class stream</span>
                ) : (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {classStudents.length} Registered Pupils
                  </span>
                )}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {isSubjectTeacher ? 'Curriculum Subjects' : "Today's Roll Call"}
              </span>
              <p className="text-xl font-black text-indigo-700 mt-1">
                {isSubjectTeacher ? `${currentTeacher?.subjectsAssigned?.length || 0} Subjects` : `${rollCallRate}%`}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {isSubjectTeacher ? 'Allocated instructional subjects' : `${presentCount} Present • ${lateCount} Late • ${absentCount} Absent`}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Marks Recorded</span>
              <p className="text-xl font-black text-indigo-700 mt-1">
                {isSubjectTeacher ? 'Ready' : `${marksRecordedCount} / ${classStudents.length}`}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {isSubjectTeacher ? 'Continuous assessment gradebook' : 'Pupils marked for Term 2 tests'}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Next Period</span>
              <p className="text-xl font-black text-blue-700 mt-1">{timetable[0] ? timetable[0].time.split(' - ')[0] : 'None'}</p>
              <p className="text-[11px] text-slate-500 mt-1">{timetable[0] ? `${timetable[0].subject} in ${timetable[0].room}` : 'No scheduled periods'}</p>
            </div>
          </div>

          {/* Today's Teaching Schedule */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Today&apos;s Teaching Schedule & Periods</h3>
              </div>
              <Badge variant="navy">Term 2</Badge>
            </div>

            <div className="space-y-2.5">
              {timetable.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No teaching periods scheduled for today.
                </div>
              ) : (
                timetable.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 hover:bg-blue-50/30 transition-all text-xs gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-md">
                        {slot.time}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{slot.subject}</span>
                        <span className="text-slate-400 mx-1.5">•</span>
                        <span className="font-semibold text-blue-700">{slot.class}</span>
                        <p className="text-slate-500 mt-0.5">{slot.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="text-[11px] text-slate-600 font-medium px-2 py-0.5 rounded bg-white border border-slate-200">
                        {slot.room}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Diagnostic Scanner Quick Access Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ScanLine className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">AI Student Test Shoot & Diagnostic Scanner</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">New Feature</span>
                </div>
                <p className="text-xs text-slate-600 max-w-xl">
                  Upload phone snapshots or scans of handwritten student test papers. Automatically scan math and science calculations to uncover the student&apos;s exact weak points and what is really wrong with them in that subject.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('test-scanner')}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Launch Test Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Assigned Classes Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">My Assigned Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teacherClasses.length === 0 ? (
                <div className="col-span-3 p-6 text-center bg-white border border-slate-200 rounded-xl text-xs text-slate-400">
                  No classes currently assigned to your teacher profile. Please contact administration.
                </div>
              ) : (
                teacherClasses.map((cls, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-slate-900">{cls.name}</h4>
                        <Badge variant="navy">{cls.count} Pupils</Badge>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">{cls.role}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cls.room}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-emerald-700 font-medium">{cls.attendanceToday}</span>
                      <button
                        onClick={() => setActiveTab('classes')}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        View Roster →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Active Class & Enrolled Students Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Students Enrolled in {formClassName}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Instructional pupils registered under {currentTeacher?.fullName || 'this teacher'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={classStudents.length > 0 ? "success" : "warning"}>
                  {classStudents.length} Registered Pupils
                </Badge>
                <button
                  type="button"
                  onClick={() => {
                    if (formClass) setEnrollTargetClass(formClass);
                    setIsAddStudentOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Enroll Pupil to {formClassName}</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            {classStudents.length === 0 ? (
              <div className="py-8 text-center space-y-2 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                <Users className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-700">
                  No pupils currently enrolled in {formClassName}.
                </p>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  Click below to enroll students directly into {formClassName} so they appear on your daily roll call and grade sheets.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (formClass) setEnrollTargetClass(formClass);
                    setIsAddStudentOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Enroll First Student</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3 font-semibold">Student Name</th>
                      <th className="py-2.5 px-2.5 font-semibold">Roll ID</th>
                      <th className="py-2.5 px-2.5 font-semibold">Gender</th>
                      <th className="py-2.5 px-2.5 font-semibold">Assigned Class</th>
                      <th className="py-2.5 px-2.5 font-semibold">Guardian Contact</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {classStudents.map((std) => (
                      <tr key={std.id} className="hover:bg-slate-50/70">
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {std.firstName} {std.lastName}
                        </td>
                        <td className="py-2.5 px-2.5 font-mono text-slate-500">
                          {std.studentId}
                        </td>
                        <td className="py-2.5 px-2.5 text-slate-700">
                          {std.gender}
                        </td>
                        <td className="py-2.5 px-2.5">
                          <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-[11px]">
                            {std.className}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 text-slate-600 font-mono text-[11px]">
                          {std.emergencyContact || '—'}
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStudentForRemark(std.id);
                              setActiveTab('remarks');
                            }}
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Remarks
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStudentId(std.id);
                              setIsReportCardModalOpen(true);
                            }}
                            className="text-xs font-semibold text-indigo-600 hover:underline"
                          >
                            Report Card
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CLASSES & ROSTERS VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'classes' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5">
          {isSubjectTeacher ? (
            <div className="py-10 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mx-auto shadow-xs">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">You are a Subject Teacher</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Based on your Staff ID (<strong className="font-mono text-slate-700">{currentTeacher?.staffId}</strong>), you are not assigned a form class. Form classes and morning roll call are managed by appointed Class Teachers.
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 font-medium">
                <span>Your Instructed Subjects: </span>
                <strong className="text-purple-700">{currentTeacher?.subjectsAssigned?.join(', ') || 'General Subjects'}</strong>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('marks')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Go to Marks Entry for Your Subjects</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Form Class Student Roster • {formClassName}</h2>
                  <p className="text-xs text-slate-500">Student records, emergency contacts, and academic averages for your form class.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={classStudents.length > 0 ? "success" : "warning"}>
                    {classStudents.length} Registered Pupils
                  </Badge>
                  <button
                    type="button"
                    onClick={() => {
                      if (formClass) setEnrollTargetClass(formClass);
                      setIsAddStudentOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Enroll Student</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                      <th className="py-3 px-4 font-semibold">Student Name</th>
                      <th className="py-3 px-3 font-semibold">Roll ID</th>
                      <th className="py-3 px-3 font-semibold">Gender</th>
                      <th className="py-3 px-3 font-semibold">Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jhsStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                          No pupils currently enrolled in {formClassName}. Click &ldquo;Add Student&rdquo; in the admin desk to enroll pupils.
                        </td>
                      </tr>
                    ) : (
                      jhsStudents.map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 font-bold text-slate-900">{std.name}</td>
                          <td className="py-3 px-3 font-mono text-slate-500">{std.roll}</td>
                          <td className="py-3 px-3 text-slate-700">{std.gender}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active Pupil
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setSelectedStudentForRemark(std.id);
                                setRemarkText(std.remark);
                                setConductRating(std.conduct);
                                setActiveTab('remarks');
                              }}
                              className="text-xs font-semibold text-blue-600 hover:underline"
                            >
                              Enter Remarks
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ROLL CALL ATTENDANCE VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'attendance' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
                Daily Roll Call Register
              </span>
              <h2 className="text-xl font-bold text-slate-900">Mark Attendance • {formClassName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Click status buttons to record present, absent, or late for each pupil today.</p>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="primary" icon={Save} onClick={handleSaveAttendance}>
                Submit Daily Register
              </Button>
            </div>
          </div>

          {/* Roll Call Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4 font-semibold">Student Name</th>
                  <th className="py-3 px-3 font-semibold">Student ID</th>
                  <th className="py-3 px-4 font-semibold text-center">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jhsStudents.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-xs text-slate-400">
                      No registered pupils found in {formClassName} to mark attendance.
                    </td>
                  </tr>
                ) : (
                  jhsStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">{std.name}</td>
                      <td className="py-3 px-3 font-mono text-slate-500">{std.roll}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 gap-1 text-[11px]">
                          <button
                            onClick={() => handleAttendanceChange(std.id, 'Present')}
                            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                              std.attendance === 'Present'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(std.id, 'Late')}
                            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                              std.attendance === 'Late'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Late
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(std.id, 'Absent')}
                            className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                              std.attendance === 'Absent'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MARKS ENTRY & CONTINUOUS ASSESSMENT */}
      {/* ========================================================================= */}
      {activeTab === 'marks' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
                Continuous Assessment (SBA) & Exam Scoring
              </span>
              <h2 className="text-xl font-bold text-slate-900">Term 2 Gradebook Entry</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter Class Score (30%) and Exam Score (70%). WAEC grades automatically calculate.</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Integrated Science">Integrated Science</option>
              </select>

              <Button
                size="sm"
                variant="outline"
                icon={ScanLine}
                onClick={() => setActiveTab('test-scanner')}
                className="border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold"
              >
                Scan Test Shoot with AI
              </Button>

              <Button size="sm" variant="primary" icon={Save} onClick={handleSaveMarks}>
                Save Marks
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4 font-semibold">Pupil Name</th>
                  <th className="py-3 px-3 font-semibold text-center">Class Score (30%)</th>
                  <th className="py-3 px-3 font-semibold text-center">Exam Score (70%)</th>
                  <th className="py-3 px-3 font-bold text-center">Total (100%)</th>
                  <th className="py-3 px-3 font-semibold text-center">Grade</th>
                  <th className="py-3 px-4 font-semibold text-right">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jhsStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                      No enrolled pupils found in {formClassName} to enter assessment marks.
                    </td>
                  </tr>
                ) : (
                  jhsStudents.map((std) => {
                    const total = std.classScore + std.examScore;
                    const gradeInfo = calculateGrade(total);
                    return (
                    <tr key={std.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">{std.name}</td>
                      <td className="py-3 px-3 text-center">
                        <input
                          type="number"
                          min={0}
                          max={30}
                          value={std.classScore}
                          onChange={(e) => handleScoreChange(std.id, 'classScore', Number(e.target.value))}
                          className="w-16 text-center py-1 px-2 border border-slate-200 rounded-md font-semibold text-slate-900"
                        />
                      </td>
                      <td className="py-3 px-3 text-center">
                        <input
                          type="number"
                          min={0}
                          max={70}
                          value={std.examScore}
                          onChange={(e) => handleScoreChange(std.id, 'examScore', Number(e.target.value))}
                          className="w-16 text-center py-1 px-2 border border-slate-200 rounded-md font-semibold text-slate-900"
                        />
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900">
                        {total}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${gradeInfo.color}`}>
                          Grade {gradeInfo.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600 font-medium text-[11px]">
                        {gradeInfo.desc}
                      </td>
                    </tr>
                  );
                })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TERMINAL REPORT CARD & REMARKS WORKBENCH */}
      {/* ========================================================================= */}
      {activeTab === 'remarks' && (
        <div className="space-y-6">
          {/* Sub Navigation Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-2xs no-print">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setRemarksSubTab('dispatch')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  remarksSubTab === 'dispatch'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Parent Report Dispatch Desk</span>
                {reportCards.filter((r) => r.status === 'inspected_approved').length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-950 animate-pulse">
                    {reportCards.filter((r) => r.status === 'inspected_approved').length} ready to send
                  </span>
                )}
              </button>

              <button
                onClick={() => setRemarksSubTab('generator')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  remarksSubTab === 'generator'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Report Card Generator</span>
              </button>

              <button
                onClick={() => setRemarksSubTab('roster')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  remarksSubTab === 'roster'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Roster Remarks Form</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                icon={Eye}
                onClick={() => setIsReportCardModalOpen(true)}
              >
                Full Screen Modal
              </Button>
            </div>
          </div>

          {/* 5A. PARENT REPORT DISPATCH DESK (AFTER ADMIN INSPECTION) */}
          {remarksSubTab === 'dispatch' && (
            <div className="space-y-6">
              {/* Executive Notice Banner */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      GES Inspection & Parent Release Policy
                    </span>
                    <span className="text-xs text-blue-200">• Form Master Desk</span>
                  </div>
                  <h3 className="text-lg font-black text-white">
                    Send Inspected Reports to Specific Parents
                  </h3>
                  <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
                    Once the School Administration / Headmistress has inspected and signed a student&apos;s terminal report, you can dispatch it to their specific parent via the Parent Portal and SMS text alerts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      bulkSendApprovedReports('JHS 2A');
                      setSaveToast('All approved report cards for JHS 2A have been dispatched to parents!');
                      setTimeout(() => setSaveToast(null), 3500);
                    }}
                    disabled={reportCards.filter((r) => r.status === 'inspected_approved').length === 0}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>Dispatch All Approved Reports to Parents ({reportCards.filter((r) => r.status === 'inspected_approved').length})</span>
                  </button>
                </div>
              </div>

              {/* Status Overview Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Class Total Pupils</span>
                  <p className="text-xl font-black text-slate-900 mt-0.5">{reportCards.length}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Form: JHS 2A</p>
                </div>

                <div className="bg-white border border-amber-200 bg-amber-50/20 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-amber-700">Awaiting Admin Inspection</span>
                  <p className="text-xl font-black text-amber-800 mt-0.5">
                    {reportCards.filter((r) => r.status === 'submitted_for_inspection').length}
                  </p>
                  <p className="text-[10px] text-amber-600 mt-0.5">Under Headmistress Review</p>
                </div>

                <div className="bg-white border border-emerald-200 bg-emerald-50/20 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-700">Inspected & Ready to Send</span>
                  <p className="text-xl font-black text-emerald-800 mt-0.5">
                    {reportCards.filter((r) => r.status === 'inspected_approved').length}
                  </p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">Admin approval granted</p>
                </div>

                <div className="bg-white border border-blue-200 bg-blue-50/20 rounded-xl p-3.5 shadow-2xs">
                  <span className="text-[10px] uppercase font-bold text-blue-700">Delivered to Parents</span>
                  <p className="text-xl font-black text-blue-800 mt-0.5">
                    {reportCards.filter((r) => r.status === 'sent_to_parent').length}
                  </p>
                  <p className="text-[10px] text-blue-600 mt-0.5">Live on Parent Portals</p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {[
                  { id: 'all', label: `All Reports (${reportCards.length})` },
                  { id: 'ready', label: `Ready to Send (${reportCards.filter((r) => r.status === 'inspected_approved').length})` },
                  { id: 'sent', label: `Dispatched to Parents (${reportCards.filter((r) => r.status === 'sent_to_parent').length})` },
                  { id: 'pending', label: `Under Admin Inspection (${reportCards.filter((r) => r.status === 'submitted_for_inspection').length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDispatchFilter(tab.id as typeof dispatchFilter)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      dispatchFilter === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Reports and Parents Roster */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider">
                      Student Reports & Parent Delivery Channel Roster
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Deliver verified terminal report cards directly to each pupil&apos;s registered parent.
                    </p>
                  </div>
                  <span className="text-slate-400 font-medium">JHS 2A Academic Term 2</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4 font-semibold">Student / Ward</th>
                        <th className="py-3 px-3 font-semibold">Assigned Parent Contact</th>
                        <th className="py-3 px-3 font-semibold text-center">Average / Pos.</th>
                        <th className="py-3 px-4 font-semibold">Headmistress Inspection Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Parent Dispatch Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reportCards
                        .filter((r) => {
                          if (dispatchFilter === 'ready') return r.status === 'inspected_approved';
                          if (dispatchFilter === 'sent') return r.status === 'sent_to_parent';
                          if (dispatchFilter === 'pending') return r.status === 'submitted_for_inspection';
                          return true;
                        })
                        .map((report) => (
                          <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-bold text-slate-900 block text-sm">
                                {report.studentName}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400">
                                {report.studentIdCode} • {report.className}
                              </span>
                            </td>

                            <td className="py-3 px-3">
                              <span className="font-semibold text-slate-800 block">
                                {report.parentName}
                              </span>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                                <span>{report.parentPhone || '+233 24 000 0000'}</span>
                                {report.parentEmail && <span className="text-slate-300">•</span>}
                                <span className="truncate max-w-[120px]">{report.parentEmail}</span>
                              </div>
                            </td>

                            <td className="py-3 px-3 text-center">
                              <span className="font-bold text-slate-900 block text-sm">
                                {report.overallAverage}%
                              </span>
                              <span className="text-[10px] font-semibold text-indigo-700 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                                {report.classPosition}th in Class
                              </span>
                            </td>

                            <td className="py-3 px-4 max-w-xs">
                              {report.status === 'draft' && (
                                <div className="space-y-1">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                    Draft • Incomplete
                                  </span>
                                  <p className="text-[11px] text-slate-400">Not submitted to admin yet</p>
                                </div>
                              )}

                              {report.status === 'submitted_for_inspection' && (
                                <div className="space-y-1">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse flex items-center gap-1 w-max">
                                    <Clock className="w-3 h-3" />
                                    Awaiting Admin Inspection
                                  </span>
                                  <p className="text-[11px] text-amber-700 italic">
                                    Under review by School Administration
                                  </p>
                                </div>
                              )}

                              {report.status === 'inspected_approved' && (
                                <div className="space-y-0.5">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 w-max">
                                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                    Inspected & Endorsed by Admin
                                  </span>
                                  <p className="text-[11px] text-slate-600 line-clamp-1 italic">
                                    &ldquo;{report.headteacherRemarks}&rdquo;
                                  </p>
                                  <span className="text-[10px] text-emerald-700 font-semibold block">
                                    Approved by {report.inspectedBy || 'Headteacher'} ({report.inspectedAt})
                                  </span>
                                </div>
                              )}

                              {report.status === 'sent_to_parent' && (
                                <div className="space-y-0.5">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1 w-max">
                                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                                    Delivered to Parent
                                  </span>
                                  <p className="text-[11px] text-slate-600">
                                    Dispatched: {report.sentAt || 'Recently'} via {report.sentChannels?.join(', ') || 'Portal & SMS'}
                                  </p>
                                </div>
                              )}
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {report.status === 'draft' && (
                                  <button
                                    onClick={() => {
                                      submitReportForInspection(report.id);
                                      setSaveToast(`Report card for ${report.studentName} submitted to Admin for inspection.`);
                                      setTimeout(() => setSaveToast(null), 3500);
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                                  >
                                    <span>Submit for Inspection</span>
                                  </button>
                                )}

                                {report.status === 'submitted_for_inspection' && (
                                  <div className="text-right">
                                    <span className="text-[11px] text-slate-400 italic block">
                                      Locked (Awaiting Headmistress)
                                    </span>
                                    <button
                                      disabled
                                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs font-semibold cursor-not-allowed mt-1"
                                      title="Admin inspection and signature required before sending to parents"
                                    >
                                      Send to Parent (Locked)
                                    </button>
                                  </div>
                                )}

                                {report.status === 'inspected_approved' && (
                                  <button
                                    onClick={() => {
                                      setDispatchModalReport(report);
                                      setTeacherCustomNote(
                                        `Dear ${report.parentName}, please find the official inspected terminal report card for ${report.studentName} (${report.className}). Terminal Average: ${report.overallAverage}%, Position: ${report.classPosition}th of ${report.classTotalStudents}. Headmistress remarks have been officially endorsed.`
                                      );
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                                  >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Send to Parent</span>
                                  </button>
                                )}

                                {report.status === 'sent_to_parent' && (
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => {
                                        setDispatchModalReport(report);
                                        setTeacherCustomNote(
                                          `Follow up: Updated terminal report card notice for ${report.studentName}.`
                                        );
                                      }}
                                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                                    >
                                      Re-send Alert
                                    </button>
                                  </div>
                                )}

                                <button
                                  onClick={() => {
                                    setSelectedStudentId(report.studentId);
                                    setIsReportCardModalOpen(true);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                                  title="Preview card"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 5B. Interactive Report Card Generator (Matches provided design) */}
          {remarksSubTab === 'generator' && (
            <ReportCardSheet
              initialStudentName={jhsStudents.find((s) => s.id === selectedStudentForRemark)?.name || jhsStudents[0]?.name || 'Enrolled Pupil'}
              initialLevel="Junior High School"
              initialClassName={formClassName}
              initialSchoolName="Bright Future Academy"
              isModal={false}
            />
          )}

          {/* 5C. Roster Remarks Form */}
          {remarksSubTab === 'roster' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                    Class Teacher Terminal Evaluation
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Class Roster Remarks & Conduct</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Formulate qualitative evaluation, attitude, conduct, and remarks for official Ghanaian report cards.</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="primary" icon={Save} onClick={handleSaveRemarks}>
                    Save Remarks
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Student Selector List */}
                <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-1.5 max-h-96 overflow-y-auto">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Select Student</span>
                  {jhsStudents.length === 0 ? (
                    <p className="p-3 text-xs text-slate-400">No pupils currently enrolled in {formClassName}.</p>
                  ) : (
                    jhsStudents.map((std) => (
                      <button
                        key={std.id}
                        onClick={() => {
                          setSelectedStudentForRemark(std.id);
                          setRemarkText(std.remark);
                          setConductRating(std.conduct);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                          selectedStudentForRemark === std.id
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                      <span>{std.name}</span>
                      <span className="text-[10px] opacity-75">{std.roll}</span>
                    </button>
                  ))
                  )}
                </div>

                {/* Remark Form & Suggestion Chips */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Conduct & Attitude in School
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {['Excellent', 'Very Good', 'Good', 'Needs Improvement'].map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => setConductRating(cond)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            conductRating === cond
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Class Teacher&apos;s Remarks
                    </label>
                    <textarea
                      rows={4}
                      value={remarkText}
                      onChange={(e) => setRemarkText(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-medium text-slate-800 leading-relaxed"
                      placeholder="Enter teacher comments on academic commitment and discipline..."
                    />
                  </div>

                  {/* Quick Preset Comment Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-400">Quick Comment Suggestions:</span>
                    <div className="space-y-1.5">
                      {[
                        "An exceptional and diligent pupil who demonstrates keen critical thinking and leadership.",
                        "Good academic progress this term. Should practice more mathematics drills to solidify concepts.",
                        "Active class participation and polite conduct. Encouraged to read more broadly.",
                      ].map((phrase, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRemarkText(phrase)}
                          className="block w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200/80 transition-colors"
                        >
                          &ldquo;{phrase}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. STAFF ANNOUNCEMENTS VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'announcements' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Megaphone className="w-5 h-5 text-amber-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Staff Room Bulletins & Academic Notices</h2>
              <p className="text-xs text-slate-500">Official directives from the Headteacher and GES Ghana Education Service.</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {announcements.map((ann) => (
              <div key={ann.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                  <span className="text-[11px] text-slate-400">{ann.publishDate}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. ADMIN & HELPDESK CHAT (OFFLINE-FIRST) */}
      {/* ========================================================================= */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Direct Staff-to-Admin Messaging</h2>
              <p className="text-xs text-slate-500">
                Communicate directly with the Headmistress. Operates offline with local message queueing and auto-sync.
              </p>
            </div>
          </div>
          <PortalChatView
            partnerName="School Administration"
            partnerRole="School Administration Desk"
            partnerSubtitle="Direct executive line • Headteacher Desk"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. AI TEST DIAGNOSTIC SCANNER & STUDENT AUTOPSY                           */}
      {/* ========================================================================= */}
      {activeTab === 'test-scanner' && (
        <StudentTestDiagnosticView
          studentsList={jhsStudents}
          defaultSubject={selectedSubject}
          onSyncScore={handleSyncDiagnosticScore}
          onBackToMarks={() => setActiveTab('marks')}
        />
      )}

      {/* ========================================================================= */}
      {/* 9. DISPATCH TERMINAL REPORT CARD TO PARENT MODAL                          */}
      {/* ========================================================================= */}
      {dispatchModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-fadeIn text-xs">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      Authorized Parent Dispatch
                    </span>
                    <span className="text-slate-400">• Form Master Release</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Send Report Card: {dispatchModalReport.studentName}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setDispatchModalReport(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 hidden" />
                <span className="text-sm font-bold">✕</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Recipient Parent Card */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Designated Recipient Parent:
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                    Registered Guardian
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{dispatchModalReport.parentName}</h4>
                    <p className="text-slate-600 font-mono mt-0.5">
                      Phone: <strong>{dispatchModalReport.parentPhone || '+233 24 456 7890'}</strong>
                    </p>
                    {dispatchModalReport.parentEmail && (
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Email: {dispatchModalReport.parentEmail}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Ward</span>
                    <span className="font-bold text-slate-800">{dispatchModalReport.studentName}</span>
                    <span className="text-[10px] text-slate-500 block">{dispatchModalReport.className}</span>
                  </div>
                </div>
              </div>

              {/* Inspection Status Badge */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block text-xs">Official Administrative Clearance Verified</span>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Inspected & digitally endorsed by <strong>{dispatchModalReport.inspectedBy || 'Headteacher'}</strong> on {dispatchModalReport.inspectedAt || 'Recently'}.
                  </p>
                </div>
              </div>

              {/* Channel Selector */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Select Delivery Channels for Parent:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('portal')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChannels((prev) => [...prev, 'portal']);
                        } else {
                          setSelectedChannels((prev) => prev.filter((c) => c !== 'portal'));
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block">Parent Portal Instant Release</span>
                      <span className="text-[11px] text-slate-500">Unlocks official PDF report card download on {dispatchModalReport?.parentName ? `${dispatchModalReport.parentName}'s` : 'Parent'} dashboard</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('sms')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChannels((prev) => [...prev, 'sms']);
                        } else {
                          setSelectedChannels((prev) => prev.filter((c) => c !== 'sms'));
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block">SMS Text Message Alert</span>
                      <span className="text-[11px] text-slate-500">Sends instant SMS notification to {dispatchModalReport.parentPhone || '+233 24 456 7890'}</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedChannels.includes('whatsapp')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedChannels((prev) => [...prev, 'whatsapp']);
                        } else {
                          setSelectedChannels((prev) => prev.filter((c) => c !== 'whatsapp'));
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-slate-900 block">WhatsApp Summary Digest</span>
                      <span className="text-[11px] text-slate-500">Sends terminal averages & grades directly to parent&apos;s WhatsApp</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Custom Teacher Note to Parent */}
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                  Custom Teacher Note to Parent (Included in Notification):
                </label>
                <textarea
                  rows={3}
                  value={teacherCustomNote}
                  onChange={(e) => setTeacherCustomNote(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 leading-relaxed font-medium"
                  placeholder="Add a personalized message from the form master..."
                />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDispatchModalReport(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  sendReportToParent(dispatchModalReport.id, selectedChannels, teacherCustomNote);
                  setSaveToast(
                    `Official report card for ${dispatchModalReport.studentName} has been dispatched to ${dispatchModalReport.parentName}!`
                  );
                  setTimeout(() => setSaveToast(null), 4000);
                  setDispatchModalReport(null);
                }}
                disabled={selectedChannels.length === 0}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Send to Parent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

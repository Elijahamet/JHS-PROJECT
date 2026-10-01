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
  Sparkles,
  Save,
  Check,
  Search,
  Filter,
  Eye,
  Megaphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ReportCardSheet } from './ReportCardSheet';
import { PortalChatView } from './PortalChatView';

interface TeacherPortalProps {
  tab?: 'cockpit' | 'classes' | 'attendance' | 'marks' | 'remarks' | 'announcements' | 'chat';
}

export const TeacherPortalView: React.FC<TeacherPortalProps> = ({ tab = 'cockpit' }) => {
  const { currentUser, setCurrentNav, setIsReportCardModalOpen, announcements } = useApp();

  const [activeTab, setActiveTab] = useState<'cockpit' | 'classes' | 'attendance' | 'marks' | 'remarks' | 'announcements' | 'chat'>(tab);
  const [remarksSubTab, setRemarksSubTab] = useState<'generator' | 'roster'>('generator');

  React.useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Demo class roster for JHS 2A
  const [jhsStudents, setJhsStudents] = useState([
    { id: 'std_01', name: 'Kofi Mensah', gender: 'Male', roll: 'BFA-2024-001', attendance: 'Present', classScore: 26, examScore: 64, remark: 'Exceptional analytical ability and leadership.', conduct: 'Excellent' },
    { id: 'std_02', name: 'Ama Boateng', gender: 'Female', roll: 'BFA-2024-002', attendance: 'Present', classScore: 28, examScore: 68, remark: 'Consistently diligent and disciplined in class assignments.', conduct: 'Excellent' },
    { id: 'std_03', name: 'Kwame Osei', gender: 'Male', roll: 'BFA-2024-003', attendance: 'Late', classScore: 22, examScore: 54, remark: 'Capable student; needs to pay more attention in calculations.', conduct: 'Very Good' },
    { id: 'std_04', name: 'Akua Serwaa', gender: 'Female', roll: 'BFA-2024-004', attendance: 'Present', classScore: 27, examScore: 62, remark: 'Brilliant contributions during science practicals.', conduct: 'Excellent' },
    { id: 'std_05', name: 'Yaw Adjei', gender: 'Male', roll: 'BFA-2024-005', attendance: 'Absent', classScore: 19, examScore: 48, remark: 'Encouraged to attend after-school tutoring for science.', conduct: 'Good' },
    { id: 'std_06', name: 'Esi Frimpong', gender: 'Female', roll: 'BFA-2024-006', attendance: 'Present', classScore: 25, examScore: 60, remark: 'Polite and attentive pupil with good grasp of concepts.', conduct: 'Very Good' },
    { id: 'std_07', name: 'Kojo Antwi', gender: 'Male', roll: 'BFA-2024-007', attendance: 'Present', classScore: 23, examScore: 58, remark: 'Good effort throughout the term; keep practicing.', conduct: 'Good' },
  ]);

  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedStudentForRemark, setSelectedStudentForRemark] = useState(jhsStudents[0].id);
  const [remarkText, setRemarkText] = useState(jhsStudents[0].remark);
  const [conductRating, setConductRating] = useState(jhsStudents[0].conduct);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const teacherClasses = [
    { name: 'JHS 2A', count: 34, role: 'Class Teacher • Mathematics & Science', room: 'Block C - Room 302', attendanceToday: '32 Present (94.1%)' },
    { name: 'JHS 2B', count: 31, role: 'Subject Instructor • Mathematics', room: 'Block C - Room 303', attendanceToday: '29 Present (93.5%)' },
    { name: 'Basic 4', count: 33, role: 'Subject Instructor • Integrated Science', room: 'Block B - Room 201', attendanceToday: '31 Present (93.9%)' },
  ];

  const timetable = [
    { period: 'Period 1', time: '08:00 - 08:45 AM', class: 'JHS 2A', subject: 'Mathematics', topic: 'Algebraic Expressions & Factorization', room: 'Room 302' },
    { period: 'Period 2', time: '08:45 - 09:30 AM', class: 'JHS 2A', subject: 'Integrated Science', topic: 'Photosynthesis & Plant Respiration', room: 'Science Lab' },
    { period: 'Break', time: '09:30 - 10:15 AM', class: 'All', subject: 'Morning Snack & Assembly', topic: 'Supervision Duty', room: 'School Quadrangle' },
    { period: 'Period 4', time: '10:30 - 11:15 AM', class: 'Basic 4', subject: 'Science', topic: 'Living Things & Natural Habitats', room: 'Room 201' },
    { period: 'Period 6', time: '12:45 - 01:30 PM', class: 'JHS 2B', subject: 'Mathematics', topic: 'Geometry & Angles of Elevation', room: 'Room 303' },
  ];

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

      {/* Teacher Top Workbench Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-blue-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                Teacher Platform • Classroom Desk
              </span>
              <span className="text-xs text-blue-200">• Form Master: <strong>JHS 2A</strong></span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
              Mathematics & Integrated Science Faculty • Manage your assigned classes, take morning roll call, grade continuous assessments, and formulate terminal remarks.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
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
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Form Class</span>
              <p className="text-xl font-black text-slate-900 mt-1">JHS 2A</p>
              <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 34 Registered Pupils
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Today&apos;s Roll Call</span>
              <p className="text-xl font-black text-emerald-700 mt-1">94.1%</p>
              <p className="text-[11px] text-slate-500 mt-1">32 Present • 1 Late • 1 Absent</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Marks Recorded</span>
              <p className="text-xl font-black text-indigo-700 mt-1">6 / 7</p>
              <p className="text-[11px] text-slate-500 mt-1">Pupils marked for Term 2 tests</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Next Period</span>
              <p className="text-xl font-black text-blue-700 mt-1">08:00 AM</p>
              <p className="text-[11px] text-slate-500 mt-1">Mathematics in Room 302</p>
            </div>
          </div>

          {/* Today's Teaching Schedule */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Today&apos;s Teaching Schedule & Periods</h3>
              </div>
              <Badge variant="navy">Term 2 • Week 5</Badge>
            </div>

            <div className="space-y-2.5">
              {timetable.map((slot, idx) => (
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
              ))}
            </div>
          </div>

          {/* Assigned Classes Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">My Assigned Classes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teacherClasses.map((cls, idx) => (
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CLASSES & ROSTERS VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'classes' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Form Class Student Roster • JHS 2A</h2>
              <p className="text-xs text-slate-500">Student records, emergency contacts, and academic averages for your form class.</p>
            </div>
            <Badge variant="success">34 Registered Pupils</Badge>
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
                {jhsStudents.map((std) => (
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
                ))}
              </tbody>
            </table>
          </div>
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
              <h2 className="text-xl font-bold text-slate-900">Mark Attendance • JHS 2A</h2>
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
                {jhsStudents.map((std) => (
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
                ))}
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
                {jhsStudents.map((std) => {
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
                })}
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
            <div className="flex items-center gap-2">
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

          {/* 5A. Interactive Report Card Generator (Matches provided design) */}
          {remarksSubTab === 'generator' && (
            <ReportCardSheet
              initialStudentName={jhsStudents.find((s) => s.id === selectedStudentForRemark)?.name || jhsStudents[0].name}
              initialLevel="Junior High School 2"
              initialClassName="JHS 2A"
              initialSchoolName="Salford High School"
              isModal={false}
            />
          )}

          {/* 5B. Roster Remarks Form */}
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
                  {jhsStudents.map((std) => (
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
                  ))}
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
            partnerName="Mrs. Cynthia Arthur"
            partnerRole="School Headmistress & Administration"
            partnerSubtitle="Direct executive line • Headteacher Desk"
          />
        </div>
      )}
    </div>
  );
};

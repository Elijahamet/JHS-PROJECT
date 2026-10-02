import React, { useState } from 'react';
import {
  CreditCard,
  UtensilsCrossed,
  Bus,
  CheckCircle2,
  Megaphone,
  Smartphone,
  ShieldCheck,
  Receipt,
  Download,
  MessageSquare,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Send,
  Printer,
  Eye,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PortalChatView } from './PortalChatView';

interface ParentPortalProps {
  tab?: 'overview' | 'reports' | 'attendance' | 'fees' | 'pay' | 'announcements' | 'chat';
}

export const ParentPortalView: React.FC<ParentPortalProps> = ({ tab = 'overview' }) => {
  const {
    currentUser,
    students,
    routes,
    announcements,
    reportCards,
    setSelectedStudentId,
    setIsReportCardModalOpen,
    setSelectedReceiptPayment,
    addPayment,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'attendance' | 'fees' | 'pay' | 'announcements' | 'chat'>(tab);

  React.useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  // Online Payment Simulation States
  const [payCategory, setPayCategory] = useState<'School Fees' | 'Feeding Fees'>('Feeding Fees');
  const [payAmount, setPayAmount] = useState<number>(250);
  const [payChannel, setPayChannel] = useState<'mtn' | 'telecel' | 'card'>('mtn');
  const [momoNumber, setMomoNumber] = useState('024 456 7890');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<string | null>(null);

  // Primary linked student for parent persona
  const child = students.find((s) => s.id === currentUser?.linkedStudentId) || students[0] || {
    id: 'std_01',
    studentId: 'BFA-2024-001',
    firstName: 'Kofi',
    lastName: 'Mensah',
    className: 'JHS 2A',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=256',
    schoolFeeBalance: 0,
    feedingFeeBalance: 250,
    attendanceRate: 96.5,
    lastGradeAverage: 88.4,
  };

  const childReport = reportCards.find((r) => r.studentId === child.id) || reportCards[0];

  const busRoute = routes[0] || {
    id: 'route_01',
    name: 'Route 1: Madina - Adenta - Campus',
    status: 'On Route',
    busNumber: 'GR-4891-22',
  };

  const subjectScores = [
    { name: 'Mathematics', classScore: 28, examScore: 62, total: 90, grade: '1', remark: 'Excellent' },
    { name: 'English Language', classScore: 26, examScore: 58, total: 84, grade: '1', remark: 'Excellent' },
    { name: 'Integrated Science', classScore: 25, examScore: 61, total: 86, grade: '1', remark: 'Excellent' },
    { name: 'Social Studies', classScore: 27, examScore: 54, total: 81, grade: '1', remark: 'Excellent' },
    { name: 'Information & Comm. Tech (ICT)', classScore: 29, examScore: 63, total: 92, grade: '1', remark: 'Highest' },
    { name: 'Creative Arts & Design', classScore: 24, examScore: 56, total: 80, grade: '1', remark: 'Excellent' },
    { name: 'Ghanaian Language (Twi)', classScore: 23, examScore: 52, total: 75, grade: '2', remark: 'Very Good' },
  ];

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const newPayment = addPayment({
        studentId: child.id,
        category: payCategory,
        amount: payAmount,
        paymentMethod: payChannel === 'card' ? 'Bank Transfer' : 'Mobile Money (MoMo)',
        reference: `MOMO-${Date.now().toString().slice(-6)}`,
        notes: `Online Parent Portal Instant Fee Settlement for ${child.firstName} ${child.lastName}`,
      });

      setSelectedReceiptPayment(newPayment);
      setPaymentSuccessToast(`Payment of GH₵ ${payAmount.toFixed(2)} completed successfully! Official receipt issued.`);
      setTimeout(() => setPaymentSuccessToast(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Toast Notification */}
      {paymentSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-400 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-semibold">{paymentSuccessToast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-purple-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={child.photoUrl}
              alt={child.firstName}
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-300 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-400/20 text-purple-300 border border-purple-400/30">
                  Parent & Guardian Portal
                </span>
                <span className="text-xs text-purple-200">• Ward: <strong>{child.firstName} {child.lastName}</strong></span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white mt-0.5">
                {child.firstName}&apos;s Academic & School Dashboard
              </h1>
              <p className="text-xs text-purple-200 mt-0.5">
                Class: <strong>{child.className}</strong> • Form Master: Mr. Emmanuel Darko • Roll No: {child.studentId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-purple-500 text-white font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Ward Overview
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'reports'
                  ? 'bg-purple-500 text-white font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Report Card
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'fees'
                  ? 'bg-purple-500 text-white font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              Fee Statement
            </button>
            <button
              onClick={() => setActiveTab('pay')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-md`}
            >
              Pay Online (MoMo)
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-purple-500 text-white font-bold shadow-md'
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
      {/* 1. WARD OVERVIEW TAB */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Status Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider">Today&apos;s Attendance</span>
              <p className="text-sm font-bold text-emerald-900 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Present in Class (07:40 AM)</span>
              </p>
            </div>

            <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[11px] text-blue-800 font-semibold uppercase tracking-wider">Academic Standing</span>
              <p className="text-sm font-bold text-blue-900 mt-1">
                {child.lastGradeAverage}% • 4th in Class
              </p>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-[11px] text-purple-800 font-semibold uppercase tracking-wider">School Bus Status</span>
              <p className="text-xs font-bold text-purple-900 mt-1 flex items-center gap-1">
                <Bus className="w-3.5 h-3.5" />
                <span>{busRoute.status} ({busRoute.busNumber})</span>
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">Academic Term</span>
              <p className="text-xs font-bold text-slate-800 mt-1">
                Term 2 • Week 5 of 12
              </p>
            </div>
          </div>

          {/* Financial Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tuition Fees Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    School Tuition Fees
                  </h3>
                </div>
                <Badge variant="success">Fully Paid</Badge>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Term 2 Billed:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(2000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Paid:</span>
                  <span className="font-semibold text-emerald-700">{formatCurrency(2000)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100 font-bold">
                  <span className="text-slate-700">Remaining Balance:</span>
                  <span className="text-emerald-700">GH₵ 0.00</span>
                </div>
              </div>
            </div>

            {/* Feeding Fees Card */}
            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-amber-700" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Daily Feeding Programme Fee
                  </h3>
                </div>
                <Badge variant="warning">Balance Due</Badge>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Term 2 Lunch Billed:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(600)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-semibold text-emerald-700">{formatCurrency(350)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-amber-100 font-bold">
                  <span className="text-slate-700">Arrears Due:</span>
                  <span className="text-amber-800">{formatCurrency(250)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setPayCategory('Feeding Fees');
                  setPayAmount(250);
                  setActiveTab('pay');
                }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>Pay Feeding Balance (GH₵ 250.00) Online</span>
              </button>
            </div>
          </div>

          {/* Form Teacher Message */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Note From Class Teacher • Mr. Emmanuel Darko
              </h3>
              <span className="text-[11px] text-slate-400">Sent Yesterday</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              &ldquo;Good day Mrs. Osei, Kofi has demonstrated very strong performance in mathematics this week. Please ensure he completes the weekend homework on algebraic factorization due on Monday morning.&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REPORT CARD TAB */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {childReport?.status === 'sent_to_parent' ? (
            /* A. OFFICIAL DISPATCHED REPORT CARD (RELEASED TO PARENT) */
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
              {/* Official Seal Banner */}
              <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-500/40 shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                        Official Terminal Report Delivered
                      </span>
                      <span className="text-xs text-slate-300">• Verified by Administration</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">
                      Inspected & Approved by Headmistress {childReport.inspectedBy || 'Mrs. Cynthia Arthur'}
                    </h3>
                    <p className="text-[11px] text-emerald-200">
                      Dispatched by {childReport.sentByTeacher || 'Mr. Emmanuel Darko (Form Master)'} on {childReport.sentAt || 'Recently'} via {childReport.sentChannels?.join(', ') || 'Portal & SMS'}.
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="primary"
                  icon={Download}
                  onClick={() => {
                    setSelectedStudentId(child.id);
                    setIsReportCardModalOpen(true);
                  }}
                >
                  Download Official Report PDF
                </Button>
              </div>

              {/* Teacher's Personal Message to Parent */}
              {childReport.teacherNoteToParent && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-xs">
                  <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-blue-700" />
                    Teacher&apos;s Dispatch Message to {child.parentName || 'Parent'}:
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    &ldquo;{childReport.teacherNoteToParent}&rdquo;
                  </p>
                  <span className="text-[10px] text-slate-500 block pt-0.5">
                    — {childReport.sentByTeacher || 'Mr. Emmanuel Darko (Form Master)'}
                  </span>
                </div>
              )}

              {/* Academic Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Terminal Average</span>
                  <p className="text-lg font-black text-blue-700 mt-0.5">{childReport.overallAverage}%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Class Position</span>
                  <p className="text-lg font-black text-slate-900 mt-0.5">{childReport.classPosition}th of {childReport.classTotalStudents}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Attendance</span>
                  <p className="text-lg font-black text-emerald-700 mt-0.5">{childReport.attendanceDaysPresent} / {childReport.attendanceTotalDays} Days</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Promotion Status</span>
                  <p className="text-sm font-bold text-purple-700 mt-1">{childReport.promotionStatus}</p>
                </div>
              </div>

              {/* Subject Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3 font-semibold">Subject</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Class Score (30%)</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Exam Score (70%)</th>
                      <th className="py-2.5 px-2 font-bold text-center">Total (100%)</th>
                      <th className="py-2.5 px-2 font-semibold text-center">Grade</th>
                      <th className="py-2.5 px-3 font-semibold text-right">Teacher Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(childReport.subjects && childReport.subjects.length > 0 ? childReport.subjects : [
                      { subjectName: 'Mathematics', classwork: 18, homework: 9, exam: 58, total: 85, grade: '1', remarks: 'Excellent' },
                      { subjectName: 'English Language', classwork: 18, homework: 8, exam: 58, total: 84, grade: '1', remarks: 'Excellent' },
                      { subjectName: 'Integrated Science', classwork: 18, homework: 9, exam: 61, total: 88, grade: '1', remarks: 'Excellent' },
                      { subjectName: 'Social Studies', classwork: 17, homework: 8, exam: 57, total: 82, grade: '1', remarks: 'Very Good' },
                      { subjectName: 'Computing / ICT', classwork: 19, homework: 9, exam: 65, total: 93, grade: '1', remarks: 'Highest' },
                      { subjectName: 'French', classwork: 16, homework: 8, exam: 54, total: 78, grade: '2', remarks: 'Good' },
                    ]).map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-2.5 px-3 font-bold text-slate-900">{sub.subjectName}</td>
                        <td className="py-2.5 px-2 text-center text-slate-700">{sub.classwork + sub.homework}</td>
                        <td className="py-2.5 px-2 text-center text-slate-700">{sub.exam}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-blue-700">{sub.total}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Grade {sub.grade}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-600 font-medium">
                          {sub.remarks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Endorsements: Teacher & Headteacher Evaluation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl space-y-1 border border-slate-200/80">
                  <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                    Class Teacher&apos;s Qualitative Remarks
                  </span>
                  <p className="text-slate-700 leading-relaxed font-medium italic">
                    &ldquo;{childReport.classTeacherRemarks}&rdquo;
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium pt-1">
                    — {childReport.classTeacherName || 'Mr. Emmanuel Darko (Form Master)'}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50/60 rounded-xl space-y-1 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950 uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Official Headteacher Endorsement
                    </span>
                    <span className="px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded text-[9px] font-bold uppercase">
                      Audited
                    </span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    &ldquo;{childReport.headteacherRemarks}&rdquo;
                  </p>
                  <p className="text-[11px] text-emerald-800 font-bold pt-1">
                    ✓ {childReport.inspectedBy || 'Mrs. Cynthia Arthur (Headmistress)'} • {childReport.inspectedAt || 'Endorsed'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* B. REPORT CARD IN-PROGRESS TRACKER (PENDING INSPECTION OR DISPATCH) */
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                      Official Terminal Assessment Pipeline
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      Under Official Review
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                    Terminal Report Card • Term 2 (2024/2025)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official Ghanaian Basic & JHS Terminal Assessment for {child.firstName} {child.lastName}.
                  </p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Official Report Card Release Milestones:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  {/* Step 1 */}
                  <div className="p-3 bg-white rounded-lg border border-emerald-200 shadow-2xs space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>1. Marks Entry</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Classwork & Exams recorded by subject instructors.
                    </p>
                    <span className="text-[10px] font-bold text-emerald-700 block">✓ Completed</span>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-3 bg-white rounded-lg border shadow-2xs space-y-1 ${
                    childReport?.status === 'inspected_approved'
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-amber-200 bg-amber-50/20'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      {childReport?.status === 'inspected_approved' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                      )}
                      <span>2. Admin Inspection</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Headmistress audits marks and signs official remarks.
                    </p>
                    <span className="text-[10px] font-bold text-amber-800 block">
                      {childReport?.status === 'inspected_approved' ? '✓ Approved by Admin' : '⏳ In Progress'}
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-3 bg-white rounded-lg border shadow-2xs space-y-1 ${
                    childReport?.status === 'inspected_approved'
                      ? 'border-blue-300 bg-blue-50/20'
                      : 'border-slate-200 opacity-70'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Send className="w-4 h-4 text-blue-600" />
                      <span>3. Teacher Dispatch</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Form Master sends report to {child.parentName || 'Parent'}.
                    </p>
                    <span className="text-[10px] font-bold text-blue-700 block">
                      {childReport?.status === 'inspected_approved' ? '⚡ Ready for Send' : 'Pending Step 2'}
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1 opacity-70">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>4. Parent Download</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Official PDF unlocked on your dashboard.
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 block">Pending Release</span>
                  </div>
                </div>
              </div>

              {/* Status Alert Banner */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold">
                    Official Endorsement Protocol Active
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    Under school governance, terminal report cards remain confidential until they have been officially inspected by the Headmistress (Mrs. Cynthia Arthur) and subsequently dispatched by the Form Teacher (Mr. Emmanuel Darko) directly to your parent account.
                  </p>
                  {childReport?.status === 'inspected_approved' && (
                    <p className="text-[11px] font-semibold text-emerald-800 pt-1">
                      Good news: Headmistress Mrs. Cynthia Arthur has already inspected and endorsed this report card! The form teacher can now release it to your portal and phone at any moment.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  Registered Ward: <strong>{child.firstName} {child.lastName}</strong> ({child.className})
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  icon={Eye}
                  onClick={() => {
                    setSelectedStudentId(child.id);
                    setIsReportCardModalOpen(true);
                  }}
                >
                  Preview Working Draft Template
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ATTENDANCE LOG TAB */}
      {/* ========================================================================= */}
      {activeTab === 'attendance' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Attendance & Punctuality Record</h2>
              <p className="text-xs text-slate-500">Official biometric and roll call logs for {child.firstName}.</p>
            </div>
            <Badge variant="success">96.7% Term Attendance</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-xs text-emerald-800 font-semibold">Days Present</span>
              <p className="text-2xl font-black text-emerald-900 mt-1">58 Days</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-xs text-amber-800 font-semibold">Late Arrivals</span>
              <p className="text-2xl font-black text-amber-900 mt-1">2 Days</p>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
              <span className="text-xs text-rose-800 font-semibold">Unexcused Absences</span>
              <p className="text-2xl font-black text-rose-900 mt-1">0 Days</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="py-2.5 px-4 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Day</th>
                  <th className="py-2.5 px-3 font-semibold">Arrival Time</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { date: 'Today (Oct 01, 2026)', day: 'Thursday', time: '07:40 AM', status: 'Present', color: 'text-emerald-700 bg-emerald-50' },
                  { date: 'Sep 30, 2026', day: 'Wednesday', time: '07:35 AM', status: 'Present', color: 'text-emerald-700 bg-emerald-50' },
                  { date: 'Sep 29, 2026', day: 'Tuesday', time: '07:55 AM', status: 'Late', color: 'text-amber-700 bg-amber-50' },
                  { date: 'Sep 28, 2026', day: 'Monday', time: '07:30 AM', status: 'Present', color: 'text-emerald-700 bg-emerald-50' },
                  { date: 'Sep 25, 2026', day: 'Friday', time: '07:38 AM', status: 'Present', color: 'text-emerald-700 bg-emerald-50' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{row.date}</td>
                    <td className="py-2.5 px-3 text-slate-600">{row.day}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-700">{row.time}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ONLINE PAYMENT GATEWAY (MoMo) */}
      {/* ========================================================================= */}
      {(activeTab === 'fees' || activeTab === 'pay') && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Instant School Fee Settlement
              </span>
              <h2 className="text-xl font-bold text-slate-900">Online Fee Payment Gateway</h2>
              <p className="text-xs text-slate-500 mt-0.5">Pay via MTN Mobile Money, Telecel Cash, or Bank Card with instant receipt.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>GES & Bank of Ghana Verified</span>
            </div>
          </div>

          <form onSubmit={handleProcessPayment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Bill Item
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPayCategory('Feeding Fees');
                      setPayAmount(250);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      payCategory === 'Feeding Fees'
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <UtensilsCrossed className="w-5 h-5 text-amber-600 mb-1" />
                    <p className="text-xs font-bold text-slate-900">Feeding Programme</p>
                    <p className="text-[11px] text-amber-800 font-semibold">Arrears: GH₵ 250.00</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPayCategory('School Fees');
                      setPayAmount(500);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      payCategory === 'School Fees'
                        ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
                    <p className="text-xs font-bold text-slate-900">Tuition Advance</p>
                    <p className="text-[11px] text-emerald-700 font-semibold">Fully Paid (Deposit)</p>
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Amount to Pay (GH₵)
                </label>
                <input
                  type="number"
                  min={10}
                  max={5000}
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full text-base font-bold text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Payment Channel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayChannel('mtn')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      payChannel === 'mtn'
                        ? 'border-amber-400 bg-amber-50 text-amber-950 ring-2 ring-amber-400/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    MTN MoMo
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayChannel('telecel')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      payChannel === 'telecel'
                        ? 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Telecel Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayChannel('card')}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                      payChannel === 'card'
                        ? 'border-blue-400 bg-blue-50 text-blue-950 ring-2 ring-blue-400/30'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    Visa / Card
                  </button>
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile Money Wallet Number
                </label>
                <input
                  type="text"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 text-slate-800"
                  placeholder="024 XXX XXXX"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing on Phone Prompt...</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>Authorize & Pay GH₵ {payAmount.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Live Phone Prompt Graphic */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-col justify-between border border-slate-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>USSD Prompt Preview</span>
                  <span className="text-emerald-400 font-mono">256-bit Encrypted</span>
                </div>

                <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-2">
                  <p className="font-bold text-amber-300">
                    MTN Mobile Money Prompt:
                  </p>
                  <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
                    &ldquo;Authorize payment of GH₵ {payAmount.toFixed(2)} to BRIGHT FUTURE ACADEMY (SchoolOS)?
                    Fee: GH₵ 0.00. Enter MM PIN to approve.&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">Automatic Instant Receipt</p>
                <p>Upon confirmation, an official stamped receipt is recorded in the school ledger and sent via SMS to your phone.</p>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SCHOOL CIRCULARS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'announcements' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Megaphone className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Official Notices for Parents & Guardians</h2>
              <p className="text-xs text-slate-500">Circulars, PTA agendas, and midterm schedules from School Administration.</p>
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
      {/* 6. ADMIN & SCHOOL CHAT (OFFLINE-FIRST) */}
      {/* ========================================================================= */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Direct Parent-to-School Chat</h2>
              <p className="text-xs text-slate-500">
                Direct inquiry desk with Mrs. Cynthia Arthur (Headmistress). Fully offline enabled with local sync.
              </p>
            </div>
          </div>
          <PortalChatView
            partnerName="Mrs. Cynthia Arthur"
            partnerRole="School Headmistress & Administration"
            partnerSubtitle="Direct communication desk for parents & guardians"
          />
        </div>
      )}
    </div>
  );
};

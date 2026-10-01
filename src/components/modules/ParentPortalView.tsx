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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface ParentPortalProps {
  tab?: 'overview' | 'reports' | 'attendance' | 'fees' | 'pay' | 'announcements';
}

export const ParentPortalView: React.FC<ParentPortalProps> = ({ tab = 'overview' }) => {
  const {
    students,
    routes,
    announcements,
    setIsReportCardModalOpen,
    setSelectedReceiptPayment,
    addPayment,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'attendance' | 'fees' | 'pay' | 'announcements'>(tab);

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
  const child = students[0] || {
    id: 'std_01',
    studentId: 'BFA-2024-001',
    firstName: 'Kofi',
    lastName: 'Osei',
    className: 'Basic 4A',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=256',
    schoolFeeBalance: 0,
    feedingFeeBalance: 250,
    attendanceRate: 96.5,
    lastGradeAverage: 84.5,
  };

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
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                Official Terminal Assessment
              </span>
              <h2 className="text-xl font-bold text-slate-900">Terminal Report Card • Term 2</h2>
              <p className="text-xs text-slate-500 mt-0.5">GES Approved Continuous Assessment & Examination Terminal Marksheet.</p>
            </div>

            <Button
              size="sm"
              variant="primary"
              icon={Download}
              onClick={() => setIsReportCardModalOpen(true)}
            >
              Print / Download Official PDF
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider">
                  <th className="py-3 px-4 font-semibold">Subject</th>
                  <th className="py-3 px-3 font-semibold text-center">Class Score (30%)</th>
                  <th className="py-3 px-3 font-semibold text-center">Exam Score (70%)</th>
                  <th className="py-3 px-3 font-bold text-center">Total (100%)</th>
                  <th className="py-3 px-3 font-semibold text-center">Grade</th>
                  <th className="py-3 px-4 font-semibold text-right">Teacher Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjectScores.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-bold text-slate-900">{sub.name}</td>
                    <td className="py-3 px-3 text-center text-slate-700">{sub.classScore}</td>
                    <td className="py-3 px-3 text-center text-slate-700">{sub.examScore}</td>
                    <td className="py-3 px-3 text-center font-bold text-blue-700">{sub.total}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Grade {sub.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 font-medium">
                      {sub.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Teacher & Headteacher Evaluation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Class Teacher&apos;s Remarks</span>
              <p className="text-slate-700 leading-relaxed">
                &ldquo;An exceptional and diligent pupil who demonstrates leadership and analytical acumen. Keep up the high standard!&rdquo;
              </p>
              <p className="text-[11px] text-slate-500 font-medium pt-1">— Mr. Emmanuel Darko (Form Master)</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Headteacher&apos;s Recommendation</span>
              <p className="text-slate-700 leading-relaxed">
                &ldquo;Outstanding terminal performance. Promoted with credit standing.&rdquo;
              </p>
              <p className="text-[11px] text-slate-500 font-medium pt-1">— Mrs. Cynthia Arthur (Headteacher)</p>
            </div>
          </div>
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
    </div>
  );
};

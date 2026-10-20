import React, { useState } from 'react';
import {
  GraduationCap,
  Building2,
  Users,
  CreditCard,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  Smartphone,
  FileText,
  ScanLine,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  CalendarCheck,
  Receipt,
  Lock,
  Layers,
  Phone,
  Mail,
  MapPin,
  Play,
  HeartHandshake,
  LayoutDashboard,
  FileSpreadsheet,
  Megaphone,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPageView: React.FC = () => {
  const { setAuthScreen, setUserRole, currentSchool } = useApp();

  const [activePortalTab, setActivePortalTab] = useState<'admin' | 'teacher' | 'bursar' | 'parent'>('admin');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'term' | 'annual'>('term');

  // Launch live interactive demo into specific persona
  const handleLaunchRoleDemo = (role: 'school_admin' | 'teacher' | 'accountant' | 'parent') => {
    setUserRole(role);
    setAuthScreen('authenticated');
  };

  const faqs = [
    {
      q: 'Is SchoolOS aligned with Ghana Education Service (GES) and NaCCA standards?',
      a: 'Yes, completely. SchoolOS is designed specifically around the NaCCA curriculum framework for Kindergarten (KG 1–2), Primary (Basic 1–6), and Junior High School (JHS 1–3). It handles continuous assessment (50/50 SBA), calculates terminal exam totals, assigns Stanine grades (1 to 9), and generates standardized terminal report cards with position rankings.',
    },
    {
      q: 'How does Mobile Money (MoMo) fee collection work?',
      a: 'Parents can pay school tuition, feeding fees, and PTA dues directly from their phones using MTN Mobile Money, Telecel Cash, or AT Money. Payments deposit directly into the school account, an instant digital receipt is generated, and the bursar ledger updates automatically with zero cash handling.',
    },
    {
      q: 'Can the school use SchoolOS when the internet is down?',
      a: 'Yes. SchoolOS features an offline-first architecture. Teachers can record daily roll call, enter assessment marks, and view class rosters even without an internet connection. All data automatically synchronizes as soon as connectivity is restored.',
    },
    {
      q: 'How are new students placed into their classes?',
      a: 'When you enroll a student, you select their academic stage and class (e.g. Basic 3 or JHS 1). The student is automatically added to that class stream, the teacher roster updates, and the class appears immediately on the Classes & Subjects page.',
    },
    {
      q: 'Can we print physical report cards and official receipts?',
      a: 'Yes. SchoolOS generates clean, high-resolution printable report cards featuring your official school crest, headteacher signature, position ranks, and teacher conduct remarks. Official receipts include institutional stamps and unique reference numbers.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
          <span>Built for Ghanaian Basic Schools & Junior High Schools • Aligned with GES & NaCCA Standards</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/20">
              <span>S</span>
              <span className="text-cyan-300">OS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">SchoolOS</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Ghana Basic & JHS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Institutional Operating System</p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#classrooms" className="hover:text-blue-600 transition-colors">Classroom Life</a>
            <a href="#portals" className="hover:text-blue-600 transition-colors">4 Specialized Portals</a>
            <a href="#curriculum" className="hover:text-blue-600 transition-colors">NaCCA & GES</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#faqs" className="hover:text-blue-600 transition-colors">FAQs</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthScreen('login')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors shadow-2xs"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthScreen('signup')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <span>Register School</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Clean Editorial Split Screen (ZERO text on pictures) */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Clear Human Value Proposition */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>The Modern Operating System for Ghanaian Schools</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                A calmer, simpler way to run your school.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                Built specifically for Ghanaian educational reality: from <strong>Kindergarten (KG 1–2)</strong> and <strong>Primary (Basic 1–6)</strong> to <strong>Junior High (JHS 1–3)</strong>.
                Manage student enrollment, continuous assessment (50/50 SBA), terminal report cards with position rankings, and Mobile Money fee collection.
              </p>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-7 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Register Your School Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleLaunchRoleDemo('school_admin')}
                  className="px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-blue-600 fill-blue-600/20" />
                  <span>Explore Live Demo</span>
                </button>
              </div>

              {/* Feature Highlights */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">NaCCA 50/50 SBA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">MTN & Telecel MoMo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">Works Offline</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-medium">Act 843 Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Framed Authentic Photo (NO text overlaid on top) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian basic school pupils in uniform walking together on school campus"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Clean Metric Strip */}
      <section className="bg-slate-50 py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 tracking-tight">180+</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Ghanaian Schools</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-blue-600 tracking-tight">45,000+</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Enrolled Pupils</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-emerald-600 tracking-tight">99.4%</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Fee Collection Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 tracking-tight">1 Click</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Terminal Report Generation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Life: Clean Editorial Split (Picture Cleanly Beside Content) */}
      <section id="classrooms" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Block 1: Real Pupils in Classroom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Clean Framed Photo - NO text on top */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <img
                  src="/assets/ghana_classroom_crisp.jpg"
                  alt="Ghanaian school pupils sitting at wooden desks studying mathematics in classroom"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academic Assessment</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Continuous assessment and marks computed in minutes.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Ghanaian teachers often spend two to three weeks every term manually calculating continuous assessment (SBA),
                position rankings, and writing handwritten remarks for 40+ pupils per class.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                With SchoolOS, enter Class Assessment Tasks (CAT 1–4) and exam marks. The system automatically computes
                the 50/50 SBA weights, ranks pupils, and pre-fills constructive NaCCA remarks.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>NaCCA 50/50 SBA Scheme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Stanine BECE Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Automatic Position Rankings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Print-Ready Terminal Reports</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: School Leadership & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Description Column */}
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Institutional Governance</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Headteachers gain complete clarity over every class stream.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                No more guessing whether roll call was taken, whether teachers arrived on time, or how much school fees remain outstanding in arrears.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                From your phone or laptop, monitor class streams across Kindergarten, Primary, and Junior High.
                Approve terminal report cards in one click with your official school crest and signature.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Instant Class Stream Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Daily Attendance Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Staff Class Teacher Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Audit-Ready Bursary Reports</span>
                </div>
              </div>
            </div>

            {/* Clean Framed Photo - NO text on top */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <img
                  src="/assets/ghana_headmistress_crisp.jpg"
                  alt="Ghanaian school headmistress in administrative office"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Specialized Portals Showcase */}
      <section id="portals" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Role-Based Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              A dedicated portal for every stakeholder
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Select any role below to preview its specialized workbench and launch an interactive live test drive.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
            {/* Tab Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActivePortalTab('admin')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    activePortalTab === 'admin'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Headteacher Cockpit</span>
                </button>

                <button
                  onClick={() => setActivePortalTab('teacher')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    activePortalTab === 'teacher'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Class Teacher Desk</span>
                </button>

                <button
                  onClick={() => setActivePortalTab('bursar')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    activePortalTab === 'bursar'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Bursar & MoMo Desk</span>
                </button>

                <button
                  onClick={() => setActivePortalTab('parent')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    activePortalTab === 'parent'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Parent Portal</span>
                </button>
              </div>

              {/* Direct Demo Trigger */}
              <button
                onClick={() => {
                  const roleMap = {
                    admin: 'school_admin' as const,
                    teacher: 'teacher' as const,
                    bursar: 'accountant' as const,
                    parent: 'parent' as const,
                  };
                  handleLaunchRoleDemo(roleMap[activePortalTab]);
                }}
                className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>Live Test Drive →</span>
              </button>
            </div>

            {/* Portal Content Details */}
            <div className="p-4 sm:p-6 bg-slate-50/70 rounded-xl border border-slate-200/80">
              {activePortalTab === 'admin' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Headteacher & Board Administration</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Full governance over academic streams, teacher allocations, pupil bio-data, and institutional reporting.</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                      <p className="text-xs font-medium text-slate-500">Total Enrolled</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">540 Pupils</p>
                      <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">KG 1 to JHS 3</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                      <p className="text-xs font-medium text-slate-500">Active Streams</p>
                      <p className="text-2xl font-black text-blue-600 mt-1">11 Streams</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">All Staffed</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                      <p className="text-xs font-medium text-slate-500">Fee Recovery</p>
                      <p className="text-2xl font-black text-emerald-600 mt-1">94.2%</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Via MoMo & Bank</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                      <p className="text-xs font-medium text-slate-500">Roll Call Today</p>
                      <p className="text-2xl font-black text-slate-900 mt-1">98.4%</p>
                      <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">On Schedule</p>
                    </div>
                  </div>
                </div>
              )}

              {activePortalTab === 'teacher' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Form Master & Teacher Workbench</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Continuous assessment markbooks, optical test paper scanner, 1-click roll call, and terminal report comments.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4" /> 50/50 SBA Markbook
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Class Assessment Tasks (CAT 1–4) and terminal exams auto-weighted with Stanine rankings.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                        <ScanLine className="w-4 h-4" /> AI Test Paper Scanner
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Photograph paper tests or bubble answer sheets to automatically grade and enter student marks.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <CalendarCheck className="w-4 h-4" /> Fast Morning Roll Call
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Take attendance in under 60 seconds with instant automated absentee alerts to parents.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activePortalTab === 'bursar' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Bursary & Financial Collection Desk</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Tuition fees, feeding programme ledger, instant Mobile Money receipts, and automated defaulter reminders.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <p className="text-xs font-medium text-slate-500">Term Fees Billed</p>
                      <p className="text-2xl font-black text-slate-900">GH₵ 245,600</p>
                      <p className="text-[11px] text-slate-500">All registered classes</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <p className="text-xs font-medium text-slate-500">Cleared via MoMo & Bank</p>
                      <p className="text-2xl font-black text-emerald-600">GH₵ 226,934</p>
                      <p className="text-[11px] text-emerald-600 font-semibold">92.4% Recovery Rate</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                      <p className="text-xs font-medium text-slate-500">Outstanding Defaulters</p>
                      <p className="text-2xl font-black text-rose-600">38 Pupils</p>
                      <p className="text-[11px] text-slate-500">Automated SMS Reminders</p>
                    </div>
                  </div>
                </div>
              )}

              {activePortalTab === 'parent' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Parent & Guardian Mobile Portal</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Instant terminal report card PDF downloads, daily attendance status, and direct Mobile Money fee payment.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" /> Terminal Report Cards
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Download official terminal report cards directly on your phone as soon as the headteacher approves them.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" /> 1-Click MoMo Pay
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Pay tuition balance directly via MTN MoMo, Telecel Cash, or Card with immediate digital receipt.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-xs font-bold text-purple-600 flex items-center gap-1.5">
                        <Megaphone className="w-4 h-4" /> School Circulars
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Direct PTA notices, midterm break dates, and event reminders sent straight to your device.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GES & NaCCA 3-Stage Curriculum Standards */}
      <section id="curriculum" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              National Curriculum Compliance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Aligned with Ghanaian NaCCA Standards
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Pre-loaded with official GES subject lists, continuous assessment weights, and terminal evaluation criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stage 1: KG */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                Kindergarten (KG 1–2)
              </span>
              <h3 className="text-lg font-bold text-slate-900">Early Childhood Development</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Foundational development focusing on literacy, numeracy, psycho-motor skills, and psychosocial growth.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Language and Literacy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Numeracy & Reasoning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Our World and Our People (OWOP)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>Creative Arts & Physical Development</span>
                </li>
              </ul>
            </div>

            {/* Stage 2: Primary */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
                Primary (Basic 1–6)
              </span>
              <h3 className="text-lg font-bold text-slate-900">Foundational Core Curriculum</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Standardized continuous assessment and terminal examinations across all primary educational levels.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>English Language & Reading</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Mathematics & Natural Science</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Ghanaian Language & Culture</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>Computing & History of Ghana</span>
                </li>
              </ul>
            </div>

            {/* Stage 3: JHS */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-indigo-100 text-indigo-800 text-xs font-bold">
                Junior High (JHS 1–3)
              </span>
              <h3 className="text-lg font-bold text-slate-900">BECE Candidate Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rigorous preparation for BECE candidates with 50/50 SBA continuous assessment, mock tests, and Stanine rankings.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span>English, Integrated Science & Math</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span>Social Studies & RME</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span>Career Technology & Creative Arts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                  <span>Stanine 1–9 BECE Aggregate Calculator</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Real Testimonials from Ghanaian Educators & Parents */}
      <section id="testimonials" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Institutional Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              What Ghanaian educators say about SchoolOS
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Real results from headteachers, accountants, and parents across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “Our teachers used to take two full weeks of sleepless nights preparing end-of-term reports. With SchoolOS, every mark, position rank, and conduct remark was calculated in one afternoon. Parents were thrilled by how neat the reports looked.”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-3">
                <img
                  src="/assets/ghana_headmistress_crisp.jpg"
                  alt="Mrs. Elizabeth A. Appiah"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Mrs. Elizabeth A. Appiah</h4>
                  <p className="text-[11px] text-blue-600 font-medium">Headmistress, Accra Basic School</p>
                  <p className="text-[10px] text-slate-400">Greater Accra, Ghana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “The Mobile Money integration completely eradicated cash shortages in our bursary. Parents receive automated SMS prompts and pay from home. Our tuition collection jumped from 68% to 94% in our very first term.”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80"
                  alt="Mr. Samuel Boakye"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Mr. Samuel Boakye</h4>
                  <p className="text-[11px] text-emerald-600 font-medium">Chief Accountant / Bursar, Kumasi Premier Academy</p>
                  <p className="text-[10px] text-slate-400">Ashanti Region, Ghana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “As a working mother, I cannot visit the school daily. SchoolOS lets me check whether my daughter arrived safely each morning and see her JHS mock examination aggregate immediately. It gives me peace of mind.”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                  alt="Mrs. Abena Osei"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Mrs. Abena Osei</h4>
                  <p className="text-[11px] text-purple-600 font-medium">Parent & Guardian (JHS 2 Pupil)</p>
                  <p className="text-[10px] text-slate-400">Takoradi, Western Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Institutional Pricing */}
      <section id="pricing" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Clear Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Predictable plans for every Ghanaian school
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Transparent institutional pricing with zero hidden fees and free onboarding training for your staff.
            </p>

            {/* Toggle */}
            <div className="mt-6 inline-flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setBillingCycle('term')}
                className={`px-4 py-1.5 rounded-md font-bold transition-all ${
                  billingCycle === 'term' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Per Academic Term
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 rounded-md font-bold transition-all ${
                  billingCycle === 'annual' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Annual (Save 15%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Community Starter</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Kindergarten & Primary</h3>
                <p className="text-xs text-slate-500 mt-1">For growing basic schools establishing digital records.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    {billingCycle === 'term' ? 'GH₵ 450' : 'GH₵ 1,150'}
                  </span>
                  <span className="text-xs text-slate-500">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Up to 250 enrolled pupils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>KG 1 to Basic 6 Streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Continuous Assessment & Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Cash & Bank Receipting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="mt-8 w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Professional (Featured) */}
            <div className="p-8 rounded-2xl bg-slate-900 text-white shadow-xl relative flex flex-col justify-between border-2 border-blue-500">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                Recommended for JHS
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Professional Suite</span>
                <h3 className="text-xl font-bold text-white mt-1">Complete Basic & JHS</h3>
                <p className="text-xs text-slate-300 mt-1">Full-featured platform for Ghanaian basic and junior high schools.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">
                    {billingCycle === 'term' ? 'GH₵ 850' : 'GH₵ 2,150'}
                  </span>
                  <span className="text-xs text-slate-400">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Up to 750 enrolled pupils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Full KG, Basic 1–6 & JHS 1–3</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Automated MTN MoMo Collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>BECE Stanine Aggregate Calculator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Dedicated Parent Portal Access</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="mt-8 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow transition-all"
              >
                Register Your School
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Multi-Campus & Mission</h3>
                <p className="text-xs text-slate-500 mt-1">For mission units, trusts, and multi-campus school systems.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">Custom</span>
                  <span className="text-xs text-slate-500">/ volume discount</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Unlimited students & streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Branded SMS Sender ID</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Dedicated Staff Onboarding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>24/7 Priority Support Hotline</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="mt-8 w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faqs" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Clear Answers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-slate-200 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to upgrade your school operations?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join over 180 forward-thinking Ghanaian schools. Register in under 3 minutes with zero paperwork.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => setAuthScreen('signup')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Register Your School Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleLaunchRoleDemo('school_admin')}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
            >
              Test Drive Demo
            </button>
          </div>
        </div>
      </section>

      {/* Professional Institutional Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                  SOS
                </div>
                <span className="font-extrabold text-white text-sm">SchoolOS Ghana</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The institutional operating system for Ghanaian Kindergarten, Primary, and Junior High Schools. Compliant with GES, NaCCA, and the Data Protection Act (Act 843).
              </p>
            </div>

            {/* Col 2: Portals */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Portals</h5>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => handleLaunchRoleDemo('school_admin')} className="hover:text-white transition-colors">Headteacher Cockpit</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('teacher')} className="hover:text-white transition-colors">Teacher Workbench</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('accountant')} className="hover:text-white transition-colors">Bursary & MoMo Desk</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('parent')} className="hover:text-white transition-colors">Parent Portal</button></li>
              </ul>
            </div>

            {/* Col 3: Academic Stages */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Academic Stages</h5>
              <ul className="space-y-2 text-slate-400">
                <li><span>Kindergarten (KG 1–2)</span></li>
                <li><span>Primary (Basic 1–6)</span></li>
                <li><span>Junior High School (JHS 1–3)</span></li>
                <li><span>BECE 50/50 Continuous Assessment</span></li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Support & Offices</h5>
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Airport City & Ridge, Accra, Ghana</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+233 (0) 24 000 0000 / 020 000 0000</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>support@schoolos.edu.gh</span>
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} SchoolOS Ghana. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => setAuthScreen('login')} className="hover:text-slate-300">Sign In</button>
              <button onClick={() => setAuthScreen('signup')} className="hover:text-slate-300">Register School</button>
              <span>Ghana Education Service Standards</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

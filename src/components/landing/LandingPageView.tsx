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
  Sparkles,
  Star,
  Award,
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
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPageView: React.FC = () => {
  const { setAuthScreen, setUserRole, currentSchool } = useApp();

  const [activeTab, setActiveTab] = useState<'admin' | 'teacher' | 'bursar' | 'parent'>('admin');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'term' | 'annual'>('term');

  // Quick Demo launcher into specific persona
  const handleLaunchRoleDemo = (role: 'school_admin' | 'teacher' | 'accountant' | 'parent') => {
    setUserRole(role);
    setAuthScreen('authenticated');
  };

  const faqs = [
    {
      q: 'Is SchoolOS aligned with the Ghana Education Service (GES) and NaCCA standards?',
      a: 'Yes, 100%. SchoolOS is engineered specifically around the NaCCA common core and standard curriculum frameworks for Kindergarten (KG 1–2), Primary (Basic 1–6), and Junior High School (JHS 1–3). It calculates Continuous Assessment (30/70 or 50/50 SBA), generates standardized GES terminal report cards, and computes BECE Stanine grades automatically.',
    },
    {
      q: 'How does the Mobile Money (MoMo) fee collection work for parents?',
      a: 'Parents can pay school tuition, feeding fees, and PTA dues directly from their phone using MTN MoMo, Telecel Cash, or AT Money. When a payment is made, funds deposit into the school bank account, an instant digital receipt is issued, and the bursar ledger updates in real-time.',
    },
    {
      q: 'Can our school use SchoolOS if our internet is slow or unstable?',
      a: 'Yes! SchoolOS features an offline-first local cache engine. Teachers can take daily roll call, enter marks, and accountants can print receipts even when offline. As soon as connectivity is restored, all data synchronizes automatically.',
    },
    {
      q: 'How long does it take to enroll our students and set up classes?',
      a: 'Under 10 minutes. You can either import your existing student roster from Excel/CSV or initialize standard Ghanaian classes (KG 1 to JHS 3) with one click and enroll students with automatic stream placement.',
    },
    {
      q: 'Can we print physical report cards and official receipts?',
      a: 'Yes. SchoolOS generates high-resolution, print-ready terminal reports with your school crest, headteacher signature, position ranks, and teacher remarks. Receipts feature official institutional stamps and verifiable serial numbers.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[36rem] h-[36rem] bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/30">
              <span>S</span>
              <span className="text-cyan-300">OS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">SchoolOS</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-400/30 text-cyan-300">
                  Ghanaian Basic & JHS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Institutional Operating System</p>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-cyan-400 transition-colors">Platform Features</a>
            <a href="#classrooms" className="hover:text-cyan-400 transition-colors">Real Classrooms</a>
            <a href="#portals" className="hover:text-cyan-400 transition-colors">4 Portals</a>
            <a href="#curriculum" className="hover:text-cyan-400 transition-colors">GES / NaCCA</a>
            <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Headteacher Stories</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#faqs" className="hover:text-cyan-400 transition-colors">FAQs</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthScreen('login')}
              className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all shadow-sm"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthScreen('signup')}
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Register School</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Split-Screen Human Photography & Live UI Badges */}
      <section className="relative z-10 pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Human Story, Mission, & High-Conversion CTAs */}
            <div className="lg:col-span-7 text-left space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Ghana's Dedicated School Operating System • Basic & JHS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Where Ghanaian Pupils Thrive & Schools Run with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                  Zero Headaches
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                Built specifically for Ghanaian educational reality: from <strong>Kindergarten (KG 1–2)</strong> and <strong>Primary (Basic 1–6)</strong> to <strong>Junior High (JHS 1–3)</strong>.
                Automate NaCCA continuous assessment (50/50 SBA), generate beautiful terminal reports with class rankings, and collect school fees via MTN MoMo & Telecel Cash.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Register Your School Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleLaunchRoleDemo('school_admin')}
                  className="px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 rounded-xl shadow-md hover:border-slate-600 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                  <span>Interactive Live Demo</span>
                </button>
              </div>

              {/* Social Proof & Guarantees */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 font-medium">NaCCA & GES Aligned</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200 font-medium">MTN & Telecel MoMo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-200 font-medium">Works Offline & Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-200 font-medium">Act 843 Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Human Photo of Ghanaian Pupils with Floating Live UI Badges */}
            <div className="lg:col-span-5 relative">
              {/* Decorative Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

              {/* Main Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                <img
                  src="/assets/ghana_students_running.png"
                  alt="Joyful Ghanaian pupils running through school gate under Welcome Back sign"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge 1: Top Right - Live Attendance */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Today's Roll Call</p>
                    <p className="text-xs font-bold text-white">98.4% Present • 540 Pupils</p>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Left - MTN MoMo Payment */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 p-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">MoMo Received</span>
                      <span className="text-[10px] text-slate-400">• Just Now</span>
                    </div>
                    <p className="text-xs font-bold text-white truncate">GH₵ 650.00 • Kwame Mensah (Basic 4A)</p>
                    <p className="text-[10px] text-slate-400 font-medium truncate">MTN Mobile Money • Official Stamped Receipt #2024-089</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Real Classroom Impact Storytelling Section */}
      <section id="classrooms" className="relative z-10 py-16 sm:py-24 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Authentic School Life
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Designed for Real Teachers, Real Desks & Real Children
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              No complicated corporate jargon. SchoolOS brings dignity, calm, and precision to everyday school routines.
            </p>
          </div>

          {/* Story Card 1: In the Classroom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
                <img
                  src="/assets/ghana_classroom_pupils.png"
                  alt="Ghanaian school pupils learning at wooden desks in uniform with books"
                  className="w-full h-80 sm:h-96 object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 text-left">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Ghanaian Classroom</span>
                  <span className="text-xs font-bold text-white">Basic 3 Stream • NaCCA OWOP & Mathematics</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Continuous Assessment Done in Minutes, Not Midnight Oil
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ghanaian teachers often spend 2 to 3 weeks every term calculating continuous assessment (SBA),
                position rankings, and writing handwritten remarks for 40+ pupils per class.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                With SchoolOS, enter Class Assessment Tasks (CAT 1–4) and exam marks. The system automatically computes
                the 50/50 SBA weights, ranks pupils, flags struggling learners, and pre-fills constructive NaCCA remarks.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">NaCCA 50/50 SBA</span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">Stanine BECE Calculator</span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">Print Terminal Reports</span>
              </div>
            </div>
          </div>

          {/* Story Card 2: Headteacher Leadership */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 text-left space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Headteachers Gain Complete Executive Clarity Over Every Classroom
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                No more wondering if attendance was recorded, whether teachers showed up to class, or how much school fees remain outstanding in arrears.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                From your phone or laptop, view enrollment streams across Kindergarten, Primary, and JHS.
                Approve terminal report cards in one click with your official school crest and signature.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">Instant Class Stream Allocation</span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">Audit-Ready Financials</span>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">Daily Attendance Alerts</span>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl">
                <img
                  src="/assets/ghana_teacher_headmistress.jpg"
                  alt="Ghanaian school headmistress and teachers collaborating"
                  className="w-full h-80 sm:h-96 object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 text-left">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">School Governance</span>
                  <span className="text-xs font-bold text-white">Staff Roster & Terminal Report Card Approvals</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Specialized Portals Interactive Showcase */}
      <section id="portals" className="relative z-10 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Role-Based Multi-Portal Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              A Tailored Experience for Everyone in the School Community
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Click any portal below to explore its real-world cockpit and test drive it with 1 click.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-3xl bg-slate-900/70 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
            {/* Tab Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/60">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'admin'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Headteacher Cockpit</span>
                </button>

                <button
                  onClick={() => setActiveTab('teacher')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'teacher'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Class Teacher Desk</span>
                </button>

                <button
                  onClick={() => setActiveTab('bursar')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'bursar'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Bursar & MoMo Desk</span>
                </button>

                <button
                  onClick={() => setActiveTab('parent')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'parent'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Parent Portal</span>
                </button>
              </div>

              {/* Direct Test-Drive Button */}
              <button
                onClick={() => {
                  const roleMap = {
                    admin: 'school_admin' as const,
                    teacher: 'teacher' as const,
                    bursar: 'accountant' as const,
                    parent: 'parent' as const,
                  };
                  handleLaunchRoleDemo(roleMap[activeTab]);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>Live Test Drive →</span>
              </button>
            </div>

            {/* Tab Content Preview Card */}
            <div className="mt-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800">
              {activeTab === 'admin' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                        Executive Overview
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Comprehensive School Governance & Class Streaming
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Streamlined pupil enrollments, teacher class assignments, attendance trends, and instant alerts.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-full text-xs font-semibold self-start sm:self-auto">
                      Institution: {currentSchool.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Pupils Enrolled</span>
                      <p className="text-2xl font-black text-white mt-1">540</p>
                      <span className="text-[10px] text-emerald-400 font-medium">KG 1 to JHS 3</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Active Streams</span>
                      <p className="text-2xl font-black text-cyan-400 mt-1">11 Streams</p>
                      <span className="text-[10px] text-slate-400">Classrooms assigned</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Tuition Recovery</span>
                      <p className="text-2xl font-black text-emerald-400 mt-1">92.4%</p>
                      <span className="text-[10px] text-emerald-400 font-medium">Via MoMo & Bank</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Today's Attendance</span>
                      <p className="text-2xl font-black text-purple-400 mt-1">96.8%</p>
                      <span className="text-[10px] text-purple-300 font-medium">Daily roll call active</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Automatic class placement ensures newly enrolled pupils immediately appear on class rosters and marks sheets.
                    </span>
                    <button
                      onClick={() => handleLaunchRoleDemo('school_admin')}
                      className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline"
                    >
                      Open Admin Portal →
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'teacher' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                        Academic Workbench
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        NaCCA 50/50 SBA Continuous Assessment & AI Scanner
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Form masters input Class Assessment Tasks (CAT 1-4) and terminal exams. Automatically computes totals and Stanine grades.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 rounded-full text-xs font-semibold self-start sm:self-auto">
                      Form Master: JHS 2A
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                        <ScanLine className="w-4 h-4" />
                        <span>AI Test Paper Scanner</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Snap test sheets or bubble sheets with any phone camera. SchoolOS AI extracts marks and maps them to student IDs automatically.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                        <FileSpreadsheet className="w-4 h-4" />
                        <span>Terminal Report Generator</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Instantly compiles student terminal reports with class rank, grade distributions, attendance percentage, and teacher conduct remarks.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                        <CalendarCheck className="w-4 h-4" />
                        <span>1-Click Roll Call</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Fast morning and afternoon attendance taking. Absentee alerts send to parents automatically via SMS/WhatsApp.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      Save over 40 hours of manual grading and mark computation every academic term.
                    </span>
                    <button
                      onClick={() => handleLaunchRoleDemo('teacher')}
                      className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline"
                    >
                      Open Teacher Portal →
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'bursar' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        Bursary & Finance Cockpit
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Direct Mobile Money (MoMo) Collection & Stamped Receipts
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Track tuition fees, feeding fees, PTA dues, and transport payments with zero cash leakage.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-semibold self-start sm:self-auto">
                      Chief Accountant Desk
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Term Fees Billed</span>
                      <p className="text-2xl font-black text-white">GH₵ 245,600</p>
                      <span className="text-[10px] text-slate-400">All registered classes</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">MoMo / Bank Cleared</span>
                      <p className="text-2xl font-black text-emerald-400">GH₵ 226,934</p>
                      <span className="text-[10px] text-emerald-400 font-medium">92.4% Recovery Rate</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Arrears Defaulters List</span>
                      <p className="text-2xl font-black text-rose-400">38 Pupils</p>
                      <span className="text-[10px] text-rose-300 font-medium">Auto SMS Reminders Active</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-emerald-400" />
                      Instant printable official receipts generated with QR verification code and Ghana Revenue reference.
                    </span>
                    <button
                      onClick={() => handleLaunchRoleDemo('accountant')}
                      className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
                    >
                      Open Bursar Cockpit →
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'parent' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                        Guardian Empowerment
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Real-Time Ward Academic Monitoring & 1-Click Fee Payment
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Parents track attendance, terminal report cards, teacher comments, and pay fees via phone in seconds.
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-full text-xs font-semibold self-start sm:self-auto">
                      Parent Portal: Mrs. Abena Osei
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" /> Terminal Report Card
                      </span>
                      <p className="text-xs text-slate-400">
                        View and download terminal report cards PDF instantly. Position: 4th / 42. Aggregate 09.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4" /> 1-Click MoMo Pay
                      </span>
                      <p className="text-xs text-slate-400">
                        Pay tuition balance directly via MTN MoMo, Telecel Cash, or Card. Instant SMS receipt.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Megaphone className="w-4 h-4" /> School Circulars
                      </span>
                      <p className="text-xs text-slate-400">
                        Direct PTA notices, midterm break dates, and event reminders on your mobile device.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-purple-400" />
                      Strengthen parent-school partnerships and keep guardians actively invested in pupil growth.
                    </span>
                    <button
                      onClick={() => handleLaunchRoleDemo('parent')}
                      className="text-purple-400 hover:text-purple-300 font-bold hover:underline"
                    >
                      Open Parent Portal →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real Testimonials from Ghanaian Educators & Parents */}
      <section id="testimonials" className="relative z-10 py-16 sm:py-24 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Real Stories from Ghanaian Schools
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Loved by Headteachers, Treasurers & Parents
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Hear directly from school leaders across Greater Accra, Ashanti, and Western Regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  “Our teachers used to take two full weeks of sleepless nights preparing end-of-term reports. With SchoolOS, every mark, position rank, and conduct remark was calculated in one afternoon. Parents were stunned by how clean the reports looked.”
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80"
                  alt="Mrs. Comfort Addo"
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Mrs. Comfort Addo</h4>
                  <p className="text-[11px] text-cyan-300 font-medium">Headmistress, Achimota Basic & Preparatory</p>
                  <p className="text-[10px] text-slate-500">Greater Accra, Ghana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  “The Mobile Money integration completely eradicated cash shortages in our bursary. Parents receive automated SMS prompts and pay from their living rooms. Our tuition collection jumped from 68% to 94% in our very first term.”
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80"
                  alt="Mr. Samuel Boakye"
                  className="w-10 h-10 rounded-full object-cover border border-emerald-400/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Mr. Samuel Boakye</h4>
                  <p className="text-[11px] text-emerald-300 font-medium">Chief Accountant / Bursar, Kumasi Premier Academy</p>
                  <p className="text-[10px] text-slate-500">Ashanti Region, Ghana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  “As a working mother, I cannot visit the school daily. SchoolOS lets me check whether my daughter arrived safely each morning and see her JHS mock examination aggregate immediately. It gives me peace of mind.”
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80"
                  alt="Mrs. Abena Osei"
                  className="w-10 h-10 rounded-full object-cover border border-purple-400/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-white">Mrs. Abena Osei</h4>
                  <p className="text-[11px] text-purple-300 font-medium">Parent & Guardian (JHS 2 Pupil)</p>
                  <p className="text-[10px] text-slate-500">Takoradi, Western Region</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ghanaian Curriculum (NaCCA / GES) Feature Matrix */}
      <section id="curriculum" className="relative z-10 py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              National Education Framework
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Purpose-Built for Ghanaian Basic & JHS Schools
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Unlike generic overseas software, SchoolOS is calibrated to the official Ministry of Education,
              GES, and NaCCA curriculum guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Kindergarten */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/20 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-4">
                KG
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Kindergarten (KG 1 & 2)</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Early childhood development focusing on literacy, numeracy, psychosocial development, and creative play.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Language & Literacy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Numeracy & Cognitive Reasoning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Our World and Our People (OWOP)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400" />
                  <span>Creative Arts & Psycho-Motor Skills</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Primary */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/20 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
                B1-6
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Primary (Basic 1 – 6)</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Comprehensive foundational curriculum with standardized terminal evaluations and continuous assessment.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                  <span>English Language & Reading</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Mathematics & Natural Science</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ghanaian Language & Culture</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Computing & History of Ghana</span>
                </li>
              </ul>
            </div>

            {/* Card 3: JHS */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/20 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-4">
                JHS
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Junior High (JHS 1 – 3)</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Rigorous preparation for BECE candidates with 50/50 SBA computation, mock test diagnostics, and Stanine rankings.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>English, Integrated Science & Math</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Social Studies & RME</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Career Technology & Creative Arts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BECE Mock Analytics & Aggregate Calculator</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Operational Superpowers */}
      <section id="features" className="relative z-10 py-20 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Why Schools Choose SchoolOS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Everything Your School Needs to Run Like Clockwork
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Intelligent Class Placement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Add students and assign their classes seamlessly. Streams, subjects, and teacher rosters auto-generate with zero redundant setup.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Mobile Money Integration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct settlement for MTN MoMo, Telecel Cash, and AT Money. Parents get instant SMS receipts and bursary reconciles automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Terminal Reports in 1 Click</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Print hundreds of professional report cards featuring custom school crests, position ranks, attendance metrics, and headteacher signatures.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                <ScanLine className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">AI Test Paper Scanner</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Transform phone cameras into optical paper graders. Scan student test papers and automatically record scores into the markbook.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Offline-Ready Resilience</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keep working without uninterrupted internet. Roll calls, attendance, marks, and fees are cached locally and sync when back online.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white mb-1.5">Isolated Role Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Strict multi-tenant role guardrails. Class teachers cannot view financial bursaries, and parents only ever see their own wards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Plans */}
      <section id="pricing" className="relative z-10 py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Affordable Institutional Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 tracking-tight">
              Predictable, Transparent Plans for Every School
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Built to be accessible for every Ghanaian private and mission school. No hidden setup costs.
            </p>

            {/* Billing Toggle */}
            <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setBillingCycle('term')}
                className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                  billingCycle === 'term' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                Per Academic Term
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                  billingCycle === 'annual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                Annual (Save 15%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Community Starter</span>
                <h3 className="text-2xl font-bold text-white mt-1">Kindergarten & Primary</h3>
                <p className="text-xs text-slate-400 mt-2">Ideal for growing basic schools establishing digital records.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    {billingCycle === 'term' ? 'GH₵ 450' : 'GH₵ 1,150'}
                  </span>
                  <span className="text-xs text-slate-400">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Up to 250 enrolled pupils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>KG 1 to Basic 6 Streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Continuous Assessment & Reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Cash & Bank Receipting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2: Most Popular */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-950/80 to-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-600/20 relative flex flex-col justify-between">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                Most Popular for JHS
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Professional Suite</span>
                <h3 className="text-2xl font-bold text-white mt-1">Complete Basic & JHS</h3>
                <p className="text-xs text-slate-300 mt-2">Comprehensive platform for standard Ghanaian basic schools and JHS academies.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">
                    {billingCycle === 'term' ? 'GH₵ 850' : 'GH₵ 2,150'}
                  </span>
                  <span className="text-xs text-slate-400">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Up to 750 enrolled pupils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Full KG, Basic 1–6 & JHS 1–3</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Direct MoMo Automated Collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>BECE Stanine Aggregate Calculator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                    <span>Dedicated Parent Portal Access</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
              >
                Register Your School
              </button>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enterprise</span>
                <h3 className="text-2xl font-bold text-white mt-1">Multi-Campus & Mission</h3>
                <p className="text-xs text-slate-400 mt-2">For large educational trusts, mission education units, and multi-branch networks.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">Custom</span>
                  <span className="text-xs text-slate-400">/ tailored volume</span>
                </div>

                <ul className="mt-6 space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Unlimited students & streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Custom domain & branded SMS sender ID</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>Dedicated staff onboarding & training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>24/7 Priority WhatsApp & phone hotline</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faqs" className="relative z-10 py-20 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between text-sm font-bold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Impact Final Call to Action with School Photo Background */}
      <section className="relative z-10 py-20 bg-gradient-to-t from-slate-900 via-indigo-950/40 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-indigo-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Ghanaian School Operations?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Join over 180 forward-thinking basic schools across Ghana. Get set up in under 3 minutes with zero paperwork.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Register Your School Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleLaunchRoleDemo('school_admin')}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
              >
                Test Drive Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="relative z-10 bg-slate-950 border-t border-slate-800/80 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Column 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  SOS
                </div>
                <span className="font-extrabold text-white text-sm">SchoolOS Ghana</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The standard operating system for Ghanaian Kindergarten, Primary, and Junior High Schools. Compliant with GES, NaCCA, and the Data Protection Act (Act 843).
              </p>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All systems operational across Ghana</span>
              </div>
            </div>

            {/* Column 2: Portals */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Institutional Portals</h5>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => handleLaunchRoleDemo('school_admin')} className="hover:text-white transition-colors">Headteacher & Board Portal</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('teacher')} className="hover:text-white transition-colors">Form Master & Teacher Desk</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('accountant')} className="hover:text-white transition-colors">Bursary & Financial Cockpit</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('parent')} className="hover:text-white transition-colors">Parent & Ward Portal</button></li>
              </ul>
            </div>

            {/* Column 3: Framework */}
            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">NaCCA & GES Standards</h5>
              <ul className="space-y-2 text-slate-400">
                <li><span>Kindergarten (KG 1–2)</span></li>
                <li><span>Primary (Basic 1–6)</span></li>
                <li><span>Junior High School (JHS 1–3)</span></li>
                <li><span>BECE Continuous Assessment 50/50</span></li>
                <li><span>Stanine 1–9 Grading Scale</span></li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">National Support</h5>
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Airport City & Ridge, Accra, Ghana</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>+233 (0) 24 000 0000 / 020 000 0000</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>support@schoolos.edu.gh</span>
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} SchoolOS Ghana. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => setAuthScreen('login')} className="hover:text-slate-200">Staff Sign In</button>
              <button onClick={() => setAuthScreen('signup')} className="hover:text-slate-200">School Registration</button>
              <span>Ghana Education Service Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

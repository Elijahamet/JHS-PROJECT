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
  Sparkles,
  ArrowUp,
  Sliders,
  Clock,
  Calculator,
  TrendingUp,
  Award,
  Search,
  ExternalLink,
  Laptop,
  Flame,
  BadgeCheck,
  QrCode,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPageView: React.FC = () => {
  const { setAuthScreen, setUserRole } = useApp();

  // State for interactive widgets
  const [heroPreviewTab, setHeroPreviewTab] = useState<'admin' | 'markbook' | 'parent' | 'scanner'>('admin');
  const [activePortalTab, setActivePortalTab] = useState<'admin' | 'teacher' | 'bursar' | 'parent'>('admin');
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<'kg' | 'primary' | 'jhs'>('jhs');
  const [billingCycle, setBillingCycle] = useState<'term' | 'annual'>('term');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pupilCount, setPupilCount] = useState<number>(450);
  const [faqSearch, setFaqSearch] = useState<string>('');

  // Launch live interactive demo into specific persona
  const handleLaunchRoleDemo = (role: 'school_admin' | 'teacher' | 'accountant' | 'parent') => {
    setUserRole(role);
    setAuthScreen('authenticated');
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ROI calculations based on pupil count
  const hoursSaved = Math.round(pupilCount * 0.45);
  const feeRecoveryGain = Math.min(96, Math.round(68 + (pupilCount / 20)));
  const paperSavingsGh = Math.round(pupilCount * 7.5);

  const faqs = [
    {
      q: 'Is SchoolOS strictly aligned with Ghana Education Service (GES) & NaCCA standards?',
      a: 'Yes, 100%. SchoolOS was built from the ground up to support the official NaCCA curriculum for Kindergarten (KG 1–2), Primary (Basic 1–6), and Junior High School (JHS 1–3). It handles continuous assessment (50/50 SBA), terminal examinations, Stanine 1–9 BECE rankings, and official printable report cards complete with position rankings and teacher remarks.',
    },
    {
      q: 'How does Mobile Money (MoMo) fee collection work for parents and bursars?',
      a: 'Parents can pay school tuition, feeding fees, PTA dues, and bus fees directly from their phones using MTN Mobile Money, Telecel Cash, or AT Money. Transactions settle directly into the school’s account, an instant tamper-proof digital receipt is generated, and the bursary ledger updates automatically with zero cash leakage.',
    },
    {
      q: 'Can teachers use SchoolOS offline if campus internet is unavailable or slow?',
      a: 'Yes. SchoolOS features offline-first local synchronization. Teachers can record daily attendance, mark continuous assessments, and review student rosters without an active internet connection. All changes automatically sync safely as soon as connectivity resumes.',
    },
    {
      q: 'Can we print physical terminal report cards and official receipts with our school crest?',
      a: 'Absolutely. SchoolOS produces crisp, high-resolution printable report cards featuring your official school crest, headteacher signature, position ranks, and conduct remarks. Official bursary receipts feature institutional stamps, unique reference numbers, and QR verification codes.',
    },
    {
      q: 'How long does it take to migrate student records and get our teachers onboarded?',
      a: 'Most schools get fully set up in under 24 hours. You can upload existing student spreadsheets with one click or enter classes stream-by-stream. We also provide free, step-by-step phone, video, or in-person onboarding for your administration and teaching staff.',
    },
    {
      q: 'Is our student information protected under Ghana’s Data Protection Act?',
      a: 'Yes. SchoolOS complies strictly with Ghana Data Protection Act 843. All data is encrypted in transit (TLS 1.3) and at rest (AES-256), with daily automated off-site backups and role-based permissions preventing unauthorized student record access.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* =========================================================================
          TOP BANNER: GHANA GES & NaCCA ANNOUNCEMENT
          ========================================================================= */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-blue-900/40 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">🇬🇭 2026 Academic Edition:</span>
            <span className="text-slate-300">Aligned with NaCCA 50/50 SBA Continuous Assessment & Stanine 1–9 BECE grading.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchRoleDemo('school_admin')}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>Instant Interactive Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STICKY HEADER / NAVIGATION BAR
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/40">
              <span>S</span>
              <span className="text-cyan-300">OS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white tracking-tight">SchoolOS</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  Ghana Basic & JHS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Institutional Operating System</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <button onClick={() => scrollToSection('why-schoolos')} className="hover:text-blue-400 transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection('interactive-tour')} className="hover:text-blue-400 transition-colors">
              Platform Tour
            </button>
            <button onClick={() => scrollToSection('portals')} className="hover:text-blue-400 transition-colors">
              4 Portals
            </button>
            <button onClick={() => scrollToSection('curriculum')} className="hover:text-blue-400 transition-colors">
              NaCCA Standards
            </button>
            <button onClick={() => scrollToSection('roi-calculator')} className="hover:text-blue-400 transition-colors">
              ROI Calculator
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-blue-400 transition-colors">
              Testimonials
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-blue-400 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faqs')} className="hover:text-blue-400 transition-colors">
              FAQs
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthScreen('login')}
              className="px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthScreen('signup')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center gap-1.5"
            >
              <span>Register School</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION: HIGH IMPACT VALUE PROPOSITION & INTERACTIVE PREVIEW
          ========================================================================= */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-slate-dark">
        {/* Ambient Gradient Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/25 via-indigo-600/20 to-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-blue-700/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Hero Copy */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Next-Generation Ghanaian School Administration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-300 font-normal">KG 1 to JHS 3</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.12]">
              The calmer, smarter way to run your{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                basic & junior high school.
              </span>
            </h1>

            {/* Subcopy */}
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
              Eliminate stressful report card calculation nights and chaotic cash handling.
              Manage student records, continuous assessment (50/50 SBA), instant Mobile Money fee collection,
              and official terminal reports in one unified system.
            </p>

            {/* Hero CTA Action Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:opacity-95 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 group ring-1 ring-blue-400/40"
              >
                <span>Register Your School Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="relative group w-full sm:w-auto">
                <button
                  onClick={() => handleLaunchRoleDemo('school_admin')}
                  className="w-full sm:w-auto px-7 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 backdrop-blur-md"
                >
                  <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                  <span>Launch Live Interactive Demo</span>
                </button>
              </div>
            </div>

            {/* Trust Bullet Guarantee */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Paperwork Setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Works Completely Offline</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>MTN MoMo & Telecel Cash</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Act 843 Data Compliant</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              HERO INTERACTIVE PRODUCT COCKPIT PREVIEW
              ========================================================================= */}
          <div id="interactive-tour" className="mt-14 max-w-5xl mx-auto">
            {/* Window Outer Shell */}
            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-blue-900/30 overflow-hidden ring-1 ring-white/10 backdrop-blur-2xl">
              
              {/* Window Title Bar & Tabs */}
              <div className="bg-slate-950/90 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
                {/* Mac-style Window Controls */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                  <span className="ml-2 text-xs font-bold text-slate-400 hidden sm:inline">
                    SchoolOS Live Cockpit • St. Augustine's Basic & JHS
                  </span>
                </div>

                {/* Interactive View Switcher Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <button
                    onClick={() => setHeroPreviewTab('admin')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      heroPreviewTab === 'admin'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Executive Cockpit</span>
                  </button>

                  <button
                    onClick={() => setHeroPreviewTab('markbook')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      heroPreviewTab === 'markbook'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>NaCCA 50/50 Markbook</span>
                  </button>

                  <button
                    onClick={() => setHeroPreviewTab('parent')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      heroPreviewTab === 'parent'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Parent MoMo App</span>
                  </button>

                  <button
                    onClick={() => setHeroPreviewTab('scanner')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      heroPreviewTab === 'scanner'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ScanLine className="w-3.5 h-3.5" />
                    <span>AI Test Scanner</span>
                  </button>
                </div>
              </div>

              {/* Window Content Pane */}
              <div className="p-5 sm:p-7 bg-slate-900/80 min-h-[420px] flex flex-col justify-between">
                
                {/* TAB 1: EXECUTIVE COCKPIT */}
                {heroPreviewTab === 'admin' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* Top Stat Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                        <p className="text-xs font-semibold text-slate-400">Total Enrolled</p>
                        <p className="text-2xl sm:text-3xl font-black text-white mt-1">540 Pupils</p>
                        <p className="text-[11px] text-emerald-400 font-semibold mt-1">11 Active Streams</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                        <p className="text-xs font-semibold text-slate-400">Term Fee Recovery</p>
                        <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">GH₵ 226,934</p>
                        <p className="text-[11px] text-emerald-400 font-semibold mt-1">94.2% Collected via MoMo</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                        <p className="text-xs font-semibold text-slate-400">Today's Roll Call</p>
                        <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">98.4% Present</p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-1">521 Present • 19 Absent</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-inner">
                        <p className="text-xs font-semibold text-slate-400">Terminal Reports</p>
                        <p className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">Ready (1-Click)</p>
                        <p className="text-[11px] text-purple-300 font-semibold mt-1">GES Stanine Stanine 1–9</p>
                      </div>
                    </div>

                    {/* Live Activity & Stream Health Table */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-blue-400" />
                            Live MoMo & Bank Payment Stream
                          </span>
                          <span className="text-[11px] text-emerald-400 font-semibold">● Live Sync</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                                MTN
                              </div>
                              <div>
                                <p className="font-bold text-white">GH₵ 750.00 — Tuition Term 1</p>
                                <p className="text-[11px] text-slate-400">Kwame Mensah • Basic 5 Blue</p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Instant Receipt #RC-8041
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-xs">
                                TCASH
                              </div>
                              <div>
                                <p className="font-bold text-white">GH₵ 120.00 — Weekly Feeding</p>
                                <p className="text-[11px] text-slate-400">Esi Ansah • Kindergarten 2</p>
                              </div>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Instant Receipt #RC-8040
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <BadgeCheck className="w-4 h-4 text-emerald-400" />
                            Academic Term Status
                          </span>
                          <span className="text-[11px] text-blue-400 font-semibold">Term 1 of 3</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center text-slate-300">
                            <span>SBA Continuous Assessment (CAT 1–4)</span>
                            <span className="text-emerald-400 font-bold">100% Complete</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-full rounded-full"></div>
                          </div>

                          <div className="flex justify-between items-center text-slate-300 pt-2">
                            <span>Terminal Exam Entry</span>
                            <span className="text-cyan-400 font-bold">96% Completed</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-cyan-500 h-full w-[96%] rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: NaCCA 50/50 MARKBOOK */}
                {heroPreviewTab === 'markbook' && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">Class: JHS 3 Gold</span>
                        <span className="text-slate-400">• Subject: Integrated Science & Math</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40">
                        Official NaCCA 50% SBA + 50% Exam Scheme
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-800">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                          <tr>
                            <th className="p-3">Pupil Name</th>
                            <th className="p-3">CAT 1–4 (50%)</th>
                            <th className="p-3">Terminal Exam (50%)</th>
                            <th className="p-3">Final Score</th>
                            <th className="p-3">Stanine Grade</th>
                            <th className="p-3">Position</th>
                            <th className="p-3">Conduct Remark</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-900/60 font-medium">
                          <tr className="hover:bg-slate-800/40">
                            <td className="p-3 text-white font-bold flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center text-[10px]">
                                KO
                              </span>
                              Kofi Owusu-Ansah
                            </td>
                            <td className="p-3 text-emerald-400 font-bold">47.5 / 50</td>
                            <td className="p-3 text-emerald-400 font-bold">48.0 / 50</td>
                            <td className="p-3 text-white font-black">95.5%</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                                Grade 1 (Excellent)
                              </span>
                            </td>
                            <td className="p-3 font-extrabold text-amber-300">1st of 42</td>
                            <td className="p-3 text-slate-400 text-[11px]">Outstanding critical thinker</td>
                          </tr>

                          <tr className="hover:bg-slate-800/40">
                            <td className="p-3 text-white font-bold flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px]">
                                AM
                              </span>
                              Akua Mensah
                            </td>
                            <td className="p-3 text-emerald-400 font-bold">45.0 / 50</td>
                            <td className="p-3 text-emerald-400 font-bold">44.5 / 50</td>
                            <td className="p-3 text-white font-black">89.5%</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                                Grade 1 (Very Good)
                              </span>
                            </td>
                            <td className="p-3 font-bold text-slate-200">2nd of 42</td>
                            <td className="p-3 text-slate-400 text-[11px]">Consistent and hardworking</td>
                          </tr>

                          <tr className="hover:bg-slate-800/40">
                            <td className="p-3 text-white font-bold flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 flex items-center justify-center text-[10px]">
                                YA
                              </span>
                              Yaw Appiah
                            </td>
                            <td className="p-3 text-emerald-400 font-bold">42.0 / 50</td>
                            <td className="p-3 text-emerald-400 font-bold">41.0 / 50</td>
                            <td className="p-3 text-white font-black">83.0%</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                                Grade 2 (Good)
                              </span>
                            </td>
                            <td className="p-3 font-bold text-slate-200">3rd of 42</td>
                            <td className="p-3 text-slate-400 text-[11px]">Active class participation</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: PARENT MOMO APP PREVIEW */}
                {heroPreviewTab === 'parent' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                    <div className="md:col-span-5 flex justify-center">
                      <div className="w-64 rounded-3xl p-4 bg-slate-950 border-4 border-slate-800 shadow-2xl space-y-3">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                          <span>SchoolOS Parent</span>
                          <span className="text-emerald-400 font-bold">● Active</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                          <p className="text-[10px] text-slate-400 uppercase">Child Profile</p>
                          <p className="font-bold text-white text-sm">Priscilla Boateng</p>
                          <p className="text-[11px] text-blue-400">Class: Basic 4 Diamond</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                            ✓ Present (Arrived 7:38 AM)
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <p className="text-[10px] text-slate-400 uppercase">Outstanding Balance</p>
                          <p className="text-xl font-black text-rose-400">GH₵ 240.00</p>
                          <button
                            onClick={() => handleLaunchRoleDemo('parent')}
                            className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>1-Tap MoMo Pay</span>
                          </button>
                        </div>
                        <button
                          onClick={() => handleLaunchRoleDemo('parent')}
                          className="w-full py-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-500/40"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Report Card</span>
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-7 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 text-xs font-bold">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>Zero App Store Downloads Needed</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Parents check daily roll call & clear fees right from their phone.
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        No more unannounced visits or forgotten paper payment slips. Parents receive instant SMS alerts,
                        download terminal reports with official school stamps, and pay fees via MTN MoMo or Telecel Cash.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Instant Digital Receipts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Daily Absentee SMS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Terminal Exam Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Bus Pick-up Tracking</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: AI TEST SCANNER */}
                {heroPreviewTab === 'scanner' && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fade-in">
                    <div className="md:col-span-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                      <div className="relative rounded-xl overflow-hidden border border-slate-700">
                        <img
                          src="/assets/math_test_shoot.jpg"
                          alt="AI Test Paper Scanner in action"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[1px] flex items-center justify-center">
                          <div className="px-3 py-1.5 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/50 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                            <ScanLine className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                            <span>AI Optical Grading Active: 20/20 Questions Scanned</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Student: Emmanuel Tetteh (JHS 2)</span>
                        <span className="text-emerald-400 font-bold">Score: 18 / 20 (90%)</span>
                      </div>
                    </div>

                    <div className="md:col-span-6 space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 text-xs font-bold">
                        <ScanLine className="w-3.5 h-3.5" />
                        <span>Optical Mark Scanner</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Grade paper class tests in 5 seconds with your phone camera.
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Teachers simply snap a photo of pupils' test answer sheets. The built-in AI optical engine detects marks,
                        computes scores, and logs them straight into the continuous assessment (CAT) markbook automatically.
                      </p>
                      <button
                        onClick={() => handleLaunchRoleDemo('teacher')}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow"
                      >
                        <span>Test Drive Scanner in Teacher Desk</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Bar inside Mockup Window */}
                <div className="pt-5 mt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Real-Time Ghanaian Basic School Simulation • Try any role below</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLaunchRoleDemo('school_admin')}
                      className="px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white font-bold transition-all text-xs border border-blue-500/40 flex items-center gap-1"
                    >
                      <span>Explore Live Admin</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Institutional Trust Banner */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 text-center">
            <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
              Trusted by 180+ Leading Ghanaian Basic & Junior High Schools Across All 16 Regions
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 text-slate-300 text-xs font-semibold">
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                <span>GES Curriculum Standard</span>
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                <span>NaCCA 50/50 SBA Verified</span>
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-amber-400" />
                <span>MTN MoMo & Telecel Cash</span>
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-blue-400" />
                <span>Data Protection Act 843</span>
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-purple-400" />
                <span>BECE Stanine 1–9 Engine</span>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY SCHOOLOS? (CORE BENTO GRID SUPERPOWERS)
          ========================================================================= */}
      <section id="why-schoolos" className="py-20 md:py-28 bg-slate-900 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-700/50">
              Built for Ghanaian Realities
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Everything your school needs, with zero fluff.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Generic foreign software doesn't know what a 50/50 SBA is, doesn't compute Stanine aggregates, and can't process Mobile Money. SchoolOS was engineered specifically for Ghana.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Bento Card 1: 50/50 SBA Engine (Large Span) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  NaCCA 50/50 SBA Continuous Assessment & Stanine BECE Engine
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                  Ghanaian teachers used to spend up to 3 weeks manually adding Class Assessment Tasks (CAT 1–4) and exam scores, calculating 50% continuous weights, ordering class position ranks, and handwriting remarks for 45+ pupils per stream.
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  SchoolOS does this in seconds: simply enter marks or photograph tests, and terminal reports are computed with Stanine 1–9 grades ready for printing.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="text-slate-400">Weighting</p>
                  <p className="text-white font-bold mt-0.5">50% SBA / 50% Exam</p>
                </div>
                <div>
                  <p className="text-slate-400">Position Ranks</p>
                  <p className="text-emerald-400 font-bold mt-0.5">Auto 1st to 50th</p>
                </div>
                <div>
                  <p className="text-slate-400">BECE Standard</p>
                  <p className="text-cyan-400 font-bold mt-0.5">Stanine Grades 1–9</p>
                </div>
                <div>
                  <p className="text-slate-400">Report Status</p>
                  <p className="text-purple-400 font-bold mt-0.5">Batch Print & PDF</p>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Mobile Money Fee Collection */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Automated Mobile Money Fee Collection
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  End cash theft, unpaid balances, and lost paper receipt booklets. Collect tuition, feeding, and PTA fees via MTN MoMo, Telecel Cash, and AT Money.
                </p>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Average Fee Recovery</span>
                  <span className="text-emerald-400 font-black text-sm">94.8%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[94.8%] rounded-full"></div>
                </div>
                <p className="text-[11px] text-slate-400">Direct instant SMS receipts sent to parents' phones.</p>
              </div>
            </div>

            {/* Bento Card 3: Offline-First Operation */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-indigo-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Works 100% Offline On Campus
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Internet down? No problem. Teachers take morning roll call, grade quizzes, and view pupil biodata without any data connection. Data synchronizes smoothly once connected.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-indigo-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Zero Campus Downtime Guaranteed</span>
              </div>
            </div>

            {/* Bento Card 4: Official Printable Reports with Crest */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-purple-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
                  <Receipt className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Official Printable Crests & Receipts
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Generate professional terminal reports and official bursary receipts formatted with your school’s crest, headteacher signature, and verification QR code.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-purple-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Compliant with GES Guidelines</span>
              </div>
            </div>

            {/* Bento Card 5: Optical AI Test Scanner */}
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/50 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                  <ScanLine className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Camera-Based Paper Test Scanner
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Teachers photograph paper answer sheets to automatically score multiple-choice and structured questions, cutting test grading time by 85%.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-cyan-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero manual entry required</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: 4 DEDICATED PORTALS (INTERACTIVE WORKBENCHES)
          ========================================================================= */}
      <section id="portals" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-700/50">
              Role-Based Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tailored workbenches for everyone in your school.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Each stakeholder accesses only what matters to their role — preventing data leaks and simplifying daily workflows.
            </p>
          </div>

          {/* Interactive Role Switcher */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-8 space-y-8 shadow-2xl">
            {/* Top Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setActivePortalTab('admin')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activePortalTab === 'admin'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Headteacher Cockpit</span>
                </button>

                <button
                  onClick={() => setActivePortalTab('teacher')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activePortalTab === 'teacher'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Class Teacher Desk</span>
                </button>

                <button
                  onClick={() => setActivePortalTab('bursar')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activePortalTab === 'bursar'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Bursar & MoMo Desk</span>
                </button>

                <button
                  onClick={() => setActivePortalTab('parent')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activePortalTab === 'parent'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
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
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                <span>Launch This Role in Live Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Portal Tab Content */}
            {activePortalTab === 'admin' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-md bg-blue-900/40 text-blue-300 text-xs font-bold border border-blue-700/50">
                    Institutional Governance & Board Oversight
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Headteachers maintain real-time oversight of every class stream.
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Set up classes across Kindergarten, Primary, and JHS in minutes. Assign form masters, monitor daily teacher attendance, review terminal grade distributions, and approve end-of-term report cards with your digital signature.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Class stream setup (KG 1 to JHS 3)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>1-Click terminal report card batch approval</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Real-time financial collection oversight</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>School crest & branding customization</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
                    <img
                      src="/assets/ghana_headmistress_crisp.jpg"
                      alt="Ghanaian school headmistress reviewing school records"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'teacher' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-md bg-emerald-900/40 text-emerald-300 text-xs font-bold border border-emerald-700/50">
                    Form Master & Subject Teacher Workbench
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Cut end-of-term marking paperwork from weeks to minutes.
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Designed specifically for Ghanaian teachers: continuous assessment (CAT 1–4) auto-computes weights, Stanine grades, position rankings, and auto-suggested conduct remarks aligned with NaCCA guidelines.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Morning attendance roll call in under 30 seconds</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>50/50 continuous assessment markbook</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>AI phone scanner for rapid test grading</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Automated Stanine 1–9 BECE rankings</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
                    <img
                      src="/assets/ghana_classroom_crisp.jpg"
                      alt="Ghanaian school pupils and teachers in classroom"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'bursar' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-md bg-amber-900/40 text-amber-300 text-xs font-bold border border-amber-700/50">
                    Bursary & Financial Reconciliation Desk
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Complete cash-free fee reconciliation & audit safety.
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Track tuition, feeding programmes, PTA dues, and transport fees. Direct MTN MoMo, Telecel Cash, and Bank settlements automatically match payments to student IDs.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Instant tamper-proof digital receipts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Automated SMS fee reminders to defaulters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Daily feeding fee accounting & canteen balances</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Export audit-ready ledgers to Excel / PDF</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6">
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <p className="text-xs font-bold uppercase text-slate-400">Live Fee Reconciliation Demo</p>
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-white">Total Tuition Billed (Term 1)</p>
                          <p className="text-slate-400">540 registered pupils</p>
                        </div>
                        <span className="text-lg font-black text-white">GH₵ 245,600</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-emerald-400">Cleared via MoMo & Bank</p>
                          <p className="text-slate-400">92.4% collected</p>
                        </div>
                        <span className="text-lg font-black text-emerald-400">GH₵ 226,934</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                        <div>
                          <p className="font-bold text-rose-400">Outstanding Balance</p>
                          <p className="text-slate-400">38 pupils with SMS alerts</p>
                        </div>
                        <span className="text-lg font-black text-rose-400">GH₵ 18,666</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePortalTab === 'parent' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-6 space-y-4">
                  <span className="px-3 py-1 rounded-md bg-purple-900/40 text-purple-300 text-xs font-bold border border-purple-700/50">
                    Parent & Guardian Mobile Transparency
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Parents stay engaged and connected from home or work.
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Working parents can instantly verify their child's morning attendance, review assessment scores, download official terminal report cards, and pay school fees via Mobile Money in seconds.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Instant terminal report card PDF downloads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>1-Tap fee payment via MTN MoMo or Telecel Cash</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Morning arrival notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Direct headteacher announcements and circulars</span>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
                    <img
                      src="/assets/ghana_students_hero.jpg"
                      alt="Ghanaian school pupils in uniform"
                      className="w-full h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: GES & NaCCA 3-STAGE CURRICULUM STANDARDS
          ========================================================================= */}
      <section id="curriculum" className="py-20 md:py-28 bg-slate-900 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-700/50">
              National Curriculum Compliance
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Pre-loaded with official GES syllabus & subjects.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              No manual configuration required. Select your class level and SchoolOS automatically loads standard NaCCA subjects and assessment weights.
            </p>

            {/* Curriculum Switcher Tabs */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveCurriculumTab('kg')}
                className={`px-5 py-2 rounded-xl transition-all ${
                  activeCurriculumTab === 'kg' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kindergarten (KG 1–2)
              </button>
              <button
                onClick={() => setActiveCurriculumTab('primary')}
                className={`px-5 py-2 rounded-xl transition-all ${
                  activeCurriculumTab === 'primary' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Primary (Basic 1–6)
              </button>
              <button
                onClick={() => setActiveCurriculumTab('jhs')}
                className={`px-5 py-2 rounded-xl transition-all ${
                  activeCurriculumTab === 'jhs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Junior High (JHS 1–3)
              </button>
            </div>
          </div>

          {/* Curriculum Content */}
          <div className="max-w-5xl mx-auto">
            {activeCurriculumTab === 'kg' && (
              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Kindergarten (KG 1 to KG 2)</h3>
                    <p className="text-xs text-slate-400 mt-1">Focusing on psycho-motor skills, early literacy, numeracy, and psychosocial growth.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                    Formative Evaluation Framework
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="font-bold text-amber-300">Core Learning Strands</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>• Language and Literacy (Phonics & Storytelling)</li>
                      <li>• Numeracy & Basic Pattern Reasoning</li>
                      <li>• Our World and Our People (OWOP)</li>
                      <li>• Creative Arts & Motor Development</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="font-bold text-white">Assessment Scheme</p>
                    <p className="text-slate-400 leading-relaxed">
                      Observational milestone tracking, motor skill checkoffs, psychosocial conduct commentary, and developmental health recording.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeCurriculumTab === 'primary' && (
              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Primary (Basic 1 to Basic 6)</h3>
                    <p className="text-xs text-slate-400 mt-1">Standardized continuous assessment across core literacy, science, and numeracy.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/40">
                    NaCCA 50/50 Continuous Scheme
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="font-bold text-blue-300">Prescribed GES Subjects</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>• English Language & Reading Comprehension</li>
                      <li>• Mathematics & Quantitative Reasoning</li>
                      <li>• Natural Science & Environmental Studies</li>
                      <li>• Computing / ICT Literacy</li>
                      <li>• Ghanaian Language and Culture (Twi, Ga, Fante, Ewe)</li>
                      <li>• Religious & Moral Education (RME)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="font-bold text-white">50/50 SBA Weights</p>
                    <p className="text-slate-400 leading-relaxed">
                      Four Class Assessment Tasks (CAT 1–4) weighted at 50% combined with a 50% end-of-term terminal exam. Automatic position rankings and printable reports.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeCurriculumTab === 'jhs' && (
              <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl space-y-6 animate-fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Junior High School (JHS 1 to JHS 3)</h3>
                    <p className="text-xs text-slate-400 mt-1">BECE Candidate preparation with Stanine 1–9 grading and continuous assessment portfolios.</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/40">
                    BECE Stanine Aggregate Engine
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="font-bold text-indigo-300">Standard BECE Subject Suite</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>• English Language & Literature</li>
                      <li>• Integrated Science</li>
                      <li>• Mathematics</li>
                      <li>• Social Studies & Citizenship</li>
                      <li>• Career Technology & Pre-Technical Skills</li>
                      <li>• Creative Arts and Design</li>
                      <li>• Computing & ICT</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <p className="font-bold text-white">Stanine 1–9 BECE Predictor</p>
                    <p className="text-slate-400 leading-relaxed">
                      Automatically converts terminal exam scores into official Stanine grades (Grade 1 Excellent to Grade 9 Fail), calculates aggregates for the best 6 subjects, and prints audit-ready mock report cards.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INTERACTIVE PROPRIETOR ROI & TIME-SAVED CALCULATOR
          ========================================================================= */}
      <section id="roi-calculator" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-700/50">
              Interactive ROI Calculator
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              See how much time & money SchoolOS saves your school.
            </h2>
            <p className="text-slate-300 text-base">
              Drag the slider to your school's total student population to calculate termly administrative savings.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-8">
            {/* Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-300">Total Enrolled Pupils:</span>
                <span className="text-2xl font-black text-cyan-400 bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800">
                  {pupilCount} Pupils
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1200"
                step="25"
                value={pupilCount}
                onChange={(e) => setPupilCount(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>50 (Small Basic School)</span>
                <span>450 (Average JHS & Basic)</span>
                <span>1,200+ (Large Academy)</span>
              </div>
            </div>

            {/* Calculated Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <p className="text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Teacher Hours Saved</span>
                </p>
                <p className="text-3xl sm:text-4xl font-black text-blue-400">~{hoursSaved} hrs</p>
                <p className="text-[11px] text-slate-400">Eliminating manual report card math</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <p className="text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Expected Fee Recovery</span>
                </p>
                <p className="text-3xl sm:text-4xl font-black text-emerald-400">{feeRecoveryGain}%</p>
                <p className="text-[11px] text-slate-400">Via automated MoMo SMS reminders</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-center space-y-1">
                <p className="text-xs text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                  <Receipt className="w-4 h-4 text-amber-400" />
                  <span>Paper & Ledger Savings</span>
                </p>
                <p className="text-3xl sm:text-4xl font-black text-amber-400">GH₵ {paperSavingsGh.toLocaleString()}</p>
                <p className="text-[11px] text-slate-400">Saved on physical booklets & printing</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setAuthScreen('signup')}
                className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                Start Free 14-Day Trial For Your School
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: AUTHENTIC TESTIMONIALS & SOCIAL PROOF
          ========================================================================= */}
      <section id="testimonials" className="py-20 md:py-28 bg-slate-900 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="px-3 py-1 rounded-full bg-amber-900/50 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-700/50">
              Institutional Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Loved by Ghanaian headteachers, bursars, and parents.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Hear directly from the educators who transformed their institutions with SchoolOS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Testimonial 1 */}
            <div className="p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  “Our teachers used to take two full weeks of sleepless nights preparing end-of-term terminal reports. With SchoolOS, every mark, position rank, and conduct remark was calculated in one afternoon. Parents were thrilled by how neat the reports looked.”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <img
                  src="/assets/ghana_headmistress_crisp.jpg"
                  alt="Mrs. Elizabeth A. Appiah"
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">Mrs. Elizabeth A. Appiah</h4>
                  <p className="text-xs text-blue-400 font-medium">Headmistress, Accra Basic Academy</p>
                  <p className="text-[11px] text-slate-500">Greater Accra Region, Ghana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  “The Mobile Money integration completely eradicated cash shortages in our bursary. Parents receive automated SMS prompts and pay from home. Our tuition collection jumped from 68% to 94% in our very first term.”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600/30 text-emerald-300 border-2 border-emerald-500/50 flex items-center justify-center font-bold text-sm">
                  SB
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mr. Samuel Boakye</h4>
                  <p className="text-xs text-emerald-400 font-medium">Chief Accountant / Bursar, Kumasi Premier</p>
                  <p className="text-[11px] text-slate-500">Ashanti Region, Ghana</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-7 rounded-3xl bg-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  “As a working mother, I cannot visit the school every week. SchoolOS lets me check whether my daughter arrived safely each morning and see her JHS mock examination aggregate immediately. It gives me peace of mind.”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-600/30 text-purple-300 border-2 border-purple-500/50 flex items-center justify-center font-bold text-sm">
                  AO
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Mrs. Abena Osei</h4>
                  <p className="text-xs text-purple-400 font-medium">Parent & Guardian (JHS 2 Pupil)</p>
                  <p className="text-[11px] text-slate-500">Takoradi, Western Region</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: TRANSPARENT INSTITUTIONAL PRICING
          ========================================================================= */}
      <section id="pricing" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-700/50">
              Clear Institutional Pricing
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Predictable plans for every Ghanaian school.
            </h2>
            <p className="text-slate-300 text-base">
              No hidden fees, no per-user surcharges, and free onboarding training for your entire teaching staff.
            </p>

            {/* Billing Toggle */}
            <div className="mt-6 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setBillingCycle('term')}
                className={`px-5 py-2 rounded-xl font-bold transition-all ${
                  billingCycle === 'term' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Per Academic Term (3 Terms/Year)
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Payment</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
                  SAVE 15%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Tier 1: Community Starter */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Community Starter</span>
                <h3 className="text-2xl font-bold text-white">Kindergarten & Primary</h3>
                <p className="text-xs text-slate-400">For basic schools modernizing attendance, continuous assessment, and paper receipts.</p>
                <div className="pt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">
                    {billingCycle === 'term' ? 'GH₵ 450' : 'GH₵ 1,150'}
                  </span>
                  <span className="text-xs text-slate-400">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Up to 250 enrolled pupils</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>KG 1 to Basic 6 Streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Continuous Assessment & Report Cards</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Cash & Bank Receipting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Works Completely Offline</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Register Starter School
              </button>
            </div>

            {/* Tier 2: Professional Suite (Featured) */}
            <div className="p-8 rounded-3xl bg-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-900/40 relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-[10px] font-black text-white uppercase tracking-wider shadow">
                Recommended for Basic & JHS
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Professional Suite</span>
                <h3 className="text-2xl font-bold text-white">Full Basic & Junior High</h3>
                <p className="text-xs text-slate-300">Complete institutional operating platform with Mobile Money and parent portals.</p>
                <div className="pt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">
                    {billingCycle === 'term' ? 'GH₵ 850' : 'GH₵ 2,150'}
                  </span>
                  <span className="text-xs text-slate-400">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-200 pt-4 border-t border-slate-800">
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
                    <span>MTN MoMo & Telecel Cash collection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>BECE Stanine 1–9 Aggregate Calculator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Dedicated Parent Portal Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>AI Test Paper Scanner for Teachers</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
              >
                Get Started Free (14-Day Trial)
              </button>
            </div>

            {/* Tier 3: Enterprise / Multi-Campus */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Multi-Campus & Missions</span>
                <h3 className="text-2xl font-bold text-white">Institutional Enterprise</h3>
                <p className="text-xs text-slate-400">For educational trusts, mission units, and multi-branch school networks.</p>
                <div className="pt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">Custom</span>
                  <span className="text-xs text-slate-400">/ volume discount</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Unlimited students & class streams</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Branded SMS Sender ID (e.g. YOURSCHOOL)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Dedicated On-Site Staff Training</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Custom API & Bank Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>24/7 Priority WhatsApp Hotline</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Contact Enterprise Desk
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQS ACCORDION WITH SEARCH
          ========================================================================= */}
      <section id="faqs" className="py-20 md:py-28 bg-slate-900 border-t border-slate-800 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-700/50">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Everything you need to know about setting up SchoolOS in your school.
            </p>

            {/* Quick Filter Search */}
            <div className="max-w-md mx-auto pt-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions (e.g. MoMo, offline, NaCCA, printing)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-950 border border-slate-800/80 shadow-md overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between text-sm font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-blue-400 flex-shrink-0 ml-3" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0 ml-3" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-900 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action Card */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 p-8 sm:p-12 text-center space-y-6 border border-blue-700/40 shadow-2xl">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to transform your school's daily operations?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Join over 180 forward-thinking Ghanaian schools. Register in under 3 minutes with zero paperwork and free staff onboarding.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Register Your School Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleLaunchRoleDemo('school_admin')}
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-900 border border-slate-700 rounded-xl transition-all"
              >
                Launch Live Interactive Demo
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          INSTITUTIONAL FOOTER
          ========================================================================= */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-[11px]">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  SOS
                </div>
                <span className="font-extrabold text-white text-base">SchoolOS Ghana</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                The institutional operating system for Ghanaian Basic & Junior High Schools. Strictly aligned with GES, NaCCA, and Ghana Data Protection Act 843.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Services Operational</span>
              </div>
            </div>

            {/* Col 2: Specialized Portals */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Specialized Portals</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <button onClick={() => handleLaunchRoleDemo('school_admin')} className="hover:text-white transition-colors">
                    Headteacher Cockpit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLaunchRoleDemo('teacher')} className="hover:text-white transition-colors">
                    Class Teacher Markbook
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLaunchRoleDemo('accountant')} className="hover:text-white transition-colors">
                    Bursar & MoMo Desk
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLaunchRoleDemo('parent')} className="hover:text-white transition-colors">
                    Parent & Guardian Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Curriculum Stages */}
            <div className="space-y-2">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Curriculum Stages</h5>
              <ul className="space-y-2 text-slate-400">
                <li><span>Kindergarten (KG 1–2)</span></li>
                <li><span>Primary (Basic 1–6)</span></li>
                <li><span>Junior High (JHS 1–3)</span></li>
                <li><span>BECE 50/50 Continuous Assessment</span></li>
                <li><span>Stanine 1–9 Aggregate Predictor</span></li>
              </ul>
            </div>

            {/* Col 4: Support & Contact */}
            <div className="space-y-2.5">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Support & Offices</h5>
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Ridge & Airport City, Accra, Ghana</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>+233 (0) 24 123 4567 / +233 (0) 30 200 0000</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>support@schoolos.edu.gh</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} SchoolOS Ghana. All rights reserved. Registered Educational Technology.</p>
            <div className="flex items-center gap-5">
              <button onClick={() => setAuthScreen('login')} className="hover:text-slate-300">Sign In</button>
              <button onClick={() => setAuthScreen('signup')} className="hover:text-slate-300">Register School</button>
              <button onClick={() => scrollToSection('hero')} className="hover:text-slate-300 flex items-center gap-1">
                <ArrowUp className="w-3 h-3 text-blue-400" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

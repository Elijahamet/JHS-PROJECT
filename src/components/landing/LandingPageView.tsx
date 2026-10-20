import React, { useState, useEffect, useRef } from 'react';
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
  ArrowDown,
  ChevronRight,
  ArrowUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPageView: React.FC = () => {
  const { setAuthScreen, setUserRole, currentSchool } = useApp();

  const [activePortalTab, setActivePortalTab] = useState<'admin' | 'teacher' | 'bursar' | 'parent'>('admin');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'term' | 'annual'>('term');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement>(null);

  // Defined 7 distinct page slides
  const pages = [
    { id: 'page-1', title: 'Overview & Hero', number: '01' },
    { id: 'page-2', title: 'Classroom Life', number: '02' },
    { id: 'page-3', title: '4 Specialized Portals', number: '03' },
    { id: 'page-4', title: 'NaCCA & GES Standards', number: '04' },
    { id: 'page-5', title: 'Educator Reviews', number: '05' },
    { id: 'page-6', title: 'Plans & Pricing', number: '06' },
    { id: 'page-7', title: 'FAQs & Support', number: '07' },
  ];

  // Smooth scroll to target page
  const scrollToPage = (pageIndex: number) => {
    const pageId = `page-${pageIndex}`;
    const element = document.getElementById(pageId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(pageIndex);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      scrollToPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      scrollToPage(currentPage - 1);
    }
  };

  // Observe scroll position to update current page indicator
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop + container.clientHeight / 3;
      pages.forEach((page, idx) => {
        const el = document.getElementById(page.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentPage(idx + 1);
          }
        }
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation support: ArrowDown/ArrowUp, PageDown/PageUp
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

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
    <div
      ref={containerRef}
      className="page-snap-container bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white relative"
    >
      {/* =========================================================================
          FLOATING RIGHT-SIDE PAGE DOCK (Page After Page Indicator & Controls)
          ========================================================================= */}
      <aside
        aria-label="Page navigation"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2.5 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl transition-all duration-300"
      >
        {/* Page Counter Badge */}
        <div className="text-[10px] font-black tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 uppercase">
          0{currentPage} / 0{pages.length}
        </div>

        {/* Previous Page Button */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          title="Previous Page (Up Arrow)"
          className={`p-1.5 rounded-lg transition-colors ${
            currentPage === 1
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
          }`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        {/* Dot Indicators for Each Page */}
        <div className="flex flex-col gap-2 my-1">
          {pages.map((p, idx) => {
            const pageNum = idx + 1;
            const isActive = currentPage === pageNum;
            return (
              <button
                key={p.id}
                onClick={() => scrollToPage(pageNum)}
                title={`Jump to Page ${p.number}: ${p.title}`}
                className="group relative flex items-center justify-center p-1"
              >
                {/* Dot */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-7 bg-blue-600 shadow-md shadow-blue-500/40'
                      : 'w-2.5 h-2.5 bg-slate-300 group-hover:bg-slate-400 group-hover:scale-125'
                  }`}
                />

                {/* Tooltip Label on Hover */}
                <span className="absolute right-8 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {p.number}. {p.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === pages.length}
          title="Next Page (Down Arrow)"
          className={`p-1.5 rounded-lg transition-colors ${
            currentPage === pages.length
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </aside>

      {/* Floating Bottom Page Bar for Mobile / Tablet */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-2xl border border-slate-700 flex items-center gap-3 text-xs font-semibold">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-1 rounded ${currentPage === 1 ? 'opacity-30' : 'hover:text-blue-400'}`}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <span className="text-[11px] font-bold tracking-wider">
          PAGE 0{currentPage} / 0{pages.length}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pages.length}
          className={`p-1 rounded ${currentPage === pages.length ? 'opacity-30' : 'hover:text-blue-400'}`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          PAGE 1: OVERVIEW & HERO
          ========================================================================= */}
      <section
        id="page-1"
        className="page-snap-section min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-white to-white relative overflow-hidden"
      >
        {/* Subtle Ambient Glow Behind Content */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Top Header Group */}
        <div>
          {/* Top Banner */}
          <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center font-medium border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Built for Ghanaian Basic Schools & Junior High Schools • Aligned with GES & NaCCA Standards</span>
            </div>
          </div>

          {/* Main Navigation Header */}
          <header className="bg-white/95 backdrop-blur-md border-b border-slate-200">
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

              {/* Navigation Links (Smooth Jump to Pages) */}
              <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
                <button onClick={() => scrollToPage(1)} className="hover:text-blue-600 transition-colors">Overview</button>
                <button onClick={() => scrollToPage(2)} className="hover:text-blue-600 transition-colors">Classroom Life</button>
                <button onClick={() => scrollToPage(3)} className="hover:text-blue-600 transition-colors">4 Portals</button>
                <button onClick={() => scrollToPage(4)} className="hover:text-blue-600 transition-colors">NaCCA & GES</button>
                <button onClick={() => scrollToPage(5)} className="hover:text-blue-600 transition-colors">Testimonials</button>
                <button onClick={() => scrollToPage(6)} className="hover:text-blue-600 transition-colors">Pricing</button>
                <button onClick={() => scrollToPage(7)} className="hover:text-blue-600 transition-colors">FAQs</button>
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
        </div>

        {/* Hero Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 my-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Human Value Proposition */}
            <div className="lg:col-span-7 text-left space-y-6 animate-fade-in-up">
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
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
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

            {/* Right Column: Clean, Framed Authentic Photo (ZERO text on top) */}
            <div className="lg:col-span-5 animate-fade-in-scale">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 transition-all duration-300 hover:shadow-2xl">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian basic school pupils in uniform walking together on school campus"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Page 1 Bottom: Metric Strip & Next Page Arrow */}
        <div className="bg-slate-50 border-t border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 text-center flex-1">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">180+</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Ghanaian Schools</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">45,000+</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Enrolled Pupils</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">99.4%</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Fee Collection</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">1 Click</p>
                <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Terminal Reports</p>
              </div>
            </div>

            {/* Next Page Prompt */}
            <button
              onClick={() => scrollToPage(2)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-2xs group animate-bounce-subtle"
            >
              <span>Next: Classroom Life</span>
              <ArrowDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PAGE 2: CLASSROOM & ACADEMIC LIFE
          ========================================================================= */}
      <section
        id="page-2"
        className="page-snap-section min-h-screen flex flex-col justify-between py-12 md:py-16 bg-white border-b border-slate-200 relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full space-y-12 sm:space-y-16">
          
          {/* Page Title Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Page 02 • Academic & Governance Excellence</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Designed for the daily realities of Ghanaian classrooms
            </h2>
          </div>

          {/* Block 1: Real Pupils in Classroom */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Clean Framed Photo - ZERO text on top */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 transition-all duration-300 hover:shadow-xl">
                <img
                  src="/assets/ghana_classroom_crisp.jpg"
                  alt="Ghanaian school pupils sitting at wooden desks studying mathematics in classroom"
                  className="w-full h-72 sm:h-84 object-cover object-center"
                />
              </div>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academic Assessment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Continuous assessment and marks computed in minutes.
              </h3>
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
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>NaCCA 50/50 SBA Scheme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Stanine BECE Calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Automatic Position Rankings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Print-Ready Terminal Reports</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: School Leadership & Governance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Description Column */}
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Institutional Governance</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Headteachers gain complete clarity over every class stream.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No more guessing whether roll call was taken, whether teachers arrived on time, or how much school fees remain outstanding in arrears.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                From your phone or laptop, monitor class streams across Kindergarten, Primary, and Junior High.
                Approve terminal report cards in one click with your official school crest and signature.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Instant Class Stream Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Daily Attendance Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Staff Class Teacher Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Audit-Ready Bursary Reports</span>
                </div>
              </div>
            </div>

            {/* Clean Framed Photo - ZERO text on top */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 transition-all duration-300 hover:shadow-xl">
                <img
                  src="/assets/ghana_headmistress_crisp.jpg"
                  alt="Ghanaian school headmistress in administrative office"
                  className="w-full h-72 sm:h-84 object-cover object-center"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Page 2 Bottom Bar */}
        <div className="pt-6 pb-2 text-center">
          <button
            onClick={() => scrollToPage(3)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs group animate-bounce-subtle"
          >
            <span>Next: Specialized Portals</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          PAGE 3: 4 SPECIALIZED PORTALS SHOWCASE
          ========================================================================= */}
      <section
        id="page-3"
        className="page-snap-section min-h-screen flex flex-col justify-between py-12 md:py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <span>Page 03 • Role-Based Architecture</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              A dedicated portal for every stakeholder
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Select any role below to preview its specialized workbench and launch an interactive live test drive.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 sm:p-6 space-y-6">
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
                <div className="space-y-6 animate-fade-in">
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
                <div className="space-y-6 animate-fade-in">
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
                <div className="space-y-6 animate-fade-in">
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
                <div className="space-y-6 animate-fade-in">
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

        {/* Page 3 Bottom Bar */}
        <div className="pt-6 pb-2 text-center">
          <button
            onClick={() => scrollToPage(4)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-2xs group animate-bounce-subtle"
          >
            <span>Next: NaCCA & GES Standards</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          PAGE 4: GES & NaCCA 3-STAGE CURRICULUM STANDARDS
          ========================================================================= */}
      <section
        id="page-4"
        className="page-snap-section min-h-screen flex flex-col justify-between py-12 md:py-16 bg-white border-b border-slate-200 relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <span>Page 04 • National Curriculum Compliance</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Aligned with Ghanaian NaCCA Standards
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Pre-loaded with official GES subject lists, continuous assessment weights, and terminal evaluation criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Stage 1: KG */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-amber-300">
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
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-blue-300">
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
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-indigo-300">
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

        {/* Page 4 Bottom Bar */}
        <div className="pt-6 pb-2 text-center">
          <button
            onClick={() => scrollToPage(5)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs group animate-bounce-subtle"
          >
            <span>Next: Educator Reviews</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          PAGE 5: REAL TESTIMONIALS FROM GHANAIAN EDUCATORS & PARENTS
          ========================================================================= */}
      <section
        id="page-5"
        className="page-snap-section min-h-screen flex flex-col justify-between py-12 md:py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <span>Page 05 • Institutional Feedback</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              What Ghanaian educators say about SchoolOS
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Real results from headteachers, accountants, and parents across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Testimonial 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
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
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
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
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
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

        {/* Page 5 Bottom Bar */}
        <div className="pt-6 pb-2 text-center">
          <button
            onClick={() => scrollToPage(6)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition-all shadow-2xs group animate-bounce-subtle"
          >
            <span>Next: Plans & Pricing</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          PAGE 6: TRANSPARENT INSTITUTIONAL PRICING
          ========================================================================= */}
      <section
        id="page-6"
        className="page-snap-section min-h-screen flex flex-col justify-between py-12 md:py-16 bg-white border-b border-slate-200 relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-50/70 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <span>Page 06 • Clear Pricing</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Predictable plans for every Ghanaian school
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Transparent institutional pricing with zero hidden fees and free onboarding training for your staff.
            </p>

            {/* Toggle */}
            <div className="mt-5 inline-flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Community Starter</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Kindergarten & Primary</h3>
                <p className="text-xs text-slate-500 mt-1">For growing basic schools establishing digital records.</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    {billingCycle === 'term' ? 'GH₵ 450' : 'GH₵ 1,150'}
                  </span>
                  <span className="text-xs text-slate-500">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
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
                className="mt-6 w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Professional (Featured) */}
            <div className="p-7 rounded-2xl bg-slate-900 text-white shadow-xl relative flex flex-col justify-between border-2 border-blue-500 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                Recommended for JHS
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Professional Suite</span>
                <h3 className="text-xl font-bold text-white mt-1">Complete Basic & JHS</h3>
                <p className="text-xs text-slate-300 mt-1">Full-featured platform for Ghanaian basic and junior high schools.</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">
                    {billingCycle === 'term' ? 'GH₵ 850' : 'GH₵ 2,150'}
                  </span>
                  <span className="text-xs text-slate-400">/{billingCycle === 'term' ? 'term' : 'year'}</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-300">
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
                className="mt-6 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow transition-all"
              >
                Register Your School
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Enterprise</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Multi-Campus & Mission</h3>
                <p className="text-xs text-slate-500 mt-1">For mission units, trusts, and multi-campus school systems.</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">Custom</span>
                  <span className="text-xs text-slate-500">/ volume discount</span>
                </div>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
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
                className="mt-6 w-full py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Page 6 Bottom Bar */}
        <div className="pt-6 pb-2 text-center">
          <button
            onClick={() => scrollToPage(7)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs group animate-bounce-subtle"
          >
            <span>Next: FAQs & Support</span>
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          PAGE 7: FREQUENTLY ASKED QUESTIONS & INSTITUTIONAL FOOTER
          ========================================================================= */}
      <section
        id="page-7"
        className="page-snap-section min-h-screen flex flex-col justify-between py-12 md:py-16 bg-slate-50 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-auto w-full space-y-12">
          
          {/* FAQ Header */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200">
              <span>Page 07 • Clear Answers</span>
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
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
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Call to Action Block */}
          <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-10 text-center space-y-5 shadow-xl relative overflow-hidden border border-slate-800">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to upgrade your school operations?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Join over 180 forward-thinking Ghanaian schools. Register in under 3 minutes with zero paperwork.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full sm:w-auto px-7 py-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Register Your School Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleLaunchRoleDemo('school_admin')}
                className="w-full sm:w-auto px-7 py-3 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all"
              >
                Test Drive Demo
              </button>
            </div>
          </div>

          {/* Back to Top Quick Action */}
          <div className="text-center pt-2">
            <button
              onClick={() => scrollToPage(1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 transition-all shadow-2xs group"
            >
              <ArrowUp className="w-3.5 h-3.5 text-blue-600 group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Top (Page 01)</span>
            </button>
          </div>
        </div>

        {/* Institutional Footer */}
        <footer className="mt-12 bg-slate-950 border-t border-slate-800 py-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800 text-[11px]">
              {/* Col 1 */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
                    SOS
                  </div>
                  <span className="font-extrabold text-white text-xs">SchoolOS Ghana</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Institutional OS for Ghanaian Basic & JHS. Compliant with GES, NaCCA, and Act 843.
                </p>
              </div>

              {/* Col 2 */}
              <div>
                <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-2">Specialized Portals</h5>
                <ul className="space-y-1.5 text-slate-400">
                  <li><button onClick={() => handleLaunchRoleDemo('school_admin')} className="hover:text-white transition-colors">Headteacher Cockpit</button></li>
                  <li><button onClick={() => handleLaunchRoleDemo('teacher')} className="hover:text-white transition-colors">Teacher Workbench</button></li>
                  <li><button onClick={() => handleLaunchRoleDemo('accountant')} className="hover:text-white transition-colors">Bursary Desk</button></li>
                  <li><button onClick={() => handleLaunchRoleDemo('parent')} className="hover:text-white transition-colors">Parent Portal</button></li>
                </ul>
              </div>

              {/* Col 3 */}
              <div>
                <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-2">Curriculum Stages</h5>
                <ul className="space-y-1.5 text-slate-400">
                  <li><span>Kindergarten (KG 1–2)</span></li>
                  <li><span>Primary (Basic 1–6)</span></li>
                  <li><span>Junior High (JHS 1–3)</span></li>
                  <li><span>BECE 50/50 Continuous Assessment</span></li>
                </ul>
              </div>

              {/* Col 4 */}
              <div className="space-y-1.5">
                <h5 className="font-bold text-white uppercase tracking-wider text-[10px] mb-2">Support & Office</h5>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>Ridge & Airport City, Accra, Ghana</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>+233 (0) 24 000 0000</span>
                </p>
                <p className="flex items-center gap-1.5 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span>support@schoolos.edu.gh</span>
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
              <p>© {new Date().getFullYear()} SchoolOS Ghana. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setAuthScreen('login')} className="hover:text-slate-300">Sign In</button>
                <button onClick={() => setAuthScreen('signup')} className="hover:text-slate-300">Register School</button>
                <span>GES & NaCCA Framework</span>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  User,
  Users,
  Check,
  CalendarCheck,
  Award,
  CreditCard,
  Utensils,
  Bus,
  MessageSquare,
  FileEdit,
  Eye,
  FilePlus,
  ArrowRight,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  TrendingUp,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  CheckCircle2,
  QrCode,
  DollarSign,
  Download,
  Printer,
  ShieldCheck,
  Zap,
  Menu,
  X,
  Layers,
  Send,
  Building,
  CheckCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

export const LandingPageView: React.FC = () => {
  const { setAuthScreen, setUserRole } = useApp();

  // Navigation & Modal states
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feature Filter
  const [selectedFeatureFilter, setSelectedFeatureFilter] = useState<
    'all' | 'academics' | 'finance' | 'operations' | 'communication'
  >('all');

  // Interactive Role Preview Tab
  const [activeRoleTab, setActiveRoleTab] = useState<
    'school_admin' | 'teacher' | 'accountant' | 'parent'
  >('school_admin');

  // ROI Fee Calculator States
  const [calculatorStudents, setCalculatorStudents] = useState<number>(380);
  const [calculatorFee, setCalculatorFee] = useState<number>(1200);

  // Terminal Report Card Stage Preview
  const [reportCardStage, setReportCardStage] = useState<'Primary' | 'JHS'>('Primary');
  const [isSimulatedSent, setIsSimulatedSent] = useState(false);

  // Pricing Toggle (Per Term vs Monthly)
  const [billingCycle, setBillingCycle] = useState<'term' | 'monthly'>('term');

  // Interactive FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Smooth scrolling helper
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Launch role demo
  const handleLaunchRoleDemo = (role: 'school_admin' | 'teacher' | 'accountant' | 'parent') => {
    setUserRole(role);
    setAuthScreen('authenticated');
  };

  // Dynamic ROI Calculations
  const termGrossRevenue = calculatorStudents * calculatorFee;
  const arrearsRecoveredBoost = Math.round(termGrossRevenue * 0.18);
  const adminHoursSaved = Math.round(calculatorStudents * 0.42) + 36;
  const momoCollectionRate = 94;

  const featuresList = [
    {
      id: 'students',
      category: 'academics',
      title: 'Student Profiles & Biodata',
      desc: 'Keep complete Ghanaian bio-data, guardian phone lines, Ghana Cards, and digital admissions.',
      icon: Users,
      badge: 'Core Registry',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      id: 'attendance',
      category: 'operations',
      title: '30-Sec Digital Roll Call',
      desc: 'Instant morning roll call on mobile or desktop with automated SMS alerts sent to parents.',
      icon: CalendarCheck,
      badge: 'Daily Log',
      color: 'text-teal-600 bg-teal-50 border-teal-100',
    },
    {
      id: 'reports',
      category: 'academics',
      title: 'Terminal Report Cards',
      desc: 'GES & NaCCA aligned grading with automatic class positions, continuous assessment, and teacher remarks.',
      icon: Award,
      badge: 'GES Aligned',
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      id: 'fees',
      category: 'finance',
      title: 'School Fees & MoMo Gateway',
      desc: 'Accept MTN MoMo, Telecel Cash, and Bank deposits with instant stamped digital receipts.',
      icon: CreditCard,
      badge: 'MoMo Enabled',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      id: 'feeding',
      category: 'finance',
      title: 'Feeding & Canteen Fees',
      desc: 'Daily meal allowances, termly feeding balances, and kitchen inventory logs reconciled in real-time.',
      icon: Utensils,
      badge: 'Hot Meals',
      color: 'text-orange-600 bg-orange-50 border-orange-100',
    },
    {
      id: 'transport',
      category: 'operations',
      title: 'School Bus & Route Roster',
      desc: 'Assign pupils to bus routes, track driver rosters, and monitor live boarding verification.',
      icon: Bus,
      badge: 'Logistics',
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      id: 'admissions',
      category: 'operations',
      title: 'Online Admissions & Enrollment',
      desc: 'Fast-track new intake registration with printable admission letters and fee quotes.',
      icon: FilePlus,
      badge: 'Paperless',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      id: 'communication',
      category: 'communication',
      title: 'Parent Chat & Bulk SMS Desk',
      desc: 'Send PTA meeting notices, fee reminders, and school circulars straight to guardians via SMS and web chat.',
      icon: MessageSquare,
      badge: 'High Open-Rate',
      color: 'text-cyan-600 bg-cyan-50 border-cyan-100',
    },
  ];

  const filteredFeatures =
    selectedFeatureFilter === 'all'
      ? featuresList
      : featuresList.filter((f) => f.category === selectedFeatureFilter);

  const faqs = [
    {
      q: 'Does SchoolOS work during internet slow-downs or offline power outages?',
      a: 'Yes! SchoolOS features local caching and offline resilience. Teachers can take daily roll call, enter marks, and check schedules even without active internet; data automatically synchronizes as soon as connection is restored.',
    },
    {
      q: 'Can Ghanaian parents pay fees directly through MTN Mobile Money or Telecel Cash?',
      a: 'Absolutely. Parents can make fee payments via MTN MoMo, Telecel Cash, or direct bank transfer. Receipts are automatically generated with official school verification seals and sent directly to parents.',
    },
    {
      q: 'Is SchoolOS aligned with the Ghanaian National Curriculum (GES / NaCCA)?',
      a: 'Yes, 100%. SchoolOS comes pre-configured with all standard GES subjects for Kindergarten (KG 1–2), Primary (Basic 1–6), and Junior High School (JHS 1–3, BECE preparation), along with Ghanaian 9-point and letter grading systems.',
    },
    {
      q: 'How fast can our school transfer existing student and teacher records into SchoolOS?',
      a: 'In less than 15 minutes! You can upload your existing Excel or CSV student registers with a single click, or use our pre-built Ghana school template.',
    },
    {
      q: 'Do teachers need computers, or can they use their smartphones in the classroom?',
      a: 'SchoolOS is completely mobile-first and responsive. Teachers can mark daily attendance and input test marks directly from any Android or iPhone web browser in seconds.',
    },
    {
      q: 'Is training and customer support provided for our school administrative staff?',
      a: 'Yes. Every SchoolOS package includes onboarding guidance, dedicated WhatsApp support, staff training sessions, and continuous feature updates.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#0B2545] selection:text-white">
      {/* =========================================================================
          0. TOP ANNOUNCEMENT TICKER BANNER
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#071A31] via-[#0B2545] to-[#1E3A8A] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30 text-[10px] tracking-wider uppercase">
              2025 Release
            </span>
            <span className="text-slate-200">
              🇬🇭 <strong>Ghana GES & NaCCA Compliant</strong> • Integrated MTN MoMo & Telecel Cash Gateway • Offline Resilient
            </span>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1 font-bold text-cyan-300 hover:text-white hover:underline transition-colors"
          >
            <span>Launch Live Interactive Sandbox</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          1. HEADER / NAVIGATION BAR
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0B2545] flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 group-hover:rotate-[-3deg] transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-2xl text-[#0B2545] tracking-tight group-hover:text-blue-900 transition-colors block leading-none">
                SchoolOS
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Smart Ghana School Suite
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-semibold text-slate-600">
            <button
              onClick={() => scrollTo('hero')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Features</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('platform-roles')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Role Portals</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('calculator')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group text-emerald-700 font-bold"
            >
              <span className="flex items-center gap-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>ROI Calculator</span>
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('report-cards')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Report Cards</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Pricing</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>FAQ</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Action Buttons: Sign In + Sign Up + Sandbox */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-200 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Explore Demo</span>
            </button>
            <button
              onClick={() => setAuthScreen('login')}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B2545] hover:bg-slate-50 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthScreen('signup')}
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 shadow-xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <button
                onClick={() => scrollTo('hero')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                Home
              </button>
              <button
                onClick={() => scrollTo('features')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                Features
              </button>
              <button
                onClick={() => scrollTo('platform-roles')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                Role Portals
              </button>
              <button
                onClick={() => scrollTo('calculator')}
                className="p-2.5 text-left rounded-lg text-emerald-700 font-extrabold hover:bg-emerald-50"
              >
                ROI Calculator
              </button>
              <button
                onClick={() => scrollTo('report-cards')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                Report Cards
              </button>
              <button
                onClick={() => scrollTo('pricing')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollTo('faq')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="p-2.5 text-left rounded-lg hover:bg-slate-50"
              >
                Contact
              </button>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-2.5 text-xs font-bold text-center text-blue-700 bg-blue-50 rounded-xl"
              >
                Open Live Role Sandbox
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          2. HERO SECTION WITH RICH VISUALS & INTERACTIVE ROLE PREVIEW
          ========================================================================= */}
      <section id="hero" className="relative pt-10 pb-20 lg:pt-16 lg:pb-24 overflow-hidden bg-white">
        {/* Ambient Glowing Background Auras */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-100/60 via-indigo-100/40 to-cyan-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-6 space-y-6 text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-[#2563EB] text-xs font-extrabold tracking-wider uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                <span>Next-Gen Ghanaian School Management</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0B2545] tracking-tight leading-[1.12]">
                The smart operating system for Ghanaian schools.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                SchoolOS equips private Basic & Junior High Schools across Ghana with everything needed: students biodata, instant Mobile Money fee receipts, 30-second roll calls, and GES terminal report cards.
              </p>

              {/* Action Buttons: Sign Up + Instant Interactive Tour */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-7 py-3.5 text-sm font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Register Your School Free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-3.5 text-sm font-bold text-blue-900 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl hover:shadow-sm active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span>Launch Live Role Demo</span>
                </button>
              </div>

              {/* Social Proof Stats Banner */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-100 max-w-lg">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-[#0B2545]">98.6%</p>
                  <p className="text-[11px] text-slate-500 font-medium">Fee Reconciliation</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-emerald-600">30 Secs</p>
                  <p className="text-[11px] text-slate-500 font-medium">Daily Roll Call</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-blue-600">100%</p>
                  <p className="text-[11px] text-slate-500 font-medium">GES / NaCCA Ready</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Pupils & Floating Live Badges */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100 w-full max-w-sm sm:max-w-md lg:max-w-[460px] relative group">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian school pupils smiling together in school courtyard"
                  className="w-full h-72 sm:h-84 lg:h-[390px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Metric Badge 1: Live MoMo Verified */}
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-100 shadow-xl flex items-center gap-3 animate-float-slow">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-extrabold text-slate-900">MTN MoMo Instant</p>
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Auto Stamped Receipt
                    </p>
                  </div>
                </div>

                {/* Floating Metric Badge 2: Terminal Reports Done */}
                <div className="absolute bottom-4 right-4 p-3 rounded-2xl bg-slate-900/95 text-white backdrop-blur-md border border-slate-800 shadow-2xl flex items-center gap-3 animate-float-reverse">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-left text-xs">
                    <p className="font-extrabold text-white">GES Terminal Reports</p>
                    <p className="text-[10px] text-blue-300 font-semibold">
                      Generated in 1 Click
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. INTERACTIVE SECTION: ROLE-BASED PLATFORMS PREVIEW
          ========================================================================= */}
      <section id="platform-roles" className="py-20 bg-slate-50/75 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              ROLE-BASED PLATFORMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              One platform. Tailored for every stakeholder.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Switch between specialized interfaces designed specifically for administrators, teachers, bursars, and parents.
            </p>

            {/* Interactive Tab Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'school_admin' as const, label: '👔 Headmaster & Admin', desc: 'Full governance' },
                { id: 'teacher' as const, label: '👩‍🏫 Class Teacher', desc: 'Roll call & marks' },
                { id: 'accountant' as const, label: '💼 Bursar & Finance', desc: 'Fees & MoMo' },
                { id: 'parent' as const, label: '👨‍👩‍👧 Parent & Guardian', desc: 'Reports & payments' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoleTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeRoleTab === tab.id
                      ? 'bg-[#0B2545] text-white shadow-md shadow-blue-950/20 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Role Card Content */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-10">
            {activeRoleTab === 'school_admin' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-6 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Administrator Cockpit</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B2545]">
                    Comprehensive School Oversight & Governance
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    View real-time school enrollments, class rosters, teacher allocations, fee recovery, and terminal academic performance in one authoritative cockpit.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>One-click Student & Teacher directory management</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Curriculum stream builder (KG 1 to JHS 3) with subject allocation</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>School-wide fee defaulters watchlist & automated parent SMS reminders</span>
                    </li>
                  </ul>
                  <div className="pt-3">
                    <button
                      onClick={() => handleLaunchRoleDemo('school_admin')}
                      className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#071A31] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Test Drive Administrator Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0B2545] p-5 text-white shadow-xl space-y-3.5">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10 text-xs">
                    <span className="font-bold flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-400" />
                      <span>Bright Future Academy Cockpit</span>
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Term 2 Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                      <p className="text-[10px] text-slate-300">Total Enrolled</p>
                      <p className="text-xl font-black text-white mt-0.5">384 Pupils</p>
                      <p className="text-[10px] text-emerald-400 mt-1 font-semibold">11 Streams (KG-JHS)</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                      <p className="text-[10px] text-slate-300">Term Fee Collection</p>
                      <p className="text-xl font-black text-emerald-400 mt-0.5">GH₵ 460,800</p>
                      <p className="text-[10px] text-slate-300 mt-1">94% Target Achieved</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span>Today's Attendance</span>
                      <span className="font-bold text-white">98.2% (377 Present)</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[98%]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'teacher' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-6 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                    <Award className="w-3.5 h-3.5" />
                    <span>Educator Workbench</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B2545]">
                    Fast Roll Call & Continuous Assessment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Designed for class teachers to take morning attendance in 30 seconds, record class tests and terminal marks, and generate standardized report card remarks without manual paper math.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>One-tap Class Attendance Roll Call with SMS broadcast</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Class Test & Exam Markbook with automatic GPA calculation</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>AI-powered continuous assessment test paper scanner</span>
                    </li>
                  </ul>
                  <div className="pt-3">
                    <button
                      onClick={() => handleLaunchRoleDemo('teacher')}
                      className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#071A31] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Test Drive Teacher Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-slate-900 p-5 text-white shadow-xl space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-amber-400">Class Teacher: Basic 5 Stream A</span>
                    <span className="text-[10px] text-slate-400">Roll Call Today</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                      <div>
                        <p className="font-bold text-white">Kofi Mensah</p>
                        <p className="text-[10px] text-slate-400">ID: STD-2025-001</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Present
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                      <div>
                        <p className="font-bold text-white">Ama Serwaa Boateng</p>
                        <p className="text-[10px] text-slate-400">ID: STD-2025-002</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Present
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                      <div>
                        <p className="font-bold text-white">Kwaku Osei</p>
                        <p className="text-[10px] text-slate-400">ID: STD-2025-003</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        Late (Bus Delayed)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'accountant' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-6 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Bursary & Financial Ledger</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B2545]">
                    Audit-Ready Accounts & Mobile Money Cashier
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Instantly issue official stamped payment receipts, reconcile daily tuition and feeding collections, track arrears by family, and export financial cash books for audits.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Instant Official Digital Receipt with QR verification stamp</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Reconcile School Tuition & Hot Lunch Feeding Fees separately</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Automated parent SMS reminder dispatch for unpaid arrears</span>
                    </li>
                  </ul>
                  <div className="pt-3">
                    <button
                      onClick={() => handleLaunchRoleDemo('accountant')}
                      className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#071A31] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Test Drive Bursar Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-2xl bg-slate-900 p-5 text-white shadow-xl space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs">
                    <span className="font-bold text-emerald-400">Official Receipt Preview</span>
                    <span className="text-[10px] text-slate-400">REC-2025-0482</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white text-slate-900 text-xs space-y-2 font-mono">
                    <div className="text-center pb-2 border-b border-dashed border-slate-300">
                      <p className="font-bold text-xs uppercase text-[#0B2545]">Bright Future Academy</p>
                      <p className="text-[10px] text-slate-500">Official Cash Receipt</p>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Student: Kofi Mensah (B5)</span>
                      <span className="font-bold">GH₵ 1,200.00</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600">
                      <span>Method: MTN Mobile Money</span>
                      <span>Ref: MTN-84920412</span>
                    </div>
                    <div className="pt-1 flex items-center justify-between border-t border-dashed border-slate-200 text-[10px] text-emerald-700 font-bold font-sans">
                      <span className="flex items-center gap-1">
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified & Stamped</span>
                      </span>
                      <span>Status: Settled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeRoleTab === 'parent' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-6 space-y-4 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
                    <Users className="w-3.5 h-3.5" />
                    <span>Parent & Guardian Desk</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#0B2545]">
                    Live Ward Attendance, Reports & Instant Mobile Pay
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Empower parents with immediate transparency into their child’s daily attendance, terminal academic report cards, fee ledger balances, and 1-click Mobile Money payment options.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Instant Terminal Report Card download on smartphone</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Pay school fees with MTN MoMo or Telecel Cash securely</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Live morning bus pickup status and school announcements</span>
                    </li>
                  </ul>
                  <div className="pt-3">
                    <button
                      onClick={() => handleLaunchRoleDemo('parent')}
                      className="px-6 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#071A31] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <span>Test Drive Parent Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 flex justify-center">
                  <div className="w-72 rounded-3xl bg-slate-900 border-4 border-slate-800 shadow-2xl p-4 text-white text-xs space-y-3">
                    <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto" />
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-bold text-white">Parent Portal</span>
                      <span>9:41 AM</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/10 space-y-1">
                      <p className="text-[10px] text-slate-300">Ward Overview</p>
                      <p className="font-extrabold text-sm text-white">Kofi Mensah</p>
                      <p className="text-[10px] text-blue-300 font-semibold">Basic 5A • Roll No. 12</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[9px] text-slate-400">Attendance</p>
                        <p className="font-extrabold text-emerald-400 text-xs mt-0.5">98.5%</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[9px] text-slate-400">Class Average</p>
                        <p className="font-extrabold text-blue-400 text-xs mt-0.5">88.4% (1st)</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLaunchRoleDemo('parent')}
                      className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Pay Fees via MoMo</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE SECTION: SCHOOL REVENUE & ARREARS ROI CALCULATOR
          ========================================================================= */}
      <section id="calculator" className="py-20 md:py-28 bg-[#0B2545] text-white relative overflow-hidden">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-extrabold text-emerald-400 tracking-wider uppercase flex items-center justify-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>INTERACTIVE RETURN ON INVESTMENT CALCULATOR</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              See how much time and money your school saves.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Adjust the sliders to match your school’s student population and termly fees to see estimated revenue recovery and administrative hours saved.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-200">Total Enrolled Pupils:</span>
                  <span className="text-xl font-black text-white px-3 py-1 bg-white/10 rounded-xl border border-white/10">
                    {calculatorStudents} Pupils
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  step="10"
                  value={calculatorStudents}
                  onChange={(e) => setCalculatorStudents(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>50 (Small School)</span>
                  <span>600 (Medium)</span>
                  <span>1,200 (Large Campus)</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-slate-200">Average Term Tuition per Pupil:</span>
                  <span className="text-xl font-black text-emerald-400 px-3 py-1 bg-white/10 rounded-xl border border-white/10">
                    {formatCurrency(calculatorFee)}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="3500"
                  step="50"
                  value={calculatorFee}
                  onChange={(e) => setCalculatorFee(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>GH₵ 300</span>
                  <span>GH₵ 1,800</span>
                  <span>GH₵ 3,500</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-2">
                * Based on data from over 80+ private Ghanaian schools using SchoolOS automated MoMo fee collection and SMS arrears reminders.
              </p>
            </div>

            {/* Dynamic Results Display Card */}
            <div className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-slate-900/90 to-[#0B2545]/90 border border-emerald-500/30 p-6 space-y-5 shadow-2xl">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Estimated Termly Impact
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  ROI Guaranteed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-[11px] text-slate-400">Projected Term Revenue</p>
                  <p className="text-xl sm:text-2xl font-black text-white">
                    {formatCurrency(termGrossRevenue)}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <p className="text-[11px] text-emerald-300 font-semibold">Arrears Recovered Boost</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400">
                    +{formatCurrency(arrearsRecoveredBoost)}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-left">
                <div>
                  <p className="text-slate-300 font-semibold">Teacher Hours Saved per Term</p>
                  <p className="text-xs text-slate-400">No manual paper grade calculation</p>
                </div>
                <span className="text-lg font-black text-cyan-300">
                  {adminHoursSaved} Hours
                </span>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Recovering Fees For Your School</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE SECTION: GES & NACCA TERMINAL REPORT CARD PREVIEW
          ========================================================================= */}
      <section id="report-cards" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              ACADEMIC EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              GES & NaCCA Aligned Terminal Report Cards
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Eliminate two weeks of teacher stress every term. Generate pristine, standardized Ghanaian terminal report cards with automated grades, class positions, and attendance records.
            </p>

            {/* Stage Toggle */}
            <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-2xs mt-2">
              <button
                onClick={() => setReportCardStage('Primary')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  reportCardStage === 'Primary'
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Primary School Report (Basic 1–6)
              </button>
              <button
                onClick={() => setReportCardStage('JHS')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  reportCardStage === 'JHS'
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Junior High School (JHS 1–3 / BECE)
              </button>
            </div>
          </div>

          {/* Interactive Report Card Simulation Preview */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-300 shadow-2xl p-6 sm:p-10 text-xs text-left space-y-6">
            
            {/* Header with School Crest & Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b-2 border-slate-900 gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0B2545] text-white flex items-center justify-center font-black text-lg shadow-sm">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] uppercase tracking-tight">
                    Bright Future Academy
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    GES Approved • Term 2 Academic Terminal Performance Report
                  </p>
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-600">
                <p><strong>Academic Year:</strong> 2024 / 2025</p>
                <p><strong>Term:</strong> Second Term</p>
              </div>
            </div>

            {/* Student Particulars Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Pupil Name</p>
                <p className="font-bold text-[#0B2545]">
                  {reportCardStage === 'Primary' ? 'Kofi Mensah' : 'Ama Serwaa Boateng'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Class Stream</p>
                <p className="font-bold text-slate-800">
                  {reportCardStage === 'Primary' ? 'Basic 5 Gold' : 'JHS 2 Diamond'}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Class Position</p>
                <p className="font-bold text-emerald-700">1st out of 38 pupils</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Attendance Rate</p>
                <p className="font-bold text-slate-800">58 / 60 Days (96.6%)</p>
              </div>
            </div>

            {/* Curriculum Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-[#0B2545] text-white text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Curriculum Subject</th>
                    <th className="py-2.5 px-2 text-center">Class Score (50%)</th>
                    <th className="py-2.5 px-2 text-center">Exam Score (50%)</th>
                    <th className="py-2.5 px-2 text-center">Total (100%)</th>
                    <th className="py-2.5 px-2 text-center">Grade</th>
                    <th className="py-2.5 px-3">Educator Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Mathematics</td>
                    <td className="py-2.5 px-2 text-center">46</td>
                    <td className="py-2.5 px-2 text-center">44</td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-700">90%</td>
                    <td className="py-2.5 px-2 text-center font-bold text-blue-700">1 (Excellent)</td>
                    <td className="py-2.5 px-3 text-slate-600">Exceptional numerical problem solving.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">English Language</td>
                    <td className="py-2.5 px-2 text-center">42</td>
                    <td className="py-2.5 px-2 text-center">43</td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-700">85%</td>
                    <td className="py-2.5 px-2 text-center font-bold text-blue-700">1 (Very Good)</td>
                    <td className="py-2.5 px-3 text-slate-600">Strong comprehension and essay structure.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Integrated Science</td>
                    <td className="py-2.5 px-2 text-center">44</td>
                    <td className="py-2.5 px-2 text-center">45</td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-700">89%</td>
                    <td className="py-2.5 px-2 text-center font-bold text-blue-700">1 (Excellent)</td>
                    <td className="py-2.5 px-3 text-slate-600">Active practical inquiry and interest.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-900">Computing & ICT</td>
                    <td className="py-2.5 px-2 text-center">48</td>
                    <td className="py-2.5 px-2 text-center">46</td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-700">94%</td>
                    <td className="py-2.5 px-2 text-center font-bold text-blue-700">1 (Distinction)</td>
                    <td className="py-2.5 px-3 text-slate-600">Outstanding software and typing proficiency.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Teacher & Headteacher Remarks with Simulated Verification Seal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Class Teacher Remark</p>
                <p className="text-xs text-slate-800 italic">
                  "An obedient, highly motivated learner with steady academic leadership."
                </p>
                <p className="text-[10px] text-slate-500 font-semibold pt-1">
                  Signed: Mr. Emmanuel Osei (Form Master)
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1 relative">
                <p className="text-[10px] font-bold text-blue-800 uppercase">Headmaster's Endorsement</p>
                <p className="text-xs text-slate-800 font-semibold">
                  "Promoted with merit. Keep up the disciplined work ethic."
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Dr. K. Appiah (Headmaster)</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                    OFFICIAL SEAL VERIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Actions for the Report Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSimulatedSent(true);
                    setTimeout(() => setIsSimulatedSent(false), 3000);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSimulatedSent ? '✓ Sent to Parent WhatsApp!' : 'Simulate WhatsApp Dispatch to Parent'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sample</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-500">
                ⚡ Generated in 1.4 seconds from live continuous assessment
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE SECTION: FILTERABLE FEATURE SHOWCASE
          ========================================================================= */}
      <section id="features" className="py-20 md:py-28 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              COMPREHENSIVE SUITE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Everything your school needs to succeed
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Explore the modules built purposefully for modern private basic and JHS schools in Ghana.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'all' as const, label: 'All Modules' },
                { id: 'academics' as const, label: 'Academics & Reports' },
                { id: 'finance' as const, label: 'Fees & MoMo' },
                { id: 'operations' as const, label: 'Attendance & Transport' },
                { id: 'communication' as const, label: 'SMS & Announcements' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFeatureFilter(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedFeatureFilter === cat.id
                      ? 'bg-[#0B2545] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Grid of Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0B2545] group-hover:text-blue-900 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] font-bold text-blue-600 group-hover:text-blue-900">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. ECOSYSTEM BANNER: GHANA MOBILE MONEY & SECURE PAYMENTS
          ========================================================================= */}
      <section className="py-16 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-blue-500/10 border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <span className="text-xs font-black text-amber-800 uppercase tracking-wider">
              PAYMENT INTEGRATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Seamlessly connected to Ghana’s Leading Financial Channels
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-2">
              Never chase bank deposit slips or paper receipts again. Receive funds straight to your designated school merchant account.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5 font-bold text-xs text-slate-800">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span>MTN Mobile Money (MoMo)</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5 font-bold text-xs text-slate-800">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span>Telecel Cash</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5 font-bold text-xs text-slate-800">
              <span className="w-3 h-3 rounded-full bg-blue-600" />
              <span>AT Money</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5 font-bold text-xs text-slate-800">
              <Building className="w-4 h-4 text-emerald-600" />
              <span>Direct Bank Wire & GHIPSS</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-2.5 font-bold text-xs text-slate-800">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Visa & Mastercard</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. VERIFIED SCHOOL TESTIMONIALS & SOCIAL PROOF
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Trusted by leading private schools across Ghana
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Hear directly from headteachers and bursars who upgraded their institutions with SchoolOS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-4 text-left">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "Our school fees recovery improved from 68% to 94% within our very first term. Parents love being able to pay on their phones with MTN MoMo, and the automated SMS receipts stop all payment disputes."
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B2545] text-white flex items-center justify-center font-bold text-xs">
                  EB
                </div>
                <div>
                  <p className="font-extrabold text-xs text-slate-900">Rev. Dr. Emmanuel Boateng</p>
                  <p className="text-[11px] text-slate-500">Headmaster • Morning Star Preparatory, Accra</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-4 text-left">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "Terminal report cards used to take our staff two whole weeks of sleepless nights and manual calculations. With SchoolOS, all 420 terminal reports were printed and sent on WhatsApp in an afternoon."
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-xs">
                  GA
                </div>
                <div>
                  <p className="font-extrabold text-xs text-slate-900">Mrs. Grace Appiah</p>
                  <p className="text-[11px] text-slate-500">Proprietress • Kingsway Academy, Kumasi</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-4 text-left">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "The attendance tracking and school bus routing gave parents tremendous confidence in our school safety. It works effortlessly even when our local internet goes off."
              </p>
              <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  SO
                </div>
                <div>
                  <p className="font-extrabold text-xs text-slate-900">Mr. Samuel Osei-Tutu</p>
                  <p className="text-[11px] text-slate-500">Bursar • Great Faith Int. School, Takoradi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. SECTION: TRANSPARENT PRICING
          ========================================================================= */}
      <section id="pricing" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              PLANS & PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Predictable, transparent plans for every school
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              No hidden fees. Select between termly billing or affordable monthly payments.
            </p>

            {/* Term vs Monthly Billing Cycle Toggle */}
            <div className="inline-flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs mt-3">
              <button
                onClick={() => setBillingCycle('term')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'term'
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Billed Per Term (Save 15%)
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Payments
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Card 1: Starter */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Starter Academy</h3>
                  <p className="text-xs text-slate-500 mt-1">Ideal for small or emerging basic schools.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B2545]">
                    {billingCycle === 'term' ? 'GH₵ 2,900' : 'GH₵ 950'}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {billingCycle === 'term' ? ' / academic term' : ' / month'}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 pt-5 border-t border-slate-100">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Up to 200 enrolled students</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Teacher & Class stream registers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Digital roll call attendance</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Standard GES terminal report cards</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>WhatsApp support desk</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 transition-all cursor-pointer"
              >
                Register Starter School
              </button>
            </div>

            {/* Card 2: Professional (Featured) */}
            <div className="p-8 rounded-3xl bg-white border-2 border-[#0B2545] shadow-2xl hover:-translate-y-2 transition-all duration-300 relative flex flex-col justify-between space-y-6 text-left ring-4 ring-blue-500/10">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#0B2545] text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                Most Popular in Ghana
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Professional</h3>
                  <p className="text-xs text-slate-500 mt-1">For established Primary & JHS institutions.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B2545]">
                    {billingCycle === 'term' ? 'GH₵ 5,800' : 'GH₵ 1,950'}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {billingCycle === 'term' ? ' / academic term' : ' / month'}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 pt-5 border-t border-slate-100">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Up to 600 enrolled students</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Mobile Money (MoMo) fee payments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Parent Portal & live academic reports</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>School bus transport tracking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Automated parent SMS broadcast reminders</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Hot lunch canteen fee ledger</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3.5 rounded-xl bg-[#0B2545] hover:bg-[#071A31] text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                Get Started with Professional
              </button>
            </div>

            {/* Card 3: Multi-Campus Enterprise */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Enterprise & Multi-Campus</h3>
                  <p className="text-xs text-slate-500 mt-1">For multi-stream schools and campuses.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B2545]">
                    {billingCycle === 'term' ? 'GH₵ 9,900' : 'GH₵ 3,400'}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {billingCycle === 'term' ? ' / academic term' : ' / month'}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 pt-5 border-t border-slate-100">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Unlimited pupils and teachers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Multiple campus branch support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Custom fee schedules & scholarships</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Dedicated account manager & staff training</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Bespoke financial audit reports</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs sm:text-sm font-bold text-slate-800 transition-all cursor-pointer"
              >
                Contact Sales Team
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          10. INTERACTIVE FAQ ACCORDION SECTION
          ========================================================================= */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear answers on how SchoolOS supports Ghanaian school operations.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden transition-all bg-white shadow-2xs hover:border-slate-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-[#0B2545] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. DARK NAVY CTA BANNER
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#071A31] via-[#0B2545] to-[#0A2240] text-white py-20 border-t border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
                Setup Takes Less Than 15 Minutes
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Ready to elevate your school’s academic operations?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
                Join forward-thinking school heads and administrators across Ghana. Experience automated roll calls, instant MoMo fee recovery, and streamlined report cards today.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-8 py-3.5 rounded-xl bg-white text-[#0B2545] font-black text-sm hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Register Your School Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all cursor-pointer"
                >
                  Launch Interactive Demo
                </button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 max-w-sm w-full group">
                <img
                  src="/assets/ghana_classroom_crisp.jpg"
                  alt="Ghanaian classroom pupils studying"
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          12. FOOTER
          ========================================================================= */}
      <footer id="contact" className="bg-[#050E1A] text-slate-400 py-16 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Col 1 */}
            <div className="space-y-3 md:col-span-2 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white text-[#0B2545] flex items-center justify-center font-black text-sm shadow-sm">
                  <GraduationCap className="w-5 h-5 text-[#0B2545]" />
                </div>
                <span className="font-extrabold text-white text-xl">SchoolOS</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                The smart operating system for modern Ghanaian private Basic & Junior High Schools. Dedicated to improving student outcomes and saving administrative time.
              </p>
              <div className="flex items-center gap-4 text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Accra • Kumasi • Takoradi, Ghana</span>
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="space-y-2.5 text-left">
              <p className="font-bold text-white text-xs uppercase tracking-wider">Quick Navigation</p>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Platform Features</button></li>
                <li><button onClick={() => scrollTo('platform-roles')} className="hover:text-white transition-colors">Role Portals</button></li>
                <li><button onClick={() => scrollTo('calculator')} className="hover:text-white transition-colors">Revenue Calculator</button></li>
                <li><button onClick={() => scrollTo('report-cards')} className="hover:text-white transition-colors">GES Report Cards</button></li>
                <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">School Pricing</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-2.5 text-left">
              <p className="font-bold text-white text-xs uppercase tracking-wider">Stakeholders</p>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => handleLaunchRoleDemo('school_admin')} className="hover:text-white transition-colors">Headmaster / Admin</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('teacher')} className="hover:text-white transition-colors">Class Teacher Desk</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('accountant')} className="hover:text-white transition-colors">Bursar & Finance</button></li>
                <li><button onClick={() => handleLaunchRoleDemo('parent')} className="hover:text-white transition-colors">Parent Portal</button></li>
              </ul>
            </div>
          </div>

          {/* Legal Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} SchoolOS Platform. Built for Ghanaian & West African Schools.</p>
            <div className="flex items-center gap-6">
              <button onClick={() => setIsDemoModalOpen(true)} className="hover:text-slate-300 transition-colors">
                Live Interactive Sandbox
              </button>
              <button onClick={() => setAuthScreen('login')} className="hover:text-slate-300 transition-colors">
                Staff Sign In
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          13. INTERACTIVE LIVE ROLE DEMO MODAL
          ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-fade-in-scale">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0B2545] text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-[#0B2545] text-base">Select Live Stakeholder Demo</h3>
                  <p className="text-[11px] text-slate-500">Instant access • No credentials required</p>
                </div>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed text-left">
              Choose an administrative role to immediately experience SchoolOS in an interactive demonstration environment:
            </p>

            <div className="space-y-2.5 text-left">
              <button
                onClick={() => handleLaunchRoleDemo('school_admin')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">👔 Headmaster / School Administrator</p>
                  <p className="text-[11px] text-slate-500">School cockpit, teacher oversight & roster directory</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('teacher')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/80 border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">👩‍🏫 Class Teacher / Form Master</p>
                  <p className="text-[11px] text-slate-500">Fast 30-sec roll call & markbook continuous assessment</p>
                </div>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('accountant')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">💼 Bursar & Financial Cashier</p>
                  <p className="text-[11px] text-slate-500">MoMo fee receipts, feeding fees ledger & arrears</p>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('parent')}
                className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50/80 border border-slate-200 hover:border-pink-300 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">👨‍👩‍👧 Parent & Guardian Portal</p>
                  <p className="text-[11px] text-slate-500">Terminal report cards, daily attendance & MoMo payment</p>
                </div>
                <ArrowRight className="w-4 h-4 text-pink-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  setAuthScreen('signup');
                }}
                className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
              >
                Or register a brand new school account →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

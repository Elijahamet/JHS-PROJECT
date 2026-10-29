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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPageView: React.FC = () => {
  const { setAuthScreen, setUserRole } = useApp();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Smooth scrolling helper
  const scrollTo = (id: string) => {
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

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-[#0B2545] selection:text-white">
      {/* =========================================================================
          1. HEADER / NAVIGATION
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0B2545] flex items-center justify-center text-white shadow-sm group-hover:scale-110 group-hover:rotate-[-4deg] transition-all duration-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl text-[#0B2545] tracking-tight group-hover:text-blue-900 transition-colors">
              SchoolOS
            </span>
          </div>

          {/* Navigation Links with Hover Underline Animations */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
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
              onClick={() => scrollTo('solutions')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Solutions</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>How It Works</span>
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
              onClick={() => scrollTo('contact')}
              className="relative hover:text-[#0B2545] transition-colors py-1 group"
            >
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0B2545] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Action Buttons: Sign In + Sign Up */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthScreen('login')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0B2545] hover:bg-slate-50 rounded-xl transition-all"
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthScreen('signup')}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION WITH FLOATING DASHBOARD & ANIMATIONS
          ========================================================================= */}
      <section id="hero" className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-white">
        {/* Subtle Ambient Glowing Aura in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-6 space-y-6 text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[#2563EB] text-xs font-extrabold tracking-wider uppercase shadow-2xs">
                <span>SCHOOL MANAGEMENT SOFTWARE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#0B2545] tracking-tight leading-[1.12]">
                The operating system for modern schools.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                SchoolOS helps private schools manage students, fees, attendance, communication and more — all in one place. Save time, reduce workload and create a better learning experience for everyone.
              </p>

              {/* Action Buttons: Sign Up + Explore Features */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-7 py-3.5 text-sm font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => scrollTo('features')}
                  className="px-7 py-3.5 text-sm font-semibold text-slate-700 hover:text-[#0B2545] bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:shadow-sm active:scale-95 transition-all duration-200"
                >
                  Explore Features
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Pupils */}
            <div className="lg:col-span-6 relative w-full flex items-center justify-center">
              {/* Authentic Photo of Ghanaian Pupils - Sized Elegantly */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-100 w-full max-w-sm sm:max-w-md lg:max-w-[440px] relative group">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian school pupils smiling together in school courtyard"
                  className="w-full h-64 sm:h-76 lg:h-[350px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION: THE CHALLENGE
          ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#0B2545] text-white relative overflow-hidden border-t border-slate-800">
        {/* Subtle ambient radial gradient in background for richness */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-extrabold text-blue-400 tracking-wider uppercase">
              THE CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-white tracking-tight">
              Running a school is complex.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              From student management to fee collection, communication and transport, schools face many daily challenges. SchoolOS brings everything together in one simple, powerful platform.
            </p>
          </div>

          {/* 4 Cards Grid with Smooth Hover Lift & Icon Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="group p-7 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-blue-400/50 hover:bg-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FileEdit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                Manual record keeping
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Time-consuming and error-prone processes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-7 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-blue-400/50 hover:bg-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                Lost communication
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Important information gets missed or delayed.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-7 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-blue-400/50 hover:bg-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                Fee collection struggles
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Tracking school and feeding fees is difficult.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-7 rounded-2xl bg-white/5 backdrop-blur-xs border border-white/10 hover:border-blue-400/50 hover:bg-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 space-y-4 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                Poor visibility
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Hard to get real-time updates on attendance, performance and operations.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SECTION: KEY FEATURES
          ========================================================================= */}
      <section id="features" className="relative py-24 md:py-32 bg-gradient-to-b from-white via-slate-50/80 to-blue-50/20 border-t border-slate-100 overflow-hidden">
        {/* Subtle background ambient glow flares */}
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-indigo-300/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>INTEGRATED SCHOOL MANAGEMENT PLATFORM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0B2545] tracking-tight leading-tight">
              Everything you need in <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">one modern platform</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Say goodbye to fragmented paper registers and manual spreadsheets. SchoolOS brings every Ghanaian school workflow into one connected, intuitive dashboard.
            </p>
          </div>

          {/* 8 Features Grid (4 x 2) with Interactive Card Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Student Management */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-blue-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-blue-500/10" />
              <Users className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Users className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Bio & Rosters
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-blue-700 transition-colors">
                    Student Management
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Keep detailed student records, emergency contacts, parent linkages, and class allocations in one synchronized hub.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  Ghanaian JHS Streams
                </span>
              </div>
            </div>

            {/* 2. Attendance */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-emerald-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-emerald-500/10" />
              <CalendarCheck className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <CalendarCheck className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Daily Roll Call
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-emerald-700 transition-colors">
                    Attendance
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Record daily class attendance in real-time, monitor punctuality trends, and trigger instant absentee notices to guardians.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  SMS Absentee Alerts
                </span>
              </div>
            </div>

            {/* 3. Results & Reports */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-amber-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-amber-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-amber-500/10" />
              <Award className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Award className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    GES / WAEC
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-amber-700 transition-colors">
                    Results & Reports
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Manage continuous assessments (SBA), auto-calculate positions, and generate verified, stamped terminal PDF report cards.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  1-Click PDF Dispatch
                </span>
              </div>
            </div>

            {/* 4. School Fees */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-indigo-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-indigo-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-indigo-500/10" />
              <CreditCard className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <CreditCard className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Bursary Hub
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-indigo-700 transition-colors">
                    School Fees
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Admin-controlled term tuition fee schedules, automated arrears tracking, and official stamped digital receipts.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  Manual Admin Pricing
                </span>
              </div>
            </div>

            {/* 5. Feeding Fees */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-rose-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-rose-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-rose-500/10" />
              <Utensils className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Utensils className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Canteen Ledger
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-rose-700 transition-colors">
                    Feeding Fees
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Dedicated financial ledger strictly isolated from school tuition. Track student meal subscriptions and daily billing.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  Strict Ledger Isolation
                </span>
              </div>
            </div>

            {/* 6. Transport */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-cyan-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-cyan-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-cyan-500/10" />
              <Bus className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Bus className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Route Logistics
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-cyan-700 transition-colors">
                    Transport
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Coordinate school bus fleet, assign pickup stops and driver contacts, and streamline transportation billing.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  Pick-up & Drop Points
                </span>
              </div>
            </div>

            {/* 7. Admissions */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-violet-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-violet-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-violet-500/10" />
              <FilePlus className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <FilePlus className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Intake Pipeline
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-violet-700 transition-colors">
                    Admissions
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Simplify prospective pupil applications, review submission files, and seamlessly enroll pupils into active classrooms.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  Instant Class Allocation
                </span>
              </div>
            </div>

            {/* 8. Communication */}
            <div className="group relative rounded-3xl bg-white/95 backdrop-blur-xs border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-2xl hover:shadow-teal-900/10 hover:-translate-y-2.5 transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden cursor-default hover:border-teal-300">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-teal-500/10" />
              <MessageSquare className="absolute -right-4 -top-4 w-28 h-28 text-slate-900 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <MessageSquare className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 group-hover:bg-[#0B2545] group-hover:text-white transition-colors duration-300 border border-slate-200/60">
                    Omni-channel
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0B2545] tracking-tight group-hover:text-teal-700 transition-colors">
                    Communication
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal mt-1.5">
                    Direct chat between parents and teachers, bulk SMS broadcasts, and instant school notices delivered to mobile devices.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                <span className="font-semibold text-slate-600 text-[11px]">
                  SMS & Parent Portal
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION: SEE IT IN ACTION
          ========================================================================= */}
      <section id="solutions" className="py-20 md:py-28 bg-[#0B2545] text-white relative overflow-hidden border-t border-slate-800">
        {/* Subtle glowing ambient lights in background */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Photo: Ghanaian Pupil in Uniform Holding Books */}
            <div className="lg:col-span-4 flex justify-center w-full">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-[280px] sm:max-w-xs group bg-slate-900">
                <img
                  src="/assets/ghana_pupil_books.jpg"
                  alt="Ghanaian primary school pupil smiling with textbooks"
                  className="w-full h-80 sm:h-96 lg:h-[410px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Center: Details & Feature Checklist */}
            <div className="lg:col-span-4 space-y-5 text-left w-full">
              <span className="text-xs font-extrabold text-blue-400 tracking-wider uppercase">
                SEE IT IN ACTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                A complete view of your school
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Get a clear overview of your school's performance, finances, attendance and more — all from a modern, easy-to-use dashboard.
              </p>

              {/* Bullet Points with Hover Glow */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200 font-medium pt-2">
                <li className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Beautiful and intuitive interface</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Works on desktop, tablet and mobile</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Role-based access for different users</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>Real-time updates and notifications</span>
                </li>
              </ul>

              <div className="pt-3">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-7 py-3 text-sm font-bold text-[#0B2545] bg-white hover:bg-slate-100 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: Dual Device Previews (Desktop Analytics + Mobile Smartphone) */}
            <div className="lg:col-span-4 flex items-center justify-center relative w-full overflow-hidden sm:overflow-visible py-4">
              {/* Desktop Dashboard Card with Subtle Inverse Float */}
              <div className="w-48 sm:w-56 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-3.5 space-y-2 opacity-95 hidden sm:block animate-float-reverse shrink-0">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[11px] font-bold text-white">
                  <span>Class Performance</span>
                  <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Live
                  </span>
                </div>
                <div className="h-16 bg-white/5 rounded-xl border border-white/10 p-2 flex items-end justify-between gap-1.5">
                  <div className="w-3 bg-blue-400 rounded-t h-[55%] transition-all hover:h-[70%]"></div>
                  <div className="w-3 bg-blue-500 rounded-t h-[70%] transition-all hover:h-[80%]"></div>
                  <div className="w-3 bg-blue-600 rounded-t h-[88%] transition-all hover:h-[95%]"></div>
                  <div className="w-3 bg-blue-300 rounded-t h-[80%] transition-all hover:h-[90%]"></div>
                  <div className="w-3 bg-emerald-400 rounded-t h-[95%] transition-all hover:h-full"></div>
                </div>
                <div className="space-y-1 text-[9px] text-slate-300 pt-1">
                  <div className="flex justify-between">
                    <span>Average Attendance</span>
                    <span className="font-extrabold text-white">96.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MoMo Fee Recovery</span>
                    <span className="font-extrabold text-emerald-400">92.8%</span>
                  </div>
                </div>
              </div>

              {/* Mobile Phone Device Mockup with Float Animation */}
              <div className="w-52 sm:w-56 -ml-8 sm:-ml-12 rounded-[2.2rem] bg-white border-4 border-slate-900 shadow-2xl p-3 space-y-2.5 z-10 ring-4 sm:ring-8 ring-white/10 animate-float-slow shrink-0 text-slate-900">
                <div className="w-12 h-1 bg-slate-900 rounded-full mx-auto mb-1"></div>
                <div className="flex justify-between items-center text-[9px] text-slate-400 px-1">
                  <span className="font-extrabold text-[#0B2545]">SchoolOS Mobile</span>
                  <span>9:41 AM</span>
                </div>
                
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 hover:bg-slate-100 transition-colors">
                  <p className="text-[9px] text-slate-500 font-medium">Good morning, Parent</p>
                  <p className="font-extrabold text-[#0B2545] text-xs">Kwame Mensah</p>
                  <p className="text-[9px] text-slate-500">Class: Basic 5a</p>
                  <div className="flex items-center gap-1.5 text-[9px] text-emerald-700 font-bold mt-1 bg-emerald-50 px-1.5 py-0.5 rounded w-fit">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Attendance: Present</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-[9px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Latest Result</span>
                    <span className="font-extrabold text-[#0B2545]">88% Average</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Fees Balance</span>
                    <span className="font-extrabold text-rose-600">GH₵ 450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Transport</span>
                    <span className="font-extrabold text-blue-600">Bus 3 En Route</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 flex justify-around text-[9px] text-slate-400 font-bold">
                  <span className="text-blue-600 cursor-pointer">Home</span>
                  <span className="hover:text-slate-700 cursor-pointer">Results</span>
                  <span className="hover:text-slate-700 cursor-pointer">Fees</span>
                  <span className="hover:text-slate-700 cursor-pointer">More</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION: HOW IT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B2545] tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Choose the plan that fits your school's needs. All plans include core features and can be upgraded as your school grows.
            </p>
          </div>

          {/* 3 Steps with Hover Effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            
            {/* Step 1: Sign Up */}
            <div className="group text-center space-y-4 p-7 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2563EB] border-2 border-blue-200 flex items-center justify-center font-black text-lg mx-auto shadow-sm group-hover:scale-110 group-hover:bg-[#0B2545] group-hover:text-white transition-all duration-300">
                1
              </div>
              <h3 className="text-lg font-bold text-[#0B2545] group-hover:text-blue-900 transition-colors">Sign Up</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Register your school account in seconds to begin setting up your institution.
              </p>
            </div>

            {/* Step 2: Set Up Your School */}
            <div className="group text-center space-y-4 p-7 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2563EB] border-2 border-blue-200 flex items-center justify-center font-black text-lg mx-auto shadow-sm group-hover:scale-110 group-hover:bg-[#0B2545] group-hover:text-white transition-all duration-300">
                2
              </div>
              <h3 className="text-lg font-bold text-[#0B2545] group-hover:text-blue-900 transition-colors">Set Up Your School</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We'll help you configure your school, import your data and set up your preferences.
              </p>
            </div>

            {/* Step 3: Start Managing */}
            <div className="group text-center space-y-4 p-7 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2563EB] border-2 border-blue-200 flex items-center justify-center font-black text-lg mx-auto shadow-sm group-hover:scale-110 group-hover:bg-[#0B2545] group-hover:text-white transition-all duration-300">
                3
              </div>
              <h3 className="text-lg font-bold text-[#0B2545] group-hover:text-blue-900 transition-colors">Start Managing</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Your team gets access and you start enjoying a more organized, efficient school.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. SECTION: PRICING
          ========================================================================= */}
      <section id="pricing" className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-extrabold text-[#2563EB] tracking-wider uppercase">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#0B2545] tracking-tight">
              Plans for every school size
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Flexible pricing designed for private primary and JHS schools.
            </p>
          </div>

          {/* Pricing Grid with Elevated Cards and Smooth Hover Interactions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Card 1: Basic */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Basic</h3>
                  <p className="text-xs text-slate-500 mt-1">Perfect for small schools getting started.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B2545]">GH₵ 1,200</span>
                  <span className="text-xs text-slate-500 font-semibold"> / month</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 pt-5 border-t border-slate-100">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Up to 200 students</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Student & teacher management</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Attendance tracking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Basic reporting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-xs sm:text-sm font-bold text-slate-800 active:scale-95 transition-all"
              >
                Sign Up Free
              </button>
            </div>

            {/* Card 2: Professional (Featured with 'Most Popular') */}
            <div className="p-8 rounded-2xl bg-white border-2 border-[#0B2545] shadow-xl hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 right-6 px-3.5 py-1 bg-[#0B2545] text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                Most Popular
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Professional</h3>
                  <p className="text-xs text-slate-500 mt-1">For growing schools with more needs.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B2545]">GH₵ 2,500</span>
                  <span className="text-xs text-slate-500 font-semibold"> / month</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 pt-5 border-t border-slate-100">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Up to 500 students</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>All core features</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Financial management</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Parent & teacher portal</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Advanced reporting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-3 rounded-xl bg-[#0B2545] hover:bg-[#071A31] text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
              >
                Sign Up
              </button>
            </div>

            {/* Card 3: Enterprise */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Enterprise</h3>
                  <p className="text-xs text-slate-500 mt-1">For large schools and multiple campuses.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0B2545]">GH₵ 4,500</span>
                  <span className="text-xs text-slate-500 font-semibold"> / month</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 pt-5 border-t border-slate-100">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Unlimited students</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Multi-school support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-xs sm:text-sm font-bold text-slate-800 active:scale-95 transition-all"
              >
                Contact Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8. DARK NAVY CTA BANNER (WITH SIGN UP BUTTON)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#0A2240] via-[#0B2545] to-[#071A31] text-white py-16 border-t border-slate-800 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Ready to transform your school?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
                Join the growing number of schools using SchoolOS to save time, reduce costs and improve learning outcomes.
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setAuthScreen('signup')}
                  className="px-8 py-3.5 rounded-xl bg-white text-[#0B2545] font-bold text-sm hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all shadow-md flex items-center gap-2 group"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-7 py-3.5 rounded-xl bg-transparent border border-white/40 text-white font-semibold text-sm hover:bg-white/10 hover:border-white transition-all active:scale-95"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Photo Strip & Slogan */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 w-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 w-full max-w-xs group">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian school pupils"
                  className="w-full h-40 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-left space-y-2.5">
                <p className="text-lg font-extrabold tracking-tight text-white leading-tight">
                  Better systems.<br />Brighter futures.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-white text-[#0B2545] flex items-center justify-center font-black text-xs shadow-sm">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-base text-white">SchoolOS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          9. DARK FOOTER
          ========================================================================= */}
      <footer id="contact" className="bg-[#071524] text-slate-400 py-14 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            {/* Logo & Description */}
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white text-[#0B2545] flex items-center justify-center font-black text-xs shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-white text-lg">SchoolOS</span>
              </div>
              <p className="text-[11px] text-slate-400">
                The operating system for modern schools.
              </p>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-semibold">
              <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors">Solutions</button>
              <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">Pricing</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#linkedin" title="LinkedIn" className="hover:text-white hover:scale-110 transition-all"><Linkedin className="w-4 h-4" /></a>
              <a href="#twitter" title="Twitter" className="hover:text-white hover:scale-110 transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#facebook" title="Facebook" className="hover:text-white hover:scale-110 transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#youtube" title="YouTube" className="hover:text-white hover:scale-110 transition-all"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Legal Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2025 SchoolOS. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>

      {/* =========================================================================
          DEMO / ROLE MODAL (For 'View Demo' Triggers)
          ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5 animate-fade-in-scale">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0B2545] text-white flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-[#0B2545] text-base">Select Live Demo Experience</h3>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Explore SchoolOS as any of the specialized stakeholders. No registration required to test-drive.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleLaunchRoleDemo('school_admin')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group shadow-2xs hover:shadow-xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Headteacher / Administrator</p>
                  <p className="text-[11px] text-slate-500">Full school governance, attendance & report cards</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('teacher')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group shadow-2xs hover:shadow-xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Class Teacher / Form Master</p>
                  <p className="text-[11px] text-slate-500">Fast roll call, continuous assessment markbooks</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('accountant')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group shadow-2xs hover:shadow-xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Bursar & Finance Desk</p>
                  <p className="text-[11px] text-slate-500">School fees, feeding fees, Mobile Money reconciliation</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('parent')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group shadow-2xs hover:shadow-xs"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Parent & Guardian</p>
                  <p className="text-[11px] text-slate-500">Terminal report cards, daily attendance & fee payments</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setIsDemoModalOpen(false);
                  setAuthScreen('signup');
                }}
                className="text-xs font-bold text-[#2563EB] hover:underline"
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

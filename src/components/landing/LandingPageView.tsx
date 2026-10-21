import React, { useState } from 'react';
import {
  GraduationCap,
  Shield,
  User,
  Users,
  Check,
  CalendarCheck,
  Award,
  FileText,
  CreditCard,
  Utensils,
  Bus,
  MessageSquare,
  FileEdit,
  Eye,
  AlertCircle,
  FilePlus,
  ArrowRight,
  Play,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Lock,
  ChevronRight,
  TrendingUp,
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
          1. NAVIGATION HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0B2545] flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl text-[#0B2545] tracking-tight">
              SchoolOS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => scrollTo('hero')}
              className="hover:text-[#0B2545] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('features')}
              className="hover:text-[#0B2545] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollTo('solutions')}
              className="hover:text-[#0B2545] transition-colors"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="hover:text-[#0B2545] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="hover:text-[#0B2545] transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="hover:text-[#0B2545] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthScreen('login')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B2545] transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-lg shadow-sm transition-all"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION
          ========================================================================= */}
      <section id="hero" className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-block text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                SCHOOL MANAGEMENT SOFTWARE
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B2545] tracking-tight leading-[1.12]">
                The operating system for modern schools.
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                SchoolOS helps private schools manage students, fees, attendance, communication and more — all in one place. Save time, reduce workload and create a better learning experience for everyone.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-7 py-3 text-sm font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Book a Demo
                </button>
                <button
                  onClick={() => scrollTo('features')}
                  className="px-6 py-3 text-sm font-semibold text-slate-700 hover:text-[#0B2545] bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Explore Features
                </button>
              </div>

              {/* 3 Value Propositions */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-700" />
                  <span>Secure & Reliable</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-700" />
                  <span>Easy to Use</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-slate-700" />
                  <span>Built for Ghanaian Schools</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Real Pupils & Overlapping Dashboard UI */}
            <div className="lg:col-span-6 relative">
              {/* Authentic Photo of Ghanaian Pupils */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-100 max-w-md ml-auto">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian school pupils smiling together in classroom"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
              </div>

              {/* Overlapping Realistic Desktop Dashboard Mockup */}
              <div className="mt-[-90px] sm:mt-[-120px] mr-auto lg:mr-12 max-w-lg rounded-2xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden text-xs relative z-10 transition-all hover:shadow-2xl">
                {/* Dashboard Frame Header */}
                <div className="bg-[#0B2545] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="font-bold text-[11px] ml-1 tracking-tight">SchoolOS Administration</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">Bright Future Academy</span>
                </div>

                {/* Dashboard Inner Layout */}
                <div className="flex bg-slate-50">
                  {/* Miniature Sidebar */}
                  <div className="w-32 bg-[#0B2545] text-slate-300 p-2.5 space-y-1.5 shrink-0 hidden sm:block">
                    <div className="px-2 py-1 rounded bg-blue-600/30 text-white font-bold text-[10px]">Dashboard</div>
                    <div className="px-2 py-1 text-slate-400 text-[10px]">Students</div>
                    <div className="px-2 py-1 text-slate-400 text-[10px]">Teachers</div>
                    <div className="px-2 py-1 text-slate-400 text-[10px]">Attendance</div>
                    <div className="px-2 py-1 text-slate-400 text-[10px]">Fees Ledger</div>
                    <div className="px-2 py-1 text-slate-400 text-[10px]">Reports & Card</div>
                  </div>

                  {/* Miniature Content Area */}
                  <div className="flex-1 p-3.5 space-y-3">
                    {/* Greeting */}
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs">Good morning, Admin.</p>
                      <p className="text-[10px] text-slate-500">Here's what's happening today.</p>
                    </div>

                    {/* Stat Cards Row */}
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <p className="text-[9px] text-slate-500 font-medium">Students</p>
                        <p className="font-extrabold text-[#0B2545] text-xs">428</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <p className="text-[9px] text-slate-500 font-medium">Teachers</p>
                        <p className="font-extrabold text-[#0B2545] text-xs">36</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <p className="text-[9px] text-slate-500 font-medium">Classes</p>
                        <p className="font-extrabold text-[#0B2545] text-xs">18</p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        <p className="text-[9px] text-slate-500 font-medium">Attendance</p>
                        <p className="font-extrabold text-emerald-600 text-xs">94%</p>
                      </div>
                    </div>

                    {/* Financial & Attendance Snapshot */}
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                        <p className="font-bold text-slate-700">Financial Overview</p>
                        <p className="text-emerald-700 font-extrabold">GH₵ 48,750 <span className="text-[9px] text-slate-400 font-normal">Collected</span></p>
                        <p className="text-slate-500 text-[9px]">GH₵ 12,350 Outstanding</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                        <p className="font-bold text-slate-700">Recent Payment</p>
                        <p className="font-semibold text-slate-800">Akua Boateng</p>
                        <span className="inline-block px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px]">
                          GH₵ 1,500 • Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION: THE CHALLENGE
          ========================================================================= */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              THE CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Running a school is complex.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              From student management to fee collection, communication and transport, schools face many daily challenges. SchoolOS brings everything together in one simple, powerful platform.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <FileEdit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                Manual record keeping
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Time-consuming and error-prone processes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                Lost communication
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Important information gets missed or delayed.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                Fee collection struggles
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tracking school and feeding fees is difficult.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">
                Poor visibility
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hard to get real-time updates on attendance, performance and operations.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SECTION: KEY FEATURES
          ========================================================================= */}
      <section id="features" className="py-16 md:py-24 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              KEY FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Everything you need in one platform
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              SchoolOS gives you the tools to manage your school efficiently, improve communication and focus on what matters most — education.
            </p>
          </div>

          {/* 8 Features Grid (4 x 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Student Management */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Student Management</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keep detailed student records and profiles.
              </p>
            </div>

            {/* 2. Attendance */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Attendance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track attendance in real-time and improve accountability.
              </p>
            </div>

            {/* 3. Results & Reports */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Results & Reports</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage grades, generate report cards and track performance.
              </p>
            </div>

            {/* 4. School Fees */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">School Fees</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handle tuition, registration and other fees with ease.
              </p>
            </div>

            {/* 5. Feeding Fees */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Feeding Fees</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Manage meal plans and feeding fee collection.
              </p>
            </div>

            {/* 6. Transport */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Bus className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Transport</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinate buses, routes and pickup locations.
              </p>
            </div>

            {/* 7. Admissions */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <FilePlus className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Admissions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Simplify the application and enrollment process.
              </p>
            </div>

            {/* 8. Communication */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B2545]">Communication</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keep parents informed with announcements and updates.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. SECTION: SEE IT IN ACTION
          ========================================================================= */}
      <section id="solutions" className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Photo: Ghanaian Pupil in Uniform Holding Books */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 max-w-sm">
                <img
                  src="/assets/ghana_students_running.png"
                  alt="Ghanaian school pupil in uniform holding notebooks"
                  className="w-full h-96 object-cover object-top"
                />
              </div>
            </div>

            {/* Center: Details & Feature Checklist */}
            <div className="lg:col-span-4 space-y-5 text-left">
              <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
                SEE IT IN ACTION
              </span>
              <h2 className="text-3xl font-extrabold text-[#0B2545] tracking-tight leading-snug">
                A complete view of your school
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Get a clear overview of your school's performance, finances, attendance and more — all from a modern, easy-to-use dashboard.
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>Beautiful and intuitive interface</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>Works on desktop, tablet and mobile</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>Role-based access for different users</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                  <span>Real-time updates and notifications</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#071A31] rounded-lg shadow-sm transition-all"
                >
                  View Demo
                </button>
              </div>
            </div>

            {/* Right: Dual Device Previews (Desktop + Smartphone) */}
            <div className="lg:col-span-4 flex items-center justify-center relative">
              {/* Desktop Dashboard Card */}
              <div className="w-56 sm:w-64 rounded-xl bg-white border border-slate-200 shadow-md p-3 space-y-2 opacity-95 hidden sm:block">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-[10px] font-bold text-slate-700">
                  <span>Dashboard Preview</span>
                  <span className="text-emerald-600">● Live</span>
                </div>
                <div className="h-16 bg-slate-50 rounded border border-slate-100 p-1 flex items-end justify-between gap-1">
                  <div className="w-3 bg-blue-500 rounded-t h-[60%]"></div>
                  <div className="w-3 bg-blue-500 rounded-t h-[75%]"></div>
                  <div className="w-3 bg-blue-500 rounded-t h-[90%]"></div>
                  <div className="w-3 bg-blue-600 rounded-t h-[80%]"></div>
                  <div className="w-3 bg-blue-600 rounded-t h-[95%]"></div>
                </div>
                <div className="space-y-1 text-[9px] text-slate-500">
                  <div className="flex justify-between">
                    <span>Term Attendance</span>
                    <span className="font-bold text-slate-700">96.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fees Recovery</span>
                    <span className="font-bold text-emerald-600">92.8%</span>
                  </div>
                </div>
              </div>

              {/* Mobile Phone Device Mockup */}
              <div className="w-52 sm:w-56 -ml-10 sm:-ml-12 rounded-[2rem] bg-white border-4 border-slate-800 shadow-2xl p-3 space-y-2.5 z-10">
                <div className="w-12 h-1 bg-slate-800 rounded-full mx-auto mb-1"></div>
                <div className="flex justify-between items-center text-[9px] text-slate-400">
                  <span className="font-bold text-[#0B2545]">SchoolOS</span>
                  <span>9:41 AM</span>
                </div>
                
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <p className="text-[9px] text-slate-500 font-medium">Good morning, Parent</p>
                  <p className="font-bold text-[#0B2545] text-xs">Kwame Mensah</p>
                  <p className="text-[9px] text-slate-500">Class: Basic 5a</p>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-600 font-bold mt-1">
                    <Check className="w-3 h-3" />
                    <span>Attendance: Present</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-[9px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Latest Result</span>
                    <span className="font-bold text-[#0B2545]">88% Average</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fees Balance</span>
                    <span className="font-bold text-rose-600">GH₵ 450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transport</span>
                    <span className="font-bold text-blue-600">Bus 3 En Route</span>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-100 flex justify-around text-[9px] text-slate-400 font-semibold">
                  <span className="text-blue-600">Home</span>
                  <span>Results</span>
                  <span>Fees</span>
                  <span>More</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION: HOW IT WORKS
          ========================================================================= */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Choose the plan that fits your school's needs. All plans include core features and can be upgraded as your school grows.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center font-bold text-base mx-auto">
                1
              </div>
              <h3 className="text-lg font-bold text-[#0B2545]">Book a Demo</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Schedule a demo with our team to see SchoolOS in action and discuss your school's needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center font-bold text-base mx-auto">
                2
              </div>
              <h3 className="text-lg font-bold text-[#0B2545]">Set Up Your School</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                We'll help you configure your school, import your data and set up your preferences.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 flex items-center justify-center font-bold text-base mx-auto">
                3
              </div>
              <h3 className="text-lg font-bold text-[#0B2545]">Start Managing</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Your team gets access and you start enjoying a more organized, efficient school.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. SECTION: PRICING
          ========================================================================= */}
      <section id="pricing" className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase">
              PRICING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Plans for every school size
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Flexible pricing designed for private primary and JHS schools.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Card 1: Basic */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Basic</h3>
                  <p className="text-xs text-slate-500 mt-1">Perfect for small schools getting started.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-[#0B2545]">GH₵ 1,200</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Up to 200 students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Student & teacher management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Attendance tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Basic reporting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Card 2: Professional (Featured with 'Most Popular') */}
            <div className="p-8 rounded-2xl bg-white border-2 border-[#0B2545] shadow-xl relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#0B2545] text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Professional</h3>
                  <p className="text-xs text-slate-500 mt-1">For growing schools with more needs.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-[#0B2545]">GH₵ 2,500</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Up to 500 students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>All core features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Financial management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Parent & teacher portal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Advanced reporting</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setAuthScreen('signup')}
                className="w-full py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#071A31] text-xs font-bold text-white shadow transition-all"
              >
                Get Started
              </button>
            </div>

            {/* Card 3: Enterprise */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B2545]">Enterprise</h3>
                  <p className="text-xs text-slate-500 mt-1">For large schools and multiple campuses.</p>
                </div>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-[#0B2545]">GH₵ 4,500</span>
                  <span className="text-xs text-slate-500"> / month</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 pt-4 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Unlimited students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Multi-school support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 transition-colors"
              >
                Contact Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          8. DARK NAVY CTA BANNER
          ========================================================================= */}
      <section className="bg-[#0B2545] text-white py-14 border-t border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to transform your school?
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg leading-relaxed">
                Join the growing number of schools using SchoolOS to save time, reduce costs and improve learning outcomes.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-2.5 rounded-lg bg-white text-[#0B2545] font-bold text-xs hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Book a Demo
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-6 py-2.5 rounded-lg bg-transparent border border-white/40 text-white font-semibold text-xs hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Photo Strip & Slogan */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-end gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 max-w-xs">
                <img
                  src="/assets/ghana_students_hero.jpg"
                  alt="Ghanaian school pupils"
                  className="w-full h-36 object-cover object-center"
                />
              </div>
              <div className="text-left space-y-2">
                <p className="text-base font-bold tracking-tight text-white leading-tight">
                  Better systems.<br />Brighter futures.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white text-[#0B2545] flex items-center justify-center font-black text-xs">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-extrabold text-sm text-white">SchoolOS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          9. DARK FOOTER
          ========================================================================= */}
      <footer id="contact" className="bg-[#071524] text-slate-400 py-12 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
            {/* Logo & Description */}
            <div className="space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white text-[#0B2545] flex items-center justify-center font-black text-xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-white text-lg">SchoolOS</span>
              </div>
              <p className="text-[11px] text-slate-400">
                The operating system for modern schools.
              </p>
            </div>

            {/* Nav Links */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
              <button onClick={() => scrollTo('hero')} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => scrollTo('features')} className="hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollTo('solutions')} className="hover:text-white transition-colors">Solutions</button>
              <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">Pricing</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">Contact</button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#linkedin" title="LinkedIn" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#twitter" title="Twitter" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#facebook" title="Facebook" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#youtube" title="YouTube" className="hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
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
          DEMO / ROLE MODAL (For 'Book a Demo' & 'View Demo' Triggers)
          ========================================================================= */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-5 animate-fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0B2545] text-white flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-[#0B2545] text-base">Select Live Demo Experience</h3>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
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
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Headteacher / Administrator</p>
                  <p className="text-[11px] text-slate-500">Full school governance, attendance & report cards</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('teacher')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Class Teacher / Form Master</p>
                  <p className="text-[11px] text-slate-500">Fast roll call, continuous assessment markbooks</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('accountant')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-bold text-xs text-[#0B2545]">Bursar & Finance Desk</p>
                  <p className="text-[11px] text-slate-500">School fees, feeding fees, Mobile Money reconciliation</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleLaunchRoleDemo('parent')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-left transition-all flex items-center justify-between group"
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

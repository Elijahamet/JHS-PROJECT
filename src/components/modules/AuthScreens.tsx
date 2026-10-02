import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shield,
  Eye,
  EyeOff,
  Building2,
  User,
  Phone,
  MapPin,
  School as SchoolIcon,
  Check,
  GraduationCap,
  Award,
  BookOpen,
  CreditCard,
  Users,
  HelpCircle,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthScreens: React.FC = () => {
  const { authScreen, setAuthScreen, setUserRole, setCurrentSchool } = useApp();

  // Selected portal role for login
  const [selectedPortalRole, setSelectedPortalRole] = useState<'school_admin' | 'teacher' | 'accountant' | 'parent'>('school_admin');

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('admin@brightfutureacademy.edu.gh');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Form States
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupRole, setSignupRole] = useState<'school_admin' | 'teacher' | 'accountant' | 'parent'>('school_admin');
  const [schoolName, setSchoolName] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('Basic 1 - 6 & JHS 1 - 3');
  const [emisCode, setEmisCode] = useState('');
  const [region, setRegion] = useState('Greater Accra');
  const [city, setCity] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminDesignation, setAdminDesignation] = useState('Headmistress / Principal');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmSignupPassword, setConfirmSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Forgot / Reset Password States
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Auto-fill preset demo credentials per role
  const handleSelectPortalRole = (role: 'school_admin' | 'teacher' | 'accountant' | 'parent') => {
    setSelectedPortalRole(role);
    switch (role) {
      case 'school_admin':
        setLoginEmail('admin@brightfutureacademy.edu.gh');
        setLoginPassword('password123');
        break;
      case 'teacher':
        setLoginEmail('darko@brightfutureacademy.edu.gh');
        setLoginPassword('password123');
        break;
      case 'accountant':
        setLoginEmail('bursar@brightfutureacademy.edu.gh');
        setLoginPassword('password123');
        break;
      case 'parent':
        setLoginEmail('parent@brightfutureacademy.edu.gh');
        setLoginPassword('password123');
        break;
    }
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const em = loginEmail.toLowerCase();
    if (em.includes('teacher') || em.includes('darko')) {
      setUserRole('teacher');
    } else if (em.includes('bursar') || em.includes('accountant') || em.includes('boakye')) {
      setUserRole('accountant');
    } else if (em.includes('parent') || em.includes('osei')) {
      setUserRole('parent');
    } else {
      setUserRole(selectedPortalRole);
    }
    setAuthScreen('authenticated');
  };

  // Handle Signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupStep === 1) {
      if (!schoolName.trim()) {
        alert('Please enter your official School Name to proceed.');
        return;
      }
      setSignupStep(2);
      return;
    }

    if (signupPassword !== confirmSignupPassword) {
      alert('Passwords do not match. Please verify and re-enter.');
      return;
    }
    if (!agreeTerms) {
      alert('Please accept the Ghana Education Service (GES) data compliance terms.');
      return;
    }

    if (schoolName.trim()) {
      setCurrentSchool({
        id: `sch_${Date.now()}`,
        name: schoolName,
        motto: 'Knowledge, Integrity & Discipline',
        crestUrl: '/assets/school-crest.svg',
        address: `${city || 'High Street'}, ${region}`,
        city: city || 'Accra',
        region: region,
        country: 'Ghana',
        phone: adminPhone || '+233 24 000 0000',
        email: adminEmail || 'contact@school.edu.gh',
        website: 'https://schoolos.edu.gh',
        academicYear: '2024 / 2025',
        currentTerm: 'Term 2',
        studentCount: 0,
        teacherCount: 1,
        classesCount: 9,
        plan: 'Standard',
      });
    }

    setUserRole(signupRole);
    setSignupSuccess(true);
    setTimeout(() => {
      setAuthScreen('authenticated');
    }, 1200);
  };

  // Handle Forgot Password
  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  // Handle Reset Password
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password updated successfully! Logging into your portal...');
    setAuthScreen('authenticated');
  };

  const portalRoles = [
    {
      id: 'school_admin' as const,
      title: 'School Admin',
      subtitle: 'Headteacher & Board',
      icon: Shield,
      badge: 'Executive',
      color: 'blue',
    },
    {
      id: 'teacher' as const,
      title: 'Teaching Staff',
      subtitle: 'Form Masters & Faculty',
      icon: BookOpen,
      badge: 'Academic',
      color: 'indigo',
    },
    {
      id: 'accountant' as const,
      title: 'Bursary & Finance',
      subtitle: 'Fees & Accounts',
      icon: CreditCard,
      badge: 'Bursar',
      color: 'emerald',
    },
    {
      id: 'parent' as const,
      title: 'Parent & Guardian',
      subtitle: 'Student Portal & Fees',
      icon: Users,
      badge: 'Family',
      color: 'purple',
    },
  ];

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden bg-slate-900 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Ghana National Branding Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-600 shrink-0 z-20" />

      {/* ========================================================================= */}
      {/* 1. SIGN IN SCREEN                                                         */}
      {/* ========================================================================= */}
      {authScreen === 'login' && (
        <div className="h-full w-full flex flex-col lg:flex-row overflow-hidden bg-slate-50">
          {/* Left Hero Column: Authentic Editorial Brand Showcase */}
          <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 h-full overflow-hidden bg-slate-950 flex-col justify-between p-8 xl:p-10 shrink-0 border-r border-slate-800">
            {/* Background Image: Crisp, vibrant Ghanaian pupils clearly visible */}
            <img
              src="/assets/login-hero.jpg"
              alt="Ghanaian school pupils learning happily in classroom"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02] pointer-events-none"
            />

            {/* Subtle Directional Scrims: Center is open so pupils are clearly seen */}
            <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

            {/* Top Institutional Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md ring-1 ring-white/20 shrink-0">
                  SOS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-white tracking-tight leading-none drop-shadow">
                      SchoolOS
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/25 backdrop-blur-sm">
                      Ghana
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 font-medium mt-1 drop-shadow-sm">
                    Basic & Junior High Operating System
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 border border-white/20 text-[11px] text-white font-medium backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                <span>GES Compliant</span>
              </div>
            </div>

            {/* Bottom Content: Simple, Clear, Uncongested */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                  Modernizing Basic & JHS Education Across Ghana.
                </h1>
                <p className="text-xs sm:text-sm text-white/90 max-w-md font-medium drop-shadow leading-relaxed">
                  Standardized continuous assessment, automated terminal reports, and instant fee reconciliation.
                </p>
              </div>

              {/* 3 Simple Minimalist Feature Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                  <span>30 / 70 CA</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm font-semibold">
                  <FileCheck2 className="w-3.5 h-3.5 text-purple-300" />
                  <span>BECE Stanine</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm font-semibold">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Instant MoMo</span>
                </div>
              </div>

              {/* Discreet Institutional Footer */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
                <span>Ghana Data Protection Act (Act 843)</span>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-white/70" />
                  <span>256-Bit SSL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Authoritative Institutional Sign-In Form */}
          <div className="flex-1 h-full overflow-y-auto flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-8 bg-white">
            {/* Top Bar with Sign In / Register Switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="lg:hidden w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  SOS
                </div>
                <span className="font-bold text-slate-900 text-sm">
                  SchoolOS Portal
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline">New institution in Ghana?</span>
                <button
                  type="button"
                  onClick={() => setAuthScreen('signup')}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Register School
                </button>
              </div>
            </div>

            {/* Main Form Center Box */}
            <div className="w-full max-w-md mx-auto my-auto py-6 space-y-6">
              {/* Header Title */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Sign In to School Portal
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Access your designated operational cockpit, gradebook, or parent dashboard.
                </p>
              </div>

              {/* Professional Segmented Role Switcher */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Your Portal Role:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                  {portalRoles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedPortalRole === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleSelectPortalRole(role.id)}
                        className={`py-2 px-2 rounded-lg text-left transition-all flex flex-col justify-between gap-1 ${
                          isSelected
                            ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-blue-600/20'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1 rounded ${
                            isSelected ? 'bg-blue-50 text-blue-700' : 'text-slate-400'
                          }`}>
                            {role.badge}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold truncate">
                          {role.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email / Username Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Official Work Email or Staff ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. admin@brightfutureacademy.edu.gh"
                      className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Account Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthScreen('forgot_password')}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your security password"
                      className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      Keep me authenticated on this device
                    </span>
                  </label>
                </div>

                {/* Submit Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <span>Sign In as {portalRoles.find((r) => r.id === selectedPortalRole)?.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Bottom Support & Legal Links */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <p>Ghana Education Service (GES) Accredited Platform</p>
              <div className="flex items-center gap-4 text-slate-500 font-medium">
                <a href="#help" className="hover:text-slate-900 transition-colors">Help Desk</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-slate-900 transition-colors">Data Privacy Act</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SIGN UP SCREEN (INSTITUTIONAL REGISTRATION)                             */}
      {/* ========================================================================= */}
      {authScreen === 'signup' && (
        <div className="h-full w-full flex flex-col lg:flex-row overflow-hidden bg-slate-50">
          {/* Left Column: Exclusive Institutional Registration Showcase */}
          <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 h-full overflow-hidden bg-slate-950 flex-col justify-between p-8 xl:p-10 shrink-0 border-r border-slate-800">
            {/* Background Image: Crisp, vibrant Ghanaian pupils clearly visible */}
            <img
              src="/assets/signup-hero.jpg"
              alt="Joyful Ghanaian pupils raising hands and singing in blue school uniforms"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.02] pointer-events-none"
            />

            {/* Subtle Directional Scrims: Center is open so pupils are clearly seen */}
            <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

            {/* Top Brand Lockup */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-black text-xs shadow-md ring-1 ring-white/20 shrink-0">
                  SOS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-white tracking-tight leading-none drop-shadow">
                      SchoolOS
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/25 backdrop-blur-sm">
                      Onboarding
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 font-medium mt-1 drop-shadow-sm">
                    Basic & Junior High Operating System
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/45 border border-white/20 text-[11px] text-white font-medium backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                <span>Instant Setup</span>
              </div>
            </div>

            {/* Bottom Content: Simple, Clear, Uncongested */}
            <div className="relative z-10 space-y-4">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                  Empower Your School With Digital Precision.
                </h1>
                <p className="text-xs sm:text-sm text-white/90 max-w-md font-medium drop-shadow leading-relaxed">
                  Student enrollment, continuous assessment marksheets, and real-time fee reconciliations.
                </p>
              </div>

              {/* 3 Simple Minimalist Feature Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GES Standard</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Reports</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/15 text-white shadow-sm font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MoMo Payments</span>
                </div>
              </div>

              {/* Bottom Security Compliance Notice */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
                <span>Ghana Data Protection Act (Act 843)</span>
                <span>Zero Setup Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Two-Step Registration Form */}
          <div className="flex-1 h-full overflow-y-auto flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-18 py-8 bg-white">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  School Registration
                </span>
                <span className="text-xs text-slate-400">• Step {signupStep} of 2</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 hidden sm:inline">Already registered?</span>
                <button
                  type="button"
                  onClick={() => setAuthScreen('login')}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Sign In Here
                </button>
              </div>
            </div>

            {/* Main Form Center Content */}
            <div className="w-full max-w-xl mx-auto my-auto py-4 space-y-5">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {signupStep === 1 ? 'Step 1: School Identity & Location' : 'Step 2: Administrator & Security Setup'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {signupStep === 1
                    ? 'Enter your official basic school details and Ghanaian regional location.'
                    : 'Designate the principal administrator account to manage your institution.'}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <div className={`flex-1 h-1.5 rounded-full transition-all ${signupStep >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                <div className={`flex-1 h-1.5 rounded-full transition-all ${signupStep >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              </div>

              {/* Success Notification */}
              {signupSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Institution Registered Successfully!</p>
                    <p className="text-[11px] text-emerald-700">
                      Redirecting to your administrative school cockpit...
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSignup} className="space-y-4 text-xs">
                {/* STEP 1: SCHOOL IDENTITY */}
                {signupStep === 1 && (
                  <div className="space-y-3.5">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Official School Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          placeholder="e.g. St. Augustine Basic & JHS Academy"
                          className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Curriculum & Stream Level
                        </label>
                        <select
                          value={schoolLevel}
                          onChange={(e) => setSchoolLevel(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                        >
                          <option value="Basic 1 - 6 & JHS 1 - 3">Basic 1–6 & JHS 1–3 (Comprehensive)</option>
                          <option value="Junior High School (JHS 1 - 3)">Junior High School (JHS 1–3 Only)</option>
                          <option value="Primary School (Basic 1 - 6)">Primary School (Basic 1–6 Only)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          GES / EMIS School Code (Optional)
                        </label>
                        <input
                          type="text"
                          value={emisCode}
                          onChange={(e) => setEmisCode(e.target.value)}
                          placeholder="e.g. GES-GAR-2024-048"
                          className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Region in Ghana <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                        >
                          <option value="Greater Accra">Greater Accra</option>
                          <option value="Ashanti">Ashanti</option>
                          <option value="Central">Central</option>
                          <option value="Eastern">Eastern</option>
                          <option value="Western">Western</option>
                          <option value="Western North">Western North</option>
                          <option value="Volta">Volta</option>
                          <option value="Oti">Oti</option>
                          <option value="Northern">Northern</option>
                          <option value="Savannah">Savannah</option>
                          <option value="North East">North East</option>
                          <option value="Upper East">Upper East</option>
                          <option value="Upper West">Upper West</option>
                          <option value="Bono">Bono</option>
                          <option value="Bono East">Bono East</option>
                          <option value="Ahafo">Ahafo</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          City / Municipality / Suburb
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. East Legon / Kumasi"
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Continue to Administrator Setup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* STEP 2: ADMINISTRATOR & CREDENTIALS */}
                {signupStep === 2 && (
                  <div className="space-y-3.5">
                    {/* Role selector */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Registering Account Role:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                        {portalRoles.map((role) => (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setSignupRole(role.id)}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold text-center transition-all ${
                              signupRole === role.id
                                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {role.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Administrator Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="text"
                            required
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            placeholder="e.g. Mrs. Cynthia Arthur"
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Official Designation
                        </label>
                        <input
                          type="text"
                          value={adminDesignation}
                          onChange={(e) => setAdminDesignation(e.target.value)}
                          placeholder="e.g. Headmistress / Principal"
                          className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Official School Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            required
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            placeholder="admin@school.edu.gh"
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Phone / WhatsApp (+233) <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="tel"
                            required
                            value={adminPhone}
                            onChange={(e) => setAdminPhone(e.target.value)}
                            placeholder="+233 24 123 4567"
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Security Password <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type={showSignupPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            placeholder="Minimum 6 characters"
                            className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Confirm Password <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type={showSignupPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            value={confirmSignupPassword}
                            onChange={(e) => setConfirmSignupPassword(e.target.value)}
                            placeholder="Repeat password"
                            className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                            className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                          >
                            {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-start gap-2 pt-1 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0 mt-0.5"
                      />
                      <span className="text-[11px] text-slate-600 leading-snug">
                        I verify that I am an authorized representative of this educational institution and agree to the{' '}
                        <span className="text-blue-600 font-semibold underline">Terms of Service</span> and{' '}
                        <span className="text-blue-600 font-semibold underline">Ghana Data Protection Standards</span>.
                      </span>
                    </label>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setSignupStep(1)}
                        className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                      >
                        <span>Create School Account & Launch</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Bottom Support & Legal Links */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <p>Ghana Education Service (GES) Compliant Registration</p>
              <div className="flex items-center gap-4 text-slate-500 font-medium">
                <a href="#help" className="hover:text-slate-900 transition-colors">Help Desk</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-slate-900 transition-colors">Data Privacy Act</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FORGOT PASSWORD SCREEN                                                 */}
      {/* ========================================================================= */}
      {authScreen === 'forgot_password' && (
        <div className="h-full w-full flex items-center justify-center p-6 bg-slate-50">
          <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Reset Account Password
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Enter your registered school email address and we will dispatch password recovery instructions.
              </p>
            </div>

            {resetSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-emerald-900 text-xs">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Reset instructions dispatched!</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  We have sent a secure verification link to <strong>{resetEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setAuthScreen('reset_password')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  Proceed to Set New Password
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Official Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. admin@brightfutureacademy.edu.gh"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  Send Recovery Link
                </button>
              </form>
            )}

            <div className="pt-2 text-center border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setResetSent(false);
                  setAuthScreen('login');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RESET PASSWORD SCREEN                                                  */}
      {/* ========================================================================= */}
      {authScreen === 'reset_password' && (
        <div className="h-full w-full flex items-center justify-center p-6 bg-slate-50">
          <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Create New Secure Password
              </h2>
              <p className="text-xs text-slate-500">
                Enter your new security password (at least 6 characters).
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
              >
                Update Password & Return to Portal
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAuthScreen('login')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

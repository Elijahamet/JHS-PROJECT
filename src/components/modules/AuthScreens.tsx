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
  Sparkles,
  School as SchoolIcon,
  Check,
  Star,
  GraduationCap,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const AuthScreens: React.FC = () => {
  const { authScreen, setAuthScreen, setUserRole, setCurrentSchool } = useApp();

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('admin@brightfutureacademy.edu.gh');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup Form States
  const [schoolName, setSchoolName] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('Basic 1 - 6 & JHS 1 - 3');
  const [region, setRegion] = useState('Greater Accra');
  const [city, setCity] = useState('');
  const [adminName, setAdminName] = useState('');
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

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthScreen('authenticated');
  };

  // Quick Demo Persona Login
  const handleQuickLogin = (role: 'school_admin' | 'teacher' | 'accountant' | 'parent') => {
    setUserRole(role);
    setAuthScreen('authenticated');
  };

  // Handle Signup
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmSignupPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service to continue.');
      return;
    }

    // Configure the newly registered school
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
        website: 'https://schoolos.org',
        academicYear: '2024 / 2025',
        currentTerm: 'Term 2',
        studentCount: 0,
        teacherCount: 1,
        classesCount: 9,
        plan: 'Standard',
      });
    }

    setSignupSuccess(true);
    setTimeout(() => {
      setAuthScreen('authenticated');
    }, 1500);
  };

  // Handle Forgot Password
  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  // Handle Reset Password
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password updated successfully! Logging into your account...');
    setAuthScreen('authenticated');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1D] text-white flex flex-col justify-center selection:bg-blue-600 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. SIGN IN SCREEN (Picture 1: Classroom Students in Yellow/White Uniform) */}
      {/* ========================================================================= */}
      {authScreen === 'login' && (
        <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
          {/* Left Hero Picture 1 Column */}
          <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 overflow-hidden bg-slate-900 flex-col justify-between p-10 xl:p-14">
            {/* Background Image: Picture 1 */}
            <img
              src="/assets/login-hero.jpg"
              alt="Ghanaian school pupils learning happily in classroom"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05] transition-transform duration-10000 ease-out hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0F1D]/80" />

            {/* Top Brand Badge */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-blue-500/25">
                SOS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    SchoolOS
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                    Ghana Basic & JHS
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  The Modern Operating System for Ghanaian Schools
                </p>
              </div>
            </div>

            {/* Floating Glassmorphism Testimonial Card */}
            <div className="relative z-10 space-y-4">
              <div className="bg-slate-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-white">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-normal italic">
                  &ldquo;SchoolOS has completely modernized how we manage continuous assessments, terminal report cards, and feeding fees across our Basic and JHS streams. Parents receive instant MoMo confirmations!&rdquo;
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">Mrs. Cynthia Arthur</p>
                    <p className="text-[11px] text-cyan-300">Headmistress, Greater Accra Region</p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified School
                  </div>
                </div>
              </div>

              {/* Bottom live statistic pill */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>10,000+ Basic & JHS Students Tracked</span>
                </div>
                <span className="text-[11px] font-semibold text-cyan-400">Term 2 Active</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 lg:py-16 bg-[#0B132B]">
            <div className="w-full max-w-md mx-auto space-y-8">
              {/* Mobile Header Logo */}
              <div className="lg:hidden flex items-center gap-3 pb-2 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  SOS
                </div>
                <div>
                  <h1 className="text-sm font-extrabold text-white">SchoolOS Ghana</h1>
                  <p className="text-[11px] text-slate-400">Basic & JHS Management Portal</p>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Secure School Portal Access</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Welcome Back
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Sign in to your administrative dashboard or staff workbench.
                </p>
              </div>

              {/* Quick Persona Demo Switcher */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                    Quick Demo One-Click Sign In:
                  </span>
                  <span className="text-slate-500 text-[10px]">Select Role</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('school_admin')}
                    className="flex items-center gap-2 p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-200 transition-all text-left font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="truncate">Admin / Head</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('teacher')}
                    className="flex items-center gap-2 p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 transition-all text-left font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="truncate">Teacher (Darko)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('accountant')}
                    className="flex items-center gap-2 p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-200 transition-all text-left font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="truncate">Bursar / Accounts</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('parent')}
                    className="flex items-center gap-2 p-2 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-200 transition-all text-left font-medium"
                  >
                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                    <span className="truncate">Parent Portal</span>
                  </button>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Work Email or Staff ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. admin@schoolos.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthScreen('forgot_password')}
                      className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
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
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-400 font-medium">
                      Keep me signed in on this device
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <span>Sign In to SchoolOS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Toggle to Sign Up */}
              <div className="pt-4 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  New institution or basic school in Ghana?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthScreen('signup')}
                    className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                  >
                    Register your school now
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SIGN UP SCREEN (Picture 2: Energetic Students Singing in Blue Uniform) */}
      {/* ========================================================================= */}
      {authScreen === 'signup' && (
        <div className="flex-1 flex flex-col lg:flex-row min-h-screen">
          {/* Left Hero Picture 2 Column */}
          <div className="relative hidden lg:flex lg:w-1/2 xl:w-5/12 overflow-hidden bg-slate-900 flex-col justify-between p-10 xl:p-14">
            {/* Background Image: Picture 2 */}
            <img
              src="/assets/signup-hero.jpg"
              alt="Joyful Ghanaian pupils raising hands and singing in blue school uniforms"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05] transition-transform duration-10000 ease-out hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0F1D]/80" />

            {/* Top Brand Badge */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-blue-500/25">
                SOS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white">
                    SchoolOS
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
                    Registration
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  Onboard Your Basic School or Junior High School
                </p>
              </div>
            </div>

            {/* Floating Glassmorphism Feature Card */}
            <div className="relative z-10 space-y-4">
              <div className="bg-slate-900/75 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Why Leading Ghanaian Schools Choose Us</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>
                      <strong>Automated Terminal Reports:</strong> 30% Continuous Assessment + 70% Exam with instant BECE/NaCCA stanine grading.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>
                      <strong>Ghana Feeding Fee Tracking:</strong> Separate ledger for daily, weekly, and termly meals with zero confusion.
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>
                      <strong>MoMo & Bank Collections:</strong> Automatic receipt generation and real-time reconciliation.
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Zero setup fees • 14-day free trial</span>
                  <span className="text-cyan-300 font-semibold">Join 40+ Top Academies</span>
                </div>
              </div>

              {/* Bottom pill */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Compliant with Ghana Education Service (GES)</span>
                </div>
                <span className="text-emerald-400 font-semibold">Instant Setup</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 xl:px-18 py-10 lg:py-12 bg-[#0B132B] overflow-y-auto">
            <div className="w-full max-w-xl mx-auto space-y-6">
              {/* Mobile Header Logo */}
              <div className="lg:hidden flex items-center gap-3 pb-2 border-b border-slate-800">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  SOS
                </div>
                <div>
                  <h1 className="text-sm font-extrabold text-white">SchoolOS Registration</h1>
                  <p className="text-[11px] text-slate-400">Register Your Ghanaian School</p>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>New School Onboarding</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Register Your Institution
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Create your official school administrative account in under two minutes.
                </p>
              </div>

              {/* Success Notification */}
              {signupSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-white">School Account Created Successfully!</p>
                    <p className="text-[11px] text-emerald-300">
                      Redirecting to your administrative dashboard...
                    </p>
                  </div>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSignup} className="space-y-4 text-xs">
                {/* Section 1: School Identity */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800/80">
                    <SchoolIcon className="w-4 h-4 text-cyan-400" />
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                      1. School Information
                    </h3>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Official School Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        placeholder="e.g. St. Augustine Basic & JHS Academy"
                        className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Curriculum Stream
                      </label>
                      <select
                        value={schoolLevel}
                        onChange={(e) => setSchoolLevel(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      >
                        <option value="Basic 1 - 6 & JHS 1 - 3">Basic 1–6 & JHS 1–3 (Full Basic)</option>
                        <option value="Junior High School (JHS 1 - 3)">Junior High School (JHS 1–3 Only)</option>
                        <option value="Primary School (Basic 1 - 6)">Primary School (Basic 1–6 Only)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Region in Ghana <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      >
                        <option value="Greater Accra">Greater Accra Region</option>
                        <option value="Ashanti">Ashanti Region</option>
                        <option value="Central">Central Region</option>
                        <option value="Eastern">Eastern Region</option>
                        <option value="Western">Western Region</option>
                        <option value="Volta">Volta Region</option>
                        <option value="Northern">Northern Region</option>
                        <option value="Upper East">Upper East Region</option>
                        <option value="Upper West">Upper West Region</option>
                        <option value="Bono">Bono Region</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      City / Town / Suburb
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. East Legon, Accra / Ahodwo, Kumasi"
                        className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Administrator Profile */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3.5">
                  <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800/80">
                    <User className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                      2. Headmaster / Administrator Account
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Administrator Full Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          placeholder="e.g. Rev. Kwabena Frimpong"
                          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Phone / WhatsApp (+233) <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={adminPhone}
                          onChange={(e) => setAdminPhone(e.target.value)}
                          placeholder="+233 24 000 0000"
                          className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      Official School Email <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="e.g. headmaster@staugustine.edu.gh"
                        className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Password <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          placeholder="Min 6 characters"
                          className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">
                        Confirm Password <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={confirmSignupPassword}
                          onChange={(e) => setConfirmSignupPassword(e.target.value)}
                          placeholder="Repeat password"
                          className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200"
                        >
                          {showSignupPassword ? (
                            <EyeOff className="w-3.5 h-3.5" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                  />
                  <span className="text-[11px] text-slate-400 leading-snug">
                    I confirm that I am an authorized representative of this school and agree to the{' '}
                    <span className="text-cyan-400 underline">Terms of Service</span> and{' '}
                    <span className="text-cyan-400 underline">Ghana Data Protection Regulations</span>.
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Create School Account & Launch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Toggle to Sign In */}
              <div className="pt-3 border-t border-slate-800 text-center">
                <p className="text-xs text-slate-400">
                  Already have an account for your school?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthScreen('login')}
                    className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FORGOT PASSWORD SCREEN                                                 */}
      {/* ========================================================================= */}
      {authScreen === 'forgot_password' && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B132B]">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Reset Account Password
              </h2>
              <p className="text-xs text-slate-400">
                Enter your verified staff or parent email to receive password reset instructions.
              </p>
            </div>

            {resetSent ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl space-y-3 text-emerald-200 text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Reset instructions sent!</span>
                </div>
                <p className="text-[11px] text-emerald-300 leading-relaxed">
                  We have dispatched a secure password reset link to <strong>{resetEmail}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setAuthScreen('reset_password')}
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                >
                  Proceed to Enter New Password
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Account Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="e.g. admin@schoolos.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            )}

            <div className="pt-2 text-center border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setResetSent(false);
                  setAuthScreen('login');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. RESET PASSWORD SCREEN                                                  */}
      {/* ========================================================================= */}
      {authScreen === 'reset_password' && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B132B]">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Create New Password
              </h2>
              <p className="text-xs text-slate-400">
                Enter your new secure password (at least 6 characters).
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-xs shadow-md transition-all"
              >
                Update Password & Sign In
              </button>
            </form>

            <div className="pt-2 text-center border-t border-slate-800">
              <button
                type="button"
                onClick={() => setAuthScreen('login')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

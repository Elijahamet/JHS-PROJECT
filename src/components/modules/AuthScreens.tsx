import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, CheckCircle2, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const AuthScreens: React.FC = () => {
  const { authScreen, setAuthScreen } = useApp();

  const [email, setEmail] = useState('admin@schoolos.com');
  const [password, setPassword] = useState('••••••••••••');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthScreen('authenticated');
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password updated! Signing in...');
    setAuthScreen('authenticated');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="mx-auto w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-sm">
          <span className="tracking-tighter">S</span>
          <span className="text-blue-400">OS</span>
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          SchoolOS
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          The operating system for modern schools
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200/80 rounded-2xl sm:px-10">
          {/* LOGIN SCREEN */}
          {authScreen === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@schoolos.com"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-700 font-medium">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthScreen('forgot_password')}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" size="md" className="w-full">
                  Sign In to SchoolOS
                </Button>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-[11px] text-slate-500">
                  Protected by multi-tenant school data isolation
                </p>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD SCREEN */}
          {authScreen === 'forgot_password' && (
            <div className="space-y-4 text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Reset Password
                </h3>
                <p className="mt-1 text-slate-500">
                  Enter your verified staff or parent email to receive reset instructions.
                </p>
              </div>

              {resetSent ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-900">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Check your email</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    We sent a secure password reset link to <strong>{email}</strong>.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full"
                    onClick={() => setAuthScreen('reset_password')}
                  >
                    Continue to Enter New Password
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      Account Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="md" className="w-full">
                    Send Reset Link
                  </Button>
                </form>
              )}

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    setResetSent(false);
                    setAuthScreen('login');
                  }}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </div>
          )}

          {/* RESET PASSWORD SCREEN */}
          {authScreen === 'reset_password' && (
            <form onSubmit={handleReset} className="space-y-4 text-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Create New Password
                </h3>
                <p className="mt-1 text-slate-500">
                  Choose a strong password containing at least 8 characters.
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" size="md" className="w-full">
                  Update Password & Sign In
                </Button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setAuthScreen('login')}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

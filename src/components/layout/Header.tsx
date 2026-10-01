import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  UserCheck,
  LogOut,
  Calendar,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentUser,
    setUserRole,
    currentSchool,
    schools,
    setCurrentSchool,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsGlobalSearchOpen,
    setCurrentNav,
    setAuthScreen,
  } = useApp();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const schoolRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (schoolRef.current && !schoolRef.current.contains(event.target as Node)) {
        setIsSchoolDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsGlobalSearchOpen]);

  const rolesList: { role: UserRole; label: string; desc: string }[] = [
    { role: 'school_admin', label: 'School Admin', desc: 'Full school office operations' },
    { role: 'teacher', label: 'Teacher', desc: 'Classes, attendance, marks' },
    { role: 'accountant', label: 'Accountant / Bursar', desc: 'Fees, feeding fees, payments' },
    { role: 'parent', label: 'Parent Portal', desc: 'Children, balances, report cards' },
    { role: 'admission_officer', label: 'Admissions Officer', desc: 'Applications & interviews' },
    { role: 'transport_manager', label: 'Transport Manager', desc: 'Buses, routes & trips' },
    { role: 'inventory_officer', label: 'Inventory Officer', desc: 'School assets & stock' },
    { role: 'super_admin', label: 'Super Admin', desc: 'Multi-school platform owner' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-20">
      {/* Left: Global Search Trigger */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span className="text-slate-500 font-normal">
              Search students, payments, staff...
            </span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: School Switcher, Term Pill, Notifications, Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Term & Academic Year Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{currentSchool.academicYear}</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-700 font-semibold">{currentSchool.currentTerm}</span>
        </div>

        {/* Multi-School Switcher Dropdown */}
        <div className="relative" ref={schoolRef}>
          <button
            onClick={() => setIsSchoolDropdownOpen(!isSchoolDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline truncate max-w-[120px]">
              {currentSchool.name}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isSchoolDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 text-xs">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Switch School Instance
              </div>
              {schools.map((school) => (
                <button
                  key={school.id}
                  onClick={() => {
                    setCurrentSchool(school);
                    setIsSchoolDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{school.name}</p>
                    <p className="text-[11px] text-slate-500">{school.city}, Ghana</p>
                  </div>
                  {school.id === currentSchool.id && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden text-xs">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="font-semibold text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-slate-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.linkTo) {
                          setCurrentNav(notif.linkTo);
                          setIsNotifDropdownOpen(false);
                        }
                      }}
                      className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                        !notif.isRead ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-slate-900">{notif.title}</p>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-600 leading-normal text-[11px]">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-slate-100 text-center bg-slate-50/30">
                <button
                  onClick={() => {
                    setCurrentNav('notifications');
                    setIsNotifDropdownOpen(false);
                  }}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Persona / Role Quick Switcher (Crucial for exploring all requested user roles) */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
          >
            <UserCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="capitalize">{currentUser.role.replace('_', ' ')}</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {isRoleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900">Switch User Persona</p>
                <p className="text-[11px] text-slate-500">
                  Test the interface as different school staff & parents
                </p>
              </div>
              <div className="py-1 max-h-72 overflow-y-auto">
                {rolesList.map(({ role, label, desc }) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-start justify-between ${
                      currentUser.role === role ? 'bg-slate-50' : ''
                    }`}
                  >
                    <div>
                      <p
                        className={`font-semibold ${
                          currentUser.role === role ? 'text-blue-700' : 'text-slate-900'
                        }`}
                      >
                        {label}
                      </p>
                      <p className="text-[11px] text-slate-500">{desc}</p>
                    </div>
                    {currentUser.role === role && (
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
              <div className="pt-1.5 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsRoleDropdownOpen(false);
                    setAuthScreen('login');
                  }}
                  className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 font-medium flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out (Test Auth Screens)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

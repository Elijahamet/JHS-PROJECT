import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  LogOut,
  Calendar,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    currentUser,
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

  const [isSchoolDropdownOpen, setIsSchoolDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const schoolRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const getRoleLabel = () => {
    switch (currentUser.role) {
      case 'teacher':
        return 'Class Teacher (JHS 2A)';
      case 'accountant':
        return 'Chief Accountant / Bursar';
      case 'parent':
        return 'Parent / Legal Guardian';
      case 'school_admin':
      default:
        return 'School Administrator';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between z-20">
      {/* Left: Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
            <span className="text-slate-500 font-normal">
              Search students, records, staff...
            </span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-medium text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls: School Info, Term Pill, Notifications, User Profile & Log Out */}
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
                School Campus
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
                  {currentSchool.id === school.id && (
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
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-blue-600 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <p className="text-center py-6 text-slate-400">No new notices</p>
                ) : (
                  notifications.slice(0, 4).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 hover:bg-slate-50 cursor-pointer ${
                        !notif.isRead ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 truncate">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
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
                  View all notices
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current User Pill & Log Out (NO Persona Switcher - Users cannot switch dashboards) */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              {getRoleLabel()}
            </span>
          </div>

          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs flex-shrink-0">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>

          <button
            onClick={() => setAuthScreen('login')}
            title="Log Out of Platform"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

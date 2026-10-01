import React, { useState } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  GraduationCap,
  CreditCard,
  Megaphone,
  MoreHorizontal,
  Users,
  Briefcase,
  Layers,
  CalendarCheck,
  FileSpreadsheet,
  UtensilsCrossed,
  Receipt,
  UserPlus,
  Settings,
  HeartHandshake,
  BookOpenCheck,
  WalletCards,
  FileText,
  LogOut,
  Bus,
  Package,
  Bell,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentNav, setCurrentNav, currentSchool, currentUser, setSelectedStudentId, setAuthScreen } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Bottom Quick Tabs strictly per role
  const getBottomTabs = () => {
    switch (currentUser.role) {
      case 'teacher':
        return [
          { id: 'teacher-cockpit', label: 'Workbench', icon: LayoutDashboard, color: 'text-sky-400' },
          { id: 'teacher-classes', label: 'Classes', icon: Layers, color: 'text-indigo-400' },
          { id: 'teacher-attendance', label: 'Roll Call', icon: CalendarCheck, color: 'text-teal-400' },
          { id: 'teacher-marks', label: 'Marks', icon: FileSpreadsheet, color: 'text-rose-400' },
        ];
      case 'accountant':
        return [
          { id: 'accountant-cockpit', label: 'Bursary', icon: LayoutDashboard, color: 'text-emerald-400' },
          { id: 'accountant-fees', label: 'Fees', icon: CreditCard, color: 'text-sky-400' },
          { id: 'accountant-payments', label: 'Cashier', icon: Receipt, color: 'text-cyan-400' },
          { id: 'accountant-receipts', label: 'Receipts', icon: FileText, color: 'text-blue-400' },
        ];
      case 'parent':
        return [
          { id: 'parent-cockpit', label: 'My Ward', icon: HeartHandshake, color: 'text-pink-400' },
          { id: 'parent-reports', label: 'Report', icon: FileSpreadsheet, color: 'text-violet-400' },
          { id: 'parent-fees', label: 'Bills', icon: CreditCard, color: 'text-emerald-400' },
          { id: 'parent-pay', label: 'Pay MoMo', icon: Receipt, color: 'text-cyan-400' },
        ];
      case 'school_admin':
      default:
        return [
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, color: 'text-sky-400' },
          { id: 'students', label: 'Students', icon: GraduationCap, color: 'text-indigo-400' },
          { id: 'transport', label: 'Transport', icon: Bus, color: 'text-sky-400' },
          { id: 'fees', label: 'Fees', icon: CreditCard, color: 'text-emerald-400' },
        ];
    }
  };

  // Full Drawer Navigation strictly per role
  const getDrawerItems = () => {
    switch (currentUser.role) {
      case 'teacher':
        return [
          { id: 'teacher-cockpit', label: 'Teacher Workbench', icon: LayoutDashboard, color: 'text-sky-400', gradient: 'from-blue-600 to-cyan-600' },
          { id: 'teacher-classes', label: 'My Classes & Rosters', icon: Layers, color: 'text-indigo-400', gradient: 'from-indigo-600 to-blue-600' },
          { id: 'teacher-attendance', label: 'Roll Call Attendance', icon: CalendarCheck, color: 'text-teal-400', gradient: 'from-teal-600 to-cyan-600' },
          { id: 'teacher-marks', label: 'Marks & Continuous Assessment', icon: FileSpreadsheet, color: 'text-rose-400', gradient: 'from-rose-600 to-pink-600' },
          { id: 'teacher-reports', label: 'Report Card Generator', icon: BookOpenCheck, color: 'text-violet-400', gradient: 'from-purple-600 to-indigo-600' },
          { id: 'teacher-announcements', label: 'Staff Room Notices', icon: Megaphone, color: 'text-yellow-400', gradient: 'from-amber-500 to-orange-600' },
          { id: 'teacher-chat', label: 'Admin Chat & Offline Desk', icon: MessageSquare, color: 'text-cyan-400', gradient: 'from-cyan-600 to-blue-600' },
        ];
      case 'accountant':
        return [
          { id: 'accountant-cockpit', label: 'Bursary Financial Cockpit', icon: LayoutDashboard, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
          { id: 'accountant-fees', label: 'Tuition Fees Register', icon: CreditCard, color: 'text-sky-400', gradient: 'from-blue-600 to-indigo-600' },
          { id: 'accountant-feeding', label: 'Feeding Fees Ledger', icon: UtensilsCrossed, color: 'text-orange-400', gradient: 'from-orange-600 to-amber-600' },
          { id: 'accountant-payments', label: 'Receive Payments', icon: Receipt, color: 'text-cyan-400', gradient: 'from-cyan-600 to-blue-600' },
          { id: 'accountant-receipts', label: 'Official Stamped Receipts', icon: FileText, color: 'text-blue-400', gradient: 'from-blue-600 to-indigo-600' },
          { id: 'accountant-defaulters', label: 'Defaulters & Arrears Watchlist', icon: WalletCards, color: 'text-rose-400', gradient: 'from-rose-600 to-red-600' },
          { id: 'accountant-reports', label: 'Financial Audit & Cash Book', icon: FileSpreadsheet, color: 'text-lime-400', gradient: 'from-lime-600 to-emerald-600' },
        ];
      case 'parent':
        return [
          { id: 'parent-cockpit', label: 'Ward Overview & Status', icon: HeartHandshake, color: 'text-pink-400', gradient: 'from-pink-600 to-rose-600' },
          { id: 'parent-reports', label: 'Terminal Academic Report Card', icon: FileSpreadsheet, color: 'text-violet-400', gradient: 'from-purple-600 to-indigo-600' },
          { id: 'parent-attendance', label: 'Attendance & Punctuality Log', icon: CalendarCheck, color: 'text-teal-400', gradient: 'from-teal-600 to-cyan-600' },
          { id: 'parent-fees', label: 'Fee Statement & Arrears', icon: CreditCard, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
          { id: 'parent-pay', label: 'Pay Fees Online (MoMo & Card)', icon: Receipt, color: 'text-cyan-400', gradient: 'from-cyan-600 to-blue-600' },
          { id: 'parent-announcements', label: 'School Notices & Circulars', icon: Megaphone, color: 'text-yellow-400', gradient: 'from-amber-500 to-orange-600' },
          { id: 'parent-chat', label: 'School Admin Chat', icon: MessageSquare, color: 'text-pink-400', gradient: 'from-pink-600 to-purple-600' },
        ];
      case 'school_admin':
      default:
        return [
          { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, color: 'text-sky-400', gradient: 'from-blue-600 to-indigo-600' },
          { id: 'students', label: 'Students Directory', icon: GraduationCap, color: 'text-indigo-400', gradient: 'from-indigo-600 to-violet-600' },
          { id: 'teachers', label: 'Teachers & Staff', icon: Briefcase, color: 'text-amber-400', gradient: 'from-amber-600 to-orange-600' },
          { id: 'parents', label: 'Parents Directory', icon: Users, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
          { id: 'classes', label: 'Classes & Subjects', icon: Layers, color: 'text-violet-400', gradient: 'from-purple-600 to-indigo-600' },
          { id: 'attendance', label: 'Daily Attendance', icon: CalendarCheck, color: 'text-teal-400', gradient: 'from-teal-600 to-cyan-600' },
          { id: 'results', label: 'Results & Reports', icon: FileSpreadsheet, color: 'text-rose-400', gradient: 'from-rose-600 to-pink-600' },
          { id: 'announcements', label: 'School Circulars', icon: Megaphone, color: 'text-yellow-400', gradient: 'from-amber-500 to-orange-600' },
          { id: 'communications', label: 'Chat & Parent Alerts', icon: MessageSquare, color: 'text-cyan-400', gradient: 'from-cyan-600 to-blue-600' },
          { id: 'fees', label: 'School Fees Register', icon: CreditCard, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
          { id: 'feeding-fees', label: 'Feeding Fees Register', icon: UtensilsCrossed, color: 'text-orange-400', gradient: 'from-orange-600 to-amber-600' },
          { id: 'payments', label: 'Payments & Revenue', icon: Receipt, color: 'text-cyan-400', gradient: 'from-cyan-600 to-blue-600' },
          { id: 'transport', label: 'Transport & Fleet', icon: Bus, color: 'text-sky-400', gradient: 'from-sky-600 to-blue-600' },
          { id: 'admissions', label: 'Admissions Desk', icon: UserPlus, color: 'text-fuchsia-400', gradient: 'from-fuchsia-600 to-pink-600' },
          { id: 'inventory', label: 'School Inventory', icon: Package, color: 'text-amber-400', gradient: 'from-amber-600 to-yellow-600' },
          { id: 'reports', label: 'Executive Reports', icon: FileText, color: 'text-purple-400', gradient: 'from-purple-600 to-violet-600' },
          { id: 'notifications', label: 'System Notifications', icon: Bell, color: 'text-rose-400', gradient: 'from-rose-600 to-pink-600' },
          { id: 'settings', label: 'School Settings', icon: Settings, color: 'text-slate-300', gradient: 'from-slate-700 to-slate-800' },
        ];
    }
  };

  const getPlatformLabel = () => {
    switch (currentUser.role) {
      case 'teacher':
        return 'Teacher Workspace';
      case 'accountant':
        return 'Bursary & Accounts';
      case 'parent':
        return 'Parent & Guardian Portal';
      case 'school_admin':
      default:
        return 'School Administration';
    }
  };

  const bottomTabs = getBottomTabs();
  const drawerItems = getDrawerItems();

  const handleNavClick = (id: string) => {
    if (id === 'students') {
      setSelectedStudentId(null);
    }
    setCurrentNav(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Top App Bar */}
      <div className="md:hidden h-14 bg-[#0F172A] border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
            SOS
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-xs font-bold text-white leading-tight">SchoolOS</h2>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-cyan-300 border border-cyan-400/30 font-bold">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
              {getPlatformLabel()}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer Content */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-72 bg-[#0F172A] text-white shadow-2xl border-l border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">{getPlatformLabel()}</h3>
            <p className="text-[11px] text-cyan-300 capitalize font-medium mt-0.5">
              {currentUser.name}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {drawerItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-r-full text-xs font-medium transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white font-bold shadow-md shadow-black/40`
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-lg ${
                    isActive ? 'text-white' : item.color
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Footer: Single Direct Log Out */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <button
            onClick={() => {
              setIsOpen(false);
              setAuthScreen('login');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Fixed Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F172A] border-t border-slate-800 px-3 flex items-center justify-around z-30 shadow-lg">
        {bottomTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentNav === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id)}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-cyan-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : tab.color
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px]">
                {tab.label}
              </span>
            </button>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center w-14 py-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <div className="p-1 rounded-lg text-slate-400">
            <MoreHorizontal className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">More</span>
        </button>
      </div>
    </>
  );
};

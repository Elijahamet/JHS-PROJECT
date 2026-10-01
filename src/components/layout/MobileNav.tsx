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
  Bus,
  UserPlus,
  Package,
  Settings,
  Bell,
  HeartHandshake,
  BookOpenCheck,
  WalletCards,
  Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentNav, setCurrentNav, currentSchool, currentUser, setSelectedStudentId } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const mainBottomTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-sky-400' },
    { id: 'students', label: 'Students', icon: GraduationCap, color: 'text-indigo-400' },
    { id: 'fees', label: 'Fees', icon: CreditCard, color: 'text-emerald-400' },
    { id: 'portal-parent', label: 'Parent', icon: HeartHandshake, color: 'text-pink-400' },
  ];

  const fullNavList = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, color: 'text-sky-400', gradient: 'from-blue-600 to-indigo-600' },
    { id: 'students', label: 'Students Directory', icon: GraduationCap, color: 'text-indigo-400', gradient: 'from-indigo-600 to-violet-600' },
    { id: 'parents', label: 'Parents', icon: Users, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
    { id: 'teachers', label: 'Teachers & Staff', icon: Briefcase, color: 'text-amber-400', gradient: 'from-amber-600 to-orange-600' },
    { id: 'classes', label: 'Classes & Subjects', icon: Layers, color: 'text-violet-400', gradient: 'from-purple-600 to-indigo-600' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, color: 'text-teal-400', gradient: 'from-teal-600 to-cyan-600' },
    { id: 'results', label: 'Results & Report Cards', icon: FileSpreadsheet, color: 'text-rose-400', gradient: 'from-rose-600 to-pink-600' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, color: 'text-yellow-400', gradient: 'from-amber-500 to-orange-600' },

    { id: 'fees', label: 'School Fees', icon: CreditCard, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
    { id: 'feeding-fees', label: 'Feeding Fees', icon: UtensilsCrossed, color: 'text-orange-400', gradient: 'from-orange-600 to-amber-600' },
    { id: 'payments', label: 'Payments', icon: Receipt, color: 'text-cyan-400', gradient: 'from-cyan-600 to-blue-600' },

    { id: 'transport', label: 'Transport / Buses', icon: Bus, color: 'text-sky-400', gradient: 'from-sky-600 to-blue-600' },
    { id: 'admissions', label: 'Admissions', icon: UserPlus, color: 'text-fuchsia-400', gradient: 'from-fuchsia-600 to-pink-600' },
    { id: 'inventory', label: 'Inventory / Assets', icon: Package, color: 'text-amber-400', gradient: 'from-amber-600 to-yellow-600' },

    { id: 'portal-parent', label: 'Parent Portal View', icon: HeartHandshake, color: 'text-pink-400', gradient: 'from-pink-600 to-rose-600' },
    { id: 'portal-teacher', label: 'Teacher Portal', icon: BookOpenCheck, color: 'text-blue-400', gradient: 'from-blue-600 to-cyan-600' },
    { id: 'portal-accountant', label: 'Accountant Portal', icon: WalletCards, color: 'text-emerald-400', gradient: 'from-emerald-600 to-teal-600' },
    { id: 'portal-super-admin', label: 'Super Admin Portal', icon: Shield, color: 'text-violet-400', gradient: 'from-violet-600 to-purple-600' },

    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-rose-400', gradient: 'from-rose-600 to-red-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-slate-300', gradient: 'from-slate-700 to-slate-800' },
  ];

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
              <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/20 text-cyan-300 border border-cyan-400/30 font-bold">GH</span>
            </div>
            <p className="text-[10px] text-slate-400 truncate max-w-[150px]">
              {currentSchool.name}
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
            <h3 className="text-sm font-bold text-white">School Navigation</h3>
            <p className="text-[11px] text-cyan-300 capitalize font-medium mt-0.5">
              Role: {currentUser.role.replace('_', ' ')}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {fullNavList.map((item) => {
            const Icon = item.icon;
            const isActive = currentNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 py-2.5 pl-3.5 pr-3 rounded-r-full mr-2 text-xs font-medium transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white font-semibold shadow-md shadow-black/40`
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : item.color}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F172A] border-t border-slate-800 px-2 flex items-center justify-around z-30 shadow-lg">
        {mainBottomTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentNav === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'students') {
                  setSelectedStudentId(null);
                }
                setCurrentNav(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : tab.color}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">More</span>
        </button>
      </div>
    </>
  );
};

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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { currentNav, setCurrentNav, currentSchool, currentUser, setSelectedStudentId } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const mainBottomTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'portal-parent', label: 'Parent', icon: HeartHandshake },
  ];

  const fullNavList = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, category: 'Main' },
    { id: 'students', label: 'Students Directory', icon: GraduationCap, category: 'Main' },
    { id: 'parents', label: 'Parents', icon: Users, category: 'Main' },
    { id: 'teachers', label: 'Teachers & Staff', icon: Briefcase, category: 'Main' },
    { id: 'classes', label: 'Classes & Subjects', icon: Layers, category: 'Main' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, category: 'Main' },
    { id: 'results', label: 'Results & Report Cards', icon: FileSpreadsheet, category: 'Main' },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, category: 'Main' },

    { id: 'fees', label: 'School Fees', icon: CreditCard, category: 'Finance' },
    { id: 'feeding-fees', label: 'Feeding Fees', icon: UtensilsCrossed, category: 'Finance' },
    { id: 'payments', label: 'Payments', icon: Receipt, category: 'Finance' },

    { id: 'transport', label: 'Transport / Buses', icon: Bus, category: 'Operations' },
    { id: 'admissions', label: 'Admissions', icon: UserPlus, category: 'Operations' },
    { id: 'inventory', label: 'Inventory / Assets', icon: Package, category: 'Operations' },

    { id: 'portal-parent', label: 'Parent Portal View', icon: HeartHandshake, category: 'Portals' },
    { id: 'notifications', label: 'Notifications', icon: Bell, category: 'System' },
    { id: 'settings', label: 'Settings', icon: Settings, category: 'System' },
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
      <div className="md:hidden h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
            SOS
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900 leading-tight">SchoolOS</h2>
            <p className="text-[10px] text-slate-500 truncate max-w-[150px]">
              {currentSchool.name}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer Content */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Navigation</h3>
            <p className="text-[11px] text-slate-500 capitalize">
              Role: {currentUser.role.replace('_', ' ')}
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
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
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-2 flex items-center justify-around z-30">
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
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg ${
                isActive ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-500"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 font-medium">More</span>
        </button>
      </div>
    </>
  );
};

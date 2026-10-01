import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  Layers,
  CalendarCheck,
  FileSpreadsheet,
  Megaphone,
  CreditCard,
  UtensilsCrossed,
  Receipt,
  FileText,
  UserPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
  BookOpenCheck,
  WalletCards,
  Building2,
  LogOut,
  HeartHandshake,
  Bus,
  Package,
  Bell,
  MessageSquare,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  color: string;
  activeGradient: string;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  dotColorClass: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const { currentNav, setCurrentNav, currentSchool, currentUser, setSelectedStudentId, setAuthScreen } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 1. School Admin Navigation (Full Management Suite)
  const adminNavGroups: NavGroup[] = [
    {
      title: 'Main Modules',
      dotColorClass: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          color: 'text-sky-400',
          activeGradient: 'from-blue-600 to-indigo-600',
        },
        {
          id: 'students',
          label: 'Students Directory',
          icon: GraduationCap,
          color: 'text-indigo-400',
          activeGradient: 'from-indigo-600 to-violet-600',
        },
        {
          id: 'teachers',
          label: 'Teachers & Staff',
          icon: Briefcase,
          color: 'text-amber-400',
          activeGradient: 'from-amber-600 to-orange-600',
        },
        {
          id: 'parents',
          label: 'Parents Directory',
          icon: Users,
          color: 'text-emerald-400',
          activeGradient: 'from-emerald-600 to-teal-600',
        },
        {
          id: 'classes',
          label: 'Classes & Subjects',
          icon: Layers,
          color: 'text-violet-400',
          activeGradient: 'from-purple-600 to-indigo-600',
        },
        {
          id: 'attendance',
          label: 'Daily Attendance',
          icon: CalendarCheck,
          color: 'text-teal-400',
          activeGradient: 'from-teal-600 to-cyan-600',
        },
        {
          id: 'results',
          label: 'Results & Reports',
          icon: FileSpreadsheet,
          color: 'text-rose-400',
          activeGradient: 'from-rose-600 to-pink-600',
        },
        {
          id: 'announcements',
          label: 'Announcements',
          icon: Megaphone,
          color: 'text-yellow-400',
          activeGradient: 'from-amber-500 to-orange-600',
        },
        {
          id: 'communications',
          label: 'Chat & Parent Alerts',
          icon: MessageSquare,
          badge: 2,
          badgeColor: 'bg-emerald-500',
          color: 'text-cyan-400',
          activeGradient: 'from-cyan-600 to-blue-600',
        },
      ],
    },
    {
      title: 'Finance & Fees',
      dotColorClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
      items: [
        {
          id: 'fees',
          label: 'School Fees',
          icon: CreditCard,
          color: 'text-emerald-400',
          activeGradient: 'from-emerald-600 to-teal-600',
        },
        {
          id: 'feeding-fees',
          label: 'Feeding Fees',
          icon: UtensilsCrossed,
          color: 'text-orange-400',
          activeGradient: 'from-orange-600 to-amber-600',
        },
        {
          id: 'payments',
          label: 'Payments Register',
          icon: Receipt,
          color: 'text-cyan-400',
          activeGradient: 'from-cyan-600 to-blue-600',
        },
        {
          id: 'receipts',
          label: 'Official Receipts',
          icon: FileText,
          color: 'text-blue-400',
          activeGradient: 'from-blue-600 to-indigo-600',
        },
        {
          id: 'financial-reports',
          label: 'Financial Reports',
          icon: WalletCards,
          color: 'text-lime-400',
          activeGradient: 'from-lime-600 to-emerald-600',
        },
      ],
    },
    {
      title: 'Operations',
      dotColorClass: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
      items: [
        {
          id: 'transport',
          label: 'Transport & Fleet',
          icon: Bus,
          color: 'text-sky-400',
          activeGradient: 'from-sky-600 to-blue-600',
        },
        {
          id: 'admissions',
          label: 'Admissions Desk',
          icon: UserPlus,
          color: 'text-fuchsia-400',
          activeGradient: 'from-fuchsia-600 to-pink-600',
        },
        {
          id: 'inventory',
          label: 'School Inventory',
          icon: Package,
          color: 'text-amber-400',
          activeGradient: 'from-amber-600 to-yellow-600',
        },
      ],
    },
    {
      title: 'Administration',
      dotColorClass: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]',
      items: [
        {
          id: 'reports',
          label: 'Executive Reports',
          icon: FileText,
          color: 'text-purple-400',
          activeGradient: 'from-purple-600 to-indigo-600',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          badge: 3,
          badgeColor: 'bg-rose-500',
          color: 'text-rose-400',
          activeGradient: 'from-rose-600 to-pink-600',
        },
        {
          id: 'settings',
          label: 'School Settings',
          icon: Settings,
          color: 'text-slate-300',
          activeGradient: 'from-slate-700 to-slate-800',
        },
      ],
    },
  ];

  // 2. Teacher Navigation
  const teacherNavGroups: NavGroup[] = [
    {
      title: 'Classroom Workbench',
      dotColorClass: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
      items: [
        {
          id: 'teacher-cockpit',
          label: 'Teacher Workbench',
          icon: LayoutDashboard,
          color: 'text-sky-400',
          activeGradient: 'from-blue-600 to-cyan-600',
        },
        {
          id: 'teacher-classes',
          label: 'My Classes & Rosters',
          icon: Layers,
          color: 'text-indigo-400',
          activeGradient: 'from-indigo-600 to-blue-600',
        },
        {
          id: 'teacher-attendance',
          label: 'Roll Call Attendance',
          icon: CalendarCheck,
          color: 'text-teal-400',
          activeGradient: 'from-teal-600 to-cyan-600',
        },
      ],
    },
    {
      title: 'Academics & Evaluation',
      dotColorClass: 'bg-pink-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]',
      items: [
        {
          id: 'teacher-marks',
          label: 'Marks & Assessments',
          icon: FileSpreadsheet,
          color: 'text-rose-400',
          activeGradient: 'from-rose-600 to-pink-600',
        },
        {
          id: 'teacher-reports',
          label: 'Report Card Generator',
          icon: BookOpenCheck,
          color: 'text-violet-400',
          activeGradient: 'from-purple-600 to-indigo-600',
        },
        {
          id: 'teacher-announcements',
          label: 'Staff Room Notices',
          icon: Megaphone,
          color: 'text-yellow-400',
          activeGradient: 'from-amber-500 to-orange-600',
        },
      ],
    },
  ];

  // 3. Accountant Navigation
  const accountantNavGroups: NavGroup[] = [
    {
      title: 'Bursary & Billing',
      dotColorClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
      items: [
        {
          id: 'accountant-cockpit',
          label: 'Bursary Cockpit',
          icon: LayoutDashboard,
          color: 'text-emerald-400',
          activeGradient: 'from-emerald-600 to-teal-600',
        },
        {
          id: 'accountant-fees',
          label: 'Tuition Fees Register',
          icon: CreditCard,
          color: 'text-sky-400',
          activeGradient: 'from-blue-600 to-indigo-600',
        },
        {
          id: 'accountant-feeding',
          label: 'Feeding Fees Ledger',
          icon: UtensilsCrossed,
          color: 'text-orange-400',
          activeGradient: 'from-orange-600 to-amber-600',
        },
      ],
    },
    {
      title: 'Cashier & Reconciliations',
      dotColorClass: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
      items: [
        {
          id: 'accountant-payments',
          label: 'Receive Payments',
          icon: Receipt,
          color: 'text-cyan-400',
          activeGradient: 'from-cyan-600 to-blue-600',
        },
        {
          id: 'accountant-receipts',
          label: 'Official Stamped Receipts',
          icon: FileText,
          color: 'text-blue-400',
          activeGradient: 'from-blue-600 to-indigo-600',
        },
        {
          id: 'accountant-defaulters',
          label: 'Defaulters & Arrears',
          icon: WalletCards,
          color: 'text-rose-400',
          activeGradient: 'from-rose-600 to-red-600',
        },
        {
          id: 'accountant-reports',
          label: 'Financial Audit & Reports',
          icon: FileSpreadsheet,
          color: 'text-lime-400',
          activeGradient: 'from-lime-600 to-emerald-600',
        },
      ],
    },
  ];

  // 4. Parent Navigation
  const parentNavGroups: NavGroup[] = [
    {
      title: 'Ward Academics',
      dotColorClass: 'bg-pink-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]',
      items: [
        {
          id: 'parent-cockpit',
          label: 'Child Overview',
          icon: HeartHandshake,
          color: 'text-pink-400',
          activeGradient: 'from-pink-600 to-rose-600',
        },
        {
          id: 'parent-reports',
          label: 'Terminal Report Card',
          icon: FileSpreadsheet,
          color: 'text-violet-400',
          activeGradient: 'from-purple-600 to-indigo-600',
        },
        {
          id: 'parent-attendance',
          label: 'Attendance History',
          icon: CalendarCheck,
          color: 'text-teal-400',
          activeGradient: 'from-teal-600 to-cyan-600',
        },
      ],
    },
    {
      title: 'Fees & School Notices',
      dotColorClass: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
      items: [
        {
          id: 'parent-fees',
          label: 'Fees & Bill Statement',
          icon: CreditCard,
          color: 'text-emerald-400',
          activeGradient: 'from-emerald-600 to-teal-600',
        },
        {
          id: 'parent-pay',
          label: 'Pay Fees Online (MoMo)',
          icon: Receipt,
          color: 'text-cyan-400',
          activeGradient: 'from-cyan-600 to-blue-600',
        },
        {
          id: 'parent-announcements',
          label: 'School Circulars',
          icon: Megaphone,
          color: 'text-yellow-400',
          activeGradient: 'from-amber-500 to-orange-600',
        },
      ],
    },
  ];

  // Select groups strictly for the active role
  const getRoleNavGroups = (): NavGroup[] => {
    switch (currentUser.role) {
      case 'teacher':
        return teacherNavGroups;
      case 'accountant':
        return accountantNavGroups;
      case 'parent':
        return parentNavGroups;
      case 'school_admin':
      default:
        return adminNavGroups;
    }
  };

  const getPlatformLabel = () => {
    switch (currentUser.role) {
      case 'teacher':
        return { name: 'Teacher Portal', badge: 'bg-sky-500/20 text-sky-300 border-sky-400/30' };
      case 'accountant':
        return { name: 'Bursary Portal', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' };
      case 'parent':
        return { name: 'Parent Portal', badge: 'bg-purple-500/20 text-purple-300 border-purple-400/30' };
      case 'school_admin':
      default:
        return { name: 'Admin Portal', badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30' };
    }
  };

  const roleNavGroups = getRoleNavGroups();
  const platformInfo = getPlatformLabel();

  const renderNavGroup = (
    title: string,
    items: NavItem[],
    dotColorClass: string
  ) => {
    return (
      <div className="mb-5">
        {!isCollapsed && (
          <div className="flex items-center gap-2 px-3 mb-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${dotColorClass} shadow-xs flex-shrink-0`}
            />
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {title}
            </h4>
          </div>
        )}
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'students') {
                    setSelectedStudentId(null);
                  }
                  setCurrentNav(item.id);
                }}
                title={isCollapsed ? item.label : undefined}
                className={`group w-full flex items-center gap-3 py-2.5 transition-all duration-200 select-none ${
                  isCollapsed ? 'justify-center px-2 rounded-xl' : 'pl-3.5 pr-3 rounded-r-full mr-2'
                } ${
                  isActive
                    ? `bg-gradient-to-r ${item.activeGradient} text-white font-semibold shadow-md shadow-black/40`
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-lg transition-transform duration-200 ${
                    isActive
                      ? 'text-white scale-110'
                      : `${item.color} group-hover:scale-110 group-hover:text-white`
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                </div>
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left text-xs tracking-tight">
                    {item.label}
                  </span>
                )}
                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                      item.badgeColor
                        ? `${item.badgeColor} text-white`
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-[#0F172A] border-r border-slate-800/90 transition-all duration-300 z-30 select-none text-white shadow-xl ${
        isCollapsed ? 'w-18' : 'w-66'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/40">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 flex-shrink-0">
              <span className="tracking-tighter">S</span>
              <span className="text-cyan-300">OS</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-extrabold text-white tracking-tight leading-none">
                  SchoolOS
                </h1>
                <span className={`inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold border ${platformInfo.badge}`}>
                  {platformInfo.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5 font-medium">
                {currentSchool.name}
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
            SOS
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors hidden lg:block"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* School Badge Pill (When Expanded) */}
      {!isCollapsed && (
        <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300 truncate">
            <Building2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="truncate font-medium">{currentSchool.city}, Ghana</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-950/80 text-cyan-300 font-semibold border border-cyan-500/30">
            {currentSchool.currentTerm}
          </span>
        </div>
      )}

      {/* Scrollable Navigation Groups - Strictly Scoped to Role */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {roleNavGroups.map((group, idx) => (
          <React.Fragment key={idx}>
            {renderNavGroup(group.title, group.items, group.dotColorClass)}
          </React.Fragment>
        ))}
      </div>

      {/* Footer Info / User Pill & Direct Log Out Button */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="relative flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0F172A]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-cyan-300 capitalize truncate font-medium">
                  {currentUser.role.replace('_', ' ')}
                </p>
              </div>
            </div>

            {/* Direct Log Out Button */}
            <button
              onClick={() => setAuthScreen('login')}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {currentUser.name[0]}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-[#0F172A]" />
            </div>
            <button
              onClick={() => setAuthScreen('login')}
              title="Log Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

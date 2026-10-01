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
  Bus,
  UserPlus,
  Package,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  HeartHandshake,
  BookOpenCheck,
  WalletCards,
  Building2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  roles?: string[];
}

export const Sidebar: React.FC = () => {
  const { currentNav, setCurrentNav, currentSchool, currentUser, setSelectedStudentId } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'parents', label: 'Parents', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: Briefcase },
    { id: 'classes', label: 'Classes & Subjects', icon: Layers },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'results', label: 'Results & Reports', icon: FileSpreadsheet },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
  ];

  const financeNavItems: NavItem[] = [
    { id: 'fees', label: 'School Fees', icon: CreditCard },
    { id: 'feeding-fees', label: 'Feeding Fees', icon: UtensilsCrossed },
    { id: 'payments', label: 'Payments', icon: Receipt },
    { id: 'receipts', label: 'Official Receipts', icon: FileText },
    { id: 'financial-reports', label: 'Financial Reports', icon: WalletCards },
  ];

  const operationsNavItems: NavItem[] = [
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'inventory', label: 'Inventory', icon: Package },
  ];

  const systemNavItems: NavItem[] = [
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const portalNavItems: NavItem[] = [
    { id: 'portal-parent', label: 'Parent Portal', icon: HeartHandshake },
    { id: 'portal-teacher', label: 'Teacher Portal', icon: BookOpenCheck },
    { id: 'portal-accountant', label: 'Accountant Portal', icon: WalletCards },
    { id: 'portal-super-admin', label: 'Super Admin Portal', icon: Shield },
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => {
    return (
      <div className="mb-5">
        {!isCollapsed && (
          <h4 className="px-3 mb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {title}
          </h4>
        )}
        <div className="space-y-0.5">
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                } ${isCollapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-500'
                  }`}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1 text-left">{item.label}</span>
                )}
                {!isCollapsed && item.badge !== undefined && (
                  <span
                    className={`ml-auto text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-700'
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
      className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200/80">
        {!isCollapsed ? (
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              <span className="tracking-tighter">S</span>
              <span className="text-blue-400">OS</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none">
                SchoolOS
              </h1>
              <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                {currentSchool.name}
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
            SOS
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 hidden lg:block"
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
        <div className="px-4 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate font-medium">{currentSchool.city}, Ghana</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
            {currentSchool.academicYear.split(' ')[0]}
          </span>
        </div>
      )}

      {/* Scrollable Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {renderNavGroup('Main', mainNavItems)}
        {renderNavGroup('Finance', financeNavItems)}
        {renderNavGroup('Operations', operationsNavItems)}
        {renderNavGroup('System', systemNavItems)}
        {renderNavGroup('Role Portals', portalNavItems)}
      </div>

      {/* Footer Info / User Pill */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-semibold text-xs flex items-center justify-center flex-shrink-0">
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {currentUser.name}
              </p>
              <p className="text-[11px] text-slate-500 capitalize truncate">
                {currentUser.role.replace('_', ' ')}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 text-white font-semibold text-xs flex items-center justify-center">
            {currentUser.name[0]}
          </div>
        )}
      </div>
    </aside>
  );
};

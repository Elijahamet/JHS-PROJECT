import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Modals
import { AddStudentModal } from './components/modals/AddStudentModal';
import { RecordPaymentModal } from './components/modals/RecordPaymentModal';
import { CreateAnnouncementModal } from './components/modals/CreateAnnouncementModal';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { ReportCardModal } from './components/modals/ReportCardModal';

// Admin Platform Views
import { DashboardView } from './components/modules/DashboardView';
import { StudentsListView } from './components/modules/StudentsListView';
import { StudentProfileView } from './components/modules/StudentProfileView';
import { ParentsListView } from './components/modules/ParentsListView';
import { TeachersListView } from './components/modules/TeachersListView';
import { ClassesView } from './components/modules/ClassesView';
import { AdmissionsView } from './components/modules/AdmissionsView';
import { AnnouncementsView } from './components/modules/AnnouncementsView';
import { ReportsView } from './components/modules/ReportsView';
import { NotificationsView } from './components/modules/NotificationsView';
import { SettingsView } from './components/modules/SettingsView';

// Dedicated Isolated Platforms
import { TeacherPortalView } from './components/modules/TeacherPortalView';
import { AccountantPortalView } from './components/modules/AccountantPortalView';
import { ParentPortalView } from './components/modules/ParentPortalView';
import { SchoolFeesView } from './components/modules/SchoolFeesView';
import { FeedingFeesView } from './components/modules/FeedingFeesView';
import { PaymentsView } from './components/modules/PaymentsView';

// Auth
import { AuthScreens } from './components/modules/AuthScreens';

export const AppContent: React.FC = () => {
  const {
    currentNav,
    authScreen,
    currentUser,
    selectedStudentId,
    setSelectedStudentId,
  } = useApp();

  if (authScreen !== 'authenticated') {
    return <AuthScreens />;
  }

  // Strict Role-Based View Dispatcher (One role cannot see another role's platform)
  const renderCurrentView = () => {
    switch (currentUser.role) {
      // ==========================================
      // 1. TEACHER PLATFORM
      // ==========================================
      case 'teacher': {
        switch (currentNav) {
          case 'teacher-classes':
            return <TeacherPortalView tab="classes" />;
          case 'teacher-attendance':
            return <TeacherPortalView tab="attendance" />;
          case 'teacher-marks':
            return <TeacherPortalView tab="marks" />;
          case 'teacher-reports':
            return <TeacherPortalView tab="remarks" />;
          case 'teacher-announcements':
            return <TeacherPortalView tab="announcements" />;
          case 'teacher-cockpit':
          default:
            return <TeacherPortalView tab="cockpit" />;
        }
      }

      // ==========================================
      // 2. ACCOUNTANT / BURSAR PLATFORM
      // ==========================================
      case 'accountant': {
        switch (currentNav) {
          case 'accountant-fees':
            return <SchoolFeesView />;
          case 'accountant-feeding':
            return <FeedingFeesView />;
          case 'accountant-payments':
          case 'accountant-receipts':
            return <PaymentsView />;
          case 'accountant-defaulters':
            return <AccountantPortalView tab="defaulters" />;
          case 'accountant-reports':
            return <ReportsView />;
          case 'accountant-cockpit':
          default:
            return <AccountantPortalView tab="cockpit" />;
        }
      }

      // ==========================================
      // 3. PARENT / GUARDIAN PLATFORM
      // ==========================================
      case 'parent': {
        switch (currentNav) {
          case 'parent-reports':
            return <ParentPortalView tab="reports" />;
          case 'parent-attendance':
            return <ParentPortalView tab="attendance" />;
          case 'parent-fees':
            return <ParentPortalView tab="fees" />;
          case 'parent-pay':
            return <ParentPortalView tab="pay" />;
          case 'parent-announcements':
            return <ParentPortalView tab="announcements" />;
          case 'parent-cockpit':
          default:
            return <ParentPortalView tab="overview" />;
        }
      }

      // ==========================================
      // 4. SCHOOL ADMIN PLATFORM
      // ==========================================
      case 'school_admin':
      default: {
        switch (currentNav) {
          case 'students':
            if (selectedStudentId) {
              return (
                <StudentProfileView
                  studentId={selectedStudentId}
                  onBack={() => setSelectedStudentId(null)}
                />
              );
            }
            return (
              <StudentsListView
                onSelectStudent={(id) => setSelectedStudentId(id)}
              />
            );
          case 'student-detail':
            return (
              <StudentProfileView
                studentId={selectedStudentId || 'std_01'}
                onBack={() => setSelectedStudentId(null)}
              />
            );
          case 'parents':
            return <ParentsListView />;
          case 'teachers':
            return <TeachersListView />;
          case 'classes':
            return <ClassesView />;
          case 'admissions':
            return <AdmissionsView />;
          case 'announcements':
            return <AnnouncementsView />;
          case 'reports':
            return <ReportsView />;
          case 'notifications':
            return <NotificationsView />;
          case 'settings':
            return <SettingsView />;
          case 'dashboard':
          default:
            return <DashboardView />;
        }
      }
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar for Desktop - Dynamically scoped to role */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header and Drawer */}
        <MobileNav />

        {/* Desktop Header with Platform Indicator */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals */}
      <AddStudentModal />
      <RecordPaymentModal />
      <CreateAnnouncementModal />
      <ReceiptModal />
      <ReportCardModal />
      <GlobalSearchModal />
    </div>
  );
};
export default AppContent;

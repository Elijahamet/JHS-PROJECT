import React from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Document Modals
import { ReceiptModal } from './components/modals/ReceiptModal';
import { ReportCardModal } from './components/modals/ReportCardModal';

// Dedicated Full-Page Form Views (Pure State Transitions)
import { AddStudentView } from './components/modules/AddStudentView';
import { AddTeacherView } from './components/modules/AddTeacherView';
import { AddClassView } from './components/modules/AddClassView';
import { RecordPaymentView } from './components/modules/RecordPaymentView';
import { AddTransportView } from './components/modules/AddTransportView';
import { CreateAnnouncementView } from './components/modules/CreateAnnouncementView';
import { SendParentNotificationView } from './components/modules/SendParentNotificationView';

// Admin Platform Views
import { DashboardView } from './components/modules/DashboardView';
import { StudentsListView } from './components/modules/StudentsListView';
import { StudentProfileView } from './components/modules/StudentProfileView';
import { ParentsListView } from './components/modules/ParentsListView';
import { TeachersListView } from './components/modules/TeachersListView';
import { ClassesView } from './components/modules/ClassesView';
import { AttendanceView } from './components/modules/AttendanceView';
import { ResultsView } from './components/modules/ResultsView';
import { TransportView } from './components/modules/TransportView';
import { AdmissionsView } from './components/modules/AdmissionsView';
import { InventoryView } from './components/modules/InventoryView';
import { AnnouncementsView } from './components/modules/AnnouncementsView';
import { ReportsView } from './components/modules/ReportsView';
import { NotificationsView } from './components/modules/NotificationsView';
import { SettingsView } from './components/modules/SettingsView';
import { CommunicationsView } from './components/modules/CommunicationsView';

// Dedicated Isolated Platforms
import { TeacherPortalView } from './components/modules/TeacherPortalView';
import { AccountantPortalView } from './components/modules/AccountantPortalView';
import { ParentPortalView } from './components/modules/ParentPortalView';
import { SchoolFeesView } from './components/modules/SchoolFeesView';
import { FeedingFeesView } from './components/modules/FeedingFeesView';
import { PaymentsView } from './components/modules/PaymentsView';

// Auth & Landing
import { AuthScreens } from './components/modules/AuthScreens';
import { LandingPageView } from './components/landing/LandingPageView';

export const AppContent: React.FC = () => {
  const {
    currentNav,
    authScreen,
    currentUser,
    selectedStudentId,
    setSelectedStudentId,
    isAddStudentOpen,
    setIsAddStudentOpen,
    isAddTeacherOpen,
    setIsAddTeacherOpen,
    isAddClassOpen,
    setIsAddClassOpen,
    isRecordPaymentOpen,
    setIsRecordPaymentOpen,
    isAddTransportOpen,
    setIsAddTransportOpen,
    isCreateAnnouncementOpen,
    setIsCreateAnnouncementOpen,
    isSendParentNotificationOpen,
    setIsSendParentNotificationOpen,
    setEnrollTargetClass,
  } = useApp();

  if (authScreen === 'landing') {
    return <LandingPageView />;
  }

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
          case 'teacher-test-scanner':
            return <TeacherPortalView tab="test-scanner" />;
          case 'teacher-reports':
            return <TeacherPortalView tab="remarks" />;
          case 'teacher-announcements':
            if (isCreateAnnouncementOpen) {
              return (
                <CreateAnnouncementView
                  onBack={() => setIsCreateAnnouncementOpen(false)}
                />
              );
            }
            return <TeacherPortalView tab="announcements" />;
          case 'teacher-chat':
            return <TeacherPortalView tab="chat" />;
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
            if (isRecordPaymentOpen) {
              return <RecordPaymentView onBack={() => setIsRecordPaymentOpen(false)} />;
            }
            return <SchoolFeesView />;
          case 'accountant-feeding':
            if (isRecordPaymentOpen) {
              return <RecordPaymentView onBack={() => setIsRecordPaymentOpen(false)} />;
            }
            return <FeedingFeesView />;
          case 'accountant-payments':
          case 'accountant-receipts':
            if (isRecordPaymentOpen) {
              return <RecordPaymentView onBack={() => setIsRecordPaymentOpen(false)} />;
            }
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
          case 'parent-chat':
            return <ParentPortalView tab="chat" />;
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
            if (isAddStudentOpen) {
              return (
                <AddStudentView
                  onBack={() => {
                    setIsAddStudentOpen(false);
                    setEnrollTargetClass(null);
                  }}
                />
              );
            }
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
            if (isAddTeacherOpen) {
              return <AddTeacherView onBack={() => setIsAddTeacherOpen(false)} />;
            }
            return <TeachersListView />;
          case 'classes':
            if (isAddClassOpen) {
              return <AddClassView onBack={() => setIsAddClassOpen(false)} />;
            }
            return <ClassesView />;
          case 'attendance':
            return <AttendanceView />;
          case 'results':
            return <ResultsView />;
          case 'fees':
            if (isRecordPaymentOpen) {
              return <RecordPaymentView onBack={() => setIsRecordPaymentOpen(false)} />;
            }
            return <SchoolFeesView />;
          case 'feeding-fees':
            if (isRecordPaymentOpen) {
              return <RecordPaymentView onBack={() => setIsRecordPaymentOpen(false)} />;
            }
            return <FeedingFeesView />;
          case 'payments':
          case 'receipts':
            if (isRecordPaymentOpen) {
              return <RecordPaymentView onBack={() => setIsRecordPaymentOpen(false)} />;
            }
            return <PaymentsView />;
          case 'financial-reports':
            return <ReportsView />;
          case 'transport':
            if (isAddTransportOpen) {
              return <AddTransportView onBack={() => setIsAddTransportOpen(false)} />;
            }
            return <TransportView />;
          case 'admissions':
            return <AdmissionsView />;
          case 'inventory':
            return <InventoryView />;
          case 'announcements':
            if (isCreateAnnouncementOpen) {
              return <CreateAnnouncementView onBack={() => setIsCreateAnnouncementOpen(false)} />;
            }
            return <AnnouncementsView />;
          case 'communications':
          case 'chat':
          case 'messages':
            if (isSendParentNotificationOpen) {
              return (
                <SendParentNotificationView
                  onBack={() => setIsSendParentNotificationOpen(false)}
                />
              );
            }
            return <CommunicationsView />;
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

      {/* Global Dialogs & Document Previews */}
      <ReceiptModal />
      <ReportCardModal />
      <GlobalSearchModal />
    </div>
  );
};
export default AppContent;

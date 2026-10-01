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

// Views
import { DashboardView } from './components/modules/DashboardView';
import { StudentsListView } from './components/modules/StudentsListView';
import { StudentProfileView } from './components/modules/StudentProfileView';
import { ParentsListView } from './components/modules/ParentsListView';
import { TeachersListView } from './components/modules/TeachersListView';
import { ClassesView } from './components/modules/ClassesView';
import { AttendanceView } from './components/modules/AttendanceView';
import { ResultsView } from './components/modules/ResultsView';
import { SchoolFeesView } from './components/modules/SchoolFeesView';
import { FeedingFeesView } from './components/modules/FeedingFeesView';
import { PaymentsView } from './components/modules/PaymentsView';
import { TransportView } from './components/modules/TransportView';
import { AdmissionsView } from './components/modules/AdmissionsView';
import { InventoryView } from './components/modules/InventoryView';
import { AnnouncementsView } from './components/modules/AnnouncementsView';
import { ReportsView } from './components/modules/ReportsView';
import { NotificationsView } from './components/modules/NotificationsView';
import { SettingsView } from './components/modules/SettingsView';

// Dedicated Persona Portals
import { ParentPortalView } from './components/modules/ParentPortalView';
import { TeacherPortalView } from './components/modules/TeacherPortalView';
import { AccountantPortalView } from './components/modules/AccountantPortalView';
import { SuperAdminView } from './components/modules/SuperAdminView';
import { AuthScreens } from './components/modules/AuthScreens';

export const AppContent: React.FC = () => {
  const {
    currentNav,
    authScreen,
    selectedStudentId,
    setSelectedStudentId,
  } = useApp();

  if (authScreen !== 'authenticated') {
    return <AuthScreens />;
  }

  const renderCurrentView = () => {
    switch (currentNav) {
      case 'dashboard':
        return <DashboardView />;
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
      case 'attendance':
        return <AttendanceView />;
      case 'results':
        return <ResultsView />;
      case 'fees':
        return <SchoolFeesView />;
      case 'feeding-fees':
        return <FeedingFeesView />;
      case 'payments':
      case 'receipts':
        return <PaymentsView />;
      case 'financial-reports':
        return <ReportsView />;
      case 'transport':
        return <TransportView />;
      case 'admissions':
        return <AdmissionsView />;
      case 'inventory':
        return <InventoryView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'reports':
        return <ReportsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      case 'portal-parent':
        return <ParentPortalView />;
      case 'portal-teacher':
        return <TeacherPortalView />;
      case 'portal-accountant':
        return <AccountantPortalView />;
      case 'portal-super-admin':
        return <SuperAdminView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile Header and Drawer */}
        <MobileNav />

        {/* Desktop Header */}
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

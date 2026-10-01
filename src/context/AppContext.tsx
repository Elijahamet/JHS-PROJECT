import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  UserRole,
  School,
  Student,
  Parent,
  Teacher,
  ClassRoom,
  PaymentRecord,
  FeeStructureItem,
  AssessmentRecord,
  AttendanceRecord,
  TransportBus,
  TransportRoute,
  AdmissionApplication,
  InventoryItem,
  AnnouncementItem,
  SchoolNotification,
  ChatMessage,
  ParentNotificationRecord,
} from '../types';
import {
  mockCurrentSchool,
  mockSchoolsList,
  mockUsers,
  mockStudents,
  mockParents,
  mockTeachers,
  mockClasses,
  mockFeeStructure,
  mockPayments,
  mockAssessments,
  mockAttendanceToday,
  mockBuses,
  mockRoutes,
  mockApplications,
  mockInventory,
  mockAnnouncements,
  mockNotifications,
  mockChatMessages,
  mockParentNotifications,
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  setUserRole: (role: UserRole) => void;
  schools: School[];
  currentSchool: School;
  setCurrentSchool: (school: School) => void;
  currentNav: string;
  setCurrentNav: (nav: string) => void;
  authScreen: 'authenticated' | 'login' | 'signup' | 'forgot_password' | 'reset_password';
  setAuthScreen: (screen: 'authenticated' | 'login' | 'signup' | 'forgot_password' | 'reset_password') => void;

  // Selected item states
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  selectedReceiptPayment: PaymentRecord | null;
  setSelectedReceiptPayment: (payment: PaymentRecord | null) => void;

  // Collections & CRUD
  students: Student[];
  addStudent: (studentData: Partial<Student>) => void;
  parents: Parent[];
  teachers: Teacher[];
  addTeacher: (teacherData: Partial<Teacher>) => void;
  classes: ClassRoom[];
  feeStructures: FeeStructureItem[];
  payments: PaymentRecord[];
  addPayment: (paymentData: {
    studentId: string;
    category: PaymentRecord['category'];
    amount: number;
    paymentMethod: PaymentRecord['paymentMethod'];
    reference: string;
    notes?: string;
  }) => PaymentRecord;
  assessments: AssessmentRecord[];
  updateAssessment: (assessmentId: string, updates: Partial<AssessmentRecord>) => void;
  attendance: AttendanceRecord[];
  saveClassAttendance: (classId: string, updatedRecords: AttendanceRecord[]) => void;
  buses: TransportBus[];
  addTransportBus: (busData: Partial<TransportBus>) => void;
  routes: TransportRoute[];
  addTransportRoute: (routeData: Partial<TransportRoute>) => void;
  updateRouteStatus: (routeId: string, status: TransportRoute['status']) => void;
  applications: AdmissionApplication[];
  updateApplicationStatus: (appId: string, status: AdmissionApplication['status']) => void;
  inventory: InventoryItem[];
  announcements: AnnouncementItem[];
  addAnnouncement: (announcement: Omit<AnnouncementItem, 'id' | 'publishDate' | 'authorName' | 'authorRole'>) => void;
  notifications: SchoolNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Chat & Communication (Offline-First)
  chatMessages: ChatMessage[];
  activeChatContactId: string | null;
  setActiveChatContactId: (id: string | null) => void;
  sendChatMessage: (recipientId: string, message: string, attachmentName?: string) => void;
  openChatWith: (contactId: string) => void;
  isOnline: boolean;
  isSimulatedOffline: boolean;
  toggleSimulatedOffline: () => void;

  // Parent Notifications
  parentNotifications: ParentNotificationRecord[];
  sendParentNotification: (notification: Omit<ParentNotificationRecord, 'id' | 'sentAt' | 'sentBy' | 'status' | 'deliveredCount' | 'recipientCount'>) => void;
  isSendParentNotificationOpen: boolean;
  setIsSendParentNotificationOpen: (open: boolean) => void;

  // Modals
  isAddStudentOpen: boolean;
  setIsAddStudentOpen: (open: boolean) => void;
  isAddTeacherOpen: boolean;
  setIsAddTeacherOpen: (open: boolean) => void;
  isAddTransportOpen: boolean;
  setIsAddTransportOpen: (open: boolean) => void;
  isRecordPaymentOpen: boolean;
  setIsRecordPaymentOpen: (open: boolean) => void;
  isCreateAnnouncementOpen: boolean;
  setIsCreateAnnouncementOpen: (open: boolean) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  isReportCardModalOpen: boolean;
  setIsReportCardModalOpen: (open: boolean) => void;
  isGlobalSearchOpen: boolean;
  setIsGlobalSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schools] = useState<School[]>(mockSchoolsList);
  const [currentSchool, setCurrentSchool] = useState<School>(mockCurrentSchool);
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // default: Cynthia Arthur (School Admin)
  const [currentNav, setCurrentNav] = useState<string>('dashboard');
  const [authScreen, setAuthScreen] = useState<'authenticated' | 'login' | 'signup' | 'forgot_password' | 'reset_password'>('authenticated');

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState<PaymentRecord | null>(null);

  // Data collections
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [parents] = useState<Parent[]>(mockParents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [classes] = useState<ClassRoom[]>(mockClasses);
  const [feeStructures] = useState<FeeStructureItem[]>(mockFeeStructure);
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments);
  const [assessments, setAssessments] = useState<AssessmentRecord[]>(mockAssessments);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendanceToday);
  const [buses, setBuses] = useState<TransportBus[]>(mockBuses);
  const [routes, setRoutes] = useState<TransportRoute[]>(mockRoutes);
  const [applications, setApplications] = useState<AdmissionApplication[]>(mockApplications);
  const [inventory] = useState<InventoryItem[]>(mockInventory);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(mockAnnouncements);
  const [notifications, setNotifications] = useState<SchoolNotification[]>(mockNotifications);

  // Network & Offline Status
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== 'undefined' ? navigator.onLine : true;
  });
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);

  const effectiveOnline = isOnline && !isSimulatedOffline;

  const toggleSimulatedOffline = () => {
    setIsSimulatedOffline((prev) => !prev);
  };

  // Chat & Messaging (Offline-First Persistent Storage)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_chat_messages_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse cached chat messages', e);
    }
    return mockChatMessages;
  });

  const [activeChatContactId, setActiveChatContactId] = useState<string | null>('tch_01');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('schoolos_chat_messages_v2', JSON.stringify(chatMessages));
    } catch (e) {
      console.warn('Failed to cache chat messages locally', e);
    }
  }, [chatMessages]);

  // Listen to cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'schoolos_chat_messages_v2' && e.newValue) {
        try {
          setChatMessages(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Listen to browser online / offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // When returning online, flush / sync any queued offline messages
  useEffect(() => {
    if (effectiveOnline) {
      setChatMessages((prev) => {
        const hasQueued = prev.some((m) => m.status === 'queued' || m.isOffline);
        if (!hasQueued) return prev;
        return prev.map((m) =>
          m.status === 'queued' || m.isOffline
            ? { ...m, status: 'delivered', isOffline: false }
            : m
        );
      });
    }
  }, [effectiveOnline]);

  // Parent Notifications
  const [parentNotifications, setParentNotifications] = useState<ParentNotificationRecord[]>(mockParentNotifications);
  const [isSendParentNotificationOpen, setIsSendParentNotificationOpen] = useState(false);

  // Modals
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isAddTransportOpen, setIsAddTransportOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isReportCardModalOpen, setIsReportCardModalOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Switch role helper
  const setUserRole = (role: UserRole) => {
    const matchedUser = mockUsers.find((u) => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
    } else {
      setCurrentUser({
        ...currentUser,
        role,
      });
    }

    // Auto-redirect to dedicated role cockpit
    if (role === 'parent') {
      setCurrentNav('parent-cockpit');
    } else if (role === 'teacher') {
      setCurrentNav('teacher-cockpit');
    } else if (role === 'accountant') {
      setCurrentNav('accountant-cockpit');
    } else {
      setCurrentNav('dashboard');
    }
  };

  const addStudent = (studentData: Partial<Student>) => {
    const newId = `std_${Date.now()}`;
    const studentCode = `BFA-2025-${String(students.length + 1).padStart(4, '0')}`;
    const newStudent: Student = {
      id: newId,
      studentId: studentCode,
      firstName: studentData.firstName || 'New',
      lastName: studentData.lastName || 'Student',
      gender: studentData.gender || 'Male',
      dateOfBirth: studentData.dateOfBirth || '2012-01-01',
      classId: studentData.classId || 'cls_jhs1a',
      className: studentData.className || 'JHS 1A',
      stage: studentData.className?.startsWith('JHS') ? 'JHS' : 'Primary',
      admissionDate: new Date().toISOString().split('T')[0],
      admissionYear: '2025',
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      parentId: studentData.parentId || 'par_01',
      parentName: studentData.parentName || 'Parent Guardian',
      parentPhone: studentData.parentPhone || '+233 24 000 0000',
      parentEmail: studentData.parentEmail || 'parent@example.com',
      parentRelationship: studentData.parentRelationship || 'Father',
      residentialAddress: studentData.residentialAddress || 'Accra, Ghana',
      emergencyContact: studentData.emergencyContact || '+233 20 000 0000',
      medicalNotes: studentData.medicalNotes || 'None',
      participatesInFeeding: studentData.participatesInFeeding ?? true,
      busRouteId: studentData.busRouteId,
      busRouteName: studentData.busRouteName,
      schoolFeeBalance: 2000,
      feedingFeeBalance: 600,
      attendanceRate: 100,
      lastGradeAverage: 0,
    };

    setStudents([newStudent, ...students]);
  };

  const addTeacher = (teacherData: Partial<Teacher>) => {
    const newId = `tch_${Date.now()}`;
    const staffId = teacherData.staffId || `STF-2025-${String(teachers.length + 1).padStart(3, '0')}`;
    const newTeacher: Teacher = {
      id: newId,
      staffId,
      fullName: teacherData.fullName || 'New Teacher',
      email: teacherData.email || 'teacher@brightfuture.edu.gh',
      phone: teacherData.phone || '+233 24 000 0000',
      qualification: teacherData.qualification || 'B.Ed. Education',
      classesAssigned: teacherData.classesAssigned || ['JHS 1A'],
      subjectsAssigned: teacherData.subjectsAssigned || ['General Science'],
      isClassTeacherOf: teacherData.isClassTeacherOf,
      status: teacherData.status || 'Active',
      joinDate: new Date().toISOString().split('T')[0],
    };
    setTeachers([newTeacher, ...teachers]);

    const newNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Teacher Appointed — ${newTeacher.fullName}`,
      message: `${newTeacher.fullName} (${staffId}) was registered successfully to academic staff.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'teachers',
    };
    setNotifications([newNotif, ...notifications]);
  };

  const addTransportBus = (busData: Partial<TransportBus>) => {
    const newId = `bus_${Date.now()}`;
    const newBus: TransportBus = {
      id: newId,
      busNumber: busData.busNumber || `School Bus ${buses.length + 1}`,
      registrationNumber: busData.registrationNumber || `GE-${Math.floor(1000 + Math.random() * 9000)}-24`,
      capacity: busData.capacity || 30,
      driverName: busData.driverName || 'Kofi Asare',
      driverPhone: busData.driverPhone || '+233 24 555 0100',
      routeId: busData.routeId || (routes[0]?.id || 'rt_01'),
      routeName: busData.routeName || (routes[0]?.name || 'Madina - Adenta Route'),
      status: busData.status || 'Active',
    };
    setBuses([newBus, ...buses]);
  };

  const addTransportRoute = (routeData: Partial<TransportRoute>) => {
    const newId = `rt_${Date.now()}`;
    const newRoute: TransportRoute = {
      id: newId,
      name: routeData.name || 'New Shuttle Corridor',
      busNumber: routeData.busNumber || (buses[0]?.busNumber || 'Bus 01'),
      driverName: routeData.driverName || (buses[0]?.driverName || 'Assigned Driver'),
      driverPhone: routeData.driverPhone || (buses[0]?.driverPhone || '+233 24 000 0000'),
      stops: routeData.stops && routeData.stops.length > 0 ? routeData.stops : ['Campus Gate', 'Main Junction'],
      studentCount: routeData.studentCount || 0,
      status: 'Not Started',
      morningDeparture: routeData.morningDeparture || '06:30 AM',
      afternoonDeparture: routeData.afternoonDeparture || '03:45 PM',
    };
    setRoutes([newRoute, ...routes]);
  };

  const addPayment = (paymentData: {
    studentId: string;
    category: PaymentRecord['category'];
    amount: number;
    paymentMethod: PaymentRecord['paymentMethod'];
    reference: string;
    notes?: string;
  }): PaymentRecord => {
    const targetStudent = students.find((s) => s.id === paymentData.studentId) || students[0];
    const receiptNum = `BFA-RCP-2025-${String(Math.floor(1000 + Math.random() * 9000))}`;
    
    // Calculate new balance
    let remaining = 0;
    if (paymentData.category === 'School Fees') {
      remaining = Math.max(0, targetStudent.schoolFeeBalance - paymentData.amount);
    } else if (paymentData.category === 'Feeding Fees') {
      remaining = Math.max(0, targetStudent.feedingFeeBalance - paymentData.amount);
    }

    const newPayment: PaymentRecord = {
      id: `pay_${Date.now()}`,
      receiptNumber: receiptNum,
      studentId: targetStudent.id,
      studentName: `${targetStudent.firstName} ${targetStudent.lastName}`,
      studentCode: targetStudent.studentId,
      className: targetStudent.className,
      parentName: targetStudent.parentName,
      category: paymentData.category,
      amount: paymentData.amount,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: paymentData.paymentMethod,
      reference: paymentData.reference,
      notes: paymentData.notes || `Payment for ${paymentData.category}`,
      authorizedStaff: currentUser.name,
      balanceAfterPayment: remaining,
      status: 'Completed',
    };

    // Update student balances
    setStudents(
      students.map((s) => {
        if (s.id === targetStudent.id) {
          if (paymentData.category === 'School Fees') {
            return { ...s, schoolFeeBalance: remaining };
          }
          if (paymentData.category === 'Feeding Fees') {
            return { ...s, feedingFeeBalance: remaining };
          }
        }
        return s;
      })
    );

    setPayments([newPayment, ...payments]);

    // Add a notification
    const newNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Payment Received — ${targetStudent.firstName} ${targetStudent.lastName}`,
      message: `${paymentData.paymentMethod} payment of GH₵ ${paymentData.amount.toFixed(2)} received for ${paymentData.category}. Receipt #${receiptNum}.`,
      type: 'payment',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'receipts',
    };
    setNotifications([newNotif, ...notifications]);

    return newPayment;
  };

  const addAnnouncement = (item: Omit<AnnouncementItem, 'id' | 'publishDate' | 'authorName' | 'authorRole'>) => {
    const newAnn: AnnouncementItem = {
      ...item,
      id: `ann_${Date.now()}`,
      publishDate: new Date().toISOString().split('T')[0],
      authorName: currentUser.name,
      authorRole: currentUser.role === 'school_admin' ? 'Headmistress' : 'Staff Admin',
    };
    setAnnouncements([newAnn, ...announcements]);
  };

  const updateAssessment = (assessmentId: string, updates: Partial<AssessmentRecord>) => {
    setAssessments(
      assessments.map((a) => {
        if (a.id === assessmentId) {
          const updated = { ...a, ...updates };
          const total = (updated.classworkScore || 0) + (updated.homeworkScore || 0) + (updated.examScore || 0);
          let grade = 'Grade 9';
          if (total >= 85) grade = 'Grade 1 (Excellent)';
          else if (total >= 75) grade = 'Grade 2 (Very Good)';
          else if (total >= 65) grade = 'Grade 3 (Good)';
          else if (total >= 55) grade = 'Grade 4 (Credit)';
          else if (total >= 50) grade = 'Grade 5 (Pass)';
          return {
            ...updated,
            totalScore: total,
            grade,
          };
        }
        return a;
      })
    );
  };

  const saveClassAttendance = (_classId: string, updatedRecords: AttendanceRecord[]) => {
    const recordIds = new Set(updatedRecords.map((r) => r.studentId));
    const filtered = attendance.filter((r) => !recordIds.has(r.studentId));
    setAttendance([...updatedRecords, ...filtered]);
  };

  const updateRouteStatus = (routeId: string, status: TransportRoute['status']) => {
    setRoutes(
      routes.map((r) => (r.id === routeId ? { ...r, status } : r))
    );
  };

  const updateApplicationStatus = (appId: string, status: AdmissionApplication['status']) => {
    setApplications(
      applications.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const sendChatMessage = (recipientId: string, message: string, attachmentName?: string) => {
    let recName = 'Staff / Parent';
    let recRole: 'school_admin' | 'teacher' | 'parent' = 'school_admin';

    if (currentUser.role === 'school_admin') {
      const teacher = teachers.find((t) => t.id === recipientId);
      const parent = parents.find((p) => p.id === recipientId);
      recName = teacher ? teacher.fullName : parent ? parent.fullName : 'Staff / Parent';
      recRole = teacher ? 'teacher' : 'parent';
    } else {
      // If teacher or parent is sending to Admin
      recName = 'Mrs. Cynthia Arthur (Headmistress)';
      recRole = 'school_admin';
    }

    const isOfflineMsg = !effectiveOnline;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role as 'school_admin' | 'teacher' | 'parent',
      recipientId,
      recipientName: recName,
      recipientRole: recRole,
      message,
      timestamp: 'Just now',
      isRead: true,
      attachmentName,
      status: isOfflineMsg ? 'queued' : 'delivered',
      isOffline: isOfflineMsg,
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // If online, simulate realistic auto-reply after 1.2s
    if (!isOfflineMsg) {
      setTimeout(() => {
        let replyText = '';
        if (currentUser.role === 'school_admin') {
          if (recRole === 'teacher') {
            const replies = [
              `Thank you for the directive, Madam Cynthia. I have noted this and will act on it immediately.`,
              `Understood! The academic records and student performance metrics have been updated in the portal.`,
              `Thank you, Headmistress. I will discuss this with the form students and keep you informed.`,
              `Received clearly. I will ensure the terminal remarks are reviewed.`,
            ];
            replyText = replies[Math.floor(Math.random() * replies.length)];
          } else {
            const replies = [
              `Thank you very much, Madam Headmistress, for the prompt update regarding our ward.`,
              `Understood and received. We really appreciate the school's communication and dedication to the pupils.`,
              `Thank you. I have received the alert and will follow up accordingly.`,
              `Great, thank you! I will review the report card on the parent dashboard.`,
            ];
            replyText = replies[Math.floor(Math.random() * replies.length)];
          }
        } else {
          // If teacher or parent sent message to Admin
          const replies = [
            `Hello ${currentUser.name}, message received and noted by the Headmistress's desk. We will attend to this promptly.`,
            `Thank you for the update ${currentUser.name}. I have reviewed your submission.`,
            `Received with thanks. Keep up the good work.`,
            `Acknowledged. If urgent, feel free to visit the administration office.`,
          ];
          replyText = replies[Math.floor(Math.random() * replies.length)];
        }

        const autoReply: ChatMessage = {
          id: `msg_${Date.now() + 1}`,
          senderId: recipientId,
          senderName: recName,
          senderRole: recRole,
          recipientId: currentUser.id,
          recipientName: currentUser.name,
          recipientRole: currentUser.role as 'school_admin' | 'teacher' | 'parent',
          message: replyText,
          timestamp: 'Just now',
          isRead: true,
          status: 'delivered',
          isOffline: false,
        };

        setChatMessages((prev) => [...prev, autoReply]);
      }, 1200);
    }
  };

  const sendParentNotification = (
    notifData: Omit<ParentNotificationRecord, 'id' | 'sentAt' | 'sentBy' | 'status' | 'deliveredCount' | 'recipientCount'>
  ) => {
    const count =
      notifData.targetAudience === 'All Parents'
        ? parents.length || 34
        : notifData.targetAudience === 'Class'
        ? 12
        : 1;

    const newNotif: ParentNotificationRecord = {
      ...notifData,
      id: `pnotif_${Date.now()}`,
      sentAt: 'Just now',
      sentBy: currentUser.name || 'Mrs. Cynthia Arthur (Headmistress)',
      status: 'Delivered',
      recipientCount: count,
      deliveredCount: count,
    };

    setParentNotifications((prev) => [newNotif, ...prev]);

    // Also push into global notifications so parent portal / notification dropdown sees it
    const appNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: notifData.title,
      message: notifData.message,
      type:
        notifData.category === 'fee_reminder'
          ? 'payment'
          : notifData.category === 'academic'
          ? 'attendance'
          : 'announcement',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'parent-announcements',
    };
    setNotifications((prev) => [appNotif, ...prev]);

    // Also inject into announcements
    const ann: AnnouncementItem = {
      id: `ann_${Date.now()}`,
      title: notifData.title,
      message: notifData.message,
      audience: notifData.targetAudience === 'All Parents' ? 'Parents Only' : 'Whole School',
      targetClass: notifData.targetDetail,
      authorName: currentUser.name,
      authorRole: 'School Headmistress',
      publishDate: 'Today',
      status: 'Published',
      priority: notifData.priority,
    };
    setAnnouncements((prev) => [ann, ...prev]);
  };

  const openChatWith = (contactId: string) => {
    setActiveChatContactId(contactId);
    setCurrentNav('communications');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        setUserRole,
        schools,
        currentSchool,
        setCurrentSchool,
        currentNav,
        setCurrentNav,
        authScreen,
        setAuthScreen,
        selectedStudentId,
        setSelectedStudentId,
        selectedReceiptPayment,
        setSelectedReceiptPayment,
        students,
        addStudent,
        parents,
        teachers,
        addTeacher,
        classes,
        feeStructures,
        payments,
        addPayment,
        assessments,
        updateAssessment,
        attendance,
        saveClassAttendance,
        buses,
        addTransportBus,
        routes,
        addTransportRoute,
        updateRouteStatus,
        applications,
        updateApplicationStatus,
        inventory,
        announcements,
        addAnnouncement,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        chatMessages,
        activeChatContactId,
        setActiveChatContactId,
        sendChatMessage,
        openChatWith,
        isOnline,
        isSimulatedOffline,
        toggleSimulatedOffline,
        parentNotifications,
        sendParentNotification,
        isSendParentNotificationOpen,
        setIsSendParentNotificationOpen,
        isAddStudentOpen,
        setIsAddStudentOpen,
        isAddTeacherOpen,
        setIsAddTeacherOpen,
        isAddTransportOpen,
        setIsAddTransportOpen,
        isRecordPaymentOpen,
        setIsRecordPaymentOpen,
        isCreateAnnouncementOpen,
        setIsCreateAnnouncementOpen,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        isReportCardModalOpen,
        setIsReportCardModalOpen,
        isGlobalSearchOpen,
        setIsGlobalSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

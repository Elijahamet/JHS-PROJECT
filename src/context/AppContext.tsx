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
  StudentReportCardRecord,
  ReportCardStatus,
  AcademicStage,
} from '../types';
import {
  StudentFormData,
  DEFAULT_STUDENT_FORM,
  TeacherFormData,
  DEFAULT_TEACHER_FORM,
  ClassFormData,
  DEFAULT_CLASS_FORM,
  PaymentFormData,
  DEFAULT_PAYMENT_FORM,
} from '../types/drafts';
import { detectAcademicStage, getSubjectsForStage } from '../utils/curriculum';
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
  mockReportCards,
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
  authScreen: 'landing' | 'authenticated' | 'login' | 'signup' | 'forgot_password' | 'reset_password';
  setAuthScreen: (screen: 'landing' | 'authenticated' | 'login' | 'signup' | 'forgot_password' | 'reset_password') => void;

  // Selected item states
  selectedStudentId: string | null;
  setSelectedStudentId: (id: string | null) => void;
  selectedReceiptPayment: PaymentRecord | null;
  setSelectedReceiptPayment: (payment: PaymentRecord | null) => void;
  selectedClassFilter: string;
  setSelectedClassFilter: (cls: string) => void;

  // Collections & CRUD
  students: Student[];
  addStudent: (studentData: Partial<Student> & { customSchoolFee?: number }) => void;
  deleteStudent: (studentId: string) => void;
  parents: Parent[];
  teachers: Teacher[];
  addTeacher: (teacherData: Partial<Teacher>) => void;
  deleteTeacher: (teacherId: string) => void;
  classes: ClassRoom[];
  addClass: (classData: Partial<ClassRoom>, assignTeacherId?: string) => void;
  updateClass: (classId: string, updates: Partial<ClassRoom>) => void;
  deleteClass: (classId: string) => void;
  assignTeacherToClass: (classId: string, teacherId: string) => void;
  feeStructures: FeeStructureItem[];
  setFeeStructures: React.Dispatch<React.SetStateAction<FeeStructureItem[]>>;
  updateFeeStructureItem: (feeId: string, updates: Partial<FeeStructureItem>) => void;
  addFeeStructureItem: (feeItem: Omit<FeeStructureItem, 'id'>) => void;
  deleteFeeStructureItem: (feeId: string) => void;
  getClassFee: (classNameOrId: string) => number;
  updateClassFee: (classIdOrName: string, newFee: number, applyToEnrolledStudents?: boolean) => void;
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

  // Terminal Report Cards Inspection & Parent Dispatch Workflow
  reportCards: StudentReportCardRecord[];
  submitReportForInspection: (reportId: string) => void;
  inspectAndApproveReport: (reportId: string, headteacherRemarks: string, notes?: string) => void;
  rejectReportInspection: (reportId: string, reason: string) => void;
  sendReportToParent: (reportId: string, channels?: ('portal' | 'sms' | 'whatsapp')[], teacherNote?: string) => void;
  bulkApproveReports: (classId: string, remarks?: string) => void;
  bulkSendApprovedReports: (classId: string, channels?: ('portal' | 'sms' | 'whatsapp')[]) => void;
  updateReportCardData: (reportId: string, updates: Partial<StudentReportCardRecord>) => void;

  // Modals
  isAddStudentOpen: boolean;
  setIsAddStudentOpen: (open: boolean) => void;
  enrollTargetClass: { id: string; name: string } | null;
  setEnrollTargetClass: (val: { id: string; name: string } | null) => void;
  openAddStudentForClass: (cls?: { id: string; name: string } | string) => void;
  seedStandardGhanaianClasses: () => void;
  isAddClassOpen: boolean;
  setIsAddClassOpen: (open: boolean) => void;
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

  // Form Drafts (Preserved across sidebar navigation switches)
  studentDraft: StudentFormData;
  setStudentDraft: React.Dispatch<React.SetStateAction<StudentFormData>>;
  updateStudentDraft: (fields: Partial<StudentFormData>) => void;
  clearStudentDraft: () => void;
  hasStudentDraft: boolean;

  teacherDraft: TeacherFormData;
  setTeacherDraft: React.Dispatch<React.SetStateAction<TeacherFormData>>;
  updateTeacherDraft: (fields: Partial<TeacherFormData>) => void;
  clearTeacherDraft: () => void;
  hasTeacherDraft: boolean;

  classDraft: ClassFormData;
  setClassDraft: React.Dispatch<React.SetStateAction<ClassFormData>>;
  updateClassDraft: (fields: Partial<ClassFormData>) => void;
  clearClassDraft: () => void;
  hasClassDraft: boolean;

  paymentDraft: PaymentFormData;
  setPaymentDraft: React.Dispatch<React.SetStateAction<PaymentFormData>>;
  updatePaymentDraft: (fields: Partial<PaymentFormData>) => void;
  clearPaymentDraft: () => void;
  hasPaymentDraft: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schools] = useState<School[]>(mockSchoolsList);
  const [currentSchool, setCurrentSchoolState] = useState<School>(() => {
    try {
      const savedSchool = localStorage.getItem('schoolos_current_school_v6');
      if (savedSchool) {
        const parsed = JSON.parse(savedSchool);
        if (parsed && parsed.name) return parsed;
      }
      const savedName = localStorage.getItem('schoolos_registered_school_name_v6');
      if (savedName) {
        return {
          ...mockCurrentSchool,
          name: savedName,
        };
      }
    } catch (e) {
      console.warn('Failed to load current school from storage', e);
    }
    return mockCurrentSchool;
  });

  const setCurrentSchool = (school: School) => {
    setCurrentSchoolState(school);
    try {
      localStorage.setItem('schoolos_current_school_v6', JSON.stringify(school));
      localStorage.setItem('schoolos_registered_school_name_v6', school.name);
    } catch (e) {
      console.warn('Failed to persist current school', e);
    }
  };

  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const savedSchool = localStorage.getItem('schoolos_current_school_v6');
      const savedName = localStorage.getItem('schoolos_registered_school_name_v6');
      const activeSchoolName = savedSchool ? JSON.parse(savedSchool)?.name : savedName;
      if (activeSchoolName) {
        return {
          ...mockUsers[0],
          schoolName: activeSchoolName,
        };
      }
    } catch (e) {
      console.warn('Failed to load user school name', e);
    }
    return mockUsers[0];
  });

  // Keep currentUser.schoolName synced with currentSchool.name
  useEffect(() => {
    if (currentSchool?.name && currentUser.schoolName !== currentSchool.name) {
      setCurrentUser((prev) => ({
        ...prev,
        schoolName: currentSchool.name,
      }));
    }
  }, [currentSchool?.name]);
  const [currentNav, setCurrentNav] = useState<string>('dashboard');
  const [authScreen, setAuthScreen] = useState<'landing' | 'authenticated' | 'login' | 'signup' | 'forgot_password' | 'reset_password'>('landing');

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState<PaymentRecord | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');

  // Purge legacy cached keys from prior builds to ensure zero stale mock data persists
  useEffect(() => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('schoolos_') && !key.endsWith('_v6')) {
          localStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.warn('Failed to purge legacy cache', e);
    }
  }, []);

  // Data collections
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_students_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cached students', e);
    }
    return mockStudents;
  });

  const [parents, setParents] = useState<Parent[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_parents_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cached parents', e);
    }
    return mockParents;
  });
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_teachers_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cached teachers', e);
    }
    return mockTeachers;
  });

  const [classes, setClasses] = useState<ClassRoom[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_classes_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cached classes', e);
    }
    return mockClasses;
  });

  useEffect(() => {
    try {
      localStorage.setItem('schoolos_teachers_v6', JSON.stringify(teachers));
    } catch (e) {
      console.warn('Failed to save teachers to storage', e);
    }
  }, [teachers]);

  useEffect(() => {
    try {
      localStorage.setItem('schoolos_classes_v6', JSON.stringify(classes));
    } catch (e) {
      console.warn('Failed to save classes to storage', e);
    }
  }, [classes]);

  useEffect(() => {
    try {
      localStorage.setItem('schoolos_students_v6', JSON.stringify(students));
    } catch (e) {
      console.warn('Failed to save students to storage', e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('schoolos_parents_v6', JSON.stringify(parents));
    } catch (e) {
      console.warn('Failed to save parents to storage', e);
    }
  }, [parents]);

  const [feeStructures, setFeeStructures] = useState<FeeStructureItem[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_fee_structures_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cached fee structures', e);
    }
    return mockFeeStructure;
  });

  useEffect(() => {
    try {
      localStorage.setItem('schoolos_fee_structures_v6', JSON.stringify(feeStructures));
    } catch (e) {
      console.warn('Failed to save fee structures to storage', e);
    }
  }, [feeStructures]);
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
      const saved = localStorage.getItem('schoolos_chat_messages_v6');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse cached chat messages', e);
    }
    return mockChatMessages;
  });

  const [activeChatContactId, setActiveChatContactId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('schoolos_chat_messages_v6', JSON.stringify(chatMessages));
    } catch (e) {
      console.warn('Failed to cache chat messages locally', e);
    }
  }, [chatMessages]);

  // Listen to cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'schoolos_chat_messages_v6' && e.newValue) {
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

  // Terminal Report Cards Inspection & Dispatch Workflow
  const [reportCards, setReportCards] = useState<StudentReportCardRecord[]>(() => {
    try {
      const saved = localStorage.getItem('schoolos_report_cards_v6');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse cached report cards', e);
    }
    return mockReportCards;
  });

  useEffect(() => {
    try {
      localStorage.setItem('schoolos_report_cards_v6', JSON.stringify(reportCards));
    } catch (e) {
      console.warn('Failed to save report cards to storage', e);
    }
  }, [reportCards]);

  // Persistent Form Drafts (Preserved across sidebar navigation switches)
  const [studentDraft, setStudentDraft] = useState<StudentFormData>(() => {
    try {
      const saved = sessionStorage.getItem('schoolos_draft_student');
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_FORM;
    } catch {
      return DEFAULT_STUDENT_FORM;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('schoolos_draft_student', JSON.stringify(studentDraft));
    } catch {}
  }, [studentDraft]);

  const updateStudentDraft = (fields: Partial<StudentFormData>) => {
    setStudentDraft((prev) => ({ ...prev, ...fields }));
  };

  const clearStudentDraft = () => {
    setStudentDraft(DEFAULT_STUDENT_FORM);
    try {
      sessionStorage.removeItem('schoolos_draft_student');
    } catch {}
  };

  const hasStudentDraft = Boolean(
    studentDraft.firstName.trim() ||
    studentDraft.lastName.trim() ||
    studentDraft.parentName.trim() ||
    studentDraft.parentPhone.trim() ||
    studentDraft.medicalNotes.trim()
  );

  // Teacher Draft
  const [teacherDraft, setTeacherDraft] = useState<TeacherFormData>(() => {
    try {
      const saved = sessionStorage.getItem('schoolos_draft_teacher');
      return saved ? JSON.parse(saved) : DEFAULT_TEACHER_FORM;
    } catch {
      return DEFAULT_TEACHER_FORM;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('schoolos_draft_teacher', JSON.stringify(teacherDraft));
    } catch {}
  }, [teacherDraft]);

  const updateTeacherDraft = (fields: Partial<TeacherFormData>) => {
    setTeacherDraft((prev) => ({ ...prev, ...fields }));
  };

  const clearTeacherDraft = () => {
    setTeacherDraft(DEFAULT_TEACHER_FORM);
    try {
      sessionStorage.removeItem('schoolos_draft_teacher');
    } catch {}
  };

  const hasTeacherDraft = Boolean(teacherDraft.fullName.trim());

  // Class Draft
  const [classDraft, setClassDraft] = useState<ClassFormData>(() => {
    try {
      const saved = sessionStorage.getItem('schoolos_draft_class');
      return saved ? JSON.parse(saved) : DEFAULT_CLASS_FORM;
    } catch {
      return DEFAULT_CLASS_FORM;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('schoolos_draft_class', JSON.stringify(classDraft));
    } catch {}
  }, [classDraft]);

  const updateClassDraft = (fields: Partial<ClassFormData>) => {
    setClassDraft((prev) => ({ ...prev, ...fields }));
  };

  const clearClassDraft = () => {
    setClassDraft(DEFAULT_CLASS_FORM);
    try {
      sessionStorage.removeItem('schoolos_draft_class');
    } catch {}
  };

  const hasClassDraft = Boolean(classDraft.name.trim());

  // Payment Draft
  const [paymentDraft, setPaymentDraft] = useState<PaymentFormData>(() => {
    try {
      const saved = sessionStorage.getItem('schoolos_draft_payment');
      return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_FORM;
    } catch {
      return DEFAULT_PAYMENT_FORM;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('schoolos_draft_payment', JSON.stringify(paymentDraft));
    } catch {}
  }, [paymentDraft]);

  const updatePaymentDraft = (fields: Partial<PaymentFormData>) => {
    setPaymentDraft((prev) => ({ ...prev, ...fields }));
  };

  const clearPaymentDraft = () => {
    setPaymentDraft(DEFAULT_PAYMENT_FORM);
    try {
      sessionStorage.removeItem('schoolos_draft_payment');
    } catch {}
  };

  const hasPaymentDraft = Boolean(paymentDraft.notes.trim() || paymentDraft.reference.trim());

  // Navigation-Aware Modal & Page View Triggers
  const [isAddStudentOpen, setIsAddStudentOpenRaw] = useState(false);
  const setIsAddStudentOpen = (open: boolean) => {
    setIsAddStudentOpenRaw(open);
    if (open) {
      setCurrentNav('students');
    }
  };

  const [enrollTargetClass, setEnrollTargetClass] = useState<{ id: string; name: string } | null>(null);

  const openAddStudentForClass = (cls?: { id: string; name: string } | string) => {
    if (typeof cls === 'string') {
      const found = classes.find((c) => c.id === cls || c.name.toLowerCase() === cls.toLowerCase());
      setEnrollTargetClass(found ? { id: found.id, name: found.name } : { id: '', name: cls });
    } else if (cls) {
      setEnrollTargetClass(cls);
    } else {
      setEnrollTargetClass(null);
    }
    setIsAddStudentOpen(true);
  };

  const [isAddClassOpen, setIsAddClassOpenRaw] = useState(false);
  const setIsAddClassOpen = (open: boolean) => {
    setIsAddClassOpenRaw(open);
    if (open) {
      setCurrentNav('classes');
    }
  };

  const [isAddTeacherOpen, setIsAddTeacherOpenRaw] = useState(false);
  const setIsAddTeacherOpen = (open: boolean) => {
    setIsAddTeacherOpenRaw(open);
    if (open) {
      setCurrentNav('teachers');
    }
  };

  const [isAddTransportOpen, setIsAddTransportOpenRaw] = useState(false);
  const setIsAddTransportOpen = (open: boolean) => {
    setIsAddTransportOpenRaw(open);
    if (open) {
      setCurrentNav('transport');
    }
  };

  const [isRecordPaymentOpen, setIsRecordPaymentOpenRaw] = useState(false);
  const setIsRecordPaymentOpen = (open: boolean) => {
    setIsRecordPaymentOpenRaw(open);
    if (open) {
      setCurrentNav(currentUser.role === 'accountant' ? 'accountant-payments' : 'payments');
    }
  };

  const [isCreateAnnouncementOpen, setIsCreateAnnouncementOpenRaw] = useState(false);
  const setIsCreateAnnouncementOpen = (open: boolean) => {
    setIsCreateAnnouncementOpenRaw(open);
    if (open) {
      setCurrentNav(currentUser.role === 'teacher' ? 'teacher-announcements' : 'announcements');
    }
  };

  const [isSendParentNotificationOpen, setIsSendParentNotificationOpenRaw] = useState(false);
  const setIsSendParentNotificationOpen = (open: boolean) => {
    setIsSendParentNotificationOpenRaw(open);
    if (open) {
      setCurrentNav('communications');
    }
  };
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

  const getClassFee = (classNameOrId: string): number => {
    if (!classNameOrId) return 1500;
    // 1. Matching class room configured termFee
    const matchedClass = classes.find(
      (c) =>
        c.id === classNameOrId ||
        c.name.toLowerCase().trim() === classNameOrId.toLowerCase().trim()
    );
    if (matchedClass && matchedClass.termFee !== undefined && matchedClass.termFee > 0) {
      return matchedClass.termFee;
    }

    // 2. Matching fee structure entry
    const matchedFee = feeStructures.find(
      (f) =>
        f.category === 'School Fees' &&
        f.status === 'Active' &&
        ((matchedClass &&
          (f.applicableClass === matchedClass.name ||
            f.applicableClass === matchedClass.stage ||
            f.applicableClass === 'All')) ||
          f.applicableClass.toLowerCase().trim() === classNameOrId.toLowerCase().trim())
    );
    if (matchedFee && matchedFee.amount > 0) {
      return matchedFee.amount;
    }

    // 3. Fallback stage defaults
    const stage =
      matchedClass?.stage ||
      (classNameOrId.toUpperCase().startsWith('KG') ||
      classNameOrId.toUpperCase().startsWith('NUR') ||
      classNameOrId.toUpperCase().startsWith('CR')
        ? 'Kindergarten'
        : classNameOrId.toUpperCase().startsWith('JHS')
        ? 'JHS'
        : 'Primary');

    return stage === 'Kindergarten' ? 1200 : stage === 'JHS' ? 2000 : 1500;
  };

  const updateClassFee = (
    classIdOrName: string,
    newFee: number,
    applyToEnrolledStudents = false
  ) => {
    const parsedFee = Math.max(0, Number(newFee));
    const targetClass = classes.find(
      (c) =>
        c.id === classIdOrName ||
        c.name.toLowerCase().trim() === classIdOrName.toLowerCase().trim()
    );
    const className = targetClass ? targetClass.name : classIdOrName;

    // 1. Update ClassRoom object in classes
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classIdOrName || c.name.toLowerCase().trim() === classIdOrName.toLowerCase().trim()
          ? { ...c, termFee: parsedFee }
          : c
      )
    );

    // 2. Update or insert in feeStructures
    setFeeStructures((prev) => {
      const existingIndex = prev.findIndex(
        (f) =>
          f.category === 'School Fees' &&
          (f.applicableClass === className || (targetClass && f.applicableClass === targetClass.stage))
      );
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          name: `${className} Term Tuition Fee`,
          amount: parsedFee,
          applicableClass: className,
        };
        return copy;
      } else {
        const newItem: FeeStructureItem = {
          id: `fee_${Date.now()}`,
          name: `${className} Term Tuition Fee`,
          category: 'School Fees',
          amount: parsedFee,
          academicYear: '2024 / 2025',
          term: 'Term 2',
          applicableClass: className,
          dueDate: '2025-02-15',
          status: 'Active',
        };
        return [...prev, newItem];
      }
    });

    // 3. If applyToEnrolledStudents is true, update the balances of all students in that class
    if (applyToEnrolledStudents && targetClass) {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.classId === targetClass.id || s.className === targetClass.name) {
            const oldTotal = s.totalBilledSchoolFee || getClassFee(s.className) || 2000;
            const previouslyPaid = Math.max(0, oldTotal - s.schoolFeeBalance);
            const newBalance = Math.max(0, parsedFee - previouslyPaid);
            return {
              ...s,
              totalBilledSchoolFee: parsedFee,
              schoolFeeBalance: newBalance,
            };
          }
          return s;
        })
      );
    }

    // 4. Send notification
    const notif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Tuition Fee Updated — ${className}`,
      message: `Term Tuition Fee for ${className} set to GH₵ ${parsedFee.toLocaleString()}${
        applyToEnrolledStudents ? ' and updated for enrolled pupils.' : '.'
      }`,
      type: 'payment',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'fees',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const updateFeeStructureItem = (feeId: string, updates: Partial<FeeStructureItem>) => {
    setFeeStructures((prev) =>
      prev.map((f) => (f.id === feeId ? { ...f, ...updates } : f))
    );
  };

  const addFeeStructureItem = (itemData: Omit<FeeStructureItem, 'id'>) => {
    const newItem: FeeStructureItem = {
      ...itemData,
      id: `fee_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    };
    setFeeStructures((prev) => [...prev, newItem]);
  };

  const deleteFeeStructureItem = (feeId: string) => {
    setFeeStructures((prev) => prev.filter((f) => f.id !== feeId));
  };

  const addStudent = (studentData: Partial<Student> & { customSchoolFee?: number }) => {
    const newId = `std_${Date.now()}`;
    const studentCode = `BFA-2025-${String(students.length + 1).padStart(4, '0')}`;
    const studentFullName = `${studentData.firstName || 'New'} ${studentData.lastName || 'Student'}`.trim();
    const rawParentName = (studentData.parentName || '').trim();
    const rawParentPhone = (studentData.parentPhone || '').trim();
    const rawParentEmail = (studentData.parentEmail || '').trim();
    const rawParentAddress = (studentData.residentialAddress || 'Accra, Ghana').trim();
    const rawParentRel = (studentData.parentRelationship as 'Father' | 'Mother' | 'Guardian') || 'Guardian';

    let resolvedParentId = studentData.parentId || '';

    // Search for existing parent by ID, exact phone, or case-insensitive full name
    const existingParent = parents.find((p) => {
      if (resolvedParentId && p.id === resolvedParentId) return true;
      if (rawParentPhone && p.phone && p.phone.replace(/[\s\-()]/g, '') === rawParentPhone.replace(/[\s\-()]/g, '')) return true;
      if (rawParentName && p.fullName.toLowerCase().trim() === rawParentName.toLowerCase().trim()) return true;
      return false;
    });

    if (existingParent) {
      resolvedParentId = existingParent.id;
      setParents((prevParents) =>
        prevParents.map((p) => {
          if (p.id === existingParent.id) {
            const updatedChildrenIds = p.childrenIds.includes(newId)
              ? p.childrenIds
              : [...p.childrenIds, newId];
            const updatedChildrenNames = p.childrenNames.includes(studentFullName)
              ? p.childrenNames
              : [...p.childrenNames, studentFullName];
            return {
              ...p,
              phone: rawParentPhone || p.phone,
              email: rawParentEmail || p.email,
              residentialAddress: rawParentAddress || p.residentialAddress,
              childrenIds: updatedChildrenIds,
              childrenNames: updatedChildrenNames,
              totalBalanceDue: p.totalBalanceDue + 2600,
            };
          }
          return p;
        })
      );

      // System notification identifying multi-ward / sibling linking
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: `Family Account Linked: ${existingParent.fullName}`,
          message: `${studentFullName} successfully linked as a sibling ward to ${existingParent.fullName} (${existingParent.childrenNames.length + 1} enrolled students on record).`,
          type: 'system',
          timestamp: new Date().toISOString(),
          isRead: false,
          linkTo: 'parents',
        },
        ...prev,
      ]);
    } else if (rawParentName) {
      resolvedParentId = `par_${Date.now()}`;
      const newParentRecord: Parent = {
        id: resolvedParentId,
        fullName: rawParentName,
        phone: rawParentPhone || '+233 24 000 0000',
        email: rawParentEmail || `${rawParentName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@gmail.com`,
        residentialAddress: rawParentAddress,
        occupation: 'Parent / Guardian',
        relationship: rawParentRel,
        childrenIds: [newId],
        childrenNames: [studentFullName],
        totalBalanceDue: 2600,
      };

      setParents((prevParents) => [newParentRecord, ...prevParents]);

      // System notification for newly registered parent
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: `New Parent Registered: ${rawParentName}`,
          message: `${rawParentName} registered to Parents & Guardians Directory with ward ${studentFullName}.`,
          type: 'admission',
          timestamp: new Date().toISOString(),
          isRead: false,
          linkTo: 'parents',
        },
        ...prev,
      ]);
    }

    // =========================================================================
    // RESOLVE CLASS ASSIGNMENT & AUTOMATICALLY PLACE INTO CLASS STREAM
    // =========================================================================
    const rawClassName = (studentData.className || '').trim();
    let targetClassId = studentData.classId || '';
    let targetClassName = rawClassName;

    // Check if class exists in current classes by ID or case-insensitive name
    let matchedClass = classes.find(
      (c) => (targetClassId && c.id === targetClassId) ||
             (rawClassName && c.name.toLowerCase() === rawClassName.toLowerCase())
    );

    let resolvedStage = studentData.stage || 'Primary';
    let finalClassId = targetClassId;
    let finalClassName = targetClassName;

    if (matchedClass) {
      finalClassId = matchedClass.id;
      finalClassName = matchedClass.name;
      resolvedStage = matchedClass.stage;

      // Increment studentCount of the matched class
      setClasses((prevClasses) =>
        prevClasses.map((cls) =>
          cls.id === matchedClass!.id
            ? { ...cls, studentCount: cls.studentCount + 1 }
            : cls
        )
      );
    } else {
      // Class does not exist yet! Automatically create it so it shows on Classes & Subjects page
      finalClassName = rawClassName || (classes.length > 0 ? classes[0].name : 'Basic 1');
      resolvedStage = detectAcademicStage(finalClassName);
      finalClassId = `cls_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

      const newClassRoom: ClassRoom = {
        id: finalClassId,
        name: finalClassName,
        code: finalClassName.replace(/\s+/g, '').toUpperCase(),
        stage: resolvedStage,
        classTeacherId: '',
        classTeacherName: 'Unassigned',
        studentCount: 1,
        capacity: resolvedStage === 'Kindergarten' ? 25 : resolvedStage === 'Primary' ? 35 : 40,
        roomNumber: `Block ${resolvedStage === 'JHS' ? 'C' : resolvedStage === 'Primary' ? 'B' : 'A'} - ${classes.length + 101}`,
        averageAttendance: 100,
        subjects: getSubjectsForStage(resolvedStage),
      };

      setClasses((prevClasses) => [...prevClasses, newClassRoom]);

      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}_cls_auto`,
          title: `Class Stream Created: ${finalClassName}`,
          message: `${finalClassName} was automatically created on Classes & Subjects with standard GES curriculum and enrolled ${studentFullName}.`,
          type: 'system',
          timestamp: new Date().toISOString(),
          isRead: false,
          linkTo: 'classes',
        },
        ...prev,
      ]);
    }

    const newStudent: Student = {
      id: newId,
      studentId: studentCode,
      firstName: studentData.firstName || 'New',
      lastName: studentData.lastName || 'Student',
      gender: studentData.gender || 'Male',
      dateOfBirth: studentData.dateOfBirth || '2012-01-01',
      classId: finalClassId,
      className: finalClassName,
      stage: resolvedStage,
      admissionDate: new Date().toISOString().split('T')[0],
      admissionYear: '2025',
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      parentId: resolvedParentId || (existingParent ? existingParent.id : 'par_01'),
      parentName: existingParent ? existingParent.fullName : rawParentName || 'Parent Guardian',
      parentPhone: rawParentPhone || (existingParent ? existingParent.phone : '+233 24 000 0000'),
      parentEmail: rawParentEmail || (existingParent ? existingParent.email : 'parent@example.com'),
      parentRelationship: rawParentRel,
      residentialAddress: rawParentAddress,
      emergencyContact: studentData.emergencyContact || rawParentPhone || '+233 20 000 0000',
      medicalNotes: studentData.medicalNotes || 'None',
      participatesInFeeding: studentData.participatesInFeeding ?? true,
      busRouteId: studentData.busRouteId,
      busRouteName: studentData.busRouteName,
      totalBilledSchoolFee: studentData.customSchoolFee !== undefined && !isNaN(Number(studentData.customSchoolFee))
        ? Number(studentData.customSchoolFee)
        : getClassFee(finalClassName),
      schoolFeeBalance: studentData.customSchoolFee !== undefined && !isNaN(Number(studentData.customSchoolFee))
        ? Number(studentData.customSchoolFee)
        : getClassFee(finalClassName),
      feedingFeeBalance: studentData.participatesInFeeding ? 600 : 0,
      attendanceRate: 100,
      lastGradeAverage: 0,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setEnrollTargetClass(null);
    clearStudentDraft();
  };

  const deleteStudent = (studentId: string) => {
    const targetStudent = students.find((s) => s.id === studentId);
    if (!targetStudent) return;

    // 1. Remove from students list
    setStudents((prev) => prev.filter((s) => s.id !== studentId));

    // 2. Decrement student count on the class
    setClasses((prev) =>
      prev.map((c) =>
        c.name === targetStudent.className || c.id === targetStudent.classId
          ? { ...c, studentCount: Math.max(0, (c.studentCount || 1) - 1) }
          : c
      )
    );

    // 3. Update parent's linked children if any
    setParents((prev) =>
      prev.map((p) => {
        if (p.childrenIds?.includes(studentId)) {
          return {
            ...p,
            childrenIds: p.childrenIds.filter((id) => id !== studentId),
            childrenNames: p.childrenNames?.filter(
              (name) => !name.includes(targetStudent.lastName)
            ),
          };
        }
        return p;
      })
    );

    // 4. Clear selected student if active
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null);
    }

    // 5. Send notification
    const notif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Student Record Deleted — ${targetStudent.firstName} ${targetStudent.lastName}`,
      message: `${targetStudent.firstName} ${targetStudent.lastName} (${targetStudent.studentId}) was permanently removed from ${targetStudent.className}.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'students',
    };
    setNotifications((prev) => [notif, ...prev]);
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
    clearTeacherDraft();
  };

  const deleteTeacher = (teacherId: string) => {
    const targetTeacher = teachers.find((t) => t.id === teacherId);
    if (!targetTeacher) return;

    // 1. Remove from teachers list
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId));

    // 2. Unassign from any class streams where this teacher was class teacher
    setClasses((prevClasses) =>
      prevClasses.map((c) =>
        c.classTeacherId === teacherId
          ? { ...c, classTeacherId: '', classTeacherName: 'Unassigned' }
          : c
      )
    );

    // 3. Send notification
    const notif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Teacher Removed — ${targetTeacher.fullName}`,
      message: `${targetTeacher.fullName} (${targetTeacher.staffId}) was removed from instructional faculty.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'teachers',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const addClass = (classData: Partial<ClassRoom>, assignTeacherId?: string) => {
    const newId = `cls_${Date.now()}`;
    const stage: AcademicStage = classData.stage || (
      classData.name?.toUpperCase().startsWith('KG') || classData.name?.toUpperCase().startsWith('NUR') || classData.name?.toUpperCase().startsWith('CR')
        ? 'Kindergarten'
        : classData.name?.startsWith('JHS')
        ? 'JHS'
        : 'Primary'
    );

    const targetTeacherId = assignTeacherId || classData.classTeacherId;
    const assignedTeacher = targetTeacherId ? teachers.find((t) => t.id === targetTeacherId) : undefined;

    const defaultSubjects = stage === 'Kindergarten'
      ? [
          'Language and Literacy',
          'Early Numeracy & Mathematics',
          'Our World Our People',
          'Creative Arts & Colouring',
          'Ghanaian Language & Culture',
          'Physical Development & Health',
          'Rhymes, Songs & Storytelling',
          'Moral & Social Development',
        ]
      : stage === 'JHS'
      ? ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language', 'Career Technology', 'Creative Arts & Design', 'Computing', 'French']
      : ['English Language', 'Mathematics', 'Natural Science', 'Our World Our People', 'Religious and Moral Education', 'Ghanaian Language (Twi/Ga)', 'Creative Arts & Design', 'Computing'];

    const termFee = classData.termFee || getClassFee(classData.name || '');

    const newClass: ClassRoom = {
      id: newId,
      name: classData.name || 'New Class Stream',
      code: classData.code || (classData.name ? classData.name.replace(/\s+/g, '').toUpperCase() : 'CLS'),
      stage,
      classTeacherId: assignedTeacher ? assignedTeacher.id : '',
      classTeacherName: assignedTeacher ? assignedTeacher.fullName : 'Unassigned',
      studentCount: classData.studentCount || 0,
      capacity: classData.capacity || (stage === 'Kindergarten' ? 25 : stage === 'JHS' ? 40 : 35),
      roomNumber: classData.roomNumber || (stage === 'Kindergarten' ? 'KG Department - Room 1' : 'Block B - Room 101'),
      averageAttendance: 100,
      subjects: classData.subjects && classData.subjects.length > 0 ? classData.subjects : defaultSubjects,
      termFee,
    };

    setClasses((prev) => [...prev, newClass]);

    // If a teacher was assigned, update that teacher's profile
    if (assignedTeacher) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((t) => {
          if (t.id === assignedTeacher.id) {
            const currentClasses = t.classesAssigned || [];
            const hasClass = currentClasses.includes(newClass.name);
            return {
              ...t,
              isClassTeacherOf: newClass.name,
              classesAssigned: hasClass ? currentClasses : [...currentClasses, newClass.name],
            };
          }
          return t;
        })
      );
    }

    const teacherMsg = assignedTeacher
      ? ` with ${assignedTeacher.fullName} officially appointed as Class Teacher.`
      : '.';
    const newNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Class Stream Established — ${newClass.name}`,
      message: `Stream ${newClass.name} (${newClass.stage}) has been established${teacherMsg}`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'classes',
    };
    setNotifications((prev) => [newNotif, ...prev]);
    clearClassDraft();
  };

  const seedStandardGhanaianClasses = () => {
    const standardStreams: Partial<ClassRoom>[] = [
      { name: 'KG 1', code: 'KG1', stage: 'Kindergarten', capacity: 25, roomNumber: 'Block A - Room KG1', termFee: 1200 },
      { name: 'KG 2', code: 'KG2', stage: 'Kindergarten', capacity: 25, roomNumber: 'Block A - Room KG2', termFee: 1200 },
      { name: 'Basic 1', code: 'B1', stage: 'Primary', capacity: 35, roomNumber: 'Block B - Room 1', termFee: 1500 },
      { name: 'Basic 2', code: 'B2', stage: 'Primary', capacity: 35, roomNumber: 'Block B - Room 2', termFee: 1500 },
      { name: 'Basic 3', code: 'B3', stage: 'Primary', capacity: 35, roomNumber: 'Block B - Room 3', termFee: 1500 },
      { name: 'Basic 4', code: 'B4', stage: 'Primary', capacity: 35, roomNumber: 'Block B - Room 4', termFee: 1600 },
      { name: 'Basic 5', code: 'B5', stage: 'Primary', capacity: 35, roomNumber: 'Block B - Room 5', termFee: 1600 },
      { name: 'Basic 6', code: 'B6', stage: 'Primary', capacity: 35, roomNumber: 'Block B - Room 6', termFee: 1600 },
      { name: 'JHS 1', code: 'JHS1', stage: 'JHS', capacity: 40, roomNumber: 'Block C - Room JHS1', termFee: 2000 },
      { name: 'JHS 2', code: 'JHS2', stage: 'JHS', capacity: 40, roomNumber: 'Block C - Room JHS2', termFee: 2100 },
      { name: 'JHS 3', code: 'JHS3', stage: 'JHS', capacity: 40, roomNumber: 'Block C - Room JHS3', termFee: 2200 },
    ];

    standardStreams.forEach((st) => addClass(st));
  };

  const assignTeacherToClass = (classId: string, teacherId: string) => {
    const targetClass = classes.find((c) => c.id === classId);
    if (!targetClass) return;

    const targetTeacher = teachers.find((t) => t.id === teacherId);
    const teacherName = targetTeacher ? targetTeacher.fullName : 'Unassigned';
    const teacherIdVal = targetTeacher ? targetTeacher.id : '';

    setClasses((prevClasses) =>
      prevClasses.map((c) =>
        c.id === classId
          ? { ...c, classTeacherId: teacherIdVal, classTeacherName: teacherName }
          : c
      )
    );

    if (targetTeacher) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((t) => {
          if (t.id === targetTeacher.id) {
            const currentClasses = t.classesAssigned || [];
            const hasClass = currentClasses.includes(targetClass.name);
            return {
              ...t,
              isClassTeacherOf: targetClass.name,
              classesAssigned: hasClass ? currentClasses : [...currentClasses, targetClass.name],
            };
          }
          return t;
        })
      );
    }

    const newNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Teacher Appointed to ${targetClass.name}`,
      message: `${teacherName} was appointed as Class Teacher for ${targetClass.name}.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'classes',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateClass = (classId: string, updates: Partial<ClassRoom>) => {
    setClasses((prevClasses) =>
      prevClasses.map((c) => (c.id === classId ? { ...c, ...updates } : c))
    );
    if (updates.termFee !== undefined && !isNaN(Number(updates.termFee))) {
      updateClassFee(classId, Number(updates.termFee), false);
    }
  };

  const deleteClass = (classId: string) => {
    const targetClass = classes.find((c) => c.id === classId);
    if (!targetClass) return;

    setClasses((prevClasses) => prevClasses.filter((c) => c.id !== classId));

    if (targetClass.classTeacherId) {
      setTeachers((prevTeachers) =>
        prevTeachers.map((t) => {
          if (t.id === targetClass.classTeacherId) {
            return {
              ...t,
              isClassTeacherOf: t.isClassTeacherOf === targetClass.name ? undefined : t.isClassTeacherOf,
              classesAssigned: (t.classesAssigned || []).filter((cls) => cls !== targetClass.name),
            };
          }
          return t;
        })
      );
    }

    const newNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Class Stream Decommissioned — ${targetClass.name}`,
      message: `Stream ${targetClass.name} has been removed from the academic register.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'classes',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addTransportBus = (busData: Partial<TransportBus>) => {
    const newId = `bus_${Date.now()}`;
    const newBus: TransportBus = {
      id: newId,
      busNumber: busData.busNumber || `School Bus ${buses.length + 1}`,
      registrationNumber: busData.registrationNumber || `GE-${Math.floor(1000 + Math.random() * 9000)}-24`,
      capacity: busData.capacity || 30,
      driverName: busData.driverName || 'Driver Unassigned',
      driverPhone: busData.driverPhone || 'Not Provided',
      routeId: busData.routeId || '',
      routeName: busData.routeName || 'Unassigned Route',
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
    clearPaymentDraft();

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
    setAssessments((prev) => {
      const exists = prev.some((a) => a.id === assessmentId);
      if (exists) {
        return prev.map((a) => {
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
        });
      } else {
        const total = (updates.classworkScore || 0) + (updates.homeworkScore || 0) + (updates.examScore || 0);
        let grade = 'Grade 9';
        if (total >= 85) grade = 'Grade 1 (Excellent)';
        else if (total >= 75) grade = 'Grade 2 (Very Good)';
        else if (total >= 65) grade = 'Grade 3 (Good)';
        else if (total >= 55) grade = 'Grade 4 (Credit)';
        else if (total >= 50) grade = 'Grade 5 (Pass)';
        const newRecord: AssessmentRecord = {
          id: assessmentId,
          studentId: updates.studentId || '',
          studentName: updates.studentName || '',
          classId: updates.classId || classes[0]?.id || '',
          className: updates.className || classes[0]?.name || '',
          subjectName: updates.subjectName || classes[0]?.subjects[0] || '',
          academicYear: updates.academicYear || '2024 / 2025',
          term: updates.term || 'Term 2',
          classworkScore: updates.classworkScore || 0,
          homeworkScore: updates.homeworkScore || 0,
          examScore: updates.examScore || 0,
          totalScore: total,
          grade,
          teacherComment: updates.teacherComment || 'Satisfactory work.',
        };
        return [...prev, newRecord];
      }
    });
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

  // Terminal Report Cards Inspection & Parent Dispatch Workflow
  const submitReportForInspection = (reportId: string) => {
    setReportCards((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'submitted_for_inspection' as const } : r))
    );
    const target = reportCards.find((r) => r.id === reportId);
    const notif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: 'Report Submitted for Inspection',
      message: `Form Teacher submitted terminal report card for ${target?.studentName || 'Student'} (${target?.className || 'JHS 2A'}) for administrative inspection.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'results',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const inspectAndApproveReport = (reportId: string, headteacherRemarks: string, notes?: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    let approvedStudent = '';
    let approvedClass = '';
    let approvedParent = '';
    setReportCards((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          approvedStudent = r.studentName;
          approvedClass = r.className;
          approvedParent = r.parentName;
          return {
            ...r,
            status: 'inspected_approved' as const,
            headteacherRemarks: headteacherRemarks || r.headteacherRemarks,
            inspectedBy: currentUser.name || 'Mrs. Cynthia Arthur (Headmistress)',
            inspectedAt: timestamp,
            inspectionNotes: notes || 'Verified against continuous assessment marks and curriculum requirements. Endorsed by Headmistress.',
          };
        }
        return r;
      })
    );

    const notif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: 'Report Card Inspected & Approved',
      message: `Headmistress Mrs. Cynthia Arthur has inspected and approved the terminal report for ${approvedStudent} (${approvedClass}). The Form Teacher may now dispatch this report to ${approvedParent}.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'teacher-reports',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const rejectReportInspection = (reportId: string, reason: string) => {
    setReportCards((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'draft' as const, inspectionNotes: `Revision requested: ${reason}` } : r))
    );
  };

  const sendReportToParent = (
    reportId: string,
    channels: ('portal' | 'sms' | 'whatsapp')[] = ['portal', 'sms'],
    teacherNote?: string
  ) => {
    const target = reportCards.find((r) => r.id === reportId);
    if (!target) return;

    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setReportCards((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status: 'sent_to_parent' as const,
            sentByTeacher: currentUser.name || 'Mr. Emmanuel Darko (Form Master)',
            sentAt: timestamp,
            sentChannels: channels,
            teacherNoteToParent: teacherNote || `Official inspected terminal report card dispatched for ${r.studentName}.`,
          };
        }
        return r;
      })
    );

    const pNotif: ParentNotificationRecord = {
      id: `pnotif_${Date.now()}`,
      title: `Official Report Card Delivered: ${target.studentName}`,
      message: `Dear ${target.parentName}, the official inspected terminal report card for ${target.studentName} (${target.className}) has been signed by the Headmistress and released. Overall average: ${target.overallAverage}%, Position: ${target.classPosition}th of ${target.classTotalStudents}. ${teacherNote || ''}`,
      category: 'academic',
      targetAudience: 'Individual',
      targetDetail: target.parentName,
      channels: ['in_app', 'sms'],
      priority: 'Important',
      sentAt: 'Just now',
      sentBy: currentUser.name || 'Form Master',
      recipientCount: 1,
      deliveredCount: 1,
      status: 'Delivered',
    };
    setParentNotifications((prev) => [pNotif, ...prev]);

    const appNotif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: `Terminal Report Card Delivered: ${target.studentName}`,
      message: `The official inspected Term 2 report card for your ward ${target.studentName} is now ready to view and download.`,
      type: 'attendance',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'parent-reports',
    };
    setNotifications((prev) => [appNotif, ...prev]);
  };

  const bulkApproveReports = (classId: string, remarks?: string) => {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    setReportCards((prev) =>
      prev.map((r) => {
        if (r.status === 'submitted_for_inspection' || r.status === 'draft') {
          return {
            ...r,
            status: 'inspected_approved' as const,
            headteacherRemarks: remarks || r.headteacherRemarks || 'Terminal marks and conduct inspected and approved by Headmistress.',
            inspectedBy: currentUser.name || 'Mrs. Cynthia Arthur (Headmistress)',
            inspectedAt: timestamp,
            inspectionNotes: 'Bulk administrative inspection completed and signed.',
          };
        }
        return r;
      })
    );

    const notif: SchoolNotification = {
      id: `notif_${Date.now()}`,
      title: 'Class Reports Inspected & Endorsed',
      message: `All terminal reports for ${classId || 'JHS 2A'} have been approved by the Headmistress. Teachers can now send them to parents.`,
      type: 'system',
      timestamp: 'Just now',
      isRead: false,
      linkTo: 'teacher-reports',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const bulkSendApprovedReports = (classId: string, channels: ('portal' | 'sms' | 'whatsapp')[] = ['portal', 'sms']) => {
    const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    let count = 0;
    setReportCards((prev) =>
      prev.map((r) => {
        if (r.status === 'inspected_approved') {
          count++;
          return {
            ...r,
            status: 'sent_to_parent' as const,
            sentByTeacher: currentUser.name || 'Mr. Emmanuel Darko (Form Master)',
            sentAt: timestamp,
            sentChannels: channels,
            teacherNoteToParent: 'Official terminal report card dispatched to parent.',
          };
        }
        return r;
      })
    );

    const pNotif: ParentNotificationRecord = {
      id: `pnotif_${Date.now()}`,
      title: 'Class Terminal Reports Released to Parents',
      message: `Official inspected report cards for ${classId || 'JHS 2A'} have been dispatched to parents by the class teacher.`,
      category: 'academic',
      targetAudience: 'Class',
      targetDetail: `${classId || 'JHS 2A'} Parents`,
      channels: ['in_app', 'sms'],
      priority: 'Important',
      sentAt: 'Just now',
      sentBy: currentUser.name || 'Form Master',
      recipientCount: count || 34,
      deliveredCount: count || 34,
      status: 'Delivered',
    };
    setParentNotifications((prev) => [pNotif, ...prev]);
  };

  const updateReportCardData = (reportId: string, updates: Partial<StudentReportCardRecord>) => {
    setReportCards((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, ...updates } : r))
    );
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
        selectedClassFilter,
        setSelectedClassFilter,
        students,
        addStudent,
        deleteStudent,
        parents,
        teachers,
        addTeacher,
        deleteTeacher,
        classes,
        addClass,
        updateClass,
        deleteClass,
        assignTeacherToClass,
        feeStructures,
        setFeeStructures,
        updateFeeStructureItem,
        addFeeStructureItem,
        deleteFeeStructureItem,
        getClassFee,
        updateClassFee,
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
        reportCards,
        submitReportForInspection,
        inspectAndApproveReport,
        rejectReportInspection,
        sendReportToParent,
        bulkApproveReports,
        bulkSendApprovedReports,
        updateReportCardData,
        isAddStudentOpen,
        setIsAddStudentOpen,
        enrollTargetClass,
        setEnrollTargetClass,
        openAddStudentForClass,
        seedStandardGhanaianClasses,
        isAddClassOpen,
        setIsAddClassOpen,
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
        studentDraft,
        setStudentDraft,
        updateStudentDraft,
        clearStudentDraft,
        hasStudentDraft,
        teacherDraft,
        setTeacherDraft,
        updateTeacherDraft,
        clearTeacherDraft,
        hasTeacherDraft,
        classDraft,
        setClassDraft,
        updateClassDraft,
        clearClassDraft,
        hasClassDraft,
        paymentDraft,
        setPaymentDraft,
        updatePaymentDraft,
        clearPaymentDraft,
        hasPaymentDraft,
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

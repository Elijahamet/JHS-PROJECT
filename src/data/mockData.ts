import {
  School,
  Student,
  Parent,
  Teacher,
  ClassRoom,
  AttendanceRecord,
  AssessmentRecord,
  ReportCard,
  FeeStructureItem,
  PaymentRecord,
  TransportBus,
  TransportRoute,
  AdmissionApplication,
  InventoryItem,
  AnnouncementItem,
  SchoolNotification,
  User,
  ChatMessage,
  ParentNotificationRecord,
  StudentReportCardRecord,
  ReportCardStatus,
} from '../types';

export const mockCurrentSchool: School = {
  id: 'sch_default',
  name: 'SchoolOS Academy',
  motto: 'Knowledge, Integrity & Leadership',
  crestUrl: '/assets/school-crest.svg',
  address: '',
  city: 'Accra',
  region: 'Greater Accra',
  country: 'Ghana',
  phone: '',
  email: 'admin@school.edu.gh',
  website: '',
  academicYear: '2024 / 2025',
  currentTerm: 'Term 2',
  studentCount: 0,
  teacherCount: 0,
  classesCount: 0,
  plan: 'Standard',
};

export const mockSchoolsList: School[] = [
  mockCurrentSchool,
];

export const mockUsers: User[] = [
  {
    id: 'usr_admin',
    name: 'School Administrator',
    email: 'admin@school.edu.gh',
    role: 'school_admin',
    schoolId: 'sch_default',
    schoolName: 'SchoolOS Academy',
  },
  {
    id: 'usr_teacher',
    name: 'Class Teacher',
    email: 'teacher@school.edu.gh',
    role: 'teacher',
    schoolId: 'sch_default',
    schoolName: 'SchoolOS Academy',
  },
  {
    id: 'usr_accountant',
    name: 'School Accountant',
    email: 'bursar@school.edu.gh',
    role: 'accountant',
    schoolId: 'sch_default',
    schoolName: 'SchoolOS Academy',
  },
  {
    id: 'usr_parent',
    name: 'Parent / Guardian',
    email: 'parent@school.edu.gh',
    role: 'parent',
    schoolId: 'sch_default',
    schoolName: 'SchoolOS Academy',
    linkedStudentId: '',
  },
];

// Standard Ghanaian Basic & JHS Class Structure - Clean Slate
export const mockClasses: ClassRoom[] = [];

// Operational Collections - Clean Slate
export const mockTeachers: Teacher[] = [];

export const mockParents: Parent[] = [];

export const mockStudents: Student[] = [];
export const mockChatMessages: ChatMessage[] = [];
export const mockParentNotifications: ParentNotificationRecord[] = [];

export const mockFeeStructure: FeeStructureItem[] = [];

export const mockPayments: PaymentRecord[] = [];
export const mockAssessments: AssessmentRecord[] = [];
export const mockAttendanceToday: AttendanceRecord[] = [];
export const mockBuses: TransportBus[] = [];
export const mockRoutes: TransportRoute[] = [];
export const mockApplications: AdmissionApplication[] = [];
export const mockInventory: InventoryItem[] = [];
export const mockAnnouncements: AnnouncementItem[] = [];
export const mockNotifications: SchoolNotification[] = [];

export const mockReportCards: StudentReportCardRecord[] = [];


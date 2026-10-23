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
  id: 'sch_bright_future',
  name: 'Bright Future Academy',
  motto: 'Excellence, Integrity & Leadership',
  crestUrl: '/assets/school-crest.svg',
  address: '14 Independence Avenue, North Legon',
  city: 'Accra',
  region: 'Greater Accra',
  country: 'Ghana',
  phone: '+233 30 254 7890',
  email: 'admin@brightfutureacademy.edu.gh',
  website: 'https://brightfutureacademy.edu.gh',
  academicYear: '2024 / 2025',
  currentTerm: 'Term 2',
  studentCount: 0,
  teacherCount: 0,
  classesCount: 0,
  plan: 'Premium Enterprise',
};

export const mockSchoolsList: School[] = [
  mockCurrentSchool,
  {
    id: 'sch_heritage_royal',
    name: 'Heritage Royal Academy',
    motto: 'Knowledge is Light',
    crestUrl: '/assets/school-crest.svg',
    address: 'Plot 45 Ahodwo Roundabout',
    city: 'Kumasi',
    region: 'Ashanti Region',
    country: 'Ghana',
    phone: '+233 32 209 1122',
    email: 'info@heritageroyal.edu.gh',
    website: 'https://heritageroyal.edu.gh',
    academicYear: '2024 / 2025',
    currentTerm: 'Term 2',
    studentCount: 0,
    teacherCount: 0,
    classesCount: 0,
    plan: 'Standard',
  },
];

export const mockUsers: User[] = [
  {
    id: 'usr_admin',
    name: 'Mrs. Cynthia Arthur',
    email: 'admin@brightfutureacademy.edu.gh',
    role: 'school_admin',
    schoolId: 'sch_bright_future',
    schoolName: 'Bright Future Academy',
  },
  {
    id: 'usr_teacher',
    name: 'Mr. Emmanuel Darko',
    email: 'darko@brightfutureacademy.edu.gh',
    role: 'teacher',
    schoolId: 'sch_bright_future',
    schoolName: 'Bright Future Academy',
    teacherStaffId: 'TCH-001',
  },
  {
    id: 'usr_accountant',
    name: 'Mr. Samuel Boakye',
    email: 'bursar@brightfutureacademy.edu.gh',
    role: 'accountant',
    schoolId: 'sch_bright_future',
    schoolName: 'Bright Future Academy',
  },
  {
    id: 'usr_parent',
    name: 'Mrs. Abena Osei',
    email: 'parent@brightfutureacademy.edu.gh',
    role: 'parent',
    schoolId: 'sch_bright_future',
    schoolName: 'Bright Future Academy',
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


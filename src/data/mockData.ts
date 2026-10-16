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
  classesCount: 9,
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
    classesCount: 9,
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

// Standard Ghanaian Basic & JHS Class Structure
export const mockClasses: ClassRoom[] = [
  {
    id: 'cls_b1',
    name: 'Basic 1',
    code: 'B1',
    stage: 'Primary',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 35,
    roomNumber: 'Block A - 101',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Natural Science', 'Our World Our People', 'Religious and Moral Education', 'Ghanaian Language', 'Creative Arts', 'Computing'],
  },
  {
    id: 'cls_b2',
    name: 'Basic 2',
    code: 'B2',
    stage: 'Primary',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 35,
    roomNumber: 'Block A - 102',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Natural Science', 'Our World Our People', 'Religious and Moral Education', 'Ghanaian Language', 'Creative Arts', 'Computing'],
  },
  {
    id: 'cls_b3',
    name: 'Basic 3',
    code: 'B3',
    stage: 'Primary',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 35,
    roomNumber: 'Block A - 103',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Natural Science', 'Our World Our People', 'Religious and Moral Education', 'Ghanaian Language', 'Creative Arts', 'Computing'],
  },
  {
    id: 'cls_b4',
    name: 'Basic 4',
    code: 'B4',
    stage: 'Primary',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 35,
    roomNumber: 'Block B - 201',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language (Twi/Ga)', 'Creative Arts & Design', 'Computing', 'French'],
  },
  {
    id: 'cls_b5',
    name: 'Basic 5',
    code: 'B5',
    stage: 'Primary',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 35,
    roomNumber: 'Block B - 202',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language (Twi/Ga)', 'Creative Arts & Design', 'Computing', 'French'],
  },
  {
    id: 'cls_b6',
    name: 'Basic 6',
    code: 'B6',
    stage: 'Primary',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 35,
    roomNumber: 'Block B - 203',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language (Twi/Ga)', 'Creative Arts & Design', 'Computing', 'French'],
  },
  {
    id: 'cls_jhs1',
    name: 'JHS 1',
    code: 'JHS 1',
    stage: 'JHS',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 40,
    roomNumber: 'Block C - 301',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language', 'Career Technology', 'Creative Arts & Design', 'Computing', 'French'],
  },
  {
    id: 'cls_jhs2',
    name: 'JHS 2',
    code: 'JHS 2',
    stage: 'JHS',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 40,
    roomNumber: 'Block C - 302',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language', 'Career Technology', 'Creative Arts & Design', 'Computing', 'French'],
  },
  {
    id: 'cls_jhs3',
    name: 'JHS 3',
    code: 'JHS 3',
    stage: 'JHS',
    classTeacherId: '',
    classTeacherName: 'Unassigned',
    studentCount: 0,
    capacity: 40,
    roomNumber: 'Block C - 303',
    averageAttendance: 0,
    subjects: ['English Language', 'Mathematics', 'Integrated Science', 'Social Studies', 'Religious and Moral Education', 'Ghanaian Language', 'Career Technology', 'Creative Arts & Design', 'Computing', 'French'],
  },
];

// Operational Collections - Clean Slate
export const mockTeachers: Teacher[] = [];

export const mockParents: Parent[] = [];

export const mockStudents: Student[] = [];
export const mockChatMessages: ChatMessage[] = [];
export const mockParentNotifications: ParentNotificationRecord[] = [];

export const mockFeeStructure: FeeStructureItem[] = [
  { id: 'fee_01', name: 'Primary Tuition Fee', category: 'School Fees', amount: 1500, academicYear: '2024 / 2025', term: 'Term 2', applicableClass: 'Primary', dueDate: '2025-02-15', status: 'Active' },
  { id: 'fee_02', name: 'JHS Tuition Fee', category: 'School Fees', amount: 2000, academicYear: '2024 / 2025', term: 'Term 2', applicableClass: 'JHS', dueDate: '2025-02-15', status: 'Active' },
  { id: 'fee_03', name: 'Primary Hot Canteen Feeding Fee', category: 'Feeding Fees', amount: 500, academicYear: '2024 / 2025', term: 'Term 2', applicableClass: 'Primary', dueDate: '2025-02-15', status: 'Active' },
  { id: 'fee_04', name: 'JHS Hot Canteen Feeding Fee', category: 'Feeding Fees', amount: 600, academicYear: '2024 / 2025', term: 'Term 2', applicableClass: 'JHS', dueDate: '2025-02-15', status: 'Active' },
  { id: 'fee_05', name: 'ICT & Science Lab Practical Levy', category: 'Examination', amount: 250, academicYear: '2024 / 2025', term: 'Term 2', applicableClass: 'JHS', dueDate: '2025-02-15', status: 'Active' },
  { id: 'fee_06', name: 'PTA School Development Levy', category: 'Other', amount: 150, academicYear: '2024 / 2025', term: 'Term 2', applicableClass: 'All', dueDate: '2025-02-15', status: 'Active' },
];

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


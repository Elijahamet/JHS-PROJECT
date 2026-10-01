export type UserRole =
  | 'super_admin'
  | 'school_admin'
  | 'teacher'
  | 'accountant'
  | 'parent'
  | 'admission_officer'
  | 'transport_manager'
  | 'inventory_officer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  schoolId: string;
  schoolName: string;
  linkedStudentId?: string; // For parent persona
  teacherStaffId?: string; // For teacher persona
}

export interface School {
  id: string;
  name: string;
  motto: string;
  crestUrl: string;
  address: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  academicYear: string;
  currentTerm: 'Term 1' | 'Term 2' | 'Term 3';
  studentCount: number;
  teacherCount: number;
  classesCount: number;
  plan: 'Standard' | 'Premium Enterprise';
}

export interface Student {
  id: string;
  studentId: string; // e.g. BFA-2024-001
  firstName: string;
  lastName: string;
  otherNames?: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  classId: string;
  className: string; // e.g. "Basic 4A", "JHS 2B"
  stage: 'Primary' | 'JHS';
  admissionDate: string;
  admissionYear: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Transferred';
  photoUrl: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentRelationship: string;
  residentialAddress: string;
  emergencyContact: string;
  medicalNotes: string;
  busRouteId?: string;
  busRouteName?: string;
  participatesInFeeding: boolean;
  schoolFeeBalance: number;
  feedingFeeBalance: number;
  attendanceRate: number; // e.g. 96.5%
  lastGradeAverage: number; // e.g. 84%
}

export interface Parent {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  residentialAddress: string;
  occupation: string;
  relationship: 'Father' | 'Mother' | 'Guardian';
  childrenIds: string[];
  childrenNames: string[];
  totalBalanceDue: number;
}

export interface Teacher {
  id: string;
  staffId: string;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  classesAssigned: string[];
  subjectsAssigned: string[];
  isClassTeacherOf?: string; // e.g. "JHS 2A"
  status: 'Active' | 'On Leave';
  joinDate: string;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g. "Basic 1", "JHS 2A"
  code: string;
  stage: 'Primary' | 'JHS';
  classTeacherId: string;
  classTeacherName: string;
  studentCount: number;
  capacity: number;
  roomNumber: string;
  averageAttendance: number;
  subjects: string[];
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  subjectName: string;
  academicYear: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  classworkScore: number; // out of 20
  homeworkScore: number; // out of 10
  examScore: number; // out of 70
  totalScore: number; // auto-calculated out of 100
  grade: string; // 1 (90-100), 2 (80-89), 3 (70-79), etc.
  position?: number;
  teacherComment: string;
}

export interface ReportCard {
  id: string;
  studentId: string;
  studentName: string;
  studentIdCode: string;
  className: string;
  academicYear: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  attendanceDaysPresent: number;
  attendanceTotalDays: number;
  subjects: {
    subjectName: string;
    classwork: number;
    homework: number;
    exam: number;
    total: number;
    grade: string;
    remarks: string;
  }[];
  overallAverage: number;
  classPosition: number;
  classTotalStudents: number;
  classTeacherRemarks: string;
  headteacherRemarks: string;
  promotionStatus: 'Promoted' | 'Repeated' | 'Pending' | 'Advance with Support';
  nextTermBegins: string;
}

export type FeeCategory =
  | 'School Fees'
  | 'Feeding Fees'
  | 'Transport'
  | 'Admission'
  | 'Books'
  | 'Uniform'
  | 'Examination'
  | 'Other';

export interface FeeStructureItem {
  id: string;
  name: string;
  category: FeeCategory;
  amount: number;
  academicYear: string;
  term: string;
  applicableClass: string;
  dueDate: string;
  status: 'Active' | 'Archived';
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  className: string;
  parentName: string;
  category: FeeCategory;
  amount: number;
  date: string;
  paymentMethod: 'Cash' | 'Mobile Money (MoMo)' | 'Bank Transfer' | 'Cheque';
  reference: string;
  notes?: string;
  authorizedStaff: string;
  balanceAfterPayment: number;
  status: 'Completed' | 'Pending' | 'Reversed';
}

export interface TransportBus {
  id: string;
  busNumber: string;
  registrationNumber: string;
  capacity: number;
  driverName: string;
  driverPhone: string;
  routeId: string;
  routeName: string;
  status: 'Active' | 'Maintenance' | 'Standby';
}

export interface TransportRoute {
  id: string;
  name: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  stops: string[];
  studentCount: number;
  status: 'Not Started' | 'On Route' | 'Completed';
  morningDeparture: string;
  afternoonDeparture: string;
}

export interface AdmissionApplication {
  id: string;
  applicationId: string; // e.g. ADM-2024-042
  applicantFirstName: string;
  applicantLastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female';
  applyingForClass: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  applicationDate: string;
  status: 'Pending' | 'Under Review' | 'Interview' | 'Accepted' | 'Rejected';
  interviewDate?: string;
  notes?: string;
  documentsSubmitted: string[];
}

export interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: 'ICT Equipment' | 'Furniture' | 'Textbooks' | 'Science Lab' | 'Sports' | 'General Office';
  quantity: number;
  unit: string;
  location: string;
  condition: 'Good' | 'Fair' | 'Needs Repair' | 'Damaged';
  responsiblePerson: string;
  lastUpdated: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  audience: 'Whole School' | 'Class' | 'Parents Only' | 'Teachers Only' | 'PTA';
  targetClass?: string;
  authorName: string;
  authorRole: string;
  publishDate: string;
  status: 'Published' | 'Draft';
  priority: 'Normal' | 'Important' | 'Urgent';
}

export interface SchoolNotification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'payment' | 'attendance' | 'admission' | 'system';
  timestamp: string;
  isRead: boolean;
  linkTo?: string;
}

export interface SchoolPlatformMetric {
  totalSchools: number;
  activeSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalRevenueCollected: number;
  platformUptime: string;
}

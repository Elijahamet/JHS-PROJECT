export interface StudentFormData {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  className: string;
  classId: string;
  parentId: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentRelationship: string;
  residentialAddress: string;
  emergencyContact: string;
  medicalNotes: string;
  participatesInFeeding: boolean;
  busRouteId: string;
  busRouteName: string;
}

export const DEFAULT_STUDENT_FORM: StudentFormData = {
  firstName: '',
  lastName: '',
  gender: 'Male',
  dateOfBirth: '2012-05-15',
  className: 'Basic 1',
  classId: '',
  parentId: '',
  parentName: '',
  parentPhone: '',
  parentEmail: '',
  parentRelationship: 'Father',
  residentialAddress: '',
  emergencyContact: '',
  medicalNotes: '',
  participatesInFeeding: true,
  busRouteId: '',
  busRouteName: '',
};

export interface TeacherFormData {
  fullName: string;
  staffId: string;
  email: string;
  phone: string;
  qualification: string;
  isClassTeacherOf: string;
  status: 'Active' | 'On Leave';
  subjectsAssigned: string[];
}

export const DEFAULT_TEACHER_FORM: TeacherFormData = {
  fullName: '',
  staffId: '',
  email: '',
  phone: '',
  qualification: 'B.Ed. Basic Education',
  isClassTeacherOf: '',
  status: 'Active',
  subjectsAssigned: [],
};

export interface ClassFormData {
  stage: 'Kindergarten' | 'Primary' | 'JHS';
  name: string;
  code: string;
  roomNumber: string;
  capacity: number;
  selectedTeacherId: string;
  selectedSubjects: string[];
}

export const DEFAULT_CLASS_FORM: ClassFormData = {
  stage: 'Primary',
  name: '',
  code: '',
  roomNumber: '',
  capacity: 35,
  selectedTeacherId: '',
  selectedSubjects: [
    'English Language',
    'Mathematics',
    'Natural Science',
    'Our World Our People',
    'Religious and Moral Education',
    'Ghanaian Language (Twi/Ga)',
    'Creative Arts & Design',
    'Computing',
    'French',
  ],
};

export interface PaymentFormData {
  selectedStudentId: string;
  category: 'School Fees' | 'Feeding Fees' | 'Transport' | 'Admission' | 'Books' | 'Uniform' | 'Examination' | 'Other';
  amount: number;
  paymentMethod: 'Mobile Money (MoMo)' | 'Bank Transfer' | 'Cash' | 'Cheque';
  reference: string;
  notes: string;
}

export const DEFAULT_PAYMENT_FORM: PaymentFormData = {
  selectedStudentId: '',
  category: 'School Fees',
  amount: 500,
  paymentMethod: 'Mobile Money (MoMo)',
  reference: '',
  notes: '',
};

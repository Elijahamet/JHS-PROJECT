import { AcademicStage } from '../types';

export const KINDERGARTEN_SUBJECTS = [
  'Language and Literacy',
  'Early Numeracy & Mathematics',
  'Our World Our People',
  'Creative Arts & Colouring',
  'Ghanaian Language & Culture',
  'Physical Development & Health',
  'Rhymes, Songs & Storytelling',
  'Moral & Social Development',
];

export const PRIMARY_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Natural Science',
  'Our World Our People',
  'Religious and Moral Education',
  'Ghanaian Language (Twi/Ga)',
  'Creative Arts & Design',
  'Computing',
  'French',
];

export const JHS_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Integrated Science',
  'Social Studies',
  'Religious and Moral Education',
  'Ghanaian Language (Twi/Ga)',
  'Career Technology',
  'Creative Arts & Design',
  'Computing',
  'French',
  'Physical Education',
];

export const detectAcademicStage = (className: string): AcademicStage => {
  const upper = className.trim().toUpperCase();
  if (
    upper.startsWith('KG') ||
    upper.startsWith('KINDERGARTEN') ||
    upper.startsWith('NUR') ||
    upper.startsWith('NURSERY') ||
    upper.startsWith('CR') ||
    upper.startsWith('CRECHE')
  ) {
    return 'Kindergarten';
  }
  if (
    upper.startsWith('JHS') ||
    upper.startsWith('JUNIOR') ||
    upper.includes('JHS')
  ) {
    return 'JHS';
  }
  return 'Primary';
};

export const getSubjectsForStage = (stage: AcademicStage): string[] => {
  switch (stage) {
    case 'Kindergarten':
      return [...KINDERGARTEN_SUBJECTS];
    case 'JHS':
      return [...JHS_SUBJECTS];
    case 'Primary':
    default:
      return [...PRIMARY_SUBJECTS];
  }
};

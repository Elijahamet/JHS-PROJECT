import React from 'react';
import { useApp } from '../../context/AppContext';
import { ReportCardSheet } from '../modules/ReportCardSheet';

export const ReportCardModal: React.FC = () => {
  const {
    isReportCardModalOpen,
    setIsReportCardModalOpen,
    currentSchool,
    selectedStudentId,
    students,
  } = useApp();

  if (!isReportCardModalOpen) return null;

  const student = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId)
    : students[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-slate-950/75 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl my-auto animate-fadeIn">
        <ReportCardSheet
          initialStudentName={student ? `${student.firstName} ${student.lastName}` : 'Kofi Mensah'}
          initialLevel={student?.stage === 'JHS' ? 'Junior High School 2' : 'Grade 8'}
          initialClassName={student ? student.className : 'JHS 2A'}
          initialSchoolName={currentSchool?.name || 'Salford High School'}
          isModal={true}
          onClose={() => setIsReportCardModalOpen(false)}
        />
      </div>
    </div>
  );
};

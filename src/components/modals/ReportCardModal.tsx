import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Printer, Download, Award, Calendar } from 'lucide-react';

export const ReportCardModal: React.FC = () => {
  const {
    isReportCardModalOpen,
    setIsReportCardModalOpen,
    currentSchool,
    selectedStudentId,
    students,
    assessments,
  } = useApp();

  const handlePrint = () => {
    window.print();
  };

  if (!isReportCardModalOpen) return null;

  const student = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId)
    : students[0];

  if (!student) {
    return (
      <Modal
        isOpen={isReportCardModalOpen}
        onClose={() => setIsReportCardModalOpen(false)}
        title="Terminal Academic Report Card"
        maxWidth="md"
      >
        <div className="py-10 text-center text-slate-500">
          <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-800">No Student Available</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Please register a student and record terminal exam marks to generate and print their official report card.
          </p>
        </div>
      </Modal>
    );
  }

  const studentAssessments = assessments.filter(
    (a) => a.studentId === student.id
  );
  const totalScoreSum = studentAssessments.reduce(
    (sum, a) => sum + (a.totalScore || 0),
    0
  );
  const overallAvg =
    studentAssessments.length > 0
      ? Math.round(totalScoreSum / studentAssessments.length)
      : 0;

  const reportCard = {
    studentName: `${student.firstName} ${student.lastName}`,
    studentIdCode: student.studentId,
    className: student.className,
    academicYear: currentSchool.academicYear,
    term: currentSchool.currentTerm,
    attendanceDaysPresent: 58,
    attendanceTotalDays: 60,
    subjects: studentAssessments.map((a) => ({
      subjectName: a.subjectName,
      classwork: a.classworkScore,
      homework: a.homeworkScore,
      exam: a.examScore,
      total: a.totalScore,
      grade: a.grade,
      remarks: a.teacherComment || 'Satisfactory progress',
    })),
    overallAverage: overallAvg,
    classPosition: 1,
    classTotalStudents: 1,
    classTeacherRemarks:
      overallAvg >= 70
        ? 'An exemplary, diligent and hardworking learner. Consistently demonstrates leadership in class.'
        : 'Encouraged to dedicate more study time.',
    headteacherRemarks:
      overallAvg >= 70
        ? 'Promising academic performance. Well done!'
        : 'Keep working diligently.',
    promotionStatus: 'Promoted',
    nextTermBegins: '12 May 2025',
  };

  return (
    <Modal
      isOpen={isReportCardModalOpen}
      onClose={() => setIsReportCardModalOpen(false)}
      title="Terminal Academic Report Card"
      subtitle={`${reportCard.studentName} — ${reportCard.className} (${reportCard.academicYear} ${reportCard.term})`}
      maxWidth="3xl"
      footer={
        <div className="flex items-center justify-between w-full no-print">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Class Position: {reportCard.classPosition} of {reportCard.classTotalStudents}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={() => alert('Downloading official PDF report card...')}
            >
              Export PDF
            </Button>
            <Button size="sm" icon={Printer} onClick={handlePrint}>
              Print Report Card
            </Button>
          </div>
        </div>
      }
    >
      {/* Printable Report Card Sheet */}
      <div
        id="printable-reportcard"
        className="p-6 bg-white border border-slate-200 rounded-xl space-y-6 text-xs text-slate-900"
      >
        {/* School Header */}
        <div className="text-center border-b pb-4 border-slate-200">
          <div className="w-12 h-12 mx-auto rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg mb-2 shadow-xs">
            SOS
          </div>
          <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
            {currentSchool.name}
          </h2>
          <p className="text-xs text-slate-500 italic mt-0.5">
            &ldquo;{currentSchool.motto}&rdquo;
          </p>
          <p className="text-[11px] text-slate-500">
            {currentSchool.address}, {currentSchool.city}, Ghana • Tel: {currentSchool.phone}
          </p>
          <div className="inline-block mt-3 px-3 py-1 bg-slate-100 border border-slate-200 rounded font-bold text-xs uppercase tracking-wider text-slate-800">
            Continuous Assessment & Terminal Report Card
          </div>
        </div>

        {/* Student & Term Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Student Name
            </span>
            <p className="font-bold text-slate-900 mt-0.5">
              {reportCard.studentName}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Student ID
            </span>
            <p className="font-mono font-medium text-slate-700 mt-0.5">
              {reportCard.studentIdCode}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Class & Stream
            </span>
            <p className="font-semibold text-slate-900 mt-0.5">
              {reportCard.className}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Academic Term
            </span>
            <p className="font-semibold text-blue-700 mt-0.5">
              {reportCard.academicYear} • {reportCard.term}
            </p>
          </div>
        </div>

        {/* Summary Metrics Bar */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100 text-center text-xs">
          <div>
            <span className="text-[11px] text-slate-500">Terminal Attendance</span>
            <p className="font-bold text-slate-900 mt-0.5">
              {reportCard.attendanceDaysPresent} / {reportCard.attendanceTotalDays} Days ({reportCard.attendanceTotalDays > 0 ? Math.round((reportCard.attendanceDaysPresent / reportCard.attendanceTotalDays) * 100) : 0}%)
            </p>
          </div>
          <div className="border-x border-blue-100">
            <span className="text-[11px] text-slate-500">Overall Average</span>
            <p className="font-bold text-slate-900 mt-0.5">
              {reportCard.overallAverage}%
            </p>
          </div>
          <div>
            <span className="text-[11px] text-slate-500">Class Position</span>
            <p className="font-bold text-blue-700 mt-0.5">
              {reportCard.classPosition} of {reportCard.classTotalStudents}
            </p>
          </div>
        </div>

        {/* Subject Results Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3 font-semibold">Subject</th>
                <th className="py-2.5 px-3 font-semibold text-center">Classwork (20)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Homework (10)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Exam (70)</th>
                <th className="py-2.5 px-3 font-bold text-center">Total (100)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Grade</th>
                <th className="py-2.5 px-3 font-semibold">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportCard.subjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No subject assessments recorded for this student yet. Record marks in the Results & Reports section.
                  </td>
                </tr>
              ) : (
                reportCard.subjects.map((sub, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                    <td className="py-2 px-3 font-semibold text-slate-900">
                      {sub.subjectName}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-700 font-mono">
                      {sub.classwork}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-700 font-mono">
                      {sub.homework}
                    </td>
                    <td className="py-2 px-3 text-center text-slate-700 font-mono">
                      {sub.exam}
                    </td>
                    <td className="py-2 px-3 text-center font-bold text-slate-900 font-mono">
                      {sub.total}
                    </td>
                    <td className="py-2 px-3 text-center font-semibold text-blue-700">
                      {sub.grade}
                    </td>
                    <td className="py-2 px-3 text-slate-600 italic">
                      {sub.remarks}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Remarks and Promotion Details */}
        <div className="space-y-3 pt-2">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Class Teacher&apos;s Remarks:
            </span>
            <p className="text-xs text-slate-800 mt-1 font-medium italic">
              &ldquo;{reportCard.classTeacherRemarks}&rdquo;
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Headmistress / Principal&apos;s Remarks:
            </span>
            <p className="text-xs text-slate-800 mt-1 font-medium italic">
              &ldquo;{reportCard.headteacherRemarks}&rdquo;
            </p>
          </div>
        </div>

        {/* Resumption & Next Term */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Next Term Resumption Date:</span>
            <strong className="text-slate-900">{reportCard.nextTermBegins}</strong>
          </div>
          <div>
            <span>Promotion Status: </span>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold uppercase text-[10px]">
              {reportCard.promotionStatus}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

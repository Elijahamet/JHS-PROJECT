import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Save,
  CheckCircle2,
  Award,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Send,
  Eye,
  Check,
  X,
  FileText,
  AlertCircle,
  Sparkles,
  Users,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { StudentReportCardRecord } from '../../types';

export const ResultsView: React.FC = () => {
  const {
    classes,
    assessments,
    updateAssessment,
    setIsReportCardModalOpen,
    setSelectedStudentId,
    reportCards,
    inspectAndApproveReport,
    rejectReportInspection,
    bulkApproveReports,
    currentUser,
  } = useApp();

  // Top View Mode: 'assessment_marks' vs 'inspection_desk'
  const [viewMode, setViewMode] = useState<'assessment_marks' | 'inspection_desk'>('inspection_desk');

  // Assessment Marks state
  const [selectedClassId, setSelectedClassId] = useState('cls_jhs2a');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [isSaved, setIsSaved] = useState(false);

  // Inspection Desk State
  const [inspectionFilter, setInspectionFilter] = useState<'all' | 'pending' | 'approved' | 'sent'>('all');
  const [searchStudent, setSearchStudent] = useState('');
  const [selectedReportForInspect, setSelectedReportForInspect] = useState<StudentReportCardRecord | null>(null);
  const [headRemarksInput, setHeadRemarksInput] = useState('');
  const [inspectionNotesInput, setInspectionNotesInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedClass =
    classes.find((c) => c.id === selectedClassId) || classes[0];

  const currentAssessments = assessments.filter(
    (a) => a.subjectName === selectedSubject
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleScoreChange = (
    id: string,
    field: 'classworkScore' | 'homeworkScore' | 'examScore',
    value: number
  ) => {
    updateAssessment(id, { [field]: value });
    setIsSaved(false);
  };

  const handleCommentChange = (id: string, comment: string) => {
    updateAssessment(id, { teacherComment: comment });
    setIsSaved(false);
  };

  const handleSaveMarks = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  // Inspection metrics
  const pendingInspectionCount = reportCards.filter(
    (r) => r.status === 'submitted_for_inspection'
  ).length;
  const approvedCount = reportCards.filter(
    (r) => r.status === 'inspected_approved'
  ).length;
  const sentCount = reportCards.filter(
    (r) => r.status === 'sent_to_parent'
  ).length;

  const filteredReports = reportCards.filter((r) => {
    if (searchStudent && !r.studentName.toLowerCase().includes(searchStudent.toLowerCase())) {
      return false;
    }
    if (inspectionFilter === 'pending') return r.status === 'submitted_for_inspection';
    if (inspectionFilter === 'approved') return r.status === 'inspected_approved';
    if (inspectionFilter === 'sent') return r.status === 'sent_to_parent';
    return true;
  });

  const openInspectionModal = (report: StudentReportCardRecord) => {
    setSelectedReportForInspect(report);
    setHeadRemarksInput(
      report.headteacherRemarks && report.headteacherRemarks !== 'Awaiting administrative inspection and terminal review.'
        ? report.headteacherRemarks
        : 'An outstanding terminal academic performance. Conduct and effort are highly commendable. Approved for progression with honors.'
    );
    setInspectionNotesInput(
      report.inspectionNotes || 'Terminal marksheets and diagnostic portfolios verified. GES syllabus compliance confirmed.'
    );
  };

  const handleConfirmApproval = () => {
    if (!selectedReportForInspect) return;
    inspectAndApproveReport(
      selectedReportForInspect.id,
      headRemarksInput,
      inspectionNotesInput
    );
    showToast(
      `Report card for ${selectedReportForInspect.studentName} has been Inspected & Approved! Form Teacher can now dispatch it to ${selectedReportForInspect.parentName}.`
    );
    setSelectedReportForInspect(null);
  };

  const handleQuickApprove = (report: StudentReportCardRecord) => {
    inspectAndApproveReport(
      report.id,
      report.headteacherRemarks || 'Commendable academic effort and conduct. Approved by School Headmistress.',
      'Quick approved after administrative audit.'
    );
    showToast(`Report card for ${report.studentName} approved. Teacher can now dispatch to parent.`);
  };

  const handleBulkApprove = () => {
    bulkApproveReports(
      selectedClass.name,
      'Terminal examination marks and continuous assessment audited and approved by the Headmistress.'
    );
    showToast(`All submitted reports for ${selectedClass.name} have been approved and unlocked for teacher dispatch to parents!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white border border-emerald-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Academic Results & Terminal Reports Governance
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 border border-blue-200">
              GES Standard
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin inspection station: Audit continuous assessment marks, endorse terminal report cards, and authorize teachers to release them to parents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {viewMode === 'assessment_marks' ? (
            <>
              <Button
                size="sm"
                variant="outline"
                icon={FileSpreadsheet}
                onClick={() => setIsReportCardModalOpen(true)}
              >
                Preview Terminal Report Card
              </Button>
              <Button
                size="sm"
                variant="primary"
                icon={Save}
                onClick={handleSaveMarks}
              >
                Save Marks
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="primary"
              icon={ShieldCheck}
              onClick={handleBulkApprove}
            >
              Bulk Approve All Submitted Reports
            </Button>
          )}
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('inspection_desk')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'inspection_desk'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Report Inspection & Approval Desk</span>
            {pendingInspectionCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 animate-pulse">
                {pendingInspectionCount} pending
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode('assessment_marks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              viewMode === 'assessment_marks'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Continuous Assessment Marks Sheet</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-medium px-2 hidden md:inline">
          Academic Year: <strong>2024 / 2025</strong> • Term: <strong>Term 2</strong>
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. ADMIN INSPECTION & APPROVAL DESK */}
      {/* ========================================================================= */}
      {viewMode === 'inspection_desk' && (
        <div className="space-y-6">
          {/* Executive Workflow Info Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-blue-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  Headteacher Supervisory Workflow
                </span>
                <span className="text-xs text-blue-200">• Inspection Protocol</span>
              </div>
              <h3 className="text-lg font-black text-white">
                Terminal Report Inspection & Parent Dispatch Pipeline
              </h3>
              <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
                As per school policy, terminal report cards remain locked from parent view until the Administration audits and inspects them. Once you approve a report, the Class Teacher is immediately authorized to dispatch it to the specific parent.
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-2 shrink-0">
              <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">Needs Audit</span>
                <span className="text-lg font-black text-white">{pendingInspectionCount}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Approved</span>
                <span className="text-lg font-black text-white">{approvedCount}</span>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                <span className="text-[10px] uppercase font-bold text-cyan-300 block">Sent to Parents</span>
                <span className="text-lg font-black text-white">{sentCount}</span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: `All Reports (${reportCards.length})` },
                { id: 'pending', label: `Needs Inspection (${pendingInspectionCount})` },
                { id: 'approved', label: `Approved • Ready to Dispatch (${approvedCount})` },
                { id: 'sent', label: `Sent to Parents (${sentCount})` },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setInspectionFilter(f.id as typeof inspectionFilter)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    inspectionFilter === f.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search student or parent..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reports Inspection Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Terminal Report Cards Roster • Form Class: JHS 2A
                </h3>
                <p className="text-[11px] text-slate-500">
                  Form Master: Mr. Emmanuel Darko • Headmistress: Mrs. Cynthia Arthur
                </p>
              </div>
              <span className="text-xs font-semibold text-slate-600">
                Showing {filteredReports.length} student reports
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Student Name & ID</th>
                    <th className="py-3 px-3 font-semibold">Parent Contact</th>
                    <th className="py-3 px-3 font-semibold text-center">Score / Pos.</th>
                    <th className="py-3 px-3 font-semibold text-center">Status</th>
                    <th className="py-3 px-4 font-semibold">Form Teacher Remarks</th>
                    <th className="py-3 px-4 font-semibold">Headteacher Inspection Status</th>
                    <th className="py-3 px-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No report cards match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-900 block text-sm">
                            {report.studentName}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {report.studentIdCode} • {report.className}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-medium text-slate-800 block">
                            {report.parentName}
                          </span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {report.parentPhone || '+233 24 000 0000'}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <span className="font-bold text-slate-900 block text-sm">
                            {report.overallAverage}%
                          </span>
                          <span className="text-[10px] text-indigo-700 font-semibold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-100">
                            {report.classPosition}th of {report.classTotalStudents}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          {report.status === 'draft' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                              Draft
                            </span>
                          )}
                          {report.status === 'submitted_for_inspection' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse flex items-center justify-center gap-1">
                              <Clock className="w-3 h-3" />
                              Needs Inspection
                            </span>
                          )}
                          {report.status === 'inspected_approved' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Approved (Ready to Send)
                            </span>
                          )}
                          {report.status === 'sent_to_parent' && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-blue-600" />
                              Dispatched to Parent
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-slate-700 line-clamp-2 italic text-[11px] leading-relaxed">
                            &ldquo;{report.classTeacherRemarks}&rdquo;
                          </p>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            — {report.classTeacherName || 'Form Master'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          {report.status === 'inspected_approved' || report.status === 'sent_to_parent' ? (
                            <div className="space-y-0.5">
                              <p className="text-emerald-900 font-medium text-[11px] line-clamp-2">
                                {report.headteacherRemarks}
                              </p>
                              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                Signed by {report.inspectedBy || 'Headmistress'} ({report.inspectedAt})
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-amber-700 italic">
                              Pending administrative inspection
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openInspectionModal(report)}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                              title="Inspect marks breakdown and sign report"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>{report.status === 'inspected_approved' ? 'Re-Inspect' : 'Inspect'}</span>
                            </button>

                            {report.status === 'submitted_for_inspection' && (
                              <button
                                onClick={() => handleQuickApprove(report)}
                                className="px-2 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                                title="Quick approve without changes"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setSelectedStudentId(report.studentId);
                                setIsReportCardModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                              title="View formatted printable card"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS ASSESSMENT MARKS ENTRY VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'assessment_marks' && (
        <div className="space-y-6">
          {isSaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
              <span className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Marks and calculated grades for {selectedSubject} ({selectedClass.name}) successfully saved.
              </span>
              <span className="text-[11px] text-emerald-600">Sync complete</span>
            </div>
          )}

          {/* Filter Controls Bar */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Class
                </label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.stage})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white font-medium"
                >
                  {selectedClass.subjects.map((sub, idx) => (
                    <option key={idx} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Academic Term
                </label>
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="Term 1">Term 1 (First Term)</option>
                  <option value="Term 2">Term 2 (Mid-Year)</option>
                  <option value="Term 3">Term 3 (Promotional)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  readOnly
                  value="2024 / 2025"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Marks Spreadsheet Table */}
          <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {selectedSubject} — Continuous Assessment Sheet
                </h3>
                <p className="text-[11px] text-slate-500">
                  Grading Scheme: Classwork (20) + Homework (10) + Terminal Exam (70) = Total (100)
                </p>
              </div>
              <button
                onClick={() => setIsReportCardModalOpen(true)}
                className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Open Report Card</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Student Name</th>
                    <th className="py-3 px-3 font-semibold text-center w-28">
                      Classwork (20)
                    </th>
                    <th className="py-3 px-3 font-semibold text-center w-28">
                      Homework (10)
                    </th>
                    <th className="py-3 px-3 font-semibold text-center w-28">
                      Exam (70)
                    </th>
                    <th className="py-3 px-3 font-bold text-center w-24">
                      Total (100)
                    </th>
                    <th className="py-3 px-3 font-semibold text-center w-36">
                      Grade Scale
                    </th>
                    <th className="py-3 px-3 font-semibold text-center w-20">
                      Pos.
                    </th>
                    <th className="py-3 px-4 font-semibold">Teacher&apos;s Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentAssessments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No assessment records entered yet for {selectedSubject}.
                      </td>
                    </tr>
                  ) : (
                    currentAssessments.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {a.studentName}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={a.classworkScore}
                            onChange={(e) =>
                              handleScoreChange(
                                a.id,
                                'classworkScore',
                                Number(e.target.value)
                              )
                            }
                            className="w-16 px-2 py-1 text-center border border-slate-200 rounded font-mono font-medium focus:ring-1 focus:ring-slate-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="10"
                            value={a.homeworkScore}
                            onChange={(e) =>
                              handleScoreChange(
                                a.id,
                                'homeworkScore',
                                Number(e.target.value)
                              )
                            }
                            className="w-16 px-2 py-1 text-center border border-slate-200 rounded font-mono font-medium focus:ring-1 focus:ring-slate-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max="70"
                            value={a.examScore}
                            onChange={(e) =>
                              handleScoreChange(
                                a.id,
                                'examScore',
                                Number(e.target.value)
                              )
                            }
                            className="w-16 px-2 py-1 text-center border border-slate-200 rounded font-mono font-medium focus:ring-1 focus:ring-slate-900"
                          />
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 text-sm font-mono bg-slate-50/60">
                          {a.totalScore}
                        </td>
                        <td className="py-3 px-3 text-center font-semibold text-blue-700">
                          {a.grade}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-700">
                          {a.position ? `${a.position}th` : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={a.teacherComment}
                            onChange={(e) =>
                              handleCommentChange(a.id, e.target.value)
                            }
                            placeholder="Add student remark..."
                            className="w-full px-2 py-1 border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-slate-900 text-xs"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HEADTEACHER REPORT INSPECTION & SIGN-OFF MODAL                         */}
      {/* ========================================================================= */}
      {selectedReportForInspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-fadeIn text-xs">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      Official Headmistress Audit
                    </span>
                    <span className="text-slate-400">• Term 2 Terminal Report</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    Inspect Report Card: {selectedReportForInspect.studentName} ({selectedReportForInspect.className})
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedReportForInspect(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Student Roll</span>
                  <p className="font-bold text-slate-900">{selectedReportForInspect.studentIdCode}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Overall Average</span>
                  <p className="font-bold text-blue-700 text-sm">{selectedReportForInspect.overallAverage}%</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Class Position</span>
                  <p className="font-bold text-slate-900">{selectedReportForInspect.classPosition}th of {selectedReportForInspect.classTotalStudents}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Attendance</span>
                  <p className="font-bold text-emerald-700">{selectedReportForInspect.attendanceDaysPresent} / {selectedReportForInspect.attendanceTotalDays} Days</p>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-4 py-2 bg-slate-100 font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Terminal Subject Marks & Calculations
                </div>
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                      <th className="py-2 px-3 font-semibold">Subject</th>
                      <th className="py-2 px-2 text-center font-semibold">Classwork (20)</th>
                      <th className="py-2 px-2 text-center font-semibold">Homework (10)</th>
                      <th className="py-2 px-2 text-center font-semibold">Exam (70)</th>
                      <th className="py-2 px-2 text-center font-bold">Total (100)</th>
                      <th className="py-2 px-2 text-center font-semibold">Grade</th>
                      <th className="py-2 px-3 font-semibold">Teacher Remark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedReportForInspect.subjects.map((sub, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-900">{sub.subjectName}</td>
                        <td className="py-2 px-2 text-center text-slate-700">{sub.classwork}</td>
                        <td className="py-2 px-2 text-center text-slate-700">{sub.homework}</td>
                        <td className="py-2 px-2 text-center text-slate-700">{sub.exam}</td>
                        <td className="py-2 px-2 text-center font-bold text-blue-700">{sub.total}</td>
                        <td className="py-2 px-2 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Grade {sub.grade}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-slate-600 text-[11px]">{sub.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Form Teacher Remark Preview */}
              <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800">
                  Form Master&apos;s Submitted Remarks:
                </span>
                <p className="text-slate-700 italic font-medium leading-relaxed">
                  &ldquo;{selectedReportForInspect.classTeacherRemarks}&rdquo;
                </p>
                <span className="text-[10px] text-slate-500 font-semibold block pt-0.5">
                  Signed: {selectedReportForInspect.classTeacherName || 'Mr. Emmanuel Darko (Form Master)'}
                </span>
              </div>

              {/* Headteacher Official Terminal Evaluation & Signature Form */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Official Headmistress Terminal Remarks & Recommendation:
                  </label>
                  <textarea
                    rows={3}
                    value={headRemarksInput}
                    onChange={(e) => setHeadRemarksInput(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-medium text-slate-800"
                    placeholder="Enter headteacher's terminal remarks, recommendation for promotion, or guidance..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Internal Inspection Audit Notes (Optional):
                  </label>
                  <input
                    type="text"
                    value={inspectionNotesInput}
                    onChange={(e) => setInspectionNotesInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
                    placeholder="e.g. Marks audited against teacher gradebook. Approved for release."
                  />
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Next Step After Approval:</span>
                    <p className="mt-0.5 text-[11px] leading-relaxed">
                      Approving this report applies the official digital endorsement of Headmistress {currentUser.name}. The Form Teacher will immediately receive clearance to dispatch this report to <strong>{selectedReportForInspect.parentName}</strong> ({selectedReportForInspect.parentPhone}).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  rejectReportInspection(selectedReportForInspect.id, 'Revision requested by Headmistress.');
                  showToast(`Report card returned to teacher for corrections.`);
                  setSelectedReportForInspect(null);
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
              >
                Request Teacher Revision
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReportForInspect(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmApproval}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Sign Official Report Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

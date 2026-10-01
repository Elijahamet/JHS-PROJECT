import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  Bus,
  UtensilsCrossed,
  Receipt,
  FileSpreadsheet,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface StudentProfileViewProps {
  studentId: string;
  onBack: () => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  studentId,
  onBack,
}) => {
  const {
    students,
    assessments,
    payments,
    setIsRecordPaymentOpen,
    setIsReportCardModalOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'parents'
    | 'attendance'
    | 'results'
    | 'fees'
    | 'feeding'
    | 'transport'
    | 'documents'
  >('overview');

  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <EmptyState
          title="Student Record Not Found"
          description="This student record has either been removed or has not yet been enrolled in the system."
          actionLabel="Back to Student Directory"
          onAction={onBack}
        />
      </div>
    );
  }

  const studentAssessments = assessments.filter(
    (a) => a.studentId === student.id
  );
  const studentPayments = payments.filter((p) => p.studentId === student.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'parents', label: 'Parents / Guardian' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'results', label: 'Academic Results' },
    { id: 'fees', label: 'School Fees' },
    { id: 'feeding', label: 'Feeding Fees' },
    { id: 'transport', label: 'Transport' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students Directory</span>
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.photoUrl}
              alt={student.firstName}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-xs flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {student.firstName} {student.lastName}
                </h2>
                <Badge variant="navy">{student.className}</Badge>
                <Badge
                  variant={student.status === 'Active' ? 'success' : 'neutral'}
                >
                  {student.status}
                </Badge>
              </div>
              <div className="mt-1 flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                <span className="font-mono font-medium text-slate-700">
                  ID: {student.studentId}
                </span>
                <span>•</span>
                <span>Stage: {student.stage}</span>
                <span>•</span>
                <span>Enrolled: {student.admissionYear}</span>
                <span>•</span>
                <span>Attendance: {student.attendanceRate}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <Button
              size="sm"
              variant="outline"
              icon={FileSpreadsheet}
              onClick={() => setIsReportCardModalOpen(true)}
            >
              Terminal Report Card
            </Button>
            <Button
              size="sm"
              variant="primary"
              icon={Receipt}
              onClick={() => setIsRecordPaymentOpen(true)}
            >
              Record Payment
            </Button>
          </div>
        </div>

        {/* Financial Separation Highlights Pill */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 text-[11px]">School Fees Balance</span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {student.schoolFeeBalance === 0 ? (
                <span className="text-emerald-700">GH₵ 0.00 (Cleared)</span>
              ) : (
                <span className="text-rose-600">
                  {formatCurrency(student.schoolFeeBalance)}
                </span>
              )}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 text-[11px]">Feeding Fee Balance</span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {student.feedingFeeBalance === 0 ? (
                <span className="text-emerald-700">GH₵ 0.00 (Cleared)</span>
              ) : (
                <span className="text-amber-700">
                  {formatCurrency(student.feedingFeeBalance)} Due
                </span>
              )}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 text-[11px]">Assigned Bus Route</span>
            <p className="text-xs font-semibold text-slate-800 mt-0.5 truncate">
              {student.busRouteName || 'Self-Commute'}
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 text-[11px]">Feeding Status</span>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              {student.participatesInFeeding
                ? 'Active Subscriber'
                : 'Not Enrolled'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto text-xs" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-1 border-b-2 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Contents */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs text-xs">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
                  Personal Information
                </h4>
                <dl className="space-y-2.5">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Date of Birth:</dt>
                    <dd className="font-semibold text-slate-900">
                      {formatDate(student.dateOfBirth)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Gender:</dt>
                    <dd className="font-semibold text-slate-900">
                      {student.gender}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Class & Section:</dt>
                    <dd className="font-semibold text-slate-900">
                      {student.className}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Admission Date:</dt>
                    <dd className="font-semibold text-slate-900">
                      {formatDate(student.admissionDate)}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
                  Residential & Health
                </h4>
                <dl className="space-y-2.5">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Residential Address:</dt>
                    <dd className="font-medium text-slate-900 text-right max-w-xs">
                      {student.residentialAddress}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Emergency Contact:</dt>
                    <dd className="font-medium text-slate-900 text-right">
                      {student.emergencyContact}
                    </dd>
                  </div>
                  <div className="flex justify-between items-start">
                    <dt className="text-slate-500">Medical Notes:</dt>
                    <dd className="font-medium text-rose-700 text-right max-w-xs">
                      {student.medicalNotes}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PARENTS */}
        {activeTab === 'parents' && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {student.parentName}
                  </h4>
                  <Badge variant="navy" className="mt-1">
                    Primary Guardian ({student.parentRelationship})
                  </Badge>
                </div>
                <Button size="sm" variant="outline" icon={Phone}>
                  Call Guardian
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{student.parentPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{student.parentEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{student.residentialAddress}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Term 2 Attendance Summary
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Daily roll status recorded by Class Teacher
                </p>
              </div>
              <Badge variant="success">94.5% Term Attendance</Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-[11px] text-emerald-800">Days Present</span>
                <p className="text-lg font-bold text-emerald-900">61 Days</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <span className="text-[11px] text-rose-800">Days Absent</span>
                <p className="text-lg font-bold text-rose-900">2 Days</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <span className="text-[11px] text-amber-800">Days Late</span>
                <p className="text-lg font-bold text-amber-900">2 Days</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RESULTS */}
        {activeTab === 'results' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Continuous Assessment Scores
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Term 2 Academic Performance
                </p>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsReportCardModalOpen(true)}
              >
                View Official Terminal Report Card
              </Button>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase border-b border-slate-200">
                  <th className="py-2 px-3 font-semibold">Subject</th>
                  <th className="py-2 px-3 font-semibold">Classwork (20)</th>
                  <th className="py-2 px-3 font-semibold">Homework (10)</th>
                  <th className="py-2 px-3 font-semibold">Exam (70)</th>
                  <th className="py-2 px-3 font-bold">Total (100)</th>
                  <th className="py-2 px-3 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studentAssessments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {a.subjectName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">{a.classworkScore}</td>
                    <td className="py-2.5 px-3 text-slate-700">{a.homeworkScore}</td>
                    <td className="py-2.5 px-3 text-slate-700">{a.examScore}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {a.totalScore}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-blue-700">
                      {a.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 5: SCHOOL FEES */}
        {activeTab === 'fees' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Tuition & School Fees Ledger
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Academic Year 2024/2025 • Term 2
                </p>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setIsRecordPaymentOpen(true)}
              >
                Record Tuition Payment
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500">Total Billed</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {formatCurrency(2000)}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-[11px] text-emerald-800">Total Paid</span>
                <p className="text-sm font-bold text-emerald-900 mt-0.5">
                  {formatCurrency(2000 - student.schoolFeeBalance)}
                </p>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <span className="text-[11px] text-rose-800">Outstanding Balance</span>
                <p className="text-sm font-bold text-rose-900 mt-0.5">
                  {formatCurrency(student.schoolFeeBalance)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: FEEDING FEES */}
        {activeTab === 'feeding' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Hot Lunch / Feeding Programme Account
                </h4>
                <p className="text-slate-500 text-[11px]">
                  Tracked strictly as a separate financial record
                </p>
              </div>
              <Badge
                variant={student.feedingFeeBalance === 0 ? 'success' : 'warning'}
              >
                {student.feedingFeeBalance === 0
                  ? 'Feeding Cleared'
                  : 'Arrears Outstanding'}
              </Badge>
            </div>

            <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Total Feeding Fee Billed (Term 2):</span>
                <span className="font-semibold text-slate-900">
                  {formatCurrency(600)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Amount Paid to Date:</span>
                <span className="font-semibold text-emerald-700">
                  {formatCurrency(600 - student.feedingFeeBalance)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-amber-200/60">
                <span className="font-bold text-slate-800">
                  Current Feeding Fee Balance:
                </span>
                <span className="font-bold text-amber-800 text-sm">
                  {formatCurrency(student.feedingFeeBalance)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Notice: Daily lunch tickets are issued upon balance reconciliation.
            </p>
          </div>
        )}

        {/* TAB 7: TRANSPORT */}
        {activeTab === 'transport' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Assigned Bus & Route
              </h4>
              <Badge variant="info">Bus 01 • Active</Badge>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    Route 1: Madina - Adenta - North Legon
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Assigned Stop: Adenta SSNIT Flats Junction
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">06:45 AM Pickup</p>
                  <p className="text-[11px] text-slate-500">04:15 PM Dropoff</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Assigned Driver: <strong>Mr. Daniel Tetteh</strong> (+233 24 330 1199)
                </span>
                <Badge variant="success">Trip Status: On Route</Badge>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Verified Student Documents
            </h4>
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Certified Birth Certificate (Ghana Registrar General)', date: '12 Sep 2021', size: '1.4 MB' },
                { name: 'Admission & Placement Acceptance Letter', date: '12 Sep 2021', size: '420 KB' },
                { name: 'National Child Immunization & Yellow Fever Record', date: '12 Sep 2021', size: '2.1 MB' },
                { name: 'Previous School Terminal Continuous Assessment Records', date: '15 Aug 2021', size: '3.6 MB' },
              ].map((doc, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">
                        Uploaded {doc.date} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Document
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

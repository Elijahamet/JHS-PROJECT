import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Calendar,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  UserCheck,
  GraduationCap,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { AdmissionApplication } from '../../types';
import { formatDate } from '../../utils/formatters';

export const AdmissionsView: React.FC = () => {
  const {
    applications,
    updateApplicationStatus,
    setIsAddAdmissionOpen,
    enrollAcceptedApplication,
    setSelectedStudentId,
    setCurrentNav,
  } = useApp();

  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewApp, setReviewApp] = useState<AdmissionApplication | null>(null);

  const statuses = ['Pending', 'Under Review', 'Interview', 'Accepted', 'Rejected'] as const;

  const filtered = applications.filter((app) => {
    const matchStatus = selectedStatus === 'ALL' || app.status === selectedStatus;
    const matchSearch =
      app.applicantFirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.applyingForClass && app.applyingForClass.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchStatus && matchSearch;
  });

  const acceptedCount = applications.filter((a) => a.status === 'Accepted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Admissions Desk & Term Enrollment
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Process new student intake within the academic term. Newly recorded pupils are automatically placed into their classroom stream and billed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddAdmissionOpen(true)}
          >
            Record New Admission
          </Button>
        </div>
      </div>

      {/* Automated Placement Banner */}
      <div className="p-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white">
              Automated Term Enrollment Active
            </h4>
            <p className="text-xs text-indigo-200 mt-0.5 leading-relaxed max-w-2xl">
              Pupils admitted via the intake form are automatically registered to their active class stream roster, added to the teacher&apos;s daily attendance ledger, and billed the class tuition, feeding, and transport fees.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="secondary"
            icon={UserPlus}
            onClick={() => setIsAddAdmissionOpen(true)}
          >
            Open Admission Form
          </Button>
        </div>
      </div>

      {/* Pipeline Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statuses.map((st) => {
          const count = applications.filter((a) => a.status === st).length;
          const isSelected = selectedStatus === st;
          return (
            <button
              key={st}
              onClick={() => setSelectedStatus(isSelected ? 'ALL' : st)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isSelected ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {st}
                </span>
                {st === 'Accepted' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
              <p
                className={`text-xl font-bold mt-1 ${
                  isSelected ? 'text-white' : 'text-slate-900'
                }`}
              >
                {count}
              </p>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applicant name, admission ID, class, or guardian..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span>
              Showing {filtered.length} of {applications.length} applications
            </span>
            {selectedStatus !== 'ALL' && (
              <button
                onClick={() => setSelectedStatus('ALL')}
                className="font-semibold text-blue-600 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Adm ID</th>
                <th className="py-3 px-4 font-semibold">Pupil / Applicant</th>
                <th className="py-3 px-3 font-semibold">Class Assigned</th>
                <th className="py-3 px-3 font-semibold">Term Intake</th>
                <th className="py-3 px-4 font-semibold">Parent / Contact</th>
                <th className="py-3 px-3 font-semibold">Date Admitted</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 space-y-3">
                    <GraduationCap className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-medium text-slate-600">
                      No admission applications found in this view.
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Click below to record a newly admitted student within this term and place them directly into their class.
                    </p>
                    <Button
                      size="sm"
                      variant="primary"
                      icon={UserPlus}
                      onClick={() => setIsAddAdmissionOpen(true)}
                    >
                      Record New Admission
                    </Button>
                  </td>
                </tr>
              ) : (
                filtered.map((app) => {
                  let badgeVariant: 'warning' | 'info' | 'success' | 'danger' | 'neutral' = 'neutral';
                  if (app.status === 'Pending') badgeVariant = 'warning';
                  if (app.status === 'Under Review' || app.status === 'Interview')
                    badgeVariant = 'info';
                  if (app.status === 'Accepted') badgeVariant = 'success';
                  if (app.status === 'Rejected') badgeVariant = 'danger';

                  const isEnrolled = app.status === 'Accepted' && Boolean(app.enrolledStudentId);

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                      onClick={() => setReviewApp(app)}
                    >
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {app.applicationId}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900 group-hover:text-blue-600">
                          {app.applicantFirstName} {app.applicantLastName}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          DOB: {formatDate(app.dateOfBirth)} ({app.gender})
                        </p>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-semibold text-xs border border-indigo-100">
                          <BookOpen className="w-3 h-3 text-indigo-500" />
                          {app.applyingForClass}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-700">
                          {app.termAdmitted || 'Term 2'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-800 font-medium">{app.parentName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{app.parentPhone}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {formatDate(app.applicationDate)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={badgeVariant}>{app.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          {isEnrolled && (
                            <button
                              type="button"
                              onClick={() => {
                                if (app.enrolledStudentId) {
                                  setSelectedStudentId(app.enrolledStudentId);
                                  setCurrentNav('students');
                                }
                              }}
                              className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold hover:underline bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                              title="View Pupil Profile & Class Roster"
                            >
                              <UserCheck className="w-3 h-3 text-emerald-600" />
                              <span>Enrolled</span>
                            </button>
                          )}
                          <button
                            onClick={() => setReviewApp(app)}
                            className="text-xs text-blue-600 font-semibold hover:underline"
                          >
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Review Modal */}
      {reviewApp && (
        <Modal
          isOpen={!!reviewApp}
          onClose={() => setReviewApp(null)}
          title={`Admission Record — ${reviewApp.applicationId}`}
          subtitle={`${reviewApp.applicantFirstName} ${reviewApp.applicantLastName} • ${reviewApp.applyingForClass}`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">
                Current Status:{' '}
                <strong className="text-slate-900">{reviewApp.status}</strong>
              </span>
              <div className="flex items-center gap-2">
                {reviewApp.status !== 'Accepted' && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        updateApplicationStatus(reviewApp.id, 'Interview');
                        setReviewApp({ ...reviewApp, status: 'Interview' });
                      }}
                    >
                      Schedule Interview
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        updateApplicationStatus(reviewApp.id, 'Rejected');
                        setReviewApp(null);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      icon={UserCheck}
                      onClick={() => {
                        enrollAcceptedApplication(reviewApp.id);
                        setReviewApp(null);
                      }}
                    >
                      Accept & Automatically Enroll
                    </Button>
                  </>
                )}
                {reviewApp.status === 'Accepted' && reviewApp.enrolledStudentId && (
                  <Button
                    size="sm"
                    variant="primary"
                    icon={ExternalLink}
                    onClick={() => {
                      if (reviewApp.enrolledStudentId) {
                        setSelectedStudentId(reviewApp.enrolledStudentId);
                        setCurrentNav('students');
                        setReviewApp(null);
                      }
                    }}
                  >
                    View Student in Class Roster
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Pupil Information
                </span>
                <p className="font-bold text-slate-900 mt-0.5">
                  {reviewApp.applicantFirstName} {reviewApp.applicantLastName}
                </p>
                <p className="text-slate-600">
                  Gender: {reviewApp.gender} • DOB: {formatDate(reviewApp.dateOfBirth)}
                </p>
                {reviewApp.previousSchool && (
                  <p className="text-slate-600 mt-1">
                    Previous School: <strong>{reviewApp.previousSchool}</strong>
                  </p>
                )}
                {reviewApp.residentialAddress && (
                  <p className="text-slate-600">
                    Address: {reviewApp.residentialAddress}
                  </p>
                )}
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Parent / Guardian Details
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">
                  {reviewApp.parentName}
                </p>
                <p className="text-slate-600 font-mono">{reviewApp.parentPhone}</p>
                <p className="text-slate-600">{reviewApp.parentEmail}</p>
                {reviewApp.emergencyContact && (
                  <p className="text-slate-500 mt-1">
                    Emergency: {reviewApp.emergencyContact}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-700 block">Class Stream Placement</span>
                <span className="font-bold text-slate-900 text-sm">{reviewApp.applyingForClass}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-indigo-700 block">Term Admitted</span>
                <span className="font-semibold text-slate-800">{reviewApp.termAdmitted || 'Term 2'}</span>
              </div>
            </div>

            {reviewApp.notes && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                <span className="text-[10px] uppercase font-bold text-blue-900">
                  Admissions Ledger Remarks:
                </span>
                <p className="text-slate-700 mt-0.5">{reviewApp.notes}</p>
              </div>
            )}

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Verified Intake Documents
              </span>
              <div className="flex flex-wrap gap-2">
                {reviewApp.documentsSubmitted && reviewApp.documentsSubmitted.length > 0 ? (
                  reviewApp.documentsSubmitted.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 font-medium flex items-center gap-1.5 border border-slate-200"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{doc}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 italic">No verification documents listed</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


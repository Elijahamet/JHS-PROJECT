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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { AdmissionApplication } from '../../types';
import { formatDate } from '../../utils/formatters';

export const AdmissionsView: React.FC = () => {
  const { applications, updateApplicationStatus } = useApp();

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
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Admissions & Enrollment (SchoolApply)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Process prospective student applications, schedule parent interviews, and approve enrollment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={UserPlus}
            onClick={() => alert('New manual application form')}
          >
            New Application
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
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isSelected ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {st}
              </span>
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
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applicant name, ID, or guardian..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>

          <div className="text-xs text-slate-500">
            Showing {filtered.length} of {applications.length} applications
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">App ID</th>
                <th className="py-3 px-4 font-semibold">Applicant Name</th>
                <th className="py-3 px-3 font-semibold">Class Applying</th>
                <th className="py-3 px-4 font-semibold">Guardian / Contact</th>
                <th className="py-3 px-3 font-semibold">Application Date</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => {
                let badgeVariant: 'warning' | 'info' | 'success' | 'danger' | 'neutral' = 'neutral';
                if (app.status === 'Pending') badgeVariant = 'warning';
                if (app.status === 'Under Review' || app.status === 'Interview')
                  badgeVariant = 'info';
                if (app.status === 'Accepted') badgeVariant = 'success';
                if (app.status === 'Rejected') badgeVariant = 'danger';

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
                      {app.applyingForClass}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-800 font-medium">{app.parentName}</p>
                      <p className="text-[11px] text-slate-500">{app.parentPhone}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {formatDate(app.applicationDate)}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={badgeVariant}>{app.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setReviewApp(app)}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Review Modal */}
      {reviewApp && (
        <Modal
          isOpen={!!reviewApp}
          onClose={() => setReviewApp(null)}
          title={`Admission Application — ${reviewApp.applicationId}`}
          subtitle={`${reviewApp.applicantFirstName} ${reviewApp.applicantLastName} (Applying for ${reviewApp.applyingForClass})`}
          maxWidth="lg"
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500">
                Status:{' '}
                <strong className="text-slate-900">{reviewApp.status}</strong>
              </span>
              <div className="flex items-center gap-2">
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
                  onClick={() => {
                    updateApplicationStatus(reviewApp.id, 'Accepted');
                    setReviewApp(null);
                    alert(`Application approved! Student record created for ${reviewApp.applicantFirstName}.`);
                  }}
                >
                  Accept & Enroll
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Applicant
                </span>
                <p className="font-bold text-slate-900 mt-0.5">
                  {reviewApp.applicantFirstName} {reviewApp.applicantLastName}
                </p>
                <p className="text-slate-600">
                  Gender: {reviewApp.gender} • DOB: {formatDate(reviewApp.dateOfBirth)}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Parent / Guardian
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">
                  {reviewApp.parentName}
                </p>
                <p className="text-slate-600">{reviewApp.parentPhone}</p>
                <p className="text-slate-600">{reviewApp.parentEmail}</p>
              </div>
            </div>

            {reviewApp.notes && (
              <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <span className="text-[10px] uppercase font-bold text-blue-900">
                  Admissions Notes:
                </span>
                <p className="text-slate-700 mt-0.5">{reviewApp.notes}</p>
              </div>
            )}

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                Submitted Verification Documents
              </span>
              <div className="flex flex-wrap gap-2">
                {reviewApp.documentsSubmitted.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 rounded text-slate-700 font-medium flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>{doc}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

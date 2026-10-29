import React, { useState, useEffect } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import {
  UserPlus,
  Users,
  Check,
  AlertCircle,
  School,
  HeartPulse,
  Bus,
  UtensilsCrossed,
  ShieldCheck,
  UserCheck,
  Coins,
  Calendar,
  FileCheck,
  BookOpen,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { AdmissionIntakeFormData } from '../../types/drafts';

interface AddAdmissionViewProps {
  onBack: () => void;
}

export const AddAdmissionView: React.FC<AddAdmissionViewProps> = ({ onBack }) => {
  const {
    classes,
    routes,
    parents,
    recordNewAdmission,
    setIsAddAdmissionOpen,
    admissionDraft: formData,
    setAdmissionDraft: setFormData,
    clearAdmissionDraft,
    hasAdmissionDraft,
    getClassFeeBreakdown,
    setCurrentNav,
  } = useApp();

  const [isCreatingNewClass, setIsCreatingNewClass] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ studentName: string; className: string; studentId: string } | null>(null);

  // Initialize default class if none selected
  useEffect(() => {
    setFormError('');
    if (classes.length > 0 && !formData.applyingForClass) {
      setFormData((prev) => ({
        ...prev,
        applyingForClass: classes[0].name,
        classId: classes[0].id,
      }));
    }
  }, [classes, formData.applyingForClass, setFormData]);

  // Selected Class details
  const selectedClass = classes.find(
    (c) =>
      (formData.classId && c.id === formData.classId) ||
      (formData.applyingForClass && c.name.toLowerCase() === formData.applyingForClass.toLowerCase())
  );

  // Fee breakdown for the selected class
  const classFees = getClassFeeBreakdown(formData.applyingForClass || (selectedClass ? selectedClass.name : ''));

  // Live detection of existing parent account by phone or name
  const detectedExistingParent = parents.find((p) => {
    if (
      formData.parentPhone &&
      p.phone &&
      p.phone.replace(/[\s\-()]/g, '') === formData.parentPhone.replace(/[\s\-()]/g, '')
    ) {
      return true;
    }
    if (
      formData.parentName &&
      p.fullName.toLowerCase().trim() === formData.parentName.toLowerCase().trim()
    ) {
      return true;
    }
    return false;
  });

  const handleDocumentToggle = (doc: string) => {
    const current = formData.documentsSubmitted || [];
    if (current.includes(doc)) {
      setFormData((prev) => ({
        ...prev,
        documentsSubmitted: current.filter((d) => d !== doc),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        documentsSubmitted: [...current, doc],
      }));
    }
  };

  const standardDocuments = [
    'Birth Certificate (Verified)',
    '2 Passport-sized Photographs',
    'Previous Terminal Report Card / Transfer Sheet',
    'Health / Immunization Record',
    'Signed Parent Admission Undertaking',
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError('');

    if (!formData.applicantFirstName.trim() || !formData.applicantLastName.trim()) {
      setFormError('Please provide both the student First Name and Last Name.');
      return;
    }

    const assignedClassName = formData.applyingForClass.trim();
    if (!assignedClassName) {
      setFormError('Please select or specify the class stream to place this student in.');
      return;
    }

    if (!formData.parentName.trim()) {
      setFormError('Please provide the Parent / Guardian full name.');
      return;
    }

    if (!formData.parentPhone.trim()) {
      setFormError('Please provide a valid Parent / Guardian phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = recordNewAdmission({
        ...formData,
        applyingForClass: assignedClassName,
      });

      setSuccessInfo({
        studentName: `${formData.applicantFirstName} ${formData.applicantLastName}`.trim(),
        className: assignedClassName,
        studentId: result.studentId,
      });

      // Brief pause to display completion feedback before transitioning
      setTimeout(() => {
        setIsAddAdmissionOpen(false);
        onBack();
      }, 1200);
    } catch (err) {
      setFormError('An unexpected error occurred while processing admission. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Pupil Admission Desk & Automatic Class Enrollment"
      subtitle="Record newly admitted pupils within the term. The student is automatically enrolled in their class stream, added to the class roster and attendance register, and billed the class fee schedule."
      icon={UserPlus}
      iconBg="from-blue-600 via-indigo-600 to-violet-700"
      badgeText={`${formData.termAdmitted} Admission Intake`}
      badgeVariant="success"
      onBack={onBack}
      backLabel="Back to Admissions Desk"
      breadcrumbs={[
        {
          label: 'Admin Dashboard',
          onClick: () => {
            setIsAddAdmissionOpen(false);
            setCurrentNav('dashboard');
          },
        },
        {
          label: 'Admissions Desk',
          onClick: onBack,
        },
        {
          label: 'Record New Admission',
        },
      ]}
      footerSubmitLabel={isSubmitting ? 'Enrolling Pupil into Class...' : 'Admit & Automatically Enroll Pupil'}
      footerSubmitIcon={UserCheck}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
      actions={
        <div className="flex items-center gap-2">
          {hasAdmissionDraft && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Draft Auto-Saved</span>
            </span>
          )}
          {hasAdmissionDraft && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to discard this admission draft?')) {
                  clearAdmissionDraft();
                  onBack();
                }
              }}
              className="px-2.5 py-1 text-[11px] text-slate-500 hover:text-rose-600 font-semibold hover:underline cursor-pointer"
            >
              Discard Draft
            </button>
          )}
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 text-xs">
        {formError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span className="font-semibold text-xs">{formError}</span>
          </div>
        )}

        {successInfo && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-3 animate-fadeIn">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Admission Recorded & Enrolled Successfully!</p>
              <p className="text-[11px] text-emerald-700">
                {successInfo.studentName} has been enrolled in {successInfo.className}. Returning to Admissions Desk...
              </p>
            </div>
          </div>
        )}

        {/* Section 1: Academic Intake & Term Admitted */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Academic Term & Admission Intake Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Term Admitted */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Term Admitted *
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200">
                {(['Term 1', 'Term 2', 'Term 3'] as const).map((term) => {
                  const isSelected = formData.termAdmitted === term;
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setFormData({ ...formData, termAdmitted: term })}
                      className={`py-2 text-center font-bold text-xs rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Specifies which term fee schedule and attendance ledger begins.
              </p>
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Academic Year *
              </label>
              <input
                type="text"
                required
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                placeholder="2024 / 2025"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">Current academic cycle</p>
            </div>

            {/* Admission Date */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Official Admission Date *
              </label>
              <input
                type="date"
                required
                value={formData.admissionDate}
                onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-white"
              />
              <p className="text-[10px] text-slate-400 mt-1">Date enrolled on school register</p>
            </div>
          </div>
        </div>

        {/* Section 2: Classroom Stream Assignment & Automated Placement */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Classroom Stream Placement & Automatic Roster Entry
            </h3>
          </div>

          <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-200/80 rounded-2xl space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                  Select Class Assignment
                </span>
                <p className="text-xs text-slate-600">
                  Select the target class room for this new pupil.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingNewClass(!isCreatingNewClass)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors cursor-pointer"
                >
                  {isCreatingNewClass ? 'Choose Existing Class' : '+ Create New Class Stream'}
                </button>
              </div>
            </div>

            {isCreatingNewClass ? (
              <div className="space-y-2">
                <label className="block text-slate-700 font-semibold">
                  New Class Stream Name *
                </label>
                <input
                  type="text"
                  value={formData.applyingForClass}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applyingForClass: e.target.value,
                      classId: '',
                    })
                  }
                  placeholder="e.g. Basic 4 B or JHS 1 Gold"
                  className="w-full px-3.5 py-2.5 border border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-white"
                />
                <p className="text-[11px] text-slate-500">
                  A brand new classroom stream will be created automatically in Classes & Subjects with full GES curriculum subjects.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <select
                  value={formData.classId || formData.applyingForClass}
                  onChange={(e) => {
                    const sel = classes.find((c) => c.id === e.target.value || c.name === e.target.value);
                    if (sel) {
                      setFormData({
                        ...formData,
                        classId: sel.id,
                        applyingForClass: sel.name,
                      });
                    } else {
                      setFormData({
                        ...formData,
                        applyingForClass: e.target.value,
                        classId: '',
                      });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 border border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-white font-medium text-slate-900"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.stage}) — {cls.studentCount} / {cls.capacity} Enrolled • Room: {cls.roomNumber}
                    </option>
                  ))}
                </select>

                {selectedClass && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <div className="p-2.5 bg-white/90 rounded-xl border border-indigo-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Stage</span>
                      <span className="font-bold text-slate-800 text-xs">{selectedClass.stage}</span>
                    </div>
                    <div className="p-2.5 bg-white/90 rounded-xl border border-indigo-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Class Teacher</span>
                      <span className="font-bold text-slate-800 text-xs truncate block">{selectedClass.classTeacherName || 'Unassigned'}</span>
                    </div>
                    <div className="p-2.5 bg-white/90 rounded-xl border border-indigo-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Roster Capacity</span>
                      <span className="font-bold text-slate-800 text-xs">
                        {selectedClass.studentCount} / {selectedClass.capacity} ({(selectedClass.capacity - selectedClass.studentCount)} seats open)
                      </span>
                    </div>
                    <div className="p-2.5 bg-white/90 rounded-xl border border-indigo-100">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">Class Tuition Fee</span>
                      <span className="font-bold text-emerald-700 text-xs">
                        GH₵ {(selectedClass.tuitionFee ?? selectedClass.termFee ?? 0).toLocaleString()} / term
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Automatic Enrollment Highlight Callout */}
            <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-indigo-200/60 text-indigo-900">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong className="font-bold text-indigo-950">Automated Class Placement Guarantee:</strong> Upon recording this admission, the student is instantly added to the active class roster for{' '}
                <span className="font-bold text-indigo-600">{formData.applyingForClass || 'selected class'}</span>, their daily attendance register card is activated, end-of-term terminal report card is initialized, and school fees ledger is generated.
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Pupil Personal Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Pupil Bio Information & Personal Background
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                First Name *
              </label>
              <input
                type="text"
                required
                value={formData.applicantFirstName}
                onChange={(e) =>
                  setFormData({ ...formData, applicantFirstName: e.target.value })
                }
                placeholder="e.g. Kwame or Abena"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Last Name *
              </label>
              <input
                type="text"
                required
                value={formData.applicantLastName}
                onChange={(e) =>
                  setFormData({ ...formData, applicantLastName: e.target.value })
                }
                placeholder="e.g. Mensah or Appiah"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as 'Male' | 'Female',
                  })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Previous School Attended
              </label>
              <input
                type="text"
                value={formData.previousSchool}
                onChange={(e) =>
                  setFormData({ ...formData, previousSchool: e.target.value })
                }
                placeholder="e.g. St. Peter Preparatory School, Kumasi"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Residential Address / Community
              </label>
              <input
                type="text"
                value={formData.residentialAddress}
                onChange={(e) =>
                  setFormData({ ...formData, residentialAddress: e.target.value })
                }
                placeholder="e.g. House No. 24, East Legon Hills, Accra"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1.5">
                Allergies & Medical / Health Considerations
              </label>
              <div className="relative">
                <HeartPulse className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.medicalNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, medicalNotes: e.target.value })
                  }
                  placeholder="e.g. Asthmatic, carries Ventolin inhaler, allergic to peanuts (or None)"
                  className="w-full pl-9 pr-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Parent / Guardian Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">
              4
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Parent / Guardian Information & Sibling Linking
            </h3>
          </div>

          {detectedExistingParent && (
            <div className="p-3.5 bg-amber-50/90 border border-amber-200/80 rounded-xl flex items-start gap-3 text-amber-900 animate-fadeIn">
              <Users className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold">Existing Parent Record Detected: </span>
                <span className="font-semibold text-amber-950">{detectedExistingParent.fullName}</span> ({detectedExistingParent.phone}).
                This newly admitted pupil will automatically be linked as a sibling ward under their family account.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Parent / Guardian Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.parentName}
                onChange={(e) =>
                  setFormData({ ...formData, parentName: e.target.value })
                }
                placeholder="e.g. Mr. David Mensah"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Relationship to Pupil *
              </label>
              <select
                value={formData.parentRelationship}
                onChange={(e) =>
                  setFormData({ ...formData, parentRelationship: e.target.value })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-white"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
                <option value="Sponsor">Sponsor</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Primary Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.parentPhone}
                onChange={(e) =>
                  setFormData({ ...formData, parentPhone: e.target.value })
                }
                placeholder="e.g. +233 24 123 4567"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Used for Mobile Money fee receipts, term reports, and SMS announcements.
              </p>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.parentEmail}
                onChange={(e) =>
                  setFormData({ ...formData, parentEmail: e.target.value })
                }
                placeholder="e.g. parent@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1.5">
                Emergency Secondary Contact (Phone / Name)
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyContact: e.target.value })
                }
                placeholder="e.g. Auntie Grace — 020 987 6543"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Services & Automated Class Fee Distribution */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">
              5
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              School Logistics & Automatic Class Fee Billing Schedule
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feeding Participation */}
            <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800 text-xs">Canteen & Feeding Programme</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.participatesInFeeding}
                  onChange={(e) =>
                    setFormData({ ...formData, participatesInFeeding: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Pupil participates in the daily hot lunch feeding programme. When checked, class feeding fee (GH₵ {classFees.feedingFee.toLocaleString()}) is automatically added to the billing register.
              </p>
            </div>

            {/* Bus Transportation Route */}
            <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-slate-800 text-xs">Bus Route / Transit Service</span>
              </div>
              <select
                value={formData.busRouteId}
                onChange={(e) => {
                  const selRoute = routes.find((r) => r.id === e.target.value);
                  setFormData({
                    ...formData,
                    busRouteId: e.target.value,
                    busRouteName: selRoute ? selRoute.name : '',
                  });
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white font-medium"
              >
                <option value="">No School Bus (Private Transport / Walk)</option>
                {routes.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name} ({rt.studentCount} pupils enrolled)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dynamic Fee Summary Card */}
          <div className="p-4 bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-slate-50 border border-emerald-200/80 rounded-2xl space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-emerald-950 text-xs uppercase tracking-wide">
                  Automated Class Fee Schedule Distribution ({formData.applyingForClass || 'Class'})
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {formData.termAdmitted}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <div className="p-3 bg-white/90 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">1. School Fees (Tuition)</span>
                <span className="font-bold text-slate-900 text-sm">
                  GH₵ {(formData.customSchoolFee !== undefined ? Number(formData.customSchoolFee) : classFees.tuitionFee).toLocaleString()}
                </span>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">2. Feeding Fee</span>
                <span className="font-bold text-slate-900 text-sm">
                  {formData.participatesInFeeding
                    ? `GH₵ ${classFees.feedingFee.toLocaleString()}`
                    : 'GH₵ 0 (Opted Out)'}
                </span>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-emerald-100">
                <span className="text-[10px] text-slate-500 font-semibold block uppercase">3. Bus Fee</span>
                <span className="font-bold text-slate-900 text-sm">
                  {formData.busRouteId
                    ? `GH₵ ${classFees.busFee.toLocaleString()}`
                    : 'GH₵ 0 (None)'}
                </span>
              </div>

              <div className="p-3 bg-emerald-600 text-white rounded-xl shadow-xs">
                <span className="text-[10px] text-emerald-100 font-bold block uppercase">Total Term Bill</span>
                <span className="font-extrabold text-base">
                  GH₵ {(
                    (formData.customSchoolFee !== undefined ? Number(formData.customSchoolFee) : classFees.tuitionFee) +
                    (formData.participatesInFeeding ? classFees.feedingFee : 0) +
                    (formData.busRouteId ? classFees.busFee : 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Optional Custom Fee Adjustment */}
            <div className="pt-2 border-t border-emerald-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600">
              <span className="text-[11px]">
                Special concession / Scholarship tuition override (optional):
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">GH₵</span>
                <input
                  type="number"
                  min="0"
                  value={formData.customSchoolFee !== undefined ? formData.customSchoolFee : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customSchoolFee: e.target.value === '' ? undefined : Number(e.target.value),
                    })
                  }
                  placeholder={`Standard: ${classFees.tuitionFee}`}
                  className="w-32 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white text-right font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Verified Documents & Admission Desk Ledger Notes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-xs">
              6
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Admission Verification Checklist & Ledger Remarks
            </h3>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Admission Documents Inspected & Verified by Desk:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {standardDocuments.map((doc) => {
                const isChecked = (formData.documentsSubmitted || []).includes(doc);
                return (
                  <label
                    key={doc}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-blue-50/70 border-blue-200 text-blue-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleDocumentToggle(doc)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>{doc}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Admission Desk Official Remarks & Placement Notes
            </label>
            <textarea
              rows={2}
              value={formData.admissionNotes}
              onChange={(e) => setFormData({ ...formData, admissionNotes: e.target.value })}
              placeholder="e.g. Admitted under regular term intake. Placement interview conducted by Head of Academics."
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
            />
          </div>
        </div>

        {/* Section 7: Live Auto-Enrollment Preview Card */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-sm tracking-tight text-white">
                Live Auto-Enrollment Action Summary
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Immediate Activation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-indigo-300 uppercase block font-semibold">Student Name</span>
              <span className="font-bold text-white text-sm">
                {formData.applicantFirstName || formData.applicantLastName
                  ? `${formData.applicantFirstName} ${formData.applicantLastName}`.trim()
                  : 'New Admitted Pupil'}
              </span>
            </div>

            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-indigo-300 uppercase block font-semibold">Assigned Class Stream</span>
              <span className="font-bold text-white text-sm">
                {formData.applyingForClass || 'Unassigned'}
              </span>
            </div>

            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-indigo-300 uppercase block font-semibold">Term Intake</span>
              <span className="font-bold text-emerald-300 text-sm">
                {formData.termAdmitted} ({formData.academicYear})
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-indigo-200">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Pupil added automatically to <strong>{formData.applyingForClass || 'class stream'}</strong> roster and student count increments.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Daily attendance register card and terminal report card initialized.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Parent / Guardian account ({formData.parentName || 'Guardian'}) linked with SMS fee alerts.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Official admission record archived under Admissions Desk with status &quot;Accepted&quot;.</span>
            </div>
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

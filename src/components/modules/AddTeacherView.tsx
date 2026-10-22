import React, { useState } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { UserPlus, Award, BookOpen, AlertCircle, CheckCircle2, Check } from 'lucide-react';

interface AddTeacherViewProps {
  onBack: () => void;
}

export const AddTeacherView: React.FC<AddTeacherViewProps> = ({ onBack }) => {
  const {
    addTeacher,
    classes,
    setIsAddTeacherOpen,
    teacherDraft: formData,
    setTeacherDraft: setFormData,
    clearTeacherDraft,
    hasTeacherDraft,
  } = useApp();

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSubjects = [
    'Mathematics',
    'English Language',
    'Integrated Science',
    'Social Studies',
    'Information & Communication Technology (ICT)',
    'Basic Design & Technology (BDT)',
    'Religious & Moral Education (RME)',
    'Ghanaian Language (Twi/Ga)',
    'French',
    'Physical Education (PE)',
  ];

  const handleSubjectToggle = (subj: string) => {
    if (formData.subjectsAssigned.includes(subj)) {
      setFormData({
        ...formData,
        subjectsAssigned: formData.subjectsAssigned.filter((s) => s !== subj),
      });
    } else {
      setFormData({
        ...formData,
        subjectsAssigned: [...formData.subjectsAssigned, subj],
      });
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim()) {
      setFormError('Please enter the full name of the academic staff member.');
      return;
    }

    setIsSubmitting(true);

    try {
      addTeacher({
        fullName: formData.fullName.trim(),
        staffId: formData.staffId.trim() || undefined,
        email: formData.email.trim() || 'teacher@brightfuture.edu.gh',
        phone: formData.phone.trim() || '+233 24 000 0000',
        qualification: formData.qualification,
        isClassTeacherOf: formData.isClassTeacherOf || undefined,
        subjectsAssigned: formData.subjectsAssigned,
        status: formData.status,
      });

      setIsAddTeacherOpen(false);
      onBack();
    } catch (err) {
      setFormError('Error saving teacher profile.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Add New Academic Staff / Teacher"
      subtitle="Register teacher profile, assign class leadership, and allocate instructed curriculum subjects"
      icon={UserPlus}
      iconBg="from-indigo-600 via-purple-600 to-purple-700"
      badgeText="Faculty Directory"
      badgeVariant="info"
      onBack={onBack}
      backLabel="Back to Teachers"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'Academic Staff Directory', onClick: onBack },
        { label: 'Add New Teacher' },
      ]}
      footerSubmitLabel="Save & Appoint Teacher"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
      actions={
        <div className="flex items-center gap-2">
          {hasTeacherDraft && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Draft Auto-Saved</span>
            </span>
          )}
          {hasTeacherDraft && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to discard this teacher profile draft?')) {
                  clearTeacherDraft();
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

        {/* Personal Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Staff Personal & Contact Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="e.g. Mr. Emmanuel Osei"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Staff ID (Auto-generated if left blank)
              </label>
              <input
                type="text"
                value={formData.staffId}
                onChange={(e) =>
                  setFormData({ ...formData, staffId: e.target.value })
                }
                placeholder="e.g. STF-2025-015"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-slate-50/50 hover:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. e.osei@brightfuture.edu.gh"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Phone Number (Ghana format)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+233 24 123 4567"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Academic Qualification & Class Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Highest Academic Qualification
              </label>
              <select
                value={formData.qualification}
                onChange={(e) =>
                  setFormData({ ...formData, qualification: e.target.value })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-white"
              >
                <option value="B.Ed. Basic Education">B.Ed. Basic Education</option>
                <option value="B.Ed. Mathematics / Science">B.Ed. Mathematics / Science</option>
                <option value="B.A. Arts & Languages">B.A. Arts & Languages</option>
                <option value="B.Sc. Computer Science / ICT">B.Sc. Computer Science / ICT</option>
                <option value="M.Ed. Curriculum Studies">M.Ed. Curriculum Studies</option>
                <option value="Diploma in Basic Education (DBE)">Diploma in Basic Education (DBE)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Class Teacher Appointment
              </label>
              <select
                value={formData.isClassTeacherOf}
                onChange={(e) =>
                  setFormData({ ...formData, isClassTeacherOf: e.target.value })
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-white"
              >
                <option value="">None (Subject Teacher Only)</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>
                    Class Teacher of {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subjects Allocated */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Curriculum Subjects Assigned
              </h3>
              <p className="text-[11px] text-slate-500">
                Select the academic subjects this educator is authorized to instruct:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {availableSubjects.map((subj) => {
              const checked = formData.subjectsAssigned.includes(subj);
              return (
                <label
                  key={subj}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleSubjectToggle(subj)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />
                  <span className="text-xs">{subj}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

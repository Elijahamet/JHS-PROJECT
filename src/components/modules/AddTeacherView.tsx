import React, { useState } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';
import { UserPlus, Award, BookOpen, AlertCircle, CheckCircle2, Check, Copy, ArrowRight, School, GraduationCap } from 'lucide-react';

interface AddTeacherViewProps {
  onBack: () => void;
}

export const AddTeacherView: React.FC<AddTeacherViewProps> = ({ onBack }) => {
  const {
    addTeacher,
    classes,
    seedStandardGhanaianClasses,
    setIsAddTeacherOpen,
    setUserRole,
    setCurrentNav,
    currentSchool,
    teacherDraft: formData,
    setTeacherDraft: setFormData,
    clearTeacherDraft,
    hasTeacherDraft,
  } = useApp();

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTeacher, setCreatedTeacher] = useState<Teacher | null>(null);
  const [copied, setCopied] = useState(false);

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

    if (formData.teacherType === 'Class Teacher') {
      if (classes.length > 0 && !formData.isClassTeacherOf) {
        setFormError('Please assign a class to this Class Teacher from the list of available classes.');
        return;
      }
    } else {
      if (formData.subjectsAssigned.length === 0) {
        setFormError('Please select at least one curriculum subject for this Subject Teacher.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const created = addTeacher({
        fullName: formData.fullName.trim(),
        staffId: formData.staffId.trim() || undefined,
        email: formData.email.trim() || `${formData.fullName.toLowerCase().replace(/[^a-z]/g, '') || 'teacher'}@brightfuture.edu.gh`,
        phone: formData.phone.trim() || '+233 24 000 0000',
        qualification: formData.qualification,
        teacherType: formData.teacherType,
        isClassTeacherOf: formData.teacherType === 'Class Teacher' ? (formData.isClassTeacherOf || undefined) : undefined,
        classesAssigned: formData.teacherType === 'Class Teacher' && formData.isClassTeacherOf ? [formData.isClassTeacherOf] : [],
        subjectsAssigned: formData.subjectsAssigned,
        status: formData.status,
      });

      setCreatedTeacher(created);
      setIsSubmitting(false);
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
              Academic Qualification & Faculty Role Appointment
            </h3>
          </div>

          {/* Teacher Appointment Type Selector */}
          <div className="space-y-2">
            <label className="block text-slate-700 font-semibold mb-1">
              Faculty Appointment Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, teacherType: 'Class Teacher' })}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  formData.teacherType === 'Class Teacher'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-600/20'
                    : 'border-slate-200 hover:bg-slate-50 bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  formData.teacherType === 'Class Teacher' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">Class Teacher (Form Master)</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 font-semibold px-1.5 py-0.5 rounded">Assigned Class</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Appointed to manage a specific class stream, take roll call, and supervise pupil report cards.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, teacherType: 'Subject Teacher', isClassTeacherOf: '', classesAssigned: [] })}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  formData.teacherType === 'Subject Teacher'
                    ? 'border-purple-600 bg-purple-50/70 shadow-xs ring-2 ring-purple-600/20'
                    : 'border-slate-200 hover:bg-slate-50 bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  formData.teacherType === 'Subject Teacher' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-slate-900">Subject Teacher</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-1.5 py-0.5 rounded">No Class Assigned</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Instructs specialized curriculum subjects without a form master stream.
                  </p>
                </div>
              </button>
            </div>
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

            {/* Conditional Class Assignment: ONLY for Class Teachers */}
            {formData.teacherType === 'Class Teacher' ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-slate-700 font-semibold">
                    Assigned Class Stream *
                  </label>
                  <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                    Required for Class Teachers
                  </span>
                </div>
                {classes.length === 0 ? (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                    <p className="text-[11px] text-amber-800">
                      No classes available yet in your school. Generate standard streams first:
                    </p>
                    <button
                      type="button"
                      onClick={seedStandardGhanaianClasses}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-xs cursor-pointer"
                    >
                      + Generate Standard Ghanaian Classes (KG 1 - JHS 3)
                    </button>
                  </div>
                ) : (
                  <select
                    required
                    value={formData.isClassTeacherOf}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isClassTeacherOf: e.target.value,
                        classesAssigned: e.target.value ? [e.target.value] : [],
                      })
                    }
                    className={`w-full px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all text-xs bg-white font-medium ${
                      !formData.isClassTeacherOf ? 'border-amber-300' : 'border-slate-200'
                    }`}
                  >
                    <option value="">-- Select Available Class from School ({classes.length} Streams) * --</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.name}>
                        {cls.name} ({cls.stage}) — Room: {cls.roomNumber || 'General'}
                      </option>
                    ))}
                  </select>
                )}
                <p className="text-[11px] text-slate-500 mt-1">
                  This educator will be the official Form Class Master for this stream.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl flex items-center gap-2.5 text-xs text-purple-900 self-center">
                <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="leading-relaxed">
                  <strong>Subject Teacher Notice:</strong> Only Class Teachers are assigned a class stream. When this teacher enters their Staff ID, the app will inform them that they are a Subject Teacher.
                </span>
              </div>
            )}
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

      {/* Appointment Success Modal with Given Teacher ID */}
      {createdTeacher && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900">Teacher Successfully Appointed!</h3>
              <p className="text-xs text-slate-500">
                The academic staff member is registered and assigned to their classroom.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Teacher Name:</span>
                <span className="font-bold text-slate-900">{createdTeacher.fullName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Faculty Role:</span>
                <span className={`font-bold px-2.5 py-0.5 rounded text-[11px] ${
                  createdTeacher.teacherType === 'Subject Teacher'
                    ? 'bg-purple-100 text-purple-800 border border-purple-200'
                    : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                }`}>
                  {createdTeacher.teacherType || 'Class Teacher'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Assigned Class:</span>
                {createdTeacher.isClassTeacherOf ? (
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-200">
                    {createdTeacher.isClassTeacherOf}
                  </span>
                ) : (
                  <span className="text-slate-500 italic bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                    None (Subject Teacher)
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Staff ID Given:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-md border border-emerald-300">
                    {createdTeacher.staffId}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(createdTeacher.staffId);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-md text-[11px] font-semibold text-slate-700 cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>{copied ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Next Step:</strong> Give this Staff ID (<strong className="font-mono">{createdTeacher.staffId}</strong>) to the educator.
                {createdTeacher.isClassTeacherOf ? (
                  <> As an appointed <strong>Class Teacher</strong>, when they enter this ID they will see their assigned class (<strong className="text-indigo-700">{createdTeacher.isClassTeacherOf}</strong>) and enrolled students.</>
                ) : (
                  <> As a <strong>Subject Teacher</strong>, when they enter this ID the app will notify them that they are a Subject Teacher and direct them to their curriculum marks entry desk.</>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCreatedTeacher(null);
                  setIsAddTeacherOpen(false);
                  onBack();
                }}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Back to Directory
              </button>
              <button
                type="button"
                onClick={() => {
                  setCreatedTeacher(null);
                  setIsAddTeacherOpen(false);
                  setUserRole('teacher', {
                    id: createdTeacher.id,
                    name: createdTeacher.fullName,
                    email: createdTeacher.email,
                    role: 'teacher',
                    schoolId: currentSchool.id,
                    schoolName: currentSchool.name,
                    teacherStaffId: createdTeacher.staffId,
                  });
                  setCurrentNav('teacher-cockpit');
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Open Teacher Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </FormPageLayout>
  );
};

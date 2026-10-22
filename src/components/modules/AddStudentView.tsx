import React, { useState, useEffect } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Users,
  Sparkles,
  Check,
  AlertCircle,
  School,
  HeartPulse,
  Bus,
  UtensilsCrossed,
  ShieldCheck,
  UserCheck,
  Coins,
} from 'lucide-react';

interface AddStudentViewProps {
  onBack: () => void;
}

export const AddStudentView: React.FC<AddStudentViewProps> = ({ onBack }) => {
  const {
    addStudent,
    classes,
    routes,
    parents,
    enrollTargetClass,
    setEnrollTargetClass,
    setIsAddStudentOpen,
    studentDraft: formData,
    setStudentDraft: setFormData,
    clearStudentDraft,
    hasStudentDraft,
    getClassFee,
  } = useApp();

  const [isCreatingNewClass, setIsCreatingNewClass] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormError('');
    if (enrollTargetClass) {
      setFormData((prev) => ({
        ...prev,
        className: enrollTargetClass.name,
        classId: enrollTargetClass.id,
      }));
      setIsCreatingNewClass(false);
    } else if (classes.length > 0 && !formData.className) {
      setFormData((prev) => ({
        ...prev,
        className: classes[0].name,
        classId: classes[0].id,
      }));
    }
  }, [enrollTargetClass, classes, formData.className, setFormData]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setFormError('Please enter both student First Name and Last Name.');
      return;
    }

    const assignedClassName = formData.className.trim();
    if (!assignedClassName) {
      setFormError('Please select or specify the student\'s class assignment.');
      return;
    }

    setIsSubmitting(true);

    try {
      addStudent({
        ...formData,
        className: assignedClassName,
      });

      setIsAddStudentOpen(false);
      setEnrollTargetClass(null);
      onBack();
    } catch (err) {
      setFormError('An error occurred while enrolling the student. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Live multi-ward / existing parent detection
  const detectedExistingParent = parents.find((p) => {
    if (formData.parentId && p.id === formData.parentId) return true;
    if (
      formData.parentPhone &&
      p.phone &&
      p.phone.replace(/[\s\-()]/g, '') === formData.parentPhone.replace(/[\s\-()]/g, '')
    )
      return true;
    if (
      formData.parentName &&
      p.fullName.toLowerCase().trim() === formData.parentName.toLowerCase().trim()
    )
      return true;
    return false;
  });

  const matchedExistingClass = classes.find(
    (c) =>
      (formData.classId && c.id === formData.classId) ||
      (formData.className && c.name.toLowerCase() === formData.className.toLowerCase())
  );

  const standardClassFee = getClassFee(formData.className || '');

  return (
    <FormPageLayout
      title="Enroll New Student"
      subtitle="Register student personal particulars, assign to an academic classroom, and link guardian records"
      icon={GraduationCap}
      iconBg="from-blue-600 via-indigo-600 to-indigo-700"
      badgeText="Ghana GES Aligned"
      badgeVariant="info"
      onBack={onBack}
      backLabel="Back to Students"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'Students Directory', onClick: onBack },
        { label: 'Enroll New Student' },
      ]}
      footerSubmitLabel="Complete Student Enrollment"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
      actions={
        <div className="flex items-center gap-2">
          {hasStudentDraft && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Draft Auto-Saved</span>
            </span>
          )}
          {hasStudentDraft && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to discard this student enrollment draft?')) {
                  clearStudentDraft();
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

        {/* Section 1: Student Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Student Personal Information & Classroom Assignment
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
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                placeholder="e.g. Kwame"
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
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                placeholder="e.g. Mensah"
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

            {/* Prominent Class Assignment & Stream Selector */}
            <div className="sm:col-span-2 p-4 sm:p-5 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200/80 rounded-2xl space-y-3.5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="text-slate-900 font-bold text-xs flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Class Assignment & Academic Stream *</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Students are placed into their assigned class roster and visible on the Classes & Subjects platform.
                  </p>
                </div>
                {classes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingNewClass(!isCreatingNewClass);
                      if (!isCreatingNewClass) {
                        setFormData((prev) => ({ ...prev, classId: '' }));
                      }
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    {isCreatingNewClass ? '← Choose Existing Class' : '+ Create New Class Stream'}
                  </button>
                )}
              </div>

              {!isCreatingNewClass && classes.length > 0 ? (
                <div>
                  <select
                    value={formData.classId}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setIsCreatingNewClass(true);
                        setFormData((prev) => ({ ...prev, classId: '', className: 'Basic 1' }));
                      } else {
                        const sel = classes.find((c) => c.id === e.target.value);
                        setFormData({
                          ...formData,
                          classId: e.target.value,
                          className: sel ? sel.name : '',
                        });
                      }
                    }}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-white font-semibold text-slate-900 text-xs shadow-xs"
                  >
                    <option value="">-- Choose Class Stream (Required) --</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name} ({cls.stage}) — Room {cls.roomNumber} ({cls.studentCount} enrolled)
                      </option>
                    ))}
                    <option value="__new__">+ Create & Enroll in a New Class Stream...</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      Choose Standard Ghanaian Class Preset:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['KG 1', 'KG 2', 'Basic 1', 'Basic 2', 'Basic 3', 'Basic 4', 'Basic 5', 'Basic 6', 'JHS 1', 'JHS 2', 'JHS 3'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              className: preset,
                              classId: '',
                            }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            formData.className === preset
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Class Name / Stream Title:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Basic 1A or JHS 1 Gold"
                        value={formData.className}
                        onChange={(e) => {
                          setFormData({ ...formData, className: e.target.value, classId: '' });
                        }}
                        className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-white text-xs font-semibold text-slate-900 shadow-xs"
                      />
                      {classes.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingNewClass(false);
                            if (classes.length > 0) {
                              setFormData((prev) => ({
                                ...prev,
                                classId: classes[0].id,
                                className: classes[0].name,
                              }));
                            }
                          }}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs bg-white cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/90 rounded-xl p-2.5 font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>This class will be automatically registered with standard GES curriculum subjects and visible on the Classes & Subjects platform.</span>
                  </p>
                </div>
              )}

              {formData.className && (
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] border-t border-blue-200/60 text-slate-700">
                  <span>
                    Class: <strong className="text-blue-700 font-bold">{formData.className}</strong> ({matchedExistingClass ? matchedExistingClass.stage : 'Auto-configured'})
                  </span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {matchedExistingClass ? 'Enrolling into existing stream' : 'Auto-adds to Classes & Subjects'}
                  </span>
                </div>
              )}

              {/* Class Fee Notice & Custom Fee Override */}
              <div className="p-3.5 bg-white border border-blue-200/90 rounded-xl space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-900 text-xs">
                      Term Tuition Fee for {formData.className || 'Selected Stream'}:
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-extrabold text-xs font-mono">
                      GH₵ {standardClassFee.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Configured by Admin
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Custom Student Tuition Fee (GH₵) — Optional Override
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">
                        GH₵
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={formData.customSchoolFee !== undefined ? formData.customSchoolFee : ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customSchoolFee: e.target.value === '' ? undefined : Number(e.target.value),
                          })
                        }
                        placeholder={`Standard Class Default (GH₵ ${standardClassFee.toLocaleString()})`}
                        className="w-full pl-12 pr-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                      />
                    </div>
                    {formData.customSchoolFee !== undefined && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, customSchoolFee: undefined })}
                        className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Leave blank to use the official admin-set fee for {formData.className || 'this class'} (GH₵ {standardClassFee.toLocaleString()}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Parent/Guardian Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Parent & Guardian Contact Information
              </h3>
            </div>
            {detectedExistingParent && (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
                Multi-Ward Family Link
              </span>
            )}
          </div>

          {/* Existing Parent Selector */}
          {parents.length > 0 && (
            <div className="p-3.5 bg-slate-50/80 border border-slate-200/90 rounded-xl space-y-1.5">
              <label className="block text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                Select Existing Registered Parent to Link Sibling (Optional)
              </label>
              <select
                value={formData.parentId}
                onChange={(e) => {
                  const sel = parents.find((p) => p.id === e.target.value);
                  if (sel) {
                    setFormData((prev) => ({
                      ...prev,
                      parentId: sel.id,
                      parentName: sel.fullName,
                      parentPhone: sel.phone,
                      parentEmail: sel.email,
                      parentRelationship: sel.relationship,
                      residentialAddress: sel.residentialAddress,
                    }));
                  } else {
                    setFormData((prev) => ({ ...prev, parentId: '' }));
                  }
                }}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-medium"
              >
                <option value="">-- Choose registered parent or enter details below --</option>
                {parents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.relationship}) — {p.childrenNames.length} ward{p.childrenNames.length > 1 ? 's' : ''} enrolled ({p.childrenNames.join(', ')})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sibling Detection Indicator */}
          {detectedExistingParent && (
            <div className="p-4 bg-amber-50/90 border border-amber-300/80 rounded-2xl flex items-start gap-3 text-xs text-amber-950 animate-fadeIn">
              <Users className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold flex items-center gap-2">
                  <span>Parent Already Registered — Multi-Ward Family Linking</span>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md font-bold text-[10px]">
                    Sibling Identified
                  </span>
                </p>
                <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                  <strong>{detectedExistingParent.fullName}</strong> is registered on the system with {detectedExistingParent.childrenNames.length} enrolled ward{detectedExistingParent.childrenNames.length > 1 ? 's' : ''}:{' '}
                  <span className="font-semibold text-slate-900">{detectedExistingParent.childrenNames.join(', ')}</span>.
                  Enrolling this student will automatically update their family account to {detectedExistingParent.childrenNames.length + 1} students in the directory.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                value={formData.parentName}
                onChange={(e) =>
                  setFormData({ ...formData, parentName: e.target.value })
                }
                placeholder="e.g. Mr. Ebenezer Mensah"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Relationship
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
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Phone Number (Ghana format) *
              </label>
              <input
                type="tel"
                required
                value={formData.parentPhone}
                onChange={(e) =>
                  setFormData({ ...formData, parentPhone: e.target.value })
                }
                placeholder="+233 24 000 0000"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
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
                placeholder="parent@example.com"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1.5">
                Residential Address
              </label>
              <input
                type="text"
                value={formData.residentialAddress}
                onChange={(e) =>
                  setFormData({ ...formData, residentialAddress: e.target.value })
                }
                placeholder="e.g. House 24, Adenta SSNIT Flats, Accra"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Operations & Health Notes */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              School Operations, Welfare & Logistics
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
              <input
                type="checkbox"
                id="feedingCheck"
                checked={formData.participatesInFeeding}
                onChange={(e) =>
                  setFormData({ ...formData, participatesInFeeding: e.target.checked })
                }
                className="w-4 h-4 mt-0.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="feedingCheck" className="cursor-pointer">
                <span className="block font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-amber-600" />
                  Hot Lunch & Feeding Programme
                </span>
                <span className="block text-[11px] text-slate-500 mt-0.5">
                  Enroll student in daily nutritious school meal service and track feeding balances.
                </span>
              </label>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Assigned Bus Route (Optional)
              </label>
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
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-white"
              >
                <option value="">No Transport Required (Day Student)</option>
                {routes.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name} ({rt.busNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1.5">
                Medical & Allergy Notes
              </label>
              <input
                type="text"
                value={formData.medicalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, medicalNotes: e.target.value })
                }
                placeholder="e.g. Asthma inhaler required, peanut allergy, wears reading glasses..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

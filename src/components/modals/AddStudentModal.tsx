import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Users, Sparkles, Check, AlertCircle, GraduationCap, School } from 'lucide-react';

export const AddStudentModal: React.FC = () => {
  const {
    isAddStudentOpen,
    setIsAddStudentOpen,
    addStudent,
    classes,
    routes,
    parents,
    enrollTargetClass,
    setEnrollTargetClass,
  } = useApp();

  const [isCreatingNewClass, setIsCreatingNewClass] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female',
    dateOfBirth: '2012-05-15',
    className: classes[0]?.name || 'Basic 1',
    classId: classes[0]?.id || '',
    parentId: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentRelationship: 'Father',
    residentialAddress: '',
    emergencyContact: '',
    medicalNotes: '',
    participatesInFeeding: true,
    busRouteId: '',
    busRouteName: '',
  });

  useEffect(() => {
    if (isAddStudentOpen) {
      setFormError('');
      if (enrollTargetClass) {
        setFormData((prev) => ({
          ...prev,
          className: enrollTargetClass.name,
          classId: enrollTargetClass.id,
        }));
        setIsCreatingNewClass(false);
      } else if (classes.length > 0) {
        if (!formData.classId && !formData.className) {
          setFormData((prev) => ({
            ...prev,
            className: classes[0].name,
            classId: classes[0].id,
          }));
        }
        setIsCreatingNewClass(false);
      } else {
        // No classes currently exist; default to create new class mode with Basic 1
        setIsCreatingNewClass(true);
        setFormData((prev) => ({
          ...prev,
          className: prev.className || 'Basic 1',
          classId: '',
        }));
      }
    }
  }, [isAddStudentOpen, enrollTargetClass, classes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    addStudent({
      ...formData,
      className: assignedClassName,
    });

    setIsAddStudentOpen(false);
    setEnrollTargetClass(null);
    setIsCreatingNewClass(false);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      gender: 'Male',
      dateOfBirth: '2012-05-15',
      className: classes[0]?.name || 'Basic 1',
      classId: classes[0]?.id || '',
      parentId: '',
      parentName: '',
      parentPhone: '',
      parentEmail: '',
      parentRelationship: 'Father',
      residentialAddress: '',
      emergencyContact: '',
      medicalNotes: '',
      participatesInFeeding: true,
      busRouteId: '',
      busRouteName: '',
    });
  };

  // Live multi-ward / existing parent detection
  const detectedExistingParent = parents.find((p) => {
    if (formData.parentId && p.id === formData.parentId) return true;
    if (formData.parentPhone && p.phone && p.phone.replace(/[\s\-()]/g, '') === formData.parentPhone.replace(/[\s\-()]/g, '')) return true;
    if (formData.parentName && p.fullName.toLowerCase().trim() === formData.parentName.toLowerCase().trim()) return true;
    return false;
  });

  const matchedExistingClass = classes.find(
    (c) => (formData.classId && c.id === formData.classId) ||
           (formData.className && c.name.toLowerCase() === formData.className.toLowerCase())
  );

  return (
    <Modal
      isOpen={isAddStudentOpen}
      onClose={() => {
        setIsAddStudentOpen(false);
        setEnrollTargetClass(null);
      }}
      title="Enroll New Student"
      subtitle="Assign student to an academic class and record guardian information"
      maxWidth="2xl"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsAddStudentOpen(false);
              setEnrollTargetClass(null);
            }}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Save & Enroll Student
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {formError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{formError}</span>
          </div>
        )}

        {/* Section 1: Student Information */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
            1. Student Personal Information & Classroom Assignment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Prominent Class Assignment & Stream Selector */}
            <div className="sm:col-span-2 p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <label className="text-slate-900 font-bold text-xs flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Class Assignment & Academic Stream *</span>
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Students are automatically placed into their chosen class and will appear on the Classes & Subjects page.
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
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline self-start sm:self-auto"
                  >
                    {isCreatingNewClass ? '← Choose Existing Class' : '+ Create New Class'}
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-semibold text-slate-900 text-xs shadow-xs"
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
                <div className="space-y-2.5">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      Choose Standard Ghanaian Class Preset:
                    </span>
                    {/* Quick Presets */}
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
                          className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
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
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white text-xs font-semibold text-slate-900 shadow-xs"
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
                          className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium text-xs bg-white"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg p-2 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>This class will be automatically created with standard GES curriculum subjects and visible on the Classes & Subjects page.</span>
                  </p>
                </div>
              )}

              {/* Status summary confirmation pill */}
              {formData.className && (
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] border-t border-blue-200/60 text-slate-700">
                  <span>Class: <strong className="text-blue-700 font-bold">{formData.className}</strong> ({matchedExistingClass ? matchedExistingClass.stage : 'Auto-configured'})</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {matchedExistingClass ? 'Enrolling into existing stream' : 'Auto-adds to Classes & Subjects'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Parent/Guardian Information */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100 flex items-center justify-between">
            <span>2. Parent & Guardian Contact</span>
            {detectedExistingParent && (
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                Multi-Ward Family Link
              </span>
            )}
          </h4>

          {/* Existing Parent Quick-Link Selector */}
          {parents.length > 0 && (
            <div className="mb-3.5 p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1.5">
              <label className="block text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
                Select Existing Parent to Link Sibling (Optional)
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
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

          {/* Sibling / Multi-Ward Detection Indicator */}
          {detectedExistingParent && (
            <div className="mb-3.5 p-3.5 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 text-xs text-amber-950 animate-fadeIn">
              <Users className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold flex items-center gap-1.5">
                  <span>Parent Already Registered — Multi-Ward Family Linking</span>
                  <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded font-bold text-[10px]">
                    Sibling Identified
                  </span>
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                  <strong>{detectedExistingParent.fullName}</strong> is registered on the system with {detectedExistingParent.childrenNames.length} enrolled ward{detectedExistingParent.childrenNames.length > 1 ? 's' : ''}:{' '}
                  <span className="font-semibold text-slate-900">{detectedExistingParent.childrenNames.join(', ')}</span>.
                  Enrolling this student will automatically update their family account to {detectedExistingParent.childrenNames.length + 1} students in the directory.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Relationship
              </label>
              <select
                value={formData.parentRelationship}
                onChange={(e) =>
                  setFormData({ ...formData, parentRelationship: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Guardian">Guardian</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.parentEmail}
                onChange={(e) =>
                  setFormData({ ...formData, parentEmail: e.target.value })
                }
                placeholder="parent@example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-medium mb-1">
                Residential Address
              </label>
              <input
                type="text"
                value={formData.residentialAddress}
                onChange={(e) =>
                  setFormData({ ...formData, residentialAddress: e.target.value })
                }
                placeholder="e.g. House 24, Adenta SSNIT Flats, Accra"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Operations & Health Notes */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
            3. School Operations & Services
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="feedingCheck"
                checked={formData.participatesInFeeding}
                onChange={(e) =>
                  setFormData({ ...formData, participatesInFeeding: e.target.checked })
                }
                className="w-4 h-4 text-slate-900 rounded border-slate-300 focus:ring-slate-900"
              />
              <label htmlFor="feedingCheck" className="text-slate-700 font-medium">
                Enroll in Hot Lunch / Feeding Programme
              </label>
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              >
                <option value="">No Transport Required</option>
                {routes.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name} ({rt.busNumber})
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-medium mb-1">
                Medical & Allergy Notes
              </label>
              <input
                type="text"
                value={formData.medicalNotes}
                onChange={(e) =>
                  setFormData({ ...formData, medicalNotes: e.target.value })
                }
                placeholder="e.g. Asthma, peanut allergy, wears reading glasses..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

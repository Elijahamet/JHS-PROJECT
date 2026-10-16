import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Users, Sparkles, Check, AlertCircle } from 'lucide-react';

export const AddStudentModal: React.FC = () => {
  const { isAddStudentOpen, setIsAddStudentOpen, addStudent, classes, routes, parents } = useApp();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female',
    dateOfBirth: '2012-05-15',
    className: classes[0]?.name || '',
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
    if (classes.length > 0 && !formData.classId) {
      setFormData((prev) => ({
        ...prev,
        className: classes[0].name,
        classId: classes[0].id,
      }));
    }
  }, [classes, isAddStudentOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) return;

    addStudent(formData);
    setIsAddStudentOpen(false);
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      gender: 'Male',
      dateOfBirth: '2012-05-15',
      className: classes[0]?.name || '',
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

  return (
    <Modal
      isOpen={isAddStudentOpen}
      onClose={() => setIsAddStudentOpen(false)}
      title="Enroll New Student"
      subtitle="Complete student academic and guardian records"
      maxWidth="2xl"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddStudentOpen(false)}
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
        {/* Section 1: Student Information */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
            1. Student Personal Information
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
            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-medium mb-1">
                Class Assignment *
              </label>
              <select
                value={formData.classId}
                onChange={(e) => {
                  const sel = classes.find((c) => c.id === e.target.value);
                  setFormData({
                    ...formData,
                    classId: e.target.value,
                    className: sel ? sel.name : '',
                  });
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              >
                {classes.length === 0 ? (
                  <option value="">No classes configured — Create a class stream first</option>
                ) : (
                  classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} ({cls.stage}) — Room {cls.roomNumber}
                    </option>
                  ))
                )}
              </select>
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

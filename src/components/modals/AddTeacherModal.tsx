import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export const AddTeacherModal: React.FC = () => {
  const { isAddTeacherOpen, setIsAddTeacherOpen, addTeacher, classes } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    staffId: '',
    email: '',
    phone: '',
    qualification: 'B.Ed. Basic Education',
    isClassTeacherOf: '',
    status: 'Active' as 'Active' | 'On Leave',
    subjectsAssigned: ['General Science', 'Mathematics'],
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    addTeacher({
      fullName: formData.fullName.trim(),
      staffId: formData.staffId.trim() || undefined,
      email: formData.email.trim() || 'teacher@brightfuture.edu.gh',
      phone: formData.phone.trim() || '+233 24 000 0000',
      qualification: formData.qualification,
      isClassTeacherOf: formData.isClassTeacherOf || undefined,
      subjectsAssigned: formData.subjectsAssigned.length > 0 ? formData.subjectsAssigned : ['General Studies'],
      status: formData.status,
    });

    setIsAddTeacherOpen(false);
    // Reset form
    setFormData({
      fullName: '',
      staffId: '',
      email: '',
      phone: '',
      qualification: 'B.Ed. Basic Education',
      isClassTeacherOf: '',
      status: 'Active',
      subjectsAssigned: ['General Science', 'Mathematics'],
    });
  };

  return (
    <Modal
      isOpen={isAddTeacherOpen}
      onClose={() => setIsAddTeacherOpen(false)}
      title="Add New Academic Staff / Teacher"
      subtitle="Register teacher profile, class appointment, and subject specializations"
      maxWidth="2xl"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddTeacherOpen(false)}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Save & Appoint Teacher
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {/* Personal Details */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
            1. Staff Personal & Contact Details
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
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
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Staff ID (Leave blank to auto-generate)
              </label>
              <input
                type="text"
                value={formData.staffId}
                onChange={(e) =>
                  setFormData({ ...formData, staffId: e.target.value })
                }
                placeholder="e.g. STF-2025-015"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. e.osei@brightfuture.edu.gh"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Phone Number (Ghana)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+233 24 123 4567"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">
            2. Academic Qualification & Role
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Highest Qualification
              </label>
              <select
                value={formData.qualification}
                onChange={(e) =>
                  setFormData({ ...formData, qualification: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
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
              <label className="block text-slate-700 font-medium mb-1">
                Class Teacher Appointment
              </label>
              <select
                value={formData.isClassTeacherOf}
                onChange={(e) =>
                  setFormData({ ...formData, isClassTeacherOf: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
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
        <div>
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100">
            3. Subjects Assigned
          </h4>
          <p className="text-[11px] text-slate-500 mb-2">
            Select the subjects this teacher is scheduled to instruct:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableSubjects.map((subj) => {
              const checked = formData.subjectsAssigned.includes(subj);
              return (
                <label
                  key={subj}
                  className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                    checked
                      ? 'border-indigo-500 bg-indigo-50/50 text-indigo-950 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleSubjectToggle(subj)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{subj}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </Modal>
  );
};

import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { ClassRoom } from '../../types';
import {
  Save,
  Trash2,
  UserCheck,
  BookOpen,
  Layers,
  Check,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface ManageClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  classRoom: ClassRoom | null;
}

const KINDERGARTEN_SUBJECTS = [
  'Language and Literacy',
  'Early Numeracy & Mathematics',
  'Our World Our People',
  'Creative Arts & Colouring',
  'Ghanaian Language & Culture',
  'Physical Development & Health',
  'Rhymes, Songs & Storytelling',
  'Moral & Social Development',
];

const PRIMARY_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Natural Science',
  'Our World Our People',
  'Religious and Moral Education',
  'Ghanaian Language (Twi/Ga)',
  'Creative Arts & Design',
  'Computing',
  'French',
];

const JHS_SUBJECTS = [
  'English Language',
  'Mathematics',
  'Integrated Science',
  'Social Studies',
  'Religious and Moral Education',
  'Ghanaian Language (Twi/Ga)',
  'Career Technology',
  'Creative Arts & Design',
  'Computing',
  'French',
  'Physical Education',
];

export const ManageClassModal: React.FC<ManageClassModalProps> = ({
  isOpen,
  onClose,
  classRoom,
}) => {
  const { teachers, updateClass, deleteClass, assignTeacherToClass, setCurrentNav, setSelectedClassFilter } = useApp();

  const [name, setName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState(40);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (classRoom) {
      setName(classRoom.name);
      setRoomNumber(classRoom.roomNumber);
      setCapacity(classRoom.capacity);
      setSelectedTeacherId(classRoom.classTeacherId || '');
      setSubjects(classRoom.subjects || []);
      setShowDeleteConfirm(false);
    }
  }, [classRoom]);

  if (!classRoom) return null;

  const toggleSubject = (subj: string) => {
    if (subjects.includes(subj)) {
      setSubjects(subjects.filter((s) => s !== subj));
    } else {
      setSubjects([...subjects, subj]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Update class room details
    updateClass(classRoom.id, {
      name: name.trim(),
      roomNumber: roomNumber.trim() || classRoom.roomNumber,
      capacity: Number(capacity) || classRoom.capacity,
      subjects: subjects.length > 0 ? subjects : classRoom.subjects,
    });

    // If teacher assignment changed
    if (selectedTeacherId !== classRoom.classTeacherId) {
      assignTeacherToClass(classRoom.id, selectedTeacherId);
    }

    onClose();
  };

  const handleDelete = () => {
    deleteClass(classRoom.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleViewRoster = () => {
    setSelectedClassFilter(classRoom.name);
    setCurrentNav('students');
    onClose();
  };

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);
  const allCurriculumSubjects =
    classRoom.stage === 'Kindergarten'
      ? KINDERGARTEN_SUBJECTS
      : classRoom.stage === 'Primary'
      ? PRIMARY_SUBJECTS
      : JHS_SUBJECTS;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Manage Stream — ${classRoom.name}`}
      subtitle={`Configure classroom settings, subject allocation, and class teacher for ${classRoom.stage}`}
      maxWidth="2xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <div>
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Decommission Stream
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-rose-600 font-semibold">
                  Confirm remove?
                </span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-2 py-1 text-[11px] bg-rose-600 text-white rounded font-bold hover:bg-rose-700"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 text-[11px] border border-slate-200 text-slate-600 rounded hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" icon={Save} onClick={handleSave}>
              Save Stream Settings
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* Stream Banner Info */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{classRoom.name}</span>
              <Badge variant={classRoom.stage === 'JHS' ? 'navy' : classRoom.stage === 'Kindergarten' ? 'warning' : 'info'}>
                {classRoom.stage} Stage
              </Badge>
              <span className="font-mono text-slate-500 font-medium text-[11px]">
                Code: {classRoom.code}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Current Enrollment: <strong>{classRoom.studentCount}</strong> of <strong>{classRoom.capacity}</strong> students ({Math.round((classRoom.studentCount / (classRoom.capacity || 1)) * 100)}% capacity)
            </p>
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleViewRoster}
          >
            View Class Roster →
          </Button>
        </div>

        {/* 1. Identification & Room */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Stream Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Room / Block Location
            </label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Max Student Capacity
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            />
          </div>
        </div>

        {/* 2. Class Teacher Appointment */}
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                Appointed Class Teacher
              </label>
              <p className="text-[11px] text-slate-500">
                Staff member in charge of continuous assessments, attendance, and parent remarks
              </p>
            </div>
            <UserCheck className="w-4 h-4 text-slate-500" />
          </div>

          <select
            value={selectedTeacherId}
            onChange={(e) => setSelectedTeacherId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
          >
            <option value="">— Unassigned (No Class Teacher) —</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.fullName} ({t.staffId}) {t.isClassTeacherOf ? `— Current: ${t.isClassTeacherOf}` : ''}
              </option>
            ))}
          </select>

          {selectedTeacher && (
            <div className="bg-white p-3 rounded-lg border border-indigo-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  {selectedTeacher.fullName} ({selectedTeacher.staffId})
                </span>
                <Badge variant="navy">Appointed Class Teacher</Badge>
              </div>
              <p className="text-[11px] text-slate-600">
                Qualification: {selectedTeacher.qualification} • Phone: {selectedTeacher.phone}
              </p>
            </div>
          )}
        </div>

        {/* 3. Curriculum Subjects Allocation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="block text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                Curriculum Subjects ({subjects.length} Enabled)
              </label>
              <p className="text-[11px] text-slate-500">
                Select subjects taught in this stream under Ghana NaCCA curriculum
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => setSubjects([...allCurriculumSubjects])}
                className="text-indigo-600 hover:underline font-medium"
              >
                Enable All
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => setSubjects([])}
                className="text-slate-500 hover:underline font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-lg bg-slate-50/40">
            {allCurriculumSubjects.map((subj) => {
              const isChecked = subjects.includes(subj);
              return (
                <label
                  key={subj}
                  className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors text-[11px] ${
                    isChecked
                      ? 'border-indigo-400 bg-indigo-50/70 text-indigo-950 font-medium'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSubject(subj)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="truncate">{subj}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </Modal>
  );
};

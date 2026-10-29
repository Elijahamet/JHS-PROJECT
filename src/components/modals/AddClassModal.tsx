import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { AcademicStage } from '../../types';
import { School, UserCheck, BookOpen, Layers, Check, AlertCircle } from 'lucide-react';

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

export const AddClassModal: React.FC = () => {
  const { isAddClassOpen, setIsAddClassOpen, addClass, teachers } = useApp();

  const [stage, setStage] = useState<AcademicStage>('Kindergarten');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState<number>(25);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(KINDERGARTEN_SUBJECTS);
  const [error, setError] = useState('');

  // Handle stage change
  const handleStageChange = (newStage: AcademicStage) => {
    setStage(newStage);
    if (newStage === 'Kindergarten') {
      setSelectedSubjects(KINDERGARTEN_SUBJECTS);
      setCapacity(25);
    } else if (newStage === 'Primary') {
      setSelectedSubjects(PRIMARY_SUBJECTS);
      setCapacity(35);
    } else {
      setSelectedSubjects(JHS_SUBJECTS);
      setCapacity(40);
    }
  };

  // Quick name preset suggestions
  const quickPresets =
    stage === 'Kindergarten'
      ? ['KG 1A', 'KG 1B', 'KG 2A', 'KG 2B', 'Nursery 1', 'Nursery 2', 'Crèche']
      : stage === 'Primary'
      ? ['Basic 1B', 'Basic 2B', 'Basic 3B', 'Basic 4B', 'Basic 5B', 'Basic 6B']
      : ['JHS 1B', 'JHS 2B', 'JHS 3B', 'JHS 1 Gold', 'JHS 2 Gold', 'JHS 3 Gold'];

  const handleSelectPreset = (presetName: string) => {
    setName(presetName);
    setCode(presetName.replace(/\s+/g, '').toUpperCase());
    setError('');
  };

  const handleNameChange = (val: string) => {
    setName(val);
    setCode(val.replace(/\s+/g, '').toUpperCase());
    if (error) setError('');
  };

  const toggleSubject = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subj));
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const handleSelectAllSubjects = () => {
    setSelectedSubjects(
      stage === 'Kindergarten'
        ? [...KINDERGARTEN_SUBJECTS]
        : stage === 'Primary'
        ? [...PRIMARY_SUBJECTS]
        : [...JHS_SUBJECTS]
    );
  };

  const handleDeselectAllSubjects = () => {
    setSelectedSubjects([]);
  };

  const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a class stream name (e.g. KG 1A, Basic 3B, or JHS 1A).');
      return;
    }

    addClass(
      {
        name: name.trim(),
        code: code.trim() || name.replace(/\s+/g, '').toUpperCase(),
        stage,
        roomNumber: roomNumber.trim() || (stage === 'Kindergarten' ? 'KG Department - Room 1' : 'Main Academic Block'),
        capacity: Number(capacity) || (stage === 'Kindergarten' ? 25 : 40),
        subjects:
          selectedSubjects.length > 0
            ? selectedSubjects
            : stage === 'Kindergarten'
            ? KINDERGARTEN_SUBJECTS
            : stage === 'JHS'
            ? JHS_SUBJECTS
            : PRIMARY_SUBJECTS,
      },
      selectedTeacherId || undefined
    );

    // Reset and close
    setName('');
    setCode('');
    setRoomNumber('');
    setSelectedTeacherId('');
    setError('');
    setIsAddClassOpen(false);
  };

  return (
    <Modal
      isOpen={isAddClassOpen}
      onClose={() => {
        setIsAddClassOpen(false);
        setError('');
      }}
      title="Create New Class Stream"
      subtitle="Establish a new academic stream, assign classroom capacity, and appoint a class teacher"
      maxWidth="2xl"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsAddClassOpen(false);
              setError('');
            }}
          >
            Cancel
          </Button>
          <Button size="sm" variant="primary" icon={Check} onClick={handleSubmit}>
            Create Stream & Assign Teacher
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        {error && (
          <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Stage Selection */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5 uppercase tracking-wider text-[11px]">
            1. Academic Stage
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleStageChange('Kindergarten')}
              className={`p-3 rounded-xl border text-left transition-all ${
                stage === 'Kindergarten'
                  ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Kindergarten (KG)</span>
                {stage === 'Kindergarten' && <Check className="w-4 h-4 text-amber-600" />}
              </div>
              <p className="text-[11px] text-slate-500">KG 1 & KG 2 / Nursery (Early Childhood)</p>
            </button>

            <button
              type="button"
              onClick={() => handleStageChange('Primary')}
              className={`p-3 rounded-xl border text-left transition-all ${
                stage === 'Primary'
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-600/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Primary Stage</span>
                {stage === 'Primary' && <Check className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-[11px] text-slate-500">Basic 1 to Basic 6 (Foundational curriculum)</p>
            </button>

            <button
              type="button"
              onClick={() => handleStageChange('JHS')}
              className={`p-3 rounded-xl border text-left transition-all ${
                stage === 'JHS'
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-2 ring-indigo-600/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm">Junior High (JHS)</span>
                {stage === 'JHS' && <Check className="w-4 h-4 text-indigo-600" />}
              </div>
              <p className="text-[11px] text-slate-500">JHS 1 to JHS 3 (BECE preparation tracks)</p>
            </button>
          </div>
        </div>

        {/* 2. Stream Identity & Location */}
        <div>
          <label className="block text-slate-700 font-semibold mb-2 uppercase tracking-wider text-[11px]">
            2. Stream Identification & Physical Location
          </label>

          {/* Quick presets */}
          <div className="mb-3">
            <span className="text-[11px] text-slate-500 block mb-1">Quick Name Suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                    name === preset
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Class / Stream Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder={stage === 'Kindergarten' ? 'e.g. KG 1A, KG 2 Blue, Nursery 1' : stage === 'JHS' ? 'e.g. JHS 1B, JHS 2 Gold' : 'e.g. Basic 1B, Basic 3 Red'}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Stream Code / Short Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. JHS1B or B3B"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Room / Block Location</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. Block C - Room 304"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Max Student Capacity</label>
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
        </div>

        {/* 3. Class Teacher Appointment (Key Requirement!) */}
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/90 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-slate-900 font-bold uppercase tracking-wider text-[11px]">
                3. Appoint Class Teacher
              </label>
              <p className="text-[11px] text-slate-500">
                Designate an academic staff member as head teacher for this stream
              </p>
            </div>
            <UserCheck className="w-4 h-4 text-slate-500" />
          </div>

          <div>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
            >
              <option value="">— Unassigned (Assign Later) —</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.fullName} ({t.staffId}) {t.isClassTeacherOf ? `— Currently: ${t.isClassTeacherOf}` : '— (No Stream Assigned)'}
                </option>
              ))}
            </select>
          </div>

          {selectedTeacher ? (
            <div className="bg-white p-3 rounded-lg border border-indigo-200/80 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 text-xs">{selectedTeacher.fullName}</span>
                  <span className="text-[11px] text-slate-500 ml-2">ID: {selectedTeacher.staffId}</span>
                </div>
                <Badge variant="navy">Selected Class Teacher</Badge>
              </div>

              <div className="text-[11px] text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                <span><strong>Qualification:</strong> {selectedTeacher.qualification}</span>
                <span><strong>Phone:</strong> {selectedTeacher.phone}</span>
                <span><strong>Status:</strong> {selectedTeacher.status}</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-indigo-700">
                <UserCheck className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                <span>
                  {selectedTeacher.fullName} will be officially appointed to manage daily attendance, student remarks, and terminal reports for <strong>{name || 'this new stream'}</strong>.
                </span>
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
              Notice: Leaving this unassigned allows you to establish the stream immediately and assign a teacher later from the class roster cards.
            </p>
          )}
        </div>

        {/* 4. Curriculum Subjects Allocation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <label className="block text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                4. Curriculum Subjects ({selectedSubjects.length} Assigned)
              </label>
              <p className="text-[11px] text-slate-500">
                Ghana NaCCA syllabus subjects enabled for this class stream
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={handleSelectAllSubjects}
                className="text-indigo-600 hover:underline font-medium"
              >
                Select All
              </button>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={handleDeselectAllSubjects}
                className="text-slate-500 hover:underline font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-lg bg-slate-50/40">
            {(stage === 'Kindergarten'
              ? KINDERGARTEN_SUBJECTS
              : stage === 'Primary'
              ? PRIMARY_SUBJECTS
              : JHS_SUBJECTS
            ).map((subj) => {
              const isChecked = selectedSubjects.includes(subj);
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

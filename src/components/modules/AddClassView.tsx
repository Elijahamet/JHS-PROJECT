import React, { useState } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { AcademicStage } from '../../types';
import { School, BookOpen, Layers, Check, AlertCircle } from 'lucide-react';

interface AddClassViewProps {
  onBack: () => void;
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

export const AddClassView: React.FC<AddClassViewProps> = ({ onBack }) => {
  const {
    addClass,
    teachers,
    setIsAddClassOpen,
    classDraft,
    setClassDraft,
    clearClassDraft,
    hasClassDraft,
  } = useApp();

  const stage = classDraft.stage;
  const name = classDraft.name;
  const code = classDraft.code;
  const roomNumber = classDraft.roomNumber;
  const capacity = classDraft.capacity;
  const selectedTeacherId = classDraft.selectedTeacherId;
  const selectedSubjects = classDraft.selectedSubjects;
  const tuitionFee = classDraft.tuitionFee ?? 0;
  const busFee = classDraft.busFee ?? 0;
  const feedingFee = classDraft.feedingFee ?? 0;
  const totalTermFee = (Number(tuitionFee) || 0) + (Number(busFee) || 0) + (Number(feedingFee) || 0);

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setRoomNumber = (val: string) => setClassDraft((prev) => ({ ...prev, roomNumber: val }));
  const setCapacity = (val: number) => setClassDraft((prev) => ({ ...prev, capacity: val }));
  const setTuitionFee = (val: number) => setClassDraft((prev) => ({
    ...prev,
    tuitionFee: val,
    termFee: val + (prev.busFee || 0) + (prev.feedingFee || 0),
  }));
  const setBusFee = (val: number) => setClassDraft((prev) => ({
    ...prev,
    busFee: val,
    termFee: (prev.tuitionFee || 0) + val + (prev.feedingFee || 0),
  }));
  const setFeedingFee = (val: number) => setClassDraft((prev) => ({
    ...prev,
    feedingFee: val,
    termFee: (prev.tuitionFee || 0) + (prev.busFee || 0) + val,
  }));
  const setSelectedTeacherId = (val: string) => setClassDraft((prev) => ({ ...prev, selectedTeacherId: val }));

  const handleStageChange = (newStage: AcademicStage) => {
    let newSubjects = classDraft.selectedSubjects;
    let newCapacity = classDraft.capacity;
    if (newStage === 'Kindergarten') {
      newSubjects = KINDERGARTEN_SUBJECTS;
      newCapacity = 25;
    } else if (newStage === 'Primary') {
      newSubjects = PRIMARY_SUBJECTS;
      newCapacity = 35;
    } else {
      newSubjects = JHS_SUBJECTS;
      newCapacity = 40;
    }
    setClassDraft((prev) => ({
      ...prev,
      stage: newStage,
      selectedSubjects: newSubjects,
      capacity: newCapacity,
    }));
  };

  const quickPresets =
    stage === 'Kindergarten'
      ? ['KG 1A', 'KG 1B', 'KG 2A', 'KG 2B', 'Nursery 1', 'Nursery 2', 'Crèche']
      : stage === 'Primary'
      ? ['Basic 1B', 'Basic 2B', 'Basic 3B', 'Basic 4B', 'Basic 5B', 'Basic 6B']
      : ['JHS 1B', 'JHS 2B', 'JHS 3B', 'JHS 1 Gold', 'JHS 2 Gold', 'JHS 3 Gold'];

  const handleSelectPreset = (presetName: string) => {
    setClassDraft((prev) => ({
      ...prev,
      name: presetName,
      code: presetName.replace(/\s+/g, '').toUpperCase(),
    }));
    setError('');
  };

  const handleNameChange = (val: string) => {
    setClassDraft((prev) => ({
      ...prev,
      name: val,
      code: val.replace(/\s+/g, '').toUpperCase(),
    }));
    if (error) setError('');
  };

  const toggleSubject = (subj: string) => {
    setClassDraft((prev) => ({
      ...prev,
      selectedSubjects: prev.selectedSubjects.includes(subj)
        ? prev.selectedSubjects.filter((s) => s !== subj)
        : [...prev.selectedSubjects, subj],
    }));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a class name or select one of the suggested presets.');
      return;
    }

    setIsSubmitting(true);

    try {
      addClass(
        {
          name: name.trim(),
          code: code.trim() || name.trim().replace(/\s+/g, '').toUpperCase(),
          stage,
          roomNumber: roomNumber.trim() || `R-${Math.floor(10 + Math.random() * 89)}`,
          capacity: Number(capacity) || 35,
          subjects: selectedSubjects,
          tuitionFee: Number(tuitionFee) || 0,
          busFee: Number(busFee) || 0,
          feedingFee: Number(feedingFee) || 0,
          termFee: totalTermFee,
        },
        selectedTeacherId || undefined
      );

      setIsAddClassOpen(false);
      onBack();
    } catch (err) {
      setError('Error creating class stream.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Create New Academic Class / Stream"
      subtitle="Establish a new grade level, configure room capacity, assign class teacher, and provision GES curriculum subjects"
      icon={School}
      iconBg="from-emerald-600 via-teal-600 to-teal-700"
      badgeText="Curriculum Builder"
      badgeVariant="success"
      onBack={onBack}
      backLabel="Back to Classes"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'Classes & Streams', onClick: onBack },
        { label: 'Create New Class' },
      ]}
      footerSubmitLabel="Create & Provision Class"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
      actions={
        <div className="flex items-center gap-2">
          {hasClassDraft && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Draft Auto-Saved</span>
            </span>
          )}
          {hasClassDraft && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to discard this class stream draft?')) {
                  clearClassDraft();
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
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span className="font-semibold text-xs">{error}</span>
          </div>
        )}

        {/* 1. Academic Stage */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Select Ghanaian Academic Stage
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'Kindergarten' as AcademicStage, label: 'Kindergarten & Nursery', sub: 'Early Childhood Development' },
              { id: 'Primary' as AcademicStage, label: 'Primary School', sub: 'Basic 1 through Basic 6' },
              { id: 'JHS' as AcademicStage, label: 'Junior High School (JHS)', sub: 'JHS 1 through JHS 3 (BECE)' },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => handleStageChange(st.id)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  stage === st.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 text-xs">{st.label}</span>
                  {stage === st.id && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-[11px] text-slate-500">{st.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Class Identity & Presets */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Class Name & Room Particulars
            </h3>
          </div>

          <div className="space-y-2">
            <label className="block text-slate-700 font-semibold text-[11px] uppercase tracking-wider">
              Quick Suggestions for {stage}:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {quickPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    name === preset
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Class / Stream Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Basic 1A or JHS 1 Gold"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-xs bg-slate-50/50 hover:bg-white font-semibold"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Room / Block Number
              </label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. Room 12 (Block B)"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Maximum Student Capacity
              </label>
              <input
                type="number"
                min="5"
                max="80"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Assigned Class Teacher
              </label>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all text-xs bg-white"
              >
                <option value="">-- Assign Later --</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName} ({t.qualification})
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-slate-100">
              <label className="block text-slate-800 font-bold mb-1 flex items-center justify-between">
                <span>Fee Distribution & Pricing (GH₵)</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Auto-Summed Total
                </span>
              </label>
              <p className="text-[11px] text-slate-500 mb-3">
                Distribute class charges into School Fees, Bus Fee, and Feeding Fees. The total is calculated automatically.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-1">
                  <label className="block text-[11px] font-bold text-blue-900">
                    School Fees (Tuition)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-[11px] font-bold text-slate-400">
                      GH₵
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={tuitionFee === 0 ? '' : tuitionFee}
                      onChange={(e) => setTuitionFee(e.target.value === '' ? 0 : Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-9 pr-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100 space-y-1">
                  <label className="block text-[11px] font-bold text-amber-900">
                    Bus Fee (Transport)
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-[11px] font-bold text-slate-400">
                      GH₵
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="20"
                      value={busFee === 0 ? '' : busFee}
                      onChange={(e) => setBusFee(e.target.value === '' ? 0 : Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-9 pr-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-1">
                  <label className="block text-[11px] font-bold text-emerald-900">
                    Feeding Fees
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-[11px] font-bold text-slate-400">
                      GH₵
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="20"
                      value={feedingFee === 0 ? '' : feedingFee}
                      onChange={(e) => setFeedingFee(e.target.value === '' ? 0 : Number(e.target.value))}
                      placeholder="0"
                      className="w-full pl-9 pr-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Live Auto-Calculated Total Card */}
              <div className="mt-3 p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Calculated Total Class Term Fee
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Sum of Tuition (GH₵ {Number(tuitionFee) || 0}) + Bus (GH₵ {Number(busFee) || 0}) + Feeding (GH₵ {Number(feedingFee) || 0})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-400 font-mono">
                    GH₵ {totalTermFee.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400 block">per pupil</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Curriculum Subjects */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Curriculum Subjects Provisioned ({selectedSubjects.length} subjects)
              </h3>
              <p className="text-[11px] text-slate-500">
                Subjects automatically aligned with the standard GES curriculum for {stage}:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {(stage === 'Kindergarten'
              ? KINDERGARTEN_SUBJECTS
              : stage === 'Primary'
              ? PRIMARY_SUBJECTS
              : JHS_SUBJECTS
            ).map((subj) => {
              const checked = selectedSubjects.includes(subj);
              return (
                <label
                  key={subj}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSubject(subj)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
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

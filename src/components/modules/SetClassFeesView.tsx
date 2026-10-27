import React, { useState, useEffect } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { ClassRoom } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Coins,
  GraduationCap,
  Bus,
  UtensilsCrossed,
  Layers,
  Calculator,
  CheckCircle2,
  AlertCircle,
  Copy,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface SetClassFeesViewProps {
  onBack: () => void;
}

export const SetClassFeesView: React.FC<SetClassFeesViewProps> = ({ onBack }) => {
  const {
    classes,
    students,
    selectedClassForFeeConfig,
    setSelectedClassForFeeConfig,
    updateClassFee,
    getClassFeeBreakdown,
  } = useApp();

  // Selected target class
  const [selectedClassId, setSelectedClassId] = useState<string>(() => {
    if (selectedClassForFeeConfig) return selectedClassForFeeConfig.id;
    return classes.length > 0 ? classes[0].id : '';
  });

  const targetClass: ClassRoom | undefined = classes.find(
    (c) => c.id === selectedClassId
  ) || classes[0];

  // Distributed fee state
  const [tuitionFee, setTuitionFee] = useState<string>('0');
  const [busFee, setBusFee] = useState<string>('0');
  const [feedingFee, setFeedingFee] = useState<string>('0');
  const [applyToEnrolled, setApplyToEnrolled] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Load existing fees whenever selected class changes
  useEffect(() => {
    if (targetClass) {
      const breakdown = getClassFeeBreakdown(targetClass.id);
      setTuitionFee(String(breakdown.tuitionFee || 0));
      setBusFee(String(breakdown.busFee || 0));
      setFeedingFee(String(breakdown.feedingFee || 0));
      setSaveSuccess(false);
    }
  }, [targetClass?.id]);

  // Numeric parsing
  const numTuition = Math.max(0, parseFloat(tuitionFee) || 0);
  const numBus = Math.max(0, parseFloat(busFee) || 0);
  const numFeeding = Math.max(0, parseFloat(feedingFee) || 0);

  // Live auto-calculated total term fee
  const totalClassFee = numTuition + numBus + numFeeding;

  // Percentage distribution calculations
  const tuitionPct = totalClassFee > 0 ? Math.round((numTuition / totalClassFee) * 100) : 0;
  const busPct = totalClassFee > 0 ? Math.round((numBus / totalClassFee) * 100) : 0;
  const feedingPct = totalClassFee > 0 ? Math.max(0, 100 - tuitionPct - busPct) : 0;

  // Enrolled student stats for target class
  const classStudents = students.filter(
    (s) =>
      s.classId === targetClass?.id ||
      (targetClass && s.className.toLowerCase().trim() === targetClass.name.toLowerCase().trim())
  );
  const enrolledCount = Math.max(targetClass?.studentCount || 0, classStudents.length);

  // Revenue projections
  const projectedTuitionRevenue = numTuition * enrolledCount;
  const projectedBusRevenue = numBus * enrolledCount;
  const projectedFeedingRevenue = numFeeding * enrolledCount;
  const projectedTotalRevenue = totalClassFee * enrolledCount;

  // Handle class selection change
  const handleClassChange = (classId: string) => {
    setSelectedClassId(classId);
    const chosen = classes.find((c) => c.id === classId);
    if (chosen) {
      setSelectedClassForFeeConfig(chosen);
    }
  };

  // Quick preset loader (e.g. Standard Ghanaian recommendations)
  const applyPresetFees = (tuition: number, bus: number, feeding: number) => {
    setTuitionFee(String(tuition));
    setBusFee(String(bus));
    setFeedingFee(String(feeding));
    setSaveSuccess(false);
  };

  // Copy breakdown to all classes in the same stage (e.g. all Primary or all JHS)
  const handleApplyToStage = () => {
    if (!targetClass) return;
    const sameStageClasses = classes.filter((c) => c.stage === targetClass.stage);
    const confirmed = window.confirm(
      `Apply this exact fee breakdown (Tuition: GH₵ ${numTuition}, Bus: GH₵ ${numBus}, Feeding: GH₵ ${numFeeding} — Total: GH₵ ${totalClassFee}) to all ${sameStageClasses.length} classes in ${targetClass.stage} Stage?`
    );
    if (!confirmed) return;

    sameStageClasses.forEach((cls) => {
      updateClassFee(
        cls.id,
        {
          tuitionFee: numTuition,
          busFee: numBus,
          feedingFee: numFeeding,
        },
        applyToEnrolled
      );
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetClass) return;

    setIsSubmitting(true);

    // Save distributed breakdown to AppContext
    updateClassFee(
      targetClass.id,
      {
        tuitionFee: numTuition,
        busFee: numBus,
        feedingFee: numFeeding,
      },
      applyToEnrolled
    );

    setIsSubmitting(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  if (classes.length === 0) {
    return (
      <FormPageLayout
        title="Configure Class Fee Schedule"
        subtitle="Set and distribute term tuition, bus, and feeding fees per academic stream"
        icon={Coins}
        iconBg="from-emerald-600 to-teal-600"
        onBack={onBack}
        backLabel="Back to Fees"
        maxWidth="max-w-4xl"
      >
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-600">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            No Classes Configured Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
            Before setting distributed fees, create at least one class stream or initialize standard Ghanaian curriculum classes.
          </p>
          <Button variant="primary" onClick={onBack}>
            Return to Dashboard
          </Button>
        </div>
      </FormPageLayout>
    );
  }

  return (
    <FormPageLayout
      title="Configure Class Fee Schedule"
      subtitle="Set and distribute term fees into School Fees, Bus Fee, and Feeding Fees with live auto-summation"
      icon={Coins}
      iconBg="from-emerald-600 to-teal-600"
      badgeText="State-Based Workflow"
      badgeVariant="success"
      onBack={onBack}
      backLabel="Back to School Fees"
      breadcrumbs={[
        { label: 'Financial Management' },
        { label: 'School Fees', onClick: onBack },
        { label: `Set Fees — ${targetClass?.name || 'Class'}` },
      ]}
      footerSubmitLabel={isSubmitting ? 'Saving Fee Breakdown...' : `Save Fee Schedule for ${targetClass?.name || 'Class'}`}
      footerSubmitIcon={CheckCircle2}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-5xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="text-xs text-emerald-900 flex-1">
              <span className="font-bold">Fee breakdown saved successfully! </span>
              {targetClass?.name} fee schedule updated: School Fees:{' '}
              <strong>{formatCurrency(numTuition)}</strong>, Bus Fee:{' '}
              <strong>{formatCurrency(numBus)}</strong>, Feeding Fee:{' '}
              <strong>{formatCurrency(numFeeding)}</strong>. Total:{' '}
              <strong>{formatCurrency(totalClassFee)}</strong>
              {applyToEnrolled && ' (applied to all currently enrolled pupils)'}.
            </div>
          </div>
        )}

        {/* 1. Class Selector & Stream Details */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                1
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Select Class / Academic Stream
                </h3>
                <p className="text-[11px] text-slate-500">
                  Switch between classes to set or adjust individual fee schedules
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="class-select" className="text-xs font-semibold text-slate-600">
                Active Class:
              </label>
              <select
                id="class-select"
                value={selectedClassId}
                onChange={(e) => handleClassChange(e.target.value)}
                className="px-3 py-1.5 border border-emerald-300 rounded-lg text-xs bg-emerald-50/50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} ({cls.stage}) — Term Fee: {formatCurrency(cls.termFee || 0)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Details of Selected Class */}
          {targetClass && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">Stream Name</span>
                <span className="font-bold text-slate-900">{targetClass.name}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Academic Stage</span>
                <Badge
                  variant={
                    targetClass.stage === 'JHS'
                      ? 'navy'
                      : targetClass.stage === 'Kindergarten'
                      ? 'warning'
                      : 'info'
                  }
                >
                  {targetClass.stage}
                </Badge>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Class Teacher</span>
                <span className="font-semibold text-slate-800">
                  {targetClass.classTeacherName || 'Unassigned'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Enrolled Students</span>
                <span className="font-bold text-emerald-800">
                  {enrolledCount} of {targetClass.capacity} pupils
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 2. Three Distributed Fee Component Inputs */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                2
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Fee Distribution Breakdown (GH₵)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Distribute the total term fee into School Fees, Bus Fee, and Feeding Fees
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-400">Sample Presets:</span>
              <button
                type="button"
                onClick={() => applyPresetFees(1200, 350, 450)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
              >
                Standard (2,000)
              </button>
              <button
                type="button"
                onClick={() => applyPresetFees(1600, 400, 600)}
                className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
              >
                Full Service (2,600)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Component 1: School Fees (Tuition) */}
            <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-b from-blue-50/40 to-white space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  Component 1
                </span>
              </div>

              <div>
                <label
                  htmlFor="tuition-fee"
                  className="block text-xs font-bold text-slate-900 mb-0.5"
                >
                  School Fees (Tuition)
                </label>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Academic instruction, curriculum materials, exams, and school development
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                  GH₵
                </span>
                <input
                  id="tuition-fee"
                  type="number"
                  min="0"
                  step="10"
                  value={tuitionFee}
                  onChange={(e) => {
                    setTuitionFee(e.target.value);
                    setSaveSuccess(false);
                  }}
                  placeholder="0.00"
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="text-[11px] text-blue-700 font-semibold flex items-center justify-between pt-1 border-t border-blue-100">
                <span>Tuition Share:</span>
                <span>{tuitionPct}% of Total</span>
              </div>
            </div>

            {/* Component 2: Bus Fee (Transport) */}
            <div className="p-4 rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50/40 to-white space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                  Component 2
                </span>
              </div>

              <div>
                <label
                  htmlFor="bus-fee"
                  className="block text-xs font-bold text-slate-900 mb-0.5"
                >
                  Bus Fee (Transport)
                </label>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Daily shuttle service, fuel, route maintenance, and fleet logistics
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                  GH₵
                </span>
                <input
                  id="bus-fee"
                  type="number"
                  min="0"
                  step="10"
                  value={busFee}
                  onChange={(e) => {
                    setBusFee(e.target.value);
                    setSaveSuccess(false);
                  }}
                  placeholder="0.00"
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="text-[11px] text-amber-700 font-semibold flex items-center justify-between pt-1 border-t border-amber-100">
                <span>Bus Share:</span>
                <span>{busPct}% of Total</span>
              </div>
            </div>

            {/* Component 3: Feeding Fees */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-b from-emerald-50/40 to-white space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  Component 3
                </span>
              </div>

              <div>
                <label
                  htmlFor="feeding-fee"
                  className="block text-xs font-bold text-slate-900 mb-0.5"
                >
                  Feeding Fees (Dietary)
                </label>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Hot nutritious mid-day meals, fruit, and snacks throughout the term
                </p>
              </div>

              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">
                  GH₵
                </span>
                <input
                  id="feeding-fee"
                  type="number"
                  min="0"
                  step="10"
                  value={feedingFee}
                  onChange={(e) => {
                    setFeedingFee(e.target.value);
                    setSaveSuccess(false);
                  }}
                  placeholder="0.00"
                  className="w-full pl-12 pr-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="text-[11px] text-emerald-700 font-semibold flex items-center justify-between pt-1 border-t border-emerald-100">
                <span>Feeding Share:</span>
                <span>{feedingPct}% of Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Real-Time Auto-Calculated Total & Revenue Projections */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold tracking-tight">
                  Total Term Fee for {targetClass?.name || 'Class'}
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Automatically calculated sum: School Fees + Bus Fee + Feeding Fees
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold block">
                Total Class Fee
              </span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
                {formatCurrency(totalClassFee)}
              </span>
              <span className="text-[10px] text-slate-400 block">per pupil / term</span>
            </div>
          </div>

          {/* Proportional Distribution Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">
                Proportional Fee Breakdown:
              </span>
              <span className="font-mono text-slate-300">
                {formatCurrency(numTuition)} (Tuition) + {formatCurrency(numBus)} (Bus) +{' '}
                {formatCurrency(numFeeding)} (Feeding)
              </span>
            </div>

            <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${tuitionPct}%` }}
                className="bg-blue-500 h-full transition-all duration-300"
                title={`School Fees: ${tuitionPct}% (${formatCurrency(numTuition)})`}
              />
              <div
                style={{ width: `${busPct}%` }}
                className="bg-amber-500 h-full transition-all duration-300"
                title={`Bus Fee: ${busPct}% (${formatCurrency(numBus)})`}
              />
              <div
                style={{ width: `${feedingPct}%` }}
                className="bg-emerald-500 h-full transition-all duration-300"
                title={`Feeding Fees: ${feedingPct}% (${formatCurrency(numFeeding)})`}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                School Fees: <strong>{formatCurrency(numTuition)}</strong> ({tuitionPct}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Bus Fee: <strong>{formatCurrency(numBus)}</strong> ({busPct}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Feeding Fees: <strong>{formatCurrency(numFeeding)}</strong> ({feedingPct}%)
              </span>
            </div>
          </div>

          {/* Revenue Projection Summary Grid */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-300 uppercase block">Enrolled Roster</span>
              <p className="text-lg font-bold text-white mt-0.5">{enrolledCount} Pupils</p>
              <span className="text-[10px] text-slate-400">Class capacity: {targetClass?.capacity}</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] text-blue-300 uppercase block">Projected Tuition</span>
              <p className="text-lg font-bold text-blue-300 mt-0.5">{formatCurrency(projectedTuitionRevenue)}</p>
              <span className="text-[10px] text-slate-400">Instructional budget</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[10px] text-amber-300 uppercase block">Projected Bus</span>
              <p className="text-lg font-bold text-amber-300 mt-0.5">{formatCurrency(projectedBusRevenue)}</p>
              <span className="text-[10px] text-slate-400">Fleet & fuel fund</span>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-400/30">
              <span className="text-[10px] text-emerald-300 uppercase block">Total Class Budget</span>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">{formatCurrency(projectedTotalRevenue)}</p>
              <span className="text-[10px] text-emerald-200">Full term collection</span>
            </div>
          </div>
        </div>

        {/* 4. Enrollment Synchronization & Stage Application Options */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Enrollment Synchronization & Stage Propagation
              </h3>
              <p className="text-[11px] text-slate-500">
                Choose how these updated fees apply to enrolled students and other classes
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={applyToEnrolled}
                onChange={(e) => setApplyToEnrolled(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 mt-0.5"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">
                  Apply fee schedule to all currently enrolled pupils in {targetClass?.name} ({enrolledCount} students)
                </span>
                <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                  Automatically recalculates every student&apos;s tuition and feeding balance in this class. Any payments already made by parents will remain credited against the new total.
                </p>
              </div>
            </label>

            {targetClass && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">
                    Copy breakdown to all {targetClass.stage} classes
                  </span>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Fast-track configuration by applying these same fees (Tuition: {formatCurrency(numTuition)}, Bus: {formatCurrency(numBus)}, Feeding: {formatCurrency(numFeeding)}) across all streams in {targetClass.stage}.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  icon={Copy}
                  onClick={handleApplyToStage}
                >
                  Apply to All {targetClass.stage} Streams
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 5. Complete Classes Matrix (All streams at a glance) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Class Fee Schedules Directory ({classes.length} Streams)
              </h3>
              <p className="text-[11px] text-slate-500">
                Review and switch to any class stream to configure its distributed fees
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 font-semibold">Class Stream</th>
                  <th className="py-2.5 px-3 font-semibold">Stage</th>
                  <th className="py-2.5 px-3 font-semibold text-right">School Fees</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Bus Fee</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Feeding Fee</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total Term Fee</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Pupils</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classes.map((cls) => {
                  const breakdown = getClassFeeBreakdown(cls.id);
                  const isCurrent = cls.id === targetClass?.id;
                  const pupilCount = students.filter(
                    (s) => s.classId === cls.id || s.className === cls.name
                  ).length;

                  return (
                    <tr
                      key={cls.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isCurrent ? 'bg-emerald-50/40 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900">{cls.name}</span>
                        {isCurrent && (
                          <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded font-semibold">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            cls.stage === 'JHS'
                              ? 'navy'
                              : cls.stage === 'Kindergarten'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {cls.stage}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-800">
                        {breakdown.tuitionFee > 0 ? formatCurrency(breakdown.tuitionFee) : '—'}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-800">
                        {breakdown.busFee > 0 ? formatCurrency(breakdown.busFee) : '—'}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-slate-800">
                        {breakdown.feedingFee > 0 ? formatCurrency(breakdown.feedingFee) : '—'}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                        {breakdown.totalFee > 0 ? (
                          <span className="text-emerald-700">{formatCurrency(breakdown.totalFee)}</span>
                        ) : (
                          <span className="text-amber-600 italic font-normal">Not Set</span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600">
                        {pupilCount}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {isCurrent ? (
                          <span className="text-[11px] text-emerald-700 font-bold">
                            Editing
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleClassChange(cls.id)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Configure</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

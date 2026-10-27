import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Receipt,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Coins,
  GraduationCap,
  Sparkles,
  X,
  School,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ClassRoom, FeeStructureItem } from '../../types';

export const SchoolFeesView: React.FC = () => {
  const {
    students,
    classes,
    feeStructures,
    updateFeeStructureItem,
    addFeeStructureItem,
    deleteFeeStructureItem,
    getClassFee,
    getClassFeeBreakdown,
    updateClassFee,
    openSetClassFees,
    payments,
    setIsRecordPaymentOpen,
    setSelectedStudentId,
    setCurrentNav,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBalance, setFilterBalance] = useState<'ALL' | 'OWING' | 'CLEARED'>('ALL');

  // Edit Class Fee State
  const [editingClass, setEditingClass] = useState<ClassRoom | null>(null);
  const [editFeeAmount, setEditFeeAmount] = useState<string>('');
  const [applyToEnrolled, setApplyToEnrolled] = useState<boolean>(true);

  // Create Fee Structure Item State
  const [isAddFeeModalOpen, setIsAddFeeModalOpen] = useState(false);
  const [newFeeName, setNewFeeName] = useState('');
  const [newFeeCategory, setNewFeeCategory] = useState<FeeStructureItem['category']>('School Fees');
  const [newFeeApplicableClass, setNewFeeApplicableClass] = useState('All');
  const [newFeeAmount, setNewFeeAmount] = useState('');
  const [newFeeDueDate, setNewFeeDueDate] = useState('2025-02-15');

  // Calculation of financial figures based on actual student billings
  const totalCollected = payments
    .filter((p) => p.category === 'School Fees')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOutstanding = students.reduce(
    (sum, s) => sum + (s.schoolFeeBalance || 0),
    0
  );

  const totalBilled = students.reduce((sum, s) => {
    const studentCharge = s.totalBilledSchoolFee ?? getClassFee(s.className) ?? 0;
    return sum + studentCharge;
  }, 0);

  const collectionRate =
    totalBilled > 0 ? ((totalCollected / totalBilled) * 100).toFixed(1) : '0.0';

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase());

    const matchBalance =
      filterBalance === 'ALL' ||
      (filterBalance === 'OWING' && s.schoolFeeBalance > 0) ||
      (filterBalance === 'CLEARED' && s.schoolFeeBalance === 0);

    return matchSearch && matchBalance;
  });

  const handleOpenEditClassFee = (cls: ClassRoom) => {
    setEditingClass(cls);
    const currentFee = cls.termFee || getClassFee(cls.name);
    setEditFeeAmount(String(currentFee));
    setApplyToEnrolled(true);
  };

  const handleSaveClassFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;
    const parsedFee = parseFloat(editFeeAmount);
    if (isNaN(parsedFee) || parsedFee < 0) {
      alert('Please enter a valid tuition fee amount.');
      return;
    }

    updateClassFee(editingClass.id, parsedFee, applyToEnrolled);
    setEditingClass(null);
  };

  const handleCreateFeeItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeeName.trim()) {
      alert('Please enter a fee name.');
      return;
    }
    const parsedAmount = parseFloat(newFeeAmount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      alert('Please enter a valid fee amount.');
      return;
    }

    addFeeStructureItem({
      name: newFeeName.trim(),
      category: newFeeCategory,
      amount: parsedAmount,
      academicYear: '2024 / 2025',
      term: 'Term 2',
      applicableClass: newFeeApplicableClass,
      dueDate: newFeeDueDate,
      status: 'Active',
    });

    setIsAddFeeModalOpen(false);
    setNewFeeName('');
    setNewFeeAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            School Tuition & Fees (FeeTrack)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin controls: set class-by-class school fees, manage tuition billing schedules, and monitor student accounts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Coins}
            onClick={() => openSetClassFees()}
          >
            Configure Class Fees
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon={Plus}
            onClick={() => setIsAddFeeModalOpen(true)}
          >
            Create Fee Category
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Receipt}
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            Record Fee Payment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Billed"
          value={formatCurrency(totalBilled)}
          subtitle="Term 2 Expected Revenue"
          icon={CreditCard}
        />
        <StatCard
          title="Total Collected"
          value={formatCurrency(totalCollected)}
          subtitle="Cleared into Bank / MoMo"
          icon={Receipt}
          trend={{ value: `${collectionRate}% Cleared`, isPositive: true }}
        />
        <StatCard
          title="Outstanding Arrears"
          value={formatCurrency(totalOutstanding)}
          subtitle="Unpaid student accounts"
          icon={CreditCard}
        />
        <StatCard
          title="Collection Rate"
          value={`${collectionRate}%`}
          subtitle="Target: 95% before Mid-Term"
          highlight
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. CLASS-BY-CLASS TUITION FEE CONFIGURATION (ADMIN FEE SETTING) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Class-by-Class Fee Breakdown & Configuration
              </h3>
              <p className="text-[11px] text-slate-500">
                Administrators set distributed fees into School Fees, Bus Fee, and Feeding Fees for each stream.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              icon={Coins}
              onClick={() => openSetClassFees()}
            >
              Configure / Distribute Class Fees
            </Button>
          </div>
        </div>

        {classes.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No class streams established yet. Add classes to set their term fees.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-4 font-semibold">Class Stream</th>
                  <th className="py-2.5 px-3 font-semibold">Stage</th>
                  <th className="py-2.5 px-3 font-semibold">Enrolled</th>
                  <th className="py-2.5 px-3 font-semibold text-right">School Fees</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Bus Fee</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Feeding Fee</th>
                  <th className="py-2.5 px-3 font-bold text-right">Total Class Fee</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Potential Total</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classes.map((cls) => {
                  const breakdown = getClassFeeBreakdown(cls.id);
                  const enrolledCount = cls.studentCount || students.filter((s) => s.className === cls.name || s.classId === cls.id).length;
                  const potentialTotal = enrolledCount * breakdown.totalFee;

                  return (
                    <tr key={cls.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {cls.name}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={cls.stage === 'JHS' ? 'navy' : cls.stage === 'Kindergarten' ? 'warning' : 'info'}>
                          {cls.stage}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        <span className="font-semibold text-slate-900">{enrolledCount}</span> pupils
                      </td>
                      <td className="py-3 px-3 text-slate-800 text-right font-mono">
                        {breakdown.tuitionFee > 0 ? formatCurrency(breakdown.tuitionFee) : '—'}
                      </td>
                      <td className="py-3 px-3 text-slate-800 text-right font-mono">
                        {breakdown.busFee > 0 ? formatCurrency(breakdown.busFee) : '—'}
                      </td>
                      <td className="py-3 px-3 text-slate-800 text-right font-mono">
                        {breakdown.feedingFee > 0 ? formatCurrency(breakdown.feedingFee) : '—'}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 text-right font-mono">
                        {breakdown.totalFee > 0 ? (
                          <span className="text-emerald-700 font-bold">
                            {formatCurrency(breakdown.totalFee)}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-md">
                            Fee Not Set
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-slate-600 text-right font-mono">
                        {breakdown.totalFee > 0 ? formatCurrency(potentialTotal) : '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => openSetClassFees(cls)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <Coins className="w-3 h-3" />
                          {breakdown.totalFee > 0 ? 'Edit Breakdown' : 'Set Fees'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. APPROVED FEE STRUCTURE SCHEDULES TABLE */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Term 2 Approved Fee Schedules & Levies
            </h3>
            <p className="text-[11px] text-slate-500">
              Statutory tuition, feeding, exam, and development charges approved by School Administration
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            icon={Plus}
            onClick={() => setIsAddFeeModalOpen(true)}
          >
            Add Fee Item
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Fee Item Name</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Applicable Class</th>
                <th className="py-2.5 px-3 font-semibold">Due Date</th>
                <th className="py-2.5 px-3 font-bold text-right">Standard Amount</th>
                <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeStructures.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {f.name}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={f.category === 'School Fees' ? 'navy' : f.category === 'Feeding Fees' ? 'warning' : 'neutral'}>
                      {f.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{f.applicableClass}</td>
                  <td className="py-3 px-3 text-slate-600">
                    {formatDate(f.dueDate)}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 text-right">
                    {formatCurrency(f.amount)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => deleteFeeStructureItem(f.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Fee Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. STUDENT ACCOUNT BALANCES TABLE */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs space-y-4 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Student Tuition Accounts & Ledger
            </h3>
            <p className="text-[11px] text-slate-500">
              Tuition billing set per class with partial payments and outstanding balance breakdown per pupil
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student or ID..."
                className="pl-8 pr-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
              />
            </div>
            <select
              value={filterBalance}
              onChange={(e) =>
                setFilterBalance(e.target.value as typeof filterBalance)
              }
              className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
            >
              <option value="ALL">All Accounts</option>
              <option value="OWING">Arrears Outstanding</option>
              <option value="CLEARED">Fully Cleared</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Student Name</th>
                <th className="py-2.5 px-3 font-semibold">Class</th>
                <th className="py-2.5 px-4 font-semibold">Parent / Contact</th>
                <th className="py-2.5 px-3 font-semibold">Class Tuition Fee</th>
                <th className="py-2.5 px-3 font-semibold">Amount Paid</th>
                <th className="py-2.5 px-3 font-bold">Tuition Balance</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No student tuition accounts match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => {
                  const studentCharge = s.totalBilledSchoolFee ?? getClassFee(s.className) ?? 0;
                  const paidSoFar = Math.max(0, studentCharge - (s.schoolFeeBalance || 0));

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">
                          {s.firstName} {s.lastName}
                        </p>
                        <p className="text-[11px] text-slate-400 font-mono">
                          {s.studentId}
                        </p>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700">
                        {s.className}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-800">{s.parentName}</p>
                        <p className="text-[11px] text-slate-500">{s.parentPhone}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-900 font-semibold">
                        {formatCurrency(studentCharge)}
                      </td>
                      <td className="py-3 px-3 font-semibold text-emerald-700">
                        {formatCurrency(paidSoFar)}
                      </td>
                      <td className="py-3 px-3">
                        {s.schoolFeeBalance === 0 ? (
                          <span className="font-bold text-emerald-700">
                            GH₵ 0.00 (PAID)
                          </span>
                        ) : (
                          <span className="font-bold text-rose-600">
                            {formatCurrency(s.schoolFeeBalance)}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedStudentId(s.id);
                            setCurrentNav('students');
                          }}
                          className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                        >
                          View Ledger
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: EDIT CLASS TUITION FEE */}
      {/* ========================================================================= */}
      {editingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Set Tuition Fee: {editingClass.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Academic Stage: {editingClass.stage}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingClass(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClassFee} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Term Tuition Fee (GH₵)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">
                    GH₵
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    required
                    value={editFeeAmount}
                    onChange={(e) => setEditFeeAmount(e.target.value)}
                    placeholder="e.g. 1800"
                    className="w-full pl-12 pr-3 py-2 text-sm font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  This tuition fee will be automatically applied whenever a new student is enrolled into {editingClass.name}.
                </p>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyToEnrolled}
                    onChange={(e) => setApplyToEnrolled(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900">
                      Apply to currently enrolled {editingClass.name} students
                    </span>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      Recalculate balances for all existing students in this stream based on payments already made.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingClass(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Save Class Fee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE FEE CATEGORY / LEVY */}
      {/* ========================================================================= */}
      {isAddFeeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Create Approved Fee Item / Levy
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Add new statutory charge to the official fee schedule
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddFeeModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFeeItem} className="p-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fee Item Name
                </label>
                <input
                  type="text"
                  required
                  value={newFeeName}
                  onChange={(e) => setNewFeeName(e.target.value)}
                  placeholder="e.g. Science & ICT Practical Levy"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newFeeCategory}
                    onChange={(e) => setNewFeeCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="School Fees">School Fees</option>
                    <option value="Feeding Fees">Feeding Fees</option>
                    <option value="Examination">Examination</option>
                    <option value="Other">Other / PTA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Applicable Class
                  </label>
                  <select
                    value={newFeeApplicableClass}
                    onChange={(e) => setNewFeeApplicableClass(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="All">All Classes (Universal)</option>
                    <option value="Kindergarten">Kindergarten (KG 1 - KG 2)</option>
                    <option value="Primary">Primary (Basic 1 - Basic 6)</option>
                    <option value="JHS">JHS (JHS 1 - JHS 3)</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount (GH₵)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    required
                    value={newFeeAmount}
                    onChange={(e) => setNewFeeAmount(e.target.value)}
                    placeholder="e.g. 250"
                    className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newFeeDueDate}
                    onChange={(e) => setNewFeeDueDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddFeeModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Save Fee Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

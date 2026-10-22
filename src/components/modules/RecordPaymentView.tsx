import React, { useState, useEffect } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { FeeCategory, PaymentRecord } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { CreditCard, Receipt, AlertCircle, CheckCircle2, ShieldCheck, Wallet, Check } from 'lucide-react';

interface RecordPaymentViewProps {
  onBack: () => void;
}

export const RecordPaymentView: React.FC<RecordPaymentViewProps> = ({ onBack }) => {
  const {
    students,
    addPayment,
    setSelectedReceiptPayment,
    setIsReceiptModalOpen,
    setIsRecordPaymentOpen,
    paymentDraft,
    setPaymentDraft,
    clearPaymentDraft,
    hasPaymentDraft,
  } = useApp();

  const selectedStudentId = paymentDraft.selectedStudentId || students[0]?.id || '';
  const category = paymentDraft.category;
  const amount = paymentDraft.amount;
  const paymentMethod = paymentDraft.paymentMethod;
  const reference = paymentDraft.reference;
  const notes = paymentDraft.notes;

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!paymentDraft.selectedStudentId && students.length > 0) {
      setPaymentDraft((prev) => ({
        ...prev,
        selectedStudentId: students[0].id,
      }));
    }
  }, [students, paymentDraft.selectedStudentId, setPaymentDraft]);

  const setSelectedStudentId = (id: string) =>
    setPaymentDraft((prev) => ({ ...prev, selectedStudentId: id }));
  const setCategory = (cat: FeeCategory) =>
    setPaymentDraft((prev) => ({ ...prev, category: cat }));
  const setAmount = (amt: number) =>
    setPaymentDraft((prev) => ({ ...prev, amount: amt }));
  const setPaymentMethod = (meth: PaymentRecord['paymentMethod']) =>
    setPaymentDraft((prev) => ({ ...prev, paymentMethod: meth }));
  const setReference = (ref: string) =>
    setPaymentDraft((prev) => ({ ...prev, reference: ref }));
  const setNotes = (n: string) =>
    setPaymentDraft((prev) => ({ ...prev, notes: n }));

  const targetStudent = students.find((s) => s.id === selectedStudentId);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (!selectedStudentId) {
      setError('Please select a student.');
      return;
    }

    if (amount <= 0) {
      setError('Payment amount must be greater than GH₵ 0.');
      return;
    }

    setIsSubmitting(true);

    try {
      const receipt = addPayment({
        studentId: selectedStudentId,
        category,
        amount,
        paymentMethod,
        reference,
        notes,
      });

      setIsRecordPaymentOpen(false);
      setSelectedReceiptPayment(receipt);
      setIsReceiptModalOpen(true);
      onBack();
    } catch (err) {
      setError('Error processing payment.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Record Fee Payment & Issue Receipt"
      subtitle="Credit student ledger, reconcile outstanding term balance, and immediately issue verified digital receipt"
      icon={CreditCard}
      iconBg="from-amber-500 via-orange-600 to-amber-700"
      badgeText="Financial Ledger"
      badgeVariant="warning"
      onBack={onBack}
      backLabel="Back to Payments"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'Fees & Accounting', onClick: onBack },
        { label: 'Record Fee Payment' },
      ]}
      footerSubmitLabel="Process Payment & Generate Receipt"
      footerSubmitIcon={Receipt}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
      actions={
        <div className="flex items-center gap-2">
          {hasPaymentDraft && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Draft Auto-Saved</span>
            </span>
          )}
          {hasPaymentDraft && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to discard this payment record draft?')) {
                  clearPaymentDraft();
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

        {/* 1. Student Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Select Enrolled Student
            </h3>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Search & Select Student *
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs font-medium text-slate-900"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName} ({s.className}) — ID: {s.studentId} — Parent: {s.parentName}
                </option>
              ))}
            </select>
          </div>

          {/* Current Outstanding Balances Card */}
          {targetStudent && (
            <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50/60 via-orange-50/30 to-slate-50 rounded-2xl border border-amber-200/80 shadow-xs">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-3">
                Live Student Balance Summary
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">School Fees Arrears</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {formatCurrency(targetStudent.schoolFeeBalance)}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">Feeding Fees Arrears</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">
                    {formatCurrency(targetStudent.feedingFeeBalance)}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs">
                  <p className="text-[11px] text-slate-500 font-medium">Guardian Contact</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">
                    {targetStudent.parentName}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{targetStudent.parentPhone}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Payment Particulars */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Payment Category & Transaction Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Payment Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FeeCategory)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white font-semibold text-xs"
              >
                <option value="School Fees">School Tuition Fees</option>
                <option value="Feeding Fees">Feeding & Hot Lunch Fees</option>
                <option value="Transport">Transport Bus Fees</option>
                <option value="Admission">Admission & Enrollment Fee</option>
                <option value="Books">Books & Stationery Materials</option>
                <option value="Uniform">Uniform & Sportswear</option>
                <option value="Examination">BECE / Mock Exam Fee</option>
                <option value="Other">Other Miscellaneous</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Amount Paid (GH₵) *
              </label>
              <input
                type="number"
                step="1"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="e.g. 500"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-bold text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Payment Channel *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value as PaymentRecord['paymentMethod']
                  )
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs"
              >
                <option value="Mobile Money (MoMo)">Mobile Money (MTN / Telecel / AT)</option>
                <option value="Bank Transfer">Bank Transfer / Direct Deposit</option>
                <option value="Cash">Cash (Counter Deposit)</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Transaction Reference / Receipt No. *
              </label>
              <input
                type="text"
                required
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. MTN-MM-948102391"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 font-semibold mb-1.5">
                Internal Remarks / Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Term 2 installment deposit paid by father at school counter"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs bg-slate-50/50 hover:bg-white"
              />
            </div>
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

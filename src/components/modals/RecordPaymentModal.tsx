import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { FeeCategory, PaymentRecord } from '../../types';
import { formatCurrency } from '../../utils/formatters';

export const RecordPaymentModal: React.FC = () => {
  const {
    isRecordPaymentOpen,
    setIsRecordPaymentOpen,
    students,
    addPayment,
    setSelectedReceiptPayment,
    setIsReceiptModalOpen,
  } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState(
    students[0]?.id || ''
  );
  const [category, setCategory] = useState<FeeCategory>('School Fees');
  const [amount, setAmount] = useState<number>(500);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentRecord['paymentMethod']>('Mobile Money (MoMo)');
  const [reference, setReference] = useState('MTN-MM-' + Math.floor(100000000 + Math.random() * 900000000));
  const [notes, setNotes] = useState('');

  const targetStudent = students.find((s) => s.id === selectedStudentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || amount <= 0) return;

    const receipt = addPayment({
      studentId: selectedStudentId,
      category,
      amount,
      paymentMethod,
      reference,
      notes,
    });

    setIsRecordPaymentOpen(false);
    // Open the official receipt modal immediately
    setSelectedReceiptPayment(receipt);
    setIsReceiptModalOpen(true);
  };

  return (
    <Modal
      isOpen={isRecordPaymentOpen}
      onClose={() => setIsRecordPaymentOpen(false)}
      title="Record Fee Payment"
      subtitle="Enter payment received and generate official receipt"
      maxWidth="lg"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRecordPaymentOpen(false)}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            Process Payment & Generate Receipt
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Student Selector */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">
            Select Student *
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName} ({s.className}) — ID: {s.studentId}
              </option>
            ))}
          </select>
        </div>

        {/* Current Outstanding Balances Box */}
        {targetStudent && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-slate-500">School Fees Balance</p>
              <p className="text-xs font-bold text-slate-900">
                {formatCurrency(targetStudent.schoolFeeBalance)}
              </p>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <p className="text-[11px] text-slate-500">Feeding Fees Balance</p>
              <p className="text-xs font-bold text-slate-900">
                {formatCurrency(targetStudent.feedingFeeBalance)}
              </p>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <p className="text-[11px] text-slate-500">Parent / Guardian</p>
              <p className="text-xs font-medium text-slate-700">
                {targetStudent.parentName}
              </p>
            </div>
          </div>
        )}

        {/* Category & Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Payment Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FeeCategory)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white font-medium"
            >
              <option value="School Fees">School Fees</option>
              <option value="Feeding Fees">Feeding Fees</option>
              <option value="Transport">Transport Fees</option>
              <option value="Admission">Admission Fee</option>
              <option value="Books">Books & Learning Materials</option>
              <option value="Uniform">Uniform & Sportswear</option>
              <option value="Examination">BECE / Mock Exam Fee</option>
              <option value="Other">Other Miscellaneous</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Amount (GH₵) *
            </label>
            <input
              type="number"
              step="1"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="e.g. 500"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-semibold"
            />
          </div>
        </div>

        {/* Payment Method & Reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Payment Method *
            </label>
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value as PaymentRecord['paymentMethod']
                )
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="Mobile Money (MoMo)">Mobile Money (MTN / Telecel / AT)</option>
              <option value="Bank Transfer">Bank Transfer / Direct Deposit</option>
              <option value="Cash">Cash (Counter Deposit)</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Reference / Transaction ID *
            </label>
            <input
              type="text"
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. MTN-MM-948102391"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-slate-700 font-medium mb-1">
            Notes / Remarks (Optional)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Term 2 installment deposit paid by father"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </form>
    </Modal>
  );
};

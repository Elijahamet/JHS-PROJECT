import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Printer, Download, Share2, CheckCircle2 } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const {
    isReceiptModalOpen,
    setIsReceiptModalOpen,
    selectedReceiptPayment,
    currentSchool,
  } = useApp();

  if (!selectedReceiptPayment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isReceiptModalOpen}
      onClose={() => setIsReceiptModalOpen(false)}
      title="Official School Receipt"
      subtitle={`Receipt #${selectedReceiptPayment.receiptNumber}`}
      maxWidth="xl"
      footer={
        <div className="flex items-center justify-between w-full no-print">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Verified Financial Record
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Share2}
              onClick={() => alert('Receipt link copied to clipboard!')}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={() => alert('Downloading official PDF receipt...')}
            >
              Download PDF
            </Button>
            <Button size="sm" icon={Printer} onClick={handlePrint}>
              Print Receipt
            </Button>
          </div>
        </div>
      }
    >
      {/* Printable Receipt Card */}
      <div
        id="printable-receipt"
        className="p-6 bg-white border border-slate-200 rounded-xl space-y-6 text-xs text-slate-800"
      >
        {/* School Header */}
        <div className="flex items-start justify-between border-b pb-5 border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
              SOS
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {currentSchool.name}
              </h2>
              <p className="text-[11px] text-slate-500 italic">
                &ldquo;{currentSchool.motto}&rdquo;
              </p>
              <p className="text-[11px] text-slate-500">
                {currentSchool.address}, {currentSchool.city} • Tel: {currentSchool.phone}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded text-[11px] uppercase tracking-wider">
              Official Receipt
            </span>
            <p className="mt-1 font-mono text-xs font-semibold text-slate-900">
              {selectedReceiptPayment.receiptNumber}
            </p>
            <p className="text-[11px] text-slate-500">
              Date: {formatDate(selectedReceiptPayment.date)}
            </p>
          </div>
        </div>

        {/* Payment Summary Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/80 rounded-lg border border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Student Information
            </span>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              {selectedReceiptPayment.studentName}
            </p>
            <p className="text-xs text-slate-600">
              ID: {selectedReceiptPayment.studentCode}
            </p>
            <p className="text-xs text-slate-600">
              Class: {selectedReceiptPayment.className}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Parent / Payer Details
            </span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">
              {selectedReceiptPayment.parentName}
            </p>
            <p className="text-xs text-slate-600">
              Payment Method: {selectedReceiptPayment.paymentMethod}
            </p>
            <p className="text-xs text-slate-600 font-mono">
              Ref: {selectedReceiptPayment.reference}
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
              <th className="py-2 font-semibold">Description / Category</th>
              <th className="py-2 font-semibold">Academic Term</th>
              <th className="py-2 font-semibold text-right">Amount Paid</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-3 font-semibold text-slate-900">
                {selectedReceiptPayment.category}
                {selectedReceiptPayment.notes && (
                  <p className="text-[11px] text-slate-500 font-normal">
                    {selectedReceiptPayment.notes}
                  </p>
                )}
              </td>
              <td className="py-3 text-slate-600">
                {currentSchool.academicYear} • {currentSchool.currentTerm}
              </td>
              <td className="py-3 font-bold text-slate-900 text-right">
                {formatCurrency(selectedReceiptPayment.amount)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-200">
              <td colSpan={2} className="pt-3 text-right font-semibold text-slate-700">
                Total Amount Received:
              </td>
              <td className="pt-3 text-right font-bold text-base text-slate-900">
                {formatCurrency(selectedReceiptPayment.amount)}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="pt-1 text-right text-xs text-slate-500">
                Remaining Outstanding Balance:
              </td>
              <td className="pt-1 text-right font-semibold text-xs text-rose-600">
                {formatCurrency(selectedReceiptPayment.balanceAfterPayment)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Footer & Signature */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div>
            <p>
              Issued by:{' '}
              <span className="font-semibold text-slate-800">
                {selectedReceiptPayment.authorizedStaff}
              </span>
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              SchoolOS System-Generated Official Document
            </p>
          </div>
          <div className="text-right">
            <div className="border-b border-dashed border-slate-400 w-36 mb-1 h-8" />
            <p className="text-[10px] text-slate-600 font-medium">
              Authorized Signature & Stamp
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

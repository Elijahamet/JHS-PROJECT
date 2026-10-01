import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const PaymentsView: React.FC = () => {
  const {
    payments,
    setIsRecordPaymentOpen,
    setSelectedReceiptPayment,
    setIsReceiptModalOpen,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedMethod, setSelectedMethod] = useState('ALL');

  const filteredPayments = payments.filter((p) => {
    const matchSearch =
      p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === 'ALL' || p.category === selectedCategory;

    const matchMethod =
      selectedMethod === 'ALL' || p.paymentMethod === selectedMethod;

    return matchSearch && matchCategory && matchMethod;
  });

  const totalAmountFiltered = filteredPayments.reduce(
    (sum, p) => sum + p.amount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Financial Payments & Receipts Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready transaction records across Bank transfers, Mobile Money, and Cash deposits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Download}
            onClick={() => alert('Exporting verified transactions to CSV...')}
          >
            Export Ledger
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            Record Payment
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by receipt #, student, reference, payer..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Categories</option>
              <option value="School Fees">School Fees (Tuition)</option>
              <option value="Feeding Fees">Feeding Fees</option>
              <option value="Transport">Transport Fees</option>
              <option value="Admission">Admission Fee</option>
              <option value="Books">Books & Uniform</option>
            </select>
          </div>

          <div>
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Payment Methods</option>
              <option value="Mobile Money (MoMo)">Mobile Money (MoMo)</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash (Counter)</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 text-xs">
          <span className="font-semibold text-slate-700">
            Showing {filteredPayments.length} verified transactions
          </span>
          <span className="font-bold text-slate-900">
            Total Value: {formatCurrency(totalAmountFiltered)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Receipt Number</th>
                <th className="py-3 px-4 font-semibold">Student / Class</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold">Method & Reference</th>
                <th className="py-3 px-3 font-semibold">Payment Date</th>
                <th className="py-3 px-3 font-bold text-right">Amount (GH₵)</th>
                <th className="py-3 px-3 font-semibold text-right">Remaining</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((pmt) => (
                <tr
                  key={pmt.id}
                  className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                  onClick={() => {
                    setSelectedReceiptPayment(pmt);
                    setIsReceiptModalOpen(true);
                  }}
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 group-hover:text-blue-600">
                    {pmt.receiptNumber}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">{pmt.studentName}</p>
                    <p className="text-[11px] text-slate-400">{pmt.className}</p>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={pmt.category === 'Feeding Fees' ? 'warning' : 'navy'}>
                      {pmt.category}
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <p className="text-slate-800 font-medium">{pmt.paymentMethod}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {pmt.reference}
                    </p>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {formatDate(pmt.date)}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 text-right">
                    {formatCurrency(pmt.amount)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {pmt.balanceAfterPayment === 0 ? (
                      <span className="text-emerald-700 font-semibold">GH₵ 0.00</span>
                    ) : (
                      <span className="text-rose-600 font-medium">
                        {formatCurrency(pmt.balanceAfterPayment)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedReceiptPayment(pmt);
                        setIsReceiptModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

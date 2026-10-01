import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Receipt,
  Search,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const SchoolFeesView: React.FC = () => {
  const {
    students,
    feeStructures,
    setIsRecordPaymentOpen,
    setSelectedStudentId,
    setCurrentNav,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBalance, setFilterBalance] = useState<'ALL' | 'OWING' | 'CLEARED'>('ALL');

  const totalBilled = 2000 * 642;
  const totalCollected = 185600;
  const totalOutstanding = 42500;
  const collectionRate = ((totalCollected / (totalCollected + totalOutstanding)) * 100).toFixed(1);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            School Tuition & Fees (FeeTrack)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage tuition billing, fee schedules, partial installments, and student balances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Plus}
            onClick={() => alert('New fee item modal')}
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

      {/* Fee Structure Schedules Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Term 2 Approved Fee Schedules
            </h3>
            <p className="text-[11px] text-slate-500">
              Statutory charges approved by School Board & PTA
            </p>
          </div>
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
                <th className="py-2.5 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeStructures.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {f.name}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="navy">{f.category}</Badge>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{f.applicableClass}</td>
                  <td className="py-3 px-3 text-slate-600">
                    {formatDate(f.dueDate)}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900 text-right">
                    {formatCurrency(f.amount)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Account Balances Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs space-y-4 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Student Tuition Accounts & Ledger
            </h3>
            <p className="text-[11px] text-slate-500">
              Partial payments and outstanding balance breakdown per enrolled student
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
                <th className="py-2.5 px-3 font-semibold">Standard Charge</th>
                <th className="py-2.5 px-3 font-semibold">Amount Paid</th>
                <th className="py-2.5 px-3 font-bold">Tuition Balance</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60">
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
                  <td className="py-3 px-3 text-slate-700">
                    {formatCurrency(2000)}
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">
                    {formatCurrency(2000 - s.schoolFeeBalance)}
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
                      className="text-xs text-blue-600 font-semibold hover:underline"
                    >
                      View Ledger
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

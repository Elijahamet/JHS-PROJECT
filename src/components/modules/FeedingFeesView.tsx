import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Receipt,
  Search,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export const FeedingFeesView: React.FC = () => {
  const {
    students,
    setIsRecordPaymentOpen,
    setSelectedStudentId,
    setCurrentNav,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeeding, setFilterFeeding] = useState<'ALL' | 'OWING' | 'CLEARED'>('ALL');

  const feedingStudents = students.filter((s) => s.participatesInFeeding);

  const totalFeedingBilled = 600 * 410;
  const totalFeedingCollected = 42600;
  const totalFeedingOutstanding = 8400;

  const filtered = feedingStudents.filter((s) => {
    const matchSearch =
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.className.toLowerCase().includes(searchTerm.toLowerCase());

    const matchFeeding =
      filterFeeding === 'ALL' ||
      (filterFeeding === 'OWING' && s.feedingFeeBalance > 0) ||
      (filterFeeding === 'CLEARED' && s.feedingFeeBalance === 0);

    return matchSearch && matchFeeding;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              School Feeding Programme (Dedicated Ledger)
            </h2>
            <Badge variant="warning">Strictly Isolated from Tuition</Badge>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hot nutritious lunch catering charges, subscriber rosters, and per-child feeding balances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={Receipt}
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            Record Feeding Payment
          </Button>
        </div>
      </div>

      {/* Distinction Callout Banner */}
      <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-slate-700 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <UtensilsCrossed className="w-4 h-4" />
        </div>
        <div>
          <p className="font-bold text-slate-900">
            Financial Isolation Rule: School Fees vs Feeding Fees
          </p>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Feeding fees are non-statutory optional meal plans. Payments made for school fees CANNOT automatically offset feeding arrears unless explicitly directed. For example, <strong>Kwame Mensah</strong> has <span className="font-bold text-emerald-700">GH₵ 0.00 school fee balance</span> but <span className="font-bold text-amber-700">GH₵ 250.00 feeding fee balance</span>.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Feeding Billed"
          value={formatCurrency(totalFeedingBilled)}
          subtitle="410 Subscribed Students"
          icon={UtensilsCrossed}
        />
        <StatCard
          title="Feeding Collected"
          value={formatCurrency(totalFeedingCollected)}
          subtitle="Term 2 Lunches Paid"
          icon={Receipt}
        />
        <StatCard
          title="Feeding Outstanding"
          value={formatCurrency(totalFeedingOutstanding)}
          subtitle="Meals Served in Arrears"
          icon={AlertTriangle}
        />
        <StatCard
          title="Catering Coverage"
          value="83.5%"
          subtitle="Cleared for cafeteria entry"
          highlight
        />
      </div>

      {/* Subscriber Roster & Balance Ledger Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs space-y-4 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Enrolled Lunch Subscribers ({feedingStudents.length} Students)
            </h3>
            <p className="text-[11px] text-slate-500">
              Daily kitchen roster and individual feeding account ledger
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subscriber..."
                className="pl-8 pr-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
              />
            </div>
            <select
              value={filterFeeding}
              onChange={(e) =>
                setFilterFeeding(e.target.value as typeof filterFeeding)
              }
              className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white"
            >
              <option value="ALL">All Subscribers</option>
              <option value="OWING">Feeding Arrears</option>
              <option value="CLEARED">Feeding Cleared</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Student Name</th>
                <th className="py-2.5 px-3 font-semibold">Class</th>
                <th className="py-2.5 px-3 font-semibold">School Fees Status</th>
                <th className="py-2.5 px-3 font-semibold">Feeding Term Charge</th>
                <th className="py-2.5 px-3 font-semibold">Feeding Paid</th>
                <th className="py-2.5 px-3 font-bold">Feeding Balance</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
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
                  <td className="py-3 px-3">
                    {s.schoolFeeBalance === 0 ? (
                      <Badge variant="success">Tuition Cleared</Badge>
                    ) : (
                      <Badge variant="danger">
                        {formatCurrency(s.schoolFeeBalance)} Due
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {formatCurrency(600)}
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">
                    {formatCurrency(600 - s.feedingFeeBalance)}
                  </td>
                  <td className="py-3 px-3">
                    {s.feedingFeeBalance === 0 ? (
                      <span className="font-bold text-emerald-700">
                        GH₵ 0.00 (PAID)
                      </span>
                    ) : (
                      <span className="font-bold text-amber-800">
                        {formatCurrency(s.feedingFeeBalance)}
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
                      Feeding History
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

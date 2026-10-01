import React from 'react';
import {
  WalletCards,
  Receipt,
  CreditCard,
  UtensilsCrossed,
  AlertTriangle,
  ArrowUpRight,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const AccountantPortalView: React.FC = () => {
  const {
    students,
    payments,
    setIsRecordPaymentOpen,
    setCurrentNav,
    setSelectedReceiptPayment,
    setIsReceiptModalOpen,
  } = useApp();

  const overdueAccounts = students.filter(
    (s) => s.schoolFeeBalance > 0 || s.feedingFeeBalance > 0
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
            Bursary & Accounts Department
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Bursar Financial Cockpit
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Cash register, daily reconciliations, tuition deposits, and feeding fees monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            Record Payment Receipt
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Collections"
          value={formatCurrency(4350)}
          subtitle="Cash & MoMo Received"
          icon={Receipt}
          trend={{ value: '+18.5%', isPositive: true }}
        />
        <StatCard
          title="School Fee Balance"
          value={formatCurrency(42500)}
          subtitle="Outstanding Tuition Due"
          icon={CreditCard}
        />
        <StatCard
          title="Feeding Fee Balance"
          value={formatCurrency(8400)}
          subtitle="Separate Feeding Arrears"
          icon={UtensilsCrossed}
        />
        <StatCard
          title="Accounts in Arrears"
          value={`${overdueAccounts.length} Students`}
          subtitle="Action required before tests"
          highlight
        />
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <button
          onClick={() => setCurrentNav('fees')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors"
        >
          <CreditCard className="w-4 h-4 text-blue-600 mb-1" />
          <p className="font-bold text-slate-900">Tuition Schedules</p>
          <p className="text-[11px] text-slate-500">Manage rates & terms</p>
        </button>

        <button
          onClick={() => setCurrentNav('feeding-fees')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors"
        >
          <UtensilsCrossed className="w-4 h-4 text-amber-600 mb-1" />
          <p className="font-bold text-slate-900">Feeding Ledger</p>
          <p className="text-[11px] text-slate-500">Separated meal balances</p>
        </button>

        <button
          onClick={() => setCurrentNav('payments')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors"
        >
          <Receipt className="w-4 h-4 text-emerald-600 mb-1" />
          <p className="font-bold text-slate-900">All Transactions</p>
          <p className="text-[11px] text-slate-500">Search receipts & audits</p>
        </button>

        <button
          onClick={() => setCurrentNav('reports')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors"
        >
          <WalletCards className="w-4 h-4 text-purple-600 mb-1" />
          <p className="font-bold text-slate-900">Financial Reports</p>
          <p className="text-[11px] text-slate-500">Export audit statements</p>
        </button>
      </div>

      {/* Overdue Accounts Watchlist Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Priority Overdue Accounts Watchlist
            </h3>
            <p className="text-[11px] text-slate-500">
              Students with pending arrears requiring bursar follow-up
            </p>
          </div>
          <Badge variant="danger">{overdueAccounts.length} Accounts Pending</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Student Name</th>
                <th className="py-2.5 px-3 font-semibold">Class</th>
                <th className="py-2.5 px-4 font-semibold">Parent Contact</th>
                <th className="py-2.5 px-3 font-semibold">School Fee Arrears</th>
                <th className="py-2.5 px-3 font-semibold">Feeding Fee Arrears</th>
                <th className="py-2.5 px-3 font-bold text-right">Total Outstanding</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overdueAccounts.map((s) => (
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
                  <td className="py-3 px-3">
                    {s.schoolFeeBalance > 0 ? (
                      <span className="font-semibold text-rose-600">
                        {formatCurrency(s.schoolFeeBalance)}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Cleared</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {s.feedingFeeBalance > 0 ? (
                      <span className="font-semibold text-amber-800">
                        {formatCurrency(s.feedingFeeBalance)}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium">Cleared</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-bold text-rose-700 text-right">
                    {formatCurrency(s.schoolFeeBalance + s.feedingFeeBalance)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsRecordPaymentOpen(true)}
                    >
                      Receive Payment
                    </Button>
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

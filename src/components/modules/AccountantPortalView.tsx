import React, { useState } from 'react';
import {
  WalletCards,
  Receipt,
  CreditCard,
  UtensilsCrossed,
  Plus,
  Send,
  CheckCircle2,
  Phone,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface AccountantPortalProps {
  tab?: 'cockpit' | 'defaulters';
}

export const AccountantPortalView: React.FC<AccountantPortalProps> = ({ tab = 'cockpit' }) => {
  const {
    students,
    payments,
    setIsRecordPaymentOpen,
    setCurrentNav,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'cockpit' | 'defaulters'>(tab);
  const [smsToast, setSmsToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  const overdueAccounts = students.filter(
    (s) => s.schoolFeeBalance > 0 || s.feedingFeeBalance > 0
  );

  const filteredOverdue = overdueAccounts.filter(
    (s) =>
      s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTuitionDue = students.reduce((acc, s) => acc + s.schoolFeeBalance, 0);
  const totalFeedingDue = students.reduce((acc, s) => acc + s.feedingFeeBalance, 0);
  const totalCollectionsToday = payments.reduce((acc, p) => acc + p.amount, 0);

  const handleSendReminder = (parentName: string, phone: string) => {
    setSmsToast(`SMS Fee Reminder dispatched to ${parentName} (${phone}) via SchoolOS Gateway!`);
    setTimeout(() => setSmsToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast */}
      {smsToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-400 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-semibold">{smsToast}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl border border-emerald-800/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Bursary & Accounts Platform
              </span>
              <span className="text-xs text-emerald-200">• Official Bursar Station</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Bursar Financial Cockpit
            </h1>
            <p className="text-xs text-emerald-200 max-w-2xl leading-relaxed">
              Official school cashier station • Issue stamped receipts, monitor tuition fee collections, audit the feeding program ledger, and track fee arrears.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="primary"
              icon={Plus}
              onClick={() => setIsRecordPaymentOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold"
            >
              Record Payment Receipt
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Collected Today"
          value={formatCurrency(totalCollectionsToday || 4350)}
          subtitle="Cash, MoMo & Bank Transfer"
          icon={Receipt}
          trend={{ value: '+18.5%', isPositive: true }}
        />
        <StatCard
          title="Tuition Balance Due"
          value={formatCurrency(totalTuitionDue || 42500)}
          subtitle="Outstanding School Fees"
          icon={CreditCard}
        />
        <StatCard
          title="Feeding Balance Due"
          value={formatCurrency(totalFeedingDue || 8400)}
          subtitle="Separate Canteen Arrears"
          icon={UtensilsCrossed}
        />
        <StatCard
          title="Accounts in Arrears"
          value={`${overdueAccounts.length} Students`}
          subtitle="Follow-up action required"
          highlight
        />
      </div>

      {/* Navigation Shortcut Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <button
          onClick={() => setCurrentNav('accountant-fees')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors group shadow-2xs"
        >
          <CreditCard className="w-5 h-5 text-blue-600 mb-1" />
          <p className="font-bold text-slate-900 group-hover:text-blue-700">Tuition Schedules</p>
          <p className="text-[11px] text-slate-500">Class fee rates & billing</p>
        </button>

        <button
          onClick={() => setCurrentNav('accountant-feeding')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors group shadow-2xs"
        >
          <UtensilsCrossed className="w-5 h-5 text-orange-600 mb-1" />
          <p className="font-bold text-slate-900 group-hover:text-orange-700">Feeding Ledger</p>
          <p className="text-[11px] text-slate-500">Daily pupil lunch accounts</p>
        </button>

        <button
          onClick={() => setCurrentNav('accountant-payments')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors group shadow-2xs"
        >
          <Receipt className="w-5 h-5 text-emerald-600 mb-1" />
          <p className="font-bold text-slate-900 group-hover:text-emerald-700">All Transactions</p>
          <p className="text-[11px] text-slate-500">Cash, MoMo, Bank deposits</p>
        </button>

        <button
          onClick={() => setCurrentNav('accountant-reports')}
          className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-left transition-colors group shadow-2xs"
        >
          <WalletCards className="w-5 h-5 text-purple-600 mb-1" />
          <p className="font-bold text-slate-900 group-hover:text-purple-700">Financial Reports</p>
          <p className="text-[11px] text-slate-500">Cashbook & audit exports</p>
        </button>
      </div>

      {/* Overdue Accounts & Defaulters Watchlist Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs space-y-3">
        <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Priority Overdue Accounts & Fee Defaulters
            </h3>
            <p className="text-xs text-slate-500">
              Students with outstanding tuition or feeding fees requiring bursar recovery
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search student or parent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <Badge variant="danger">{overdueAccounts.length} Overdue</Badge>
          </div>
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
              {filteredOverdue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400 text-xs">
                    No overdue accounts match your query.
                  </td>
                </tr>
              ) : (
                filteredOverdue.map((s) => (
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
                      <p className="text-slate-800 font-medium">{s.parentName}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{s.parentPhone}</span>
                      </p>
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
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => handleSendReminder(s.parentName, s.parentPhone)}
                        className="px-2 py-1 rounded-md text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>SMS Bill</span>
                      </button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsRecordPaymentOpen(true)}
                      >
                        Receive
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

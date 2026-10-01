import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Filter,
  BarChart3,
  Calendar,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export const ReportsView: React.FC = () => {
  const { classes } = useApp();

  const [reportType, setReportType] = useState<'attendance' | 'academic' | 'finance' | 'feeding' | 'transport'>('finance');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [term, setTerm] = useState('Term 2');

  const handleExport = () => {
    alert(`Exporting ${reportType.toUpperCase()} Report for ${term} to CSV...`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Institutional Reports & Operational Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate printable auditor summaries and exportable CSVs for GES, Board of Directors, and PTA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Printer}
            onClick={handlePrint}
          >
            Print Report
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Download}
            onClick={handleExport}
          >
            Export to CSV
          </Button>
        </div>
      </div>

      {/* Report Type Selector Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        {[
          { id: 'finance', label: 'School Tuition Fee Report' },
          { id: 'feeding', label: 'Feeding Programme Audit' },
          { id: 'attendance', label: 'Institutional Attendance Summary' },
          { id: 'academic', label: 'Terminal Academic Performance' },
          { id: 'transport', label: 'Transport Ridership Report' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setReportType(tab.id as typeof reportType)}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
              reportType === tab.id
                ? 'bg-slate-900 text-white font-bold shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Academic Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="Term 1">Term 1 (Sept - Dec)</option>
              <option value="Term 2">Term 2 (Jan - April)</option>
              <option value="Term 3">Term 3 (May - Aug)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Class Filtering
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white"
            >
              <option value="ALL">All Classes (School-Wide)</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Reporting Standard
            </label>
            <input
              type="text"
              readOnly
              value="Ghana Education Service (GES) Compliant"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Generated Report Preview Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-6 text-xs">
        <div className="border-b pb-4 flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">
              Bright Future Academy — Official Report Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Type: {reportType.toUpperCase()} • Generated for: {term} (2024/2025)
            </p>
          </div>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono font-semibold rounded text-[11px]">
            REF: REP-2025-089
          </span>
        </div>

        {/* Dynamic content depending on reportType */}
        {reportType === 'finance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500">Total Billed Tuition</span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  {formatCurrency(1284000)}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <span className="text-[11px] text-emerald-800">Total Cleared</span>
                <p className="text-base font-bold text-emerald-900 mt-0.5">
                  {formatCurrency(185600)}
                </p>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <span className="text-[11px] text-rose-800">Total Arrears Outstanding</span>
                <p className="text-base font-bold text-rose-900 mt-0.5">
                  {formatCurrency(42500)}
                </p>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs mt-4">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Enrolled</th>
                  <th className="py-2.5 px-3">Billed</th>
                  <th className="py-2.5 px-3">Collected</th>
                  <th className="py-2.5 px-3">Balance</th>
                  <th className="py-2.5 px-3 text-right">Recovery %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {classes.slice(0, 6).map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-3">{c.studentCount}</td>
                    <td className="py-2.5 px-3 font-mono">{formatCurrency(c.studentCount * 2000)}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-700">{formatCurrency(c.studentCount * 1700)}</td>
                    <td className="py-2.5 px-3 font-mono text-rose-600">{formatCurrency(c.studentCount * 300)}</td>
                    <td className="py-2.5 px-3 font-bold text-right">85.0%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {reportType === 'feeding' && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
              <p className="font-bold text-slate-900">
                School Feeding Kitchen & Vendor Ledger
              </p>
              <p className="text-slate-600 text-xs">
                Term 2 Feeding Rate: GH₵ 600.00 per term. 410 Active subscribers.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Collected</span>
                <p className="text-base font-bold text-slate-900">{formatCurrency(42600)}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Arrears</span>
                <p className="text-base font-bold text-rose-600">{formatCurrency(8400)}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500">Meals Served</span>
                <p className="text-base font-bold text-blue-700">24,600 Plates</p>
              </div>
            </div>
          </div>
        )}

        {reportType === 'attendance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <span className="text-emerald-800">Average Present</span>
                <p className="text-base font-bold text-emerald-900">94.2%</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg">
                <span className="text-rose-800">Average Absent</span>
                <p className="text-base font-bold text-rose-900">3.8%</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <span className="text-amber-800">Average Late</span>
                <p className="text-base font-bold text-amber-900">2.0%</p>
              </div>
            </div>
          </div>
        )}

        {reportType === 'academic' && (
          <div className="p-4 bg-slate-50 rounded-lg text-slate-700">
            <p className="font-semibold text-slate-900">Academic Standard Indicators</p>
            <p className="mt-1">
              School-wide pass rate for Term 2 tests is 91.8%. Highest achieving subjects: ICT (94.2%) and Mathematics (88.5%).
            </p>
          </div>
        )}

        {reportType === 'transport' && (
          <div className="p-4 bg-slate-50 rounded-lg text-slate-700">
            <p className="font-semibold text-slate-900">Fleet Operations Report</p>
            <p className="mt-1">
              84 total daily passengers across 3 operational routes (Madina-Adenta, Dome-Achimota, Spintex-Legon). On-time arrival rate: 98.4%.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

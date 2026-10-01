import React from 'react';
import {
  CalendarCheck,
  CreditCard,
  UtensilsCrossed,
  Bus,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertCircle,
  Megaphone,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const ParentPortalView: React.FC = () => {
  const {
    students,
    routes,
    announcements,
    setIsReportCardModalOpen,
    setIsRecordPaymentOpen,
  } = useApp();

  // Primary linked student for parent persona
  const child = students[0];
  const busRoute = routes[0];

  if (!child) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <EmptyState
          title="No Ward Linked Yet"
          description="There are currently no students registered in the system linked to your parent portal. Once a student is enrolled, their academic reports, fees, and attendance will appear here."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Welcome Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={child.photoUrl}
              alt={child.firstName}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 shadow-xs flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {child.firstName} {child.lastName}
                </h2>
                <Badge variant="navy">{child.className}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Student ID: <span className="font-mono font-medium text-slate-700">{child.studentId}</span> • Class Teacher: Mr. Emmanuel Darko
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              icon={FileSpreadsheet}
              onClick={() => setIsReportCardModalOpen(true)}
            >
              Terminal Report Card
            </Button>
          </div>
        </div>

        {/* Essential Daily Status Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100/80">
            <span className="text-[11px] text-emerald-800 font-medium">Today&apos;s Attendance</span>
            <p className="text-sm font-bold text-emerald-900 mt-0.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Present in Class</span>
            </p>
          </div>

          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100/80">
            <span className="text-[11px] text-blue-800 font-medium">Terminal Academic Average</span>
            <p className="text-sm font-bold text-blue-900 mt-0.5">
              {child.lastGradeAverage}% (Position: 4th)
            </p>
          </div>

          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100/80">
            <span className="text-[11px] text-purple-800 font-medium">School Bus 01 Status</span>
            <p className="text-xs font-bold text-purple-900 mt-0.5 flex items-center gap-1">
              <Bus className="w-3.5 h-3.5" />
              <span>{busRoute.status}</span>
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 font-medium">Term 2 Progress</span>
            <p className="text-xs font-semibold text-slate-800 mt-0.5">
              Week 5 of 12
            </p>
          </div>
        </div>
      </div>

      {/* Financial Status: Very clear separation between School Fees and Feeding Fees */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Tuition Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                School Tuition Fees
              </h3>
            </div>
            <Badge variant="success">Fully Paid</Badge>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Term 2 Billed:</span>
              <span className="font-semibold text-slate-900">{formatCurrency(2000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Paid:</span>
              <span className="font-semibold text-emerald-700">{formatCurrency(2000)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100 font-bold">
              <span className="text-slate-700">Remaining Balance:</span>
              <span className="text-emerald-700">GH₵ 0.00</span>
            </div>
          </div>
        </div>

        {/* Feeding Card */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-amber-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Feeding Programme Fee
              </h3>
            </div>
            <Badge variant="warning">Balance Due</Badge>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Term 2 Lunch Fee:</span>
              <span className="font-semibold text-slate-900">{formatCurrency(600)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Paid:</span>
              <span className="font-semibold text-emerald-700">{formatCurrency(350)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-amber-100 font-bold">
              <span className="text-slate-700">Arrears Due:</span>
              <span className="text-amber-800">{formatCurrency(250)}</span>
            </div>
          </div>

          <Button
            size="sm"
            variant="primary"
            className="w-full"
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            Pay Feeding Fee Balance (GH₵ 250.00)
          </Button>
        </div>
      </div>

      {/* Bus Route Tracker Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bus className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Assigned School Bus Details
            </h3>
          </div>
          <Badge variant="info">Status: On Route</Badge>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
          <p className="font-semibold text-slate-900">
            Route 1: Madina - Adenta - North Legon Campus
          </p>
          <p className="text-slate-600">
            Designated Stop: <strong>Adenta SSNIT Flats Junction</strong> (Pickup: 06:45 AM)
          </p>
          <p className="text-slate-500">
            Driver: <strong>Mr. Daniel Tetteh</strong> (+233 24 330 1199) • Bus Reg: GR-4891-22
          </p>
        </div>
      </div>

      {/* School Circulars / Announcements */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              School Notices for Parents
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Official Circulars</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {announcements.slice(0, 2).map((ann) => (
            <div key={ann.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{ann.title}</span>
                <span className="text-[10px] text-slate-400">
                  {formatDate(ann.publishDate)}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{ann.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

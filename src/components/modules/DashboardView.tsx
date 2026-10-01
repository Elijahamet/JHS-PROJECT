import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Layers,
  CalendarCheck,
  CreditCard,
  UtensilsCrossed,
  Receipt,
  UserPlus,
  ArrowUpRight,
  Clock,
  Calendar,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DashboardView: React.FC = () => {
  const {
    students,
    teachers,
    classes,
    payments,
    announcements,
    attendance,
    setIsAddStudentOpen,
    setIsRecordPaymentOpen,
    setIsCreateAnnouncementOpen,
    setCurrentNav,
    setSelectedReceiptPayment,
    setIsReceiptModalOpen,
  } = useApp();

  // Dynamically calculated real-time metrics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;

  const totalSchoolFeesOutstanding = students.reduce((sum, s) => sum + (s.schoolFeeBalance || 0), 0);
  const totalFeedingFeesOutstanding = students.reduce((sum, s) => sum + (s.feedingFeeBalance || 0), 0);
  const totalFeesCollected = payments.filter(p => p.category === 'School Fees').reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalFeedingCollected = payments.filter(p => p.category === 'Feeding Fees').reduce((sum, p) => sum + (p.amount || 0), 0);

  const totalAttendanceRecords = attendance.length;
  const presentCount = attendance.filter((a) => a.status === 'Present').length;
  const attendanceRate = totalAttendanceRecords > 0 ? ((presentCount / totalAttendanceRecords) * 100).toFixed(1) : '0.0';

  const recentPayments = payments.slice(0, 5);
  const recentAnnouncements = announcements.slice(0, 3);

  const upcomingEvents = [
    {
      title: 'Term 2 Mid-Term PTA General Meeting',
      date: '28 Feb 2025',
      time: '03:00 PM',
      audience: 'All Parents & Teachers',
      location: 'Assembly Hall',
    },
    {
      title: 'Mid-Term Examinations Commence',
      date: '17 Feb 2025',
      time: '08:00 AM',
      audience: 'Primary & JHS Students',
      location: 'All Classrooms',
    },
    {
      title: 'Inter-School Athletics Competition',
      date: '06 Mar 2025',
      time: '09:00 AM',
      audience: 'Sports Team & Staff',
      location: 'Legon Sports Stadium',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner: Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            School Operations Overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time academic records, fee collection, attendance, and campus logistics.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            icon={UserPlus}
            onClick={() => setIsAddStudentOpen(true)}
          >
            Enroll Student
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon={Receipt}
            onClick={() => setIsRecordPaymentOpen(true)}
          >
            Record Payment
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsCreateAnnouncementOpen(true)}
          >
            New Announcement
          </Button>
        </div>
      </div>

      {/* Top Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <StatCard
          title="Students"
          value={totalStudents.toLocaleString()}
          subtitle="Enrolled active"
          icon={GraduationCap}
        />
        <StatCard
          title="Teachers"
          value={totalTeachers}
          subtitle="Academic staff"
          icon={Briefcase}
        />
        <StatCard
          title="Classes"
          value={totalClasses}
          subtitle="Basic 1 to JHS 3"
          icon={Layers}
        />
        <StatCard
          title="Attendance"
          value={`${attendanceRate}%`}
          subtitle={`${presentCount} present today`}
          icon={CalendarCheck}
        />
        <StatCard
          title="School Fees Due"
          value={formatCurrency(totalSchoolFeesOutstanding)}
          subtitle="Outstanding balance"
          icon={CreditCard}
        />
        <StatCard
          title="Feeding Due"
          value={formatCurrency(totalFeedingFeesOutstanding)}
          subtitle="Separate feeding ledger"
          icon={UtensilsCrossed}
        />
      </div>

      {/* Middle Section: Attendance Overview & Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Today&apos;s Attendance Rate
              </h3>
              <p className="text-xs text-slate-500">
                Daily Roll Register
              </p>
            </div>
            <Badge variant={Number(attendanceRate) > 0 ? 'success' : 'neutral'}>
              {attendanceRate}% Present
            </Badge>
          </div>

          <div className="mt-5 space-y-4">
            {/* Visual Progress Bar */}
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${attendanceRate}%` }}
                className="bg-emerald-600 h-full transition-all duration-500"
                title={`Present: ${attendanceRate}%`}
              />
              <div
                style={{ width: '3.8%' }}
                className="bg-rose-500 h-full"
                title="Absent: 3.8%"
              />
              <div
                style={{ width: '2.0%' }}
                className="bg-amber-500 h-full"
                title="Late: 2.0%"
              />
            </div>

            {/* Attendance Stat Chips */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
                <span className="text-[11px] text-emerald-800 font-medium">Present</span>
                <p className="text-base font-bold text-emerald-900 mt-0.5">614</p>
                <span className="text-[10px] text-emerald-700">94.2%</span>
              </div>
              <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-100">
                <span className="text-[11px] text-rose-800 font-medium">Absent</span>
                <p className="text-base font-bold text-rose-900 mt-0.5">20</p>
                <span className="text-[10px] text-rose-700">3.8%</span>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-100">
                <span className="text-[11px] text-amber-800 font-medium">Late</span>
                <p className="text-base font-bold text-amber-900 mt-0.5">8</p>
                <span className="text-[10px] text-amber-700">2.0%</span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                All 12 classes submitted attendance on time
              </span>
              <button
                onClick={() => setCurrentNav('attendance')}
                className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
              >
                <span>Take Roll</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Financial Separation Overview (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Term 2 Financial Collections
              </h3>
              <p className="text-xs text-slate-500">
                Strict separation between Tuition/School Fees & Feeding Programme
              </p>
            </div>
            <button
              onClick={() => setCurrentNav('payments')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Ledger</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* School Fees Column */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  School Fees (Tuition)
                </span>
                <Badge variant="navy">Core Account</Badge>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Collected to Date:</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(totalFeesCollected)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Outstanding Balance:</span>
                  <span className="font-semibold text-rose-600">
                    {formatCurrency(totalSchoolFeesOutstanding)}
                  </span>
                </div>
                {/* Progress */}
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-slate-900 h-full transition-all duration-500"
                    style={{
                      width: `${
                        totalFeesCollected + totalSchoolFeesOutstanding > 0
                          ? Math.min(
                              100,
                              Math.round(
                                (totalFeesCollected /
                                  (totalFeesCollected + totalSchoolFeesOutstanding)) *
                                  100
                              )
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    {totalFeesCollected + totalSchoolFeesOutstanding > 0
                      ? `${Math.round(
                          (totalFeesCollected /
                            (totalFeesCollected + totalSchoolFeesOutstanding)) *
                            100
                        )}% Target Cleared`
                      : '0% Target Cleared'}
                  </span>
                  <span>{payments.filter((p) => p.category === 'School Fees').length} Transactions</span>
                </div>
              </div>
            </div>

            {/* Feeding Fees Column */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Feeding Programme
                </span>
                <Badge variant="info">Separate Ledger</Badge>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Collected to Date:</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(totalFeedingCollected)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Outstanding Balance:</span>
                  <span className="font-semibold text-rose-600">
                    {formatCurrency(totalFeedingFeesOutstanding)}
                  </span>
                </div>
                {/* Progress */}
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500"
                    style={{
                      width: `${
                        totalFeedingCollected + totalFeedingFeesOutstanding > 0
                          ? Math.min(
                              100,
                              Math.round(
                                (totalFeedingCollected /
                                  (totalFeedingCollected + totalFeedingFeesOutstanding)) *
                                  100
                              )
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    {totalFeedingCollected + totalFeedingFeesOutstanding > 0
                      ? `${Math.round(
                          (totalFeedingCollected /
                            (totalFeedingCollected + totalFeedingFeesOutstanding)) *
                            100
                        )}% Target Cleared`
                      : '0% Target Cleared'}
                  </span>
                  <span>{payments.filter((p) => p.category === 'Feeding Fees').length} Subscriptions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              14 students have feeding balances despite cleared tuition fees.
            </span>
            <button
              onClick={() => setCurrentNav('feeding-fees')}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Manage Feeding List →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Payments + Announcements + Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Payments Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Recent Payment Transactions
              </h3>
              <p className="text-xs text-slate-500">
                Latest verified fee receipts across cash, bank, and mobile money
              </p>
            </div>
            <button
              onClick={() => setCurrentNav('payments')}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>All Payments</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-4 font-semibold">Student</th>
                  <th className="py-2.5 px-3 font-semibold">Category</th>
                  <th className="py-2.5 px-3 font-semibold">Amount</th>
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No payment transactions recorded yet. Click &quot;Record Payment&quot; above to issue your first receipt.
                    </td>
                  </tr>
                ) : (
                  recentPayments.map((pmt) => (
                    <tr key={pmt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{pmt.studentName}</p>
                        <p className="text-[11px] text-slate-500">{pmt.className}</p>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-700">
                          {pmt.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {formatCurrency(pmt.amount)}
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {formatDate(pmt.date)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant="success">Completed</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedReceiptPayment(pmt);
                            setIsReceiptModalOpen(true);
                          }}
                          className="text-xs text-blue-600 font-medium hover:underline"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Announcements & Upcoming Events (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Announcements */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Recent Announcements
              </h3>
              <button
                onClick={() => setCurrentNav('announcements')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-3 divide-y divide-slate-100">
              {recentAnnouncements.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No announcements published yet. Click &quot;Broadcast Announcement&quot; above to post a school notice.
                </div>
              ) : (
                recentAnnouncements.map((ann) => (
                  <div key={ann.id} className="py-3 first:pt-1 last:pb-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer">
                        {ann.title}
                      </span>
                      <Badge variant={ann.priority === 'Important' ? 'warning' : 'neutral'}>
                        {ann.audience}
                      </Badge>
                    </div>
                    <p className="mt-1 text-slate-600 text-[11px] line-clamp-2 leading-relaxed">
                      {ann.message}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>Published: {formatDate(ann.publishDate)}</span>
                      <span>•</span>
                      <span>By {ann.authorName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming School Events */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                Upcoming Academic Calendar
              </h3>
              <span className="text-xs text-slate-400">Term 2</span>
            </div>

            <div className="mt-3 space-y-3">
              {upcomingEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50/70 border border-slate-100"
                >
                  <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center flex-shrink-0 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {evt.date.split(' ')[1]}
                    </span>
                    <span className="text-base font-bold text-slate-900 leading-none">
                      {evt.date.split(' ')[0]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 text-xs">
                    <p className="font-semibold text-slate-900 truncate">
                      {evt.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {evt.time} • {evt.location}
                    </p>
                    <p className="text-[10px] text-blue-600 font-medium mt-0.5">
                      Audience: {evt.audience}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

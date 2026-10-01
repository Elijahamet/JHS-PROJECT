import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Save,
  CheckCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { AttendanceRecord } from '../../types';

export const AttendanceView: React.FC = () => {
  const { classes, students, attendance, saveClassAttendance } = useApp();

  const [selectedClassId, setSelectedClassId] = useState('cls_jhs2a');
  const [selectedDate, setSelectedDate] = useState('2025-02-04');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const selectedClass =
    classes.find((c) => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter(
    (s) => s.className === selectedClass.name
  );

  // Local state for taking attendance
  const [rosterStatus, setRosterStatus] = useState<
    Record<string, AttendanceRecord['status']>
  >(() => {
    const initial: Record<string, AttendanceRecord['status']> = {};
    classStudents.forEach((s) => {
      const existing = attendance.find((a) => a.studentId === s.id);
      initial[s.id] = existing ? existing.status : 'Present';
    });
    return initial;
  });

  const handleStatusChange = (
    studentId: string,
    status: AttendanceRecord['status']
  ) => {
    setRosterStatus((prev) => ({
      ...prev,
      [studentId]: status,
    }));
    setIsSavedNotice(false);
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, AttendanceRecord['status']> = {};
    classStudents.forEach((s) => {
      updated[s.id] = 'Present';
    });
    setRosterStatus(updated);
    setIsSavedNotice(false);
  };

  const handleSave = () => {
    const records: AttendanceRecord[] = classStudents.map((s) => ({
      id: `att_${s.id}_${selectedDate}`,
      studentId: s.id,
      studentName: `${s.firstName} ${s.lastName}`,
      classId: selectedClass.id,
      className: selectedClass.name,
      date: selectedDate,
      status: rosterStatus[s.id] || 'Present',
    }));

    saveClassAttendance(selectedClass.id, records);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 4000);
  };

  // Calculate live statistics
  const presentCount = classStudents.filter(
    (s) => (rosterStatus[s.id] || 'Present') === 'Present'
  ).length;
  const absentCount = classStudents.filter(
    (s) => rosterStatus[s.id] === 'Absent'
  ).length;
  const lateCount = classStudents.filter(
    (s) => rosterStatus[s.id] === 'Late'
  ).length;
  const excusedCount = classStudents.filter(
    (s) => rosterStatus[s.id] === 'Excused'
  ).length;

  const total = classStudents.length;
  const rate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : '100.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Daily Attendance Register
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Take roll, record late arrivals or excused absences, and submit to school administration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={CheckCheck}
            onClick={handleMarkAllPresent}
          >
            Mark All Present
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={Save}
            onClick={handleSave}
          >
            Save & Submit Attendance
          </Button>
        </div>
      </div>

      {/* Saved Toast Notice */}
      {isSavedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800 animate-fadeIn">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Attendance records for <strong>{selectedClass.name}</strong> on{' '}
              {selectedDate} successfully saved to central database!
            </span>
          </div>
          <span className="text-[11px] text-emerald-600">Rate: {rate}%</span>
        </div>
      )}

      {/* Control bar: Class select + Date select + Live stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Select Class
              </label>
              <select
                value={selectedClassId}
                onChange={(e) => {
                  setSelectedClassId(e.target.value);
                  setIsSavedNotice(false);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white font-medium"
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} ({cls.stage})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">
                Attendance Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setIsSavedNotice(false);
                }}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Class Teacher: <strong>{selectedClass.classTeacherName}</strong>
            </span>
            <span>Room: {selectedClass.roomNumber}</span>
          </div>
        </div>

        {/* Live Attendance Statistics for selected class */}
        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs flex items-center justify-between text-xs">
          <div className="grid grid-cols-4 gap-3 w-full text-center">
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
              <span className="text-[11px] text-emerald-800 block">Present</span>
              <span className="text-base font-bold text-emerald-900">
                {presentCount}
              </span>
            </div>
            <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-100">
              <span className="text-[11px] text-rose-800 block">Absent</span>
              <span className="text-base font-bold text-rose-900">
                {absentCount}
              </span>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100">
              <span className="text-[11px] text-amber-800 block">Late</span>
              <span className="text-base font-bold text-amber-900">
                {lateCount}
              </span>
            </div>
            <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-[11px] text-blue-800 block">Attendance Rate</span>
              <span className="text-base font-bold text-blue-900">
                {rate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Roll Call Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {selectedClass.name} Student Roster ({classStudents.length} Students)
            </h3>
            <p className="text-[11px] text-slate-500">
              Click status chip to mark individual student attendance
            </p>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Date: {selectedDate}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Student ID</th>
                <th className="py-2.5 px-4 font-semibold">Student Name</th>
                <th className="py-2.5 px-3 font-semibold">Gender</th>
                <th className="py-2.5 px-4 font-semibold text-center">Status</th>
                <th className="py-2.5 px-4 font-semibold">Remarks / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No students currently enrolled in {selectedClass.name}. Enroll students in this class to record their daily attendance.
                  </td>
                </tr>
              ) : (
                classStudents.map((s) => {
                  const currentStatus = rosterStatus[s.id] || 'Present';
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-slate-700">
                        {s.studentId}
                      </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.photoUrl}
                          alt={s.firstName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <span>
                          {s.firstName} {s.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{s.gender}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        {(['Present', 'Absent', 'Late', 'Excused'] as const).map(
                          (status) => {
                            const isSelected = currentStatus === status;
                            let style = 'bg-slate-100 text-slate-600 hover:bg-slate-200';
                            if (isSelected) {
                              if (status === 'Present')
                                style = 'bg-emerald-600 text-white font-bold shadow-xs';
                              else if (status === 'Absent')
                                style = 'bg-rose-600 text-white font-bold shadow-xs';
                              else if (status === 'Late')
                                style = 'bg-amber-600 text-white font-bold shadow-xs';
                              else if (status === 'Excused')
                                style = 'bg-blue-600 text-white font-bold shadow-xs';
                            }

                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(s.id, status)}
                                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${style}`}
                              >
                                {status}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {currentStatus === 'Late' && (
                        <span className="text-amber-700 font-medium">
                          Late arrival noted
                        </span>
                      )}
                      {currentStatus === 'Absent' && (
                        <span className="text-rose-700 font-medium">
                          Unexcused absence
                        </span>
                      )}
                      {currentStatus === 'Excused' && (
                        <span className="text-blue-700 font-medium">
                          Parent communicated permission
                        </span>
                      )}
                      {currentStatus === 'Present' && (
                        <span className="text-slate-400">Regular</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  Eye,
  Receipt,
  Download,
  Printer,
  X,
  Users,
  GraduationCap,
  CreditCard,
  Sparkles,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Pagination } from '../common/Pagination';
import { EmptyState } from '../common/EmptyState';
import { formatCurrency } from '../../utils/formatters';

interface StudentsListViewProps {
  onSelectStudent: (studentId: string) => void;
}

export const StudentsListView: React.FC<StudentsListViewProps> = ({
  onSelectStudent,
}) => {
  const {
    students,
    classes,
    deleteStudent,
    setIsAddStudentOpen,
    setIsRecordPaymentOpen,
    selectedClassFilter,
    setSelectedClassFilter,
    hasStudentDraft,
    studentDraft,
    clearStudentDraft,
  } = useApp();

  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(selectedClassFilter || 'ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Keep in sync with global class filter from classes view
  useEffect(() => {
    if (selectedClassFilter) {
      setSelectedClass(selectedClassFilter);
    }
  }, [selectedClassFilter]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.parentName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchClass =
        selectedClass === 'ALL' || s.className === selectedClass;

      const matchGender =
        selectedGender === 'ALL' || s.gender === selectedGender;

      const matchStatus =
        selectedStatus === 'ALL' || s.status === selectedStatus;

      return matchSearch && matchClass && matchGender && matchStatus;
    });
  }, [students, searchTerm, selectedClass, selectedGender, selectedStatus]);

  // Total Pages
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;

  // Current page students
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Quick statistics
  const totalEnrolled = students.length;
  const boysCount = filteredStudents.filter((s) => s.gender === 'Male').length;
  const girlsCount = filteredStudents.filter((s) => s.gender === 'Female').length;
  const arrearsCount = filteredStudents.filter((s) => s.schoolFeeBalance > 0).length;

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Student ID',
      'First Name',
      'Last Name',
      'Gender',
      'Class',
      'Guardian Name',
      'Guardian Phone',
      'Guardian Email',
      'Tuition Balance (GHS)',
      'Feeding Balance (GHS)',
      'Attendance Rate (%)',
      'Status',
    ];

    const rows = filteredStudents.map((s) => [
      `"${s.studentId}"`,
      `"${s.firstName}"`,
      `"${s.lastName}"`,
      `"${s.gender}"`,
      `"${s.className}"`,
      `"${s.parentName}"`,
      `"${s.parentPhone}"`,
      `"${s.parentEmail || ''}"`,
      s.schoolFeeBalance,
      s.feedingFeeBalance,
      s.attendanceRate,
      `"${s.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SchoolOS_Students_${selectedClass === 'ALL' ? 'All' : selectedClass.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Roster
  const handlePrint = () => {
    window.print();
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedClass('ALL');
    setSelectedClassFilter('ALL');
    setSelectedGender('ALL');
    setSelectedStatus('ALL');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedClass !== 'ALL' ||
    selectedGender !== 'ALL' ||
    selectedStatus !== 'ALL';

  return (
    <div className="space-y-4">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Students Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage comprehensive student profiles, class rosters, guardians, and fee status.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            icon={Download}
            onClick={handleExportCSV}
            title="Download student roster as CSV"
          >
            Export CSV
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon={Printer}
            onClick={handlePrint}
            title="Print roster view"
          >
            Print
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddStudentOpen(true)}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* Active Unfinished Draft Recovery Alert */}
      {hasStudentDraft && (
        <div className="p-4 bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-amber-50/80 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                You have an unsaved student enrollment draft in progress
                {studentDraft.firstName ? `: "${studentDraft.firstName} ${studentDraft.lastName}"` : ''}
              </p>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                All information you entered has been automatically preserved in memory. You can resume anytime or discard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={clearStudentDraft}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-rose-600 font-semibold text-xs bg-white/70 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <Button
              size="sm"
              variant="primary"
              icon={UserPlus}
              onClick={() => setIsAddStudentOpen(true)}
            >
              Resume Enrollment
            </Button>
          </div>
        </div>
      )}

      {/* Quick Stats Summary Pills */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
          Total Directory: <strong>{totalEnrolled}</strong>
        </span>
        <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-800 font-medium">
          Showing: <strong>{filteredStudents.length}</strong>
        </span>
        <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 font-medium">
          Boys: <strong>{boysCount}</strong>
        </span>
        <span className="px-2.5 py-1 bg-violet-50 border border-violet-200 rounded-lg text-violet-800 font-medium">
          Girls: <strong>{girlsCount}</strong>
        </span>
        <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-medium">
          With Fee Arrears: <strong>{arrearsCount}</strong>
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Reset Filters
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
          {/* Search box */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by student name, ID, or guardian..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>

          {/* Class Filter */}
          <div>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedClassFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white font-medium"
            >
              <option value="ALL">All Classes & Streams</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name} ({cls.stage})
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <select
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Enrollment Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="py-12">
            <EmptyState
              title="No students match the selected criteria"
              description="Try adjusting your search keywords or resetting your class and status filters."
              actionLabel="Reset All Filters"
              onAction={handleClearFilters}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-3">Class / Stream</th>
                  <th className="py-3 px-3">Guardian Info</th>
                  <th className="py-3 px-3">Tuition Arrears</th>
                  <th className="py-3 px-3">Feeding Arrears</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {paginatedStudents.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => onSelectStudent(student.id)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photoUrl}
                          alt={student.firstName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {student.studentId} • {student.gender}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={student.stage === 'JHS' ? 'navy' : student.stage === 'Kindergarten' ? 'warning' : 'info'}>
                        {student.className}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-900">
                        {student.parentName}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {student.parentPhone}
                      </p>
                    </td>
                    <td className="py-3 px-3">
                      {student.schoolFeeBalance === 0 ? (
                        <span className="text-emerald-700 font-semibold">
                          GH₵ 0.00
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold">
                          {formatCurrency(student.schoolFeeBalance)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {student.feedingFeeBalance === 0 ? (
                        <span className="text-emerald-700 font-semibold">
                          GH₵ 0.00
                        </span>
                      ) : (
                        <span className="text-amber-700 font-bold">
                          {formatCurrency(student.feedingFeeBalance)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <Badge
                        variant={
                          student.status === 'Active' ? 'success' : 'neutral'
                        }
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectStudent(student.id)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsRecordPaymentOpen(true)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Record Payment"
                        >
                          <Receipt className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setStudentToDelete(student);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Student Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredStudents.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Delete Student Record?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Are you sure you want to permanently remove <strong className="text-slate-900 font-semibold">{studentToDelete.firstName} {studentToDelete.lastName}</strong> (<span className="font-mono text-slate-500">{studentToDelete.studentId}</span>) from <strong className="text-slate-900">{studentToDelete.className}</strong>?
              </p>
              <div className="mt-3 bg-rose-50/70 border border-rose-100 rounded-lg p-3 text-[11px] text-rose-800 leading-relaxed">
                This will permanently delete the student's profile, disenroll them from class registers, wipe all their recorded tuition &amp; feeding fee transactions, and delete/unlink their parent account.
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setStudentToDelete(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteStudent(studentToDelete.id);
                    setStudentToDelete(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

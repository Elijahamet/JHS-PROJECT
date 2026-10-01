import React, { useState, useMemo } from 'react';
import {
  Search,
  UserPlus,
  Filter,
  Eye,
  Receipt,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
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
    setIsAddStudentOpen,
    setIsRecordPaymentOpen,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

        <div className="flex items-center gap-2">
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
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Classes</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.name}>
                  {cls.name}
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
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Graduated">Graduated</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        {paginatedStudents.length === 0 ? (
          <EmptyState
            title="No students found"
            description="No student records match the active search and filter criteria."
            icon={Filter}
            actionLabel="Clear Filters"
            onAction={() => {
              setSearchTerm('');
              setSelectedClass('ALL');
              setSelectedGender('ALL');
              setSelectedStatus('ALL');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Student ID</th>
                  <th className="py-3 px-4 font-semibold">Student Name</th>
                  <th className="py-3 px-3 font-semibold">Class</th>
                  <th className="py-3 px-3 font-semibold">Gender</th>
                  <th className="py-3 px-4 font-semibold">Parent / Contact</th>
                  <th className="py-3 px-3 font-semibold">School Fees</th>
                  <th className="py-3 px-3 font-semibold">Feeding Fees</th>
                  <th className="py-3 px-3 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectStudent(student.id)}
                  >
                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {student.studentId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photoUrl}
                          alt={student.firstName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-blue-600">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Adm: {student.admissionYear}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800">
                        {student.className}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {student.gender}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-800 font-medium">{student.parentName}</p>
                      <p className="text-[11px] text-slate-500">{student.parentPhone}</p>
                    </td>
                    <td className="py-3 px-3">
                      {student.schoolFeeBalance === 0 ? (
                        <span className="text-emerald-700 font-semibold">
                          GH₵ 0.00
                        </span>
                      ) : (
                        <span className="text-rose-600 font-bold">
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
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsRecordPaymentOpen(true)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Record Payment"
                        >
                          <Receipt className="w-4 h-4" />
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
    </div>
  );
};

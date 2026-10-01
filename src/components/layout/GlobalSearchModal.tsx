import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  GraduationCap,
  Users,
  Briefcase,
  Receipt,
  UserPlus,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    students,
    parents,
    teachers,
    payments,
    applications,
    setCurrentNav,
    setSelectedStudentId,
    setSelectedReceiptPayment,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();

    const matchedStudents = students
      .filter(
        (s) =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.className.toLowerCase().includes(q)
      )
      .slice(0, 4);

    const matchedParents = parents
      .filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const matchedTeachers = teachers
      .filter(
        (t) =>
          t.fullName.toLowerCase().includes(q) ||
          t.staffId.toLowerCase().includes(q) ||
          t.subjectsAssigned.some((s) => s.toLowerCase().includes(q))
      )
      .slice(0, 3);

    const matchedPayments = payments
      .filter(
        (p) =>
          p.receiptNumber.toLowerCase().includes(q) ||
          p.studentName.toLowerCase().includes(q) ||
          p.reference.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const matchedApplications = applications
      .filter(
        (a) =>
          a.applicantFirstName.toLowerCase().includes(q) ||
          a.applicantLastName.toLowerCase().includes(q) ||
          a.applicationId.toLowerCase().includes(q)
      )
      .slice(0, 3);

    const totalCount =
      matchedStudents.length +
      matchedParents.length +
      matchedTeachers.length +
      matchedPayments.length +
      matchedApplications.length;

    return {
      totalCount,
      students: matchedStudents,
      parents: matchedParents,
      teachers: matchedTeachers,
      payments: matchedPayments,
      applications: matchedApplications,
    };
  }, [searchQuery, students, parents, teachers, payments, applications]);

  if (!isGlobalSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsGlobalSearchOpen(false)}
      />

      <div className="flex min-h-full items-start justify-center p-4 pt-16 sm:p-0 sm:pt-24 text-center">
        <div
          className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all w-full max-w-xl border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-slate-200">
            <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across students, parents, teachers, receipts, applications..."
              className="w-full py-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-3 text-xs">
            {!searchQuery.trim() ? (
              <div className="p-8 text-center text-slate-400">
                <p>Type keywords to search school records...</p>
                <p className="text-[11px] mt-1 text-slate-400">
                  Try &quot;Kwame&quot;, &quot;JHS 2A&quot;, &quot;Boateng&quot;, or &quot;Receipt&quot;
                </p>
              </div>
            ) : searchResults?.totalCount === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p className="font-semibold text-slate-700">No records found</p>
                <p className="text-[11px] mt-1 text-slate-400">
                  No matching students, parents, staff, or payments for &quot;{searchQuery}&quot;
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Students */}
                {searchResults!.students.length > 0 && (
                  <div>
                    <h5 className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Students
                    </h5>
                    <div className="space-y-1">
                      {searchResults!.students.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            setSelectedStudentId(s.id);
                            setCurrentNav('students');
                            setIsGlobalSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                              <GraduationCap className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {s.firstName} {s.lastName}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {s.studentId} • {s.className}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Parents */}
                {searchResults!.parents.length > 0 && (
                  <div>
                    <h5 className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Parents
                    </h5>
                    <div className="space-y-1">
                      {searchResults!.parents.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            setCurrentNav('parents');
                            setIsGlobalSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                              <Users className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{p.fullName}</p>
                              <p className="text-[11px] text-slate-500">
                                {p.phone} • {p.childrenNames.join(', ')}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payments */}
                {searchResults!.payments.length > 0 && (
                  <div>
                    <h5 className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Payments & Receipts
                    </h5>
                    <div className="space-y-1">
                      {searchResults!.payments.map((pmt) => (
                        <div
                          key={pmt.id}
                          onClick={() => {
                            setSelectedReceiptPayment(pmt);
                            setCurrentNav('receipts');
                            setIsGlobalSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                              <Receipt className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {pmt.receiptNumber} — {pmt.studentName}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                GH₵ {pmt.amount.toFixed(2)} • {pmt.category}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications */}
                {searchResults!.applications.length > 0 && (
                  <div>
                    <h5 className="px-2 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Admissions
                    </h5>
                    <div className="space-y-1">
                      {searchResults!.applications.map((app) => (
                        <div
                          key={app.id}
                          onClick={() => {
                            setCurrentNav('admissions');
                            setIsGlobalSearchOpen(false);
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer group transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                              <UserPlus className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {app.applicantFirstName} {app.applicantLastName}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                {app.applicationId} • Applying for {app.applyingForClass}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>Press ESC to close</span>
            <span>Tab to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

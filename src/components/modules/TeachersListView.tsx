import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, Award, BookOpen, MessageSquare, Trash2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const TeachersListView: React.FC = () => {
  const {
    teachers,
    deleteTeacher,
    setIsAddTeacherOpen,
    openChatWith,
    setCurrentNav,
    teacherDraft,
    clearTeacherDraft,
    hasTeacherDraft,
  } = useApp();
  const [search, setSearch] = useState('');
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter(
    (t) =>
      t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.staffId.toLowerCase().includes(search.toLowerCase()) ||
      t.subjectsAssigned.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Teachers & Academic Staff
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage instructional staff profiles, class teacher appointments, and subject allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={MessageSquare}
            onClick={() => setCurrentNav('communications')}
          >
            Open Chat Hub
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddTeacherOpen(true)}
          >
            {hasTeacherDraft ? 'Resume Teacher Draft' : 'Add Teacher'}
          </Button>
        </div>
      </div>

      {/* Active Unfinished Draft Recovery Alert */}
      {hasTeacherDraft && (
        <div className="p-4 bg-gradient-to-r from-amber-50/90 via-orange-50/40 to-amber-50/80 border border-amber-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-slate-900">
                You have an unsaved teacher profile draft in progress
                {teacherDraft.fullName ? `: "${teacherDraft.fullName}"` : ''}
              </p>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                All information you entered has been automatically preserved. You can resume anytime or discard.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={clearTeacherDraft}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-rose-600 font-semibold text-xs bg-white/70 transition-colors cursor-pointer"
            >
              Discard
            </button>
            <Button
              size="sm"
              variant="primary"
              icon={UserPlus}
              onClick={() => setIsAddTeacherOpen(true)}
            >
              Resume Profile
            </Button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by teacher name, ID, or subject..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Teachers Grid */}
      {filteredTeachers.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-xl p-8 text-center text-slate-400">
          No teachers registered yet. Click &quot;Add Teacher&quot; to onboard faculty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredTeachers.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{t.fullName}</h3>
                    <Badge variant={t.status === 'Active' ? 'success' : 'neutral'}>
                      {t.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    ID: {t.staffId}
                  </p>
                </div>

                {t.isClassTeacherOf && (
                  <Badge variant="navy">
                    Class Teacher: {t.isClassTeacherOf}
                  </Badge>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.qualification}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.email}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Subjects Assigned
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {t.subjectsAssigned.map((sub, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Classes Taught
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {t.classesAssigned.map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[11px] rounded font-semibold border border-blue-200/60"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Joined {t.joinDate}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTeacherToDelete(t)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Teacher"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Button
                    size="sm"
                    variant="outline"
                    icon={MessageSquare}
                    onClick={() => openChatWith(t.id)}
                  >
                    Chat
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {teacherToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Delete Teacher Profile?
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Are you sure you want to permanently remove <strong className="text-slate-900 font-semibold">{teacherToDelete.fullName}</strong> (<span className="font-mono text-slate-500">{teacherToDelete.staffId}</span>) from the academic staff?
              </p>
              <div className="mt-3 bg-rose-50/70 border border-rose-100 rounded-lg p-3 text-[11px] text-rose-800 leading-relaxed">
                This will disassociate them from any assigned class streams {teacherToDelete.isClassTeacherOf ? `(Class Teacher of ${teacherToDelete.isClassTeacherOf})` : ''} and remove their profile from faculty records.
              </div>

              <div className="mt-6 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setTeacherToDelete(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteTeacher(teacherToDelete.id);
                    setTeacherToDelete(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

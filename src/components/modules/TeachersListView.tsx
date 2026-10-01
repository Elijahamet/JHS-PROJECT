import React, { useState } from 'react';
import { Search, UserPlus, Phone, Mail, Award, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const TeachersListView: React.FC = () => {
  const { teachers, setIsAddTeacherOpen } = useApp();
  const [search, setSearch] = useState('');

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

        <Button
          size="sm"
          variant="primary"
          icon={UserPlus}
          onClick={() => setIsAddTeacherOpen(true)}
        >
          Add Teacher
        </Button>
      </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

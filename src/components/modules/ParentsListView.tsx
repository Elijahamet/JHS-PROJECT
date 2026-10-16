import React, { useState } from 'react';
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Users,
  MessageSquare,
  Bell,
  UserPlus,
  ShieldCheck,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export const ParentsListView: React.FC = () => {
  const {
    parents,
    students,
    setCurrentNav,
    setSelectedStudentId,
    openChatWith,
    setIsSendParentNotificationOpen,
    setIsAddStudentOpen,
  } = useApp();

  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'multi' | 'single'>('all');

  // Multi-ward metrics
  const totalParents = parents.length;
  const multiWardParents = parents.filter(
    (p) => (p.childrenIds?.length || 0) > 1 || (p.childrenNames?.length || 0) > 1
  );
  const singleWardParents = parents.filter(
    (p) => (p.childrenIds?.length || 0) <= 1 && (p.childrenNames?.length || 0) <= 1
  );
  const totalEnrolledWards = parents.reduce(
    (acc, p) => acc + Math.max(p.childrenIds?.length || 0, p.childrenNames?.length || 0),
    0
  );

  // Filtered parent records
  const filteredParents = parents.filter((p) => {
    const term = search.toLowerCase();
    const matchesSearch =
      p.fullName.toLowerCase().includes(term) ||
      p.phone.includes(term) ||
      p.email.toLowerCase().includes(term) ||
      (p.childrenNames && p.childrenNames.some((c) => c.toLowerCase().includes(term)));

    if (!matchesSearch) return false;

    const count = Math.max(p.childrenIds?.length || 0, p.childrenNames?.length || 0);
    if (filterMode === 'multi') return count > 1;
    if (filterMode === 'single') return count <= 1;
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Parents & Guardians Directory
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {totalParents} Registered
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Auto-synced registry for parent accounts, multi-ward family detection, fee accounts, and PTA communication.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            size="sm"
            variant="outline"
            icon={MessageSquare}
            onClick={() => setCurrentNav('communications')}
          >
            Chat Hub
          </Button>
          <Button
            size="sm"
            variant="outline"
            icon={Bell}
            onClick={() => setIsSendParentNotificationOpen(true)}
          >
            Broadcast
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={UserPlus}
            onClick={() => setIsAddStudentOpen(true)}
          >
            Enroll Student / Link Parent
          </Button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Parents</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{totalParents}</span>
            <span className="text-[11px] text-slate-500 font-medium">accounts</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Directly registered on system</p>
        </div>

        <div className="bg-white border border-amber-200/90 rounded-xl p-4 shadow-2xs bg-gradient-to-br from-amber-50/40 to-white">
          <div className="flex items-center justify-between text-amber-800">
            <span className="text-xs font-semibold uppercase tracking-wider">Multi-Ward Families</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-950">{multiWardParents.length}</span>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
              2+ Wards
            </span>
          </div>
          <p className="text-[11px] text-amber-700/80 mt-1">Identified sibling networks</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Single-Ward Parents</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{singleWardParents.length}</span>
            <span className="text-[11px] text-slate-500 font-medium">parents</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">1 enrolled ward</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Enrolled Wards</span>
            <GraduationCap className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-blue-900">{totalEnrolledWards}</span>
            <span className="text-[11px] text-slate-500 font-medium">students</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Linked to parent records</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search parent name, phone, email, or ward student..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Parents ({totalParents})
          </button>
          <button
            onClick={() => setFilterMode('multi')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              filterMode === 'multi'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200/70'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Multi-Ward Families ({multiWardParents.length})</span>
          </button>
          <button
            onClick={() => setFilterMode('single')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filterMode === 'single'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Single Ward ({singleWardParents.length})
          </button>
        </div>
      </div>

      {/* Parents Cards Grid */}
      {filteredParents.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <Users className="w-6 h-6" />
          </div>
          {parents.length === 0 ? (
            <div>
              <h3 className="text-sm font-bold text-slate-900">No Parents Registered Yet</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Parents are automatically registered on the system as soon as an admin enrolls a student with parent details.
              </p>
              <div className="mt-4">
                <Button
                  size="sm"
                  variant="primary"
                  icon={UserPlus}
                  onClick={() => setIsAddStudentOpen(true)}
                >
                  Enroll First Student & Register Parent
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-sm font-bold text-slate-900">No Matching Parent Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                No parents matched your current search &ldquo;{search}&rdquo; or selected filter.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setFilterMode('all');
                }}
                className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
              >
                Clear search & filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParents.map((parent) => {
            const wardCount = Math.max(
              parent.childrenIds?.length || 0,
              parent.childrenNames?.length || 0
            );
            const isMultiWard = wardCount > 1;

            return (
              <div
                key={parent.id}
                className={`bg-white border rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4 transition-all duration-150 ${
                  isMultiWard
                    ? 'border-amber-200/90 hover:border-amber-400 ring-1 ring-amber-100/80'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm tracking-tight">
                        {parent.fullName}
                      </h3>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Badge variant="navy">{parent.relationship}</Badge>

                        {/* Multi-Ward / Single Ward Indicator Badge */}
                        {isMultiWard ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <Users className="w-3 h-3 text-amber-700" />
                            Multi-Ward ({wardCount} Students)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            Single Ward
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Outstanding Due
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          parent.totalBalanceDue === 0
                            ? 'text-emerald-700'
                            : 'text-rose-600'
                        }`}
                      >
                        {formatCurrency(parent.totalBalanceDue)}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Ward System Identification Callout Banner */}
                  {isMultiWard && (
                    <div className="mt-3 px-3 py-2 rounded-lg bg-amber-50/80 border border-amber-200/80 flex items-start gap-2 text-xs text-amber-950">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[11px] text-amber-950 flex items-center gap-1">
                          <span>Multi-Ward Sibling Network</span>
                          <Sparkles className="w-3 h-3 text-amber-600" />
                        </p>
                        <p className="text-[10px] text-amber-800 leading-snug mt-0.5">
                          Parent has {wardCount} students enrolled. System unified account and fee ledger.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800">{parent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{parent.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{parent.residentialAddress}</span>
                    </div>
                  </div>

                  {/* Linked Wards Section */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-slate-400" />
                        <span>Linked Wards ({wardCount})</span>
                      </span>
                      {isMultiWard && (
                        <span className="text-[10px] font-semibold text-amber-700">
                          Sibling Group
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {parent.childrenNames?.map((childName, idx) => {
                        const childId = parent.childrenIds?.[idx];
                        // Match student object to show current class
                        const studentObj = students.find(
                          (s) =>
                            (childId && s.id === childId) ||
                            `${s.firstName} ${s.lastName}`.toLowerCase() === childName.toLowerCase()
                        );

                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const targetId = studentObj?.id || childId;
                              if (targetId) {
                                setSelectedStudentId(targetId);
                                setCurrentNav('students');
                              }
                            }}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                              isMultiWard
                                ? 'bg-amber-50/60 hover:bg-amber-100/80 text-amber-950 border-amber-200/70'
                                : 'bg-blue-50/80 hover:bg-blue-100 text-blue-800 border-blue-200/70'
                            }`}
                            title="Click to view student profile"
                          >
                            <span className="font-semibold">{childName}</span>
                            {studentObj && (
                              <span className="text-[10px] opacity-75 font-normal">
                                ({studentObj.className})
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 truncate max-w-[120px] text-[11px]">
                    {parent.occupation || 'Parent / Guardian'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      icon={Bell}
                      onClick={() => setIsSendParentNotificationOpen(true)}
                    >
                      Notify
                    </Button>
                    <Button
                      size="sm"
                      variant="primary"
                      icon={MessageSquare}
                      onClick={() => openChatWith(parent.id)}
                    >
                      Chat
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

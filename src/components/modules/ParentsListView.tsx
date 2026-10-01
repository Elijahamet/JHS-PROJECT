import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export const ParentsListView: React.FC = () => {
  const { parents, setCurrentNav, setSelectedStudentId } = useApp();
  const [search, setSearch] = useState('');

  const filteredParents = parents.filter(
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.childrenNames.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Parents & Guardians Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage parent contacts, linked wards, fee balances, and PTA communication.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search parent name, phone, email, or student..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Parents Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParents.map((parent) => (
          <div
            key={parent.id}
            className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {parent.fullName}
                  </h3>
                  <Badge variant="navy" className="mt-1">
                    {parent.relationship}
                  </Badge>
                </div>
                <div className="text-right">
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

              <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{parent.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{parent.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{parent.residentialAddress}</span>
                </div>
              </div>

              {/* Linked Wards */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Linked Student Wards
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {parent.childrenNames.map((child, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const childId = parent.childrenIds[idx];
                        if (childId) {
                          setSelectedStudentId(childId);
                          setCurrentNav('students');
                        }
                      }}
                      className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-200/60 hover:bg-blue-100"
                    >
                      {child}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{parent.occupation}</span>
              <Button size="sm" variant="outline" icon={Phone}>
                Contact
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

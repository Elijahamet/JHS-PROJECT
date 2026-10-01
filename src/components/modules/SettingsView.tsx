import React, { useState } from 'react';
import {
  Building2,
  Shield,
  UserCheck,
  Save,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const SettingsView: React.FC = () => {
  const { currentSchool, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'school' | 'roles' | 'security'>('school');
  const [isSaved, setIsSaved] = useState(false);

  const [schoolData, setSchoolData] = useState({
    name: currentSchool.name,
    motto: currentSchool.motto,
    phone: currentSchool.phone,
    email: currentSchool.email,
    address: currentSchool.address,
    academicYear: currentSchool.academicYear,
    currentTerm: currentSchool.currentTerm,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const permissionsMatrix = [
    { module: 'Dashboard & Core Analytics', admin: true, teacher: true, accountant: true, parent: false, super: true },
    { module: 'Students Directory & Bio Data', admin: true, teacher: true, accountant: true, parent: false, super: true },
    { module: 'Attendance Taking & Rolls', admin: true, teacher: true, accountant: false, parent: false, super: true },
    { module: 'Marks & Report Cards', admin: true, teacher: true, accountant: false, parent: false, super: true },
    { module: 'School Tuition Fees & Schedules', admin: true, teacher: false, accountant: true, parent: false, super: true },
    { module: 'Feeding Programme Ledger', admin: true, teacher: false, accountant: true, parent: false, super: true },
    { module: 'Record Payments & Receipts', admin: true, teacher: false, accountant: true, parent: false, super: true },
    { module: 'School Transport & Fleet', admin: true, teacher: false, accountant: false, parent: false, super: true },
    { module: 'Admissions & Enrollment', admin: true, teacher: false, accountant: false, parent: false, super: true },
    { module: 'Inventory & SchoolStock', admin: true, teacher: false, accountant: false, parent: false, super: true },
    { module: 'Parent Portal (Child Records Only)', admin: false, teacher: false, accountant: false, parent: true, super: true },
    { module: 'Platform Multi-School Administration', admin: false, teacher: false, accountant: false, parent: false, super: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Institutional Settings & Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure school profile, academic calendar, and role-based access permissions.
          </p>
        </div>

        {activeTab === 'school' && (
          <Button size="sm" variant="primary" icon={Save} onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            School institutional configuration updated successfully.
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 text-xs border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('school')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeTab === 'school'
              ? 'bg-slate-900 text-white font-bold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          School Profile
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeTab === 'roles'
              ? 'bg-slate-900 text-white font-bold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Roles & Permissions Matrix
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            activeTab === 'security'
              ? 'bg-slate-900 text-white font-bold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          User & Security
        </button>
      </div>

      {/* TAB 1: SCHOOL PROFILE */}
      {activeTab === 'school' && (
        <form onSubmit={handleSave} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              School Information & Institutional Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  value={schoolData.name}
                  onChange={(e) =>
                    setSchoolData({ ...schoolData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  School Motto
                </label>
                <input
                  type="text"
                  value={schoolData.motto}
                  onChange={(e) =>
                    setSchoolData({ ...schoolData, motto: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg italic"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Phone (Ghana format) *
                </label>
                <input
                  type="text"
                  value={schoolData.phone}
                  onChange={(e) =>
                    setSchoolData({ ...schoolData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Official Email
                </label>
                <input
                  type="email"
                  value={schoolData.email}
                  onChange={(e) =>
                    setSchoolData({ ...schoolData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-medium mb-1">
                  Physical Campus Address
                </label>
                <input
                  type="text"
                  value={schoolData.address}
                  onChange={(e) =>
                    setSchoolData({ ...schoolData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Academic Calendar & Term Sessions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Active Academic Year
                </label>
                <input
                  type="text"
                  value={schoolData.academicYear}
                  onChange={(e) =>
                    setSchoolData({ ...schoolData, academicYear: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Active Term
                </label>
                <select
                  value={schoolData.currentTerm}
                  onChange={(e) =>
                    setSchoolData({
                      ...schoolData,
                      currentTerm: e.target.value as 'Term 1' | 'Term 2' | 'Term 3',
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white font-medium"
                >
                  <option value="Term 1">Term 1 (First Term)</option>
                  <option value="Term 2">Term 2 (Mid-Year)</option>
                  <option value="Term 3">Term 3 (Promotional)</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: ROLES & PERMISSIONS MATRIX */}
      {activeTab === 'roles' && (
        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs text-xs">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">
              Role-Based Access Control (RBAC) Specification
            </h3>
            <p className="text-slate-500 text-[11px]">
              Strict permission boundaries enforced across teachers, accountants, administrators and parents
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px]">
                  <th className="py-3 px-4 font-semibold">Functional Module</th>
                  <th className="py-3 px-3 font-semibold text-center">Super Admin</th>
                  <th className="py-3 px-3 font-semibold text-center">School Admin</th>
                  <th className="py-3 px-3 font-semibold text-center">Teacher</th>
                  <th className="py-3 px-3 font-semibold text-center">Accountant</th>
                  <th className="py-3 px-3 font-semibold text-center">Parent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionsMatrix.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {p.module}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-emerald-700 font-bold">✓ Full</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-emerald-700 font-bold">✓ Manage</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {p.teacher ? (
                        <span className="text-blue-700 font-semibold">✓ Assigned</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {p.accountant ? (
                        <span className="text-blue-700 font-semibold">✓ Finance</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {p.parent ? (
                        <span className="text-purple-700 font-semibold">✓ Ward Only</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USER & SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-6 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Current Active Account</h3>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <p>Name: <strong>{currentUser.name}</strong></p>
              <p>Email: <strong>{currentUser.email}</strong></p>
              <p>Assigned Role: <Badge variant="navy">{currentUser.role.replace('_', ' ')}</Badge></p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900">Update Password</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
            <Button size="sm" variant="outline" icon={Lock} onClick={() => alert('Password updated')}>
              Change Password
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

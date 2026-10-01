import React from 'react';
import {
  Shield,
  Building2,
  Users,
  GraduationCap,
  CreditCard,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';

export const SuperAdminView: React.FC = () => {
  const { schools, setCurrentSchool } = useApp();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Platform Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
            SchoolOS Global SaaS Platform Control
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Multi-School Platform Administration
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tenant provisioning, license subscriptions, infrastructure telemetry, and platform activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={Building2}
            onClick={() => alert('Provision new school tenant modal')}
          >
            Provision New School
          </Button>
        </div>
      </div>

      {/* Platform-Wide Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Schools"
          value={schools.length}
          subtitle="Provisioned Tenants"
          icon={Building2}
        />
        <StatCard
          title="Active Students"
          value="1,152"
          subtitle="Across all onboarded campuses"
          icon={GraduationCap}
        />
        <StatCard
          title="Total Platform Users"
          value="1,840"
          subtitle="Teachers, Parents & Staff"
          icon={Users}
        />
        <StatCard
          title="Platform Uptime"
          value="99.98%"
          subtitle="All APIs & Cloud Database Operational"
          highlight
        />
      </div>

      {/* Tenants Roster */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Registered School Instances ({schools.length} Active Tenants)
            </h3>
            <p className="text-[11px] text-slate-500">
              Manage subscriptions, tenant configurations, and enter school workspaces
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">School Name & Domain</th>
                <th className="py-2.5 px-3 font-semibold">Location</th>
                <th className="py-2.5 px-3 font-semibold text-center">Students</th>
                <th className="py-2.5 px-3 font-semibold text-center">Staff</th>
                <th className="py-2.5 px-3 font-semibold">Subscription Plan</th>
                <th className="py-2.5 px-3 font-semibold">Current Term</th>
                <th className="py-2.5 px-4 font-semibold text-right">Switch Tenant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {schools.map((sch) => (
                <tr key={sch.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{sch.name}</p>
                    <p className="text-[11px] text-slate-400">{sch.website}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {sch.city}, {sch.region}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900">
                    {sch.studentCount}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-700">
                    {sch.teacherCount}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={sch.plan === 'Premium Enterprise' ? 'navy' : 'info'}>
                      {sch.plan}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {sch.academicYear} • {sch.currentTerm}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setCurrentSchool(sch);
                        alert(`Switched active context to ${sch.name}`);
                      }}
                    >
                      Access Console
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Platform Telemetry */}
      <div className="p-5 bg-white border border-slate-200/80 rounded-xl space-y-3 text-xs">
        <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
          Platform Security & Data Isolation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>PostgreSQL Multi-Tenant Row Level Security Active</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Automated Daily S3 Offsite Backups Completed</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Bank & MoMo Webhook Payment Endpoints Healthy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

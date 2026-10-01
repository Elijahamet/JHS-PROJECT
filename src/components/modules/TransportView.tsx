import React, { useState } from 'react';
import {
  Bus,
  Phone,
  MapPin,
  Clock,
  Play,
  CheckCircle2,
  Users,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { TransportRoute } from '../../types';

export const TransportView: React.FC = () => {
  const { buses, routes, updateRouteStatus } = useApp();

  const totalStudentsTransport = routes.reduce(
    (sum, r) => sum + r.studentCount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            School Transport & Bus Fleet (SchoolRoute)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinate student pickup points, bus fleet logistics, drivers, and daily trip statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={Bus}
            onClick={() => alert('New route setup modal')}
          >
            Add Bus Route
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Buses"
          value={buses.filter((b) => b.status === 'Active').length}
          subtitle={`${buses.length} Total Registered in Fleet`}
          icon={Bus}
        />
        <StatCard
          title="Transport Routes"
          value={routes.length}
          subtitle="Accra & Suburban Corridors"
          icon={MapPin}
        />
        <StatCard
          title="Ridership"
          value={totalStudentsTransport}
          subtitle="Enrolled bus passengers"
          icon={Users}
        />
        <StatCard
          title="Morning Trip Status"
          value="2 Completed • 1 On Route"
          subtitle="Route 1 (Madina-Adenta) on transit"
          highlight
        />
      </div>

      {/* Live Route & Trip Management Cards */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Active Routes & Live Trip Status
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {routes.map((rt) => {
            let statusVariant: 'neutral' | 'info' | 'success' = 'neutral';
            if (rt.status === 'On Route') statusVariant = 'info';
            if (rt.status === 'Completed') statusVariant = 'success';

            return (
              <div
                key={rt.id}
                className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">
                        {rt.name}
                      </span>
                      <span className="text-xs font-semibold text-blue-700">
                        {rt.busNumber} • {rt.studentCount} Students
                      </span>
                    </div>
                    <Badge variant={statusVariant}>
                      {rt.status}
                    </Badge>
                  </div>

                  {/* Driver Contact */}
                  <div className="mt-3.5 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1 text-xs">
                    <p className="text-slate-800 font-semibold">
                      Driver: {rt.driverName}
                    </p>
                    <p className="text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rt.driverPhone}</span>
                    </p>
                  </div>

                  {/* Stops List */}
                  <div className="mt-4 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Designated Pickup Stops
                    </span>
                    <div className="space-y-1">
                      {rt.stops.map((stop, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-slate-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span className="truncate">{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interactive Status Switcher (MVP Trip Tracking) */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Update Trip Progress
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {(['Not Started', 'On Route', 'Completed'] as const).map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => updateRouteStatus(rt.id, st)}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all ${
                            rt.status === st
                              ? 'bg-slate-900 text-white font-bold shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

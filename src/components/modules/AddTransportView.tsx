import React, { useState } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { Bus, MapPin, Truck, AlertCircle, PlusCircle } from 'lucide-react';

interface AddTransportViewProps {
  onBack: () => void;
}

export const AddTransportView: React.FC<AddTransportViewProps> = ({ onBack }) => {
  const {
    addTransportBus,
    addTransportRoute,
    routes,
    buses,
    setIsAddTransportOpen,
  } = useApp();

  const [tab, setTab] = useState<'vehicle' | 'route'>('vehicle');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Vehicle form
  const [vehicleData, setVehicleData] = useState({
    busNumber: '',
    registrationNumber: '',
    vehicleType: 'School Bus (Coaster)',
    capacity: 32,
    driverName: '',
    driverPhone: '',
    routeId: '',
    status: 'Active' as 'Active' | 'Maintenance' | 'Standby',
  });

  // Route form
  const [routeData, setRouteData] = useState({
    name: '',
    busNumber: '',
    driverName: '',
    driverPhone: '',
    stops: 'Campus Gate, Main Junction, Total Filling Station, Market Square',
    morningDeparture: '06:30 AM',
    afternoonDeparture: '03:45 PM',
  });

  const handleVehicleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!vehicleData.busNumber.trim()) {
      setError('Please provide a vehicle or bus identification name.');
      return;
    }

    setIsSubmitting(true);
    const matchedRoute = routes.find((r) => r.id === vehicleData.routeId);

    try {
      addTransportBus({
        busNumber: `${vehicleData.busNumber.trim()} (${vehicleData.vehicleType})`,
        registrationNumber:
          vehicleData.registrationNumber.trim() ||
          `GE-${Math.floor(1000 + Math.random() * 9000)}-24`,
        capacity: Number(vehicleData.capacity) || 30,
        driverName: vehicleData.driverName.trim() || 'Assigned Driver',
        driverPhone: vehicleData.driverPhone.trim() || '+233 24 555 0199',
        routeId: vehicleData.routeId || (routes[0]?.id || 'rt_01'),
        routeName: matchedRoute?.name || (routes[0]?.name || 'Accra Corridor'),
        status: vehicleData.status,
      });

      setIsAddTransportOpen(false);
      onBack();
    } catch (err) {
      setError('Error adding transport vehicle.');
      setIsSubmitting(false);
    }
  };

  const handleRouteSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!routeData.name.trim()) {
      setError('Please provide a route corridor name.');
      return;
    }

    setIsSubmitting(true);

    try {
      addTransportRoute({
        name: routeData.name.trim(),
        busNumber: routeData.busNumber.trim() || 'Bus 01',
        driverName: routeData.driverName.trim() || 'Assigned Route Pilot',
        driverPhone: routeData.driverPhone.trim() || '+233 24 000 0000',
        stops: routeData.stops
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        morningDeparture: routeData.morningDeparture || '06:30 AM',
        afternoonDeparture: routeData.afternoonDeparture || '03:45 PM',
        status: 'Not Started',
      });

      setIsAddTransportOpen(false);
      onBack();
    } catch (err) {
      setError('Error creating route.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="School Transport Management"
      subtitle="Register school fleet vehicles or configure commuter corridors and morning/afternoon pickup stops"
      icon={Bus}
      iconBg="from-amber-600 via-orange-600 to-amber-700"
      badgeText="Fleet Operations"
      badgeVariant="warning"
      onBack={onBack}
      backLabel="Back to Transport"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'School Transport Fleet', onClick: onBack },
        { label: tab === 'vehicle' ? 'Register Vehicle' : 'Create Route' },
      ]}
      footerSubmitLabel={tab === 'vehicle' ? 'Save & Register Bus' : 'Save & Provision Route'}
      onSubmit={tab === 'vehicle' ? handleVehicleSubmit : handleRouteSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span className="font-semibold text-xs">{error}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setTab('vehicle');
              setError('');
            }}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs transition-colors cursor-pointer ${
              tab === 'vehicle'
                ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>Register New Vehicle / Bus</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('route');
              setError('');
            }}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs transition-colors cursor-pointer ${
              tab === 'route'
                ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Create New Commuter Route</span>
          </button>
        </div>

        {tab === 'vehicle' ? (
          <form onSubmit={handleVehicleSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Bus Name / Number *
                </label>
                <input
                  type="text"
                  required
                  value={vehicleData.busNumber}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, busNumber: e.target.value })
                  }
                  placeholder="e.g. Bus 05 or Alpha Shuttle"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs bg-slate-50/50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Registration Number Plate (DVLA)
                </label>
                <input
                  type="text"
                  value={vehicleData.registrationNumber}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      registrationNumber: e.target.value,
                    })
                  }
                  placeholder="e.g. GW-4921-23"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono text-xs bg-slate-50/50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Vehicle Type
                </label>
                <select
                  value={vehicleData.vehicleType}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      vehicleType: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs"
                >
                  <option value="School Bus (Coaster)">Toyota Coaster (30-36 Seats)</option>
                  <option value="Mini-Bus (Urvan / HiAce)">Toyota HiAce / Urvan (15-18 Seats)</option>
                  <option value="Large Coach (50+ Seats)">Large Ashok Leyland Coach (50+ Seats)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  min="5"
                  max="80"
                  value={vehicleData.capacity}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      capacity: Number(e.target.value),
                    })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Assigned Driver Name
                </label>
                <input
                  type="text"
                  value={vehicleData.driverName}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, driverName: e.target.value })
                  }
                  placeholder="e.g. Uncle John Mensah"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs bg-slate-50/50 hover:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Driver Phone Number
                </label>
                <input
                  type="tel"
                  value={vehicleData.driverPhone}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, driverPhone: e.target.value })
                  }
                  placeholder="+233 24 555 0199"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs bg-slate-50/50 hover:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Assigned Primary Route
                </label>
                <select
                  value={vehicleData.routeId}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, routeId: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs font-medium"
                >
                  <option value="">-- Select Route --</option>
                  {routes.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      {rt.name} (Stops: {rt.stops.length})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRouteSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Route Corridor Name *
                </label>
                <input
                  type="text"
                  required
                  value={routeData.name}
                  onChange={(e) =>
                    setRouteData({ ...routeData, name: e.target.value })
                  }
                  placeholder="e.g. Madina - Adenta - Frafraha Corridor"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs bg-slate-50/50 hover:bg-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Morning Departure Time
                </label>
                <input
                  type="text"
                  value={routeData.morningDeparture}
                  onChange={(e) =>
                    setRouteData({ ...routeData, morningDeparture: e.target.value })
                  }
                  placeholder="06:30 AM"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Afternoon Departure Time
                </label>
                <input
                  type="text"
                  value={routeData.afternoonDeparture}
                  onChange={(e) =>
                    setRouteData({
                      ...routeData,
                      afternoonDeparture: e.target.value,
                    })
                  }
                  placeholder="03:45 PM"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 bg-white text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1.5">
                  Designated Stops & Landmarks (Comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={routeData.stops}
                  onChange={(e) =>
                    setRouteData({ ...routeData, stops: e.target.value })
                  }
                  placeholder="e.g. Campus Gate, Ritz Junction, Social Center, Adenta Market"
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs bg-slate-50/50 hover:bg-white leading-relaxed"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </FormPageLayout>
  );
};

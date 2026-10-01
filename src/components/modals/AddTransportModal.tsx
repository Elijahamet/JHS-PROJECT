import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { Bus, MapPin, Truck } from 'lucide-react';

export const AddTransportModal: React.FC = () => {
  const {
    isAddTransportOpen,
    setIsAddTransportOpen,
    addTransportBus,
    addTransportRoute,
    routes,
    buses,
  } = useApp();

  const [tab, setTab] = useState<'vehicle' | 'route'>('vehicle');

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

  const handleVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleData.busNumber.trim()) return;

    const matchedRoute = routes.find((r) => r.id === vehicleData.routeId);

    addTransportBus({
      busNumber: `${vehicleData.busNumber.trim()} (${vehicleData.vehicleType})`,
      registrationNumber: vehicleData.registrationNumber.trim() || `GE-${Math.floor(1000 + Math.random() * 9000)}-24`,
      capacity: Number(vehicleData.capacity) || 30,
      driverName: vehicleData.driverName.trim() || 'Assigned Driver',
      driverPhone: vehicleData.driverPhone.trim() || '+233 24 555 0199',
      routeId: vehicleData.routeId || (routes[0]?.id || 'rt_01'),
      routeName: matchedRoute?.name || (routes[0]?.name || 'Accra Corridor'),
      status: vehicleData.status,
    });

    setIsAddTransportOpen(false);
    setVehicleData({
      busNumber: '',
      registrationNumber: '',
      vehicleType: 'School Bus (Coaster)',
      capacity: 32,
      driverName: '',
      driverPhone: '',
      routeId: '',
      status: 'Active',
    });
  };

  const handleRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!routeData.name.trim()) return;

    const stopsArray = routeData.stops
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    addTransportRoute({
      name: routeData.name.trim(),
      busNumber: routeData.busNumber || (buses[0]?.busNumber || 'Fleet Vehicle 01'),
      driverName: routeData.driverName.trim() || (buses[0]?.driverName || 'Lead Chauffeur'),
      driverPhone: routeData.driverPhone.trim() || (buses[0]?.driverPhone || '+233 24 000 0000'),
      stops: stopsArray.length > 0 ? stopsArray : ['Campus Gate', 'Junction'],
      morningDeparture: routeData.morningDeparture,
      afternoonDeparture: routeData.afternoonDeparture,
    });

    setIsAddTransportOpen(false);
    setRouteData({
      name: '',
      busNumber: '',
      driverName: '',
      driverPhone: '',
      stops: 'Campus Gate, Main Junction, Total Filling Station, Market Square',
      morningDeparture: '06:30 AM',
      afternoonDeparture: '03:45 PM',
    });
  };

  return (
    <Modal
      isOpen={isAddTransportOpen}
      onClose={() => setIsAddTransportOpen(false)}
      title="Add School Transport Fleet & Routes"
      subtitle="Register school buses, utility trucks/vans, or configure daily pickup corridors"
      maxWidth="2xl"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddTransportOpen(false)}
          >
            Cancel
          </Button>
          {tab === 'vehicle' ? (
            <Button size="sm" onClick={handleVehicleSubmit}>
              Register Fleet Vehicle
            </Button>
          ) : (
            <Button size="sm" onClick={handleRouteSubmit}>
              Create Transport Route
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-5 text-xs">
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setTab('vehicle')}
            className={`flex items-center gap-2 pb-2.5 px-4 font-semibold text-xs transition-colors border-b-2 ${
              tab === 'vehicle'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Add Bus / Truck / Van</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('route')}
            className={`flex items-center gap-2 pb-2.5 px-4 font-semibold text-xs transition-colors border-b-2 ${
              tab === 'route'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Add Route Corridor</span>
          </button>
        </div>

        {tab === 'vehicle' ? (
          <form onSubmit={handleVehicleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Vehicle Name / Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={vehicleData.busNumber}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, busNumber: e.target.value })
                  }
                  placeholder="e.g. School Bus 04, Logistics Truck 01"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Vehicle Model / Type
                </label>
                <select
                  value={vehicleData.vehicleType}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, vehicleType: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="School Bus (Coaster)">School Bus (Toyota Coaster - 32 Pax)</option>
                  <option value="Minibus / Urvan">Minibus / Urvan (18 Pax)</option>
                  <option value="Heavy Bus (50 Pax)">Heavy Coach Bus (50 Pax)</option>
                  <option value="Logistics Truck / Pickup">Utility Truck / Pickup (Cargo & Supplies)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Registration Plate Number
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
                  placeholder="e.g. GE-4891-24"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Seating / Load Capacity (Persons)
                </label>
                <input
                  type="number"
                  min="5"
                  max="70"
                  value={vehicleData.capacity}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      capacity: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Assigned Driver Name
                </label>
                <input
                  type="text"
                  value={vehicleData.driverName}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      driverName: e.target.value,
                    })
                  }
                  placeholder="e.g. Mr. Jonathan Mensah"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Driver Phone Number
                </label>
                <input
                  type="text"
                  value={vehicleData.driverPhone}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      driverPhone: e.target.value,
                    })
                  }
                  placeholder="+233 24 555 0199"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Primary Route Assignment
                </label>
                <select
                  value={vehicleData.routeId}
                  onChange={(e) =>
                    setVehicleData({ ...vehicleData, routeId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="">Select Route Corridor</option>
                  {routes.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      {rt.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Vehicle Status
                </label>
                <select
                  value={vehicleData.status}
                  onChange={(e) =>
                    setVehicleData({
                      ...vehicleData,
                      status: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="Active">Active (In Service)</option>
                  <option value="Standby">Standby (Campus Reserve)</option>
                  <option value="Maintenance">Under Workshop Maintenance</option>
                </select>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRouteSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-medium mb-1">
                  Route Corridor Name *
                </label>
                <input
                  type="text"
                  required
                  value={routeData.name}
                  onChange={(e) =>
                    setRouteData({ ...routeData, name: e.target.value })
                  }
                  placeholder="e.g. Route 4: Spintex Road - Sakumono - Campus"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Morning Departure Time
                </label>
                <input
                  type="text"
                  value={routeData.morningDeparture}
                  onChange={(e) =>
                    setRouteData({ ...routeData, morningDeparture: e.target.value })
                  }
                  placeholder="06:30 AM"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Afternoon Departure Time
                </label>
                <input
                  type="text"
                  value={routeData.afternoonDeparture}
                  onChange={(e) =>
                    setRouteData({ ...routeData, afternoonDeparture: e.target.value })
                  }
                  placeholder="03:45 PM"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Assign Vehicle
                </label>
                <select
                  value={routeData.busNumber}
                  onChange={(e) =>
                    setRouteData({ ...routeData, busNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                >
                  <option value="">Select Existing Bus/Truck</option>
                  {buses.map((b) => (
                    <option key={b.id} value={b.busNumber}>
                      {b.busNumber} ({b.registrationNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  value={routeData.driverName}
                  onChange={(e) =>
                    setRouteData({ ...routeData, driverName: e.target.value })
                  }
                  placeholder="e.g. Uncle John"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-medium mb-1">
                  Designated Stops & Landmarks (Comma-separated)
                </label>
                <textarea
                  rows={2}
                  value={routeData.stops}
                  onChange={(e) =>
                    setRouteData({ ...routeData, stops: e.target.value })
                  }
                  placeholder="Batsonaa Total, Community 18 Junction, Texpo Market, Campus Gate"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Laptop,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatDate } from '../../utils/formatters';

export const InventoryView: React.FC = () => {
  const { inventory } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filtered = inventory.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            School Assets & Inventory (SchoolStock)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-grade registry of ICT computers, laboratory apparatus, classroom dual desks, and library texts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => alert('Add inventory asset modal')}
          >
            Add Asset Record
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Items"
          value={totalQuantity}
          subtitle="Fixed assets & materials"
          icon={Package}
        />
        <StatCard
          title="ICT Lab Computers"
          value="32 Units"
          subtitle="Dell Core i5 Laptops (Block B)"
          icon={Laptop}
        />
        <StatCard
          title="Assets in Good Condition"
          value="96.2%"
          subtitle="Annual estate audit passed"
          icon={CheckCircle2}
        />
        <StatCard
          title="Maintenance Priority"
          value="1 Item (Fair)"
          subtitle="Olympus Microscopes service"
          highlight
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search asset name, code, room location, or officer..."
              className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="ALL">All Categories</option>
              <option value="ICT Equipment">ICT Equipment</option>
              <option value="Furniture">Classroom Furniture</option>
              <option value="Science Lab">Science Lab Apparatus</option>
              <option value="Textbooks">Approved Textbooks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Asset Code</th>
                <th className="py-3 px-4 font-semibold">Item Name & Spec</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold text-center">Quantity</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-3 font-semibold">Condition</th>
                <th className="py-3 px-4 font-semibold">Custodian / Officer</th>
                <th className="py-3 px-3 font-semibold">Last Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {item.itemCode}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant="navy">{item.category}</Badge>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-900">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-3 px-4 text-slate-700">{item.location}</td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        item.condition === 'Good'
                          ? 'success'
                          : item.condition === 'Fair'
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {item.condition}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {item.responsiblePerson}
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {formatDate(item.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

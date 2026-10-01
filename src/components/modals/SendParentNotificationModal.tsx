import React, { useState } from 'react';
import {
  Bell,
  Send,
  Users,
  Smartphone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Calendar,
  CreditCard,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const SendParentNotificationModal: React.FC = () => {
  const {
    isSendParentNotificationOpen,
    setIsSendParentNotificationOpen,
    sendParentNotification,
    parents,
    classes,
  } = useApp();

  const [targetAudience, setTargetAudience] = useState<'All Parents' | 'Class' | 'Individual'>('All Parents');
  const [selectedClass, setSelectedClass] = useState('JHS 2A');
  const [selectedParentId, setSelectedParentId] = useState(parents[0]?.id || '');
  const [category, setCategory] = useState<
    'fee_reminder' | 'academic' | 'pta' | 'emergency' | 'general' | 'transport'
  >('academic');
  const [title, setTitle] = useState('Term 2 Academic Report Cards Published');
  const [message, setMessage] = useState(
    'Dear Parents & Guardians, official terminal academic report cards for Term 2 are now ready. Please log in to your parent dashboard to review subject scores and teacher evaluation.'
  );
  const [channels, setChannels] = useState<('in_app' | 'sms' | 'email')[]>(['in_app', 'sms']);
  const [priority, setPriority] = useState<'Normal' | 'Important' | 'Urgent'>('Important');
  const [isSending, setIsSending] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isSendParentNotificationOpen) return null;

  const handleChannelToggle = (channel: 'in_app' | 'sms' | 'email') => {
    if (channels.includes(channel)) {
      if (channels.length > 1) {
        setChannels(channels.filter((c) => c !== channel));
      }
    } else {
      setChannels([...channels, channel]);
    }
  };

  const handlePresetSelect = (cat: typeof category) => {
    setCategory(cat);
    switch (cat) {
      case 'academic':
        setTitle('Term 2 Academic Report Cards Published');
        setMessage(
          'Dear Parents & Guardians, official terminal academic report cards for Term 2 are now ready. Please log in to your parent dashboard to review subject scores and teacher evaluation.'
        );
        setPriority('Important');
        break;
      case 'fee_reminder':
        setTitle('Tuition & Feeding Fee Balance Reminder');
        setMessage(
          'Friendly reminder to parents with outstanding term fee balances. Kindly settle via MTN Mobile Money or Telecel Cash before the final examination week.'
        );
        setPriority('Urgent');
        break;
      case 'pta':
        setTitle('Term 2 General PTA Congress & Speech Day');
        setMessage(
          'All parents and guardians are cordially invited to our Term 2 General PTA Meeting this Friday at 3:00 PM in the School Assembly Hall. Your attendance is vital.'
        );
        setPriority('Normal');
        break;
      case 'emergency':
        setTitle('Urgent Notice: Weather Alert & Early School Closing');
        setMessage(
          'Due to heavy rainfall across the municipal area, school will close at 1:30 PM today. School buses will commence return trips immediately. Please arrange pickup.'
        );
        setPriority('Urgent');
        break;
      case 'transport':
        setTitle('Transport Notice: Bus Fleet Route Update');
        setMessage(
          'Please be informed that Bus 1 (North Legon Route) will experience a slight 15-minute delay today due to scheduled road maintenance. Pupils remain safely chaperoned.'
        );
        setPriority('Normal');
        break;
      default:
        setTitle('School Community Notice');
        setMessage('Dear Parents, please take note of the upcoming school calendar activities.');
        setPriority('Normal');
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);

    const selectedParent = parents.find((p) => p.id === selectedParentId);
    const detail =
      targetAudience === 'Class'
        ? `${selectedClass} Parents`
        : targetAudience === 'Individual'
        ? selectedParent?.fullName || 'Individual Parent'
        : 'Whole School';

    setTimeout(() => {
      sendParentNotification({
        title,
        message,
        category,
        targetAudience,
        targetDetail: detail,
        channels,
        priority,
      });

      setIsSending(false);
      setSuccessToast(`Notification successfully sent to ${targetAudience}!`);

      setTimeout(() => {
        setSuccessToast(null);
        setIsSendParentNotificationOpen(false);
      }, 1400);
    }, 600);
  };

  return (
    <Modal
      isOpen={isSendParentNotificationOpen}
      onClose={() => setIsSendParentNotificationOpen(false)}
      title="Send Parent Notification Broadcast"
      subtitle="Dispatch instant SMS alerts, in-app notices, and mobile alerts to parents"
      maxWidth="xl"
    >
      {successToast ? (
        <div className="py-12 text-center space-y-3 animate-fadeIn">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">{successToast}</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Dispatched via SMS Gateway (+233 Telco) and Parent Portal in-app notifications.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Target Audience */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              1. Target Audience
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'All Parents', label: 'All Parents', sub: `Whole School (${parents.length || 34})` },
                { id: 'Class', label: 'By Class Stream', sub: 'e.g. JHS 2A' },
                { id: 'Individual', label: 'Single Parent', sub: 'Direct Alert' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTargetAudience(t.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    targetAudience === t.id
                      ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500 shadow-2xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-slate-900">{t.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Conditional Target Selectors */}
          {targetAudience === 'Class' && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="font-semibold text-slate-700 shrink-0">Select Class:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-blue-600"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.stage})
                  </option>
                ))}
              </select>
            </div>
          )}

          {targetAudience === 'Individual' && (
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center gap-3">
              <span className="font-semibold text-slate-700 shrink-0">Select Parent:</span>
              <select
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 text-xs focus:ring-1 focus:ring-blue-600"
              >
                {parents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.fullName} ({p.phone}) — Ward: {p.childrenNames.join(', ')}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Preset Chips */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              2. Notification Category (Quick Presets)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'academic', label: 'Report Cards Ready', icon: FileSpreadsheet, color: 'text-blue-700 bg-blue-50 border-blue-200' },
                { id: 'fee_reminder', label: 'Fee Reminder', icon: CreditCard, color: 'text-amber-700 bg-amber-50 border-amber-200' },
                { id: 'pta', label: 'PTA Meeting Notice', icon: Users, color: 'text-purple-700 bg-purple-50 border-purple-200' },
                { id: 'emergency', label: 'Emergency Notice', icon: AlertTriangle, color: 'text-rose-700 bg-rose-50 border-rose-200' },
                { id: 'transport', label: 'Bus / Fleet Alert', icon: Smartphone, color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
              ].map((chip) => {
                const Icon = chip.icon;
                const isSelected = category === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => handlePresetSelect(chip.id as any)}
                    className={`px-2.5 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : `${chip.color} hover:opacity-90`
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{chip.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notification Title */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              3. Notification Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
              placeholder="e.g. Term 2 Academic Report Cards Published"
            />
          </div>

          {/* Notification Message */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              4. Message Content
            </label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed bg-slate-50/50"
              placeholder="Enter message text sent to parents..."
            />
          </div>

          {/* Channels & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Delivery Channels */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                Delivery Channels
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={channels.includes('in_app')}
                    onChange={() => handleChannelToggle('in_app')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>In-App Parent Portal Push</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={channels.includes('sms')}
                    onChange={() => handleChannelToggle('sms')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>SMS Broadcast (Ghana Mobile Gateway)</span>
                </label>
              </div>
            </div>

            {/* Priority */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5">
                Priority Level
              </span>
              <div className="flex gap-1.5">
                {['Normal', 'Important', 'Urgent'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p as any)}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      priority === p
                        ? p === 'Urgent'
                          ? 'bg-rose-600 text-white border-rose-600'
                          : p === 'Important'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsSendParentNotificationOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={Send}
              disabled={isSending}
            >
              {isSending ? 'Dispatching Broadcast...' : 'Send Notification'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

import React, { useState } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
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
} from 'lucide-react';

interface SendParentNotificationViewProps {
  onBack: () => void;
}

export const SendParentNotificationView: React.FC<SendParentNotificationViewProps> = ({ onBack }) => {
  const {
    sendParentNotification,
    parents,
    classes,
    setIsSendParentNotificationOpen,
  } = useApp();

  const [targetAudience, setTargetAudience] = useState<'All Parents' | 'Class' | 'Individual'>('All Parents');
  const [selectedClass, setSelectedClass] = useState(classes[0]?.name || 'Basic 1');
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
        setTitle('School Fees Balance Reminder - Term 2');
        setMessage(
          'Kindly be reminded that school fee balances for Term 2 are due this Friday. Please make payment via Mobile Money on your portal or at the school accounts desk.'
        );
        setPriority('Important');
        break;
      case 'pta':
        setTitle('Upcoming PTA General Assembly Notice');
        setMessage(
          'All parents and guardians are cordially invited to the PTA General Meeting scheduled for Saturday at 9:00 AM in the school main auditorium. Key agenda: Academic expansion and STEM lab.'
        );
        setPriority('Normal');
        break;
      case 'emergency':
        setTitle('Urgent Notice: Early School Closing Today');
        setMessage(
          'URGENT NOTICE: Due to heavy rains causing localized road flooding, school will close early today at 1:30 PM. School buses will depart at 1:45 PM. Parents doing pickup are advised to arrive safely.'
        );
        setPriority('Urgent');
        break;
      case 'transport':
        setTitle('School Bus Route Schedule Update');
        setMessage(
          'Please note that morning pickup on Route 2 (Adenta - Madina) will commence 10 minutes earlier starting Monday due to road construction along the main bypass.'
        );
        setPriority('Normal');
        break;
      case 'general':
      default:
        setTitle('Important School Notice to Parents');
        setMessage('Dear Parents, please take note of this important school circular update.');
        setPriority('Normal');
        break;
    }
  };

  const calculateRecipientCount = () => {
    if (targetAudience === 'Individual') return 1;
    if (targetAudience === 'Class') {
      const cls = classes.find((c) => c.name === selectedClass);
      return cls ? cls.studentCount : 25;
    }
    return parents.length * 2;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);

    try {
      sendParentNotification({
        title,
        message,
        category,
        targetAudience,
        targetDetail:
          targetAudience === 'Class'
            ? selectedClass
            : targetAudience === 'Individual'
            ? parents.find((p) => p.id === selectedParentId)?.fullName || 'Selected Parent'
            : undefined,
        channels,
        priority,
      });

      setSuccessToast(`Notification dispatched to ${calculateRecipientCount()} recipients.`);
      setTimeout(() => {
        setIsSendParentNotificationOpen(false);
        onBack();
      }, 700);
    } catch (err) {
      setIsSending(false);
    }
  };

  return (
    <FormPageLayout
      title="Send Parent Broadcast & SMS Notification"
      subtitle="Dispatch official school announcements, emergency closures, PTA notices, and fee alerts via Mobile SMS, In-App Portal, and Email"
      icon={Send}
      iconBg="from-blue-600 via-indigo-600 to-indigo-700"
      badgeText="Multi-Channel Broadcast"
      badgeVariant="info"
      onBack={onBack}
      backLabel="Back to Communications"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'Parent Communications', onClick: onBack },
        { label: 'Broadcast Notification' },
      ]}
      footerSubmitLabel={`Dispatch Broadcast to ${calculateRecipientCount()} Recipients`}
      footerSubmitIcon={Send}
      onSubmit={handleSubmit}
      isSubmitting={isSending}
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {successToast && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-xs">{successToast}</span>
          </div>
        )}

        {/* 1. Quick Template Presets */}
        <div>
          <span className="block text-slate-700 font-semibold mb-2 text-xs">
            Quick Template Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'academic', label: 'Academic & Terminal Reports', icon: FileSpreadsheet },
              { id: 'fee_reminder', label: 'School Fees Reminder', icon: CreditCard },
              { id: 'pta', label: 'PTA Assembly', icon: Users },
              { id: 'emergency', label: 'Urgent Weather / Closure', icon: AlertTriangle },
              { id: 'transport', label: 'Bus Route Notice', icon: Calendar },
            ].map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePresetSelect(p.id as typeof category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    category === p.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Target Audience & Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Target Audience *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['All Parents', 'Class', 'Individual'] as const).map((aud) => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setTargetAudience(aud)}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                    targetAudience === aud
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>

            {targetAudience === 'Class' && (
              <div className="mt-3">
                <label className="block text-slate-700 font-semibold mb-1">
                  Select Target Class Stream:
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs font-semibold"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      {cls.name} ({cls.studentCount} students)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {targetAudience === 'Individual' && (
              <div className="mt-3">
                <label className="block text-slate-700 font-semibold mb-1">
                  Select Specific Parent:
                </label>
                <select
                  value={selectedParentId}
                  onChange={(e) => setSelectedParentId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-xs font-semibold"
                >
                  {parents.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.phone}) — {p.childrenNames.join(', ')}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Dispatch Delivery Channels *
            </label>
            <div className="space-y-2">
              <label
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  channels.includes('in_app')
                    ? 'border-blue-500 bg-blue-50/60 text-blue-950 font-bold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-blue-600" />
                  <span>In-App Parent Portal Bulletin (Instant)</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.includes('in_app')}
                  onChange={() => handleChannelToggle('in_app')}
                  className="w-4 h-4 rounded text-blue-600"
                />
              </label>

              <label
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  channels.includes('sms')
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>Mobile SMS Gateway (Ghana Telecoms)</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.includes('sms')}
                  onChange={() => handleChannelToggle('sms')}
                  className="w-4 h-4 rounded text-emerald-600"
                />
              </label>

              <label
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                  channels.includes('email')
                    ? 'border-indigo-500 bg-indigo-50/60 text-indigo-950 font-bold'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span>Email Dispatch (Formal Circular PDF)</span>
                </div>
                <input
                  type="checkbox"
                  checked={channels.includes('email')}
                  onChange={() => handleChannelToggle('email')}
                  className="w-4 h-4 rounded text-indigo-600"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 3. Title & Content */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Subject Headline *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Term 2 Examination Time Table"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs font-semibold bg-slate-50/50 hover:bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-700 font-semibold text-xs">
                Broadcast Message Content *
              </label>
              <span className="text-[11px] text-slate-400 font-mono">
                {message.length} chars (~{Math.ceil(message.length / 160)} SMS)
              </span>
            </div>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs bg-slate-50/50 hover:bg-white leading-relaxed"
            />
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

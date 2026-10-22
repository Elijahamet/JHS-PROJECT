import React, { useState } from 'react';
import { FormPageLayout } from '../common/FormPageLayout';
import { useApp } from '../../context/AppContext';
import { AnnouncementItem } from '../../types';
import { Bell, Megaphone, AlertCircle, Send, Check } from 'lucide-react';

interface CreateAnnouncementViewProps {
  onBack: () => void;
}

export const CreateAnnouncementView: React.FC<CreateAnnouncementViewProps> = ({ onBack }) => {
  const { addAnnouncement, classes, setIsCreateAnnouncementOpen } = useApp();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<AnnouncementItem['audience']>('Whole School');
  const [targetClass, setTargetClass] = useState('');
  const [priority, setPriority] = useState<AnnouncementItem['priority']>('Normal');
  const [status, setStatus] = useState<AnnouncementItem['status']>('Published');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setError('Please provide both an announcement title and circular body text.');
      return;
    }

    setIsSubmitting(true);

    try {
      addAnnouncement({
        title: title.trim(),
        message: message.trim(),
        audience,
        targetClass: audience === 'Class' ? targetClass : undefined,
        priority,
        status,
      });

      setIsCreateAnnouncementOpen(false);
      onBack();
    } catch (err) {
      setError('Error creating announcement.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormPageLayout
      title="Create School Circular & Announcement"
      subtitle="Draft and dispatch school notifications, PTA updates, and academic notices across student, teacher, or parent portals"
      icon={Megaphone}
      iconBg="from-blue-600 via-indigo-600 to-indigo-700"
      badgeText="Official Circular"
      badgeVariant="info"
      onBack={onBack}
      backLabel="Back to Announcements"
      breadcrumbs={[
        { label: 'Admin Cockpit' },
        { label: 'Announcements & Circulars', onClick: onBack },
        { label: 'Create Announcement' },
      ]}
      footerSubmitLabel={status === 'Published' ? 'Publish Announcement Now' : 'Save as Draft'}
      footerSubmitIcon={Send}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span className="font-semibold text-xs">{error}</span>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5">
            Announcement Title / Headline *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. End of Term Examination Schedule & Vacation Dates"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm font-semibold bg-slate-50/50 hover:bg-white"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5">
            Circular Body Content *
          </label>
          <textarea
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write circular content here. Include important deadlines, guidelines, or instructions for the school community..."
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-xs bg-slate-50/50 hover:bg-white leading-relaxed"
          />
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Audience Scope *
            </label>
            <select
              value={audience}
              onChange={(e) =>
                setAudience(e.target.value as AnnouncementItem['audience'])
              }
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-white text-xs"
            >
              <option value="Whole School">Whole School Community</option>
              <option value="Parents">Parents & Guardians Only</option>
              <option value="Teachers">Teaching Staff Only</option>
              <option value="Students">Enrolled Students Only</option>
              <option value="Class">Specific Class Stream</option>
            </select>
          </div>

          {audience === 'Class' ? (
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Target Classroom Stream
              </label>
              <select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-white text-xs font-semibold"
              >
                <option value="">-- Choose Class --</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as AnnouncementItem['priority'])
                }
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-white text-xs"
              >
                <option value="Normal">Normal Notice</option>
                <option value="High">Important Notice</option>
                <option value="Urgent">Urgent / Emergency Alert</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1.5">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as AnnouncementItem['status'])
              }
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-white text-xs font-semibold"
            >
              <option value="Published">Publish Live Immediately</option>
              <option value="Draft">Save as Working Draft</option>
            </select>
          </div>
        </div>
      </form>
    </FormPageLayout>
  );
};

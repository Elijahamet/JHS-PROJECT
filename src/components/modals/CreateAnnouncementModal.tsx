import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { AnnouncementItem } from '../../types';

export const CreateAnnouncementModal: React.FC = () => {
  const {
    isCreateAnnouncementOpen,
    setIsCreateAnnouncementOpen,
    addAnnouncement,
    classes,
  } = useApp();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<AnnouncementItem['audience']>('Whole School');
  const [targetClass, setTargetClass] = useState('');
  const [priority, setPriority] = useState<AnnouncementItem['priority']>('Normal');
  const [status, setStatus] = useState<AnnouncementItem['status']>('Published');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    addAnnouncement({
      title,
      message,
      audience,
      targetClass: audience === 'Class' ? targetClass : undefined,
      priority,
      status,
    });

    setIsCreateAnnouncementOpen(false);
    setTitle('');
    setMessage('');
  };

  return (
    <Modal
      isOpen={isCreateAnnouncementOpen}
      onClose={() => setIsCreateAnnouncementOpen(false)}
      title="Create School Announcement"
      subtitle="Publish circulars and notifications to parents, teachers or students"
      maxWidth="lg"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreateAnnouncementOpen(false)}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            {status === 'Published' ? 'Publish Announcement' : 'Save as Draft'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-slate-700 font-medium mb-1">
            Announcement Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 2nd Term Mid-Term Examination Timetable"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Target Audience *
            </label>
            <select
              value={audience}
              onChange={(e) =>
                setAudience(e.target.value as AnnouncementItem['audience'])
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="Whole School">Whole School (All)</option>
              <option value="Parents Only">Parents Only</option>
              <option value="Teachers Only">Teachers & Staff Only</option>
              <option value="PTA">PTA Executive & Members</option>
              <option value="Class">Specific Class</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as AnnouncementItem['priority'])
              }
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="Normal">Normal Notice</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent / Action Required</option>
            </select>
          </div>
        </div>

        {audience === 'Class' && (
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Select Applicable Class *
            </label>
            <select
              value={targetClass}
              onChange={(e) => setTargetClass(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
            >
              <option value="">Select Class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-slate-700 font-medium mb-1">
            Message Body *
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write circular details, dates, agenda, requirements..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-medium mb-1">
            Publication Status
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="pubStatus"
                value="Published"
                checked={status === 'Published'}
                onChange={() => setStatus('Published')}
                className="text-slate-900"
              />
              <span>Publish Immediately</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="pubStatus"
                value="Draft"
                checked={status === 'Draft'}
                onChange={() => setStatus('Draft')}
                className="text-slate-900"
              />
              <span>Save as Draft</span>
            </label>
          </div>
        </div>
      </form>
    </Modal>
  );
};

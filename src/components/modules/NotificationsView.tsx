import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Receipt,
  GraduationCap,
  Megaphone,
  UserPlus,
  Bus,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setCurrentNav,
  } = useApp();

  const [filterUnread, setFilterUnread] = useState(false);

  const filtered = filterUnread
    ? notifications.filter((n) => !n.isRead)
    : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <Receipt className="w-4 h-4 text-emerald-600" />;
      case 'attendance':
        return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4 text-amber-600" />;
      case 'admission':
        return <UserPlus className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Notification Center
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit alerts, payment confirmations, roll submissions, and bus fleet alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={Check}
            onClick={markAllNotificationsRead}
          >
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilterUnread(false)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            !filterUnread
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          onClick={() => setFilterUnread(true)}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            filterUnread
              ? 'bg-slate-900 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Unread Only ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs divide-y divide-slate-100 text-xs">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No notifications in this view.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationRead(item.id);
                if (item.linkTo) setCurrentNav(item.linkTo);
              }}
              className={`p-4 flex items-start gap-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                !item.isRead ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900 text-sm">
                    {item.title}
                  </p>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {item.timestamp}
                  </span>
                </div>
                <p className="mt-1 text-slate-600 leading-relaxed">
                  {item.message}
                </p>
              </div>

              {!item.isRead && (
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

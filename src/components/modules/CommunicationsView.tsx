import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Users,
  Briefcase,
  Search,
  Bell,
  Phone,
  Mail,
  CheckCheck,
  Paperclip,
  CheckCircle2,
  Sparkles,
  Smartphone,
  CreditCard,
  FileSpreadsheet,
  AlertTriangle,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { ChatMessage, ParentNotificationRecord } from '../../types';

export const CommunicationsView: React.FC = () => {
  const {
    currentUser,
    teachers,
    parents,
    students,
    chatMessages,
    activeChatContactId,
    setActiveChatContactId,
    sendChatMessage,
    parentNotifications,
    sendParentNotification,
    setIsSendParentNotificationOpen,
    setCurrentNav,
    setSelectedStudentId,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chat' | 'broadcast'>('chat');
  const [contactFilter, setContactFilter] = useState<'all' | 'teachers' | 'parents'>('all');
  const [searchContact, setSearchContact] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [broadcastAudience, setBroadcastAudience] = useState<'All Parents' | 'Class' | 'Individual'>('All Parents');
  const [broadcastClass, setBroadcastClass] = useState('JHS 2A');
  const [broadcastParentId, setBroadcastParentId] = useState(parents[0]?.id || '');
  const [broadcastCategory, setBroadcastCategory] = useState<ParentNotificationRecord['category']>('academic');
  const [broadcastTitle, setBroadcastTitle] = useState('Term 2 Academic Report Cards Published');
  const [broadcastMessage, setBroadcastMessage] = useState(
    'Dear Parents & Guardians, official terminal academic report cards for Term 2 are now ready. Please log in to your parent dashboard to review subject scores and teacher evaluation.'
  );
  const [broadcastChannels, setBroadcastChannels] = useState<('in_app' | 'sms' | 'email')[]>(['in_app', 'sms']);
  const [broadcastPriority, setBroadcastPriority] = useState<'Normal' | 'Important' | 'Urgent'>('Important');
  const [isSendingBroadcast, setIsSendingBroadcast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Scroll to bottom of message list when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeChatContactId]);

  // Combine contacts for chat sidebar
  const teacherContacts = teachers.map((t) => ({
    id: t.id,
    name: t.fullName,
    role: 'teacher' as const,
    title: t.isClassTeacherOf ? `${t.isClassTeacherOf} Form Master` : 'Subject Teacher',
    subtitle: t.subjectsAssigned.slice(0, 2).join(', '),
    phone: t.phone,
    email: t.email,
    avatarBg: 'bg-indigo-600',
    online: true,
  }));

  const parentContacts = parents.map((p) => ({
    id: p.id,
    name: p.fullName,
    role: 'parent' as const,
    title: `${p.relationship} of ${p.childrenNames.join(', ')}`,
    subtitle: `Balance: ${p.totalBalanceDue > 0 ? `GHS ${p.totalBalanceDue}` : 'Settled'}`,
    phone: p.phone,
    email: p.email,
    avatarBg: 'bg-emerald-600',
    online: true,
    childrenIds: p.childrenIds,
  }));

  const allContacts = [...teacherContacts, ...parentContacts];

  const filteredContacts = allContacts.filter((c) => {
    const matchesRole =
      contactFilter === 'all'
        ? true
        : contactFilter === 'teachers'
        ? c.role === 'teacher'
        : c.role === 'parent';

    const matchesSearch =
      c.name.toLowerCase().includes(searchContact.toLowerCase()) ||
      c.title.toLowerCase().includes(searchContact.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchContact.toLowerCase()) ||
      c.phone.includes(searchContact);

    return matchesRole && matchesSearch;
  });

  // Active contact details
  const activeContact = allContacts.find((c) => c.id === activeChatContactId) || allContacts[0];

  // Messages between current admin and active contact
  const currentConversation = chatMessages.filter(
    (m) =>
      (m.senderId === activeContact?.id && m.recipientId === currentUser.id) ||
      (m.senderId === currentUser.id && m.recipientId === activeContact?.id)
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim() || !activeContact) return;

    sendChatMessage(activeContact.id, messageInput.trim());
    setMessageInput('');
  };

  const handleCannedReply = (text: string) => {
    if (!activeContact) return;
    sendChatMessage(activeContact.id, text);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim() || !broadcastMessage.trim()) return;

    setIsSendingBroadcast(true);

    const targetParent = parents.find((p) => p.id === broadcastParentId);
    const detail =
      broadcastAudience === 'Class'
        ? `${broadcastClass} Parents`
        : broadcastAudience === 'Individual'
        ? targetParent?.fullName || 'Individual Parent'
        : 'Whole School Parents';

    setTimeout(() => {
      sendParentNotification({
        title: broadcastTitle,
        message: broadcastMessage,
        category: broadcastCategory,
        targetAudience: broadcastAudience,
        targetDetail: detail,
        channels: broadcastChannels,
        priority: broadcastPriority,
      });

      setIsSendingBroadcast(false);
      showToast(`Broadcast notification successfully dispatched to ${broadcastAudience}!`);
    }, 600);
  };

  const handleCategorySelect = (cat: typeof broadcastCategory) => {
    setBroadcastCategory(cat);
    switch (cat) {
      case 'academic':
        setBroadcastTitle('Term 2 Academic Report Cards Published');
        setBroadcastMessage(
          'Dear Parents & Guardians, official terminal academic report cards for Term 2 are now ready. Please log in to your parent dashboard to review subject scores and teacher evaluation.'
        );
        setBroadcastPriority('Important');
        break;
      case 'fee_reminder':
        setBroadcastTitle('Tuition & Feeding Fee Balance Reminder');
        setBroadcastMessage(
          'Friendly reminder to parents with outstanding term fee balances. Kindly settle via MTN Mobile Money or Telecel Cash before final examination week.'
        );
        setBroadcastPriority('Urgent');
        break;
      case 'pta':
        setBroadcastTitle('Term 2 General PTA Congress & Speech Day');
        setBroadcastMessage(
          'All parents and guardians are cordially invited to our Term 2 General PTA Meeting this Friday at 3:00 PM in the School Assembly Hall. Your attendance is vital.'
        );
        setBroadcastPriority('Normal');
        break;
      case 'emergency':
        setBroadcastTitle('Urgent Notice: Weather Alert & Early School Closing');
        setBroadcastMessage(
          'Due to heavy rainfall across the municipal area, school will close at 1:30 PM today. School buses will commence return trips immediately. Please arrange pickup.'
        );
        setBroadcastPriority('Urgent');
        break;
      case 'transport':
        setBroadcastTitle('Transport Notice: Bus Fleet Route Update');
        setBroadcastMessage(
          'Please be informed that Bus 1 (North Legon Route) will experience a slight 15-minute delay today due to scheduled road maintenance. Pupils remain safely chaperoned.'
        );
        setBroadcastPriority('Normal');
        break;
      default:
        setBroadcastTitle('School Community Notice');
        setBroadcastMessage('Dear Parents, please take note of the upcoming school calendar activities.');
        setBroadcastPriority('Normal');
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-400 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 border border-cyan-200">
              Communication Center
            </span>
            <span className="text-xs text-slate-500">• Direct Messaging & SMS Alerts</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Teacher & Parent Communications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Engage in direct real-time chat with academic staff and parents, or broadcast official circulars and SMS alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Main Tab Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Live Chat Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('broadcast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'broadcast'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Send Parent Notification</span>
            </button>
          </div>

          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setIsSendParentNotificationOpen(true)}
          >
            Quick Notification Modal
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LIVE CHAT HUB VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'chat' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          {/* Left Contacts Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
            {/* Search and Filters */}
            <div className="p-3.5 border-b border-slate-200 space-y-3 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search teachers or parents..."
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-slate-400"
                />
              </div>

              {/* Role filter pills */}
              <div className="flex gap-1.5 text-xs">
                <button
                  onClick={() => setContactFilter('all')}
                  className={`flex-1 py-1 rounded-lg font-semibold transition-all ${
                    contactFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({allContacts.length})
                </button>
                <button
                  onClick={() => setContactFilter('teachers')}
                  className={`flex-1 py-1 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                    contactFilter === 'teachers'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Teachers ({teachers.length})</span>
                </button>
                <button
                  onClick={() => setContactFilter('parents')}
                  className={`flex-1 py-1 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                    contactFilter === 'parents'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3 h-3" />
                  <span>Parents ({parents.length})</span>
                </button>
              </div>
            </div>

            {/* Contacts Scrollable List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[540px]">
              {filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No contacts found matching search criteria.
                </div>
              ) : (
                filteredContacts.map((contact) => {
                  const isSelected = activeChatContactId === contact.id;
                  const initials = contact.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('');

                  return (
                    <button
                      key={contact.id}
                      onClick={() => setActiveChatContactId(contact.id)}
                      className={`w-full p-3.5 text-left transition-colors flex items-start gap-3 ${
                        isSelected
                          ? 'bg-blue-50/80 border-l-4 border-blue-600'
                          : 'hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full ${contact.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                        >
                          {initials}
                        </div>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-slate-900 text-xs truncate">
                            {contact.name}
                          </h4>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              contact.role === 'teacher'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            {contact.role}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-600 truncate mt-0.5">
                          {contact.title}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {contact.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Main Chat Conversation Window */}
          <div className="md:col-span-8 flex flex-col h-full bg-white">
            {activeContact ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/60">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-full ${activeContact.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                    >
                      {activeContact.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm truncate">
                          {activeContact.name}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            activeContact.role === 'teacher'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {activeContact.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        <span>Online Now</span>
                        <span>•</span>
                        <span>{activeContact.phone}</span>
                      </p>
                    </div>
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {activeContact.role === 'parent' && (
                      <Button
                        size="sm"
                        variant="outline"
                        icon={Bell}
                        onClick={() => setIsSendParentNotificationOpen(true)}
                      >
                        Notify Parent
                      </Button>
                    )}

                    {activeContact.role === 'teacher' && (
                      <Button
                        size="sm"
                        variant="outline"
                        icon={FileSpreadsheet}
                        onClick={() => setCurrentNav('results')}
                      >
                        Marks Desk
                      </Button>
                    )}

                    <a
                      href={`tel:${activeContact.phone}`}
                      className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                      title={`Call ${activeContact.name}`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Conversation Stream */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[460px] bg-slate-50/30">
                  {/* Notice Pill */}
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-200/80 text-[11px] font-medium text-slate-600 shadow-2xs">
                      End-to-end encrypted school communication • Logged for school records
                    </span>
                  </div>

                  {currentConversation.map((msg) => {
                    const isFromAdmin = msg.senderRole === 'school_admin';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          isFromAdmin ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1 px-1">
                          <span className="font-semibold text-slate-600">
                            {isFromAdmin ? 'You (Headmistress)' : msg.senderName}
                          </span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>

                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            isFromAdmin
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                          }`}
                        >
                          <p>{msg.message}</p>
                          {msg.attachmentName && (
                            <div className="mt-2 pt-2 border-t border-white/20 flex items-center gap-1.5 text-[11px]">
                              <Paperclip className="w-3.5 h-3.5" />
                              <span className="underline">{msg.attachmentName}</span>
                            </div>
                          )}
                        </div>

                        {isFromAdmin && (
                          <span className="text-[10px] text-blue-600 flex items-center gap-0.5 mt-0.5 px-1 font-medium">
                            <CheckCheck className="w-3.5 h-3.5" /> Delivered
                          </span>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Canned Suggestions */}
                <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
                    Quick Replies:
                  </span>
                  {(activeContact.role === 'teacher'
                    ? [
                        'Marks have been reviewed and approved.',
                        'Please verify attendance for today.',
                        'Staff coordination meeting at 2:00 PM.',
                        'Kindly review Kofi Mensah report card draft.',
                      ]
                    : [
                        'Fee payment received with thanks.',
                        'Report card is available on your parent dashboard.',
                        'General PTA meeting is this Friday at 3 PM.',
                        'Kindly pass by the administration office.',
                      ]
                  ).map((phrase, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCannedReply(phrase)}
                      className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-[11px] font-medium text-slate-700 hover:text-blue-800 whitespace-nowrap transition-colors border border-slate-200/60"
                    >
                      &ldquo;{phrase}&rdquo;
                    </button>
                  ))}
                </div>

                {/* Message Input Form */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder={`Write a message to ${activeContact.name}... (Press Enter to send)`}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-xl font-bold transition-colors shadow-xs flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
                <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
                <p className="font-semibold text-slate-700 text-sm">Select a Conversation</p>
                <p className="text-xs max-w-sm mt-1">
                  Choose a teacher or parent from the left sidebar to start chatting.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PARENT NOTIFICATION BROADCAST VIEW */}
      {/* ========================================================================= */}
      {activeTab === 'broadcast' && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Total Parents Registered
              </span>
              <p className="text-2xl font-black text-slate-900 mt-1">{parents.length || 34}</p>
              <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Reachable via SMS
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                SMS Gateway Status
              </span>
              <p className="text-2xl font-black text-blue-700 mt-1">Online</p>
              <p className="text-[11px] text-slate-500 mt-1">MTN / Telecel Ghana Active</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                In-App Portal Delivery
              </span>
              <p className="text-2xl font-black text-indigo-700 mt-1">Active</p>
              <p className="text-[11px] text-slate-500 mt-1">Instant Push to Parent Portal</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Broadcasts Dispatched
              </span>
              <p className="text-2xl font-black text-purple-700 mt-1">
                {parentNotifications.length}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Circulars & Alerts Sent</p>
            </div>
          </div>

          {/* Notification Composer Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Compose & Send Parent Notification
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send immediate notifications to all parents, specific classrooms, or individual guardians.
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Simulated Ghana SMS Gateway</span>
              </div>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              {/* Audience Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Target Audience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'All Parents', label: 'All Parents', desc: `Whole School (${parents.length || 34} Recipients)` },
                    { id: 'Class', label: 'By Class Stream', desc: 'Target e.g. JHS 2A Parents' },
                    { id: 'Individual', label: 'Individual Parent', desc: 'Direct 1-on-1 Alert' },
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setBroadcastAudience(aud.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        broadcastAudience === aud.id
                          ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500 shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <p className="font-bold text-slate-900 text-xs">{aud.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{aud.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Target Filter */}
              {broadcastAudience === 'Class' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Choose Class:</span>
                  <select
                    value={broadcastClass}
                    onChange={(e) => setBroadcastClass(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="JHS 2A">JHS 2A (Form Master: Mr. Darko)</option>
                    <option value="JHS 2B">JHS 2B</option>
                    <option value="Basic 4">Basic 4</option>
                    <option value="Basic 5">Basic 5</option>
                    <option value="JHS 1">JHS 1</option>
                    <option value="JHS 3">JHS 3</option>
                  </select>
                </div>
              )}

              {broadcastAudience === 'Individual' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                  <span className="font-semibold text-slate-700">Choose Parent:</span>
                  <select
                    value={broadcastParentId}
                    onChange={(e) => setBroadcastParentId(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs focus:ring-1 focus:ring-blue-600"
                  >
                    {parents.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.fullName} ({p.phone}) — Ward: {p.childrenNames.join(', ')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Category Quick Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. Notification Category & Quick Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'academic', label: 'Report Cards Ready', icon: FileSpreadsheet, color: 'text-blue-700 bg-blue-50 border-blue-200' },
                    { id: 'fee_reminder', label: 'Fee Reminder Alert', icon: CreditCard, color: 'text-amber-700 bg-amber-50 border-amber-200' },
                    { id: 'pta', label: 'General PTA Meeting', icon: Users, color: 'text-purple-700 bg-purple-50 border-purple-200' },
                    { id: 'emergency', label: 'Emergency / Weather Alert', icon: AlertTriangle, color: 'text-rose-700 bg-rose-50 border-rose-200' },
                    { id: 'transport', label: 'Bus / Fleet Notice', icon: Smartphone, color: 'text-cyan-700 bg-cyan-50 border-cyan-200' },
                  ].map((preset) => {
                    const Icon = preset.icon;
                    const isSelected = broadcastCategory === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleCategorySelect(preset.id as any)}
                        className={`px-3 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : `${preset.color} hover:opacity-90`
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  3. Notification Subject / Title
                </label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
                  placeholder="e.g. Term 2 Academic Report Cards Published"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  4. Message Body
                </label>
                <textarea
                  rows={3}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed bg-slate-50/50"
                  placeholder="Type message to parents..."
                />
              </div>

              {/* Channels & Priority Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="block text-[11px] font-bold uppercase text-slate-600">
                    Dispatch Channels
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={broadcastChannels.includes('in_app')}
                      onChange={() => {
                        if (broadcastChannels.includes('in_app')) {
                          if (broadcastChannels.length > 1) {
                            setBroadcastChannels(broadcastChannels.filter((c) => c !== 'in_app'));
                          }
                        } else {
                          setBroadcastChannels([...broadcastChannels, 'in_app']);
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>In-App Parent Portal Push Notification</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                    <input
                      type="checkbox"
                      checked={broadcastChannels.includes('sms')}
                      onChange={() => {
                        if (broadcastChannels.includes('sms')) {
                          if (broadcastChannels.length > 1) {
                            setBroadcastChannels(broadcastChannels.filter((c) => c !== 'sms'));
                          }
                        } else {
                          setBroadcastChannels([...broadcastChannels, 'sms']);
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Direct SMS Broadcast (MTN & Telecel Gateway)</span>
                  </label>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="block text-[11px] font-bold uppercase text-slate-600">
                    Priority Flag
                  </span>
                  <div className="flex gap-2">
                    {['Normal', 'Important', 'Urgent'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setBroadcastPriority(p as any)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          broadcastPriority === p
                            ? p === 'Urgent'
                              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                              : p === 'Important'
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-800 text-white border-slate-800 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  icon={Send}
                  disabled={isSendingBroadcast}
                >
                  {isSendingBroadcast ? 'Sending to Parents...' : 'Dispatch Notification Now'}
                </Button>
              </div>
            </form>
          </div>

          {/* Sent Notifications Log */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden space-y-0">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Sent Parent Notifications History
                </h3>
                <p className="text-[11px] text-slate-500">
                  Track delivery status and audience engagement of broadcasted notifications.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {parentNotifications.length} Sent
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {parentNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">
                        {notif.title}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          notif.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-800'
                            : notif.priority === 'Important'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {notif.priority}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        • {notif.sentAt}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                      <span>Audience: <strong>{notif.targetAudience}</strong> {notif.targetDetail ? `(${notif.targetDetail})` : ''}</span>
                      <span>•</span>
                      <span>Sender: {notif.sentBy}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px] border border-emerald-200">
                        <CheckCheck className="w-3.5 h-3.5" />
                        {notif.status} ({notif.deliveredCount} Delivered)
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Channels: {notif.channels.join(' + ').toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  CheckCheck,
  Clock,
  Wifi,
  WifiOff,
  Building2,
  Paperclip,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';

interface PortalChatViewProps {
  partnerName?: string;
  partnerRole?: string;
  partnerSubtitle?: string;
}

export const PortalChatView: React.FC<PortalChatViewProps> = ({
  partnerName = 'Mrs. Cynthia Arthur',
  partnerRole = 'School Headmistress & Administration',
  partnerSubtitle = 'Direct line to School Executive Office',
}) => {
  const {
    currentUser,
    chatMessages,
    sendChatMessage,
    isOnline,
    isSimulatedOffline,
    toggleSimulatedOffline,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const effectiveOnline = isOnline && !isSimulatedOffline;

  // Filter messages between currentUser and Admin (usr_admin)
  const conversation = chatMessages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.recipientId === 'usr_admin') ||
      (m.senderId === 'usr_admin' && m.recipientId === currentUser.id) ||
      (m.senderRole === 'school_admin' && m.recipientRole === currentUser.role) ||
      (m.senderRole === currentUser.role && m.recipientRole === 'school_admin')
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage('usr_admin', inputText.trim());
    setInputText('');
  };

  const handleQuickSuggestion = (text: string) => {
    sendChatMessage('usr_admin', text);
  };

  const teacherSuggestions = [
    'Good morning Madam. All marks for JHS 2A have been compiled.',
    'Please review the terminal report card remarks for form class.',
    'Requesting stationery supplies for science practicals.',
    'Today attendance roll call has been submitted.',
  ];

  const parentSuggestions = [
    'Good day. Please confirm if terminal report card is ready for download.',
    'I have settled the tuition fee balance via MTN MoMo.',
    'Inquiring about pickup time for the school bus today.',
    'Thank you for the prompt academic feedback on my ward.',
  ];

  const suggestions =
    currentUser.role === 'teacher' ? teacherSuggestions : parentSuggestions;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[640px]">
      {/* Top Partner Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            CA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">{partnerName}</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                School Executive
              </span>
            </div>
            <p className="text-xs text-slate-500">{partnerRole}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{partnerSubtitle}</p>
          </div>
        </div>

        {/* Network & Offline Status Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulatedOffline}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              !effectiveOnline
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Click to toggle offline simulation mode"
          >
            {!effectiveOnline ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Simulated Offline Mode</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>Online (Local & Cloud Sync Active)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Offline Mode Alert Banner */}
      {!effectiveOnline && (
        <div className="bg-amber-50 border-b border-amber-200 p-2.5 px-4 text-xs text-amber-900 flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Offline Mode Active:</strong> You can continue writing and sending messages. They are safely cached on this device and will transmit automatically once connection is restored.
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded shrink-0">
            Offline Store Ready
          </span>
        </div>
      )}

      {/* Message History View */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/40">
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-200/80 text-[11px] font-medium text-slate-600 shadow-2xs">
            Direct Line to Administration • Messages are securely saved locally on this device
          </span>
        </div>

        {conversation.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            No previous messages. Type below to begin your conversation with the School Headmistress.
          </div>
        ) : (
          conversation.map((msg) => {
            const isMine = msg.senderRole === currentUser.role;
            const isQueued = msg.status === 'queued' || msg.isOffline;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-1 px-1">
                  <span className="font-semibold text-slate-600">
                    {isMine ? 'You' : msg.senderName}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isMine
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

                {isMine && (
                  <div className="flex items-center gap-1 mt-0.5 px-1 text-[10px]">
                    {isQueued ? (
                      <span className="text-amber-600 flex items-center gap-1 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                        <Clock className="w-3 h-3" /> Stored locally (Queued offline)
                      </span>
                    ) : (
                      <span className="text-blue-600 flex items-center gap-0.5 font-medium">
                        <CheckCheck className="w-3.5 h-3.5" /> Delivered to School Admin
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestion Chips */}
      <div className="px-4 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
          Suggested:
        </span>
        {suggestions.map((phrase, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickSuggestion(phrase)}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-[11px] font-medium text-slate-700 hover:text-blue-800 whitespace-nowrap transition-colors border border-slate-200/60"
          >
            &ldquo;{phrase}&rdquo;
          </button>
        ))}
      </div>

      {/* Input Composer Form */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Type message to ${partnerName}... ${
            !effectiveOnline ? '(Offline mode: will save and queue)' : '(Press Enter to send)'
          }`}
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-xl font-bold transition-colors shadow-xs flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

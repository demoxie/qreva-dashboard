import { useEffect, useRef } from 'react';
import { Bell, Check, CheckCheck, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from '@/store/features/notifications/useNotifications';

const typeIcon = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'success': return <Check size={14} className="text-green-600" />;
    case 'warning': return <AlertTriangle size={14} className="text-yellow-500" />;
    case 'error':
    case 'alert': return <AlertCircle size={14} className="text-red-500" />;
    default: return <Info size={14} className="text-[#084059]" />;
  }
};

const typeBg = (type) => {
  switch ((type || '').toLowerCase()) {
    case 'success': return 'bg-green-50';
    case 'warning': return 'bg-yellow-50';
    case 'error':
    case 'alert': return 'bg-red-50';
    default: return 'bg-[#EAF4F8]';
  }
};

const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const NotificationsPanel = ({ onClose }) => {
  const panelRef = useRef(null);
  const { data: response, isLoading } = useNotifications({ limit: 20 });
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  const notifications = response?.data || response?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read && !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleMarkRead = (id) => {
    markRead.mutate(id);
  };

  const handleMarkAllRead = () => {
    markAllRead.mutate();
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full z-50 mt-2 w-[min(380px,calc(100vw-1rem))] overflow-hidden rounded-xl border border-[#E8EBED] bg-white shadow-xl"
      style={{ maxHeight: '520px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F3F4]">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-[#084059]" />
          <span className="text-sm font-urbanist font-semibold text-[#1E1E1E]">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 bg-[#FF5B04] text-white text-[10px] font-bold rounded-full leading-none">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={markAllRead.isPending}
              className="flex items-center gap-1 text-xs text-[#084059] hover:text-[#FF5B04] font-general transition-colors"
            >
              <CheckCheck size={13} />
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="p-1 hover:bg-[#F5F6F7] rounded-md transition-colors">
            <X size={16} className="text-[#808C91]" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="overflow-y-auto" style={{ maxHeight: '456px' }}>
        {isLoading ? (
          <div className="flex flex-col gap-3 p-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-[#F0F3F4] shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-[#F0F3F4] rounded w-3/4" />
                  <div className="h-2 bg-[#F0F3F4] rounded w-full" />
                  <div className="h-2 bg-[#F0F3F4] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F0F3F4] flex items-center justify-center mb-3">
              <Bell size={20} className="text-[#B0B7C3]" />
            </div>
            <p className="text-sm font-general font-medium text-[#505C61]">No notifications yet</p>
            <p className="text-xs text-[#B0B7C3] mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div>
            {notifications.map((n) => {
              const isUnread = !n.read && !n.isRead;
              const id = n._id || n.id;
              const title = n.title || n.subject || n.heading || 'Notification';
              const message = n.message || n.body || n.description || n.content || '';
              const time = timeAgo(n.createdAt || n.timestamp || n.date);
              const type = n.type || n.notificationType || 'info';

              return (
                <div
                  key={id}
                  className={`flex gap-3 px-4 py-3 border-b border-[#F7FAFA] transition-colors ${isUnread ? 'bg-[#FAFCFF]' : 'bg-white'} hover:bg-[#F7FAFA]`}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full ${typeBg(type)} flex items-center justify-center shrink-0 mt-0.5`}>
                    {typeIcon(type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-general leading-snug ${isUnread ? 'font-semibold text-[#1E1E1E]' : 'font-medium text-[#505C61]'}`}>
                        {title}
                      </p>
                      {isUnread && (
                        <button
                          onClick={() => handleMarkRead(id)}
                          className="shrink-0 w-2 h-2 rounded-full bg-[#FF5B04] mt-1.5 hover:scale-125 transition-transform"
                          title="Mark as read"
                        />
                      )}
                    </div>
                    {message && (
                      <p className="text-xs text-[#808C91] font-general mt-0.5 leading-relaxed line-clamp-2">{message}</p>
                    )}
                    <p className="text-[10px] text-[#B0B7C3] font-general mt-1">{time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;

import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft, Bell, Settings } from 'lucide-react';
import { getRouteConfig, ROUTES } from '@/config/routes.config';
import NotificationsPanel from '@/components/common/NotificationsPanel';
import { useNotifications } from '@/store/features/notifications/useNotifications';

const Breadcrumb = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [notifOpen, setNotifOpen] = useState(false);

  const { data: notifResponse } = useNotifications({ limit: 20 });
  const notifications = notifResponse?.data || notifResponse?.notifications || [];
  const unreadCount = notifications.filter(n => !n.read && !n.isRead).length;

  const currentRoute = getRouteConfig(location.pathname);
  const path = location.pathname;

  // Show back button if the route has an explicit parent, OR if we're on a settings sub-page
  const isSettingsSubPage = path.startsWith('/settings/') && path !== '/settings';
  const canGoBack = currentRoute.parent !== null || isSettingsSubPage;

  const getBackPath = () => {
    if (currentRoute.parent) return currentRoute.parent;
    if (isSettingsSubPage) return '/settings';
    return null;
  };

  // Generate dynamic label based on route type and params
  const getDynamicLabel = () => {
    const { type, id } = params;

    // If no dynamic params, use default label
    if (!type && !id) {
      return currentRoute.label;
    }

    // Handle different view types
    if (type === 'region') {
      return 'View Location Details';
    }

    if (type === 'transaction') {
      return 'View Transaction History';
    }

    // Default fallback
    return currentRoute.label;
  };

  const handleBack = () => {
    const backPath = getBackPath();
    if (backPath) navigate(backPath);
  };

  // Build breadcrumb segments for routes with known parents
  const getBreadcrumbSegments = () => {
    // Tier Management sub-routes
    if (path.startsWith('/settings/tier/create')) {
      return [
        { label: 'Settings', path: '/settings' },
        { label: 'Tier Management', path: '/settings/tier' },
        { label: 'Create New Tier', path: null },
      ];
    }
    if (path.startsWith('/settings/tier/edit')) {
      return [
        { label: 'Settings', path: '/settings' },
        { label: 'Tier Management', path: '/settings/tier' },
        { label: 'Edit Details', path: null },
      ];
    }
    // Agent Category sub-routes
    if (path.startsWith('/settings/agent-category/create')) {
      return [
        { label: 'Settings', path: '/settings' },
        { label: 'Agent Category', path: '/settings/agent-category' },
        { label: 'Create New Category', path: null },
      ];
    }
    if (path.startsWith('/settings/agent-category/edit')) {
      return [
        { label: 'Settings', path: '/settings' },
        { label: 'Agent Category', path: '/settings/agent-category' },
        { label: 'Edit Details', path: null },
      ];
    }
    if (path.startsWith('/settings/agent-category/view')) {
      return [
        { label: 'Settings', path: '/settings' },
        { label: 'Agent Category', path: '/settings/agent-category' },
        { label: 'View Details', path: null },
      ];
    }
    // Settings sub-pages (first level under /settings)
    const settingsPages = {
      '/settings/tier': 'Tier Management',
      '/settings/rbac': 'RBAC (Role Based Permissions)',
      '/settings/rbac/create': 'Create Role',
      '/settings/agent-category': 'Agent Category',
      '/settings/agent-category/create': 'Create Agent Category',
      '/settings/activity-logs': 'Activity Logs',
      '/settings/profile': 'My Profile',
    };
    if (settingsPages[path]) {
      return [
        { label: 'Settings', path: '/settings' },
        { label: settingsPages[path], path: null },
      ];
    }
    return null;
  };

  const segments = getBreadcrumbSegments();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E8EBED]">
      {/* Left side - Back button and breadcrumb/title */}
      <div className="flex items-center gap-3">
        {canGoBack && (
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={20} className="text-[#084059]" />
          </button>
        )}
        {segments ? (
          <nav className="flex items-center gap-1 text-sm">
            {segments.map((seg, idx) => (
              <span key={idx} className="flex items-center gap-1">
                {idx > 0 && <span className="text-[#808C91]">/</span>}
                {seg.path ? (
                  <button
                    onClick={() => navigate(seg.path)}
                    className="text-[#808C91] hover:text-[#505C61] font-medium transition-colors"
                  >
                    {seg.label}
                  </button>
                ) : (
                  <span className="text-[#FF5B04] font-medium">{seg.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          <h1 className="text-sm font-general font-medium text-[#FF5B04]">
            {getDynamicLabel()}
          </h1>
        )}
      </div>

      {/* Right side - Notifications, Settings, User Badge */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="p-3 hover:bg-gray-100 transition-colors relative border border-[#D9D9D9] rounded-full"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-[#7C8D96]" />
            {unreadCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 bg-[#FF6B2C] rounded-full flex items-center justify-center text-[9px] font-bold text-white px-0.5">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            ) : (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B2C] rounded-full" />
            )}
          </button>
          {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
        </div>

        <button
          className="p-3 hover:bg-gray-100 transition-colors border border-[#D9D9D9] rounded-full"
          aria-label="Settings"
          onClick={() => navigate('/settings')}
        >
          <Settings size={20} className="text-[#7C8D96]" />
        </button>
        <hr className="h-8 border-l border-gray-300" />

        <div className={`flex items-center gap-2 h-11 bg-[#F7FAFA] border border-[#D9D9D9] rounded-[36px] px-1 ${user?.role === 'SuperAdmin' ? 'w-10' : 'w-[87px]'}`}>
          <span className="text-[12.8px] font-urbanist font-semibold text-[#1E1E1E]  bg-[#CEEBF5] w-8 h-8 rounded-full flex items-center justify-center">
            {user?.username?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JFD'}
          </span>
          {user?.role !== 'SuperAdmin' && (
            <span className="text-[14px] font-general font-medium text-[#808C91] leading-[148px]">Tier 1</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

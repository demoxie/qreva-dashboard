import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft, Bell, Settings } from 'lucide-react';
import { getRouteConfig } from '@/config/routes.config';

const Breadcrumb = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const currentRoute = getRouteConfig(location.pathname);
  const canGoBack = currentRoute.parent !== null;

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
    if (canGoBack) {
      navigate(currentRoute.parent);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E8EBED]">
      {/* Left side - Back button and title */}
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
        <h1 className="text-sm font-general font-medium text-[#FF5B04]">
          {getDynamicLabel()}
        </h1>
      </div>

      {/* Right side - Notifications, Settings, User Badge */}
      <div className="flex items-center gap-4">
        <button
          className="p-3 hover:bg-gray-100  transition-colors relative border border-[#D9D9D9] rounded-full"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-[#7C8D96]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B2C] rounded-full "></span>
        </button>

        <button
          className="p-3 hover:bg-gray-100 transition-colors border border-[#D9D9D9] rounded-full"
          aria-label="Settings"
        >
          <Settings size={20} className="text-[#7C8D96]" />
        </button>
        <hr className="h-8 border-l border-gray-300" />

        <div className="flex items-center gap-2 h-11 w-[87px] bg-[#F7FAFA] border border-[#D9D9D9] rounded-[36px] px-1">
          <span className="text-[12.8px] font-urbanist font-semibold text-[#1E1E1E]  bg-[#CEEBF5] w-8 h-8 rounded-full flex items-center justify-center">
            {user?.username?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JFD'}
          </span>
          <span className="text-[14px] font-general font-medium text-[#808C91] leading-[148px]">Tier 1</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;

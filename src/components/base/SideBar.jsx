import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, LogOut, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';
import { ROUTES, MENU_STRUCTURE } from '@/config/routes.config';
import LogoutConfirmationModal from '@/components/modals/LogoutConfirmationModal';

// Import icons
import DashboardIcon from '../../assets/icons/home.svg';
import AirtimeIcon from '../../assets/icons/phone.svg';
import DataIcon from '../../assets/icons/globe.svg';
import BillsIcon from '../../assets/icons/bills.svg';
import RequestIcon from '../../assets/icons/cash.svg';
import TransfersIcon from '../../assets/icons/transfer.svg';
import SoftPOSIcon from '../../assets/icons/softpos.svg';
import KYCIcon from '../../assets/icons/kycapproval.svg';
import EarningsIcon from '../../assets/icons/earnings.svg';
import AgentsIcon from '../../assets/icons/agents.svg';
import UsersIcon from '../../assets/icons/aggregatormanager.svg';
import AggregatorIcon from '../../assets/icons/aggregators.svg';
import AggregatorManagerIcon from '../../assets/icons/userswitch.svg';
import AccountsApprovalsIcon from '../../assets/icons/documentvalidation.svg';
import DisputedIcon from '../../assets/icons/disputed.svg';

// Icon mapping
const ICON_MAP = {
  dashboard: DashboardIcon,
  airtime: AirtimeIcon,
  data: DataIcon,
  bills: BillsIcon,
  request: RequestIcon,
  transfers: TransfersIcon,
  softpos: SoftPOSIcon,
  kyc: KYCIcon,
  earnings: EarningsIcon,
  balances: EarningsIcon,
  users: UsersIcon,
  agents: AgentsIcon,
  aggregator: AggregatorIcon,
  aggregatorManager: AggregatorManagerIcon,
  accountsApprovals: AccountsApprovalsIcon,
  disputed: DisputedIcon,
};

const Sidebar = ({ user, onLogout, setActiveSection, PERMISSIONS, isOpen, onClose }) => {
  const permissions = PERMISSIONS[user.role] || [];
  const navigate = useNavigate();
  const location = useLocation();
  
  const [expandedSections, setExpandedSections] = useState({
    transactions: true,
    accounts: true,
    approvals: true,
  });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleMenuClick = (route) => {
    setActiveSection(route.path);
    navigate(route.path);
    onClose?.();
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderMenuItem = (routeKey) => {
    const route = ROUTES[routeKey];
    if (!route || !permissions.includes(route.permission)) return null;

    const isActive =
      location.pathname === route.path ||
      (route.path !== '/dashboard' && location.pathname.startsWith(`${route.path}/`));
    const IconSrc = ICON_MAP[route.icon];

    return (
      <button
        key={route.path}
        onClick={() => handleMenuClick(route)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-general transition-colors ${
          isActive
            ? 'bg-[#FFF5F0] text-[#FF6B2C]'
            : 'text-[#7C8D96] hover:bg-gray-50'
        }`}
      >
        {IconSrc && (
          <span className="w-5 h-5 flex items-center justify-center">
            <img 
              src={IconSrc} 
              alt={route.label}
              className="w-5 h-5"
              style={{
                filter: isActive 
                  ? 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(98%) contrast(101%)'
                  : 'invert(55%) sepia(12%) saturate(436%) hue-rotate(157deg) brightness(92%) contrast(87%)'
              }}
            />
          </span>
        )}
        <span className="font-normal">{route.label}</span>
      </button>
    );
  };

  const renderSection = (section) => {
    if (!permissions.includes(section.permission)) return null;

    const isExpanded = expandedSections[section.id];

    return (
      <div key={section.id} className="mb-2">
        <button
          onClick={() => toggleSection(section.id)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs font-urbanist font-semibold text-[#B0B7C3] uppercase tracking-wide hover:text-gray-600 transition-colors"
        >
          <span>{section.label}</span>
          {isExpanded ? (
            <ChevronUp size={14} className="text-[#B0B7C3]" />
          ) : (
            <ChevronDown size={14} className="text-[#B0B7C3]" />
          )}
        </button>
        
        {isExpanded && (
          <div className="mt-1 space-y-0.5">
            {section.items.map(item => renderMenuItem(item.routeKey))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[270px] flex-col border-r border-[#E8EBED] bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-[#E8EBED] px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Qreva Logo" className="h-8 w-8" />
          <span className="text-[24px] font-urbanist font-semibold text-[#084059]">Qreva</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-[#7C8D96] hover:bg-gray-100 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {MENU_STRUCTURE.map((item) => {
            if (item.type === 'section') {
              return renderSection(item);
            }
            return renderMenuItem(item.routeKey);
          })}
        </div>
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-[#E8EBED] bg-white">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-10 h-10 bg-[#E8F4F8] rounded-full flex items-center justify-center">
            <span className="text-[#FF6B2C] font-urbanist font-bold text-sm">
              {user.username?.charAt(0)?.toUpperCase() || 'J'}
              {user.username?.split(' ')[1]?.charAt(0)?.toUpperCase() || 'D'}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-urbanist font-semibold text-[#1E1E1E] truncate">
              {user.username || 'John F. Doe'}
            </div>
            <div className="text-xs font-general text-[#808C91] truncate">
              {user.email || 'johnf.doe@gmail.com'}
            </div>
          </div>
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="text-[#B0B7C3] hover:text-[#FF6B2C] transition-colors"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <LogoutConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={onLogout}
      />
      </aside>
    </>
  );
};

export default Sidebar;

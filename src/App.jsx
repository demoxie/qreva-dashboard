import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES, getAllRoutes, getRouteConfig } from './config/routes.config';
import { RouteComponentMap } from './config/routeComponentMap';
import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import RegisterPage from './pages/auth/RegisterPage';
import Sidebar from './components/base/SideBar';
import { AuthContext, useAuth } from './hooks/useAuth';
import Breadcrumb from './components/common/BreadCrumb';
import ScrollToTop from './components/common/ScrollToTop';

// ============ ROLE-BASED ACCESS CONTROL ============
export const ROLES = {
  SUPER_ADMIN: 'SuperAdmin',
  OPERATION: 'Operation',
  SUPPORT: 'Support',
  AGENT: 'agent',
  MERCHANT: 'Merchant',
  AGGREGATOR: 'aggregator',
  AGGREGATORMANAGER: 'aggregator_manager',
};

export const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'section:transactions',
    'section:accounts',
    'section:approvals',
    'dashboard:view',
    'balances:view',
    'airtime:view',
    'data:view',
    'bills:view',
    'request:view',
    'transfers:view',
    'softpos:view',
    'kyc:view',
    'earnings:view',
    'users:view',
    'agents:view',
    'aggregator:view',
    'aggManager:view',
    'approvals:view',
    'disputes:view',
    'settings:view',
    'settings:create',
    'settings:logs:view',
    'admins:view',
    'admins:manage',
    'transactions',
    'accounts',
    'approvals',
  ],
  [ROLES.OPERATION]: [
    'section:transactions',
    'section:accounts',
    'section:approvals',
    'dashboard:view',
    'balances:view',
    'airtime:view',
    'data:view',
    'bills:view',
    'request:view',
    'transfers:view',
    'softpos:view',
    'kyc:view',
    'earnings:view',
    'users:view',
    'agents:view',
    'aggregator:view',
    'aggManager:view',
    'approvals:view',
    'disputes:view',
    'settings:view',
    'settings:create',
    'admins:view',
    'transactions',
    'accounts',
    'approvals',
  ],
  [ROLES.SUPPORT]: [
    'section:transactions',
    'section:accounts',
    'section:approvals',
    'dashboard:view',
    'balances:view',
    'airtime:view',
    'data:view',
    'bills:view',
    'request:view',
    'transfers:view',
    'softpos:view',
    'kyc:view',
    'earnings:view',
    'users:view',
    'agents:view',
    'aggregator:view',
    'aggManager:view',
    'approvals:view',
    'disputes:view',
    'transactions',
    'accounts',
    'approvals',
  ],
  [ROLES.AGENT]: [
    'dashboard:view',
    'section:transactions',
    'softpos:view',
    'transfers:view',
    'kyc:view',
    'transactions',
  ],
  [ROLES.MERCHANT]: [
    'dashboard:view',
    'section:transactions',
    'softpos:view',
    'transfers:view',
    'kyc:view',
    'transactions',
  ],
  [ROLES.AGGREGATOR]: [
    'dashboard:view',
    'section:transactions',
    'airtime:view',
    'data:view',
    'bills:view',
    'softpos:view',
    'transfers:view',
    'kyc:view',
    'transactions',
  ],
  [ROLES.AGGREGATORMANAGER]: [
    'dashboard:view',
    'section:transactions',
    'airtime:view',
    'data:view',
    'bills:view',
    'softpos:view',
    'transfers:view',
    'kyc:view',
    'transactions',
  ],
};

const LEGACY_PERMISSION_ALIASES = {
  'dashboard:view': ['dashboard.view', 'dashboard.metrics.view'],
  'balances:view': ['dashboard.balances.view'],
  'airtime:view': ['dashboard.transactions.view', 'dashboard.categoryMetrics.view'],
  'data:view': ['dashboard.transactions.view', 'dashboard.categoryMetrics.view'],
  'bills:view': ['dashboard.transactions.view', 'dashboard.categoryMetrics.view'],
  'request:view': ['requests.view'],
  'transfers:view': ['dashboard.transactions.view', 'dashboard.categoryMetrics.view'],
  'softpos:view': ['dashboard.transactions.view', 'dashboard.categoryMetrics.view'],
  'kyc:view': ['dashboard.transactions.view', 'dashboard.breakdown.view'],
  'earnings:view': ['dashboard.earnings.view'],
  'users:view': ['users.view'],
  'agents:view': ['users.view'],
  'aggregator:view': ['users.view', 'aggregator.network.view'],
  'aggManager:view': ['users.view', 'aggregator.network.view'],
  'approvals:view': ['approvals.accounts.view', 'approvals.disputes.view', 'approvals.limitIncrease.view'],
  'disputes:view': ['approvals.disputes.view'],
  'admins:view': ['adminUsers.view', 'rbac.roles.view'],
  'admins:manage': ['adminUsers.invite', 'adminUsers.status.manage', 'adminUsers.role.update'],
  'settings:logs:view': ['audit.view'],
  'settings:view': [
    'settings.profile.view',
    'settings.agencyCategory.view',
    'settings.tier.view',
    'settings.commission.view',
    'contracts.view',
    'aggregatorCommission.default.view',
    'aggregatorCommission.personal.view',
    'rbac.roles.view',
  ],
  'settings:create': [
    'settings.profile.update',
    'settings.agencyCategory.manage',
    'settings.tier.manage',
    'settings.commission.manage',
    'contracts.manage',
    'aggregatorCommission.default.manage',
    'aggregatorCommission.personal.manage',
    'rbac.roles.manage',
    'rbac.assign',
  ],
};

const matchesPermission = (granted, required) => {
  if (granted === '*' || granted === required) return true;
  if (granted.endsWith('.*')) {
    const prefix = granted.slice(0, -2);
    return required === prefix || required.startsWith(`${prefix}.`);
  }
  return false;
};

const hasGrantedPermission = (grantedPermissions, requiredPermission) => {
  if (!requiredPermission) return true;
  if (!Array.isArray(grantedPermissions) || !grantedPermissions.length) return false;

  const denyPermissions = grantedPermissions
    .filter((item) => typeof item === 'string' && item.startsWith('!'))
    .map((item) => item.slice(1));

  if (denyPermissions.some((item) => matchesPermission(item, requiredPermission))) {
    return false;
  }

  return grantedPermissions.some((item) => typeof item === 'string' && !item.startsWith('!') && matchesPermission(item, requiredPermission));
};

// ============ PROTECTED ROUTE COMPONENT ============
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const mustChangePassword = localStorage.getItem('mustChangePassword') === 'true';
  const currentPath = location.pathname;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to change password if required (except on change-password route itself)
  if (mustChangePassword && currentPath !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  const route = getRouteConfig(currentPath);
  const rolePermissions = PERMISSIONS[user.role] || [];
  const runtimePermissions = Array.isArray(user?.permissions) && user.permissions.length
    ? user.permissions
    : rolePermissions;
  const requiredPermission = route?.permission;
  const hasPermission = (() => {
    if (!requiredPermission) return true;
    if (hasGrantedPermission(runtimePermissions, requiredPermission)) return true;

    const aliases = LEGACY_PERMISSION_ALIASES[requiredPermission] || [];
    if (aliases.some((alias) => hasGrantedPermission(runtimePermissions, alias))) return true;

    if (requiredPermission === 'transactions') return hasGrantedPermission(runtimePermissions, 'dashboard.transactions.view') || runtimePermissions.includes('section:transactions');
    if (requiredPermission === 'accounts') return hasGrantedPermission(runtimePermissions, 'users.view') || runtimePermissions.includes('section:accounts');
    if (requiredPermission === 'approvals') {
      return (
        hasGrantedPermission(runtimePermissions, 'approvals.accounts.view') ||
        hasGrantedPermission(runtimePermissions, 'approvals.disputes.view') ||
        hasGrantedPermission(runtimePermissions, 'approvals.limitIncrease.view') ||
        runtimePermissions.includes('section:approvals')
      );
    }
    return false;
  })();

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// ============ PUBLIC ROUTE COMPONENT ============
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const mustChangePassword = localStorage.getItem('mustChangePassword') === 'true';
  
  if (user) {
    // If logged in but must change password, redirect there
    if (mustChangePassword) {
      return <Navigate to="/change-password" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// ============ LAYOUT COMPONENT ============
const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    return location.pathname.split('/')[1] || 'dashboard';
  });

  useEffect(() => {
    const section = location.pathname.split('/')[1] || 'dashboard';
    setActiveSection(section);
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar 
        user={user} 
        onLogout={logout}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        PERMISSIONS={PERMISSIONS}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Breadcrumb user={user} />
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

// ============ AUTH PROVIDER ============
const getStoredUser = () => {
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('userRole');
  if (!token || !role) return null;
  return {
    email: localStorage.getItem('userEmail'),
    username: localStorage.getItem('userName'),
    role,
    permissions: (() => {
      try {
        const raw = localStorage.getItem('userPermissions');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    })(),
    token,
    userId: localStorage.getItem('userId'),
    mustChangePassword: localStorage.getItem('mustChangePassword') === 'true',
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = (userData) => {
    setUser(userData);
    
    // Store in localStorage
    localStorage.setItem('adminToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.username);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('mustChangePassword', userData.mustChangePassword || 'false');
    localStorage.setItem('userPermissions', JSON.stringify(userData.permissions || []));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('mustChangePassword');
    localStorage.removeItem('userPermissions');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ============ LOGIN WRAPPER ============
const LoginWrapper = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    login(userData);
    
    // Redirect based on mustChangePassword flag
    if (userData.mustChangePassword) {
      navigate('/change-password');
    } else {
      navigate('/dashboard');
    }
  };

  return <LoginPage onLogin={handleLogin} />;
};

// ============ CHANGE PASSWORD WRAPPER ============
const ChangePasswordWrapper = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  return <ChangePasswordPage onSuccess={handleSuccess} />;
};

// ============ MAIN APP ============
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginWrapper />
              </PublicRoute>
            } 
          />

          <Route path="/register" element={<RegisterPage />} />
          
          {/* Change Password Route */}
          <Route 
            path="/change-password" 
            element={
              <ProtectedRoute>
                <ChangePasswordWrapper />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected Dashboard Routes */}
          {getAllRoutes().map((route) => {
            const RouteKey = Object.keys(ROUTES).find(
              key => ROUTES[key].path === route.path
            );
            const PageComponent = RouteComponentMap[RouteKey];

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      {PageComponent ? (
                        <PageComponent />
                      ) : (
                        <div className="p-6">
                          <h1 className="text-2xl font-bold">{route.label}</h1>
                          <p>No component mapped for this route.</p>
                        </div>
                      )}
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            );
          })}
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<div className="p-6 text-center">404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

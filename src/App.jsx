import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ROUTES, getAllRoutes } from './config/routes.config';
import { RouteComponentMap } from './config/routeComponentMap';
import LoginPage from './pages/auth/LoginPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import Sidebar from './components/base/SideBar';
import { AuthContext, useAuth } from './hooks/useAuth';
import Breadcrumb from './components/common/BreadCrumb';
import ScrollToTop from './components/common/ScrollToTop';

// ============ ROLE-BASED ACCESS CONTROL ============
export const ROLES = {
  SUPER_ADMIN: 'SuperAdmin',
  AGENT: 'agent',
  AGGREGATOR: 'aggregator',
  AGGREGATORMANAGER: 'aggregator_manager',
};

export const PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'section:transactions',
    'section:accounts',
    'section:approvals',
    'dashboard:view',
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
  ],
  [ROLES.AGENT]: [
    'dashboard:view',
    'section:transactions',
    'airtime:view',
    'data:view',
  ],
  [ROLES.AGGREGATOR]: [
    'dashboard:view',
    'section:transactions',
    'aggregator:view',
    'airtime:view',
    'data:view',
  ],
  [ROLES.AGGREGATORMANAGER]: [
    'dashboard:view',
    'section:transactions',
    'section:accounts',
    'agents:view',
    'aggregator:view',
    'users:view',
    'airtime:view',
    'data:view',
  ],
};

// ============ PROTECTED ROUTE COMPONENT ============
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const mustChangePassword = localStorage.getItem('mustChangePassword') === 'true';
  const currentPath = window.location.pathname;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to change password if required (except on change-password route itself)
  if (mustChangePassword && currentPath !== '/change-password') {
    return <Navigate to="/change-password" replace />;
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
  const [activeSection, setActiveSection] = useState('dashboard');

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
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const mustChangePassword = localStorage.getItem('mustChangePassword');

    if (token && role) {
      setUser({
        email: email,
        username: name,
        role: role,
        token: token,
        userId: userId,
        mustChangePassword: mustChangePassword === 'true',
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    
    // Store in localStorage
    localStorage.setItem('adminToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.username);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('mustChangePassword', userData.mustChangePassword || 'false');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('mustChangePassword');
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
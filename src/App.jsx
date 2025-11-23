import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ROUTES, getAllRoutes } from './config/routes.config';
import { RouteComponentMap } from './config/routeComponentMap';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/base/SideBar';
import { AuthContext, useAuth } from './hooks/useAuth';
import Breadcrumb from './components/common/BreadCrumb';

// ============ ROLE-BASED ACCESS CONTROL ============
export const ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  AGGREGATOR: 'aggregator',
  AGGREGATORMANAGER: 'aggregator_manager',
};

export const PERMISSIONS = {
  [ROLES.ADMIN]: ['dashboard', 'transactions', 'accounts', 'approvals', 'settings'],
  [ROLES.AGGREGATORMANAGER]: ['dashboard', 'transactions', 'accounts'],
  [ROLES.AGGREGATOR]: ['dashboard', 'transactions', 'aggregation'],
  [ROLES.AGENT]: ['dashboard', 'transactions']
};

//  PROTECTED ROUTE COMPONENT 
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// PUBLIC ROUTE COMPONENT (Redirect if already logged in) 
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

//  LAYOUT COMPONENT 
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
        {/* or <BreadcrumbPath user={user} /> */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

// AUTH PROVIDER 
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//  LOGIN WRAPPER
const LoginWrapper = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    login(userData);
    navigate('/dashboard');
  };

  return <LoginPage onLogin={handleLogin} ROLES={ROLES} />;
};

// MAIN APP 
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PublicRoute><LoginWrapper /></PublicRoute>} />
          {/* Generate routes dynamically from config */}
          {getAllRoutes().map((route) => {
            // Use the ROUTE KEY to get the component
            const RouteKey = Object.keys(ROUTES).find(key => ROUTES[key].path === route.path);
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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
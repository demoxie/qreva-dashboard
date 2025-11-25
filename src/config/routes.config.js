
export const ROUTES = {
  // Main routes
  DASHBOARD: {
    path: '/dashboard',
    label: 'Dashboard',
    parent: null,
    icon: 'dashboard',
    permission: 'dashboard',
  },
  
  // Transaction routes
  AIRTIME: {
    path: '/airtime',
    label: 'Airtime Purchase',
    parent: '/dashboard',
    icon: 'airtime',
    permission: 'transactions',
  },
  DATA: {
    path: '/data',
    label: 'Data Purchase',
    parent: '/dashboard',
    icon: 'data',
    permission: 'transactions',
  },
  BILLS: {
    path: '/bills',
    label: 'Bills Payment',
    parent: '/dashboard',
    icon: 'bills',
    permission: 'transactions',
  },
  REQUEST: {
    path: '/request',
    label: 'Request',
    parent: '/dashboard',
    icon: 'request',
    permission: 'transactions',
  },
  TRANSFERS: {
    path: '/transfers',
    label: 'Transfers',
    parent: '/dashboard',
    icon: 'transfers',
    permission: 'transactions',
  },
  SOFTPOS: {
    path: '/softpos',
    label: 'SoftPOS',
    parent: '/dashboard',
    icon: 'softpos',
    permission: 'transactions',
  },
  KYC: {
    path: '/kyc',
    label: 'KYC Verification',
    parent: '/dashboard',
    icon: 'kyc',
    permission: 'transactions',
  },
  EARNINGS: {
    path: '/earnings',
    label: 'My Earnings',
    parent: '/dashboard',
    icon: 'earnings',
    permission: 'transactions',
  },
  
  // Account routes
  USERS: {
    path: '/users',
    label: 'Users',
    parent: '/dashboard',
    icon: 'users',
    permission: 'accounts',
  },
  AGENTS: {
    path: '/agents',
    label: 'Agents',
    parent: '/dashboard',
    icon: 'agents',
    permission: 'accounts',
  },
  AGGREGATION: {
    path: '/aggregation',
    label: 'Aggregators',
    parent: '/dashboard',
    icon: 'aggregation',
    permission: 'aggregation',
  },
  AGGREGATOR_MANAGER: {
    path: '/aggregator-manager',
    label: 'Aggregator Manager',
    parent: '/dashboard',
    icon: 'aggregatorManager',
    permission: 'accounts',
  },
  
  // Approval routes
  ACCOUNTS_APPROVALS: {
    path: '/accounts-approvals',
    label: 'Account Approvals',
    parent: '/dashboard',
    icon: 'accountsApprovals',
    permission: 'approvals',
  },
  
  // Nested/Dynamic routes
  USER_DETAILS: {
    path: '/users/:id',
    label: 'User Details',
    parent: '/users',
    icon: null,
    permission: 'accounts',
    dynamic: true,
  },
  AGENT_DETAILS: {
    path: '/agents/:id',
    label: 'Agent Details',
    parent: '/agents',
    icon: null,
    permission: 'accounts',
    dynamic: true,
  },
  TRANSACTION_DETAILS: {
    path: '/transactions/:id',
    label: 'Transaction Details',
    parent: '/dashboard',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
   AIRTIME_DETAILS: {
    path: '/airtime/details/:type/:id',
    label: 'View Details',
    parent: '/airtime',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
    DATA_DETAILS: {
    path: '/data/details/:type/:id',
    label: 'View Details',
    parent: '/data',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
    BILLS_DETAILS: {
    path: '/bills/details/:type/:id',
    label: 'View Details',
    parent: '/bills',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
    TRANSFER_DETAILS: {
    path: '/transfers/details/:type/:id',
    label: 'View Details',
    parent: '/transfers',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
    SOFTPOS_DETAILS: {
    path: '/softpos/details/:type/:id',
    label: 'View Details',
    parent: '/softpos',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
};

// Helper function to get route config by path
export const getRouteConfig = (pathname) => {
  // Create a map for quick lookup
  const routeMap = Object.values(ROUTES).reduce((acc, route) => {
    acc[route.path] = route;
    return acc;
  }, {});

  // Check for exact match first
  if (routeMap[pathname]) {
    return routeMap[pathname];
  }

  // Check for dynamic routes
  for (const route of Object.values(ROUTES)) {
    if (route.dynamic) {
      const pattern = route.path.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      if (regex.test(pathname)) {
        return route;
      }
    }
  }

  // Default to dashboard
  return ROUTES.DASHBOARD;
};

// Helper to get all routes as array
export const getAllRoutes = () => Object.values(ROUTES);

// Helper to get routes by permission
export const getRoutesByPermission = (permission) => {
  return Object.values(ROUTES).filter(route => route.permission === permission);
};

// Menu structure for sidebar
export const MENU_STRUCTURE = [
  {
    id: 'dashboard',
    type: 'item',
    routeKey: 'DASHBOARD',
  },
  {
    id: 'transactions',
    type: 'section',
    label: 'TRANSACTIONS',
    permission: 'transactions',
    items: [
      { routeKey: 'AIRTIME' },
      { routeKey: 'DATA' },
      { routeKey: 'BILLS' },
      { routeKey: 'REQUEST' },
      { routeKey: 'TRANSFERS' },
      { routeKey: 'SOFTPOS' },
      { routeKey: 'KYC' },
      { routeKey: 'EARNINGS' },
    ],
  },
  {
    id: 'accounts',
    type: 'section',
    label: 'ACCOUNTS',
    permission: 'accounts',
    items: [
      { routeKey: 'USERS' },
      { routeKey: 'AGENTS' },
      { routeKey: 'AGGREGATION' },
      { routeKey: 'AGGREGATOR_MANAGER' },
    ],
  },
  {
    id: 'approvals',
    type: 'section',
    label: 'APPROVALS',
    permission: 'approvals',
    items: [
      { routeKey: 'ACCOUNTS_APPROVALS' },
    ],
  },
];
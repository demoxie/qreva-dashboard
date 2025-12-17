
export const ROUTES = {
  // Main routes
  DASHBOARD: {
    path: '/dashboard',
    label: 'Dashboard',
    parent: null,
    icon: 'dashboard',
    permission: 'dashboard:view',
  },


  // Transaction routes
  AIRTIME: {
    path: '/airtime',
    label: 'Airtime Purchase',
    icon: 'airtime',
    permission: 'airtime:view',
  },
  DATA: {
    path: '/data',
    label: 'Data Purchase',
    icon: 'data',
    permission: 'data:view',
  },
  BILLS: {
    path: '/bills',
    label: 'Bills Payment',
    icon: 'bills',
    permission: 'bills:view',
  },
  REQUEST: {
    path: '/request',
    label: 'Request',
    icon: 'request',
    permission: 'request:view',
  },
  TRANSFERS: {
    path: '/transfers',
    label: 'Transfers',
    icon: 'transfers',
    permission: 'transfers:view',
  },
  SOFTPOS: {
    path: '/softpos',
    label: 'SoftPOS',
    icon: 'softpos',
    permission: 'softpos:view',
  },
  KYC: {
    path: '/kyc',
    label: 'KYC Verification',
    icon: 'kyc',
    permission: 'kyc:view',
  },
  EARNINGS: {
    path: '/earnings',
    label: 'My Earnings',
    icon: 'earnings',
    permission: 'earnings:view',
  },

  // Account routes
  USERS: {
    path: '/users',
    label: 'Users',
    icon: 'users',
    permission: 'users:view',
  },
  AGENTS: {
    path: '/agents',
    label: 'Agents',
    icon: 'agents',
    permission: 'agents:view',
  },
  AGGREGATOR: {
    path: '/aggregators',
    label: 'Aggregators',
    icon: 'aggregator',
    permission: 'aggregator:view',
  },
  AGGREGATOR_MANAGER: {
    path: '/aggregator-manager',
    label: 'Aggregator Manager',
    icon: 'aggregatorManager',
    permission: 'aggManager:view',
  },

  // Approval routes
  ACCOUNTS_APPROVALS: {
    path: '/account-approvals',
    label: 'Account Approvals',
    icon: 'accountsApprovals',
    permission: 'approvals:view',
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
  AGGREGATOR_DETAILS: {
    path: '/aggregators/:id',
    label: 'Aggregator Details',
    parent: '/aggregators',
    icon: null,
    permission: 'accounts',
    dynamic: true,
  },
  AGGREGATOR_MANAGER_DETAILS: {
    path: '/aggregator-managers/:id',
    label: 'Aggregator Manager Details',
    parent: '/aggregator-manager',
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
    KYC_DETAILS: {
    path: '/kyc/details/:type/:id',
    label: 'View Details',
    parent: '/kyc',
    icon: null,
    permission: 'transactions',
    dynamic: true,
  },
  ACCOUNTS_APPROVALS_DETAILS: {
    path: '/account-approvals/:type/:id',
    label: 'View Details',
    parent: 'account-approvals',
    icon: null,
    permission: 'approvals',
    dynamic: true,
  }

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
    permission: 'section:transactions',
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
    permission: 'section:accounts',
    items: [
      { routeKey: 'USERS' },
      { routeKey: 'AGENTS' },
      { routeKey: 'AGGREGATOR' },
      { routeKey: 'AGGREGATOR_MANAGER' },
    ],
  },
  {
    id: 'approvals',
    type: 'section',
    label: 'APPROVALS',
    permission: 'section:approvals',
    items: [
      { routeKey: 'ACCOUNTS_APPROVALS' },
    ],
  },
];

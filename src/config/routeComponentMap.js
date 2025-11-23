// src/config/routeComponentMap.js

import DashboardContent from "@/pages/DashboardContent";
import AirtimePurchase from "@/pages/AirtimePurchase";
import DataPurchase from "@/pages/DataPurchase";
import KYCVerification from "@/pages/KYCVerification";
import BillsPayment from "@/pages/BillsPayment";
import SoftPOS from "@/pages/SoftPOS";
import Transfers from "@/pages/Tranfers";

// Transactions
// import RequestPage from "../pages/transactions/RequestPage";
// import EarningsPage from "../pages/transactions/EarningsPage";

// Accounts
// import UsersPage from "../pages/accounts/UsersPage";
// import AgentsPage from "../pages/accounts/AgentsPage";
// import AggregationPage from "../pages/accounts/AggregationPage";
// import AggregatorManagerPage from "../pages/accounts/AggregatorManagerPage";

// Approvals
// import AccountsApprovalsPage from "../pages/approvals/AccountsApprovalsPage";

// Dynamic Pages
// import UserDetails from "../pages/accounts/UserDetails";
// import AgentDetails from "../pages/accounts/AgentDetails";
// import TransactionDetails from "../pages/transactions/TransactionDetails";


// ===== Component Mapper by ROUTES Key =====
export const RouteComponentMap = {
  DASHBOARD: DashboardContent,
  AIRTIME: AirtimePurchase,
  DATA: DataPurchase,
  KYC: KYCVerification,
  BILLS: BillsPayment,
  SOFTPOS: SoftPOS,
  TRANSFERS: Transfers,

  // Transactions
//   REQUEST: RequestPage,
//   TRANSFERS: TransfersPage,
//   EARNINGS: EarningsPage,

  // Accounts
//   USERS: UsersPage,
//   AGENTS: AgentsPage,
//   AGGREGATION: AggregationPage,
//   AGGREGATOR_MANAGER: AggregatorManagerPage,

  // Approvals
//   ACCOUNTS_APPROVALS: AccountsApprovalsPage,

  // Dynamic Routes
//   USER_DETAILS: UserDetails,
//   AGENT_DETAILS: AgentDetails,
//   TRANSACTION_DETAILS: TransactionDetails,
};

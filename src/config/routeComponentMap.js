// ===== Import All Page Components Here =====
import DashboardContent from "@/pages/DashboardContent";
import AirtimePurchase from "@/pages/AirtimePurchase";
import DataPurchase from "@/pages/DataPurchase";
import KYCVerification from "@/pages/KYCVerification";
import BillsPayment from "@/pages/BillsPayment";
import SoftPOS from "@/pages/SoftPOS";
import Transfers from "@/pages/Tranfers";

//Nested Details Pages
import AirtimeDetails from "@/pages/commonlynested/AirTimeDetails";
import DataDetails from "@/pages/commonlynested/DataDetails";
import BillsDetails from "@/pages/commonlynested/BillsDetails";
import TransferDetails from "@/pages/commonlynested/TransferDetails";
import SoftPOSDetails from "@/pages/commonlynested/SoftPOSDetails";

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

  // Nested Details Pages
  AIRTIME_DETAILS: AirtimeDetails,
  DATA_DETAILS: DataDetails,
  BILLS_DETAILS: BillsDetails,
  TRANSFER_DETAILS: TransferDetails,
  SOFTPOS_DETAILS: SoftPOSDetails,

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

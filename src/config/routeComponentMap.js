// ===== Import All Page Components Here =====
import DashboardContent from "@/pages/DashboardContent";
import AirtimePurchase from "@/pages/AirtimePurchase";
import DataPurchase from "@/pages/DataPurchase";
import KYCVerification from "@/pages/KYCVerification";
import BillsPayment from "@/pages/BillsPayment";
import SoftPOS from "@/pages/SoftPOS";
import Transfers from "@/pages/Tranfers";
import Users from "@/pages/Users";
import Agents from "@/pages/Agents";
import Aggregators from "@/pages/Aggregators";
import AggregatorManagers from "@/pages/AggregatorManager";
import MyEarnings from "@/pages/MyEarnings";
import AccountApprovals from "@/pages/AccountApprovals";

//Nested Details Pages
import AirtimeDetails from "@/pages/commonlynested/AirTimeDetails";
import DataDetails from "@/pages/commonlynested/DataDetails";
import BillsDetails from "@/pages/commonlynested/BillsDetails";
import TransferDetails from "@/pages/commonlynested/TransferDetails";
import SoftPOSDetails from "@/pages/commonlynested/SoftPOSDetails";
import KYCDetails from "@/pages/commonlynested/KYCDetails";
import UserProfileDetails from "@/pages/commonlynested/UserProfileDetails";
import AgentProfileDetails from "@/pages/commonlynested/AgentProfileDetails";
import AggregatorProfileDetails from "@/pages/commonlynested/AggregatorProfileDetails";
import AggregatorManagerProfileDetails from "@/pages/commonlynested/AggregatorManagerProfileDetails";
import AccountApprovalDetails from "@/pages/commonlynested/AccountApprovalDetails";

// Transactions
// import RequestPage from "../pages/transactions/RequestPage";
// import EarningsPage from "../pages/transactions/EarningsPage";

// Accounts


// Approvals
// import AccountsApprovalsPage from "../pages/approvals/AccountsApprovalsPage";
//
// Disputed Transactions

// ===== Component Mapper by ROUTES Key =====
export const RouteComponentMap = {
  DASHBOARD: DashboardContent,
  AIRTIME: AirtimePurchase,
  DATA: DataPurchase,
  KYC: KYCVerification,
  BILLS: BillsPayment,
  SOFTPOS: SoftPOS,
  TRANSFERS: Transfers,
  USERS: Users,
  AGENTS: Agents,
  AGGREGATOR: Aggregators,
  AGGREGATOR_MANAGER: AggregatorManagers,
  EARNINGS: MyEarnings,
  ACCOUNTS_APPROVALS: AccountApprovals,

  // Nested Details Pages
  AIRTIME_DETAILS: AirtimeDetails,
  DATA_DETAILS: DataDetails,
  BILLS_DETAILS: BillsDetails,
  TRANSFER_DETAILS: TransferDetails,
  SOFTPOS_DETAILS: SoftPOSDetails,
  KYC_DETAILS: KYCDetails,
  USER_DETAILS: UserProfileDetails,
  AGENT_DETAILS: AgentProfileDetails,
  AGGREGATOR_DETAILS: AggregatorProfileDetails,
  AGGREGATOR_MANAGER_DETAILS: AggregatorManagerProfileDetails,
  ACCOUNTS_APPROVALS_DETAILS: AccountApprovalDetails,

  // Transactions
//   REQUEST: RequestPage,
//   EARNINGS: EarningsPage,

  // Approvals
//   ACCOUNTS_APPROVALS: AccountsApprovalsPage,
// Seetings
};

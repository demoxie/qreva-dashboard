// ===== Import All Page Components Here =====
import DashboardContent from "@/pages/dashboard/DashboardContent";
import AirtimePurchase from "@/pages/airtimePurchase/AirtimePurchase";
import DataPurchase from "@/pages/dataPurchase/DataPurchase";
import KYCVerification from "@/pages/kycVerification/KYCVerification";
import BillsPayment from "@/pages/billsPayment/BillsPayment";
import SoftPOS from "@/pages/softPOS/SoftPOS";
import Transfers from "@/pages/transfers/Tranfers";
import Users from "@/pages/users/Users";
import Agents from "@/pages/agents/Agents";
import Aggregators from "@/pages/aggregator/Aggregators";
import AggregatorManagers from "@/pages/aggregatorManager/AggregatorManager";
import MyEarnings from "@/pages/myearnings/MyEarnings";
import AccountApprovals from "@/pages/accountApprovals/AccountApprovals";
import Request from "@/pages/request/Request";
import Settings from "@/pages/settings/Settings";

// Settings
import MyProfile from "@/pages/settings/nested/profile/MyProfile";
import RBAC from "@/pages/settings/nested/rbac/RBAC";
import CreateRole from "@/pages/settings/nested/rbac/CreateRole";
import AgentCategory from "@/pages/settings/nested/agentCategory/AgentCategory";
import CreateAgentCategory from "@/pages/settings/nested/agentCategory/CreateAgentCategory";
import ActivityLogs from "@/pages/settings/nested/activityLogs/ActivityLogs";
import TierManagement from "@/pages/settings/nested/tier/TierManagement";
import CreateTier from "@/pages/settings/nested/tier/CreateTier";

//Nested Details Pages
import AirtimeDetails from "@/pages/airtimePurchase/nested/AirTimeDetails";
import DataDetails from "@/pages/dataPurchase/nested/DataDetails";
import BillsDetails from "@/pages/billsPayment/nested/BillsDetails";
import TransferDetails from "@/pages/transfers/nested/TransferDetails";
import SoftPOSDetails from "@/pages/softPOS/nested/SoftPOSDetails";
import KYCDetails from "@/pages/kycVerification/nested/KYCDetails";
import UserProfileDetails from "@/pages/users/nested/UserProfileDetails";
import AgentProfileDetails from "@/pages/agents/nested/AgentProfileDetails";
import AggregatorProfileDetails from "@/pages/aggregator/nested/AggregatorProfileDetails";
import AggregatorManagerProfileDetails from "@/pages/aggregatorManager/nested/AggregatorManagerProfileDetails";
import AccountApprovalDetails from "@/pages/accountApprovals/nested/AccountApprovalDetails";

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
  REQUEST: Request,
  SETTINGS: Settings,

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

  // Settings
  SETTINGS_PROFILE: MyProfile,
  SETTINGS_RBAC: RBAC,
  SETTINGS_CREATE_ROLE: CreateRole,
  SETTINGS_AGENT_CATEGORY: AgentCategory,
  SETTINGS_CREATE_AGENT_CATEGORY: CreateAgentCategory,
  SETTINGS_ACTIVITY_LOGS: ActivityLogs,
  SETTINGS_TIER: TierManagement,
  SETTINGS_CREATE_TIER: CreateTier,
};

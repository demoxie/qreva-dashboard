import CustomEye from "@/components/icons/CustomEye";
import CustomShare from "@/components/icons/CustomShare";
import { userTransactionColumns } from "@/pages/users/constants";

export const createTransactionActions = (setSelectedTransaction, setShowDetailsModal, setShowShareModal) => [
  {
    label: 'View Transaction Details',
    type: 'view',
    icon: CustomEye,
    onClick: (transaction) => {
      setSelectedTransaction(transaction);
      setShowDetailsModal(true);
    }
  },
  {
    label: 'Share Receipt',
    type: 'share',
    icon: CustomShare,
    onClick: (transaction) => {
      setSelectedTransaction(transaction);
      setShowShareModal(true);
    }
  }
];

export const createUserActions = (userData, setShowSuspendModal, setShowPromoteModal, setPromotionType, setShowActionsMenu) => {
  const actions = [
    {
      label: 'Suspend User',
      onClick: () => {
        setShowActionsMenu(false);
        setShowSuspendModal(true);
      }
    }
  ];

  if (userData?.type === 'Individual' || userData?.accountType === 'Personal Account') {
    const promotions = ['Agent', 'Aggregator', 'Agg. Manager'];
    promotions.forEach(type => {
      actions.push({
        label: `Promote To ${type}`,
        onClick: () => {
          setPromotionType(type);
          setShowActionsMenu(false);
          setShowPromoteModal(true);
        }
      });
    });
  }

  return actions;
};

export const getAvailableTabs = (userType) => {
  const tabs = [
    { key: 'profile', label: 'Profile Details' },
    { key: 'transactions', label: 'Transaction History' }
  ];

  if (userType === 'Aggregator') {
    tabs.push({ key: 'agents', label: 'Agents' });
  }

  if (userType === 'Merchant') {
    tabs.push(
      { key: 'terminalA', label: 'Terminal A' },
      { key: 'terminalB', label: 'Terminal B' }
    );
  }

  return tabs;
};


export const tabConfig = {
  transactions: {
    title: 'Transactions',
    dataKey: 'transactions',
    columns: userTransactionColumns
  },
  agents: {
    title: 'Agents',
    dataKey: 'agents',
    columns: userTransactionColumns
  },
  terminalA: {
    title: 'Terminal A',
    dataKey: 'terminalA',
    columns: userTransactionColumns
  },
  terminalB: {
    title: 'Terminal B',
    dataKey: 'terminalB',
    columns: userTransactionColumns
  }
};
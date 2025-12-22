import { useState } from 'react';

export const useProfileModals = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [promotionType, setPromotionType] = useState('');

  return {
    modals: {
      showDetailsModal,
      showShareModal,
      showSuspendModal,
      showPromoteModal,
      showActionsMenu,
    },
    setters: {
      setShowDetailsModal,
      setShowShareModal,
      setShowSuspendModal,
      setShowPromoteModal,
      setShowActionsMenu,
    },
    selectedTransaction,
    setSelectedTransaction,
    promotionType,
    setPromotionType,
  };
};
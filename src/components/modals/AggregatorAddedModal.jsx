import ActionSuccessModal from './ActionSuccessModal';

// TODO: Wire to real API when backend endpoint for adding aggregators/aggregator managers is ready. Currently uses mock data.
const AggregatorAddedModal = ({ isOpen, onClose }) => {
  return (
    <ActionSuccessModal
      isOpen={isOpen}
      onClose={onClose}
      title="Aggregator added"
      message="This aggregator has been sent an invitation link to the email just registered and can go ahead to onboard on the app!"
      buttonText="Dismiss"
    />
  );
};

export default AggregatorAddedModal;

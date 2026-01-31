import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DISPUTED_TRANSACTIONS_DATA } from './data';
import DeclineReasonModal from '@/components/modals/DeclineReasonModal';
import ActionSuccessModal from '@/components/modals/ActionSuccessModal';

const DisputedTransactionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    
    // Find transaction by ID or default to first for demo if not found/mocking
    const transaction = DISPUTED_TRANSACTIONS_DATA.find(t => t.id === Number(id)) || DISPUTED_TRANSACTIONS_DATA[0];

    const handleDeclineClick = () => {
        setIsDeclineModalOpen(true);
    };

    const handleDeclineSubmit = (reason) => {
        console.log("Declined with reason:", reason);
        // Here you would typically make an API call
        setIsDeclineModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <div className="flex items-center text-sm text-orange-500 mb-1">
                         <span onClick={() => navigate('/disputed-transactions')} className="cursor-pointer hover:underline">Disputed Transactions</span>
                         <span className="mx-2">/</span>
                         <span className="text-gray-500">View Details</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-start">
                <div>
                     <h1 className="text-2xl font-bold text-gray-900">View Details</h1>
                     <p className="text-gray-500">Here is the full list of KYC approvals on the platform</p>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        className="text-red-500 border-red-200 bg-red-50 hover:bg-red-100 font-medium px-8"
                        onClick={handleDeclineClick}
                    >
                        Decline
                    </Button>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8">Refund</Button>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-gray-50 rounded-lg p-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-lg">
                        RR
                     </div>
                     <div>
                        <h2 className="text-lg font-bold text-gray-900">{transaction.recipient}</h2>
                        <p className="text-sm text-gray-500">{transaction.walletAccountNo}</p>
                     </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">{transaction.balance}</span>
                </div>
            </div>

            {/* Details Grid */}
            <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Recipient Details</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.recipientDetails}</p>
                </div>
                 <div>
                    <label className="text-xs text-gray-400 block mb-1">Dispute Type</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.disputeType}</p>
                </div>
                <div>
                    <label className="text-xs text-gray-400 block mb-1">Transaction Date</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.transactionDate}</p>
                </div>
                 <div>
                    <label className="text-xs text-gray-400 block mb-1">Date Sent</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.dateSent}</p>
                </div>
                 <div>
                    <label className="text-xs text-gray-400 block mb-1">Transaction ID</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.transactionId}</p>
                </div>
                 <div>
                    <label className="text-xs text-gray-400 block mb-1">Category</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.category}</p>
                </div>
                 <div>
                    <label className="text-xs text-gray-400 block mb-1">Dispute Status</label>
                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full font-medium">
                        {transaction.disputeStatus}
                    </span>
                </div>
                 <div>
                    <label className="text-xs text-gray-400 block mb-1">Transaction Status</label>
                     <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium border border-gray-200">
                        {transaction.transactionStatus}
                    </span>
                </div>
                <div className="md:col-span-2">
                    <label className="text-xs text-gray-400 block mb-1">Short Description</label>
                    <p className="text-sm font-medium text-gray-900">{transaction.shortDescription}</p>
                </div>
            </div>

            {/* Image Preview */}
            <div className="space-y-2">
                 <h3 className="text-sm text-gray-500">Uploaded Photo</h3>
                 <div className="border border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
                     <div className="text-gray-400">Image Preview Placeholder</div>
                 </div>
            </div>

            <DeclineReasonModal 
                isOpen={isDeclineModalOpen}
                onClose={() => setIsDeclineModalOpen(false)}
                onDecline={handleDeclineSubmit}
            />

            <ActionSuccessModal 
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                title="Dispute Declined"
                message="The user will be notified about the declined dispute as this action has been successfully completed"
                buttonText="Dismiss"
            />
        </div>
    );
};

export default DisputedTransactionDetails;

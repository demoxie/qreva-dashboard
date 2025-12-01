import { X, ExternalLink } from 'lucide-react';

const ShareReceiptModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const handleShareReceipt = () => {
    console.log('Share receipt:', transaction);
    // Handle receipt sharing
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Share Receipt</h2>
            <p className="text-sm text-gray-500 mt-1">Here are the receipts of this transaction</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Receipt Card */}
        <div className="px-6 pb-6">
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-white">
            {/* Decorative circles at top */}
            <div className="flex justify-between mb-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              ))}
            </div>

            {/* Receipt Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">q</span>
                </div>
                <span className="font-semibold text-gray-900">qreva</span>
              </div>
              <span className="text-xs text-gray-500">Transaction Receipt</span>
            </div>

            {/* Amount */}
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                ₦{transaction.amount?.toLocaleString() || '3,000,000'}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                Transaction Successful!
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Completed on Mon October, 2025 | 12:00 PM
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient Details</span>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {transaction.recipient || 'Rejoice Regina Rose'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.location || 'Safe Haven | 0892481526'}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Sender Details</span>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {transaction.sender || 'Victor Odiluwa'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.senderInfo || 'Ent | 0181 | 2091826245'}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium text-gray-900 font-mono text-xs">
                  {transaction.id || '1810200100009377192750444'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium text-gray-900">{transaction.category || 'Transfer'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Date</span>
                <span className="font-medium text-gray-900">
                  {transaction.date || '18th October, 2025 | 09:00am'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-medium">Successful</span>
                  <ExternalLink size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Decorative circles at bottom */}
            <div className="flex justify-between mt-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 space-y-3">
          <button
            onClick={handleShareReceipt}
            className="w-full py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Share Receipt
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 bg-orange-50 text-orange-500 font-medium rounded-lg hover:bg-orange-100 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareReceiptModal;
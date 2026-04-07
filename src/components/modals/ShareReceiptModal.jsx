import { X, ExternalLink } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const ShareReceiptModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const statusColor = {
    Successful: 'bg-green-50 text-green-700',
    Completed: 'bg-green-50 text-green-700',
    Pending: 'bg-yellow-50 text-yellow-700',
    Failed: 'bg-red-50 text-red-700',
  };

  const statusLabel = transaction.status || 'Successful';
  const statusClass = statusColor[statusLabel] || statusColor.Successful;

  const handleShareReceipt = () => {
    console.log('Share receipt:', transaction);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 bg-opacity-50"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
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

        <div className="px-6 pb-6">
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-white">
            <div className="flex justify-between mb-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Qreva" className="w-6 h-6" />
                <span className="font-semibold text-gray-900">qreva</span>
              </div>
              <span className="text-xs text-gray-500">Transaction Receipt</span>
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {transaction.amount != null ? `₦${Number(transaction.amount).toLocaleString()}` : '—'}
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 ${statusClass} rounded-full text-sm font-medium`}>
                Transaction {statusLabel}!
              </div>
              {transaction.date && (
                <div className="text-xs text-gray-500 mt-2">
                  {transaction.date}
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm mb-6">
              {(transaction.recipient || transaction.clientName || transaction.title) && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipient Details</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {transaction.recipient || transaction.clientName || transaction.title}
                    </div>
                    {(transaction.location || transaction.accountId) && (
                      <div className="text-xs text-gray-500">
                        {transaction.location || transaction.accountId}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(transaction.sender || transaction.senderName) && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Sender Details</span>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {transaction.sender || transaction.senderName}
                    </div>
                    {transaction.senderInfo && (
                      <div className="text-xs text-gray-500">
                        {transaction.senderInfo}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium text-gray-900 font-mono text-xs">
                  {transaction._id || transaction.id || '—'}
                </span>
              </div>

              {(transaction.category || transaction.typeCategory || transaction.type) && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">
                    {transaction.category || transaction.typeCategory || transaction.type}
                  </span>
                </div>
              )}

              {transaction.date && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Date</span>
                  <span className="font-medium text-gray-900">{transaction.date}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${statusLabel === 'Failed' ? 'text-red-600' : statusLabel === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                    {statusLabel}
                  </span>
                  <ExternalLink size={14} className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
              ))}
            </div>
          </div>
        </div>

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
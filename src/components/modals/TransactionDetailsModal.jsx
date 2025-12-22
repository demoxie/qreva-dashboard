import { X } from 'lucide-react';

const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  // Determine transaction type and icon
  const getTransactionIcon = () => {
    const category = transaction.category?.toLowerCase() || '';
    
    if (category.includes('airtime')) {
      return <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">A</div>
      </div>;
    } else if (category.includes('data')) {
      return <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">D</div>
      </div>;
    } else if (category.includes('gotv') || category.includes('tv')) {
      return <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="font-bold text-sm">GOtv</span>
      </div>;
    } else if (category.includes('nin')) {
      return <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      </div>;
    } else if (category.includes('card') || category.includes('softpos')) {
      return <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>;
    } else if (category.includes('transfer')) {
      return <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>;
    }
    
    return <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">?</div>
    </div>;
  };

  // Render different layouts based on transaction type
  const renderDetailsContent = () => {
    const category = transaction.category?.toLowerCase() || '';
    const isTransfer = category.includes('transfer');
    const isCard = category.includes('card') || category.includes('softpos');
    const isNIN = category.includes('nin');
    const isData = category.includes('data');

    if (isTransfer) {
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          <div>
            <p className="text-gray-400 text-xs mb-1">Recipient Details</p>
            <p className="font-medium text-gray-900">{transaction.recipient || 'Rejoice Regina Rose'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Senders Details</p>
            <p className="font-medium text-gray-900">{transaction.sender || 'Peoullar Rose | GTB | 2018637392'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Revenue</p>
            <p className="font-medium text-gray-900">₦{transaction.revenue || '200'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Location</p>
            <p className="font-medium text-gray-900">{transaction.location || 'Lagos'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction ID</p>
            <p className="font-medium text-gray-900 break-all">{transaction.id || '1810200101009377759216144'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction Date</p>
            <p className="font-medium text-gray-900">{transaction.date || '18th October, 2025 | 09:00 AM'}</p>
          </div>
        </div>
      );
    }

    if (isCard) {
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          <div>
            <p className="text-gray-400 text-xs mb-1">Agent Details</p>
            <p className="font-medium text-gray-900">{transaction.agent || 'Rejoice Regina Rose'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">User Details</p>
            <p className="font-medium text-gray-900">{transaction.user || 'Peoullar Rose | GTB | 2018637392'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Agent Commission</p>
            <p className="font-medium text-gray-900">₦{transaction.commission || '200'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Greva Revenue</p>
            <p className="font-medium text-gray-900">₦{transaction.grevaRevenue || '100'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Location</p>
            <p className="font-medium text-gray-900">{transaction.location || 'Lagos'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction ID</p>
            <p className="font-medium text-gray-900 break-all">{transaction.id || '1810200101009377759216144'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">RRN</p>
            <p className="font-medium text-gray-900">{transaction.rrn || '1810200101009377759216144'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Max Span</p>
            <p className="font-medium text-gray-900">{transaction.maxSpan || '4567'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Card Type</p>
            <p className="font-medium text-gray-900">{transaction.cardType || 'Mastercard'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction Date</p>
            <p className="font-medium text-gray-900">{transaction.date || '18th October, 2025 | 09:00 AM'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
              {transaction.customerStatus || 'First Time'}
            </span>
          </div>
        </div>
      );
    }

    if (isNIN) {
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          <div>
            <p className="text-gray-400 text-xs mb-1">Agent Details</p>
            <p className="font-medium text-gray-900">{transaction.agent || 'Rejoice Regina Rose'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction ID</p>
            <p className="font-medium text-gray-900 break-all">{transaction.id || '1810200101009377759216144'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Agent Commission</p>
            <p className="font-medium text-gray-900">₦{transaction.commission || '200'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Greva Revenue</p>
            <p className="font-medium text-gray-900">₦{transaction.grevaRevenue || '100'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Location</p>
            <p className="font-medium text-gray-900">{transaction.location || 'Lagos'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Type of Slip</p>
            <p className="font-medium text-gray-900">{transaction.slipType || 'NIN Basic Slip'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 text-xs mb-1">Transaction Date</p>
            <p className="font-medium text-gray-900">{transaction.date || '18th October, 2025 | 09:00 AM'}</p>
          </div>
        </div>
      );
    }

    if (isData) {
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          <div>
            <p className="text-gray-400 text-xs mb-1">Recipient Mobile</p>
            <p className="font-medium text-gray-900">{transaction.mobile || '08012345678'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction ID</p>
            <p className="font-medium text-gray-900 break-all">{transaction.id || '1810200101009377759216144'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Location</p>
            <p className="font-medium text-gray-900">{transaction.location || 'Lagos'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-1">Transaction Date</p>
            <p className="font-medium text-gray-900">{transaction.date || '18th October, 2025 | 09:00 AM'}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-400 text-xs mb-1">Status</p>
            <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
              {transaction.customerStatus || 'First Time'}
            </span>
          </div>
          {transaction.dataPlan && (
            <div className="col-span-2">
              <p className="text-gray-400 text-xs mb-1">Data Plan</p>
              <p className="font-medium text-gray-900">{transaction.dataPlan}</p>
            </div>
          )}
        </div>
      );
    }

    // Default layout for other transaction types (Airtime, GoTV, etc.)
    return (
      <div className="grid grid-cols-2 gap-6 text-sm font-general">
        <div>
          <p className="text-gray-400 text-xs mb-1">
            {category.includes('gotv') ? 'Recipient Details' : 'Recipient Mobile'}
          </p>
          <p className="font-medium text-gray-900">
            {transaction.recipientDetails || transaction.mobile || '08012345678'}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Transaction ID</p>
          <p className="font-medium text-gray-900 break-all">{transaction.id || '1810200101009377759216144'}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Location</p>
          <p className="font-medium text-gray-900">{transaction.location || 'Lagos'}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Transaction Date</p>
          <p className="font-medium text-gray-900">{transaction.date || '18th October, 2025 | 09:00 AM'}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-400 text-xs mb-1">Status</p>
          <span className="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
            {transaction.customerStatus || 'First Time'}
          </span>
        </div>
      </div>
    );
  };

  // Determine if amount is positive or negative
  const isCredit = transaction.type?.toLowerCase() === 'credit';
  const amountPrefix = isCredit ? '+ ' : '- ';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-black/50 bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h2 className="text-2xl font-bold font-urbanist text-gray-900">View Details</h2>
            <p className="text-sm text-gray-500 font-general mt-1">Here are the details of this transaction</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 py-4">
          {/* Transaction Summary Card */}
          <div className="relative bg-gray-50 rounded-xl p-6 mb-6 text-center border border-[#E9F1F3]">
            <div className="-top-6 absolute left-0 right-0 flex justify-center mb-4">
              {getTransactionIcon()}
            </div>
            <h3 className="font-medium font-general text-gray-900 mb-2 mt-4">{transaction.title || transaction.desc}</h3>
            <div className="text-3xl font-semibold font-general text-gray-900 mb-3">
              {amountPrefix}N{transaction.amount?.toLocaleString()}
            </div>
            <span className="inline-block px-4 py-1.5 border border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E] rounded-md text-sm font-medium">
              {transaction.status || 'Successful'}
            </span>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 border border-[#E9F1F3] rounded-xl p-6">
            {renderDetailsContent()}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#FF5B04] border border-[#B54103] text-white font-general font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
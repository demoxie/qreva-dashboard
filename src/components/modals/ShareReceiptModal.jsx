import { useState } from 'react';
import { X, Mail, MessageSquare, Copy, Check } from 'lucide-react';

const ShareReceiptModal = ({ isOpen, onClose, transaction }) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  if (!isOpen || !transaction) return null;

  const receiptLink = `https://app.example.com/receipt/${transaction.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(receiptLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    console.log('Send receipt to email:', email);
    // Handle email sending
  };

  const handleSMSShare = () => {
    console.log('Send receipt to phone:', phone);
    // Handle SMS sending
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Share Receipt</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Transaction Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Transaction</span>
              <span className="font-medium text-gray-900">{transaction.desc}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-lg font-bold text-gray-900">₦{transaction.amount?.toLocaleString()}</span>
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receipt Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={receiptLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Email Share */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share via Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleEmailShare}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Mail size={16} />
                Send
              </button>
            </div>
          </div>

          {/* SMS Share */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share via SMS
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={handleSMSShare}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageSquare size={16} />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareReceiptModal;
import { X } from "lucide-react";

const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const category = (
    transaction.typeCategory ||
    transaction.category ||
    ""
  ).toLowerCase();

  const formatDate = (val) => {
    if (!val) return "-";
    const d = new Date(val);
    if (isNaN(d)) return val;
    return (
      d.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " | " +
      d.toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  };

  const txDate = formatDate(transaction.createdAt || transaction.date);
  const txId =
    transaction._id || transaction.id || transaction.sessionId || "-";

  const getTransactionIcon = () => {
    if (category.includes("airtime")) {
      return (
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
        </div>
      );
    } else if (category.includes("data")) {
      return (
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
        </div>
      );
    } else if (category.includes("electric")) {
      return (
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl">
            ⚡
          </div>
        </div>
      );
    } else if (category.includes("bill")) {
      return (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="font-bold text-sm text-gray-600">Bill</span>
        </div>
      );
    } else if (category.includes("transfer")) {
      return (
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
        </div>
      );
    } else if (category.includes("scantopay") || category.includes("scan")) {
      return (
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
          </div>
        </div>
      );
    } else if (category.includes("softpos") || category.includes("card")) {
      return (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      );
    } else if (category.includes("kyc")) {
      return (
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
            />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
          {(transaction.typeCategory || "?")[0]}
        </div>
      </div>
    );
  };

  const statusColors = {
    Pending: "border-[#FFC535] bg-[#FFF8E6] text-[#B58202]",
    Successful: "border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]",
    Completed: "border-[#4ED17E] bg-[#E9F9EF] text-[#4ED17E]",
    Failed: "border-[#E56566] bg-[#FCECEC] text-[#9E2D2D]",
  };
  const statusClass =
    statusColors[transaction.status] ||
    "border-gray-300 bg-gray-50 text-gray-500";

  const DetailRow = ({ label, value }) => (
    <div>
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="font-medium text-gray-900 break-all">{value || "-"}</p>
    </div>
  );

  const renderDetailsContent = () => {
    const transfer = transaction.transferId;

    // Common details shown for all types
    const commonDetails = (
      <>
        <DetailRow label="Transaction ID" value={txId} />
        <DetailRow label="Transaction Date" value={txDate} />
        <DetailRow label="Type" value={transaction.type} />
        <DetailRow label="Category" value={transaction.typeCategory} />
        {transaction.fees > 0 && (
          <DetailRow
            label="Fees"
            value={`₦${transaction.fees?.toLocaleString()}`}
          />
        )}
        {transaction.commission > 0 && (
          <DetailRow
            label="Commission"
            value={`₦${transaction.commission?.toLocaleString()}`}
          />
        )}
        {transaction.vat > 0 && (
          <DetailRow
            label="VAT"
            value={`₦${transaction.vat?.toLocaleString()}`}
          />
        )}
        {transaction.stampDuty > 0 && (
          <DetailRow
            label="Stamp Duty"
            value={`₦${transaction.stampDuty?.toLocaleString()}`}
          />
        )}
      </>
    );

    if (category.includes("transfer") || transfer) {
      const debitAccountNumber =
        transaction?.metadata?.debitAccountNumber ||
        transaction?.transferId?.debitAccountNumber ||
        transaction?.debitAccountNumber ||
        "-";
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          <DetailRow
            label="Recipient Name"
            value={
              transaction?.metadata?.creditAccountName ||
              transaction?.transferId?.nameEnquiryId?.accountName ||
              "-"
            }
          />
          <DetailRow
            label="Recipient Account"
            value={
              transaction?.metadata?.creditAccountNumber ||
              transaction?.transferId?.creditAccountNumber ||
              "-"
            }
          />
          <DetailRow
            label="Sender Name"
            value={
              transaction?.metadata?.debitAccountName ||
              transaction?.transferId?.debitAccountName ||
              "-"
            }
          />
          <DetailRow
            label="Debit Account Number"
            value={debitAccountNumber}
          />
          <DetailRow
            label="Session ID"
            value={transaction.sessionId || transaction.externalReferenceId}
          />
          {commonDetails}
        </div>
      );
    }

    // ScanToPay
    if (category.includes("scantopay") || category.includes("scan")) {
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          {transaction.narration && (
            <DetailRow label="Narration" value={transaction.narration} />
          )}
          <DetailRow
            label="Credit Account"
            value={transaction.creditAccountNumber || transaction.accountNumber}
          />
          {transaction.debitAccountNumber && (
            <DetailRow
              label="Debit Account"
              value={transaction.debitAccountNumber}
            />
          )}
          {transaction.externalReferenceId && (
            <DetailRow
              label="Reference ID"
              value={transaction.externalReferenceId}
            />
          )}
          {commonDetails}
        </div>
      );
    }

    // Airtime / Data / Bills / Electricity (Utility)
    if (
      category.includes("airtime") ||
      category.includes("data") ||
      category.includes("bill") ||
      category.includes("electric") ||
      transaction.utilityId
    ) {
      const meta = transaction.metadata || {};
      const utility = transaction.utilityId || {};
      const verification = utility.vasVerificationId || {};
      const phoneNumber = transaction.phoneNumber || utility.phoneNumber || meta.phoneNumber;
      const meterNumber = transaction.meterNumber || utility.meterNumber || meta.meterNumber;
      const narration = transaction.narration || utility.narration || meta.narration;
      const account = transaction.debitAccountNumber || transaction.accountNumber || utility.accountNumber;
      return (
        <div className="grid grid-cols-2 gap-6 text-sm font-general">
          {phoneNumber && (
            <DetailRow label="Phone Number" value={phoneNumber} />
          )}
          {meterNumber && (
            <DetailRow label="Meter Number" value={meterNumber} />
          )}
          {verification.name && (
            <DetailRow label="Customer Name" value={verification.name} />
          )}
          {verification.address && (
            <DetailRow label="Address" value={verification.address} />
          )}
          {(meta.provider || utility.utilityType) && (
            <DetailRow label="Provider" value={meta.provider || utility.utilityType} />
          )}
          {(meta.planName || utility.validity) && (
            <DetailRow label="Plan" value={meta.planName || utility.validity} />
          )}
          {meta.billerName && (
            <DetailRow label="Biller" value={meta.billerName} />
          )}
          {utility.token && <DetailRow label="Token" value={utility.token} />}
          {utility.units > 0 && (
            <DetailRow label="Units" value={utility.units} />
          )}
          {narration && (
            <DetailRow label="Narration" value={narration} />
          )}
          {account && (
            <DetailRow label="Account" value={account} />
          )}
          {transaction.externalReferenceId && (
            <DetailRow label="Reference ID" value={transaction.externalReferenceId} />
          )}
          {commonDetails}
        </div>
      );
    }

    // Default / generic
    return (
      <div className="grid grid-cols-2 gap-6 text-sm font-general">
        {transaction.narration && (
          <DetailRow label="Narration" value={transaction.narration} />
        )}
        {transaction.creditAccountNumber && (
          <DetailRow
            label="Credit Account"
            value={transaction.creditAccountNumber}
          />
        )}
        {transaction.debitAccountNumber && (
          <DetailRow
            label="Debit Account"
            value={transaction.debitAccountNumber}
          />
        )}
        {transaction.accountNumber && !transaction.creditAccountNumber && (
          <DetailRow label="Account Number" value={transaction.accountNumber} />
        )}
        {transaction.externalReferenceId && (
          <DetailRow
            label="Reference ID"
            value={transaction.externalReferenceId}
          />
        )}
        {commonDetails}
      </div>
    );
  };

  const isCredit =
    transaction.type?.toLowerCase() === "inward" ||
    transaction.type?.toLowerCase() === "credit";
  const amountPrefix = isCredit ? "+ " : "- ";
  const title =
    transaction.senderName ||
    transaction.transferId?.nameEnquiryId?.accountName ||
    transaction.utilityId?.vasVerificationId?.name ||
    transaction.narration ||
    transaction.utilityId?.narration ||
    transaction.typeCategory ||
    transaction.title ||
    "Transaction";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/50"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h2 className="text-2xl font-bold font-urbanist text-gray-900">
              View Details
            </h2>
            <p className="text-sm text-gray-500 font-general mt-1">
              Here are the details of this transaction
            </p>
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
          {/* Summary Card */}
          <div className="relative bg-gray-50 rounded-xl p-6 mb-6 text-center border border-[#E9F1F3]">
            <div className="-top-6 absolute left-0 right-0 flex justify-center mb-4">
              {getTransactionIcon()}
            </div>
            <h3 className="font-medium font-general text-gray-900 mb-2 mt-4">
              {title}
            </h3>
            <div className="text-3xl font-semibold font-general text-gray-900 mb-3">
              {amountPrefix}₦{transaction.amount?.toLocaleString()}
            </div>
            <span
              className={`inline-block px-4 py-1.5 border ${statusClass} rounded-md text-sm font-medium`}
            >
              {transaction.status}
            </span>
          </div>

          {/* Details */}
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

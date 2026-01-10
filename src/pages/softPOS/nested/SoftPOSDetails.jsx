import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import TransactionPercentagePie from '@/components/charts/TransactionPercentagePie';
import MultiLineChart from '@/components/charts/MultiLineChart';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import { multiLineData, chartSeries, createRegionTransactionActions, createAgentTransactionActions } from '../constants';
import { SoftPOSRegionsDetailsData, allSoftPOSTransactions } from '../Data';

const SoftPOSDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // REGION DETAILS VIEW
  if (type === 'region') {
    const region = SoftPOSRegionsDetailsData.find(r => r.id === parseInt(id));
    
    if (!region) {
      return <div>Region not found</div>;
    }

    // Filter transactions for this region
    const regionTransactions = allSoftPOSTransactions.filter(
      tx => tx.location === region.location
    );

    // Actions for region transactions
    const regionTransactionActions = createRegionTransactionActions({
      setSelectedTransaction,
      setShowDetailsModal,
      setShowShareModal,
      navigate
    })

    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title={`${region.location} State`}
            subtitle="Here is how this location has been performing so far"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TransactionPercentagePie 
              data={[
                { id: 0, value: 30, label: 'Card Payments', color: '#F59E0B' },
                { id: 1, value: 70, label: 'QR Payments', color: '#06b6d4' }
              ]}
              title="Card Payments vs QR Payments %"
              wrapped={true}
            />
            <TopCustomersCard 
              data={topCustomers}
              title="Top Agents"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={chartSeries}
            title="Daily Transaction Volume"
          />

          <TransactionHistoryTable 
            data={regionTransactions}
            title="Transactions"
            actions={regionTransactionActions}
          />
        </div>

        {/* External Modals */}
        <TransactionDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          transaction={selectedTransaction}
        />

        <ShareReceiptModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          transaction={selectedTransaction}
        />
      </div>
    );
  }

  // TRANSACTION DETAILS VIEW
  if (type === 'transaction') {
    const transaction = allSoftPOSTransactions.find(tx => tx.id === parseInt(id));
    
    if (!transaction) {
      return <div>Transaction not found</div>;
    }

    // Get all transactions for this agent
    const agentTransactions = allSoftPOSTransactions.filter(
      tx => tx.agentName === transaction.agentName
    );

    // Actions for agent transaction history
    const agentTransactionActions = createAgentTransactionActions({
      setSelectedTransaction,
      setShowDetailsModal,
      setShowShareModal,
      navigate
    })

    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="Transaction History"
            subtitle="Here is the full SoftPOS transaction history for this agent"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          {/* Agent Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {transaction.agentName?.split(' ').map(n => n[0]).join('') || 'RR'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{transaction.agentName}</h3>
                <p className="text-gray-600">{transaction.phoneNumber}</p>
                <p className="text-sm text-gray-500">{transaction.email}</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <TransactionPercentagePie 
              data={[
                { id: 0, value: 30, label: 'Card Payments', color: '#F59E0B' },
                { id: 1, value: 70, label: 'QR Payments', color: '#06b6d4' }
              ]}
              title="Payment Distribution"
              wrapped={true}
            />
            <TopCustomersCard 
              data={topCustomers}
              title="Related Agents"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={chartSeries}
            title="Daily Transaction Volume"
          />

          <TransactionHistoryTable 
            data={agentTransactions}
            title="Transactions"
            actions={agentTransactionActions}
          />
        </div>

        {/* External Modals */}
        <TransactionDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          transaction={selectedTransaction}
        />

        <ShareReceiptModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          transaction={selectedTransaction}
        />
      </div>
    );
  }

  // Fallback
  return <div>Invalid view type</div>;
};

export default SoftPOSDetails;
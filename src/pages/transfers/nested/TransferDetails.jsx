import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import TransactionHistoryTable from '@/components/tables/TransactionHistoryTable';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import { multiLineData, barData, lineChartSeries, barChartSeries, transferRegions, allTransferTransactions, stats } from '../data';
import { createRegionTransactionActions, createCustomerTransactionActions } from '../constants';

const TransferDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Today');

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  // REGION DETAILS VIEW
  if (type === 'region') {
    const region = transferRegions.find(r => r.id === parseInt(id));
    
    if (!region) {
      return <div>Region not found</div>;
    }

    // Filter transactions for this region
    const regionTransactions = allTransferTransactions.filter(
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

          <DashboardStats
            stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie
             data={[]} />
            <TopCustomersCard
              data={topCustomers}
              title="Top Users"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={lineChartSeries}
            title="Daily Transaction Volume"
          />

          <BarChartComponent 
            data={barData}
            series={barChartSeries}
            title="Daily Transaction Count"
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
    const transaction = allTransferTransactions.find(tx => tx.id === parseInt(id));
    
    if (!transaction) {
      return <div>Transaction not found</div>;
    }

    // Get all transactions for this customer
    const customerTransactions = allTransferTransactions.filter(
      tx => tx.title === transaction.title
    );

    // Actions for customer transaction history
    const customerTransactionActions = createCustomerTransactionActions({
      setSelectedTransaction,
      setShowDetailsModal,
      setShowShareModal,
    })
    

    return (
      <div className="flex-1 overflow-auto bg-[#F7FAFA]">
        <div className="p-6">
          <PageHeader
            title="Transaction History"
            subtitle="Here is the full transfer transaction history for this user"
            timeFilter={timeFilter}
            onTimeFilterChange={setTimeFilter}
          />

          {/* Customer Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">
                  {transaction.title?.split(' ').map(n => n[0]).join('') || 'RR'}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{transaction.title}</h3>
                <p className="text-gray-600">{transaction.acc}</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>

          <DashboardStats
           stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <PaymentComparisonPie
             data={[]} />
            <TopCustomersCard
              data={topCustomers}
              title="Transfer Distribution"
            />
          </div>

          <MultiLineChart 
            data={multiLineData}
            series={lineChartSeries}
            title="Daily Transaction Volume"
          />

          <BarChartComponent 
            data={barData}
            series={barChartSeries}
            title="Daily Transaction Count"
          />

          <TransactionHistoryTable 
            data={customerTransactions}
            title="Transactions"
            actions={customerTransactionActions}
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

export default TransferDetails;
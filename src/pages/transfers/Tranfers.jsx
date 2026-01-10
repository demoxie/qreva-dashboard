import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import MultiLineChart from '@/components/charts/MultiLineChart';
import BarChartComponent from '@/components/charts/BarChartComponent';
import TransactionDetailsModal from '@/components/modals/TransactionDetailsModal';
import ShareReceiptModal from '@/components/modals/ShareReceiptModal';
import { topCustomers } from '@/constants/mockData';
import TopCustomersCard from '@/components/cards/TopCustomersCard';
import DashboardStats from '@/components/base/DashboardStats';
import PaymentComparisonPie from '@/components/charts/PaymentComparisonPie';
import RegionsTable from '@/components/tables/RegionsTable';
import DataTable from '@/components/tables/DataTable';
import {multiLineData, barData, lineChartSeries, barChartSeries, transferRegions, transferTransactions, statusData, stats} from './data'
import { createRegioncolumns, transactionColumns, createTransactionActions } from './constants';

const Transfers = () => {
  const [timeFilter, setTimeFilter] = useState('Today');
  const navigate = useNavigate();

  // Modal states
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
 

  // Navigation handler for regions
  const handleViewRegionDetails = (regionId) => {
    navigate(`/transfers/details/region/${regionId}`);
  };

  const regionColumns = createRegioncolumns(handleViewRegionDetails); 
  
  // Transaction actions
  const transactionActions = createTransactionActions({
    setSelectedTransaction,
    setShowDetailsModal,
    setShowShareModal,
    navigate
  });
  

  return (
    <div className="flex-1 overflow-auto bg-[#F7FAFA]">
      <div className="p-6">
        <PageHeader
          title="Transfers"
          subtitle="Here is how this has been performing so far"
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
        />

        <DashboardStats
         stats={stats} />

        <div className="grid grid-cols-5 lg:grid-cols-5 gap-6 mb-6">
          <div className='col-span-2'>
          <PaymentComparisonPie 
            data={statusData} 
          />
          </div>
          <div className='col-span-3'>
            <TopCustomersCard 
            data={topCustomers}
            title="Top Users"
          />
          </div>
         
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

        <RegionsTable 
          data={transferRegions}
          onViewDetails={handleViewRegionDetails}
          columns={regionColumns}
        />

        <DataTable 
          data={transferTransactions}
          title="Transactions"
          actions={transactionActions}
          columns={transactionColumns}
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
};

export default Transfers;
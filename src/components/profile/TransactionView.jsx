import DashboardStats from '@/components/base/DashboardStats';
import DataTable from '../tables/DataTable';

const TransactionView = ({ 
  stats, 
  transactions, 
  title = 'Transactions',
  actions,
  columns,
  setSearchQuery,
  children 
}) => {
  return (
    <>
      {stats && <DashboardStats stats={stats} />}
      
      {children}
      
      <DataTable
          className="font-general"
          data={transactions}
          columns={columns}
          title={title}
          actions={actions}
          onSearch={setSearchQuery}
          onFilter={() => console.log('Filter clicked')}
          showExport={true}
        />
    </>
  );
};

export default TransactionView;

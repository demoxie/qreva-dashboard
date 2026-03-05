import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '../../api/transactions-api';
import { handleError } from '../../utils/handleError';

/**
 * Hook to fetch all transactions with filters, search and pagination
 */
export const useTransactions = (params = {}) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async () => {
      const response = await transactionsApi.listTransactions(params);
      
      const rawData = response?.data || [];
      const pagination = response?.pagination || {};
      
      const formattedData = (Array.isArray(rawData) ? rawData : []).map(item => {
        const dateObj = item.createdAt ? new Date(item.createdAt) : null;
        const formattedDate = dateObj 
          ? dateObj.toLocaleString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: true 
            }) + ' | ' + dateObj.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })
          : item.date || 'N/A';

        return {
          ...item,
          id: item.id || item._id, // Ensure id exists for DataGrid
          title: item.title || item.clientName || (item.clientId ? `ID: ${item.clientId.slice(-6)}` : 'Transaction'),
          acc: item.acc || item.accountId || 'N/A',
          category: item.category || item.typeCategory || item.type || 'N/A',
          type: item.type || item.typeCategory || 'N/A',
          status: item.status || 'Pending',
          amount: item.amount || 0,
          date: formattedDate,
          // Fallbacks for display
          desc: item.desc || `${item.typeCategory || item.type} Transaction`,
        };
      });

      return {
        data: formattedData,
        pagination
      };
    },
    staleTime: 2 * 60 * 1000,
    onError: (error) => {
      handleError(error, 'Failed to load transactions.');
    },
  });
};

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DisputedTransactionCard from '@/components/disputedTransactions/DisputedTransactionCard';

import { DISPUTED_TRANSACTIONS_DATA } from './data';
import { DISPUTED_TRANSACTIONS_TABS } from './constants';

const DisputedTransactions = () => {
  const [activeTab, setActiveTab] = useState(DISPUTED_TRANSACTIONS_TABS[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = DISPUTED_TRANSACTIONS_DATA;
  const tabs = DISPUTED_TRANSACTIONS_TABS;

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-900">Disputed Transactions</h1>
        <p className="text-gray-500">Here is the full list of KYC approvals on the platform</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-0">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-orange-500 border-b-2 border-orange-500 z-10'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {tab === 'Pending' && <span className="ml-2 px-1.5 py-0.5 text-xs bg-orange-500 text-white rounded-full">5</span>}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full sm:w-auto pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search here..." 
              className="pl-9 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map((transaction) => (
          <DisputedTransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
};

export default DisputedTransactions;

import { Search, Filter } from 'lucide-react';

const RequestsSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-1 relative">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm font-general focus:outline-none focus:ring-2 focus:ring-[#FF5B04] focus:border-transparent"
        />
      </div>
      <button className="px-4 py-2.5 border border-gray-200 rounded-lg flex items-center gap-2 text-sm font-general text-[#475367] hover:bg-gray-50">
        <Filter size={20} />
        Filter
      </button>
    </div>
  );
};

export default RequestsSearch;
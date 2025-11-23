import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchFilterBar = ({ 
  searchPlaceholder = "Search here...", 
  onSearch,
  onFilter 
}) => {
  return (
    <div className="flex gap-2">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          placeholder={searchPlaceholder} 
          className="pl-10 text-sm" 
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <Button variant="outline" size="sm" onClick={onFilter}>
        <Filter size={16} />
      </Button>
    </div>
  );
};

export default SearchFilterBar;
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
          className="pl-10 text-sm font-general leading-[156%] outline-none" 
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
      <Button className="text-[#98A2B3] flex items-center" variant="outline" size="sm" onClick={onFilter}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 5.83337H5" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path opacity="0.4" d="M2.5 14.1666H7.5" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 14.1666H17.5" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path opacity="0.4" d="M12.5 5.83337H17.5" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 5.83337C5 5.05681 5 4.66852 5.12687 4.36223C5.29602 3.95386 5.62048 3.6294 6.02886 3.46024C6.33515 3.33337 6.72343 3.33337 7.5 3.33337C8.27657 3.33337 8.66483 3.33337 8.97117 3.46024C9.3795 3.6294 9.704 3.95386 9.87317 4.36223C10 4.66852 10 5.05681 10 5.83337C10 6.60994 10 6.99822 9.87317 7.30452C9.704 7.71289 9.3795 8.03735 8.97117 8.20651C8.66483 8.33337 8.27657 8.33337 7.5 8.33337C6.72343 8.33337 6.33515 8.33337 6.02886 8.20651C5.62048 8.03735 5.29602 7.71289 5.12687 7.30452C5 6.99822 5 6.60994 5 5.83337Z" stroke="#98A2B3" stroke-width="1.5"/>
        <path d="M10 14.1666C10 13.39 10 13.0018 10.1268 12.6955C10.296 12.2871 10.6205 11.9626 11.0288 11.7935C11.3352 11.6666 11.7234 11.6666 12.5 11.6666C13.2766 11.6666 13.6648 11.6666 13.9712 11.7935C14.3795 11.9626 14.704 12.2871 14.8732 12.6955C15 13.0018 15 13.39 15 14.1666C15 14.9432 15 15.3315 14.8732 15.6378C14.704 16.0461 14.3795 16.3706 13.9712 16.5398C13.6648 16.6666 13.2766 16.6666 12.5 16.6666C11.7234 16.6666 11.3352 16.6666 11.0288 16.5398C10.6205 16.3706 10.296 16.0461 10.1268 15.6378C10 15.3315 10 14.9432 10 14.1666Z" stroke="#98A2B3" stroke-width="1.5"/>
        </svg>

        Filter
      </Button>
    </div>
  );
};

export default SearchFilterBar;
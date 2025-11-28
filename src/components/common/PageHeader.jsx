const PageHeader = ({ 
  title, 
  subtitle, 
  timeFilter, 
  onTimeFilterChange,
  actionButton 
}) => {
  const filters = ['Today', 'Last 12 Hours', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-[28px] font-urbanist leading-[120%] font-bold">{title}</h1>
        <p className="text-sm font-general font-medium leading-[148%] text-[#808C91]">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        {/* Time Filter */}
        <div className="inline-flex gap-0 rounded-lg overflow-hidden border border-[#E8EBED]">
          {filters.map((filter, idx) => {
            const isActive = timeFilter === filter;
            const isLast = idx === filters.length - 1;
            
            return (
              <button
                key={filter}
                onClick={() => onTimeFilterChange(filter)}
                className={`
                  font-general font-medium text-sm py-2.5 px-4
                  transition-all duration-200
                  ${!isLast ? 'border-r border-[#E8EBED]' : ''}
                  ${isActive 
                    ? 'bg-[#FFEFE6] text-[#1E1E1E]' 
                    : 'bg-white text-[#7C8D96] hover:bg-gray-50'
                  }
                `}
              >
                {filter}
              </button>
            );
          })}
        </div>
        
        {/* Optional Action Button */}
        {actionButton && actionButton}
      </div>
    </div>
  );
};

export default PageHeader;
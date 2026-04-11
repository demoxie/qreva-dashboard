const PageHeader = ({ 
  title, 
  subtitle, 
  timeFilter, 
  onTimeFilterChange,
  actionButton, 
  hidden 
}) => {
  const filters = ['Today', 'Last 12 Hours', 'Weekly', 'Monthly', 'Yearly'];
  
  // Normalize filter for comparison
  const normalizeFilter = (filter) => {
    const map = {
      'today': 'Today',
      'last12hours': 'Last 12 Hours',
      'weekly': 'Weekly',
      'monthly': 'Monthly',
      'yearly': 'Yearly',
      'Today': 'Today',
      'Last 12 Hours': 'Last 12 Hours',
      'Weekly': 'Weekly',
      'Monthly': 'Monthly',
      'Yearly': 'Yearly'
    };
    return map[filter] || filter;
  };
  
  const normalizedTimeFilter = normalizeFilter(timeFilter);

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-[28px] font-urbanist leading-[120%] font-bold">{title}</h1>
        <p className="text-sm font-general font-medium leading-[148%] text-[#808C91]">
          {subtitle}
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {!hidden && (
          <div className="inline-flex gap-0 rounded-lg overflow-hidden border border-[#E8EBED]">
            {filters.map((filter, idx) => {
              const isActive = normalizedTimeFilter === filter;
              const isLast = idx === filters.length - 1;
              
              return (
                <button
                  key={filter}
                  onClick={() => onTimeFilterChange?.(filter)}
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
        )}
        
        {actionButton && actionButton}
      </div>
    </div>
  );
};

export default PageHeader;
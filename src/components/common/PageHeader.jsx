const PageHeader = ({ 
  title, 
  subtitle, 
  timeFilter, 
  onTimeFilterChange,
  actionButton, 
  hidden 
}) => {
  const filters = ['Today', 'Hourly', 'Weekly', 'Monthly', 'Yearly'];

  // Normalize filter for comparison
  const normalizeFilter = (filter) => {
    const map = {
      'today': 'Today',
      'last12hours': 'Hourly',
      'hourly': 'Hourly',
      'weekly': 'Weekly',
      'monthly': 'Monthly',
      'yearly': 'Yearly',
      'Today': 'Today',
      'Hourly': 'Hourly',
      'Last 12 Hours': 'Hourly',
      'Weekly': 'Weekly',
      'Monthly': 'Monthly',
      'Yearly': 'Yearly'
    };
    return map[filter] || filter;
  };
  
  const normalizedTimeFilter = normalizeFilter(timeFilter);

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-[24px] font-urbanist font-bold leading-[120%] sm:text-[28px]">{title}</h1>
        <p className="text-sm font-general font-medium leading-[148%] text-[#808C91]">
          {subtitle}
        </p>
      </div>
      
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:w-auto">
        {!hidden && (
          <div className="w-full overflow-x-auto sm:w-auto">
            <div className="inline-flex min-w-max gap-0 rounded-lg border border-[#E8EBED] bg-white">
            {filters.map((filter, idx) => {
              const isActive = normalizedTimeFilter === filter;
              const isLast = idx === filters.length - 1;
              
              return (
                <button
                  key={filter}
                  onClick={() => onTimeFilterChange?.(filter)}
                  className={`
                    px-3 py-2.5 text-sm font-general font-medium sm:px-4
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
          </div>
        )}
        
        {actionButton && actionButton}
      </div>
    </div>
  );
};

export default PageHeader;

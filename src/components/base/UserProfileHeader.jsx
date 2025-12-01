const UserProfileHeader = ({ 
  user, 
  activeTab, 
  onTabChange, 
  availableTabs,
  showActionsMenu,
  onToggleActionsMenu,
  actions
}) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-cyan-600">
              {getInitials(user.name)}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
            {user.tier}
          </span>
        </div>
        
        {/* Actions Dropdown Button */}
        <div className="relative">
          <button
            onClick={onToggleActionsMenu}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            {user.accountType}
            <svg 
              className={`w-4 h-4 transition-transform ${showActionsMenu ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showActionsMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={onToggleActionsMenu}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mt-6 border-b border-gray-200">
        {availableTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-[#FF5B04] text-[#FF5B04]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserProfileHeader;
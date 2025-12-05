const CustomPagination = () => {
  return (
    <div className="flex items-center justify-between w-full px-4">
      <span className="text-sm font-general text-[#7C8D96] font-semibold">
        Page 1 of 30
      </span>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm font-general text-[#FF5B04] bg-[#FFEFE6] border border-[#FFEFE6] rounded-md">
          1
        </button>
        <button className="px-3 py-1.5 text-sm font-general text-[#7C8D96]  rounded-md hover:bg-[#F5F6F7] transition-colors">
          2
        </button>
        <button className="px-3 py-1.5 text-sm font-general text-[#7C8D96]  rounded-md hover:bg-[#F5F6F7] transition-colors">
          3
        </button>
        <span className="px-2 text-[#B0B7C3]">...</span>
        <button className="px-3 py-1.5 text-sm font-general text-[#7C8D96]  rounded-md hover:bg-[#F5F6F7] transition-colors">
          10
        </button>
        <button className="px-3 py-1.5 text-sm font-general text-[#7C8D96]  rounded-md hover:bg-[#F5F6F7] transition-colors">
          11
        </button>
        <button className="px-3 py-1.5 text-sm font-general text-[#7C8D96]  rounded-md hover:bg-[#F5F6F7] transition-colors">
          12
        </button>
       
      </div>
      <div className="flex items-center gap-4">
         <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-general text-[#7C8D96] border border-[#E8EBED] rounded-md hover:bg-[#F5F6F7] transition-colors">
         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M8.33203 10H16.6654" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.51049 11.3355L5.31585 11.9699C6.62068 12.9979 7.2731 13.5118 7.80256 13.2774C8.33201 13.0429 8.33201 12.2401 8.33201 10.6344V9.3656C8.33201 7.75995 8.33201 6.95713 7.80256 6.7227C7.2731 6.48827 6.62068 7.00222 5.31586 8.03012L4.51049 8.66452C3.72485 9.28344 3.33203 9.59294 3.33203 10C3.33203 10.4071 3.72485 10.7166 4.51049 11.3355Z" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Previous
        </button>
        <button className="flex items-center gap-1 px-3 py-1.5 text-sm font-general text-[#7C8D96] border border-[#E8EBED] rounded-md hover:bg-[#F5F6F7] transition-colors">
          Next
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.4" d="M11.6654 10H3.33203" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.4896 11.3355L14.6841 11.9699C13.3793 12.9979 12.7269 13.5118 12.1975 13.2774C11.668 13.0429 11.668 12.2401 11.668 10.6344V9.3656C11.668 7.75995 11.668 6.95713 12.1975 6.7227C12.7269 6.48827 13.3793 7.00222 14.6841 8.03012L15.4895 8.66452C16.2751 9.28344 16.668 9.59294 16.668 10C16.668 10.4071 16.2751 10.7166 15.4896 11.3355Z" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
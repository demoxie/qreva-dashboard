export const inputStyles = {
  base: `
    peer w-full h-14 px-4 pt-6 pb-2 
    border-2 rounded-md 
    outline-none transition-all
    focus:border-2
    disabled:bg-gray-100 disabled:cursor-not-allowed
  `,
  withIcon: `
    peer w-full h-14 px-4 pt-6 pb-2 pr-12
    border-2 rounded-md 
    outline-none transition-all
    focus:border-2
    disabled:bg-gray-100 disabled:cursor-not-allowed
  `,
};

export const buttonStyles = {
  primary: (isValid, isLoading) => `
    w-full h-12 text-base font-semibold transition-all
    ${isValid && !isLoading
      ? 'bg-orange-500 hover:bg-orange-600 text-white'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }
  `,
  link: 'text-sm text-[#B0B7C3] font-general underline font-semibold leading-[145%] hover:text-gray-600 disabled:cursor-not-allowed',
};

export const iconButtonStyles = `
  absolute right-3 top-1/2 -translate-y-1/2 
  text-gray-400 hover:text-gray-600 
  disabled:cursor-not-allowed
`;
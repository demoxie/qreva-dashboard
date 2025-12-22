const LoadingState = ({ message = 'Loading...' }) => (
  <div className="flex-1 flex items-center justify-center bg-[#F7FAFA]">
    <div className="text-gray-500">{message}</div>
  </div>
);

export default LoadingState;
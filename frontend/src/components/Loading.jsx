export const Loading = () => {
  return (
    <div className="flex items-center justify-center max-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
    </div>
  );
};

export const LoadingAnimation = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-red-500 rounded-full animate-spin"></div>
  );
};

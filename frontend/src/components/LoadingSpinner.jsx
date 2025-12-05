const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-4 border-blue-600/60 border-t-transparent animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-indigo-600/50 border-t-transparent animate-spin [animation-duration:1.2s]" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

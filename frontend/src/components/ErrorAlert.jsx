const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return (
    <div className="rounded-2xl border border-red-300 bg-red-50/80 text-red-700 p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <p className="font-semibold">Error</p>
      </div>
      <p className="text-sm mt-1 leading-relaxed">{message}</p>
    </div>
  );
};

export default ErrorAlert;

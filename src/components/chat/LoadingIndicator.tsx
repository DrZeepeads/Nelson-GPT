export const LoadingIndicator = () => {
  return (
    <div className="p-4">
      <div className="flex gap-2 items-center text-gray-500">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
};
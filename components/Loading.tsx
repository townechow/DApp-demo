const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen fixed top-0 left-0 ">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
};
export default Loading;

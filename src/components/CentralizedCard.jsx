
export const CentralizedCard = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 md:px-16 lg:px-20 text-center">
        <div className="min-w-[400px] p-5">{children}</div>
      </div>
    </div>
  );
};

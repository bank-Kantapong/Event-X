type ContainerWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const ContainerWrapper = ({ children, className }: ContainerWrapperProps) => {
  return (
    <div
      className={`w-full min-h-screen flex flex-col
      bg-(--color-bg) text-(--color-text)
      pt-(--safe-top) pb-(--safe-bottom)
      px-(--safe-left) pr-(--safe-right)
      ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default ContainerWrapper;

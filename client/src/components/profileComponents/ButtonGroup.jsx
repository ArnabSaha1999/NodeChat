const ButtonGroup = ({ children, fullWidth = false }) => {
  return (
    <div
      className={`flex flex-row sm:flex-col gap-2 text-lg justify-center items-center mt-5 ${
        fullWidth ? "w-full" : "w-1/2 xl:w-full"
      }`}
    >
      {children}
    </div>
  );
};

export default ButtonGroup;

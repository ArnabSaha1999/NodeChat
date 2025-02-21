const InputContainer = ({ children, fullWidth = false }) => {
  return (
    <div
      className={`${
        fullWidth ? "w-full" : "w-1/2 xl:w-full"
      } flex flex-col gap-2 relative`}
    >
      {children}
    </div>
  );
};

export default InputContainer;

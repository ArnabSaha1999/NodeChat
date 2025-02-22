const ButtonGroup = ({ children }) => {
  return (
    <div className="flex flex-row sm:flex-col gap-2 w-1/2 xl:w-full text-lg justify-center items-center mt-5">
      {children}
    </div>
  );
};

export default ButtonGroup;

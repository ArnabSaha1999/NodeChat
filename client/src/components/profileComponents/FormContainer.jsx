const FormContainer = ({ children }) => {
  return (
    <div className="bg-white dark:bg-black px-5 sm:px-2 py-10 rounded-xl drop-shadow-2xl flex flex-col mt-10">
      <div className="w-full flex flex-col xl:flex-col gap-10">{children}</div>
    </div>
  );
};

export default FormContainer;

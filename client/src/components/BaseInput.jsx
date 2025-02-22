const BaseInput = ({
  id,
  value,
  setValue,
  error,
  success,
  validateInput,
  inputType,
  placeholder,
  isEditing = true,
  variant = "default",
}) => {
  return (
    <input
      disabled={!isEditing}
      id={id}
      type={inputType}
      autoComplete="off"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (error || success) {
          validateInput(e.target.value);
        }
      }}
      onBlur={() => {
        const trimmedValue = value.trim();
        setValue(trimmedValue);
        validateInput(trimmedValue);
      }}
      className={`w-full px-7 py-3 bg-slate-200 dark:bg-gray-700 text-lg transition-all duration-300 border-none outline-none ring-0 focus:outline-2 ${
        variant === "auth" ? "rounded-full" : "rounded-xl"
      } ${
        error
          ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
          : success
          ? "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
          : variant === "auth"
          ? "focus:outline-black"
          : "focus:outline-light dark:focus:outline-dark"
      }`}
      placeholder={placeholder}
    />
  );
};

export default BaseInput;

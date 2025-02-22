const Button = ({
  variant = "primary",
  onClick,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "py-3 w-full flex items-center gap-2 justify-center transition-all duration-300";

  const primaryClasses =
    "border-2 border-light dark:border-dark text-light dark:text-dark hover:bg-light dark:hover:bg-dark hover:text-white dark:hover:text-black rounded-lg";

  const secondaryClasses =
    "bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg";

  const authClasses = "bg-black text-white hover:bg-black/80 rounded-full";

  const variantClasses =
    variant === "primary"
      ? primaryClasses
      : variant === "secondary"
      ? secondaryClasses
      : variant === "auth"
      ? authClasses
      : "";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const PasswordInput = ({
  id,
  value,
  setValue,
  validateInput,
  error,
  success,
  placeholder,
  isPasswordVisible,
  variant = "default",
}) => {
  return (
    <input
      id={id}
      autoComplete="off"
      value={value}
      type={isPasswordVisible ? "text" : "password"}
      minLength={8}
      maxLength={15}
      onChange={(e) => {
        setValue(e.target.value);
        (error || success) && validateInput(e.target.value);
      }}
      onBlur={() => validateInput(value)}
      className={`w-full px-7 py-3 bg-slate-200 dark:bg-gray-700 text-lg transition-all duration-300 border-none outline-none ring-0 ${
        variant === "rounded" ? "rounded-full" : "rounded-xl"
      } ${
        error
          ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
          : success
          ? "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
          : "focus:outline-2 focus:outline-light dark:focus:outline-dark"
      }`}
      placeholder={placeholder}
    />
  );
};

export default PasswordInput;

import { forwardRef } from "react";

const BioInput = forwardRef(
  (
    {
      id,
      value,
      setValue,
      error,
      success,
      validateInput,
      placeholder,
      Splitter,
      isEditing,
      setRemainingCharacters,
    },
    ref
  ) => {
    return (
      <textarea
        disabled={!isEditing}
        id={id}
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          const valueLength = Splitter.splitGraphemes(newValue).length;
          if (valueLength <= 150) {
            setValue(newValue);
            setRemainingCharacters(150 - valueLength);
            if (error || success) {
              validateInput(newValue);
            }
          } else {
            setRemainingCharacters(0);
          }
        }}
        onBlur={() => {
          const trimmedValue = value.trim();
          setValue(trimmedValue);
          validateInput(trimmedValue);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className={`w-full pl-7 pr-10 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2 focus:outline-light dark:focus:outline-dark transition-all duration-300 resize-none ${
          error
            ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
            : success &&
              "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
        }`}
        placeholder={placeholder}
      />
    );
  }
);

export default BioInput;

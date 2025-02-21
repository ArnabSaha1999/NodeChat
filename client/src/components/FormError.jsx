import React from "react";
import { GoDotFill } from "react-icons/go";

const FormError = ({ error, errorList, className = "" }) => {
  return (
    <div className={`text-red-500 px-2 text-sm ${className}`}>
      {error && (
        <>
          <p>{error}</p>
          {errorList && (
            <ul className="mt-1">
              {Object.entries(errorList).map(
                ([criteria, [isValid, message]]) => (
                  <li
                    key={criteria}
                    className={`${
                      isValid
                        ? "text-gray-500 dark:text-white/50"
                        : "text-red-500"
                    } flex gap-2 items-center`}
                  >
                    <GoDotFill />
                    {message}
                  </li>
                )
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FormError;

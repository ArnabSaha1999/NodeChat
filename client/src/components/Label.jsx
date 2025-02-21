import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Label = ({ id, label, error, success }) => {
  return (
    <label
      htmlFor={id}
      className="text-lg ml-2 text-gray-500 dark:text-white/70 font-semibold flex flex-row gap-1 items-center"
    >
      {label}
      {error ? (
        <FaTimesCircle className="text-red-500 inline" />
      ) : (
        success && <FaCheckCircle className="text-green-500 inline" />
      )}
    </label>
  );
};

export default Label;

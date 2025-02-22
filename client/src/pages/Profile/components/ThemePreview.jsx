const ThemePreview = ({ theme, isSelected, onClick }) => {
  const isDark = theme === "dark";
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 pb-10 sm:px-3 rounded-2xl shadow-lg transition-all w-full h-full flex flex-col gap-5 hover:shadow-2xl hover:scale-105
          ${
            isSelected
              ? `border-[4px] ${isDark ? "border-dark" : "border-light"}`
              : "border border-gray-300 dark:border-gray-600"
          } ${isDark ? "bg-gray-900" : "bg-white"}`}
    >
      <div
        className={`w-full mb-4 flex flex-col p-3 gap-5 ${
          isDark ? "bg-gray-800" : "bg-gray-100"
        } rounded-xl`}
      >
        <div
          className={`h-12 ${
            isDark ? "bg-dark" : "bg-light"
          }  w-full rounded-md mb-2`}
        ></div>{" "}
        {/* Header */}
        <div className="flex flex-col gap-2 p-2 flex-grow">
          <div
            className={`self-start ${
              isDark ? "bg-gray-700 text-gray-300" : "bg-gray-300 text-black/70"
            } p-2 rounded-lg w-[70%]`}
          >
            Hey there!
          </div>{" "}
          {/* Incoming Message */}
          <div
            className={`self-end ${
              isDark ? "bg-dark text-black" : "bg-light text-white"
            } p-2 rounded-lg w-[70%]`}
          >
            Hello!
          </div>{" "}
          {/* Sent Message */}
        </div>
        <div
          className={`h-12 shadow-xl ${
            isDark ? "bg-gray-700 border-dark" : "bg-gray-300 border-light"
          } border-b rounded-md`}
        ></div>{" "}
        {/* Input Box */}
      </div>
      <div>
        <h3
          className={`text-2xl xl:text-xl sm:text-lg font-semibold ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {isDark ? "Dark Mode" : "Light Mode"}
        </h3>
        <p
          className={`${
            isDark ? "text-gray-400" : "text-gray-600"
          } text-xl xl:text-lg sm:text-sm`}
        >
          {isDark
            ? "Sleek and easy on the eyes!"
            : "Bright and clear and lively!"}
        </p>
      </div>
    </div>
  );
};

export default ThemePreview;

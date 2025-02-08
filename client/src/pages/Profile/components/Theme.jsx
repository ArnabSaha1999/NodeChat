import { useProfileUIContext } from "@/context/ProfileUIContext";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { CHOOSE_THEME_PREFERENCE_ROUTE } from "@/utils/constants";
import { ContainerWithChildren } from "postcss/lib/container";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";

const Theme = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [tempTheme, setTempTheme] = useState(
    userInfo.themePreference || "light"
  );

  const previewTheme = (theme) => {
    if (theme !== tempTheme) {
      setTempTheme(theme);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tempTheme === "dark");
    return () => {
      // Revert back to the original theme when unmounting
      document.documentElement.classList.toggle(
        "dark",
        userInfo.themePreference === "dark"
      );
    };
  }, [tempTheme]);

  const handleDiscardChange = () => {
    if (tempTheme !== userInfo.themePreference) {
      setTempTheme(userInfo.themePreference);
    }
  };

  const applyTheme = async (theme) => {
    if (theme === userInfo.themePreference) {
      return;
    }
    try {
      const res = await apiClient.post(
        CHOOSE_THEME_PREFERENCE_ROUTE,
        { theme },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200 && res.data?.user) {
        setUserInfo({ ...res.data.user });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold absolute top-4 md:right-5">
          Choose Your Theme
        </h1>
      </div>
      <div className="flex flex-col justify-between items-center mt-20">
        <div className="mb-10 flex flex-col gap-5 justify-center items-center">
          <p className="text-2xl sm:text-lg mb-10">
            Select the theme that suits you best.
          </p>
          <div className="flex flex-row gap-8 sm:gap-2">
            {/* Light Theme */}
            <div
              onClick={() => previewTheme("light")}
              className={`cursor-pointer p-6 rounded-2xl shadow-lg transition-all w-[350px] h-[500px] xl:w-[230px] xl:h-[380px] sm:w-1/2 sm:h-[300px] hover:shadow-2xl hover:scale-105
            ${
              tempTheme === "light"
                ? "border-[4px] border-blue-500 scale-100"
                : "border border-gray-300 dark:border-gray-600"
            } bg-white`}
            >
              {/* Light Mode Chat Preview */}
              <div className="w-full h-[250px] xl:h-[200px] sm:h-[130px] rounded-md mb-4 flex flex-col p-3 bg-gray-100">
                <div className="h-[15%] bg-[#577BC1] w-full rounded-md mb-2"></div>{" "}
                {/* Header */}
                <div className="flex flex-col gap-2 p-2 flex-grow">
                  <div className="self-start bg-gray-300 text-black/70 p-2 rounded-lg w-[70%]">
                    Hey there!
                  </div>{" "}
                  {/* Incoming Message */}
                  <div className="self-end bg-[#577BC1] text-white p-2 rounded-lg w-[70%]">
                    Hello!
                  </div>{" "}
                  {/* Sent Message */}
                </div>
                <div className="h-[15%] bg-white border-t border-gray-300 rounded-md"></div>{" "}
                {/* Input Box */}
              </div>
              <h3 className="text-2xl xl:text-xl sm:text-lg font-semibold text-gray-800">
                Light Mode
              </h3>
              <p className="text-gray-600 text-xl xl:text-lg sm:text-sm">
                Bright and clear.
              </p>
            </div>

            {/* Dark Theme */}
            <div
              onClick={() => previewTheme("dark")}
              className={`cursor-pointer p-6 rounded-2xl shadow-lg transition-all w-[350px] h-[500px] xl:w-[230px] xl:h-[380px] sm:w-1/2 sm:h-[300px] hover:shadow-2xl hover:scale-105
            ${
              tempTheme === "dark"
                ? "border-[4px] border-blue-500 scale-100"
                : "border border-gray-300 dark:border-gray-600"
            } bg-gray-900`}
            >
              {/* Dark Mode Chat Preview */}
              <div className="w-full h-[250px] xl:h-[200px] sm:h-[130px] rounded-md mb-4 flex flex-col p-3 bg-gray-800">
                <div className="h-[15%] bg-[#FFD700] w-full rounded-md mb-2"></div>{" "}
                {/* Header */}
                <div className="flex flex-col gap-2 p-2 flex-grow">
                  <div className="self-start bg-gray-700 text-gray-300 p-2 rounded-lg w-[70%]">
                    Hey there!
                  </div>{" "}
                  {/* Incoming Message */}
                  <div className="self-end bg-[#FFD700] text-black p-2 rounded-lg w-[70%]">
                    Hello!
                  </div>{" "}
                  {/* Sent Message */}
                </div>
                <div className="h-[15%] bg-gray-700 border-t border-gray-600 rounded-md"></div>{" "}
                {/* Input Box */}
              </div>
              <h3 className="text-2xl xl:text-xl sm:text-lg font-semibold text-gray-200">
                Dark Mode
              </h3>
              <p className="text-gray-400 text-xl xl:text-lg sm:text-sm">
                Sleek and easy on the eyes.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex gap-4 sm:flex-col sm:w-full sm:px-8">
          <button
            onClick={() => applyTheme(tempTheme)}
            className="border-2 border-[#577BC1] text-[#577BC1] hover:bg-[#577BC1] hover:text-white dark:border-[#FFD700] dark:text-[#FFD700] hover:dark:bg-[#FFD700] hover:dark:text-black px-5 py-3 rounded-lg text-lg font-medium flex items-center gap-2 transition-all sm:w-full justify-center"
          >
            <FaCheck />
            Apply Theme
          </button>
          <button
            onClick={handleDiscardChange}
            className="bg-gray-300 text-gray-800 px-5 py-3 rounded-lg text-lg font-medium flex items-center gap-2 hover:bg-gray-400 transition-all sm:w-full justify-center"
          >
            <GrRevert />
            Discard Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Theme;

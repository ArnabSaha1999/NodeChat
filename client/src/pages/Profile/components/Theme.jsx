import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { CHOOSE_THEME_PREFERENCE_ROUTE } from "@/utils/constants";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import ThemePreview from "./ThemePreview";

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
      <ProfileContentHeader header={"Choose Your Theme"} />
      <div className="w-full flex flex-col justify-center items-center mt-10">
        <div className="w-full mb-10 flex flex-col gap-5 justify-center items-center">
          <p className="text-2xl sm:text-lg">
            Select the theme that suits you best.
          </p>
          <div className="w-[80%] xl:w-full flex flex-row justify-between items-center gap-5 md:gap-2">
            <ThemePreview
              theme={"light"}
              onClick={() => previewTheme("light")}
              isSelected={tempTheme === "light"}
            />
            <ThemePreview
              theme={"dark"}
              onClick={() => previewTheme("dark")}
              isSelected={tempTheme === "dark"}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-row justify-center items-center">
          <div className="flex flex-row sm:flex-col gap-2 w-1/2 xl:w-full text-lg justify-center items-center">
            <button
              onClick={() => applyTheme(tempTheme)}
              className="py-3 w-full rounded-lg border-2 border-light dark:border-dark text-light dark:text-dark hover:bg-light dark:hover:bg-dark hover:text-white dark:hover:text-black flex items-center gap-2 justify-center transition-all duration-300"
            >
              <FaCheck />
              Apply Theme
            </button>
            <button
              onClick={handleDiscardChange}
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-400 transition-all sm:w-full justify-center"
            >
              <GrRevert />
              Discard Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Theme;

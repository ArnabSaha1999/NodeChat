import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { CHOOSE_THEME_PREFERENCE_ROUTE } from "@/utils/constants";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import ThemePreview from "./ThemePreview";
import ButtonGroup from "@/components/profileComponents/ButtonGroup";
import Button from "@/components/profileComponents/Button";

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
      <div className="w-full flex flex-col justify-center items-center mt-20">
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
          <ButtonGroup>
            <Button
              disabled={tempTheme === userInfo.themePreference}
              onClick={() => applyTheme(tempTheme)}
              variant="primary"
            >
              <FaCheck />
              Apply Theme
            </Button>
            <Button
              onClick={handleDiscardChange}
              variant="secondary"
              disabled={tempTheme === userInfo.themePreference}
            >
              <GrRevert />
              Discard Changes
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Theme;

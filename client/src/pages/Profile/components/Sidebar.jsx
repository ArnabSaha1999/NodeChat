import React, { useState } from "react";

import {
  RiAccountCircleFill,
  RiLockPasswordFill,
  RiPaintBrushFill,
  RiLogoutBoxRLine,
  RiMessage2Fill,
} from "react-icons/ri";
import ProfileButton from "./ProfileButton";
import ProfileAvatar from "./ProfileAvatar";
import { useProfileUIContext } from "@/context/ProfileUIContext";
import { ProfileAvatarContextProvider } from "@/context/ProfileAvatarContext";
import ModalContainer from "./ProfileAvatarContainer";
import { LogOut } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

const Sidebar = () => {
  const { setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const { isSideBarOpen } = useProfileUIContext();

  const logOut = async () => {
    try {
      const res = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/auth/login");
        setUserInfo(null);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div
      className={`flex flex-col justify-between w-[30%] 2xl:w-[35%] md:w-full border-r-2 dark:border-white/50 border-black/50 min-h-[100vh] transition-all duration-300 relative ${
        isSideBarOpen
          ? "" // Sidebar is active: full width, no translation
          : "md:hidden" // Sidebar is hidden: 0 width and off-screen
      }`}
    >
      <div className="flex flex-col w-full my-10 gap-10 z-[100]">
        <ProfileAvatarContextProvider>
          <ProfileAvatar />
        </ProfileAvatarContextProvider>
        <div className="flex flex-col justify-center w-full">
          <ProfileButton icon={RiAccountCircleFill} text={"Account"} />
          <ProfileButton icon={RiLockPasswordFill} text={"Password"} />
          <ProfileButton icon={RiPaintBrushFill} text={"Theme"} />
          <ProfileButton icon={RiMessage2Fill} text={"Chats"} />
        </div>
      </div>
      <button
        onClick={logOut}
        className={
          "w-full text-xl text-red-500 border-red-500 hover:bg-red-500 border-2 hover:text-white text-left px-10 py-5 rounded-sm transition-all duration-300 flex justify-start items-center gap-3"
        }
      >
        <RiLogoutBoxRLine className="inline text-3xl" />
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;

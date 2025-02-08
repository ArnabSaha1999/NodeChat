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

const Sidebar = () => {
  const { isSideBarOpen } = useProfileUIContext();
  return (
    <div
      className={`flex flex-col justify-between w-[30vw] 2xl:w-[35vw] md:w-[100vw] border-r-2 dark:border-white/50 border-black/50 min-h-[100vh] transition-all duration-300 relative ${
        isSideBarOpen
          ? "md:w-[100vw] md:translate-x-1/2"
          : "md:w-[0vw] md:-translate-x-full"
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
      <ProfileButton
        className={
          "w-full text-xl text-red-500 border-red-500 hover:bg-red-500 border-2 hover:text-white text-left px-10 py-5 rounded-sm transition-all duration-300 flex justify-start items-center gap-3"
        }
        icon={RiLogoutBoxRLine}
        text="Log Out"
      />
    </div>
  );
};

export default Sidebar;

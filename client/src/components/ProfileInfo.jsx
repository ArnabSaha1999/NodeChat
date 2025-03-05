import React, { useEffect } from "react";
import AvatarContainer from "./AvatarContainer";
import { useAppStore } from "@/store";
import UserDisplay from "./UserDisplay";
import IconContainer from "./IconContainer";
import { MdEdit } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import UserEmail from "./UserEmail";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  return (
    <div className="flex px-5 py-3 w-full items-center gap-2 justify-between border-[1px] border-black">
      <div className="flex gap-3 overflow-hidden flex-row justify-start items-center">
        <AvatarContainer
          avatar={userInfo.avatar}
          email={userInfo.email}
          avatarSize="w-12 h-12"
        />
        <div className="overflow-hidden flex flex-col items-start justify-center">
          <UserDisplay className="text-xl font-semibold" />
          <UserEmail className="text-lg" />
        </div>
      </div>
      <IconContainer
        Icons={[
          {
            Icon: MdEdit,
            onClick: () => {
              navigate("/profile");
            },
            tooltip: "Profile",
          },
          {
            Icon: RiLogoutBoxRLine,
            className: "text-red-500",
            tooltip: "Log Out",
          },
        ]}
      />
    </div>
  );
};

export default ProfileInfo;

import AvatarContainer from "@/components/AvatarContainer";
import UserDisplay from "@/components/UserDisplay";
import UserEmail from "@/components/UserEmail";
import { useAppStore } from "@/store";
import React from "react";

const ChatItem = () => {
  const { userInfo } = useAppStore();
  return (
    <div className="flex px-5 py-3 border-[1px] border-gray-900 dark:border-gray-300 w-full items-center gap-2 justify-between cursor-pointer hover:text-white hover:bg-light dark:hover:text-black dark:hover:bg-dark">
      <div className="flex gap-3 overflow-hidden flex-row justify-start items-center">
        <AvatarContainer
          avatar={userInfo.avatar}
          email={userInfo.email}
          avatarSize="w-12 h-12"
        />
        <div className="overflow-hidden flex flex-col items-start justify-center">
          <UserDisplay className="text-lg font-medium" />
        </div>
      </div>
    </div>
  );
};

export default ChatItem;

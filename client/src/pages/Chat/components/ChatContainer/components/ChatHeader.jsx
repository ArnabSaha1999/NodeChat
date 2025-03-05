import AvatarContainer from "@/components/AvatarContainer";
import IconContainer from "@/components/IconContainer";
import UserDisplay from "@/components/UserDisplay";
import { useAppStore } from "@/store";
import { IoClose } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
const ChatHeader = () => {
  const { userInfo } = useAppStore();
  return (
    <div className="flex px-5 py-3 w-full items-center gap-2 justify-between cursor-pointer bg-gray-100 dark:bg-gray-700 relative">
      <div className="flex gap-3 overflow-hidden flex-row justify-start items-center">
        <IconContainer
          Icons={[
            {
              Icon: IoClose,
              className: "text-red-500 text-4xl",
              tooltip: "Close chat",
            },
          ]}
        />
        <AvatarContainer
          avatar={userInfo.avatar}
          email={userInfo.email}
          avatarSize="w-12 h-12"
        />
        <div className="overflow-hidden flex flex-col items-start justify-center">
          <UserDisplay className="text-lg font-medium" />
        </div>
      </div>
      <IconContainer
        Icons={[
          {
            Icon: BsThreeDotsVertical,
            tooltip: "Menu",
          },
        ]}
      />
    </div>
  );
};

export default ChatHeader;

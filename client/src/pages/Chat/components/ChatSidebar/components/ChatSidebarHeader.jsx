import IconContainer from "@/components/IconContainer";
import Logo from "@/components/Logo";
import React from "react";
import { MdGroupAdd } from "react-icons/md";
import { RiChatNewLine } from "react-icons/ri";
const ChatSidebarHeader = () => {
  return (
    <div className="flex p-5 w-full flex-row justify-between items-center gap-5">
      <Logo />
      <IconContainer
        Icons={[
          {
            Icon: RiChatNewLine,
            tooltip: "New Chat",
          },
          { Icon: MdGroupAdd, tooltip: "New Channel" },
        ]}
      />
    </div>
  );
};

export default ChatSidebarHeader;

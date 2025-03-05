import IconContainer from "@/components/IconContainer";
import React from "react";
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { TiAttachment } from "react-icons/ti";
import MessageInput from "./MessageInput";
const MessageBoxContainer = () => {
  return (
    <div className="w-full px-5 py-3 flex gap-3 justify-between items-center bg-gray-100 dark:bg-gray-700 relative">
      <IconContainer
        Icons={[
          {
            Icon: TiAttachment,
            className:
              "text-black dark:text-white hover:text-light dark:hover:text-dark",
            tooltip: "Attachment",
          },
        ]}
      />
      <MessageInput />
      <IconContainer
        Icons={[
          {
            Icon: MdOutlineEmojiEmotions,
            className:
              "text-black dark:text-white hover:text-light dark:hover:text-dark absolute right-20",
          },
          {
            Icon: IoSend,
            className:
              "border-[1px] border-light dark:border-dark text-light dark:text-dark hover:bg-light hover:text-white dark:hover:bg-dark dark:hover:text-black p-1 text-4xl",
            tooltip: "Send Message",
          },
        ]}
      />
    </div>
  );
};

export default MessageBoxContainer;

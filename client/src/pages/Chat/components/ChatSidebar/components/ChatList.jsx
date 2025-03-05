import React from "react";
import ChatItem from "./ChatItem";

const ChatList = () => {
  return (
    <div className="flex flex-col h-full overflow-auto justify-start items-start">
      {Array.from({ length: 0 }).map((_, index) => (
        <ChatItem key={index} />
      ))}
    </div>
  );
};

export default ChatList;

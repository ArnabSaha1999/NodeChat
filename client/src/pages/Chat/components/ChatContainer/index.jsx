import ChatHeader from "./components/ChatHeader";
import MessageBoxContainer from "./components/MessageBoxContainer";
import ChatBox from "./components/ChatBox";
import { useEffect, useRef } from "react";

const ChatContainer = () => {
  return (
    <div className="w-[65%] lg:w-[50%] md:w-full h-screen min-h-screen bg-gray-300 flex flex-col">
      <ChatHeader />
      <ChatBox />
      <MessageBoxContainer />
    </div>
  );
};

export default ChatContainer;

import ChatSidebarHeader from "./components/ChatSidebarHeader";
import ChatList from "./components/ChatList";
import ProfileInfo from "@/components/ProfileInfo";

const ChatSidebar = () => {
  return (
    <div className="w-[35%] lg:w-1/2 md:w-0 flex flex-col justify-between h-screen min-h-screen bg-gray-100 dark:bg-gray-700 border-r-2 dark:border-white/50 border-black/50">
      <ChatSidebarHeader />
      <ChatList />
      <ProfileInfo />
    </div>
  );
};

export default ChatSidebar;

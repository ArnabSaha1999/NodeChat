import { useNavigate } from "react-router-dom";
import ChatSidebar from "./components/ChatSidebar";
import ChatContainer from "./components/ChatContainer";
const Chat = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-center w-full h-full text-center">
      <ChatSidebar />
      <ChatContainer />
    </div>
  );
};

export default Chat;

import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </div>
  );
};

export default Chat;

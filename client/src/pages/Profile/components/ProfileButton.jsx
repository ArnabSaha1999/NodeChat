import { useProfileUIContext } from "@/context/ProfileUIContext";
import { useNavigate } from "react-router-dom";

const ProfileButton = ({ icon: Icon, text, className }) => {
  const { isActive, setIsActive, setIsSideBarOpen } = useProfileUIContext();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <button
        onClick={() => {
          text !== "Chats"
            ? (setIsActive(text), setIsSideBarOpen(false))
            : navigate("/chat");
        }}
        className={`${
          !className
            ? "w-full text-xl text-left px-10 py-5  border-2 rounded-sm transition-all duration-300 flex justify-start items-center gap-3 border-light dark:border-dark"
            : className
        } ${
          isActive === text
            ? "bg-light text-white dark:bg-dark dark:text-black"
            : "text-light hover:bg-light hover:text-white dark:text-dark dark:hover:bg-dark dark:hover:text-black"
        }`}
      >
        <Icon className="inline text-3xl" />
        {text}
      </button>
    </div>
  );
};

export default ProfileButton;

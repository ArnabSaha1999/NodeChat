import { useProfileFormContext } from "@/context/ProfileFormContext";
import { useProfileUIContext } from "@/context/ProfileUIContext";
import { useNavigate } from "react-router-dom";

const ProfileButton = ({ icon: Icon, text, className }) => {
  const { isActive, setIsActive, setIsThemeContainerOpen, setIsSideBarOpen } =
    useProfileUIContext();
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (text !== "Chats") {
            setIsActive(text);
            setIsSideBarOpen(false);
          } else {
            navigate("/chat");
          }
        }}
        className={`${
          !className
            ? "w-full text-xl dark:text-[#FFD700] text-[#577BC1] text-left px-10 py-5 hover:bg-[#577BC1] hover:dark:bg-[#FFD700] hover:text-white dark:hover:text-black border-[#577BC1] dark:border-[#FFD700] border-2 rounded-sm transition-all duration-300 flex justify-start items-center gap-3"
            : className
        } ${
          isActive === text
            ? "bg-[#577BC1] dark:bg-[#FFD700] text-white dark:text-black"
            : ""
        }`}
      >
        <Icon className="inline text-3xl" />
        {text}
      </button>
    </div>
  );
};

export default ProfileButton;

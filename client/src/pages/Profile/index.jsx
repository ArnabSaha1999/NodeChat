import Sidebar from "./components/Sidebar";
import ProfileContent from "./components/ProfileContent";
import { IoCloseCircle } from "react-icons/io5";
import { useProfileUIContext } from "@/context/ProfileUIContext";
const Profile = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useProfileUIContext();
  return (
    <div className="w-full dark:bg-[#313131] bg-white flex flex-row justify-center items-center relative overflow-hidden">
      <div
        className={`z-10 absolute top-3 left-5 transition-all duration-300 w-full hidden md:flex cursor-pointer`}
      >
        <IoCloseCircle
          className={`text-gray-600 dark:text-white text-4xl ${
            isSideBarOpen ? "hidden" : ""
          }`}
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>
      <div className="flex w-full justify-center items-center">
        <Sidebar />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;

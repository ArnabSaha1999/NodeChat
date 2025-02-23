import Sidebar from "./components/Sidebar";
import ProfileContent from "./components/ProfileContent";
import { IoCloseCircle } from "react-icons/io5";
import { useProfileUIContext } from "@/context/ProfileUIContext";
const Profile = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useProfileUIContext();
  return (
    <div className="w-full dark:bg-[#313131] bg-white flex justify-center items-center relative overflow-hidden">
      {!isSideBarOpen && (
        <div className="z-[1] absolute top-4 left-5 hidden md:block">
          <IoCloseCircle
            className="text-gray-600 dark:text-white text-4xl cursor-pointer hover:scale-105 hover:text-light dark:hover:text-dark transition-all duration-300 w-full"
            onClick={() => setIsSideBarOpen(true)}
          />
        </div>
      )}
      <div className="flex w-full justify-center items-center">
        <Sidebar />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;

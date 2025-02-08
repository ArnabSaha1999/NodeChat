import Sidebar from "./components/Sidebar";
import ProfileContent from "./components/ProfileContent";
import { FaBars } from "react-icons/fa";
import { useProfileUIContext } from "@/context/ProfileUIContext";
const Profile = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useProfileUIContext();
  return (
    <div className="w-[100vw] dark:bg-[#313131] bg-white flex flex-row justify-center items-center relative overflow-hidden">
      <div
        className={`z-10 absolute top-5 transition-all duration-300 w-full hidden md:flex cursor-pointer ${
          isSideBarOpen ? "translate-x-[90%]" : "-translate-x-[-5%]"
        }`}
      >
        <FaBars
          className=" text-gray-600 dark:text-white text-2xl "
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>
      <div className="flex">
        <Sidebar />
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;

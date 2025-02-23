import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { MdModeEdit } from "react-icons/md";
import { useProfileAvatarContext } from "@/context/ProfileAvatarContext";
import ProfileAvatarContainer from "./ProfileAvatarContainer";
import { CLOUDINARY_BASE_URL } from "@/utils/constants";

const ProfileAvatar = () => {
  const { userInfo } = useAppStore();
  const { isAvatarContainerOpen, handleAvatarEdit } = useProfileAvatarContext();

  if (!userInfo) {
    return <div>Loading...</div>; // Or show a placeholder image
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center p-5 w-full">
      <div className="relative">
        <Avatar className="w-48 h-48 2xl:w-32 2xl:h-32 rounded-full overflow-hidden">
          {userInfo.avatar ? (
            <AvatarImage
              src={`${CLOUDINARY_BASE_URL}/${userInfo.avatar}`}
              alt="DP"
              className="object-cover w-full h-full bg-black"
            />
          ) : (
            <div className="uppercase text-5xl flex items-center justify-center border-[1px] dark:border-[#FFD700] dark:text-[#FFD700] border-[#577BC1] text-[#577BC1] w-48 h-48 2xl:w-32 2xl:h-32 rounded-full overflow-hidden">
              {userInfo.email.split("").shift()}
            </div>
          )}
        </Avatar>
        <span
          onClick={handleAvatarEdit}
          className="text-xl 2xl:text-lg border-[1px] p-2 bg-white text-black border-black dark:bg-black dark:text-white dark:border-white hover:bg-white/50 hover:border-[#577BC1] hover:text-[#577BC1] dark:hover:bg-black/30 hover:dark:border-[#FFD700] hover:dark:text-[#FFD700] cursor-pointer rounded-full absolute bottom-0 right-5 2xl:right-0"
        >
          <MdModeEdit />
        </span>
      </div>
      <div className="dark:text-white text-black font-semibold text-3xl 2xl:text-2xl xl:text-xl overflow-hidden text-ellipsis whitespace-nowrap max-w-[100%]">
        <p>{userInfo.email}</p>
      </div>
      {isAvatarContainerOpen && <ProfileAvatarContainer />}
    </div>
  );
};

export default ProfileAvatar;

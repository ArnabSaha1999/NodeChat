import { useAppStore } from "@/store";
import { MdModeEdit } from "react-icons/md";
import { useProfileAvatarContext } from "@/context/ProfileAvatarContext";
import ProfileAvatarContainer from "./ProfileAvatarContainer";
import AvatarContainer from "@/components/AvatarContainer";
import UserEmail from "@/components/UserEmail";
import IconContainer from "@/components/IconContainer";
const ProfileAvatar = () => {
  const { userInfo } = useAppStore();
  const { isAvatarContainerOpen, handleAvatarEdit } = useProfileAvatarContext();

  if (!userInfo) {
    return <div>Loading...</div>; // Or show a placeholder image
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center p-5 w-full">
      <div className="relative">
        <AvatarContainer
          avatar={userInfo.avatar}
          email={userInfo.email}
          avatarSize="w-48 h-48"
        />
        <IconContainer
          Icons={[
            {
              Icon: MdModeEdit,
              className:
                "text-4xl p-2 border-[1px] bg-white text-black border-black dark:bg-black dark:text-white dark:border-white hover:bg-white/50 hover:border-light hover:text-light dark:hover:bg-black/30 hover:dark:border-dark hover:dark:text-dark cursor-pointer rounded-full absolute bottom-0 right-5",
              onClick: handleAvatarEdit,
              tooltip: "Edit Avatar",
            },
          ]}
        />
      </div>
      <UserEmail className="w-full text-center font-semibold text-2xl" />
      {isAvatarContainerOpen && <ProfileAvatarContainer />}
    </div>
  );
};

export default ProfileAvatar;

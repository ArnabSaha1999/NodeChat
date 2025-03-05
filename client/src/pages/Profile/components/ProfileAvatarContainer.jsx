import { useEffect, useRef, useState } from "react";
import { MdEdit, MdAddAPhoto } from "react-icons/md";
import { TbTrashXFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useProfileAvatarContext } from "@/context/ProfileAvatarContext";
import { useAppStore } from "@/store";
import { apiClient } from "@/lib/apiClient";
import {
  ADD_PROFILE_AVATAR_ROUTE,
  REMOVE_PROFILE_AVATAR_ROUTE,
  UPDATE_PROFILE_AVATAR_ROUTE,
} from "@/utils/constants";
import Logo from "@/components/Logo";
import { showErrorToast, showSuccessToast } from "@/utils/toastNotifications";
import { handleFileValidation } from "@/utils/validators/validateFiles";
import FormError from "@/components/FormError";
import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import AvatarContainer from "@/components/AvatarContainer";
import IconContainer from "@/components/IconContainer";

const ProfileAvatarContainer = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { avatarContainerRef, setIsAvatarContainerOpen, handleAvatarEdit } =
    useProfileAvatarContext();
  const avatarFileInputRef = useRef(null);
  const [error, setError] = useState("");

  const handleClickOutside = (event) => {
    if (
      avatarContainerRef.current &&
      !avatarContainerRef.current.contains(event.target)
    ) {
      setIsAvatarContainerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [avatarContainerRef]);

  const uploadAvatar = async (event, route) => {
    const file = event.target.files[0];
    const validationError = handleFileValidation(file, setError);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("profile-avatar", file);
      const res = await apiClient.post(route, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "profile-avatar": "true",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        showSuccessToast("Profile avatar updated successfully!");
        setUserInfo(res.data.user);
      }
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to update avatar! Please try again!");
      setError("Something went wrong!");
    }
  };

  const removeProfileAvatar = async () => {
    try {
      const res = await apiClient.delete(REMOVE_PROFILE_AVATAR_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        showSuccessToast("Profile avatar removed successfully!");
        setUserInfo(res.data.user);
      }
    } catch (error) {
      console.error({ error });
      setError("Something went wrong!");
      showErrorToast("Failed to remove avatar! Please try again!");
    }
  };

  const handleAvatarInput = (fileInputRef) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-w-[100vw] min-h-[100vh] z-[9999] bg-white/70 dark:bg-black/70 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div
        ref={avatarContainerRef}
        className=" md:h-full md:w-full w-[500px] min-w-[330px] flex flex-col justify-between absolute z-[10000] bg-white dark:bg-slate-800 shadow-2xl rounded-2xl gap-10 px-5 py-10"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center">
            <IconContainer
              Icons={[
                {
                  Icon: IoClose,
                  className:
                    "text-4xl border-2 border-light dark:border-dark dark:text-white rounded-full p-1 cursor-pointer hover:bg-light hover:text-white hover:dark:bg-dark hover:dark:text-black",
                  onClick: handleAvatarEdit,
                  tooltip: "Close profile picture",
                },
              ]}
            />
            <Logo />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Profile Picture</h1>
            <p className="">
              Upload or update your profile picture to personalize your account.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center gap-10">
          <AvatarContainer
            avatar={userInfo.avatar}
            email={userInfo.email}
            avatarSize="w-72 h-72"
          />
        </div>
        <FormError error={error} />

        <div className="flex w-full gap-3 justify-center items-center">
          {userInfo.avatar ? (
            <>
              <Button onClick={() => handleAvatarInput(avatarFileInputRef)}>
                <MdEdit />
                Change
              </Button>
              <Button onClick={removeProfileAvatar}>
                <TbTrashXFilled />
                Remove
              </Button>
            </>
          ) : (
            <Button onClick={() => handleAvatarInput(avatarFileInputRef)}>
              <MdAddAPhoto />
              Add profile picture
            </Button>
          )}
          <FileInput
            onChange={(e) =>
              uploadAvatar(
                e,
                userInfo.avatar
                  ? UPDATE_PROFILE_AVATAR_ROUTE
                  : ADD_PROFILE_AVATAR_ROUTE
              )
            }
            ref={avatarFileInputRef}
            accept=".png, .jpg, .jpeg, .svg, .webp"
            name="profile-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatarContainer;

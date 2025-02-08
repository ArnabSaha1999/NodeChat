import { MdEdit, MdModeEdit } from "react-icons/md";
import { TbTrashXFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { MdAddAPhoto } from "react-icons/md";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useProfileAvatarContext } from "@/context/ProfileAvatarContext";
import { useEffect, useRef, useState } from "react";
import NodeChat_Logo from "@/assets/NodeChat_Logo.png";
import { useAppStore } from "@/store";
import { Input } from "@/components/ui/input";
import {
  ADD_PROFILE_AVATAR_ROUTE,
  CLOUDINARY_BASE_URL,
  REMOVE_PROFILE_AVATAR_ROUTE,
  UPDATE_PROFILE_AVATAR_ROUTE,
} from "@/utils/constants";
import { apiClient } from "@/lib/apiClient";
import { AvatarFallback } from "@/components/ui/avatar";

const ProfileAvatarContainer = () => {
  const { userInfo, setUserInfo } = useAppStore();
  console.log(userInfo);
  const addAvatarFileInputRef = useRef(null);
  const updateAvatarFileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [isUploadClicked, setIsUploadClicked] = useState(false);
  const fallbackSrc = "NodeChat/FallBack_Image_xmulal.jpg";
  const {
    avatarContainerRef,
    isAvatarContainerOpen,
    setIsAvatarContainerOpen,
    handleAvatarEdit,
  } = useProfileAvatarContext();

  const handleClickOutside = (event) => {
    if (
      avatarContainerRef.current &&
      !avatarContainerRef.current.contains(event.target)
    ) {
      setIsAvatarContainerOpen(false);
    }
  };

  const addProfileAvatar = async (event) => {
    const file = event.target.files[0];
    setError("");

    if (!file) {
      setError("No file was choosen! Please choose an avatar!");
      return;
    }

    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
      "image/webp",
    ];

    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type! Only image files are allowed!");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "File size exceeds the 10MB limit! Please upload a smaller file!"
      );
      return;
    }
    let formData = new FormData();
    formData.append("profile-avatar", file);
    try {
      const res = await apiClient.post(ADD_PROFILE_AVATAR_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "profile-avatar": "true",
        },
        withCredentials: true, // Include credentials for the authenticated request
      });

      if (res.status === 200) {
        setUserInfo({ ...res.data.user });
      }
    } catch (error) {
      console.log({ error });
      setError("Something went wrong!");
    }
  };

  const updateProfileAvatar = async (event) => {
    const file = event.target.files[0];
    setError("");

    if (!file) {
      setError("No file was choosen! Please choose an avatar!");
      return;
    }

    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
      "image/webp",
    ];

    if (!validImageTypes.includes(file.type)) {
      setError("Invalid file type! Only image files are allowed!");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "File size exceeds the 10MB limit! Please upload a smaller file!"
      );
      return;
    }
    let formData = new FormData();
    formData.append("profile-avatar", file);
    try {
      const res = await apiClient.post(UPDATE_PROFILE_AVATAR_ROUTE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "profile-avatar": "true",
        },
        withCredentials: true, // Include credentials for the authenticated request
      });

      if (res.status === 200) {
        setUserInfo({ ...res.data.user });
      }
    } catch (error) {
      console.log({ error });
      setError("Something went wrong!");
    }
  };

  const removeProfileAvatar = async () => {
    try {
      const res = await apiClient.delete(REMOVE_PROFILE_AVATAR_ROUTE, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUserInfo({ ...res.data.user });
      }
    } catch (error) {
      console.log({ error });
      setError("Something went wrong!");
    }
  };

  useEffect(() => {
    if (isAvatarContainerOpen) {
      const modalElement = avatarContainerRef.current;
      if (modalElement) {
        modalElement.scrollIntoView({
          behavior: "smooth",
          block: "center", // Center the modal in the viewport
        });
      }
      document.body.style.overflow = "hidden"; // Disable scrolling on the background
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling on the background
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [avatarContainerRef]);

  const handleAddAvatarInput = () => {
    if (addAvatarFileInputRef.current) {
      addAvatarFileInputRef.current.click();
    }
  };

  const handleUpdateAvatarInput = () => {
    if (updateAvatarFileInputRef.current) {
      updateAvatarFileInputRef.current.click();
    }
  };

  return (
    <div
      autoFocus
      className="w-[100vw] h-[100vh] z-[9999] bg-white/70 dark:bg-black/70 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
    >
      <div
        ref={avatarContainerRef}
        className="md:w-[100vw] md:h-[100vh] w-[500px] min-w-[330px] flex flex-col justify-between absolute z-[10000] bg-white dark:bg-slate-800 shadow-2xl rounded-2xl gap-10 px-5 py-10"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between items-center">
            <div
              onClick={handleAvatarEdit}
              className="text-3xl border-[2px] border-[#577BC1] dark:border-[#FFD700] dark:text-white rounded-full p-1 cursor-pointer hover:bg-[#577BC1] hover:text-white hover:dark:bg-[#FFD700] hover:dark:text-black"
            >
              <IoClose />
            </div>

            <div className="flex gap-3 justify-end items-center text-3xl font-semibold">
              <img className="w-[40px] h-[40px]" src={NodeChat_Logo} alt="" />
              <div>
                <span className="text-orange-500">Node</span>
                <span className="text-teal-700">Chat</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">Profile Picture</h1>
            <p className="">
              Upload or update your profile picture to personalize your account.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-center gap-10">
          <Avatar className="w-72 h-72 2xl:w-72 2xl:h-72 rounded-full overflow-hidden">
            {userInfo.avatar ? (
              <>
                <AvatarImage
                  src={`${CLOUDINARY_BASE_URL}/${userInfo.avatar}`}
                  className="object-cover w-full h-full bg-black"
                />
                <AvatarFallback>
                  <img
                    src="https://res.cloudinary.com/dx1ip1gbo/image/upload/v1739031724/NodeChat/FallBack_Image_xmulal.jpg"
                    className="object-cover w-full h-full bg-black"
                  />
                </AvatarFallback>
              </>
            ) : (
              <div className="uppercase text-6xl flex items-center justify-center border-[1px] dark:border-[#FFD700] dark:text-[#FFD700] border-[#577BC1] text-[#577BC1] w-72 h-72 2xl:w-72 2xl:h-72 rounded-full overflow-hidden">
                {userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>

        {/* Show error message */}
        {error && <div className="text-red-500 mt-4">{error}</div>}

        <div className="flex w-full gap-3 justify-center items-center">
          {userInfo.avatar ? (
            <>
              <button
                onClick={handleUpdateAvatarInput}
                className="flex w-full text-md items-center justify-center gap-2 border-[1px] border-[#577BC1] text-[#577BC1] hover:bg-[#577BC1] hover:text-white dark:border-[#FFD700] dark:text-[#FFD700] hover:dark:bg-[#FFD700] hover:dark:text-black px-6 py-4 rounded-2xl transition-all"
              >
                <MdEdit className="text-xl" />
                Change
              </button>
              <Input
                type="file"
                ref={updateAvatarFileInputRef}
                className="hidden"
                onChange={updateProfileAvatar}
                accept=".png, .jpg, .jpeg, .svg, .webp"
                name="profile-avatar"
              />

              <button
                onClick={removeProfileAvatar}
                className="flex w-full text-md items-center justify-center gap-2 border-[1px] border-[#577BC1] text-[#577BC1] hover:bg-[#577BC1] hover:text-white dark:border-[#FFD700] dark:text-[#FFD700] hover:dark:bg-[#FFD700] hover:dark:text-black px-6 py-4 rounded-2xl transition-all"
              >
                <TbTrashXFilled className="text-xl" />
                Remove
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddAvatarInput}
                className="flex text-md w-full items-center justify-center gap-2 border-[1px] border-[#577BC1] text-[#577BC1] hover:bg-[#577BC1] hover:text-white dark:border-[#FFD700] dark:text-[#FFD700] hover:dark:bg-[#FFD700] hover:dark:text-black px-6 py-4 rounded-2xl transition-all"
              >
                <MdAddAPhoto className="text-xl" />
                Add profile picture
              </button>
              <Input
                type="file"
                ref={addAvatarFileInputRef}
                className="hidden"
                onChange={addProfileAvatar}
                accept=".png, .jpg, .jpeg, .svg, .webp"
                name="profile-avatar"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatarContainer;

import { Children, createContext, useContext, useRef, useState } from "react";

const ProfileAvatarContext = createContext();

export const useProfileAvatarContext = () => {
  return useContext(ProfileAvatarContext);
};

export const ProfileAvatarContextProvider = ({ children }) => {
  const avatarContainerRef = useRef(null);
  const [isAvatarContainerOpen, setIsAvatarContainerOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleAvatarEdit = () => {
    setIsAvatarContainerOpen((prev) => !prev);
  };

  return (
    <ProfileAvatarContext.Provider
      value={{
        avatarContainerRef,
        isAvatarContainerOpen,
        setIsAvatarContainerOpen,
        handleAvatarEdit,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </ProfileAvatarContext.Provider>
  );
};

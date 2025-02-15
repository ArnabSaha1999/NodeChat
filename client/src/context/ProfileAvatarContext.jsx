import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ProfileAvatarContext = createContext();

export const useProfileAvatarContext = () => {
  return useContext(ProfileAvatarContext);
};

export const ProfileAvatarContextProvider = ({ children }) => {
  const avatarContainerRef = useRef(null);
  const [isAvatarContainerOpen, setIsAvatarContainerOpen] = useState(
    localStorage.getItem("isAvatarContainerOpen") === "false" ? false : true
  );

  const handleAvatarEdit = () => {
    setIsAvatarContainerOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("isAvatarContainerOpen", isAvatarContainerOpen);

    return () => {
      localStorage.setItem("isAvatarContainerOpen", false);
    };
  }, [isAvatarContainerOpen]);

  return (
    <ProfileAvatarContext.Provider
      value={{
        avatarContainerRef,
        isAvatarContainerOpen,
        setIsAvatarContainerOpen,
        handleAvatarEdit,
      }}
    >
      {children}
    </ProfileAvatarContext.Provider>
  );
};

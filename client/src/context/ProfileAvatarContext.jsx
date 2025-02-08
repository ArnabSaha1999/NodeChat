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
    const handleBeforeUnload = () => {
      localStorage.setItem("isAvatarContainerOpen", false);
    };

    // Set values in localStorage initially
    localStorage.setItem("isAvatarContainerOpen", isAvatarContainerOpen);

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup event listener and reset localStorage values on component unmount
      window.removeEventListener("beforeunload", handleBeforeUnload);
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

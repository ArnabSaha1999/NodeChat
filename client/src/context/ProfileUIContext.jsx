import { createContext, useContext, useRef, useState } from "react";

const ProfileUIContext = createContext();

export const useProfileUIContext = () => {
  return useContext(ProfileUIContext);
};

export const ProfileUIProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isActive, setIsActive] = useState("Account");
  const [isThemeContainerOpen, setIsThemeContainerOpen] = useState(false);
  const themeContainerRef = useRef(null);

  return (
    <ProfileUIContext.Provider
      value={{
        isSideBarOpen,
        setIsSideBarOpen,
        isActive,
        setIsActive,
        isThemeContainerOpen,
        setIsThemeContainerOpen,
        themeContainerRef,
      }}
    >
      {children}
    </ProfileUIContext.Provider>
  );
};

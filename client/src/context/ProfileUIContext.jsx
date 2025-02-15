import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProfileUIContext = createContext();

export const useProfileUIContext = () => {
  return useContext(ProfileUIContext);
};

export const ProfileUIProvider = ({ children }) => {
  const location = useLocation();
  // Initialize states from localStorage
  const [isSideBarOpen, setIsSideBarOpen] = useState(
    localStorage.getItem("isSideBarOpen") === "true"
  );
  const [isActive, setIsActive] = useState(
    localStorage.getItem("profileTab") || "Account"
  );

  // // Effect to update localStorage and handle window unload event
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     localStorage.setItem("profileTab", "Account");
  //     localStorage.setItem("isSideBarOpen", true);
  //   };

  //   // Set values in localStorage initially
  //   localStorage.setItem("profileTab", isActive);
  //   localStorage.setItem("isSideBarOpen", isSideBarOpen);

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     // Cleanup event listener and reset localStorage values on component unmount
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //     localStorage.setItem("profileTab", "Account");
  //     localStorage.setItem("isSideBarOpen", true); // Reset sidebar state
  //   };
  // }, [isActive, isSideBarOpen]); // Effect depends on both states

  useEffect(() => {
    if (location.pathname !== "/profile") {
      localStorage.setItem("profileTab", "Account");
      localStorage.setItem("isSideBarOpen", true);
    }
    localStorage.setItem("profileTab", isActive);
    localStorage.setItem("isSideBarOpen", isSideBarOpen);
    return () => {
      localStorage.setItem("profileTab", "Account");
      localStorage.setItem("isSideBarOpen", true);
    };
  }, [isActive, isSideBarOpen]);

  return (
    <ProfileUIContext.Provider
      value={{
        isSideBarOpen,
        setIsSideBarOpen,
        isActive,
        setIsActive,
      }}
    >
      {children}
    </ProfileUIContext.Provider>
  );
};

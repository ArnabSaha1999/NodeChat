import { createContext, useContext, useState } from "react";

const ChangePasswordContext = createContext();

export const useChangePasswordContext = () => {
  return useContext(ChangePasswordContext);
};

export const ChangePasswordProvider = ({ children }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <ChangePasswordContext.Provider
      value={{
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        oldPasswordError,
        setOldPasswordError,
        newPasswordError,
        setNewPasswordError,
        confirmNewPasswordError,
        setConfirmNewPasswordError,
        isOldPasswordVisible,
        setIsOldPasswordVisible,
        isNewPasswordVisible,
        setIsNewPasswordVisible,
        isConfirmNewPasswordVisible,
        setIsConfirmPasswordVisible,
      }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
};

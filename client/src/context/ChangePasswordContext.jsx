import { usePasswordValidation } from "@/hooks/usePasswordValidation";
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

  const [oldPasswordSuccess, setOldPasswordSuccess] = useState(false);
  const [newPasswordSuccess, setNewPasswordSuccess] = useState(false);
  const [confirmNewPasswordSuccess, setConfirmNewPasswordSuccess] =
    useState(false);

  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmNewPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { passwordErrors, setPasswordErrors } = usePasswordValidation();

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmNewPasswordError("");
    setOldPasswordSuccess("");
    setNewPasswordSuccess("");
    setConfirmNewPasswordSuccess("");
    setIsOldPasswordVisible(false);
    setIsNewPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
  };

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
        oldPasswordSuccess,
        setOldPasswordSuccess,
        newPasswordSuccess,
        setNewPasswordSuccess,
        confirmNewPasswordSuccess,
        setConfirmNewPasswordSuccess,
        isOldPasswordVisible,
        setIsOldPasswordVisible,
        isNewPasswordVisible,
        setIsNewPasswordVisible,
        isConfirmNewPasswordVisible,
        setIsConfirmPasswordVisible,
        passwordErrors,
        setPasswordErrors,
        resetForm,
      }}
    >
      {children}
    </ChangePasswordContext.Provider>
  );
};

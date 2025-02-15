import { Label } from "@/components/ui/label";
import { useChangePasswordContext } from "@/context/ChangePasswordContext";
import React, { useState } from "react";
import { FaCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { GrRevert } from "react-icons/gr";
import { useProfileUIContext } from "@/context/ProfileUIContext";
import { validatePassword } from "@/utils/validators/validatePassword";
import { apiClient } from "@/lib/apiClient";
import { UPDATE_PASSWORD_ROUTE } from "@/utils/constants";
import { toast } from "react-toastify";
import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";

const ChangePassword = () => {
  const {
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
  } = useChangePasswordContext();

  const { setIsSideBarOpen } = useProfileUIContext();

  const validateOldPassword = (password) => {
    setOldPasswordSuccess(false);
    if (!password) {
      setOldPasswordError("Old password is required!");
      return false;
    } else if (password.length < 8) {
      setOldPasswordError("Old password must be at least 8 characters long!");
      return false;
    } else if (password.length > 15) {
      setOldPasswordError("Old password cannot exceed 15 characters!");
      return false;
    }
    setOldPasswordError("");
    setOldPasswordSuccess(true);
    return true;
  };

  const validateNewPassword = (password) => {
    setNewPasswordSuccess(false);
    const { isValid, validators } = validatePassword(password);
    if (!isValid) {
      setPasswordErrors(validators);
      setNewPasswordError("Your password must meet these requirements:");
      return false;
    }
    setNewPasswordError("");
    setNewPasswordSuccess(true);
    return true;
  };

  const validateConfirmNewPassword = (password) => {
    setConfirmNewPasswordSuccess(false);
    if (!password) {
      setConfirmNewPasswordError("Confirm password required!");
      return false;
    } else if (newPassword !== password) {
      setConfirmNewPasswordError("Passwords do not match!");
      return false;
    }
    setConfirmNewPasswordError("");
    setConfirmNewPasswordSuccess(true);
    return true;
  };

  const validateForm = () => {
    let isFormValid = true;

    if (!validateOldPassword(oldPassword)) isFormValid = false;
    if (!validateNewPassword(newPassword)) isFormValid = false;
    if (!validateConfirmNewPassword(confirmNewPassword)) isFormValid = false;

    return isFormValid;
  };

  const handleDiscardChange = () => {
    resetForm();
    setIsSideBarOpen(true);
  };

  const changePassword = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const res = await apiClient.post(
        UPDATE_PASSWORD_ROUTE,
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Password Changed Successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
        });
        console.log("Password updated successfully!");
        resetForm();
      }
    } catch (error) {
      if (error.status === 400 && error.response) {
        setOldPasswordError(error.response.data.oldPasswordError);
        setOldPasswordSuccess(false);
      }
      console.log({ error });
      console.log("Something went wrong!");
    }
  };

  return (
    <>
      <ProfileContentHeader header={"Change Password"} />
      <div className="bg-white dark:bg-black px-5 sm:px-2 py-10 rounded-xl drop-shadow-2xl flex flex-col gap-20 mt-10">
        <div className="w-full flex flex-col xl:flex-col gap-10 xl:gap-10">
          <div className="w-1/2 xl:w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="old-password"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              Old Password*{" "}
              {oldPasswordError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                oldPasswordSuccess && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              id="old-password"
              autoComplete="off"
              value={oldPassword}
              type={isOldPasswordVisible ? "text" : "password"}
              minLength={8}
              maxLength={15}
              onChange={(e) => {
                setOldPassword(e.target.value);
                (oldPasswordError || oldPasswordSuccess) &&
                  validateOldPassword(e.target.value);
              }}
              onBlur={() => validateOldPassword(oldPassword)}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                oldPasswordError
                  ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
                  : oldPasswordSuccess &&
                    "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
              } transition-all duration-300`}
              placeholder="Enter old password"
            />
            <button
              onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
              tabIndex={-1}
              className="absolute top-1/2 right-4 translate-y-[10px] text-2xl"
            >
              {isOldPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
            {oldPasswordError && (
              <p className="text-red-500 px-2 text-sm absolute bottom-[-30px] left-0">
                {oldPasswordError}
              </p>
            )}
          </div>

          <div className="w-1/2 xl:w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="new-password"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              New Password*{" "}
              {newPasswordError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                newPasswordSuccess && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <div className="w-full relative transition-all">
              <input
                id="new-password"
                autoComplete="off"
                value={newPassword}
                type={isNewPasswordVisible ? "text" : "password"}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (newPasswordError || newPasswordSuccess) {
                    validateNewPassword(e.target.value);
                  }
                }}
                onBlur={() => validateNewPassword(newPassword)}
                minLength={8}
                maxLength={15}
                className={`w-full px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                  newPasswordError
                    ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
                    : newPasswordSuccess &&
                      "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
                } transition-all duration-300`}
                placeholder="Enter new password"
              />
              <button
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                tabIndex={-1}
                className="absolute top-1/2 right-4 translate-y-[-10px] text-2xl"
              >
                {isNewPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {newPasswordError && (
              <div className="h-full">
                <p className="text-red-500 px-2 text-sm mt-1 transition-all">
                  {newPasswordError}
                </p>
                <ul className="text-red-500 px-2">
                  {Object.entries(passwordErrors).map(
                    ([criteria, [isValid, message]]) => (
                      <li
                        className={`${
                          !isValid
                            ? "text-red-500"
                            : "text-gray-500 dark:text-white/50"
                        } px-2 text-sm flex gap-2 items-center`}
                        key={criteria}
                      >
                        <GoDotFill />
                        {message}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="w-1/2 xl:w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="confirm-new-password"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              Confirm New Password*{" "}
              {confirmNewPasswordError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                confirmNewPasswordSuccess && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              id="confirm-new-password"
              autoComplete="off"
              type={isConfirmNewPasswordVisible ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
                if (confirmNewPasswordError || confirmNewPasswordSuccess) {
                  validateConfirmNewPassword(e.target.value);
                }
              }}
              onBlur={() => validateConfirmNewPassword(confirmNewPassword)}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                confirmNewPasswordError
                  ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
                  : confirmNewPasswordSuccess &&
                    "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
              } transition-all duration-300 resize-none`}
              placeholder="Enter confirm new password"
            />
            <button
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmNewPasswordVisible)
              }
              className="absolute top-1/2 right-4 translate-y-[5px] text-2xl"
              tabIndex={-1}
            >
              {isConfirmNewPasswordVisible ? (
                <IoEyeOutline />
              ) : (
                <IoEyeOffOutline />
              )}
            </button>
            {confirmNewPasswordError && (
              <p className="text-red-500 px-2 text-sm absolute bottom-[-30px] left-0">
                {confirmNewPasswordError}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 w-1/2 xl:w-full text-lg justify-center items-center">
          <button
            onClick={changePassword}
            className="py-3 w-full rounded-lg border-2 border-light dark:border-dark text-light dark:text-dark hover:bg-light dark:hover:bg-dark hover:text-white dark:hover:text-black flex items-center gap-2 justify-center transition-all duration-300"
          >
            <FaCheck />
            {/* {isLoading ? "Updating..." : "Update"} */}
            Change Password
          </button>
          <button
            onClick={handleDiscardChange}
            className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-400 transition-all sm:w-full justify-center"
          >
            <GrRevert />
            Discard Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

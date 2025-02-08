import { Label } from "@/components/ui/label";
import { useChangePasswordContext } from "@/context/ChangePasswordContext";
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

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
    isOldPasswordVisible,
    setIsOldPasswordVisible,
    isNewPasswordVisible,
    setIsNewPasswordVisible,
    isConfirmNewPasswordVisible,
    setIsConfirmPasswordVisible,
  } = useChangePasswordContext();

  const [passwordErrors, setPasswordErrors] = useState({
    minLength: false,
    maxLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [oldPasswordSuccess, setOldPasswordSuccess] = useState(false);

  const validateOldPassword = (password) => {
    if (!password) {
      setOldPasswordError("Old password is required!");
      setOldPasswordSuccess(false);
      return false;
    } else if (password.length < 8) {
      setOldPasswordError("Old password must be at least 8 characters long!");
      setOldPasswordSuccess(false);
      return false;
    } else if (password.length > 15) {
      setOldPasswordError("Old password cannot exceed 15 characters!");
      setOldPasswordSuccess(false);
      return false;
    }

    setOldPasswordError("");
    setOldPasswordSuccess(true);
  };

  const validateNewPassword = (password) => {
    const errors = {
      minLength: password.length >= 8,
      maxLength: password.length <= 15,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    };

    const isValid = Object.values(errors).every(Boolean);

    if (!password) {
      setNewPasswordError("New password is required!");
    } else if (!isValid) {
      setNewPasswordError(
        "Please add all the necessary characters to create a safe password!"
      );
    } else {
      setNewPasswordError("");
    }

    return errors;
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold absolute top-4 md:right-5">
          Change Password
        </h1>
      </div>
      <div className="bg-white dark:bg-slate-600 px-5 sm:px-2 py-10 rounded-xl shadow-2xl flex flex-col gap-10 mt-20">
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
                  ? "outline-red-500 focus:outline-red-500"
                  : oldPasswordSuccess &&
                    "outline-green-500 focus:outline-green-500"
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
              <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
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
                newPassword &&
                newPassword.length <= 50 && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <div className="w-full relative">
              <input
                id="new-password"
                value={newPassword}
                type={isNewPasswordVisible ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => validateNewPassword(newPassword)}
                minLength={8}
                maxLength={15}
                className={`w-full px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                  newPasswordError
                    ? "outline-red-500 focus:outline-red-500"
                    : newPassword &&
                      newPassword.length <= 50 &&
                      "outline-green-500 focus:outline-green-500"
                } transition-all duration-300`}
                placeholder="Enter new password"
              />
              <button
                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                className="absolute top-1/2 right-4 translate-y-[-10px] text-2xl"
              >
                {isNewPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            <ul className="text-red-500 px-2">
              {Object.entries(passwordErrors).map(([criteria, isValid]) => (
                <li
                  className={`${
                    !isValid
                      ? "text-red-500"
                      : "text-gray-500 dark:text-white/50"
                  } px-2 text-sm flex gap-2 items-center`}
                  key={criteria}
                >
                  <GoDotFill />
                  {criteria === "minLength" && "Minimum 8 characters"}
                  {criteria === "maxLength" && "Maximum 15 characters"}
                  {criteria === "hasUppercase" && "One uppercase letter"}
                  {criteria === "hasLowercase" && "One lowercase letter"}
                  {criteria === "hasNumber" && "One number"}
                  {criteria === "hasSpecialChar" && "One special character"}
                </li>
              ))}
            </ul>
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
                confirmNewPassword &&
                confirmNewPassword.length <= 150 && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              id="confirm-new-password"
              type={isConfirmNewPasswordVisible ? "text" : "password"}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              // onBlur={() => validateBio(bio)}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                confirmNewPasswordError
                  ? "outline-red-500 focus:outline-red-500"
                  : confirmNewPassword &&
                    confirmNewPassword.length <= 150 &&
                    "outline-green-500 focus:outline-green-500"
              } transition-all duration-300 resize-none`}
              placeholder="Enter confirm new password"
            />
            <button
              onClick={() =>
                setIsConfirmPasswordVisible(!isConfirmNewPasswordVisible)
              }
              className="absolute top-1/2 right-4 translate-y-[5px] text-2xl"
            >
              {isConfirmNewPasswordVisible ? (
                <IoEyeOutline />
              ) : (
                <IoEyeOffOutline />
              )}
            </button>
            {confirmNewPasswordError && (
              <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
                {confirmNewPasswordError}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row sm:flex-col gap-5 w-1/2 xl:w-full">
          <button
            // onClick={handleUpdate}
            className="px-10 py-3 w-full rounded-lg border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-800 hover:border-blue-800 transition-all duration-300"
          >
            {/* {isLoading ? "Updating..." : "Update"} */}
            Change Password
          </button>
          <button
            // onClick={handleCancel}
            className="px-10 py-3 w-full rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

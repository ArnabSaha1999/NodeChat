import { useChangePasswordContext } from "@/context/ChangePasswordContext";
import Label from "@/components/Label";
import { FaCheck } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import {
  validateConfirmPassword,
  validateNewPassword,
  validatePassword,
} from "@/utils/validators/validatePasswords";
import { apiClient } from "@/lib/apiClient";
import { UPDATE_PASSWORD_ROUTE } from "@/utils/constants";
import { toast } from "react-toastify";
import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";
import ButtonGroup from "@/components/ButtonGroup";
import Button from "@/components/Button";
import FormContainer from "@/components/profileComponents/FormContainer";
import PasswordInput from "@/components/PasswordInput";
import InputContainer from "@/components/InputContainer";
import PasswordToggle from "@/components/PasswordToggle";
import PasswordInputContainer from "@/components/PasswordInputContainer";
import FormError from "@/components/FormError";
import { showErrorToast, showSuccessToast } from "@/utils/toastNotifications";

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

  const handleOldPassword = (password) => {
    return validatePassword(
      password,
      setOldPasswordError,
      setOldPasswordSuccess
    );
  };

  const handleNewPassword = (password) => {
    return validateNewPassword(
      password,
      setNewPasswordError,
      setNewPasswordSuccess,
      setPasswordErrors
    );
  };

  const handleConfirmPassword = (password) => {
    return validateConfirmPassword(
      newPassword,
      password,
      setConfirmNewPasswordError,
      setConfirmNewPasswordSuccess
    );
  };

  const validateForm = () => {
    return [
      handleOldPassword(oldPassword),
      handleNewPassword(newPassword),
      handleConfirmPassword(confirmNewPassword),
    ].every(Boolean);
  };

  const handleDiscardChange = () => {
    resetForm();
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
        showSuccessToast("Password changed successfully!");
        resetForm();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setOldPasswordError(error.response.data.oldPasswordError);
        setOldPasswordSuccess(false);
      }
      console.error(error);
      showErrorToast("Something went wrong! Please try again!");
    }
  };

  return (
    <>
      <ProfileContentHeader header={"Change Password"} />
      <FormContainer>
        <InputContainer>
          <Label
            id="oldPassword"
            label="Old Password*"
            error={oldPasswordError}
            success={oldPasswordSuccess}
          />

          <PasswordInputContainer>
            <PasswordInput
              id="oldPassword"
              value={oldPassword}
              setValue={setOldPassword}
              validateInput={handleOldPassword}
              error={oldPasswordError}
              success={oldPasswordSuccess}
              placeholder="Enter old password"
              isPasswordVisible={isOldPasswordVisible}
            />
            <PasswordToggle
              isPasswordVisible={isOldPasswordVisible}
              setIsPasswordVisible={setIsOldPasswordVisible}
            />
          </PasswordInputContainer>
          <FormError error={oldPasswordError} />
        </InputContainer>

        <InputContainer>
          <Label
            id="newPassword"
            label="New Password*"
            error={newPasswordError}
            success={newPasswordSuccess}
          />
          <PasswordInputContainer>
            <PasswordInput
              id="newPassword"
              value={newPassword}
              setValue={setNewPassword}
              validateInput={handleNewPassword}
              error={newPasswordError}
              success={newPasswordSuccess}
              placeholder={"Enter new password"}
              isPasswordVisible={isNewPasswordVisible}
            />
            <PasswordToggle
              isPasswordVisible={isNewPasswordVisible}
              setIsPasswordVisible={setIsNewPasswordVisible}
            />
          </PasswordInputContainer>
          <FormError error={newPasswordError} errorList={passwordErrors} />
        </InputContainer>

        <InputContainer>
          <Label
            id="confirmNewPassword"
            label="Confirm Password*"
            error={confirmNewPasswordError}
            success={confirmNewPasswordSuccess}
          />
          <PasswordInputContainer>
            <PasswordInput
              id="confirmNewPassword"
              value={confirmNewPassword}
              setValue={setConfirmNewPassword}
              validateInput={handleConfirmPassword}
              error={confirmNewPasswordError}
              success={confirmNewPasswordSuccess}
              placeholder={"Please confirm new password"}
              isPasswordVisible={isConfirmNewPasswordVisible}
            />
            <PasswordToggle
              isPasswordVisible={isConfirmNewPasswordVisible}
              setIsPasswordVisible={setIsConfirmPasswordVisible}
            />
          </PasswordInputContainer>
          <FormError error={confirmNewPasswordError} />
        </InputContainer>
        <ButtonGroup>
          <Button onClick={changePassword} variant="primary">
            <FaCheck />
            Change Password
          </Button>
          <Button onClick={handleDiscardChange} variant="secondary">
            <GrRevert />
            Discard Changes
          </Button>
        </ButtonGroup>
      </FormContainer>
    </>
  );
};

export default ChangePassword;

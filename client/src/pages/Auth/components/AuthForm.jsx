import { apiClient } from "@/lib/apiClient";
import { useEffect } from "react";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useAuthFormContext } from "@/context/authFormContext";
import Label from "@/components/Label";
import FormError from "@/components/FormError";
import PasswordToggle from "@/components/PasswordToggle";
import InputContainer from "@/components/InputContainer";
import PasswordInput from "@/components/PasswordInput";
import PasswordInputContainer from "@/components/PasswordInputContainer";
import BaseInput from "@/components/BaseInput";
import {
  validateConfirmPassword,
  validateNewPassword,
  validatePassword,
} from "@/utils/validators/validatePasswords";
import { validateInput } from "@/utils/validators/validateInputFields";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import { showErrorToast, showSuccessToast } from "@/utils/toastNotifications";
const AuthForm = ({ isSignUpForm }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    emailError,
    setEmailError,
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    emailSuccess,
    setEmailSuccess,
    passwordSuccess,
    setPasswordSuccess,
    confirmPasswordSuccess,
    setConfirmPasswordSuccess,
    loginError,
    setLoginError,
    isPasswordVisible,
    setIsPasswordVisible,
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    passwordErrors,
    setPasswordErrors,
    resetForm,
  } = useAuthFormContext();

  const { setUserInfo } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
  }, [isSignUpForm]);

  const handleEmail = (email) => {
    return validateInput({
      field: "Email",
      value: email,
      setError: setEmailError,
      setSuccess: setEmailSuccess,
    });
  };

  const handleLoginPassword = (password) => {
    return validatePassword(password, setPasswordError, setPasswordSuccess);
  };

  const handleSignupPassword = (password) => {
    return validateNewPassword(
      password,
      setPasswordError,
      setPasswordSuccess,
      setPasswordErrors
    );
  };

  const handleConfirmPassword = (confirmPassword) => {
    return validateConfirmPassword(
      password,
      confirmPassword,
      setConfirmPasswordError,
      setConfirmPasswordSuccess
    );
  };

  const validateForm = () => {
    return [
      handleEmail(email),
      isSignUpForm
        ? handleSignupPassword(password)
        : handleLoginPassword(password),
      isSignUpForm ? handleConfirmPassword(confirmPassword) : true,
    ].every(Boolean);
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoginError("");
    try {
      const res = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (res.data.user && res.data.user.id) {
        showSuccessToast("Login Successful!");
        setUserInfo(res.data.user);
      }
      navigate(res.data.user.profileSetup ? "/chat" : "/profile");
    } catch (error) {
      if (error.response) {
        console.log("API Error: ", error.response.data);
        if (error.response.status === 404) {
          setLoginError("Email or password is incorrect!");
        } else {
          console.error(error.response);
          showErrorToast("An error occurred! please try again!");
        }
      } else {
        console.error({ error });
        showErrorToast("Unexpected error! Please try again!");
      }
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const res = await apiClient.post(
        SIGNUP_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 201) {
        showSuccessToast("Account created successfully!");
        setUserInfo(res.data.user);
        navigate("/profile");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === "Email is already taken!") {
          setEmailError("Email is already taken!");
          setEmailSuccess(false);
        }
      } else {
        console.error({ error });
        showErrorToast("An Error occurred during sign-up!");
      }
    }
  };

  return (
    <div className="w-full my-5 relative flex flex-col gap-5">
      <InputContainer fullWidth={true}>
        <Label
          id="email"
          label="Email*"
          error={emailError}
          success={emailSuccess}
        />
        <BaseInput
          id="email"
          value={email}
          setValue={setEmail}
          error={emailError}
          success={emailSuccess}
          validateInput={handleEmail}
          inputType="text"
          placeholder="Enter your email"
          variant="auth"
        />
        <FormError error={emailError} />
      </InputContainer>
      <InputContainer fullWidth={true}>
        <Label
          id="password"
          label="Password*"
          error={passwordError}
          success={passwordSuccess}
        />
        <PasswordInputContainer>
          <PasswordInput
            id="password"
            value={password}
            setValue={setPassword}
            validateInput={
              isSignUpForm ? handleSignupPassword : handleLoginPassword
            }
            error={passwordError}
            success={passwordSuccess}
            placeholder="Enter your password"
            isPasswordVisible={isPasswordVisible}
            variant="auth"
          />
          <PasswordToggle
            isPasswordVisible={isPasswordVisible}
            setIsPasswordVisible={setIsPasswordVisible}
          />
        </PasswordInputContainer>

        <FormError
          error={passwordError}
          errorList={isSignUpForm && passwordErrors}
        />
      </InputContainer>
      {isSignUpForm && (
        <InputContainer fullWidth={true}>
          <Label
            id="confirmPassword"
            label="Confirm Password*"
            error={confirmPasswordError}
            success={confirmPasswordSuccess}
          />
          <PasswordInputContainer>
            <PasswordInput
              id="confirmPassword"
              value={confirmPassword}
              setValue={setConfirmPassword}
              validateInput={handleConfirmPassword}
              error={confirmPasswordError}
              success={confirmPasswordSuccess}
              isPasswordVisible={isConfirmPasswordVisible}
              placeholder="Please confirm password"
              variant="auth"
            />

            <PasswordToggle
              isPasswordVisible={isConfirmPasswordVisible}
              setIsPasswordVisible={setIsConfirmPasswordVisible}
            />
          </PasswordInputContainer>
          <FormError error={confirmPasswordError} />
        </InputContainer>
      )}
      <FormError error={loginError} />
      <ButtonGroup fullWidth={true}>
        <Button
          onClick={isSignUpForm ? handleSignUp : handleLogin}
          variant="auth"
        >
          {isSignUpForm ? "Sign Up" : "Sign In"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AuthForm;

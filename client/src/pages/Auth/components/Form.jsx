import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useAuthFormContext } from "@/context/authFormContext";
import { toast } from "react-toastify";
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
const Form = ({ isSignUpForm }) => {
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
    setIsFormSubmitted,
  } = useAuthFormContext();

  const { setUserInfo } = useAppStore();

  const [passwordErrors, setPasswordErrors] = useState({
    length: [false, ""],
    hasUppercase: [false, ""],
    hasLowercase: [false, ""],
    hasNumber: [false, ""],
    hasSpecialChar: [false, ""],
  });

  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setEmailSuccess(false);
    setPasswordSuccess(false);
    setConfirmPasswordSuccess(false);
    setIsPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
    setLoginError("");
  }, [isSignUpForm]);

  const validateEmail = (email) => {
    const trimmedEmail = email.trim();
    setEmailSuccess(false);
    if (!trimmedEmail) {
      setEmailError("Email is required!");
      return false;
    }
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(trimmedEmail)) {
      setEmailError("Email should be valid!");
      return false;
    }
    setEmailError("");
    setEmailSuccess(true);
    return true;
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
    let isFormValid = true;
    if (!validateEmail(email)) isFormValid = false;
    if (isSignUpForm) {
      if (!handleSignupPassword(password)) isFormValid = false;
      if (!handleConfirmPassword(confirmPassword)) isFormValid = false;
    } else {
      if (!handleLoginPassword(password)) isFormValid = false;
    }
    return isFormValid;
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
        toast.success("Login Successful!", {
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
        setUserInfo(res.data.user);
      }
      if (res.data.user.profileSetup) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      if (error.response) {
        console.log("API Error: ", error.response.data);
        if (error.response.status === 404) {
          setLoginError("Email or password is incorrect!");
        } else {
          setLoginError("An error occurred! Please try again!");
        }
      } else {
        console.log("Network or unexpected error: ", error);
        setLoginError("Unexpected error! Please try again!");
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
        setUserInfo(res.data.user);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.status === 400) {
        if (error.response.data === "Email is already taken!") {
          setEmailError("Email is already taken!");
        } else {
          console.log(error.response.data);
        }
      } else {
        console.log({ error });
      }
    }
  };

  return (
    <div className="w-full my-5 relative flex flex-col gap-5">
      <FormError
        error={loginError}
        className="absolute top-0 translate-y-[-25px]"
      />
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
          validateInput={validateEmail}
          inputType="text"
          placeholder="Enter your email"
          variant="rounded"
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
            variant="rounded"
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
              variant="rounded"
            />

            <PasswordToggle
              isPasswordVisible={isConfirmPasswordVisible}
              setIsPasswordVisible={setIsConfirmPasswordVisible}
            />
          </PasswordInputContainer>
          <FormError error={confirmPasswordError} />
        </InputContainer>
      )}

      <div className="flex justify-center items-center w-full">
        {isSignUpForm ? (
          <Button
            onClick={handleSignUp}
            className="w-full mt-5 py-6 rounded-full"
          >
            Sign Up
          </Button>
        ) : (
          <Button
            onClick={handleLogin}
            className="w-full mt-5 py-6 rounded-full"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Form;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useAuthFormContext } from "@/context/authFormContext";

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
    loginError,
    setLoginError,
    isPasswordVisible,
    setIsPasswordVisible,
    isConfirmPasswordVisible,
    setIsConfirmPasswordVisible,
    isFormSubmitted,
    setIsFormSubmitted,
  } = useAuthFormContext();

  const { setUserInfo } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setIsFormSubmitted(false);
    setIsPasswordVisible(false);
    setIsConfirmPasswordVisible(false);
    setLoginError("");
  }, [isSignUpForm]);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let isFormValid = true;
    // Validate email
    if (!email) {
      setEmailError("Email is required!");
      isFormValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Email should be valid!");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required!");
      isFormValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters!");
      isFormValid = false;
    } else {
      setPasswordError("");
    }

    // Validate confirm password (only if sign up form)
    if (isSignUpForm) {
      if (!confirmPassword) {
        setConfirmPasswordError("Confirm password required!");
        isFormValid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match!");
        isFormValid = false;
      } else {
        setConfirmPasswordError("");
      }
    }
    return isFormValid;
  };

  // Handle changes without triggering validation on typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (isFormSubmitted) {
      setEmailError(""); // Clear error after correcting the input
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (isFormSubmitted) {
      setPasswordError(""); // Clear error after correcting the input
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (isFormSubmitted) {
      setConfirmPasswordError(""); // Clear error after correcting the input
    }
  };

  const handleLogin = async () => {
    setIsFormSubmitted(true); // Set the form as submitted

    if (!validateForm()) {
      return;
    }

    setLoginError("");

    setEmail(email.trim());
    try {
      const res = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (res.data.user && res.data.user.id) {
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
    setIsFormSubmitted(true); // Set the form as submitted
    if (!validateForm()) {
      return;
    }
    setEmail(email.trim());
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
    <div className="w-full my-5 relative">
      {loginError && (
        <p className="text-red-500 px-2 text-sm absolute top-0 translate-y-[-25px]">
          Email or password incorrect!
        </p>
      )}
      <div className={`${emailError ? "mb-10" : "mb-5"} relative`}>
        <Label htmlFor="email" className="text-lg ml-2 text-gray-500">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className={`px-4 py-6 bg-slate-200 rounded-full text-xl border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 ${
            emailError ? "outline-1 outline-red-800" : ""
          }
            ${
              !emailError && email && validateEmail(email)
                ? "outline-green-600 outline-1"
                : ""
            }`}
        />
        {emailError && (
          <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
            {emailError}
          </p>
        )}
      </div>
      <div className={`${passwordError ? "mb-10" : "mb-5"} relative`}>
        <Label htmlFor="password" className="text-lg ml-2 text-gray-500">
          Password
        </Label>
        <Input
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          className={`px-4 py-6 bg-slate-200 rounded-full text-xl border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 ${
            passwordError ? "outline-1 outline-red-800" : ""
          }
            ${
              !passwordError && password && password.length >= 8
                ? "outline-green-600 outline-1"
                : ""
            }`}
        />
        <button
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="absolute top-1/2 right-4 translate-y-[5px]"
        >
          {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>

        {passwordError && (
          <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
            {passwordError}
          </p>
        )}
      </div>
      {isSignUpForm && (
        <div className={`${confirmPasswordError ? "mb-10" : "mb-5"} relative`}>
          <Label
            htmlFor="confirm-password"
            className="text-lg ml-2 text-gray-500"
          >
            Confirm password
          </Label>
          <Input
            id="confirm-password"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`px-4 py-6 bg-slate-200 rounded-full text-xl border-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0 ${
              confirmPasswordError ? "outline-1 outline-red-800" : ""
            }
              ${
                !confirmPasswordError &&
                confirmPassword &&
                confirmPassword === password
                  ? "outline-green-600 outline-1"
                  : ""
              }`}
          />
          <button
            onClick={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
            className="absolute top-1/2 right-4 translate-y-[5px]"
          >
            {isConfirmPasswordVisible ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
          {confirmPasswordError && (
            <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
              {confirmPasswordError}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-center items-center w-full mt-5">
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

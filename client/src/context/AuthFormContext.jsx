import { createContext, useContext, useState } from "react";

const AuthFormContext = createContext();

export const useAuthFormContext = () => {
  return useContext(AuthFormContext);
};

export const AuthFormProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [confirmPasswordSuccess, setConfirmPasswordSuccess] = useState(false);

  const [loginError, setLoginError] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  return (
    <AuthFormContext.Provider
      value={{
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
        isFormSubmitted,
        setIsFormSubmitted,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
};

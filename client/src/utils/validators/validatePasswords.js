const validateNewPasswordHelper = (password) => {
  const validators = {
    length: [
      password.length >= 8 && password.length <= 15,
      "8 to 15 characters in length",
    ],
    hasUppercase: [/[A-Z]/.test(password), "At least one uppercase letter!"],
    hasLowercase: [/[a-z]/.test(password), "At least one lowercase letter!"],
    hasNumber: [/\d/.test(password), "At least one number!"],
    hasSpecialChar: [
      /[!@#$%^&*]/.test(password),
      "At least one special character!",
    ],
  };

  const isValid = Object.values(validators).every(([isValid]) => isValid);
  return {
    isValid,
    validators,
  };
};

export const validatePassword = (password, setError, setSuccess) => {
  setSuccess(false);
  if (!password) {
    setError("Password is required!");
    return false;
  }
  setError("");
  setSuccess(true);
  return true;
};

export const validateNewPassword = (
  password,
  setError,
  setSuccess,
  setPasswordErrors
) => {
  setSuccess(false);
  const { isValid, validators } = validateNewPasswordHelper(password);
  if (!isValid) {
    setPasswordErrors(validators);
    setError("Your password must meet these requirements:");
    return false;
  }
  setError("");
  setSuccess(true);
  return true;
};

export const validateConfirmPassword = (
  password,
  confirmPassword,
  setError,
  setSuccess
) => {
  setSuccess(false);
  if (!confirmPassword) {
    setError("Confirm password required!");
    return false;
  }
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return false;
  }
  setError("");
  setSuccess(true);
  return true;
};

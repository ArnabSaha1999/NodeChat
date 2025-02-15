export const validatePassword = (password) => {
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

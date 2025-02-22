import { useState } from "react";

export const usePasswordValidation = () => {
  const [passwordErrors, setPasswordErrors] = useState({
    length: [false, ""],
    hasUppercase: [false, ""],
    hasLowercase: [false, ""],
    hasNumber: [false, ""],
    hasSpecialChar: [false, ""],
  });
  return { passwordErrors, setPasswordErrors };
};

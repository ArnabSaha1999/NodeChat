export const validateInput = ({
  field,
  value,
  minLength,
  maxLength,
  setError,
  setSuccess,
  Splitter,
}) => {
  const trimmedValue = value.trim();
  setSuccess(false);
  if (!trimmedValue) {
    if (field === "Bio") {
      setError("Please tell us about you!");
      return false;
    }
    setError(`${field} is required!`);
    return false;
  }
  const length = Splitter
    ? Splitter.splitGraphemes(trimmedValue).length
    : trimmedValue.length;
  if (minLength && length < minLength) {
    setError(`${field} must be at least ${minLength} characters long!`);
    return false;
  }
  if (maxLength && length > maxLength) {
    setError(`${field} cannot exceed ${maxLength} characters!`);
    return false;
  }
  if (field === "Email") {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(trimmedValue)) {
      setError("Email should be valid!");
      return false;
    }
  }
  setError("");
  setSuccess(true);
  return true;
};

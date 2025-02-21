import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const PasswordToggle = ({ isPasswordVisible, setIsPasswordVisible }) => {
  return (
    <button
      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      tabIndex={-1}
      className="absolute top-0 translate-y-1/2 right-4 text-2xl"
    >
      {isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
    </button>
  );
};

export default PasswordToggle;

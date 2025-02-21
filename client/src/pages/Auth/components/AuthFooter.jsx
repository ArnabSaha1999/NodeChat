import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";

const AuthFooter = ({ isSignUpForm }) => {
  const navigate = useNavigate();
  const handleFormChange = () => {
    const toggleFormType = isSignUpForm ? "login" : "signup";
    navigate(`/auth/${toggleFormType}`);
  };
  return (
    <div className="flex flex-row justify-center items-center">
      <p>
        {isSignUpForm ? "Already have an account?" : "Don't have an account?"}
      </p>
      <Button
        onClick={handleFormChange}
        className="text-xl px-2 hover:no-underline"
        variant="link"
      >
        {isSignUpForm ? "Sign In" : "Sign Up"}
      </Button>
    </div>
  );
};

export default AuthFooter;

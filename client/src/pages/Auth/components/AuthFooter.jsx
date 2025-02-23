import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AuthFooter = ({ isSignUpForm }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center items-center">
      <p>
        {isSignUpForm ? "Already have an account?" : "Don't have an account?"}
      </p>
      <Button
        onClick={() => navigate(`/auth/${isSignUpForm ? "login" : "signup"}`)}
        className="text-xl px-2 hover:no-underline"
        variant="link"
      >
        {isSignUpForm ? "Sign In" : "Sign Up"}
      </Button>
    </div>
  );
};

export default AuthFooter;

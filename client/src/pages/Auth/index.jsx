import AuthContainer from "./components/AuthContainer";
import { Navigate, useParams } from "react-router-dom";

const Auth = () => {
  const { formType } = useParams();
  if (formType !== "login" && formType !== "signup") {
    return <Navigate to="/auth/login" replace />;
  }
  const isSignUpForm = formType === "signup";
  return <AuthContainer isSignUpForm={isSignUpForm} />;
};

export default Auth;

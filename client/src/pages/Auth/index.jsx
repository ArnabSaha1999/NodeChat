import AuthContainer from "./components/AuthContainer";
import { Navigate, useParams } from "react-router-dom";

const Auth = () => {
  const { formType } = useParams();
  const isSignUpForm = formType === "signup";
  return ["login", "signup"].includes(formType) ? (
    <AuthContainer isSignUpForm={isSignUpForm} />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default Auth;

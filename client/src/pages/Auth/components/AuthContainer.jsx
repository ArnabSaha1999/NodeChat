import AuthForm from "./AuthForm";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

const AuthContainer = ({ isSignUpForm }) => {
  return (
    <div className="w-[500px] min-w-[330px] sm:w-[100%] bg-white shadow-2xl rounded-2xl p-10 sm:px-2 text-xl">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <AuthHeader />
        <AuthForm isSignUpForm={isSignUpForm} />
        <AuthFooter isSignUpForm={isSignUpForm} />
      </div>
    </div>
  );
};

export default AuthContainer;

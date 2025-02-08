import Form from "./Form";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

const AuthContainer = ({ isSignUpForm }) => {
  return (
    <div className="w-[30vw] 2xl:w-[40vw] xl:w-[50vw] lg:w-[60vw] md:w-[80vw] sm:w-[100vw] bg-white shadow-2xl rounded-2xl p-10 sm:px-2 min-w-[330px] text-xl">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <AuthHeader isSignUpForm={isSignUpForm} />
        <Form isSignUpForm={isSignUpForm} />
        <AuthFooter isSignUpForm={isSignUpForm} />
      </div>
    </div>
  );
};

export default AuthContainer;

import logo from "@/assets/NodeChat_Logo.png";
const AuthHeader = ({ isSignUpForm }) => {
  return (
    <div className="flex flex-col justify-center items-center py-5">
      <img
        src={logo}
        alt="NodeChat Logo"
        className="w-24 h-24"
        loading="lazy"
      />
      <p className="font-bold mt-2 text-2xl text-gray-600">
        {isSignUpForm ? "SignUp to NodeChat" : "SignIn to NodeChat"}
      </p>
    </div>
  );
};

export default AuthHeader;

import NodeChat_Logo from "@/assets/NodeChat_Logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <img
        className="w-10 h-10 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
        src={NodeChat_Logo}
        alt="NodeChat Logo"
      />
      <div className="flex flex-row text-3xl font-bold leading-tight">
        <span className="text-orange-500 hover:text-orange-700 transition-colors duration-300">
          Node
        </span>
        <span className="text-teal-600 hover:text-teal-800 transition-colors duration-300">
          Chat
        </span>
      </div>
    </div>
  );
};

export default Logo;

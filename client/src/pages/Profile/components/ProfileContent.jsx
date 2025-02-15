import { ProfileFormProvider } from "@/context/ProfileFormContext";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { useProfileUIContext } from "@/context/ProfileUIContext";
import Theme from "./Theme";
import ChangePassword from "./ChangePassword";
import { ChangePasswordProvider } from "@/context/ChangePasswordContext";

const ProfileContent = () => {
  const { isSideBarOpen, isActive, isThemeContainerOpen } =
    useProfileUIContext();
  return (
    <div
      className={`flex gap-10 flex-col w-[70vw] 2xl:w-[65vw] md:w-[100vw] min-h-[100vh] p-5 md:px-2 min-w-[330px] transition-all duration-300 relative bg-gray-200 dark:bg-zinc-800 ${
        isSideBarOpen
          ? "md:w-[0vw] md:translate-x-full"
          : "md:w-[100vw] md:-translate-x-1/2"
      }`}
    >
      {isActive === "Account" && (
        <ProfileFormProvider>
          <ProfileUpdateForm />
        </ProfileFormProvider>
      )}

      {isActive === "Theme" && <Theme />}

      {isActive === "Password" && (
        <ChangePasswordProvider>
          <ChangePassword />
        </ChangePasswordProvider>
      )}
    </div>
  );
};

export default ProfileContent;

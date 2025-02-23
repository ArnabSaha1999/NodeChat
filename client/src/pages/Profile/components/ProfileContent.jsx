import { ProfileFormProvider } from "@/context/ProfileFormContext";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { useProfileUIContext } from "@/context/ProfileUIContext";
import Theme from "./Theme";
import ChangePassword from "./ChangePassword";
import { ChangePasswordProvider } from "@/context/ChangePasswordContext";

const ProfileContent = () => {
  const { isSideBarOpen, isActive } = useProfileUIContext();
  return (
    <div
      className={`flex gap-10 flex-col w-[70%] 2xl:w-[65%] md:w-full min-h-[100vh] p-5 md:px-2 transition-all duration-300 relative bg-gray-200 dark:bg-zinc-800 ${
        isSideBarOpen
          ? "md:hidden" // When sidebar is active, content is hidden
          : "" // When sidebar is toggled off, content slides in
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

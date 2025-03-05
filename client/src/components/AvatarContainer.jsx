import { CLOUDINARY_BASE_URL } from "@/utils/constants";
import { Avatar, AvatarImage } from "./ui/avatar";

const AvatarContainer = ({ avatar, email, avatarSize = "w-12 h-12" }) => {
  return (
    <div>
      <Avatar className={`${avatarSize} rounded-full overflow-hidden`}>
        {avatar ? (
          <AvatarImage
            src={`${CLOUDINARY_BASE_URL}/${avatar}`}
            alt="DP"
            className="object-cover w-full h-full bg-black"
          />
        ) : (
          <div
            className={`uppercase text-5xl flex items-center justify-center border-[1px] dark:border-dark dark:text-dark border-light text-light ${avatarSize} rounded-full overflow-hidden`}
          >
            {email.split("").shift()}
          </div>
        )}
      </Avatar>
    </div>
  );
};

export default AvatarContainer;

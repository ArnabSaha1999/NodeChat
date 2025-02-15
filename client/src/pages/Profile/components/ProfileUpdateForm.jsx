import { Label } from "@/components/ui/label";
import { useProfileFormContext } from "@/context/ProfileFormContext";
import { useProfileUIContext } from "@/context/ProfileUIContext";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { UPDATE_PROFILE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { GrEmoji, GrRevert } from "react-icons/gr";
import { toast } from "react-toastify";
import GraphemeSplitter from "grapheme-splitter";
import { MdEdit } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";

const ProfileUpdateForm = () => {
  const { userInfo, setUserInfo } = useAppStore();

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    bio,
    setBio,
    firstNameError,
    setFirstNameError,
    lastNameError,
    setLastNameError,
    bioError,
    setBioError,
    firstNameSuccess,
    setFirstNameSuccess,
    lastNameSuccess,
    setLastNameSuccess,
    bioSuccess,
    setBioSuccess,
  } = useProfileFormContext();
  const Splitter = new GraphemeSplitter();
  const [isLoading, setIsLoading] = useState(false);
  const [remainingCharacters, setRemainingCharacters] = useState(
    150 - (userInfo?.bio ? Splitter.splitGraphemes(userInfo.bio).length : 0)
  );

  const emojiRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const { setIsSideBarOpen } = useProfileUIContext();

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setBio(userInfo.bio);
    }
  }, [userInfo]);

  const textAreaResize = () => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    textAreaResize();
  }, [bio]);

  // Force resize on screen changes (using ResizeObserver)
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      textAreaResize(); // Ensure textarea resizes when parent width changes
    });

    if (textAreaRef.current) {
      observer.observe(textAreaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateFirstName = (firstName) => {
    const trimmedFirstName = firstName.trim();
    setFirstNameSuccess(false);
    if (!trimmedFirstName) {
      setFirstNameError("First name is required!");
      return false;
    }
    if (trimmedFirstName.length > 50) {
      setFirstNameError("First name cannot exceed 50 character!");
      return false;
    }

    setFirstNameError("");
    setFirstNameSuccess(true);
    return true;
  };

  const validateLastName = (lastName) => {
    const trimmedLastName = lastName.trim();
    setLastNameSuccess(false);
    if (!trimmedLastName) {
      setLastNameError("Last name is required!");
      return false;
    }
    if (trimmedLastName.length > 50) {
      setLastNameError("Last name cannot exceed 50 character!");
      return false;
    }
    setLastNameError("");
    setLastNameSuccess(true);
    return true;
  };

  const validateBio = (bio) => {
    const trimmedBio = bio.trim();
    const graphemeLength = Splitter.splitGraphemes(trimmedBio).length;
    setBioSuccess(false);
    if (!trimmedBio) {
      setBioError("Please tell us about you!");
      return false;
    }
    if (graphemeLength < 10) {
      setBioError("Bio must be at least 10 characters long!");
      return false;
    }
    if (graphemeLength > 150) {
      setBioError("Bio cannot exceed 150 characters!");
      return false;
    }

    setBioError("");
    setBioSuccess(true);
    return true;
  };

  const validateForm = () => {
    let isFormValid = true;

    const isFirstNameValid = validateFirstName(firstName);
    if (!isFirstNameValid) isFormValid = false;
    const isLastNameValid = validateLastName(lastName);
    if (!isLastNameValid) isFormValid = false;
    const isBioValid = validateBio(bio);
    if (!isBioValid) isFormValid = false;

    return isFormValid;
  };

  const handleAddEmoji = (emoji) => {
    let newBio = bio + emoji.emoji;
    setBio(newBio);
    setRemainingCharacters(150 - Splitter.splitGraphemes(newBio).length);
    if (bioError || bioSuccess) {
      validateBio(newBio, true);
    }
  };

  const handleClickOutsideEmojiContainer = (e) => {
    if (emojiRef.current && !emojiRef.current.contains(e.target)) {
      setIsEmojiPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideEmojiContainer);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutsideEmojiContainer
      );
  }, [emojiRef]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await apiClient.post(
        UPDATE_PROFILE,
        { firstName, lastName, bio },
        { withCredentials: true }
      );
      if (res.status === 200 && res.data?.user) {
        setUserInfo({ ...res.data.user });
        if (res.status === 200) {
          toast.success("Profile updated successfully!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
          });
          // navigate("/chat");
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscardChange = () => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setBio(userInfo.bio);
    setFirstNameError("");
    setLastNameError("");
    setBioError("");
    setFirstNameSuccess(false);
    setLastNameSuccess(false);
    setBioSuccess(false);
    setIsSideBarOpen(true);
    setRemainingCharacters(
      150 - (userInfo?.bio ? Splitter.splitGraphemes(userInfo.bio).length : 0)
    );
    setIsEditing(false);
  };

  return (
    <>
      <ProfileContentHeader header={"Profile Update"} />
      <div className="bg-white dark:bg-black px-5 sm:px-2 py-10 rounded-xl drop-shadow-2xl flex flex-col gap-20 mt-10">
        <div className="w-full flex flex-col xl:flex-col gap-10 xl:gap-10">
          <div className="w-1/2 xl:w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="firstName"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              First Name*{" "}
              {firstNameError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                firstNameSuccess && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              disabled={!isEditing}
              id="firstName"
              autoComplete="off"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (firstNameError || firstNameSuccess) {
                  validateFirstName(e.target.value);
                }
              }}
              onBlur={() => {
                const trimmedFirstName = firstName.trim();
                setFirstName(trimmedFirstName);
                validateFirstName(trimmedFirstName);
              }}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                firstNameError
                  ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
                  : firstNameSuccess &&
                    "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
              } transition-all duration-300`}
              type="text"
              placeholder="Enter your First Name"
            />
            {firstNameError && (
              <p className="text-red-500 px-2 text-sm absolute bottom-[-30px] left-0">
                {firstNameError}
              </p>
            )}
          </div>
          <div className="w-1/2 xl:w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="lastName"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              Last Name*{" "}
              {lastNameError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                lastNameSuccess && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              disabled={!isEditing}
              id="lastName"
              autoComplete="off"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (lastNameError || lastNameSuccess) {
                  validateLastName(e.target.value);
                }
              }}
              onBlur={() => {
                const trimmedLastName = lastName.trim();
                setLastName(trimmedLastName);
                validateLastName(trimmedLastName);
              }}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                lastNameError
                  ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
                  : lastNameSuccess &&
                    "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
              } transition-all duration-300`}
              type="text"
              placeholder="Enter your Last Name"
            />
            {lastNameError && (
              <p className="text-red-500 px-2 text-sm absolute bottom-[-30px] left-0">
                {lastNameError}
              </p>
            )}
          </div>
          <div className="w-1/2 xl:w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="bio"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              Bio*{" "}
              {bioError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                bioSuccess && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <div className="relative">
              <textarea
                disabled={!isEditing}
                ref={textAreaRef}
                id="bio"
                rows={1}
                value={bio}
                onChange={(e) => {
                  const newBio = e.target.value;

                  // Calculate the length of the bio including emojis as graphemes
                  const bioLength = Splitter.splitGraphemes(newBio).length;

                  // Only update the state if the bio length is <= 150
                  if (bioLength <= 150) {
                    setBio(newBio);
                    setRemainingCharacters(150 - bioLength);

                    // Validate bio if errors or success are present
                    if (bioError || bioSuccess) {
                      validateBio(newBio);
                    }
                  } else {
                    // Optionally show feedback that user reached max length
                    // e.g. setBio(newBio.substring(0, 150)); to trim the bio or just not update it
                    setRemainingCharacters(0); // Show no remaining characters if over limit
                  }
                }}
                onBlur={() => {
                  const trimmedBio = bio.trim();
                  setBio(trimmedBio);
                  validateBio(trimmedBio);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevents Enter key from adding new lines
                  }
                }}
                className={`pl-7 pr-10 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                  bioError
                    ? "outline-red-500 focus:outline-red-500 dark:focus:outline-red-500"
                    : bioSuccess &&
                      "outline-green-500 focus:outline-green-500 dark:focus:outline-green-500"
                } transition-all duration-300 resize-none w-full`}
                placeholder="Write your bio (max 150 characters)"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col justify-center items-center gap-1">
                <button
                  disabled={!isEditing}
                  className={`text-2xl ${
                    !isEditing
                      ? "cursor-not-allowed opacity-50 pointer-events-none"
                      : "hover:text-light hover:dark:text-dark"
                  }`}
                  onClick={() => {
                    setIsEmojiPickerOpen(true);
                  }}
                >
                  <GrEmoji />
                </button>
                {<div>{remainingCharacters}</div>}
              </div>
              <div
                ref={emojiRef}
                className="absolute mb-2 bottom-[100%] right-0 transition-all overflow-hidden"
              >
                <EmojiPicker
                  className="overflow-hidden"
                  autoFocusSearch={false}
                  open={isEmojiPickerOpen}
                  onEmojiClick={handleAddEmoji}
                  theme={userInfo.themePreference}
                />
              </div>
            </div>
            {bioError && (
              <p className="text-red-500 px-2 text-sm absolute bottom-[-30px] left-0">
                {bioError}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row sm:flex-col gap-2 w-1/2 xl:w-full text-lg">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className=" py-3 w-full rounded-lg border-2 border-light dark:border-dark text-light dark:text-dark hover:bg-light dark:hover:bg-dark hover:text-white dark:hover:text-black flex items-center gap-2 justify-center transition-all duration-300"
            >
              <MdEdit /> Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className=" py-3 w-full rounded-lg border-2 border-light dark:border-dark text-light dark:text-dark hover:bg-light dark:hover:bg-dark hover:text-white dark:hover:text-black flex items-center gap-2 justify-center transition-all duration-300"
            >
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <FaCheck /> Update Profile
                </>
              )}
            </button>
          )}
          {!isEditing ? (
            <button
              onClick={handleDiscardChange}
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-400 transition-all sm:w-full justify-center"
            >
              <RiCloseLargeFill />
              Cancel
            </button>
          ) : (
            <button
              onClick={handleDiscardChange}
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-400 transition-all sm:w-full justify-center"
            >
              <GrRevert />
              Discard Changes
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateForm;

import Label from "@/components/Label";
import { useProfileFormContext } from "@/context/ProfileFormContext";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { UPDATE_PROFILE } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import { toast } from "react-toastify";
import GraphemeSplitter from "grapheme-splitter";
import { MdEdit } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";
import ButtonGroup from "@/components/profileComponents/ButtonGroup";
import Button from "@/components/profileComponents/Button";
import FormContainer from "@/components/profileComponents/FormContainer";
import InputContainer from "@/components/InputContainer";
import FormError from "@/components/FormError";
import BaseInput from "@/components/BaseInput";
import BioInput from "@/components/profileComponents/BioInput";
import EmojiPickerButton from "@/components/EmojiPickerButton";
import EmojiContainer from "@/components/EmojiPicker";

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
    setRemainingCharacters(
      150 - (userInfo?.bio ? Splitter.splitGraphemes(userInfo.bio).length : 0)
    );
    setIsEditing(false);
  };

  return (
    <>
      <ProfileContentHeader header={"Profile Update"} />
      <FormContainer>
        <InputContainer>
          <Label
            id="firstName"
            label="First Name*"
            error={firstNameError}
            success={firstNameSuccess}
          />
          <BaseInput
            id="firstName"
            value={firstName}
            setValue={setFirstName}
            error={firstNameError}
            success={firstNameSuccess}
            validateInput={validateFirstName}
            inputType="text"
            placeholder={"Enter your first name"}
            isEditing={isEditing}
          />
          <FormError error={firstNameError} />
        </InputContainer>
        <InputContainer>
          <Label
            id="lastName"
            label="Last Name*"
            error={lastNameError}
            success={lastNameSuccess}
          />
          <BaseInput
            id="lastName"
            value={lastName}
            setValue={setLastName}
            error={lastNameError}
            success={lastNameSuccess}
            validateInput={validateLastName}
            inputType="text"
            placeholder={"Enter your last name"}
            isEditing={isEditing}
          />
          <FormError error={lastNameError} />
        </InputContainer>
        <InputContainer>
          <Label id="bio" label="Bio*" error={bioError} success={bioSuccess} />
          <div className="relative">
            <BioInput
              id="bio"
              ref={textAreaRef}
              value={bio}
              setValue={setBio}
              error={bioError}
              success={bioSuccess}
              validateInput={validateBio}
              placeholder="Write your bio (max 150 characters)"
              Splitter={Splitter}
              isEditing={isEditing}
              setRemainingCharacters={setRemainingCharacters}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col justify-center items-center gap-1">
              <EmojiPickerButton
                isEditing={isEditing}
                onClick={() => {
                  setIsEmojiPickerOpen(true);
                }}
              />
              {<div>{remainingCharacters}</div>}
            </div>
            <EmojiContainer
              ref={emojiRef}
              isEmojiPickerOpen={isEmojiPickerOpen}
              handleAddEmoji={handleAddEmoji}
              theme={userInfo.themePreference}
            />
          </div>
          <FormError error={bioError} />
        </InputContainer>
        <ButtonGroup>
          {!isEditing ? (
            <Button onClick={handleEdit} variant="primary">
              <MdEdit /> Edit Profile
            </Button>
          ) : (
            <Button onClick={handleUpdate} variant="primary">
              {isLoading ? (
                "Updating..."
              ) : (
                <>
                  <FaCheck /> Update Profile
                </>
              )}
            </Button>
          )}
          {!isEditing ? (
            <Button onClick={handleDiscardChange} variant="secondary">
              <RiCloseLargeFill />
              Cancel
            </Button>
          ) : (
            <Button onClick={handleDiscardChange} variant="secondary">
              <GrRevert />
              Discard Changes
            </Button>
          )}
        </ButtonGroup>
      </FormContainer>
    </>
  );
};

export default ProfileUpdateForm;

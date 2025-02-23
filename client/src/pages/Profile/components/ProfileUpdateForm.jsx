import Label from "@/components/Label";
import { useProfileFormContext } from "@/context/ProfileFormContext";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { UPDATE_PROFILE } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GrRevert } from "react-icons/gr";
import GraphemeSplitter from "grapheme-splitter";
import { MdEdit } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import ProfileContentHeader from "@/components/profileComponents/ProfileContentHeader";
import ButtonGroup from "@/components/ButtonGroup";
import Button from "@/components/Button";
import FormContainer from "@/components/profileComponents/FormContainer";
import InputContainer from "@/components/InputContainer";
import FormError from "@/components/FormError";
import BaseInput from "@/components/BaseInput";
import BioInput from "@/components/profileComponents/BioInput";
import EmojiPickerButton from "@/components/EmojiPickerButton";
import EmojiContainer from "@/components/EmojiPicker";
import { validateInput } from "@/utils/validators/validateInputFields";
import { showErrorToast, showSuccessToast } from "@/utils/toastNotifications";

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

  const handleFirstName = (firstName) => {
    return validateInput({
      field: "First name",
      value: firstName,
      maxLength: 50,
      setError: setFirstNameError,
      setSuccess: setFirstNameSuccess,
    });
  };

  const handleLastName = (lastName) => {
    return validateInput({
      field: "Last name",
      value: lastName,
      maxLength: 50,
      setError: setLastNameError,
      setSuccess: setLastNameSuccess,
    });
  };

  const handleBio = (bio) => {
    return validateInput({
      field: "Bio",
      value: bio,
      minLength: 10,
      maxLength: 150,
      setError: setBioError,
      setSuccess: setBioSuccess,
      Splitter,
    });
  };

  const validateForm = () => {
    return [
      handleFirstName(firstName),
      handleLastName(lastName),
      handleBio(bio),
    ].every(Boolean);
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
        setUserInfo(res.data.user);
        showSuccessToast("Profile updated successfully!");
        // navigate("/chat");
      }
    } catch (error) {
      console.error({ error });
      showErrorToast("Something went wrong! Please try again!");
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
            validateInput={handleFirstName}
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
            validateInput={handleLastName}
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
              validateInput={handleBio}
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

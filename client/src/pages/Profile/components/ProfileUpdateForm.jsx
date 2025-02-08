import { Label } from "@/components/ui/label";
import { useProfileFormContext } from "@/context/ProfileFormContext";
import { apiClient } from "@/lib/apiClient";
import { useAppStore } from "@/store";
import { UPDATE_PROFILE } from "@/utils/constants";
import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  } = useProfileFormContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setBio(userInfo.bio);
    }
  }, [userInfo]);

  const validateFirstName = (firstName) => {
    setFirstName(firstName.trim());
    if (!firstName) {
      setFirstNameError("First name is required!");
      return false;
    } else if (firstName.length > 50) {
      setFirstNameError("First name cannot exceed 50 character!");
      return false;
    } else {
      setFirstNameError("");
    }
    return true;
  };

  const validateLastName = (lastName) => {
    setLastName(lastName.trim());
    if (!lastName) {
      setLastNameError("Last name is required!");
      return false;
    } else if (lastName.length > 50) {
      setLastNameError("Last name cannot exceed 50 character!");
      return false;
    } else {
      setLastNameError("");
    }
    return true;
  };

  const validateBio = (bio) => {
    setBio(bio.trim());
    if (!bio) {
      setBioError("Please tell us about you!");
      return false;
    } else if (bio.length < 10) {
      setBioError("Bio must be at least 10 characters long!");
      return false;
    } else if (bio.length > 150) {
      setBioError("Bio cannot exceed 150 characters!");
      return false;
    } else {
      setBioError("");
    }
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
        // navigate("/chat");
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setBio(userInfo.bio);
    setFirstNameError("");
    setLastNameError("");
    setBioError("");
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold absolute top-4 md:right-5">
          Profile Update
        </h1>
      </div>
      <div className="bg-white dark:bg-slate-600 px-5 sm:px-2 py-10 rounded-xl shadow-2xl flex flex-col gap-10 mt-20">
        <div className="flex w-full xl:flex-col gap-5 xl:gap-10">
          <div className="w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="firstName"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              First Name*{" "}
              {firstNameError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                firstName &&
                firstName.length <= 50 && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => validateFirstName(firstName)}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                firstNameError
                  ? "outline-red-500 focus:outline-red-500"
                  : firstName &&
                    firstName.length <= 50 &&
                    "outline-green-500 focus:outline-green-500"
              } transition-all duration-300`}
              type="text"
              placeholder="Enter your First Name"
            />
            {firstNameError && (
              <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
                {firstNameError}
              </p>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 relative">
            <Label
              htmlFor="lastName"
              className="text-lg ml-2 text-gray-500 dark:text-white/70"
            >
              Last Name*{" "}
              {lastNameError ? (
                <FaTimesCircle className="text-red-500 inline" />
              ) : (
                lastName &&
                lastName.length <= 50 && (
                  <FaCheckCircle className="text-green-500 inline" />
                )
              )}
            </Label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => validateLastName(lastName)}
              className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
                lastNameError
                  ? "outline-red-500 focus:outline-red-500"
                  : lastName &&
                    lastName.length <= 50 &&
                    "outline-green-500 focus:outline-green-500"
              } transition-all duration-300`}
              type="text"
              placeholder="Enter your Last Name"
            />
            {lastNameError && (
              <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
                {lastNameError}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 relative">
          <Label
            htmlFor="bio"
            className="text-lg ml-2 text-gray-500 dark:text-white/70"
          >
            Bio*{" "}
            {bioError ? (
              <FaTimesCircle className="text-red-500 inline" />
            ) : (
              bio &&
              bio.length <= 150 && (
                <FaCheckCircle className="text-green-500 inline" />
              )
            )}
          </Label>
          <textarea
            id="bio"
            maxLength={150}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            onBlur={() => validateBio(bio)}
            className={`px-7 py-5 bg-slate-200 dark:bg-gray-700 rounded-xl text-lg border-none outline-none ring-0 focus:outline-2  focus:outline-[#577BC1] dark:focus:outline-[#FFD700] ${
              bioError
                ? "outline-red-500 focus:outline-red-500"
                : bio &&
                  bio.length <= 150 &&
                  "outline-green-500 focus:outline-green-500"
            } transition-all duration-300 resize-none`}
            placeholder="Write your bio (max 150 characters)"
          />
          {bioError && (
            <p className="text-red-500 px-2 text-sm absolute top-full bottom-[-1.5rem] left-0">
              {bioError}
            </p>
          )}
        </div>
        <div className="flex flex-row  gap-5 w-full">
          <button
            onClick={handleCancel}
            className="px-10 py-3 w-full rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-10 py-3 w-full rounded-lg border-2 border-blue-600 bg-blue-600 text-white hover:bg-blue-800 hover:border-blue-800 transition-all duration-300"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdateForm;

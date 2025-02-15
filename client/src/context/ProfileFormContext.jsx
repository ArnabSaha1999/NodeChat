import { createContext, useContext, useState } from "react";

const ProfileFormContext = createContext();

export const useProfileFormContext = () => {
  return useContext(ProfileFormContext);
};

export const ProfileFormProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [bioError, setBioError] = useState("");

  const [firstNameSuccess, setFirstNameSuccess] = useState(false);
  const [lastNameSuccess, setLastNameSuccess] = useState(false);
  const [bioSuccess, setBioSuccess] = useState(false);

  return (
    <ProfileFormContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProfileFormContext.Provider>
  );
};

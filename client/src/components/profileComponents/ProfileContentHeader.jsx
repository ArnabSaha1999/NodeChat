const ProfileContentHeader = ({ header }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold absolute top-4 md:right-5">
        {header}
      </h1>
    </div>
  );
};

export default ProfileContentHeader;

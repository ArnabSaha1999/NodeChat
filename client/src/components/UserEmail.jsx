import { useAppStore } from "@/store";
import React from "react";

const UserEmail = ({ className = "" }) => {
  const { userInfo } = useAppStore();
  return (
    <div
      className={`overflow-hidden whitespace-nowrap max-w-full text-ellipsis ${className}`}
    >
      {userInfo.email}
    </div>
  );
};

export default UserEmail;

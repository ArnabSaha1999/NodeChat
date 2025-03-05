import { useAppStore } from "@/store";
import React from "react";

const UserDisplay = ({ className = "" }) => {
  const { userInfo } = useAppStore();
  return (
    <div
      className={`overflow-hidden whitespace-nowrap max-w-full text-ellipsis ${className}`}
    >
      {userInfo.firstName + " " + userInfo.lastName}
    </div>
  );
};

export default UserDisplay;

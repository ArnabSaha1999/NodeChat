import React from "react";
import { GrEmoji } from "react-icons/gr";

const EmojiPickerButton = ({ isEditing = true, onClick }) => {
  return (
    <button
      disabled={!isEditing}
      className={`text-2xl ${
        !isEditing
          ? "cursor-not-allowed opacity-50 pointer-events-none"
          : "hover:text-light hover:dark:text-dark"
      }`}
      onClick={onClick}
    >
      <GrEmoji />
    </button>
  );
};

export default EmojiPickerButton;

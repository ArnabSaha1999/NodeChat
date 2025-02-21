import EmojiPicker from "emoji-picker-react";
import { forwardRef } from "react";

const EmojiContainer = forwardRef(
  ({ isEmojiPickerOpen, handleAddEmoji, theme }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute mb-2 bottom-[100%] right-0 transition-all overflow-hidden"
      >
        <EmojiPicker
          className="overflow-hidden"
          autoFocusSearch={false}
          open={isEmojiPickerOpen}
          onEmojiClick={handleAddEmoji}
          theme={theme}
        />
      </div>
    );
  }
);

export default EmojiContainer;

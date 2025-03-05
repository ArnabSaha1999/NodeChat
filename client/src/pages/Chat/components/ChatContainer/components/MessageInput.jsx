import IconContainer from "@/components/IconContainer";
import { useEffect, useRef, useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const messageInputRef = useRef(null);
  const textAreaResize = () => {
    if (!messageInputRef.current) return;
    const maxHeight = 200;
    messageInputRef.current.style.height = "auto"; // Reset height
    const scrollHeight = messageInputRef.current.scrollHeight;

    if (scrollHeight > maxHeight) {
      messageInputRef.current.style.height = `${maxHeight}px`; // Limit to maxHeight
      messageInputRef.current.style.overflowY = "auto"; // Enable scrolling
    } else {
      messageInputRef.current.style.height = `${scrollHeight}px`; // Expand normally
      messageInputRef.current.style.overflowY = "hidden"; // Hide scroll when not needed
    }
  };
  useEffect(() => {
    textAreaResize();
  }, [message]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      textAreaResize(); // Ensure textarea resizes when parent width changes
    });

    if (messageInputRef.current) {
      observer.observe(messageInputRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      ref={messageInputRef}
      rows={1}
      className="w-full bg-gray-300 dark:bg-gray-600 pl-5 pr-12 py-3 border-b-[1px] rounded-lg drop-shadow-lg border-b-light dark:border-b-dark outline-none resize-none overflow-hidden"
      placeholder="Message"
    />
  );
};

export default MessageInput;

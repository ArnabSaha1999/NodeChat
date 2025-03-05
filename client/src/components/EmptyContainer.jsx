import React from "react";

const EmptyContainer = () => {
  return (
    <div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1], // Subtle scaling animation
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <MdChatBubbleOutline className="text-6xl text-gray-700 dark:text-gray-600" />
      </motion.div>

      <motion.h2
        className="text-3xl font-semibold mt-6 text-gray-800 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="typewriter-text">
          No chat selected
          <span className="cursor">|</span> {/* Cursor */}
        </span>
      </motion.h2>

      <motion.p
        className="text-gray-500 dark:text-gray-400 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="typewriter-text">
          Select a chat from the list to start messaging
          <span className="cursor border-1 border-white after:border-1 after:border-white"></span>{" "}
          {/* Cursor */}
        </span>
      </motion.p>

      <motion.button
        onClick={() => navigate("/profile")}
        className="mt-6 px-6 py-2 border-2 border-gray-500 rounded-lg text-gray-500 hover:bg-gray-500 hover:text-white dark:border-yellow-500 dark:text-yellow-500 dark:hover:bg-yellow-500 dark:hover:text-black transition-all"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Go to Profile
      </motion.button>
    </div>
  );
};

export default EmptyContainer;

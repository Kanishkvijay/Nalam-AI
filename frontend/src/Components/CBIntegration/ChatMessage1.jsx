import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const ChatMessage1 = ({ message, sender }) => {
  const [visibleMessage, setVisibleMessage] = useState("");
  const isBot = sender === "bot";

  useEffect(() => {
    if (isBot) {
      const words = message.split(" ");
      let index = 0;

      const interval = setInterval(() => {
        setVisibleMessage((prev) => (prev ? `${prev} ${words[index]}` : words[index]));
        index++;
        if (index === words.length) clearInterval(interval);
      }, 118); // Adjust timing for word-by-word effect
      return () => clearInterval(interval);
    } else {
      setVisibleMessage(message); // Show user's full message immediately
    }
  }, [message, isBot]);

  return (
    <motion.div
      initial={{ opacity: 0, y: isBot ? 20 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex items-start w-full gap-x-3 text-lg ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {isBot && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center text-2xl mt-3 text-darkBlue"
        >
          <RiRobot2Fill />
        </motion.div>
      )}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`p-3 max-w-[75%]  ${
          isBot
            ? "  shadow-md text-darkBlue "
            : "  rounded-lg shadow-md  text-black rounded-tr-none"
        }`}
      >
        {visibleMessage}
      </motion.div>
      {!isBot && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center text-2xl text-darkBlue mr-3"
        >
          
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatMessage1;

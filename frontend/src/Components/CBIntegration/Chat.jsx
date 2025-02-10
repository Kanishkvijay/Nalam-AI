import React, { useEffect, useRef } from "react";
import ChatMessage1 from "./ChatMessage1";
import { motion } from "framer-motion";

const Chat = ({ chatHistory, questions, currentStep, handleOptionSelect }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-col gap-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {chatHistory.map((msg, index) => (
        <motion.div key={index} variants={itemVariants}>
          {msg.message && ( // Render only if msg.message is defined
            <ChatMessage1 sender={msg.sender} message={msg.message} />
          )}
          {/* Show options only for predefined questions */}
          {msg.sender === "bot" &&
            index === chatHistory.length - 1 && // Ensure this is the latest bot message
            currentStep < questions.length && // Ensure within predefined questions
            msg.message === questions[currentStep].question && ( // Match bot message with the current question
              <div className="mt-7 ml-16 flex flex-wrap gap-3">
                {questions[currentStep]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    className="px-5 py-1.5 bg-[#264594] text-white rounded-lg shadow-md hover:bg-indigo-300 transition duration-300 ease hover:scale-[1.1]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
        </motion.div>
      ))}
      <div ref={chatEndRef} />
    </motion.div>
  );
};

export default Chat;

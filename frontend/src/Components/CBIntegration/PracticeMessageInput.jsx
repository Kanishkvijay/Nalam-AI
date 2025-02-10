import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const PracticeMessageInput = ({
  onSend,
  currentStep = 0,
  questions = [], // Default to empty array
  chatHistory = [], // Default to empty array
}) => {
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const [message, setMessage] = useState("");
  const [speechText, setSpeechText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Speech recognition setup logic (unchanged)
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onstart = () => setIsListening(true);
      recognitionInstance.onend = () => setIsListening(false);
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSpeechText(transcript);
      };
      recognitionInstance.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        alert(`Speech Recognition Error: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current = recognitionInstance;
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleVideoClick = () => {
    setIsSessionEnded(true);
  };

  const handleSend = () => {
    const textToSend = message.trim() || speechText.trim();
    if (textToSend) {
      onSend(textToSend);
      setMessage("");
      setSpeechText("");
    }
  };

  // Adjusted to ensure safety with undefined values
  const showInputBox =
    questions.length === 0 ||
    currentStep >= questions.length ||
    (chatHistory.length > 0 &&
      chatHistory[chatHistory.length - 1]?.sender !== "bot");

  if (isSessionEnded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-lightBlue text-lightBlue z-50">
        <Navbar />
        <div className="w-[40%] h-1/2 flex flex-col items-center justify-center bg-darkBlue rounded-lg">
          <h2 className="text-2xl font-bold">Your Interview is Over</h2>
          <p className="mt-2 text-lg italic">
            "Practice makes perfect! Keep pushing your limits and you'll shine."
          </p>
          <div className="mt-9 animate-bounce">
            <p>✨ Practice more and achieve greatness! ✨</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    showInputBox && (
      <div className="w-full h-11 px-60">
        <div className="flex items-center border-darkBlue justify-between w-full h-full pl-8 pr-1 border   rounded-full gap-x-6 bg-white text-lightBlue">
          <input
            className="w-full  text-darkBlue outline-none placeholder:text-darkBlue"
            type="text"
            value={speechText || message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSpeechText("");
            }}
            placeholder="Enter your message or speak"
          />
          <div className="flex items-center gap-x-3">
            <div className="relative group">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`flex items-center justify-center rounded-full w-9 h-9 ${
                  isListening ? "bg-red-500" : "bg-blue-500"
                } text-white bg-[#264594] `}
              >
                <FaMicrophone />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded-md px-2 py-1">
                {isListening ? "Stop Listening" : "Start Listening"}
              </span>
            </div>

            <div className="relative group">
              <button
                onClick={handleVideoClick}
                className="flex items-center justify-center rounded-full w-9 h-9 bg-blue-500 text-white bg-[#264594]"
              >
                <FaStop />
              </button>
              <span className="absolute left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 bg-[#264594] text-black text-xs rounded-md px-2 py-1">
                End Interview
              </span>
            </div>

            <button
              onClick={handleSend}
              className="flex items-center justify-center w-12  rounded-full h-1"
            >
              <FontAwesomeIcon icon={faPaperPlane} style={{color: "#264594", fontSize: "24px" }} />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PracticeMessageInput;

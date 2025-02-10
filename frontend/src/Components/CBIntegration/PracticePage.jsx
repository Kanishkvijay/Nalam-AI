// PracticePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { gsap } from "gsap";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";
import PracticeMessageInput from "../components/PracticeMessageInput";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PracticePage.css"

const PracticePage = () => {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Tracks the current question being asked
  const [inputs, setInputs] = useState({
    skills: "",
    experience: "",
    companyName: "",
    domain: "",
  });
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const questions = [
    { 
      question: "What are your skills ?", 
      options: [
        
        "Python", 
        "Java", 
        "C++", 
        "SQL",
        "Power BI",
        "Machine Learning",
        "Deep Learning",
        "Generative AI",
        "React", 
        "Node.js", 
        "HTML/CSS",
        "JavaScript", 
        "Excel",
        "Flutter",
        "Other"

        
        

      ] 
    },
    { 
      question: "What is the name of your preferred company ?", 
      options: [
        "Google", 
        "Microsoft", 
        "Amazon", 
        "Meta", 
        "Apple",
        "Netflix",
        "TCS",
        "IBM",
        "Wipro",
        "Infosis",
        "Accenture" ,
        "Other"
  
    
        
      ] 
    },
    { 
      question: "Which domain are you interested in ?", 
      options: [
        "Web Development", 
        "AI/ML", 
        "Data Science", 
        "Mobile Development", 
        "Cloud Computing", 
        "Cybersecurity", 
        "Blockchain", 
        "Game Development", 
        "DevOps", 
        "UI/UX Design",
        "Other"
      ] 
    },
    { 
      question: "How many years of experience do you have ?", 
      options: [
        "0-1 years", 
        "1-2 years", 
        "2-5 years", 
        "5+ years", 
        "Less than 6 months", 
        "More than 10 years"
      ] 
    },
  ];
  
  
  useEffect(() => {

    
    if (currentStep < questions.length) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: questions[currentStep].question },
      ]);
    }
  }, [currentStep]);
  
  const handleNextStep = async (userMessage) => {
    const inputKeys = ["skills", "companyName", "domain", "experience"];
    const updatedInputs = { ...inputs, [inputKeys[currentStep]]: userMessage };
    setInputs(updatedInputs);
  
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: userMessage }, // Add user's response
    ]);
  
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1); // Advance to the next step
    } else {
      setChatHistory((prev) => [
        ...prev,
        
        
      ]);
      await handleStartInterview(updatedInputs);
    }
  };

  
  

  const handleOptionSelect = (option) => {
    handleNextStep(option);
  };

  const sendMessage = async (message) => {

    
    if (!message.trim()) return;

    const updatedHistory = [...chatHistory, { sender: "user", message }];
    setChatHistory(updatedHistory);

    try {
      const payload = {
        session_id: sessionId,
        user_answer: message,
        skills: inputs.skills,
        experience: inputs.experience,
        company_name: inputs.companyName,
        domain: inputs.domain,
        context: updatedHistory.map((msg) => ({
          sender: msg.sender,
          message: msg.message,
        })),
      };

      console.log("Payload being sent:", payload);

      const response = await axios.post(
        `${import.meta.env.VITE_PYTHON_API_URL}/next_question`,
        payload
      );

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: response.data.question },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send the message. Please try again.");
    }
  };

  const handleStartInterview = async (inputs) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("skills", inputs.skills);
      formData.append("experience", inputs.experience);
      formData.append("company_name", inputs.companyName);
      formData.append("domain", inputs.domain);

      const response = await axios.post(
        `${import.meta.env.VITE_PYTHON_API_URL}/start_interview`,
        formData
      );

      if (response.data.session_id) {
        setSessionId(response.data.session_id);
      } else {
        throw new Error("Session ID not returned.");
      }

      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: response.data.question },
      ]);
    } catch (error) {
      console.error("Error starting interview:", error);
      toast.error("Failed to start the interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen bg-[#e3ecf9] flex flex-col items-center justify-center">
      

      {/* <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1369748264/vector/abstract-white-background-geometric-texture.jpg?s=612x612&w=0&k=20&c=wFsN0D9Ifrw1-U8284OdjN25JJwvV9iKi9DdzVyMHEk=')",
            // filter: "blur(8px)",
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div> */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center justify-center gap-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              <p className="text-xl font-semibold text-white">Are you Ready for the Questions ?</p>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full h-full px-8 py-4 gap-y-6">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-2xl text-darkBlue font-bold ml-[31rem]">
                Interview Practice
              </h1>
            </div>
            <div>
              <button
                onClick={() => navigate("/profile-page")}
                className="text-3xl"
              >
                <FaUserCircle />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full justify-around h-full">
            <div className="h-[25rem] overflow-auto ml-20 relative hide-scrollbar">
              <Chat 
                chatHistory={chatHistory} 
                questions={questions} 
                currentStep={currentStep} 
                handleOptionSelect={handleOptionSelect} 
              />
            </div>

            
              <PracticeMessageInput onSend={(message) => sendMessage(message)} />
          
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PracticePage;
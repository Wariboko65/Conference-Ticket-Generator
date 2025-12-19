import { Routes, Route } from "react-router";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import topRight from "./assets/images/pattern-squiggly-line-top.svg";
import bottomLeftMobile from "./assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import bottomLeftDesktop from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";
import circle from "./assets/images/pattern-circle.svg";
import logo from "./assets/images/logo-full.svg";
import TicketForm from "./pages/ticketForm.jsx";
import Ticket from "./pages/ticket.jsx";
import FormContext from "./components/context.jsx";
import  './App.css';

function App() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : {
      avatar: null,
      avatarPreview: null,
      fullName: "",
      email: "",
      username: ""
    }
  });

  const [errMessage, setErrMessage] = useState({
    avatar: "Upload your photo (JPG or PNG, max size: 500KB).",
    fullName: "",
    email: "",
    username: ""
  })
 
  const inputElement = useRef();
  const navigate = useNavigate()
 
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify({
      avatarPreview: formData.avatarPreview,
      fullName: formData.fullName,
      email: formData.email,
      username: formData.username
    }));
  }, [formData]);

  return (
      <div className="appContainer">
        <FormContext.Provider value={{ formData, setFormData, errMessage, setErrMessage, inputElement, navigate }}>
        <div className="backgroundDesign">
          <img className="topRight" src={topRight} alt="backgroundDesign" />
          <img className="mBottomLeft" src={bottomLeftMobile} alt="backgroundDesign" />
          <img className="dBottomLeft" src={bottomLeftDesktop} alt="backgroundDesign" />
          <img className="topLeft" src={circle} alt="backgroundDesign" />
          <img className="midRight" src={circle} alt="backgroundDesign" />
        </div>
        <div className="header">
          <img src={logo} alt="logo" />
        </div>
       
        <Routes>
          <Route path="/" element={<TicketForm />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>
        </FormContext.Provider>
      </div>
  );
}

export default App

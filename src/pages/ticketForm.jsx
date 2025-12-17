import { Link } from "react-router";
import { useContext, useEffect } from "react";
import FormContext from "../components/context.jsx";
import { HandHelping, TreePalmIcon } from "lucide-react";

function TicketForm() {
  const { formData, setFormData, errMessage, setErrMessage} = useContext(FormContext);
 
  const handelChange = (e) => {
    const { name, value, validity, files } = e.target;
   
    if (name === "avatar") {
      setFormData((prev) => ({...prev, avatar: files[0]}));
      return;
    }

    setFormData((prev) => ({...prev, [name]: value}));

    if (name === "email") {
      if (validity.PatternMismatch) {
        setErrMessage((prev) => ({...prev, email: "Please enter a valid email",}));
      } else {
        setErrMessage((prev) => ({...prev, email: "",}));
      }
    }
  }

    return (
        <form noValidate>
            <h1>
                Your Journey to Coding Conf 2025 Starts Here!
            </h1>
            <p>
                Secure your spot at next year's biggest coding conference.
            </p>
            <label htmlFor="file">Upload Avatar</label>
            <input 
              type="file" 
              name="avatar" 
              id="file"
              value={formData.avatar}
            />
            <span>{errMessage.file}</span>
           
           <label htmlFor="name">Full Name{formData.avatar}</label>
           <input  
             type="text" 
             name="fullName" 
             id="name"
             value={formData.fullName}
             onChange={handelChange}
             placeholder="John Doe"
            />
            <span>{errMessage.fullName}</span>
           
           <label htmlFor="emailInput">Email Address</label>
           <input 
             type="email" 
             name="email" 
             id="emailInput"
             value={formData.email}
             onChangeCapture={handelChange}
             placeholder="example@email.com"
             pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            />
            <span>{errMessage.email}</span>

            <label htmlFor="usernameInput">GitHub Username</label>
            <input 
              type="text" 
              name="username" 
              id="usernameInput"
              value={formData.username}
              onChange={handelChange}
              placeholder="@yourusername"
              pattern="^@.*"
            />
            <span>{errMessage.username}</span>
           
           <button type="submit">Generate My Ticket</button>
            
        </form>
    );
}

export default TicketForm;
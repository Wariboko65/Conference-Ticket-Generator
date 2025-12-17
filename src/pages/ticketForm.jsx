import { Link } from "react-router";
import { useContext, useEffect } from "react";
import FormContext from "../components/context.jsx";
import { HandHelping, ReceiptEuroIcon, TreePalmIcon } from "lucide-react";

function TicketForm() {
  const { formData, setFormData, errMessage, setErrMessage} = useContext(FormContext);
 
  const handelFileChange = (e) => {
    const MAX_FILE_SIZE = 500 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
   
    const file = e.target.files[0];
   
    if (!file) return;
   
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrMessage((prev) => ({...prev, avatar:"Only JPG PNG WEBP files are allowed"}));
      return;
    }
   
    if (file.size > MAX_FILE_SIZE) {
      setErrMessage((prev) => ({...prev, avatar: "File too large. Please upload a photo under 500KB"}));
      return;
    }
   
    const previewURL = URL.createObjectURL(file);
   
    setFormData((prev) => ({...prev, avatar: file, avatarPreview: previewURL}));
   
    setErrMessage((prev) => ({...prev, avatar: "Upload your photo (JPG or PNG, max size: 500KB)."}))
   
  }
 
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    }
  }, []);
 
  const handelChange = (e) => {
    const { name, value, validity } = e.target;
   

    setFormData((prev) => ({...prev, [name]: value}));

    if (name === "email") {
      if (validity.patternMismatch) {
        setErrMessage((prev) => ({...prev, email: "Please enter a valid email",}));
      } else {
        setErrMessage((prev) => ({...prev, email: "",}));
      }
    }
  }
 
  const handelSubmit = (e) => {
    e.preventDefault();
   
    if (!formData.fullName || formData.fullName.trim() === "") {
      setErrMessage((prev) => ({...prev, fullName: "Full Name is required"}));
    } else {
      setErrMessage((prev) => ({...prev, fullName: ""}));
    }
   
    if (!formData.email || errMessage.email) {
      setErrMessage((prev) => ({...prev, email: "Please enter a valid email"}));
    } else {
        setErrMessage((prev) => ({...prev, email: ""}));
    }
   
    if (!formData.username || !formData.username.startsWith("@")) {
      setErrMessage((prev) => ({...prev, username: "Username must start with @"}))
    }
  }


    return (
        <form noValidate onSubmit={handelSubmit}>
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
              onChange={handelFileChange}
              accept="image/jpeg, image/png, image/webp"
            />
            <span>{errMessage.avatar}</span>
           
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
             onChange={handelChange}
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
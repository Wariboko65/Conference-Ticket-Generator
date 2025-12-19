import { useContext, useEffect } from "react";
import FormContext from "../components/context.jsx";
import IconUpload from "../assets/images/icon-upload.svg";
import InfoIcon from "../assets/images/icon-info.svg";
import InfoIconRed from "../assets/images/icon-info-red.svg";
import "./ticketForm.css";

function TicketForm() {
  const { formData, setFormData, errMessage, setErrMessage, inputElement, navigate } = useContext(FormContext);
  
 
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
   
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: reader.result
      }));
    };
   
    reader.readAsDataURL(file);
   
    setErrMessage((prev) => ({...prev, avatar: "Upload your photo (JPG or PNG, max size: 500KB)."}))
  };
 
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
  };
 
  const handelSubmit = (e) => {
    e.preventDefault();
   
    if (formData.avatarPreview === null) {
      setErrMessage((prev) => ({...prev, avatar: "Avatar is required"}));
      return;
    }
   
    if (!formData.fullName || formData.fullName.trim() === "") {
      setErrMessage((prev) => ({...prev, fullName: "Full Name is required"}));
      return;
    } else {
      setErrMessage((prev) => ({...prev, fullName: ""}));
    }
   
    if (!formData.email || errMessage.email) {
      setErrMessage((prev) => ({...prev, email: "Please enter a valid email"}));
      return;
    } else {
        setErrMessage((prev) => ({...prev, email: ""}));
    }
   
    if (!formData.username || !formData.username.startsWith("@")) {
      setErrMessage((prev) => ({...prev, username: "Username must start with @"}));
      return;
    } else {
      setErrMessage((prev) => ({...prev, username: ""}));
    }
   
    setTimeout(() => {
      navigate("/ticket");
    }, 250);
  };


    return (
        <form noValidate onSubmit={handelSubmit}>
            <h1>
                Your Journey to Coding Conf 2025 Starts Here!
            </h1>
            <p>
                Secure your spot at next year's biggest coding conference.
            </p>
            <div className="avatarCard">
              <label tabIndex={0} className="avatarLabel" htmlFor="file">Upload Avatar
              <input 
                type="file" 
                name="avatar" 
                id="file"
                ref={inputElement}
                onChange={handelFileChange}
                accept="image/jpeg, image/png, image/webp"
                hidden
              />
              <div className="avatarPreview">
                {formData.avatarPreview ?
                 <div className="avatarUploaded">
                  <div className="previewContainer">
                  <img className="previewImage" src={formData.avatarPreview} alt="yourImage" />
                  </div>
                  <div className="previewText">
                  <button type="button" onClick={() => (inputElement.current.click())}>Change avatar</button>
                  <button type="button" onClick={() => (setFormData((prev) => ({...prev, avatarPreview: null})))}>Remove Image</button>
                  </div>
                 </div> :
                 <div>
                  <div className="previewContainer">
                  <img src={IconUpload} alt="defaultImage" />
                  </div>
                  <div className="previewText">
                  <p>Drag and drop or click to upload</p>
                  </div>
                 </div>}
              </div>
              </label>
              <div className="errContainer">
                {errMessage.avatar.startsWith("U") ? <img src={InfoIcon} alt="infoIcon" /> : <img src={InfoIconRed} alt="redInfo" />}
                <span className={errMessage.avatar.startsWith("U") ? "normal span" : "span"}>{errMessage.avatar}</span>
              </div>
            </div>

            <div className="fullNameCard">
              <label htmlFor="name">Full Name</label>
              <input  
                type="text" 
                name="fullName" 
                id="name"
                value={formData.fullName}
                onChange={handelChange}
                placeholder="John Doe"
              />
              <div className="errContainer">
                {errMessage.fullName && <img src={InfoIconRed} alt="infoIcon" />}
                <span className="span">{errMessage.fullName}</span>
              </div>
            </div>

            <div className="emailCard">
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
              <div className="errContainer">
                {errMessage.email && <img src={InfoIconRed} alt="infoIcon" />}
                <span className="span">{errMessage.email}</span>
              </div>
            </div>

            <div className="usernameCard">
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
              <div className="errContainer">
                {errMessage.username && <img src={InfoIconRed} alt="infoIcon" />}
                <span className="span">{errMessage.username}</span>
              </div>
            </div>
           
           <button className="genButton" type="submit">Generate My Ticket</button>
        </form>
    );
}

export default TicketForm;
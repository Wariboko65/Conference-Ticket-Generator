import { Link } from "react-router";
import { useContext, useEffect } from "react";
import FormContext from "../components/context.jsx"
import TicketC from "../assets/images/pattern-ticket.svg";
import logo from "../assets/images/logo-full.svg";
import gitHubIcon from "../assets/images/icon-github.svg"
import "./ticket.css";

function Ticket() {
    const { formData, navigate } = useContext(FormContext);
    const d = new Date();
  
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     
    let month = d.getMonth();
    let tDate = `${months[month]} ${d.getDate()}, ${d.getFullYear()} / Austin, TX`;


    return (
        <div className="ticPage">
            <h1>Congrats, <span>{formData.fullName}! </span>Your ticket is ready.</h1>
            <p>We've emailed your ticket to <span>{formData.email} </span>and will send updates in the run up to the event.</p>
            <div className="ticContainer">
                <img className="tic" src={TicketC} alt="ticket" />
                <div className="ticHeader">
                   <img srcSet={logo} alt="logo" />
                   <span>{tDate}</span>
                </div>
                <div className="ticFooter">
                    <div className="avatarPreview">
                        <img src={formData.avatarPreview}alt="yourImage" />
                    </div>
                    <div className="avatarData">
                        <p>{formData.fullName}</p>
                        <div>
                            <img src={gitHubIcon}alt="git" />
                            <span>{formData.username}</span>
                        </div>
                    </div>
                </div>
                <div className="side">
                    <p>#01609</p>
                </div>
            </div>
            <div className="backBtn">
            <button type="button" onClick={() => {
                setTimeout(() => {
                    navigate("/");
                }, 250);
            }}>Back</button>
            </div>
        </div>
    ); 
}

export default Ticket;
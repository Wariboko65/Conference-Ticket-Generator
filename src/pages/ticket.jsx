import { Link } from "react-router";
import { useContext } from "react";
import FormContext from "../components/context.jsx";

function Ticket() {
    return (
        <div className="container">
            <p>Ticket</p>
            <Link to="/">Back to form</Link>
        </div>
    ); 
}

export default Ticket;
import { Link } from "react-router";
import { useContext } from "react";

function Ticket() {
    const formData = useContext(FormContext);
    return (
        <div className="container">
            <p>Ticket{formData}</p>
            <Link to="/">Back to form</Link>
        </div>
    ); 
}

export default Ticket;
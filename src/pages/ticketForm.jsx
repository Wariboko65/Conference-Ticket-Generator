import { Link } from "react-router";

function TicketForm() {
    return (
        <form action="">
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
            />
            <span></span>
           
           <label htmlFor="name">Full Name</label>
           <input  
             type="text" 
             name="fullName" 
             id="name"
             placeholder="John Doe"
            />
            <span></span>
           
           <label htmlFor="emailInput">Email Address</label>
           <input 
             type="email" 
             name="email" 
             id="emailInput"
             placeholder="example@email.com"
            />
            <span></span>

            <label htmlFor="usernameInput">GitHub Username</label>
            <input 
              type="text" 
              name="username" 
              id="usernameInput"
              placeholder="@yourusername"
            />
            <span></span>
           
           <Link to="/ticket">Generate My Ticket</Link>
            
        </form>
    );
}

export default TicketForm;
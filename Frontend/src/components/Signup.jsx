import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Common.css"

const Signup= () => {
  const navigate=useNavigate();
    const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
  const [accountType,setAccountType]=useState("User")

  // we will send req to backend to authenticate the registered user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName, 
      email,
      password, 
      confirmPassword,
      accountType,
    };

   try {
    console.log("Sending data:", formData); 

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData), 
    });
console.log("data sent successfully")

        const data = await response.json(); 
        
        console.log("Server Status Code:", response.status); 
        console.log("Server Response Body:", data);

        if (response.ok) {
            alert("Signup Successful!");
            //redirecting to home on successful signup
         navigate('/');
           
        } else {
            
            alert(`Signup Failed: ${data.message || JSON.stringify(data)}`);
        }
    } 
    catch (err) {
      if (err.response) {
            // This pulls the "User already exisisted" message
            alert(err.response.data.message); 
        }
        else{
 console.log("Network/Code Error:", err);
        alert("Connection Error. Check Backend Console.");
        }
    }
};

  return (
    <div className="both-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          
       
          <div className="toggle-container">
            <div 
              className={`toggle-btn ${accountType === 'User' ? 'active' : ''}`}
              onClick={() => setAccountType('User')}
            >
              User
            </div>
            <div 
              className={`toggle-btn ${accountType === 'Engineer' ? 'active' : ''}`}
              onClick={() => setAccountType('Engineer')}
            >
              Engineer
            </div>
          </div>
          <div className="input-field">
               <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
            <label>Enter your Full Name</label> 
          </div>
          <div className="input-field">
            
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Enter your email</label>
          </div>

          <div className="input-field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Enter Password</label>
          </div>

 <div className="input-field">
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <label>Confirm Password</label>
          </div>
         

          <button className="signUpbutton" type="submit">Sign Up</button>

        </form>
      </div>
    </div>
  );
};

export default Signup;

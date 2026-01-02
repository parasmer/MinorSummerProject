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
      confirmPassword,// <--- ADDED: Many backends expect 'username', not 'fullName'
      accountType,
    };

   try {
    console.log("Sending data:", formData); 

    const response = await fetch('http://localhost:8000/api/v1/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // FIX: Use JSON.stringify() to convert your object to a string
        body: JSON.stringify(formData), 
    });
console.log("data sent successfully")
// console.log("response",response);
        // 2. We MUST parse the JSON to see what the backend said
        const data = await response.json(); 
        
        console.log("Server Status Code:", response.status); // 3. Check status (200, 400, 500?)
        console.log("Server Response Body:", data); // 4. Read the exact error message

        if (response) {
            alert("Signup Successful!");
         navigate('/');
            // Redirect or clear form here
        } else {
            // This will show you exactly why it failed
            alert(`Signup Failed: ${data.message || JSON.stringify(data)}`);
        }
    } 
    catch (err) {
        console.log("Network/Code Error:", err);
        alert("Connection Error. Check Backend Console.");
    }
};

  return (
    <div className="both-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          
          {/* --- TOGGLE BUTTON SECTION --- */}
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
         

          <button type="submit">Sign Up</button>

        </form>
      </div>
    </div>
  );
};

export default Signup;
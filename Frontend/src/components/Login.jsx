import React, { useState } from "react";
import "./Common.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [accountType,setAccountType]=useState("User")
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      rememberMe,
      accountType,
    };

    console.log("Form Submitted:", formData);
   
    // Add your backend login logic here
  };

  return (
    <div className="both-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          
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
            <label>Enter your password</label>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
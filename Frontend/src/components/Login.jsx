import React, { useState } from "react";
import "./Common.css"
import { useNavigate } from "react-router-dom";

const Login = ({setIsLoggedIn}) => {
   const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [accountType,setAccountType]=useState("User")
  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      accountType,
    };

    
   
try{
 const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData), 
    });
const data=await response.json();
if(response.ok){
  console.log("logged in successfully");
  setIsLoggedIn(true);

 navigate('/dashboard',{state:accountType})
}
else{
  alert(`login failed : ${data.json}`)
}
}
catch(error){
  console.log("not getting response from backend",error)
}
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
          <button className="login-button" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
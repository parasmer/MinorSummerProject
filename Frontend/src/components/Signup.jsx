import React, { useState } from "react";
import "./Common.css"

const Signup= () => {
    const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
  const [accountType,setAccountType]=useState("User")
  // we will send req to backend to authenticate the registered user
  const handleSubmit = async(e) =>{

    e.preventDefault();
    const formData = {
      fullName,
      email,
      password,
      confirmPassword,
      accountType,
    };
    try{
const response=await fetch('http://localhost:5000/api/signup',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
body: JSON.stringify(formData),
})
if(response.ok){
  alert("signup successfull");
}
else{
  alert("error connecting to backend")
}
    }
    catch(err){
      console.log("network error:",err)
    }
     localStorage.setItem("accountType")
    console.log("Form Submitted:", formData);
    // Add your backend login logic here
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
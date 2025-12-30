import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
// components and pages
//used private route for extra protection of dashboard ,usermap and engineermap
import PrivateRoute from "./components/PrivateRoute.jsx"
import Navbar from "./components/Navbar.jsx"
import HomePage from "./pages/HomePage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import UserMapPage from "./pages/UserMapPage.jsx"
import EngineerMapPage from "./pages/EngineerMapPage.jsx"
import { useEffect } from 'react'

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [loading,setLoading]=useState(true);
    console.log("isLoggedIn:" ,isLoggedIn)
  //default accountType is user
  const [accountType,setAccoutType]=useState(()=>{
    return localStorage.getItem("accountType") || "user";
  });
  // checking loggedin from backend by verifying token
  useEffect(()=>{
const checkToken=async()=>{
  const token= localStorage.getItem("token");
  // token is not present
  if(!token){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setLoading(false);
  }
  // else token is present
  try{
    //making call to backend
    const response=await axios.get("http://localhost:4000/api/v1/auth/verify",{headers:
      {
        'Authorization':`Bearer ${token}`,
      }
    });
    // if valid token 
    if(response){
      setIsLoggedIn(true)
    }
    else{
      console.log("invalid token")
    }
    }
  catch(err){
    console.log("err",err);
    localStorage.removeItem("token");
     setIsLoggedIn(false);
     setLoading(false);
  }
finally{
  setLoading(false);
}
  };

checkToken();

  },[]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-richblack-900">
        <div className="text-white text-3xl">Loading...</div>
      </div>
    );
  }
  return (
    <div className="background h-screen w-screen">
      
     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  <Routes>
      <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn}/>}/>
       <Route path="/signup"  element={<SignUpPage setIsLoggedIn={setIsLoggedIn} accountType={accountType} setAccoutType={setAccoutType}/>}/>
         <Route path="/login"  element={<LoginPage setIsLoggedIn={setIsLoggedIn} accountType={accountType} setAccoutType={setAccoutType}/>}/>
          <Route path="/dashboard"  element={<PrivateRoute isLoggedIn={isLoggedIn} > <DashboardPage /> </PrivateRoute>}/>
            <Route path="/userMap" element={<PrivateRoute isLoggedIn={isLoggedIn} > <UserMapPage /> </PrivateRoute>}/>
              <Route path="/engineerMap" element={<PrivateRoute isLoggedIn={isLoggedIn} > <EngineerMapPage /> </PrivateRoute>}/> 
  </Routes> 
    </div>
  )
}

export default App

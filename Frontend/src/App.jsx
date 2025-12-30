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

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(()=>{
     
    return localStorage.getItem("token")?true:false;
  });
    console.log("isLoggedIn:" ,isLoggedIn)
  //default accountType is user
  const [accountType,setAccoutType]=useState(()=>{
    return localStorage.getItem("accountType") || "user";
  });
  return (
    <div className="background h-screen w-screen">
      
     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  <Routes>
      <Route path="/" element={<HomePage setIsLoggedIn={setIsLoggedIn}/>}/>
       <Route path="/signup"  element={<SignUpPage setIsLoggedIn={setIsLoggedIn} accountType={accountType} setAccoutType={setAccoutType}/>}/>
         <Route path="/login"  element={<LoginPage setIsLoggedIn={setIsLoggedIn} accountType={accountType} setAccoutType={setAccoutType}/>}/>
          <Route path="/dashboard"  element={<PrivateRoute> <DashboardPage  setIsLoggedIn={setIsLoggedIn} accountType={accountType}  /> </PrivateRoute>}/>
            <Route path="/userMap" element={<PrivateRoute> <UserMapPage  setIsLoggedIn={setIsLoggedIn}/> </PrivateRoute>}/>
              <Route path="/engineerMap" element={<PrivateRoute> <EngineerMapPage  setIsLoggedIn={setIsLoggedIn}/> </PrivateRoute>}/> 
  </Routes> 
    </div>
  )
}

export default App

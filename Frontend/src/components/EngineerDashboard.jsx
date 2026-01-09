
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Common.css";
import { useEffect } from "react";
import start from "../assets/startLogo.png"
//here we do current location stuff
const EngineerDashboard = () => {
const navigate=useNavigate();
  


    const handleGetLocation = () => {
 
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
               
               
                   const lat=position.coords.latitude;
                    const lon=position.coords.longitude;
                
                console.log("Location fetched:");
                          console.log(`coords latitude:${lat} ,coords longitude:${lon}`);
        navigate('/engineerMap',{state:{coords:[lat,lon]}})
            },
            (error) => {
                console.log("error",error);
                alert("Permission denied or unavailable location");
            }
        );


    };

    return (
        <div className="mt-8  h-100 w-100 flex flex-col justify-center">
            <img src={start} className="h-60 mb-3"></img>
            <button onClick={handleGetLocation} className=" bg-white/15 text-white h-[60%] border rounded-md  w-[40%] mx-auto">
                Get Current Location
            </button>

         
        
        </div>
    );
};

export default EngineerDashboard;
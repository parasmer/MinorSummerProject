
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Common.css";
import start from "../assets/startLogo.png"
//here we do current location stuff
const EngineerDashboard = () => {
const navigate=useNavigate();
    const [currentCoords, setCurrentCoords] = useState(null);


    const handleGetLocation = () => {
    
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
               
                setCurrentCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                console.log("Location fetched:", position.coords);
            },
            () => {
                alert("Permission denied or unavailable location");
            }
        );
        navigate('/engineerMap',{state:currentCoords})
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
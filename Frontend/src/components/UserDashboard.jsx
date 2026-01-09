
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./Common.css"
import startLogo from "../assets/startLogo.png"
 async function getCoordinates(address){
const url=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
try{
    const response=await fetch(url);
    const data=await response.json();
    if(data.length>0){
        const lat=data[0].lat;
        const lon=data[0].lon;
        // console.log(`latitude:${lat} , longitude:${lon}`)
        return {lat,lon};
    }
    else{
        console.log("location not found");
        return  null;
    }
}
catch(err){
    console.log("err",err);
    return null;
}
    }
//here we do start location and destination location stuff
const UserDashboard=()=>{
    const navigate=useNavigate();
  
const[start,setStart]=useState("");
const[end,setEnd]=useState("");
 const clickSwitch=async ()=>{
        const startData=await getCoordinates(start);
         console.log(`startLat: ${startData.lat} , startLon: ${startData.lon}`)
       const endData=await getCoordinates(end);
       console.log(`endLat: ${endData.lat} , endLon: ${endData.lon}`)
       navigate('/userMap',{state:{
        start:startData,
        end:endData
 }})
    }
    return(
        // we will ask the user to enter the start location and destination location after which we will store them in state and we can 
        //pass it while navigating to userMapPage.jsx
        <div className="mt-8  h-100 w-100 flex flex-col justify-center">
            <img src={startLogo} className="h-40 mb-8"></img>
            <label className="mb-5 text-white text-xl font-extrabold"onChange={(e) => setStart(e.target.value)}>Start Location:  <input type="" placeholder="start location " />
                </label>
               <label className="mb-2 text-white text-xl font-extrabold" onChange={(e) => setEnd(e.target.value)}>End Location:<input type="" placeholder="destination location" />
                </label>
      <button className="submit-btn  text-white text-lg font-bold border rounded-lg h-7.5 mx-auto w-37.5" onClick={clickSwitch} >Submit</button>
               
              
              </div>
    )
}
export default UserDashboard;
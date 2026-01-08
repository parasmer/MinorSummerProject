import React from "react";
import {useLocation} from "react-router-dom"
const  EngineerMapPage=({setisLoggedIn})=>{
    const location=useLocation();
    const coords=location.state;
return(
    <div>
               <h1>Welcome to EngineerMap</h1> 
    </div>
)
}
export default EngineerMapPage;
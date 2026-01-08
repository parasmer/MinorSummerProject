import React from "react";
import {useLocation} from "react-router-dom"
const UserMapPage=({setisLoggedIn})=>{
     const location=useLocation();
        const {start,end}=location.state;
        const startLatitude=start.lat;
        const startLongitude=start.lon;
        const endLatitude=end.lat;
        const endLongitude=end.lon;
        console.log(`${startLatitude},${startLongitude},${endLatitude},${endLongitude}`)
return(
    <div>
       <h1>Welcome to UserMap</h1> 
    </div>
)
}
export default  UserMapPage;
import React from "react";
import {useLocation} from "react-router-dom"
import UserMapContainer from "../components/UserMapContainer.jsx"
import 'leaflet/dist/leaflet.css';
const UserMapPage=({setisLoggedIn})=>{
     const location=useLocation();
        const {start,end}=location.state;
      //   const startLatitude=start.lat;
      //   const startLongitude=start.lon;
      //   const endLatitude=end.lat;
      //   const endLongitude=end.lon;
        console.log(`${start.lat},${start.lon},${end.lat},${end.lon}`)
return(
    <div style={{ height: '100%', width: '100%' }}>
       <UserMapContainer startCoords={start} endCoords={end}/>
    </div>
)
}
export default  UserMapPage;
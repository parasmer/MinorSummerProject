import React from "react";
import EngineerMapContainer from "../components/EngineerMapContainer.jsx"
import 'leaflet/dist/leaflet.css';

import {useLocation} from "react-router-dom"
const  EngineerMapPage=({setisLoggedIn})=>{
    const location=useLocation();
    const coords=location.state.coords;
     console.log(`coords latitude:${coords[0]} ,coords longitude:${coords[1]}`);

return(
    <div style={{ height: '100%', width: '100%' }}>
    <EngineerMapContainer coords={coords}/>
     
    </div>
)
}
export default EngineerMapPage;
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useState,useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Fix for default marker icon missing in React ---
// This part is often necessary because webpack/vite can mess up image paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
//function for severity icon 
function getseverityIcon(count){
    // minor risk (green)
    if(count<=5){
return { 
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", 
      message: "⚠️ Minor Risk" 
    };
    }
    //moderte risk (yellow)
    else if(count<=12 && count>5){
return { 
      iconUrl: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png", 
      message: "🚧 Moderate Risk" 
    };
    }
    //high risk when count>=13
    else{
return{
    iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", 
      message: "🚨 High Risk!"
};
    }
}
const MapComponent = ({coords}) => {
    //storing all the accidentspots
         const[accidentSpots,setAccidentSpots]=useState([]);
         useEffect(()=>{
            const fetchAccidentSpots=async()=>{
                try{
                const response=await fetch("http://localhost:8000/api/v1/accidents/getaccidentData");
                console.log("status:", response.status);
                const text = await response.text();
console.log("raw response:", text);
const result = JSON.parse(text);
console.log("parsed result:", result);
                // const result=await response.json();
                // console.log("data loaded",result);
                setAccidentSpots(result.data);
                }
                catch(err){
                    console.log("Not able to get accident spots from db")
                }
            };
            fetchAccidentSpots();
         },[]);
    const [address,setAddress]=useState("Loading address");
    
    console.log(`coords latitude:${coords[0]} ,coords longitude:${coords[1]}`);
    const position =[coords[0],coords[1]];

    // function to get current location from coordinates{lat,lon}
useEffect(() => {
    const fetchAddress = async () => {
      try {
        setAddress("Fetching..."); // Optional: show loading state
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`
        );
        const data = await response.json();
        const shortaddress=data.display_name.split(',')[0]
        console.log(`current address: ${shortaddress}`)
        // You can use data.display_name (full) or data.address.road/city (specific)
        setAddress(shortaddress || "Address not found");
      } catch (error) {
        console.error("Geocoding error:", error);
        setAddress("Could not load address");
      }
    };

    if (position[0] && position[1]) {
      fetchAddress();
    }
  }, [position[0],position[1]]);
    return (
        <MapContainer 
        key={accidentSpots.length}
            center={position} 
            zoom={14} 
            scrollWheelZoom={true} 
            style={{ height: "100vh", width: "100vw" }} // Style the map container here
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <Marker position={position}>
                <Popup>
                  <p className='font-extrabold'>Current location:{address}</p>
                </Popup>
            </Marker>
            {accidentSpots.map((spot)=>{
                // we want iconurl and message from getseverityIcon function
                const {iconUrl,message}=getseverityIcon(spot.count);
                //we are creating customized icon for each icon depeding on accidentcount
                const customisedIcon=new L.Icon({
                    //url
                    iconUrl:iconUrl,
                    //css properties of icon
                    iconSize: [30, 40],
              iconAnchor: [15, 40],
              popupAnchor: [1, -34],
              shadowUrl: markerShadow,
              shadowSize: [41, 41],
                });
                return(<Marker 
                key={spot._id}
               position={[spot.lat,spot.lon]}
               icon={customisedIcon}
          >
            <Popup>
                <strong>{spot.name}</strong><br/>
                <strong>{message}</strong><br/>
                <strong>AccidentCount:</strong>{spot.count}<br/>
               <strong>Reason:</strong>{spot.reason || "not known"}<br/>
                <strong>Severity:</strong>{spot.severity}
            </Popup>
          </Marker>);
})}
        </MapContainer>
    );
};

export default MapComponent;
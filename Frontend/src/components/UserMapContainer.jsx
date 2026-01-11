import React from 'react';
import { MapContainer, TileLayer, Marker, Popup ,Polyline } from 'react-leaflet';
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { useState,useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import Legend from './LegendUserMap.js';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
function getColoredIcon(color) {
  return L.divIcon({
    className: `custom-div-icon marker-color-${color}`, // Assigns our CSS classes
    iconSize: [15, 15] // Sets the icon size
  });
}
//function to calculate harversine distance
     function haversineDistance(lat1, lon1, lat2, lon2) {
      const toRad = x => x * Math.PI / 180;
      const R = 6371;

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    //function for checking  accident spot within range or not
     function isSpotWithinRange(spot, routeCoords) {
      return routeCoords.some(coord => {
        const dist = haversineDistance(coord.lat, coord.lng, spot.lat, spot.lon);
        return dist <= 0.5;
      });
    }


const MapComponent=({startCoords,endCoords})=>{

    const[startAddress,setStartAddress]=useState("");
    const[endAddress,setEndAddress]=useState("");
         const startposition =[startCoords?.lat,startCoords?.lon];
             const endposition =[endCoords?.lat,endCoords?.lon];
             const [routeCoords,setrouteCoords]=useState("");
            const[accidentSpots,setAccidentSpots]=useState([]);
            //  
            
            //all accident spots

         useEffect(()=>{
            const fetchAccidentSpots=async()=>{
                try{
                const response=await fetch("http://localhost:8000/api/v1/accidents/getaccidentData");
                // console.log("status:", response.status);
                const text = await response.text();
// console.log("raw response:", text);
const result = JSON.parse(text);
// console.log("parsed result:", result);
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
             // creating a route between start and destination using osrm
useEffect(()=>{
const fetchRoute=async()=>{
     
    if(startposition===endposition){
        console.log("start and end location can't be same");
        return;
    }
    try{
        const start = `${startposition[1]},${startposition[0]}`; 
const end = `${endposition[1]},${endposition[0]}`;
const response=await fetch(`http://localhost:8000/api/v1/routepath/getroutePath?start=${start}&end=${end}`);
const result=await response.json();
const data = result.routes ? result: result.data;
//  console.log("response format checking", result);
if(!data || !data.routes || data.routes.length==0){
    console.error("No routes found in response:", result);
    return;
}
const pathCoords=data.routes[0].geometry.coordinates.map(c=>({
    lat:c[1],
    lng:c[0],
}));
setrouteCoords(pathCoords);
    }
    catch(error){
console.log("error fetching route:",error);
    }
};
fetchRoute();
},[startposition,endposition]);

    
    // fetching start address address using useffect

    useEffect(()=>{

const fetchStartAddress=async()=>{
   
    try{
        setStartAddress("fetching...")
const response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${startposition[0]}&lon=${startposition[1]}`)
const data=await response.json()
 const result=data.display_name
 if(result){
    // console.log(`start address:${JSON.stringify(data, null, 2)}`)
    setStartAddress(result)
 }
 else{
    console.log("error in setting start address");
 }
    }

    catch(err){
console.log("not getting coordinates from backend for  start address",err)
    }
};

if(startposition[0] && startposition[1]){
    fetchStartAddress();
}
else{
    console.log("not able to fetch start address")
}
    },[startposition[0],startposition[1]]);



    // fetching destination address using useffect

 useEffect(()=>{
        const fetchEndAddress=async()=>{
try{
    setEndAddress("fetching...")
const response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${endposition[0]}&lon=${endposition[1]}`)
const data=await response.json()
const result=data.display_name
if(data){
    //  console.log(`end address:${JSON.stringify(data, null, 2)}`)
    setEndAddress(result);
    //  console.log(`end Address:${result}`)
}
else{
    console.log("error in setting end address");
 }
}

catch(error){
    console.log("not getting coordinates from backend for end address",err);
    }
        };
        if(endposition[0] && endposition[1]){
            fetchEndAddress();
        }
    },[endposition[0],endposition[1]]);

   
return(
    <MapContainer
            zoom={14} 
            center={startCoords}
            scrollWheelZoom={true} 
            style={{ height: "100vh", width: "100vw" }}
    >
        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
 <Marker position={startCoords}>
                <Popup>
                  <p className='font-extrabold'>Start Location:{startAddress}</p>
                </Popup>
            </Marker>
             <Marker position={endCoords}>
                <Popup>
                  <p className='font-extrabold'>Destination location:{endAddress}</p>
                </Popup>
            </Marker>
       {routeCoords.length > 0 && (
  <Polyline
    positions={routeCoords.map(c => [c.lat, c.lng])} 
    color="blue"
    weight={4}
  />
)}
{
    routeCoords.length>0 && accidentSpots.filter((spot)=>isSpotWithinRange(spot,routeCoords))
    .map((spot,index)=>{
       const {iconUrl,message}=getseverityIcon(spot.count);
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
        return(
            <Marker
            key={spot._id || index}
            position={spot}
            icon={customisedIcon}>
                <Popup>
                    <strong>{spot.name}</strong><br/>
                     <strong>{message}</strong><br/>
                <strong>AccidentCount:</strong>{spot.count}<br/>
               <strong>Reason:</strong>{spot.reason || "not known"}<br/>
                <strong>Severity:</strong>{spot.severity}
                </Popup>
            </Marker>
        
        )
    })
}
<Legend/>
    </MapContainer>
)
}
export default MapComponent;
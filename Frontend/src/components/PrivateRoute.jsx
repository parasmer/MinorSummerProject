import React from "react";
import {Navigate} from "react-router-dom"
const PrivateRoute=({isLoggedIn,children})=>{
   if(isLoggedIn){
    //react will return the component outside which privateroute is applied
    return children;
   }
   else{
    return<Navigate to="/login"/>
   }
}
export default PrivateRoute;
// <PrivateRoute><Dashboard/></PrivateRoute>
// it means that PrivateRoute({children:<Dashboard/>})
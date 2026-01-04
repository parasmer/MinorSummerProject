import React from "react";
import "./DashboardPage.css"
import { useLocation } from "react-router-dom";
import EngineerDashboard from "../components/EngineerDashboard"
import UserDashboard from "../components/UserDashboard"
const DashboardPage=()=>{
    //it is used to access data passed in useState
    const location=useLocation();
    const accountType=location.state;
return(
    <div className="main ">
        <div className="dashboard">
            <h1 className="text-amber-50">Welcome to dashboard</h1>
           {(accountType=="Engineer"?
          <EngineerDashboard/>:<UserDashboard/>)}
            <div></div>
            </div>
        
    </div>
)
}
export default DashboardPage;
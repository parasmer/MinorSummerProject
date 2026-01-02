import React from "react";
import Login from "../components/Login";
const LoginPage=({setisLoggedIn,accountType,setAccoutType})=>{
return(
    // both login and signup form uses same template without no change 
    <div>
           <Login
           setisLoggedIn={setisLoggedIn}
           setAccoutType={setAccoutType}
           accountType={accountType}
           />
    </div>
)
}
export default LoginPage;
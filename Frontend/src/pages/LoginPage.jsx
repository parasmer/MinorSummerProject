import React from "react";
import Login from "../components/Login";
const LoginPage=({setIsLoggedIn})=>{
return(
    // both login and signup form uses same template without no change 
    <div>
           <Login
           setIsLoggedIn={setIsLoggedIn}
           />
    </div>
)
}
export default LoginPage;
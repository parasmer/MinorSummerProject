import React from "react";
import CommonTemplate from "../components/CommonTemplate";
const LoginPage=({setisLoggedIn,accountType,setAccoutType})=>{
return(
    // both login and signup form uses same template without no change 
    <div>
           <CommonTemplate
           formtype="login"
           setisLoggedIn={setisLoggedIn}
           setAccoutType={setAccoutType}
           accountType={accountType}
           />
    </div>
)
}
export default LoginPage;
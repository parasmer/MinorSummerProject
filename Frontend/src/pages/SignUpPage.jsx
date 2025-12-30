import React from "react";
import CommonTemplate from "../components/CommonTemplate";
const SignUpPage=({setisLoggedIn,setAccoutType,accountType})=>{
return(
    <div>
        <CommonTemplate
         formtype="signup"
           setisLoggedIn={setisLoggedIn}
           setAccoutType={setAccoutType}
           accountType={accountType}/>
    </div>
)
}
export default SignUpPage;
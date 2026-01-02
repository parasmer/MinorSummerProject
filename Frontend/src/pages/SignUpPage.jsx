import React from "react";
// import CommonTemplate from "../components/CommonTemplate";
import Signup from "../components/Signup"
const SignUpPage=({setisLoggedIn,setAccoutType,accountType})=>{
return(
    <div>
        <Signup
           setisLoggedIn={setisLoggedIn}
           setAccoutType={setAccoutType}
           accountType={accountType}/>
    </div>
)
}
export default SignUpPage;
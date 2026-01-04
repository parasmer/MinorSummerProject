import React from "react";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";


const Navbar=({isLoggedIn,setIsLoggedIn})=>{
  
    function changeHandler(){
        setIsLoggedIn(false);
        toast.success("logged Out")
        // removing the item from localstorage after logged out
        localStorage.removeItem("token")
      
    }
     console.log("isLoggedIn:" ,isLoggedIn)
    return(
        <div className="flex justify-evenly items-center w-full  gap-x-20 bg-slate-500">
            
            <nav>
                <ul className="flex items-center gap-10">
                    <Link to="/"><li className="bg-gray-600 
                hover:border-2 hover:border-cyan-50  hover:text-white border-transparent
                 border mt-1 rounded-md px-3 py-2 ">Home</li></Link>
                </ul>
            </nav>
            <div className="flex my-auto gap-10 mt-2">
                {
                    !isLoggedIn &&
                    <Link to="/signup">
                        <button className="bg-gray-600 
                hover:border-2 hover:border-cyan-50 hover:text-white border-transparent
                 border  rounded-md px-3 py-2 ">Sign Up</button></Link>
                }
               {
                !isLoggedIn &&
                <Link to="/login"><button className="bg-gray-600 
                hover:border-2 hover:border-cyan-50  border-transparent
                 border  rounded-md px-3 py-2 hover:text-white mb-2">Log In</button></Link>
               }
               {
                isLoggedIn &&
                <Link to="/"><button  className="bg-gray-600 
                hover:border-2 hover:border-cyan-50  border-transparent
                 border  rounded-md px-3 py-2 mb-2" onClick={changeHandler}>Log Out</button></Link>
               }
               {
                 isLoggedIn &&
                 <Link to="/dashboard"><button className="bg-gray-600 
                hover:border-2 hover:border-cyan-50  border-transparent
                 border  rounded-md px-3 py-2 mb-2">Dashboard</button></Link>
               }
                
                
            </div>
        </div>
    )
}
export default Navbar;
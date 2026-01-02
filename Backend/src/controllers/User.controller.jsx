import { apiError } from "../utils/apiError"
import apiResponse from "../utils/apiResonse";
import User from "../models/user.model.jsx"
import asyncHandler from "../utils/asyncHandler.jsx";
import jwt from "jsonwebtoken"

const generateAccessandRefreshToken=async(userId)=>{
    try{
const user=await User.findById(userId)
const accessToken=user.generateAccessToken()
const refreshToken=user.generateRefeshToken()
//it will save the refreshtoken in user object
user.refreshToken=refreshToken
//it is used to reduce latency that occurrs in validation check
// just saves the data without any other validation check
await user.save({validateBeforeSave:false})
return {accessToken,refreshToken}
    }
    catch(error){
console.log("refreshToken and accesstoken not created ",error)
throw new apiError(500,"Something went wrong while generating refresh token and access token")
    }
}
const signUpUser=asyncHandler(async(req,res)=>{
    const {fullName,email,password,confirmPassword,accountType}=req.body
    // if any field is empty 
    if([fullName,email,password,confirmPassword,accountType].some((field)=>
        field?.trim()===""))
    {
        throw new apiError(400,"all fields are required");
    }
    // if password and confirmPassword are not same
    if(password!==confirmPassword){
        throw new apiError(400,"password and confirm password must be same")
    }
    // checking exisisting user.  with help of {accounttype and email}
    const exisistedUser=await User.findOne({
$and:[{email},{accountType}]
    })
    if(exisistedUser){
        throw new apiError(409,"User already exisisted")
    }
//creating new user
const user=await User.create({
fullName,
email,
password,
// confirmPassword,
accountType
})

//select is used to return some documnets 
// -password and -refreshtoken means dont give me these fiels of user

// after this we will check that user is created successfully (with the help of user_.id) to send response back to frontend
const findUser=await user.findById(user_.id).select(
    "-password -refreshToken"
)
// if user was not created successfully 
if(!findUser){
    throw new apiError(500,"something went wrong")
}
return res.status(201).json(
    new apiResponse(200,createdUser,"user registered successfully")
)
})
// it is done
const refreshAccessToken=asyncHandler(async(req,res)=>{
const incomingRefreshToken=req.body.refreshToken || req.cookies.refreshToken;
if(!incomingRefreshToken){
    throw new apiError(401,"unathourized access")
}
try{
    //checking the refresh token is tampered or not
const decodedToken=jwt.verify(incomingRefreshToken,
    process.env.REFRESH_TOKEN
)
const user=await User.findById(decodedToken?._id)
// if user doesnt exists
if(!user){
    throw new apiError(401,"invalid refresh Token")
}
//if tokens doesnot match
if(incomingRefreshToken!==user?.refreshToken){
    throw new apiError(401,"refresh token expired")
}
//for cookie we are adding two security options
const options={
    httpOnly:true,
    secure:true,
}

//fetching accesstoken and new refreshtoken from function
const {accessToken,newRefreshToken}=generateAccessandRefreshToken(user._id)
//passing new refreshtoken inside old refreshtoken in cookie and json response
return res
.status(200)
.cookie("accessToken",accessToken)
.cookie("refreshToken",newRefreshToken)
.json(
    new apiResponse(
        200,
        {accessToken,refreshToken:newRefreshToken},
        "Access token refreshed"
    )
)
}
catch(err){
throw new apiError(401,error?.message||"invalid refresh token")
}
})
export{signUpUser,generateAccessandRefreshToken,refreshAccessToken}
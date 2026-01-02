import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const generateAccessandRefreshToken=async(userId)=>{
   
    try{
const user=await User.findById(userId)


const accessToken=user.generateAccessToken()
const refreshToken=user.generateRefreshToken()

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
const getCurrentUser = asyncHandler(async(req, res) => {
    // Because verifyJWT ran first, req.user is available here
    const user = req.user;

    return res
        .status(200)
        .json(
            new apiResponse(
                200, 
                user, 
                "Current user fetched successfully"
            )
        );
    });
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
email: email, 
    accountType: accountType
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
const findUser=await User.findById(user._id).select(
    "-password -fullName -refreshToken"
)
// if user was not created successfully 
if(!findUser){
    throw new apiError(500,"something went wrong")
}
return res.status(201).json(
    new apiResponse(200,findUser,"user registered successfully")
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
const {accessToken,refreshToken:newRefreshToken}=await generateAccessandRefreshToken(user._id)
//passing new refreshtoken inside old refreshtoken in cookie and json response
return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",newRefreshToken,options)
.json(
    new apiResponse(
        200,
        {accessToken,refreshToken:newRefreshToken},
        "Access token refreshed"
    )
)
}
catch(err){
throw new apiError(401,err?.message||"invalid refresh token")
}
})
const loginUser=asyncHandler(async(req,res)=>{
    const {password,accountType,email}=req.body;
    // credentials empty check
    if(!email){
        throw new apiError(400,"Username or email is required")
    }
    // checking user is in database
    const user=await User.findOne({
    email:email,
    })
    if(!user){
        throw new apiError(404,"account doesn't exists with this credentials");
    }
   const isPasswordValid=await user.isPasswordCorrect(password);
   if(!isPasswordValid){
throw new apiError(401,"invalid user credentials")
   }
   const isAccountTypeValid=await user.isAccountTypeCorrect(accountType);
   if(!isAccountTypeValid){
throw new apiError(401,"incorrect userType");
   }
    const {accessToken,refreshToken}=await generateAccessandRefreshToken(user._id)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
     const options={
        httpOnly:true,
        secure:true,
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(
            200,
            {
           user:loggedInUser,
           accessToken,refreshToken
            },
            "user logged in successfully"
        )
    )

})
export{signUpUser,generateAccessandRefreshToken,refreshAccessToken,getCurrentUser,loginUser}
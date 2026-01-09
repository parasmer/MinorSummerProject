import mongoose,{Schema} from "mongoose"
import  {authDB}  from "../db/index.js";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema(
    {

    fullName:{
        type:String,
        required:true,
        // trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required'],

    },
    
    accountType:{
        type:String,
       enum:["User","Engineer"],
       default:"User"
    },
    refreshToken:{
        type:String,
    }
   

},{timestamps:true})

//for encrypting the password
userSchema.pre("save",async function(){
    

     // if password wasnot changed
     if(!this.isModified("password")){
         return ;
     }
     // if password is changed hash this
     this.password=await bcrypt.hash(this.password,10);
   
})

// creating a method for userchema  for checking password correction
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.isAccountTypeCorrect= function(accountType){
  return accountType===this.accountType;
}
//creating a method to generate access and refresh token

//access token
userSchema.methods.generateAccessToken= function(){
return jwt.sign(
    {
        _id:this._id,
        fullName:this.fullName,
        email:this.email,
        password:this.password,
        

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }

)
}

// //refresh token
userSchema.methods.generateRefreshToken= function(){
return jwt.sign(
    {
        _id:this._id,
       

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }

)
}


// Inside src/models/user.model.js


 const User=authDB.model("User",userSchema,"users")
export default User;
import mongoose,{Schema} from "mongoose"
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
       enum:["User","Engineer"]
    }
   

},{timestamps:true})

//for encrypting the password
userSchema.pre("save",async function(next){
    // if password wasnot changed
    if(!this.isModified("password")){
        return next();
    }
    // if password is changed hash this
    this.password=await bcrypt.hash(this.password,10);
    next;
})

// creating a method for userchema  for checking password correction
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
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

//refresh token
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
const User=mongoose.model("User",userSchema)
export default User;

import mongoose,{Schema} from "mongoose";
import {accidentDB}  from "../db/index.js";
const accidentspotSchema=new Schema(
    {
name:{
type:String,
required:true,
},
lat:{
type:Number,
required:true,
},
lon:{
type:Number,
required:true,
},
reason:{
type:String,
required:true,
},
severity:{
type:String,
required:true,
},
count:{
type:Number,
required:true,
}
},{timestamps:true});
 const AccidentSpots=accidentDB.model("Accident",accidentspotSchema,"AccidentSpots")
 export default AccidentSpots;
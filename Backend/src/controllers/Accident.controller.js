import { apiError } from "../utils/apiError.js"
import apiResponse from "../utils/apiResponse.js";
import AccidentSpots from "../models/accidentspots.models.js"
import asyncHandler from "../utils/asyncHandler.js";
const accidentData=asyncHandler(async(req,res)=>{
const allSpots=await AccidentSpots.find({});
res.status(200).json(
    { success:true,
        count:allSpots.length,
        data:allSpots,
    });


});
export default accidentData;
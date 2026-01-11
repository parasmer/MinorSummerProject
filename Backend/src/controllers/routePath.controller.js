// import { apiError } from "../utils/apiError.js"
// import apiResponse from "../utils/apiResponse.js";
 import asyncHandler from "../utils/asyncHandler.js";

 const routePath=asyncHandler(async(req,res)=>{
    const {start,end}=req.query;
//    //osrm server call 
   

 const route = await fetch(`http://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson&radiuses=5000;5000`);
   
   const routedata=await route.json();
    res.status(200).json({
            success: true,
            routes: routedata.routes 
        });
 });
 export default routePath;

// import  asyncHandler  from "../utils/asyncHandler.js";

// // Keep using fetch (Node v18+) or axios if you prefer. This uses fetch.
// const routePath = asyncHandler(async(req, res) => {
//     const { start, end } = req.query;

//     console.log("1. Backend received request:", { start, end });

//     if (!start || !end) {
//         return res.status(400).json({ success: false, message: "Missing coordinates" });
//     }

//     // OSRM URL with 'radiuses' to help find roads near the points
//     // We add radiuses=5000 (5km) to help it find the nearest road even if you click far away
//     const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson&radiuses=5000;5000`;
    
//     console.log("2. Calling OSRM:", osrmUrl);

//     try {
//         const response = await fetch(osrmUrl);
//         const data = await response.json();

//         // Check if OSRM gave us an error code (like "NoRoute")
//         if (data.code !== 'Ok') {
//             console.error("3. OSRM Failed:", data);
//             // Return 200 with the error data so Frontend can handle it nicely
//             return res.status(200).json({ 
//                 success: false, 
//                 message: `OSRM Error: ${data.message || data.code}`,
//                 originalData: data
//             });
//         }

//         console.log("3. OSRM Success! Found route.");
        
//         // Send the successful data back
//         res.status(200).json({
//             success: true,
//             routes: data.routes 
//         });

//     } catch (error) {
//         console.error("❌ CRASH: Backend Logic Failed:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// export default routePath ;
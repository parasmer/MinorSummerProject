import {Router} from "express";
import accidentData from "../controllers/Accident.controller.js"
const router=Router();
router.route("/getaccidentData").get(accidentData); 
export default router;
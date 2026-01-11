import {Router} from "express";
import routePath from "../controllers/routePath.controller.js"
const router=Router();
router.route("/getroutePath").get(routePath); 
export default router;
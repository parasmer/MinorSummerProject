import {Router} from "express";
import { signUpUser,refreshAccessToken } from "../controllers/User.controller.jsx";
// import {verifyJWT} from "../middlewares/multer.middlewares.jsx"
const router=Router()
router.route("/signup").post(signUpUser)
// router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
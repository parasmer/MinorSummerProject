import {Router} from "express";
import { signUpUser,refreshAccessToken,getCurrentUser,loginUser } from "../controllers/User.controller.js";
import verifyJWT  from "../middlewares/auth.middleware.js";

// import {verifyJWT} from "../middlewares/multer.middlewares.js"
const router=Router()
router.route("/signup").post(signUpUser)

router.route("/login").post(loginUser);

// router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.use(verifyJWT)
router.route("/current-user").get(getCurrentUser);


export default router;
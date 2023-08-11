import express from "express";
import { userAuthentication } from "../middlewares/userAuth.js";
import handleUser from "../controllers/user.js";

const router = express.Router();

// middleware
router.use("/profile", userAuthentication);
router.use("/userAnalytics", userAuthentication);

//public routes
router.route("/login").post(handleUser.loginUser);
router.route("/register").post(handleUser.registerUser);
router.route("/logout").get(handleUser.logoutUser);

// protected routes
router.route("/profile").get(handleUser.profile);
router.route("/userAnalytics").get(handleUser.userAnalytics);

export default router;

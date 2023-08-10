import express from "express";
import { userAuthentication } from "../middlewares/userAuth.js";
import handleUrl from "../controllers/url.js";

const router = express.Router();

router.use("/analytics/:id", userAuthentication);

// public routes
router.route("/:id").get(handleUrl.redirectTo);

// protected routes
router.route("/registerUrl").post(handleUrl.registerUrl);
router.route("/analytics/:id").get(handleUrl.urlAnalytics);

export default router;

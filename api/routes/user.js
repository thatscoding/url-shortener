import express from "express";

const router = express.Router();

//public routes
router.route("/login");
router.route("/register");

// protected routes
router.route("/");

export default router;

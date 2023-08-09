import express from "express";

const router = express.Router();

// public routes
router.route("/:shortid");

// protected routes
router.route("/");
router.route("/url");
router.route("/analytics/:shortid");

export default router;

// imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/connectDB.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";

// config
dotenv.config();
const server = express();

// variable
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;

// middlewares
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// routes
server.use("/", urlRoute);
server.use("/user", userRoute);

// connect db
connectDB(DB_URL);

// listener
server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`server started at http://localhost:${PORT}`);
});

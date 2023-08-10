import { URL } from "../modals/url.js";
import { User } from "../modals/user.js";
import {
  generateHashPassword,
  verifyPassword,
} from "../utils/generateHashPassword.js";
import { generateToken, verifyToken } from "../utils/generateToken.js";

class handleUser {
  static registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
      const user = await User.findOne({ email });
      if (!user) {
        const hashPassword = await generateHashPassword(password);

        const doc = await User.create({
          username,
          email,
          password: hashPassword,
        });

        await doc.save();
        res.status(201).json({
          status: "success",
          message: "you are registered succesfully.",
        });
      } else {
        res.json({
          status: "failed",
          message: "You are already registerd. Kindly login",
        });
      }
    } else {
      res.json({ status: "failed", message: "All fields are required." });
    }
  };

  static loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const isMatched = await verifyPassword(password, user.password);
        if (isMatched) {
          const payload = {
            userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          };
          const token = generateToken(payload);
          res.status(200).cookie("token", token).json({
            status: "success",
            message: "successfully logined.",
            user: payload,
          });
        } else {
          res.json({
            status: "failed",
            message: "either password or email is not matched.",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "Your email is not registered.",
        });
      }
    } else {
      res.json({ status: "failed", message: "All fields are required." });
    }
  };

  static profile = async (req, res) => {
    res.status(200).json({ user: req.user });
  };

  static logoutUser = async (req, res) => {
    res
      .status(200)
      .cookie("token", "")
      .json({ message: "logout successfully" });
  };

  static userAnalytics = async (req, res) => {
    const { token } = req.cookies;
    const user = verifyToken(token);
    const allurl = await URL.find({ createdBy: user._id });
    console.log(allurl);
  };
}

export default handleUser;

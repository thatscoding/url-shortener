import { verifyToken } from "../utils/generateToken.js";

export const userAuthentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const payload = await verifyToken(token);
    req.user = payload;
    next();
  } else {
    res.status(400).json({ status: "failed", message: "no token found!" });
  }
};

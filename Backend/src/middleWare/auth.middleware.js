import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token;

    if (!token) {
      return res
        .status(400)
        .json({ status: "error", msg: "Un-Authorised access..!!" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res
        .status(400)
        .json({ status: "error", msg: "Invalid Token..!!" });
    }
    const user = await User.findOne({ _id: decode.userId }).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", msg: "User Not Found..!!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("caught error in auth.middleware", error);
    return res.json({ status: "error", msg: "Interal Server Error..!!" });
  }
};

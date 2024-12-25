import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  check,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleWare/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/updateProfile", protectRoute, updateProfile);

router.get("/check", protectRoute, check);
export default router;

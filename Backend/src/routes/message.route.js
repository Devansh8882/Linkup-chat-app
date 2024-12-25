import express from "express";
import {
  getUserForSidebar,
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleWare/auth.middleware.js";

const router = express.Router();

router.get("/user", protectRoute, getUserForSidebar);

router.get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessages);

export default router;

// const express = require("express"); // deafult syntex to import module.
// to use this syntex we have to add type : "module" in our package.json file.
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import { connectDB } from "./libs/db.js";

dotenv.config(); //configure env file

const app = express();
const port = process.env.PORT;

app.use(express.json({ extended: true })); // to parse body content in req.........used in POST request
app.use(cookieParser()); // to parse cookie information....used in middleware......

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log("backend is running on PORT:", port);
  connectDB();
});

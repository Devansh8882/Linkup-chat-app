// const express = require("express"); // deafult syntex to import module.
// to use this syntex we have to add type : "module" in our package.json file.
import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./libs/db.js";

dotenv.config(); //configure env file

const app = express();
const port = process.env.PORT;

app.use(express.json({ extended: true }));
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log("backend is running on PORT:", port);
  connectDB();
});

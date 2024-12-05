// const express = require("express"); // deafult syntex to import module.

// to use this syntex we have to add type : "module" in our package.json file.
import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("backend is running on port no.--> " + 8000);
});

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../libs/utils.js";
import cloudinary from "../libs/cloudinary.js";

export const signup = async (req, res) => {
  // res.send("In Signup Route");

  const { fullName, email, password } = req.body;
  try {
    if ((fullName, email, password)) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
      const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)?$/;
      const passPattern = /\s/;
      if (!emailPattern.test(email)) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid : Please fill a Valid E-mail.",
        });
      }
      if (!namePattern.test(fullName)) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid : Please fill a Valid Name.",
        });
      }
      if (password.length < 6 || password.length > 15) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid : Password must be Between 6-15 Letters..!!",
        });
      }
      if (passPattern.test(password)) {
        return res.status(400).json({
          status: "error",
          msg: "Invalid : Password must not Contain any White Space..!!",
        });
      }
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ status: "error", msg: "Email Already Exists..!!" }); // another way of writing if else condition only when there is single line of code.
      }
      const salt = await bcrypt.genSalt(10); // this function return promis which is why we have to wait for the response .
      const hashedPassword = await bcrypt.hash(password, salt);

      //store data in dataBase ... ... .. .. . .
      let newUser = new User({
        fullName, // we can directly set the data to mongo if key and variable name is same
        email: email,
        password: hashedPassword,
        profilePic: "",
      });

      if (newUser) {
        generateToken(newUser._id, res);
        newUser
          .save()
          .then(() => {
            res
              .status(201)
              .json({ status: "success", msg: "Data Added Successfully" });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ status: "error", msg: "Failed To Add Data", error }); // to be continued........................................................
          });
      }
    } else {
      res
        .status(400)
        .json({ status: "error", msg: "Please Fill All The Fields..!!" });
    }
  } catch (error) {
    console.log("error in auth.controller file Signin", error);
    res.status(500).json("Internal Server Error..!!");
  }
};

export const login = async (req, res) => {
  // res.send("In login Route");
  const { email, password } = req.body;
  let msg_text = {};
  let err = false;
  try {
    let userDetail = await User.findOne({ email });
    let isPasswordCorrect = await bcrypt.compare(password, userDetail.password);

    if (!userDetail || !isPasswordCorrect) {
      msg_text = { status: "error", msg: "Invalid credentials" };
      err = true;
    }
    console.log(userDetail);

    if (err === false) {
      generateToken(userDetail._id, res);
      // return res.status("200").json({
      //   id: userDetail._id,
      //   name: userDetail.fullName,
      //   email: userDetail.email,
      // });
      return res
        .status(200)
        .json({ status: "success", msg: "Welcome To LinkUp Chat.." });
    } else {
      return res.status(404).json(msg_text);
    }
  } catch (error) {
    console.log("error in auth.controller file Login", error);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal Server Error.." });
  }
};

export const logout = (req, res) => {
  // res.send("In Logout Route");
  try {
    res.cookie("cookie_token", "", { maxAge: 0 });
    res.status(200).json({
      status: "success",
      msg: "You’ve been logged out. See you soon!",
    });
  } catch (error) {
    console.log("error in auth.controller file Logout", error);
    res.status(500).json({ status: "error", msg: "Internal Server Error.." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(401).json({
        status: "error",
        msg: "Uploading a profile picture is mandatory.",
      });
    }
    const cloudinaryRes = await cloudinary.uploader.upload(profilePic);
    const uploadRes = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { profilePic: cloudinaryRes.secure_url } },
      { upsert: "true" }, // upsert either value exist or not it will get modified........
      { new: true } // returns document after modified .......by deafult it returns document without modification...
    );

    if (cloudinaryRes && uploadRes) {
      return res.status(200).json({
        status: "success",
        msg: "ProfilePic Uploaded Successfully..!!",
      });
    }
  } catch (error) {
    console.log("caught error in auth.controller updateProfile", error);
    res.status(400).json({ status: "error", msg: "Internal Server Error" });
  }
};

export const check = (req, res) => {
  try {
    const user = req.user;
    if (user) {
      return res.status(200).json({ status: "success", msg: user });
    }
  } catch (error) {
    console.log("caugth error in auth.controller check", error);
    return res
      .status("404")
      .json({ status: "error", msg: "Internal Server Error" });
  }
};
//to be continued....https://www.youtube.com/watch?v=ntKkVrQqBYY

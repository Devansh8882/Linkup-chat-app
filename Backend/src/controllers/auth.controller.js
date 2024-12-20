import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../libs/utils.js";

export const signup = async (req, res) => {
  // res.send("In Signup Route");

  const { fullName, email, password } = req.body;
  try {
    if ((fullName, email, password)) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
      const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)?$/;
      const passPattern = /\s/;
      if (!emailPattern.test(email)) {
        return res.status("400").json({
          status: "error",
          message: "Invalid : Please fill a Valid E-mail.",
        });
      }
      if (!namePattern.test(fullName)) {
        return res.status("400").json({
          status: "error",
          message: "Invalid : Please fill a Valid Name.",
        });
      }
      if (password.length < 6 || password.length > 15) {
        return res.status("400").json({
          status: "error",
          message: "Invalid : Password must be Between 6-15 Letters..!!",
        });
      }
      if (passPattern.test(password)) {
        return res.status("400").json({
          status: "error",
          message: "Invalid : Password must not Contain any White Space..!!",
        });
      }
      const user = await User.findOne({ email });

      if (user) {
        return res
          .status("400")
          .json({ status: "error", message: "Email Already Exists..!!" }); // another way of writing if else condition only when there is single line of code.
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
        let dataStored = false;
        generateToken(newUser._id, res);
        newUser
          .save()
          .then(() => {
            res
              .status("201")
              .json({ status: "success", message: "Data Added Successfully" });
          })
          .catch((error) => {
            res
              .status("500")
              .json({ status: "error", message: "Failed To Add Data", error }); // to be continued........................................................
          });
      }
    } else {
      res
        .status("400")
        .json({ status: "error", message: "Please Fill All The Fields..!!" });
    }
  } catch (error) {
    console.log("error in auth.controller file Signin", error);
    res.status("500").json("Internal Server Error..!!");
  }
};

export const login = (req, res) => {
  res.send("In login Route");
};

export const logout = (req, res) => {
  res.send("In Logout Route");
};

//to be continued....https://www.youtube.com/watch?v=ntKkVrQqBYY

import User from "../models/user.model.js";

export const signup = async (req, res) => {
  res.send("In Signup Route");

  const { fullName, email, password } = req.body;
  try {
    if ((fullName, email, password)) {
      if (password < 6) {
        res
          .status("400")
          .json({ message: "Password must be Greater Then 6 Letters." }); // continued ..
      }
      const user = await User.findOne({ email });

      if (user) res.status("400").json({ message: "Email Already Exists" });

      const salt = bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // newUser =
    } else {
      res.status("400").json({ message: "Please Fill All The Fields" });
    }
  } catch (error) {}
};

export const login = (req, res) => {
  res.send("In login Route");
};

export const logout = (req, res) => {
  res.send("In Logout Route");
};

//to be continued....https://www.youtube.com/watch?v=ntKkVrQqBYY

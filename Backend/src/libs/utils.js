import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in MS..
    httpOnly: true, // prevent XSS Attacks cross site scripting attack,,,,
    sameSite: "strict", // prevent CSRF attack cross-site request forgery attack....
    secure: process.env.NODE_ENV == "prod", // return false as we have set NODE_ENV to development but when changed to something eles it will return which means our token will get securee....
  });

  return token;
};

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: { type: "string", required: true },
    fullName: { type: "string", required: true },
    password: { type: "string", required: true, minlength: 6 },
    prpofilePic: { type: "string", default: "" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

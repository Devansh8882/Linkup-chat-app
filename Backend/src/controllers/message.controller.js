import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../libs/cloudinary.js";

export const getUserForSidebar = (req, res) => {
  try {
    const loggedInId = req.user._id;

    const allUsers = User.findOne({ _id: { $ne: loggedInId } }).select(
      "-password"
    );
    res
      .status(200)
      .json({ status: "success", msg: "All Users From User Collection" });
    return allUsers;
  } catch (error) {
    console.log("caught error in message.controller getUserForSidebar");
    return res.status(404).json({ error: "Internal Server Error..!!" });
  }
};

export const getMessages = (req, res) => {
  try {
    const loggedInId = req.user._id;
    const { id: recieverId } = req.params;

    const conversation = Message.find({
      $or: [
        { senderId: loggedInId, recieverId: recieverId },
        { senderId: recieverId, recieverId: loggedInId },
      ],
    });
    return res.status(200).json({
      status: "success",
      msg: "Conversation Fatched Successfully..!!",
    });
  } catch (error) {
    console.log("Caught Error in message.controller getMessage");
    return res.status(404).json({
      status: "error",
      msg: "Internal Server Error..!!",
    });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const loggedInId = req.user._id;

    let imageUrl;
    if (image) {
      //image uploaded in cloudinary....
      const uploadedres = cloudinary.uploader.upload(image);
      imageUrl = uploadedres.secure_url;
    }

    let newMessage = new Message({
      senderId: loggedInId,
      recieverId: recieverId,
      text: text,
      image: imageUrl,
    });
    await newMessage.save();

    //todo :- socket functionality pending..................................

    res.status(201).json({ status: "success", msg: "Message Sent.." });
  } catch (error) {
    console.log("Caught error in message.controller sendMessage");
    res.status(404).json({ status: "error", msg: "Internal Server Error..!!" });
  }
};

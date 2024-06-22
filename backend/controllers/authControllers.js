import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender } = req.body;

  const file = req.file;

  if (!name || !email || !password || !gender || !file) {
    return res.status(400).json({
      message: "Please give all values",
    });
  }

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already Exist",
    });

  const fileUrl = getDataUrl(file);

  const hashPassword = await bcrypt.hash(password, 10);

  const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

  user = await User.create({
    name,
    email,
    password: hashPassword,
    gender,
    profilePic: {
      id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  generateToken(user._id, res);

  res.status(201).json({
    message: "User Registered",
    user,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Invalid Credentials",
    });

  generateToken(user._id, res);

  res.json({
    message: "User Logged in",
    user,
  });
});

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged out successfully",
  });
});

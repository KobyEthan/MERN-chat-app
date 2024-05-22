const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please make sure all fields are populated");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exsists");
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Could not create user.");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyWord = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyWord).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };

const mongoose = require("mongoose");
import profile from "../../Assets/images/profile-circle.svg";

const userModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: {
      type: String,
      required: true,
      default: profile,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = { User };

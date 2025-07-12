const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "already exists email"],
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

user.pre("save", async function (next) {
  let userDetails = this;
  try {
    let salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(userDetails.password, salt);
    userDetails.password = password;
    next();
  } catch (e) {
    next(e);
  }
});

user.methods.matchPassword = async function (enteredPassword) {
  console.log(enteredPassword,this.password);
  
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", user);

module.exports = User;

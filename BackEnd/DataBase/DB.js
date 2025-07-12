const mongoose = require("mongoose");
const dotevn = require("dotenv");
dotevn.config();
const uri = process.env.MONGODB_URI;
const dbConnection = async () => {
  try {
    await mongoose.connect(uri);
    console.log("connected");
    // process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = dbConnection;

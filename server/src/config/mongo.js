const mongoose = require("mongoose");
// const Room = require("../models/Room");
// const User = require("../models/User");
require("dotenv").config();

exports.connectDB = async () => {
  const CONNECTON_URL = process.env.DB_URL;

  await mongoose.connect(CONNECTON_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // await User.remove({});
  // await Room.remove({});
  console.log("CONNECTED");
  mongoose.connection.on("connect", () => {
    console.log("Mongoose successfully connected");
  });

  mongoose.connection.on("reconnect", () => {
    console.log("Mongoose successfully reconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Mongoose has an error", error);
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnect", () => {
    console.log("Mongoose successfully disconnected");
  });
};

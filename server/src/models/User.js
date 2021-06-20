const mongoose = require("mongoose");
const Room = require("./Room");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdGroup: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Room",
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("remove", async (next) => {
  await Room.deleteOne({ creator: this._id }).exec();
  next();
});

module.exports = mongoose.model("User", userSchema);

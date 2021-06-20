const mongoose = require("mongoose");
const User = require("./User");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    member: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    collection: "rooms",
  }
);

// roomSchema.pre("remove", async (next) => {
//   await User.updateMany({ creator: this._id }).exec();
//   next();
// });

module.exports = mongoose.model("Room", roomSchema);

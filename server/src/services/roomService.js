const Room = require("../models/Room");
const User = require("../models/User");

module.exports = {
  createRoom: async (newRoom) => {
    const room = await Room.create(newRoom);
    await User.findByIdAndUpdate(room.creator, {
      $push: { createdGroup: room._id },
    });
    return room;
  },
  deleteRoom: async (roomId) => {
    return Room.findByIdAndRemove(roomId);
  },
};

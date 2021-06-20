const Message = require("../models/Message");
const Room = require("../models/Room");
const roomService = require("../services/roomService");
const catchAsync = require("../errorHandler/catchAsync");
const AppError = require("../errorHandler/AppError");
const mongoose = require("mongoose");

module.exports = {
  addMessage: catchAsync(async (req, res, next) => {
    const message = await Message.create(req.body);
    return res
      .status(201)
      .json({ message: "Message was sent successfully", data: message });
  }),
  getRecentConversations: catchAsync(async (req, res, next) => {
    const rooms = await Room.find({ $where: { "member._id": req.user._id } });
    return res.status(200).json({ message: "OK", data: rooms });
  }),
  getAllRooms: catchAsync(async (req, res, next) => {
    const { page } = req.query;
    const limit = 20;
    const rooms = await Room.find({})
      .sort([["updatedAt", -1]])
      .populate("creator", "username")
      .populate("member", "username")
      .limit(limit)
      .skip(parseInt(page) + limit);
    return res.status(200).json({ data: rooms });
  }),
  getConversationByRoomId: catchAsync(async (req, res, next) => {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId })
      .populate("sender")
      .sort([["createdAt", -1]])
      .limit();
    return res.status(200).json({ message: "OK", data: messages });
  }),
  joinRoom: catchAsync(async (req, res, next) => {
    const { roomId } = req.params;

    const isMember = await Room.findOne({
      _id: roomId,
      member: {
        $in: [mongoose.Types.ObjectId(req.user._id)],
      },
    });
    console.log("ISMEMBER", isMember);
    if (isMember) {
      throw new AppError("You have join this room", 400, "bad-request");
    }
    const room = await Room.findByIdAndUpdate(roomId, {
      $push: { member: req.user._id },
    });

    return res.status(200).json({ message: "Joined successfully", data: room });
  }),
  leaveRoom: catchAsync(async (req, res, next) => {
    const { roomId } = req.params;

    const isMember = await Room.findOne({
      _id: roomId,
      member: {
        $in: [mongoose.Types.ObjectId(req.user._id)],
      },
    });

    if (!isMember) {
      throw new AppError("You haven't join this room", 400, "bad-request");
    }

    const room = await Room.findByIdAndUpdate(roomId, {
      $pull: { member: req.user._id },
    });

    return res
      .status(200)
      .json({ message: "Left group successfully", data: room });
  }),
  createRoom: catchAsync(async (req, res, next) => {
    const newRoom = {
      ...req.body,
      creator: req.user._id,
      member: req.user._id,
    };
    console.log(newRoom);
    const room = await roomService.createRoom(newRoom);
    return res
      .status(201)
      .json({ message: "Room created successfully", data: room });
  }),
  markAsRead: catchAsync(async (req, res, next) => {}),
  deleteRoomById: catchAsync(async (req, res, next) => {
    const { roomId } = req.params;
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      throw new AppError("Room not found", 400, "not-found");
    }
    return res.status(200).json({ message: "Room deleted", data: room });
  }),
};

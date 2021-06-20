const { Router } = require("express");
const roomController = require("../controllers/roomController");
const { decode } = require("../middlewares/jwt");

const router = Router();

router.post("/:roomId/messages", decode, roomController.addMessage);

router.get("/", decode, roomController.getAllRooms);

// router.get("/", roomController.getRecentConversations);

router.post("/:roomId/join", decode, roomController.joinRoom);

router.put("/:roomId/leave", decode, roomController.leaveRoom);

router.get("/:roomId/message", decode, roomController.getConversationByRoomId);

router.post("/initiate", decode, roomController.createRoom);

router.delete("/:roomId", decode, roomController.deleteRoomById);

module.exports = router;

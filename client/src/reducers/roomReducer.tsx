import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageType } from "../types/messageType";
import { RoomType } from "../types/roomType";
import { UserType } from "../types/userType";

interface RoomState {
  rooms: Array<RoomType>;
  messages: Array<MessageType>;
  room: RoomType;
}

const initialState: RoomState = {
  rooms: [],
  messages: [],
  room: {
    name: "",
    creator: {
      username: "",
    },
    member: [],
  },
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageType>) => {
      state.messages.push(action.payload);
    },
    getAllRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.rooms = action.payload;
    },
    joinRoom: (state, action: PayloadAction<UserType>) => {
      state.room.member.push(action.payload);
    },
    leftRoom: (state, action: PayloadAction<string>) => {
      state.room.member.filter(
        (member: UserType) => member._id === action.payload
      );
    },
    createRoom: (state, action: PayloadAction<RoomType>) => {
      state.rooms.push(action.payload);
    },
  },
});

export const { addMessage, createRoom, getAllRooms, joinRoom, leftRoom } =
  roomSlice.actions;

export default roomSlice.reducer;

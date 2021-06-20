import { RoomType } from "./roomType";

export type UserType = {
  _id: string;
  username: string;
  createdGroup: Array<RoomType>;
};

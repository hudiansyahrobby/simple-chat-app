import { UserType } from "./userType";

export type MessageType = {
  message: string;
  roomId: string;
  sender: UserType;
};

import { UserType } from "./userType";

export type RoomType = {
  name: string;
  creator: Pick<UserType, "username">;
  member: Array<UserType>;
};

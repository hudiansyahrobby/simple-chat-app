import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import roomReducer from "../reducers/roomReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

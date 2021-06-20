import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    loggedinUser: {
      firstName: "",
      lastName: "",
    },
    allUsers: [],
    userById: {},
  },
  reducers: {
    loginUser: (state, action) => {
      state.loggedinUser.firstName = action.payload.firstName;
      state.loggedinUser.lastName = action.payload.lastName;
    },
    getAllUsers: (state, action) => {
      state.allUsers = action.payload.users;
    },
    getUserById: (state, action) => {
      state.userById = action.payload.user;
    },
    logoutUser: (state) => {
      (state.loggedinUser.firstName = ""), (state.loggedinUser.lastName = "");
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "utils/token";
import { EmptyUser, IUserState } from "../../model/user";
import { userApi } from "./userService";

const initialState: IUserState = {
  data: {
    ...EmptyUser,
  },
  allUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = EmptyUser;
    },
  },
  extraReducers: (builder) => {
    // Save user after login
    builder.addMatcher(
      userApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        setToken(payload?.token);
        state.data = { ...payload };
      }
    );

    // save current loggedin user
    builder.addMatcher(
      userApi.endpoints.currentUser.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );

    // Save all users
    builder.addMatcher(
      userApi.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }) => {
        state.allUsers = payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { EmptyUser, IUserState } from "../../model/user";

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
    setUser: (state, action) => {
      state.data = { ...action.payload };
    },
    setUsers: (state, action) => {
      console.log(action);
      state.allUsers = action.payload;
    },
    logoutUser: (state) => {
      state.data = EmptyUser;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser, setUsers } = userSlice.actions;

export default userSlice.reducer;

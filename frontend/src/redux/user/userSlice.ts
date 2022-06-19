import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  allUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.data = { ...action.payload };
    },
    logoutUser: (state) => {
      state.data = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

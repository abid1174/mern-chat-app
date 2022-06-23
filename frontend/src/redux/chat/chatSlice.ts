import { createSlice } from "@reduxjs/toolkit";
import { chatApi } from "./chatService";

const initialState = {
  data: {},
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatData: (state, action) => {
      if (action.payload) state.data = action.payload.data;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChatData, setMessages } = chatSlice.actions;
export default chatSlice.reducer;

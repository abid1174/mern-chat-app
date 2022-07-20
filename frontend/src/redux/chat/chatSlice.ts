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
    setMessage: (state, action) => {
      //@ts-ignore
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers(builder) {
    // set chat data
    builder.addMatcher(
      chatApi.endpoints.accessChat.matchFulfilled,
      (state, { payload }) => {
        state.data = payload.data;
      }
    );

    // set Messages
    builder.addMatcher(
      chatApi.endpoints.getMessages.matchFulfilled,
      (state, { payload }) => {
        state.messages = payload.data;
      }
    );
  },
});

export const { setMessage } = chatSlice.actions;
export default chatSlice.reducer;

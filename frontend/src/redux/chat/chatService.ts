import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { METHODS } from "http";
import { url } from "inspector";
import { getToken } from "utils/token";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    accessChat: builder.mutation({
      query: (id) => ({
        url: "/chat",
        method: "POST",
        body: { userId: id },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getMessages: builder.query({
      query: (chatId) => ({
        url: `/message/${chatId}`,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const { useAccessChatMutation, useGetMessagesQuery } = chatApi;

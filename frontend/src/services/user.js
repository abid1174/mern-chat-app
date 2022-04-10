import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/user/",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "",
        method: "POST",
        body: newUser,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;

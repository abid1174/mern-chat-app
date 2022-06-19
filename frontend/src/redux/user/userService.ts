import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../model/user";
import { getToken } from "../../utils/token";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/user",
        method: "POST",
        body: newUser,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    currentUser: builder.query<IUser, void>({
      query: () => ({
        url: "/user",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCurrentUserQuery,
} = userApi;

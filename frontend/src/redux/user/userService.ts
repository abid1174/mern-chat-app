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
    // Login User
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

    // Register User
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

    // Get Current User
    currentUser: builder.query<IUser, void>({
      query: () => ({
        url: "/user",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),

    // Get All Users
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/user/all",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),

    // Update profile image
    updateProfileImage: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/user/edit/profile/image",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useCurrentUserQuery,
  useGetAllUsersQuery,
  useUpdateProfileImageMutation,
} = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    // baseUrl: "https://jobpiolet-backend-1.onrender.com/api/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    verify: builder.mutation({
      query: (userData) => ({
        url: "/verify",
        method: "POST",
        body: userData,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: "/forgotPassword",
        method: "POST",
        body: userData,
      }),
    }),
    newPassword: builder.mutation({
      query: (userData) => ({
        url: "/resetPassword",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useResetPasswordMutation,
  useNewPasswordMutation,
} = authApi;

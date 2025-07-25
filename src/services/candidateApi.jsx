import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const candidateApi = createApi({
  reducerPath: "candidateApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/candidate", // Update this!
    baseUrl: "https://jobpiolet-backend-1.onrender.com/api/candidate",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // getProfile: builder.query({
    //   query: (userId) => `/get-profile?userId=${userId}`,
    // }),

    createCandidateProfile: builder.mutation({
      query: (body) => ({
        url: "/create-profile",
        method: "POST",
        body,
      }),
    }),
    getCandidateProfile: builder.query({
      query: () => `/getCandidateProfile`,
    }),
  }),
});

export const {
  useCreateCandidateProfileMutation,
  useGetCandidateProfileQuery,
} = candidateApi;

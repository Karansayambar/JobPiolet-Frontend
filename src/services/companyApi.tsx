import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/company", // Update this!
    baseUrl: "https://jobpiolet-backend-1.onrender.com/api/company",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (userId) => `/get-profile?userId=${userId}`,
    }),

    createCompanyProfile: builder.mutation({
      query: (body) => ({
        url: "/create-profile",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCompanyProfileMutation, useGetProfileQuery } =
  companyApi;

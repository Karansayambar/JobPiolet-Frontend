import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/jobs",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createJobPost: builder.mutation({
      query: (body) => ({
        url: "/create-job",
        method: "POST",
        body,
      }),
    }),
    getMyJobs: builder.query({
      query: () => ({
        url: "/get-my-jobs",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateJobPostMutation, useGetMyJobsQuery } = jobsApi;

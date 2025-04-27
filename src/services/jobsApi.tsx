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
    getAllJobs: builder.query({
      query: () => ({
        url: "/getAllJobs",
        method: "GET",
      }),
    }),
    applyToJob: builder.mutation({
      query: (jobId) => ({
        url: `/apply-to-job/${jobId}`,
        method: "POST",
      }),
    }),
    getAppliedJobs: builder.query({
      query: () => ({
        url: "/getAppliedJobs",
        method: "GET",
      }),
    }),
    getJobDetail: builder.query({
      query: (jobId) => ({
        url: `/getJobDetails/${jobId}`,
        method: "GET",
      }),
    }),
    getAppliedStatus: builder.query({
      query: (jobId) => ({
        url: `/getAppliedStatus/${jobId}`,
        method: "GET",
      }),
    }),
    addToFavorite: builder.mutation({
      query: (jobId) => ({
        url: `/addToFavorite/${jobId}`,
        method: "POST",
      }),
    }),

    getAllfavorites: builder.query({
      query: () => ({
        url: "/favorites",
        method: "GET",
      }),
    }),
    getFavioriteJob: builder.query({
      query: (jobId) => ({
        url: `/is-favorited/${jobId}`,
        method: "GET",
      }),
    }),

    viewApplicants: builder.query({
      query: (jobId) => ({
        url: `/viewApplicants/${jobId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateJobPostMutation,
  useGetMyJobsQuery,
  useGetAllJobsQuery,
  useApplyToJobMutation,
  useGetAppliedJobsQuery,
  useGetJobDetailQuery,
  useGetAppliedStatusQuery,
  useAddToFavoriteMutation,
  useGetAllfavoritesQuery,
  useGetFavioriteJobQuery,
  useViewApplicantsQuery,
} = jobsApi;

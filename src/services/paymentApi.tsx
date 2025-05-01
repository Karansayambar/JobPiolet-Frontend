import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/payment",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", "Bearer " + token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaymentDetails: builder.query<Response, void>({
      query: () => ({
        url: "/get-payment-details",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPaymentDetailsQuery } = paymentApi;

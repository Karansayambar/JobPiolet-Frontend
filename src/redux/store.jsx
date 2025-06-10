import { configureStore } from "@reduxjs/toolkit";
import authRecuder from "../redux/slices/authSlice";
import jobReducer from "../redux/slices/jobSlice";
import { authApi } from "../services/authApi";
import companyReducer from "../redux/slices/createCompanyProfileSlice";
import { companyApi } from "../services/companyApi";
import { jobsApi } from "../services/jobsApi";
import { paymentApi } from "../services/paymentApi";
import candidateReducer from "../redux/slices/userProfileSlice";
import { candidateApi } from "../services/candidateApi";

export const store = configureStore({
  reducer: {
    auth: authRecuder,
    jobs: jobReducer,
    company: companyReducer,
    candidate: candidateReducer,
    [authApi.reducerPath]: authApi.reducer, // RTK Query reducer
    [companyApi.reducerPath]: companyApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [candidateApi.reducerPath]: candidateApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      companyApi.middleware,
      jobsApi.middleware,
      paymentApi.middleware,
      candidateApi.middleware
    ), // RTK Query middleware
});
//

import { configureStore } from "@reduxjs/toolkit";
import authRecuder from "../redux/slices/authSlice";
import jobReducer from "../redux/slices/jobSlice";
import { authApi } from "../services/authApi";
import companyReducer from "../redux/slices/createCompanyProfileSlice";
import { companyApi } from "../services/companyApi";
import { jobsApi } from "../services/jobsApi";
import { paymentApi } from "../services/paymentApi";

export const store = configureStore({
  reducer: {
    auth: authRecuder,
    jobs: jobReducer,
    company: companyReducer,
    [authApi.reducerPath]: authApi.reducer, // RTK Query reducer
    [companyApi.reducerPath]: companyApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      companyApi.middleware,
      jobsApi.middleware,
      paymentApi.middleware
    ), // RTK Query middleware
});

import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { CircularProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Layouts
import CandidateLayout from "../layouts/CandidateDashboard";
import CompanyLayout from "../layouts/CompanyDashboard";
import AuthLayout from "../layouts/auth";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyPage from "../pages/auth/VerifyPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import ConfirmPasswordPage from "../pages/auth/ConfirmPasswordPage";

// Candidate Pages
import HomePage from "../pages/CandidatePages/HomePage";
import JobDetails from "../pages/CandidatePages/JobDetails";
import CandidateDashboard from "../pages/CandidatePages/Dashboard";

// Company Pages
import CreateProfile from "../pages/CompanyPages/CreateProfile";
import CompanyDashboard from "../pages/CompanyPages/Dashboard";
import Congradulations from "../sections/Employee/Profile/Congradulations";

// Store
import { store } from "../redux/store";
import ProtectedRoute from "./ProtectedRoute";
import FindJob from "../pages/CandidatePages/FindJob";
import TestPage from "../pages/CandidatePages/TestPage";
import ViewApplicants from "../sections/Employee/dashboard/ViewApplicants";
import NotFound from "../pages/404NotFound";

// Redirect based on authentication
// const AuthRedirect = () => {
//   const { user } = useSelector((state) => state.auth);
//   return <Navigate to={user ? getDashboardPath(user.role) : "/login"} />;
// };

// const getDashboardPath = (role) => {
//   switch (role) {
//     case "candidate":
//       return "/candidate/dashboard";
//     case "company":
//       return "/company/dashboard";
//     default:
//       return "/login";
//   }
// };

const AppRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const profileCreated = localStorage.getItem("profileCreated");

  // Check if the user is authenticated
  const isAuthenticated = !!token;
  // Check if the user is a candidate
  const isCandidate = role === "candidate";
  // Check if the user is a company
  const isCompany = role === "company";
  // Check if the user has created a profile
  const isProfileCreated = profileCreated === "true";

  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <Suspense fallback={<CircularProgress />}>
            <Routes>
              {/*  Auth Routes */}
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="verify" element={<VerifyPage />} />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route path="new-password" element={<ConfirmPasswordPage />} />
              </Route>

              {/*  Candidate Routes */}
              <Route path="/candidate" element={<CandidateLayout />}>
                <Route index element={<HomePage />} />
                <Route
                  path="findjob"
                  element={
                    <ProtectedRoute
                      isAllowed={isAuthenticated && isCandidate}
                      redirectPath="/candidate"
                    >
                      <FindJob />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="findjob/:jobId"
                  element={
                    <ProtectedRoute
                      isAllowed={isAuthenticated && isCandidate}
                      redirectPath="/candidate"
                    >
                      <JobDetails />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute
                      isAllowed={isAuthenticated && isCandidate}
                      redirectPath="/candidate"
                    >
                      <CandidateDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route
                path="/candidate/test/:jobId"
                element={
                  <ProtectedRoute
                    isAllowed={isAuthenticated && isCandidate}
                    redirectPath="/candidate"
                  >
                    <TestPage />
                  </ProtectedRoute>
                }
              />

              {/*  Company Routes */}
              <Route path="/company" element={<CompanyLayout />}>
                <Route
                  path="create-profile"
                  element={
                    <ProtectedRoute
                      isAllowed={
                        isAuthenticated && isCompany && !isProfileCreated
                      }
                      redirectPath="/company/create-profile"
                    >
                      <CreateProfile />
                    </ProtectedRoute>
                  }
                />
                <Route path="congradulations" element={<Congradulations />} />
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute
                      isAllowed={
                        isAuthenticated && isCompany && isProfileCreated
                      }
                      redirectPath="/company/dashboard"
                    >
                      <CompanyDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="viewApplicants/:id"
                  element={
                    <ProtectedRoute
                      isAllowed={
                        isAuthenticated && isCompany && isProfileCreated
                      }
                      redirectPath="/company/viewApplicants"
                    >
                      <ViewApplicants />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="dashboard/:priceId" /> */}
              </Route>
              {/*  Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Provider>
      </LocalizationProvider>
    </Router>
  );
};

export default AppRoute;

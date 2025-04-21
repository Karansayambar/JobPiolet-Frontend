import { Box } from "@mui/material";
import React from "react";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import { Navigate, Outlet } from "react-router-dom";
import SearchBar from "../../components/Common/SearchBar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn) {
    return <Navigate to={"/"} />; // Redirect to login if not authenticated
  }

  return (
    <Box>
      <Header />
      {/* <SearchBar /> */}
      <Outlet />
      <Footer />
    </Box>
  );
};

export default Dashboard;

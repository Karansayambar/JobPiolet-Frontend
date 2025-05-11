import { Box } from "@mui/material";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import { Navigate, Outlet } from "react-router-dom";

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

import { Box } from "@mui/material";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ChatBot from "../../components/Common/ChatBot";

const Dashboard = () => {
  const isLoggedIn = localStorage.getItem("token");
  if (!isLoggedIn) {
    return <Navigate to={"/"} />; // Redirect to login if not authenticated
  }
  const location = useLocation().pathname;

  return (
    <Box>
      <Header />
      {/* <SearchBar /> */}
      <Outlet />
      {location === "/candidate" ? <Footer /> : null}
      <ChatBot />
    </Box>
  );
};

export default Dashboard;

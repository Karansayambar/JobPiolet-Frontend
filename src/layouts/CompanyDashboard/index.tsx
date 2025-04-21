import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Common/Header";

const Dashboard = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;

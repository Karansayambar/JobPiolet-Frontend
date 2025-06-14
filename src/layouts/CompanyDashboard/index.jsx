import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Outlet />
    </Box>
  );
};

export default Dashboard;

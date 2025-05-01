import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFound from "../assets/404.png";
import { useSelector } from "react-redux";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    console.log("Current path:", window.location.pathname);
    console.log("Role from localStorage:", role);
    console.log("Token exists:", !!token);

    if (token) {
      try {
        // Manually decode token to verify contents
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Token payload:", payload);

        if (role === "candidate") {
          console.log("Redirecting to candidate dashboard");
          navigate("/candidate/dashboard");
        } else if (role === "company") {
          console.log("Redirecting to company dashboard");
          navigate("/company/dashboard");
        } else {
          console.warn("Unknown role, redirecting to login");
          navigate("/");
        }
      } catch (error) {
        console.error("Token decode error:", error);
        navigate("/");
      }
    } else {
      console.log("No token, redirecting to login");
      navigate("/");
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      textAlign="center"
      p={4}
    >
      <img
        src={notFound}
        alt="404 Not Found"
        style={{ maxWidth: "500px", width: "100%" }}
      />
      <Typography variant="h4" mt={4} mb={2}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" mb={4}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" size="large" onClick={() => handleGoHome()}>
        Go to Homepage
      </Button>
    </Box>
  );
};

export default NotFound;

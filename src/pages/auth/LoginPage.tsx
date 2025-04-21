import { Box, Button, Link, Stack, Typography } from "@mui/material";
import loginImage from "../../assets/auth/authHero.png";
import AuthLoginForm from "../../sections/auth/loginForm";
import { FacebookOutlined, Google } from "@mui/icons-material";
import SideImage from "../../components/Common/SideImage";
import { Link as RouterLink } from "react-router-dom"; // ✅ Import Router Link

const LoginPage = () => {
  return (
    <Box height="100vh" padding={0}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        width={"100vw"}
      >
        {/* Left Section - Login Form */}
        <Box width={{ xs: "100%", md: "50%", lg: "30%" }} p={4} px={20}>
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>

          <Typography py={2}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" variant="subtitle1">
              Create Account
            </Link>
          </Typography>

          <Stack justifyContent={"center"}>
            <AuthLoginForm />
          </Stack>

          {/* Divider */}
          <Stack p={2} alignItems={"center"}>
            <Typography>or</Typography>
          </Stack>

          {/* Social Login Buttons */}
          <Stack direction="row" justifyContent="space-around" spacing={2}>
            <Button variant="outlined" sx={{ gap: "10px" }}>
              <FacebookOutlined /> Sign up with Facebook
            </Button>
            <Button variant="outlined" sx={{ gap: "10px" }}>
              <Google />
              Sign up with Google
            </Button>
          </Stack>
        </Box>

        {/* Right Section - Side Image */}
        <Box width={{ xs: "100%", md: "50%" }} height="100%">
          <SideImage />
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;

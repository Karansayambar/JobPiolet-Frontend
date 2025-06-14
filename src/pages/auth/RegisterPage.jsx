import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { FacebookOutlined, Google } from "@mui/icons-material";
import AuthRegisterPage from "../../sections/auth/RegisterForm";
import SideImage from "../../components/Common/SideImage";
import { Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  return (
    <Box height="100vh" padding={0}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        height="100%"
        width={"100vw"}
      >
        <Box
          width={{ xs: "100%", md: "50%", lg: "30%" }}
          sx={{ px: { xs: 4, md: 10, lg: 20 } }}
        >
          <Typography variant="h4" gutterBottom>
            Create account
          </Typography>

          <Typography py={2}>
            Alredy have an accounr ?{" "}
            <Link component={RouterLink} to="/" variant="subtitle1">
              Log In
            </Link>
          </Typography>
          <AuthRegisterPage />
          {/* Add form fields here */}
          <Stack p={2} alignItems={"center"}>
            <Typography>or</Typography>
          </Stack>

          <Stack direction={"row"} justifyContent={"space-around"} spacing={2}>
            <Button variant="outlined" sx={{ gap: "10px" }}>
              <FacebookOutlined /> Sign up with facebook
            </Button>
            <Button variant="outlined" sx={{ gap: "10px" }}>
              <Google />
              Sign up with Google
            </Button>
          </Stack>
        </Box>
        <Box height="100%" display={{ xs: "none", md: "block" }}>
          <SideImage />
        </Box>
      </Stack>
    </Box>
  );
};

export default RegisterPage;

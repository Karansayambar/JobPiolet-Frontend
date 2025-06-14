import { Box, Button, Link, Stack, Typography } from "@mui/material";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";
import SideImage from "../../components/Common/SideImage";
import { FacebookOutlined, Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <Box width="100vw" height="100vh" padding={0}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        width={"100vw"}
      >
        <Box p={4} px={{ md: 20 }}>
          <Typography variant="h4" gutterBottom>
            Forgot Password
          </Typography>

          <Stack py={2}>
            <Typography>
              Alredy have an accounr ?{" "}
              <Link component={RouterLink} to="/" variant="subtitle1">
                Log In
              </Link>
            </Typography>
            <Typography py={2}>
              Don't have an account ?{" "}
              <Link component={RouterLink} to="/register" variant="subtitle1">
                Create Account
              </Link>
            </Typography>
          </Stack>
          <ResetPasswordForm />
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
        <Box width="50%" height="100%" display={{ xs: "none", md: "block" }}>
          <SideImage />
        </Box>
      </Stack>
    </Box>
  );
};

export default ResetPasswordPage;

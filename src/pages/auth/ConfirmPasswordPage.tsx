import { Stack, Typography } from "@mui/material";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

const ConfirmPasswordPage = () => {
  const VerifyCodeSchema = Yup.object().shape({});
  return (
    <Stack alignItems={"center"} mt={30} >
      <Stack textAlign={"center"} spacing={2} mb={3}>
        <Typography variant="h6" fontSize={30}>
          Reset Password
        </Typography>
        <Typography>
          Create a new password to regain access to your account.
          <br /> You’re just a step away.
        </Typography>
      </Stack>
      <Typography></Typography>
      <NewPasswordForm />
    </Stack>
  );
};

export default ConfirmPasswordPage;

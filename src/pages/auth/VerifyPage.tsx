import { Stack, Typography } from "@mui/material";
import VerifyForm from "../../sections/auth/verifyForm";

const VerifyPage = () => {
  return (
    <>
      <Stack
        spacing={2}
        sx={{ mb: 5, position: "relative" }}
        alignItems={"center"}
        justifyContent={"center"}
        mt={40}
      >
        <Typography variant="h4">Email Verification</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            we,ve Sent an verification to karansayambar@gmail.com to verify your
            email address and ative your account
          </Typography>
        </Stack>
        <VerifyForm />
        <Typography>Didn't recive my code! Resend</Typography>
      </Stack>
    </>
  );
};

export default VerifyPage;

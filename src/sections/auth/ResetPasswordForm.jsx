import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { useResetPasswordMutation } from "../../services/authApi";
import { useSnackbar } from "notistack"; // Optional for notifications

const ResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { enqueueSnackbar } = useSnackbar(); // Optional

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(data).unwrap();
      if (response.status?.success) {
        console.log("Reset Password Response:", response);
      }
      enqueueSnackbar("Reset link sent to your email!", { variant: "success" }); // Optional
    } catch (error) {
      console.error("Reset Password Error:", error);
      enqueueSnackbar(error?.data?.message || "Failed to send reset link.", {
        variant: "error",
      }); // Optional
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField name="email" label="Email address" />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          mt: 3,
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Send Request
      </LoadingButton>
    </FormProvider>
  );
};

export default ResetPasswordForm;

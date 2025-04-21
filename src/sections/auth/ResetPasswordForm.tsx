import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { useResetPasswordMutation } from "../../services/authApi";

interface ResetFormValue {
  email: string;
}

const ResetPasswordForm = () => {
  const [resetPassword, { email }] = useResetPasswordMutation();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const methods = useForm<ResetFormValue>({
    resolver: yupResolver(ResetPasswordSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ResetFormValue> = async (data) => {
    try {
      const response = await resetPassword(data).unwrap();
      console.log(response);
    } catch (error) {
      console.error("Reset Password Error:", error);
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

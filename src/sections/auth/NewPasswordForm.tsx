import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { Eye, EyeSlash } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowForward } from "@mui/icons-material";
import { useNewPasswordMutation } from "../../services/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack"; // optional for toast messages

interface NewPasswordFormValues {
  password: string;
  passwordConfirm: string;
}

const NewPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [queryParameters] = useSearchParams();
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // optional

  const newPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const defaultValues: NewPasswordFormValues = {
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm<NewPasswordFormValues>({
    mode: "onChange",
    resolver: yupResolver(newPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<NewPasswordFormValues> = async (data) => {
    try {
      const response = await newPassword({
        password: data.password,
        token: queryParameters.get("token"),
      }).unwrap();

      console.log("Password reset successful", response);
      enqueueSnackbar("Password reset successfully!", { variant: "success" });
      navigate("/auth");
    } catch (error: any) {
      console.error("Password reset error:", error);
      enqueueSnackbar(error?.data?.message || "Failed to reset password", {
        variant: "error",
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} width={500}>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="passwordConfirm"
          label="Confirm New Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            bgcolor: "#A65CC",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "#042852",
            "&:hover": {
              bgcolor: "#A65CC",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "#042852",
            },
          }}
        >
          Reset Password <ArrowForward />
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;

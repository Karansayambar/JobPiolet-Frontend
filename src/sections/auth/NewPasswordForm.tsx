import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { Eye, EyeSlash, Password } from "phosphor-react";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { useForm } from "react-hook-form";
import { ArrowForward } from "@mui/icons-material";
import { useNewPasswordMutation } from "../../services/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";

const NewPasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [queryParameters] = useSearchParams();
  const [newPassword, { isLoading }] = useNewPasswordMutation();
  const navigate = useNavigate();

  const newPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(newPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      //   Send API Request
      const response = await newPassword({
        ...data,
        token: queryParameters.get("token"),
      });
      console.log(response);
      navigate("/auth");
    } catch (error) {
      console.error(error);
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

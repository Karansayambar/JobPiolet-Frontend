import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // ✅ Import Router Link
import { useLoginMutation } from "../../services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logIn, updateRegisterEmail } from "../../redux/slices/authSlice";

// Define form values shape
type LoginFormValues = {
  email: string;
  password: string;
};

const AuthLoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, {}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //yup resorver
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be valid email address"),
    password: Yup.string().required("Password is required"),
  });

  //method
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  handleSubmit;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log("Login data:", data);
    try {
      const response = await login(data).unwrap();
      console.log("Response:", response);

      dispatch(updateRegisterEmail({ email: data.email }));

      dispatch(
        logIn({
          isLoggedIn: true,
          token: response.token,
          user_id: response.user_id,
          role: response.role,
          // profileCreated : response.profileCreated,
        })
      );
      console.log("Login successful:", response);
      localStorage.setItem("role", JSON.stringify(response.role));
      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", response.user_id);
      localStorage.setItem("profileCreated", response.profileCreated);

      if (response.role === "company") {
        if (!response.profileCreated) {
          navigate("/company/create-profile");
        } else {
          navigate("/company/dashboard");
        }
      } else if (response.role === "candidate") {
        navigate("/candidate");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" justifyContent="space-between">
          <Typography>Remember Me</Typography>
          <Link component={RouterLink} to="/reset-password" variant="subtitle1">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AuthLoginForm;

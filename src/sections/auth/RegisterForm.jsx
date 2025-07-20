import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import * as Yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import { Buildings, Eye, EyeSlash, User } from "phosphor-react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../services/authApi";
import { updateRegisterEmail } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const AuthRegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectRole, setSelectRole] = useState("candidate");
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: Yup.string()
      .oneOf(["candidate", "company"])
      .required("Role is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "candidate",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await register(data).unwrap();
      console.log("Registration successful:", response);

      dispatch(updateRegisterEmail({ email: data.email }));
      navigate("/verify");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleRoleChange = (_, newRole) => {
    if (newRole) {
      setSelectRole(newRole);
      setValue("role", newRole);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        bgcolor={theme.palette.background.paper}
        sx={{ borderRadius: "5px" }}
        p={2}
        my={3}
      >
        <Stack alignItems="center" my={2}>
          <Typography textAlign="center" mb={1}>
            Create Account as a
          </Typography>

          <ToggleButtonGroup
            value={selectRole}
            exclusive
            onChange={handleRoleChange}
            color="primary"
            sx={{
              borderRadius: "5px",
              p: 1,
            }}
          >
            <ToggleButton
              value="candidate"
              sx={{
                px: 4,
                "&.Mui-selected": {
                  bgcolor: "#042852",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#042852",
                  },
                },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <User />
                <Typography>Candidate</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              value="company"
              sx={{
                px: 4,
                "&.Mui-selected": {
                  bgcolor: "#042852",
                  color: "white",
                  "&:hover": {
                    bgcolor: "#042852",
                  },
                },
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Buildings />
                <Typography>Company</Typography>
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>

          {errors.role && (
            <Typography color="error" fontSize={12} mt={1}>
              {errors.role.message}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

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

        <Typography
          component="div"
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
            textAlign: "center",
          }}
        >
          {"By signing up, I agree to "}
          <Link underline="always" color="text.primary">
            Terms of Service
          </Link>
          {" and "}
          <Link underline="always" color="text.primary">
            Privacy Policy
          </Link>
          .
        </Typography>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AuthRegisterPage;

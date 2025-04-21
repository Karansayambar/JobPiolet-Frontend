import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../hooks/hooks-form/RHFTextField";
import { LoadingButton } from "@mui/lab";
import {
  Buildings,
  Eye,
  EyeSlash,
  Password,
  Person,
  User,
} from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../services/authApi";
import { updateRegisterEmail } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

// Define form values shape
type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
};

const AuthRegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectRole, setSelectRole] = useState<"candidate" | "company" | "">(
    ""
  );
  const [register, { data, isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email address"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    role: Yup.string().oneOf(["candidate", "company"]).required(),
  });

  const defaultValues: RegisterFormValues = {
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
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    console.log("Registering with email:", data.email);
    console.log("Submitted Data:", data);

    try {
      const response = await register(data).unwrap();
      console.log("Registration successful:", response);

      // Update Redux state with the registered email
      dispatch(updateRegisterEmail({ email: data.email }));

      // Navigate to verify page
      navigate("/verify");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ bgcolor: "#F1F2F4", borderRadius: "5px" }} p={2} my={3}>
        <Stack alignItems="center" my={2}>
          <Typography textAlign={"center"} mb={1}>
            Create Account as a
          </Typography>

          <ToggleButtonGroup
            value={selectRole}
            exclusive
            onChange={(_, newRole) => {
              if (newRole) {
                setSelectRole(newRole);
                setValue("role", newRole);
              }
            }}
            color="primary"
            sx={{
              bgcolor: "#F1F2F4",
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
                <Typography>Canditate</Typography>
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

          {methods.formState.errors.role && (
            <Typography color="error" fontSize={12} mt={1}>
              {methods.formState.errors.role.message}
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
          // loading={isLoading}
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "blue.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "blue.800",
            },
          }}
        >
          Create Account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AuthRegisterPage;

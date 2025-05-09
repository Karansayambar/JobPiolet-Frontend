import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useVerifyMutation } from "../../services/authApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormProvider from "../../hooks/hooks-form/FormProvider";
import RHFCodes from "../../hooks/hooks-form/RHFCodes";

// Define Redux RootState
interface AuthState {
  email: string;
}
interface RootState {
  auth: AuthState;
}
// Define form values
type VerifyFormValues = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

export default function VerifyForm() {
  const email = useSelector((state: RootState) => state.auth.email);
  const [verify] = useVerifyMutation();
  const navigate = useNavigate();

  console.log("Current email in Redux:", email); // Debugging step

  // Validation schema
  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required("Code is required"),
    code2: Yup.string().required("Code is required"),
    code3: Yup.string().required("Code is required"),
    code4: Yup.string().required("Code is required"),
    code5: Yup.string().required("Code is required"),
    code6: Yup.string().required("Code is required"),
  });

  // Default values for form
  const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",
  };

  // Initialize react-hook-form
  const methods = useForm<VerifyFormValues>({
    mode: "onChange",
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  // Submit handler
  const onSubmit: SubmitHandler<VerifyFormValues> = async (data: any) => {
    console.log("Login data:", data);

    if (!email) {
      console.error("Error: No email found in Redux state!");
      return;
    }

    console.log("Email:", email);

    try {
      const response = await verify({
        email,
        otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`,
      }).unwrap();
      console.log("Verification successful:", response);
      navigate("/");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes
          keyName="code"
          inputs={["code1", "code2", "code3", "code4", "code5", "code6"]}
        />

        <Button
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Verify My Account <ArrowForward />
        </Button>
      </Stack>
    </FormProvider>
  );
}

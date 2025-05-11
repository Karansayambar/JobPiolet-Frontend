// pages/Contact.tsx

import { useEffect, useState } from "react";
import { Button, Snackbar, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormProvider from "../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../hooks/hooks-form/RHFTextField";
import {
  updateCompanyData,
  updateStep,
} from "../../../redux/slices/createCompanyProfileSlice";
import { useCreateCompanyProfileMutation } from "../../../services/companyApi";
import { RootState } from "../../../redux/store"; // ✅ your typed Redux RootState

// 📌 Type for form fields
type ContactFormValues = {
  address: string;
  phone: string;
  email: string;
};

const Contact = () => {
  const { step, companyProfileData } = useSelector(
    (state: RootState) => state.company
  );

  const infoData = companyProfileData.contactInfo;
  const user_id = localStorage.getItem("user_id");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createCompanyProfile, { isLoading }] =
    useCreateCompanyProfileMutation();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const methods = useForm<ContactFormValues>({
    defaultValues: {
      address: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  // Populate form if infoData exists
  useEffect(() => {
    if (infoData) {
      reset({
        address: infoData.address || "",
        phone: infoData.phone || "",
        email: infoData.email || "",
      });
    }
  }, [infoData, reset]);

  const onSave = (data: ContactFormValues) => {
    dispatch(updateCompanyData({ contactInfo: data }));
    setSnackbar({
      open: true,
      message: "Contact information saved!",
      severity: "success",
    });
  };

  const onSubmit = async (data: ContactFormValues) => {
    dispatch(updateCompanyData({ contactInfo: data }));

    try {
      const response = await createCompanyProfile({
        user_id,
        ...companyProfileData,
        profileCreated: true,
      }).unwrap();

      console.log("✅ Success:", response);
      setSnackbar({
        open: true,
        message: "Profile submitted successfully!",
        severity: "success",
      });
      dispatch(updateStep(step + 1));
    } catch (err) {
      console.error("❌ Error:", err);
      setSnackbar({
        open: true,
        message: "Failed to submit profile. Try again.",
        severity: "error",
      });
    }
  };

  return (
    <Stack width={"50vw"}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <RHFTextField name="address" label="Address" />
          <RHFTextField name="phone" label="Phone" />
          <RHFTextField name="email" label="Email" />
        </Stack>

        <Stack direction="row" justifyContent="flex-start" spacing={2} pt={3}>
          <Button variant="outlined" type="button" onClick={() => navigate(-1)}>
            Previous
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={handleSubmit(onSave)}
          >
            Save
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </FormProvider>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Stack>
  );
};

export default Contact;

// pages/Contact.tsx
import React, { useEffect } from "react";
import { Button, Stack } from "@mui/material";
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

const Contact = () => {
  const { step, companyProfileData } = useSelector(
    (state: any) => state.company
  );

  // const user_id = useSelector((state: any) => state.auth);
  // const user_id = "67ecc38ce95d3ea12c7f0495";
  const infoData = companyProfileData.contactInfo;
  const user_id = localStorage.getItem("user_id");
  console.log("user_id", user_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createCompanyProfile, { isLoading }] =
    useCreateCompanyProfileMutation();

  const methods = useForm({
    defaultValues: {
      address: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;
  useEffect(() => {
    if (infoData) {
      reset({
        address: infoData.address || "",
        phone: infoData.phone || "",
        email: infoData.email || "",
      });
    }
  }, [infoData, reset]);

  const onSave = (data: any) => {
    dispatch(updateCompanyData({ contactInfo: data }));
  };

  const onSubmit = async (data: any) => {
    console.log("ppp", user_id, step, companyProfileData);

    try {
      const response = await createCompanyProfile({
        user_id,
        ...companyProfileData,
        profileCreated: true,
      }).unwrap();

      console.log("✅ Success:", response);
      dispatch(updateStep(step + 1));
    } catch (err) {
      console.error("❌ Error:", err);
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
          <Button variant="outlined" type="button">
            Previous
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={handleSubmit(onSave)}
          >
            save
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
};

export default Contact;

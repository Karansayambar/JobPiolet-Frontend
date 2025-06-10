// pages/Contact.tsx
import { useEffect } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { updateCandidateData } from "../../../../redux/slices/userProfileSlice";
import { useCreateCandidateProfileMutation } from "../../../../services/candidateApi";
import FormProvider from "../../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../../hooks/hooks-form/RHFTextField";

const Contact = () => {
  const dispatch = useDispatch();
  const { candidateProfileData } = useSelector((state) => state.candidate);

  const infoData = candidateProfileData?.candidateInfo;

  const [createCandidateProfile, { isLoading }] =
    useCreateCandidateProfileMutation();

  const methods =
    useForm <
    ContactFormValues >
    {
      defaultValues: {
        address: "",
        phone: "",
        email: "",
      },
      mode: "onChange",
    };

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

  const onSave = (data) => {
    dispatch(updateCandidateData({ contactInfo: data }));
  };

  const onSubmit = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return console.error("User ID not found");

    try {
      const response = await createCandidateProfile({
        user_id,
        ...candidateProfileData,
        profileCreated: true,
      }).unwrap();

      console.log("✅ Success:", response);
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <Stack width="50vw">
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
            Save
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

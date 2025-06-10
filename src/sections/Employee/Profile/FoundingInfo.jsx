import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack, Typography } from "@mui/material";
import FormProvider from "../../../hooks/hooks-form/FormProvider";
import RHFSelect from "../../../hooks/hooks-form/RHFSelect";
import RHFTextField from "../../../hooks/hooks-form/RHFTextField";
import RHFDatePicker from "../../../hooks/hooks-form/RHFDatePicker";
import RHFTextArea from "../../../hooks/hooks-form/TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCompanyData,
  updateStep,
} from "../../../redux/slices/createCompanyProfileSlice";

const FoundingInfo = () => {
  const { step, companyProfileData } = useSelector((state) => state.company);

  const infoData = companyProfileData.foundingInfo;
  const dispatch = useDispatch();

  // 2️⃣ Form initialization with type
  const methods =
    useForm <
    FoundingInfoFormValues >
    {
      defaultValues: {
        organisationType: "",
        industryType: "",
        teamSize: "",
        // yearOfEstablishment: null,
        companyWebsite: "",
        companyVision: "",
      },
    };

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (infoData) {
      reset({
        organisationType: infoData.organisationType || "",
        industryType: infoData.industryType || "",
        teamSize: infoData.teamSize || "",
        // yearOfEstablishment: infoData.yearOfEstablishment
        //   ? new Date(infoData.yearOfEstablishment)
        //   : null,
        companyWebsite: infoData.companyWebsite || "",
        companyVision: infoData.companyVision || "",
      });
    }
  }, [infoData, reset]);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    dispatch(updateCompanyData({ foundingInfo: data }));
    dispatch(updateStep(step + 1));
  };

  return (
    <Box width={"50vw"}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Founding Information
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
          <RHFSelect
            name="organisationType"
            label="Organisation Type"
            options={[
              { value: "private", label: "Private" },
              { value: "public", label: "Public" },
            ]}
          />
          <RHFSelect
            name="industryType"
            label="Industry Type"
            options={[
              { value: "software", label: "Software" },
              { value: "marketing", label: "Marketing" },
              { value: "advertising", label: "Advertising" },
            ]}
          />
          <RHFTextField name="teamSize" label="Team Size" />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
          <RHFDatePicker
            name="yearOfEstablishment"
            label="Year of Establishment"
          />
          <RHFTextField name="companyWebsite" label="Company Website" />
        </Stack>

        <RHFTextArea
          name="companyVision"
          label="Company Vision"
          placeholder="Write down about company here. Let the candidate know who we are."
        />

        <Stack direction="row" justifyContent="flex-start" spacing={2} pt={3}>
          <Button variant="outlined" type="button">
            Previous
          </Button>
          <Button variant="contained" type="submit">
            Save & Next
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default FoundingInfo;

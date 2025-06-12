import { Stack, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../../../../hooks/hooks-form/FormProvider";
import RHFSelect from "../../../../../hooks/hooks-form/RHFSelect";
import RHFDatePicker from "../../../../../hooks/hooks-form/RHFDatePicker";
import RHFTextArea from "../../../../../hooks/hooks-form/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCandidateData } from "../../../../../redux/slices/userProfileSlice";
import RHFTextField from "../../../../../hooks/hooks-form/RHFTextField";

const ProfileForm = () => {
  const candidateProfileData = useSelector(
    (state) => state.candidate.candidateProfileData
  );
  const dispatch = useDispatch();

  const theme = useTheme();

  const profileInfo = candidateProfileData?.profileInfo;

  const methods =
    useForm
    ({
      defaultValues: {
        nationality: "",
        gender: "",
        maritalStatus: "",
        address: "",
        dateOfBirth: null,
        biography: "",
      },
    });

  const { reset } = methods;

  useEffect(() => {
    if (profileInfo) {
      reset({
        nationality: profileInfo.nationality,
        gender: profileInfo.gender,
        maritalStatus: profileInfo.maritalStatus,
        address: profileInfo.address,
        dateOfBirth: profileInfo.dateOfBirth,
        biography: profileInfo.biography,
      });
    }
  }, [profileInfo, reset]);
  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const dataToStore = {
      nationality: data.nationality,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      biography: data.biography,
    };
    console.log("data to store", dataToStore);

    dispatch(updateCandidateData({ profileInfo: dataToStore }));
  };

  return (
    <Stack>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Nationality & Gender */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} py={2}>
          <RHFSelect
            name="nationality"
            label="Nationality"
            options={[
              { value: "india", label: "India" },
              { value: "usa", label: "USA" },
              { value: "england", label: "England" },
            ]}
          />
          <RHFSelect
            name="gender"
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        </Stack>

        {/* Marital Status & Education */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} py={2}>
          <RHFTextField name="address" label="Address" />
        </Stack>

        {/* Experience & Date of Birth */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} py={2}>
          <RHFSelect
            name="maritalStatus"
            label="Marital Status"
            options={[
              { value: "married", label: "Married" },
              { value: "unmarried", label: "Unmarried" },
            ]}
          />
          <RHFDatePicker name="dateOfBirth" label="Date of Birth" />
        </Stack>
        <RHFTextArea
          name="biography"
          label="Write down your biography here.Let the employee konw who you are..."
          rows={5}
          placeholder="Write about yourself..."
        />

        <LoadingButton
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          // loading={isLoading}
          sx={{
            marginY: "15px",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Save Changes
        </LoadingButton>
      </FormProvider>
    </Stack>
  );
};

export default ProfileForm;

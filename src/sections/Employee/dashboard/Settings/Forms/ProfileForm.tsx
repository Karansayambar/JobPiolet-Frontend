import { Stack, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import FormProvider from "../../../../../hooks/hooks-form/FormProvider";
import RHFSelect from "../../../../../hooks/hooks-form/RHFSelect";
import RHFDatePicker from "../../../../../hooks/hooks-form/RHFDatePicker";
import RHFTextArea from "../../../../../hooks/hooks-form/TextArea";

const ProfileForm: React.FC = () => {
  const theme = useTheme();
  const methods = useForm({
    defaultValues: {
      nationality: "",
      gender: "",
      maritalStatus: "",
      education: "",
      experience: "",
      dateOfBirth: null,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Stack>
      <FormProvider methods={methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            <RHFSelect
              name="maritalStatus"
              label="Marital Status"
              options={[
                { value: "married", label: "Married" },
                { value: "unmarried", label: "Unmarried" },
              ]}
            />
            <RHFSelect
              name="education"
              label="Education"
              options={[
                { value: "btech", label: "B.Tech" },
                { value: "bca", label: "BCA" },
                { value: "mca", label: "MCA" },
                { value: "bsc", label: "BSC" },
              ]}
            />
          </Stack>

          {/* Experience & Date of Birth */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} py={2}>
            <RHFSelect
              name="experience"
              label="Experience"
              options={[
                { value: "0year", label: "0 Year" },
                { value: "1year", label: "1 Year" },
                { value: "2year", label: "2 Years" },
                { value: "3year", label: "3 Years" },
                { value: "4year", label: "4 Years" },
                { value: "5year", label: "5 Years" },
                { value: "6year", label: "6 Years" },
                { value: "7year", label: "7 Years" },
                { value: "8year", label: "8+ Years" },
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
        </form>
      </FormProvider>
    </Stack>
  );
};

export default ProfileForm;

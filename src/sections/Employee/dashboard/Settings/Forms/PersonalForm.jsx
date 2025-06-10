import { Box, Input, Stack, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useState } from "react";
import FormProvider from "../../../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../../../hooks/hooks-form/RHFTextField";

const PersonalForm = () => {
  const theme = useTheme();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check file size (Max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB!");
        return;
      }

      // Convert file to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"row"} spacing={4}>
          {/* Profile Picture Upload */}
          <Stack spacing={1}>
            <Typography variant="body2">Picture Profile</Typography>
            <Stack
              border={1}
              p={5}
              borderRadius={3}
              textAlign="center"
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: "pointer",
                bgcolor: "#f5f5f5",
                "&:hover": { bgcolor: "#e0e0e0" },
                borderStyle: "dashed",
              }}
            >
              {image ? (
                <Box
                  component="img"
                  src={image}
                  alt="Profile Preview"
                  sx={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
              ) : (
                <>
                  <MdOutlineCloudUpload size={36} />
                  <Typography>Browse Photo or Drop here</Typography>
                  <Typography fontSize={12} color="gray">
                    A photo larger than 400 pixels works best. Max photo size
                    5MB.
                  </Typography>
                </>
              )}
              <Input
                type="file"
                sx={{ display: "none" }}
                onChange={handleImageUpload}
                inputProps={{ accept: "image/*" }}
              />
            </Stack>
          </Stack>

          {/* Form Fields */}
          <Stack spacing={2} width="100%">
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <RHFTextField name="fullName" label="Full Name" />
              <RHFTextField name="title" label="Title" />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <RHFTextField name="experience" label="Experience" />
              <RHFTextField name="education" label="Education" />
            </Stack>

            <RHFTextField name="personalWebsite" label="Personal Website" />

            <LoadingButton
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              sx={{
                width: "200px",
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default PersonalForm;

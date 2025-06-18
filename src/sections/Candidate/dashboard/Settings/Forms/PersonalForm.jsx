import { Box, Stack, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useEffect, useState } from "react";
import FormProvider from "../../../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../../../hooks/hooks-form/RHFTextField";
import { useDispatch, useSelector } from "react-redux";
import { updateCandidateData } from "../../../../../redux/slices/userProfileSlice";
import { FaFileAlt } from "react-icons/fa";
import { Plus } from "phosphor-react";

const PersonalForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const candidateProfileData = useSelector(
    (state) => state.candidate.candidateProfileData,
  );

  const [selectedResume, setSelectedResume] = useState(null);
  const personalInfo = candidateProfileData?.candidateInfo;

  const methods = useForm({
    defaultValues: {
      avatar: "",
      fullName: "",
      title: "",
      experience: "",
      education: "",
      personalWebsite: "",
      resume: "",
    },
  });
  const { register, handleSubmit, reset } = methods;

  useEffect(() => {
    if (personalInfo) {
      reset({
        avatar: "",
        fullName: personalInfo.userFullName || "",
        title: personalInfo.title || "",
        experience: personalInfo.experience || "",
        education: personalInfo.education || "",
        personalWebsite: personalInfo.personalWebsite || "",
        resume: personalInfo.resume || "",
      });
    }
  }, [personalInfo, reset]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmmjvjjeg/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    return data.secure_url;
  };

  const onSubmit = async (data) => {
    let cloudinaryAvatar = personalInfo?.avatar || "";
    let cloudinaryResume = personalInfo?.resume || "";

    if (data.avatar?.[0]) {
      cloudinaryAvatar = await uploadToCloudinary(data.avatar[0]);
    }

    if (selectedResume) {
      cloudinaryResume = await uploadToCloudinary(selectedResume);
    }

    const dataToStore = {
      fullName: data.fullName,
      title: data.title,
      experience: data.experience,
      education: data.education,
      personalWebsite: data.personalWebsite,
      avatar: cloudinaryAvatar,
      resume: cloudinaryResume,
    };

    dispatch(updateCandidateData({ candidateInfo: dataToStore }));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1200, mx: "auto" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          {/* Profile Picture & Form */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems={{ md: "flex-start" }}
          >
            {/* Profile Picture */}
            <Stack spacing={2} sx={{ width: { xs: "100%", md: "25%" } }}>
              <Typography variant="h6">Profile Picture</Typography>

              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  border: "2px dashed",
                  borderRadius: 2,
                  p: 2,
                  bgcolor: "#F9FAFB",
                  height: 250,
                }}
                component="label"
              >
                {personalInfo?.avatar ? (
                  <img
                    src={personalInfo.avatar}
                    alt="Profile"
                    style={{ width: 120, height: 120, borderRadius: "50%" }}
                  />
                ) : (
                  <MdOutlineCloudUpload
                    size={48}
                    color={theme.palette.primary.main}
                  />
                )}
                <Typography fontWeight="bold" mt={2}>
                  {personalInfo?.avatar ? "Replace" : "Upload"}
                </Typography>
                <Typography fontSize="14px" color="gray">
                  JPG or PNG. Max 12MB.
                </Typography>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  {...register("avatar")}
                />
              </Stack>
            </Stack>

            {/* Form Fields */}
            <Stack spacing={3} sx={{ flex: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFTextField name="fullName" label="Full Name" />
                <RHFTextField name="title" label="Title" />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <RHFTextField name="experience" label="Experience" />
                <RHFTextField name="education" label="Education" />
              </Stack>
              <RHFTextField name="personalWebsite" label="Personal Website" />
            </Stack>
          </Stack>

          {/* Resume Upload */}
          <Stack spacing={2}>
            <Typography variant="h6">CV / Resume</Typography>

            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{
                border: "2px dashed",
                borderRadius: 2,
                p: 3,
                bgcolor: "#F9FAFB",
                maxWidth: 400,
              }}
              component="label"
            >
              {selectedResume ? (
                <FaFileAlt size={28} color={theme.palette.primary.main} />
              ) : (
                <Plus size={32} color={theme.palette.primary.main} />
              )}
              <Stack spacing={0.5}>
                <Typography>
                  {selectedResume ? selectedResume.name : "Add CV / Resume"}
                </Typography>
                <Typography fontSize="12px" color="gray">
                  PDF, DOC, DOCX, Images. Max 3MB.
                </Typography>
              </Stack>
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx,image/*"
                {...register("resume")}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedResume(e.target.files[0]);
                  }
                }}
              />
            </Stack>
          </Stack>

          {/* Save Button */}
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              width: "170px",
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default PersonalForm;

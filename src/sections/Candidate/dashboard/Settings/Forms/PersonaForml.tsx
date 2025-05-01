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
import { RootState } from "../../../../../redux/store";

const PersonalForm: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { candidateProfileData } = useSelector((state: RootState) => state);
  const [selectedResume, setSelectedResume] = useState<File | null>(null);

  // get data from candidate slice
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
        fullName: personalInfo.fullName || "",
        title: personalInfo.title || "",
        experience: personalInfo.experience || "",
        education: personalInfo.education || "",
        personalWebsite: personalInfo.personalWebsite || "",
        resume: personalInfo.resume || "",
      });
    }
  }, [personalInfo, reset]);

  const uploadToCloudinary = async (file: File): Promise<string> => {
    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmmjvjjeg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.secure_url; // <- Cloudinary image URL
  };

  const onSubmit = async (data: any) => {
    console.log("Form Data:", data);
    let cloudinaryAvatar = personalInfo?.avatar || "";
    let cloudinaryResume = personalInfo?.resume || "";

    if (data.avatar?.[0]) {
      cloudinaryAvatar = await uploadToCloudinary(data.avatar[0]);
    }

    if (selectedResume) {
      cloudinaryResume = await uploadToCloudinary(selectedResume);
    }

    console.log("selected resume");

    const dataToStore = {
      fullName: data.fullName,
      title: data.title,
      experience: data.experience,
      education: data.education,
      personalWebsite: data.personalWebsite,
      avatar: cloudinaryAvatar,
      resume: cloudinaryResume,
    };

    console.log("data to store", dataToStore);
    dispatch(updateCandidateData({ candidateInfo: dataToStore }));
  };

  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"row"} spacing={4} boxSizing={"border-box"}>
          {/* Profile Picture Upload */}
          <Stack spacing={1} sx={{ width: "20%" }}>
            <Typography variant="body2" fontSize={18}>
              Picture Profile
            </Typography>
            {personalInfo ? (
              <Stack>
                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={2}
                  sx={{
                    border: 1,
                    borderRadius: 2,
                  }}
                  height={300}
                >
                  <img
                    src={personalInfo.avatar}
                    alt="Logo"
                    width={100}
                    height={100}
                  />
                </Stack>
                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    cursor: "pointer",
                  }}
                  component="label"
                >
                  <MdOutlineCloudUpload size={36} />
                  <Typography fontWeight="bold">Replace </Typography>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    {...register("avatar")}
                  />
                </Stack>
              </Stack>
            ) : (
              <>
                <Stack
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    border: 2,
                    borderStyle: "dashed",
                    borderRadius: 2,
                    backgroundColor: "#E5E5E5",
                    p: 5,
                    width: "100%",
                    cursor: "pointer",
                  }}
                  component="label"
                >
                  <MdOutlineCloudUpload size={36} />
                  <Typography fontWeight="bold">
                    Browse File or Drop here
                  </Typography>
                  <Typography fontSize="14px" color="gray">
                    Only JPG and PNG format available. Max file size 12MB.
                  </Typography>
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    {...register("avatar")}
                  />
                </Stack>
              </>
            )}
          </Stack>

          {/* Form Fields */}
          <Stack spacing={2} width="80%">
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
        <Stack py={2}>
          <Typography>Your Cv/Resume</Typography>
          <Stack
            p={3}
            sx={{ borderStyle: "dotted" }}
            borderRadius={2}
            border={2}
            width={250}
          >
            {selectedResume ? (
              <Stack direction="row" alignItems="center" gap={2}>
                <FaFileAlt size={28} />
                <Stack>
                  <Typography>{selectedResume.name}</Typography>
                  <Typography fontSize="14px" color="gray">
                    {(selectedResume.size / (1024 * 1024)).toFixed(2)} MB
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Typography>No file selected</Typography>
            )}
          </Stack>
        </Stack>

        {personalInfo ? (
          <Stack>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}
              sx={{
                border: 1,
                borderRadius: 2,
              }}
              height={300}
              width={300}
            >
              {/* <img src={personalInfo.resume} alt="resume" /> */}
            </Stack>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                cursor: "pointer",
              }}
              component="label"
            >
              <MdOutlineCloudUpload size={36} />
              <Typography fontWeight="bold">Replace </Typography>
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx, image/*"
                {...register("resume")}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedResume(e.target.files[0]);
                  }
                }}
              />
            </Stack>
          </Stack>
        ) : (
          <>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
              direction={"row"}
              sx={{
                border: 2,
                borderStyle: "dashed",
                borderRadius: 2,
                p: 2,
                width: "350px",
                cursor: "pointer",
              }}
              component="label"
              m={2}
            >
              <Plus size={36} />
              <Stack>
                <Typography>Add CV/Resume</Typography>
                <Typography>
                  Browse file or drop here, only pdf, doc, docx, images
                </Typography>
                <Typography>Max size 3MB</Typography>
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
          </>
        )}

        <LoadingButton
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }}
        >
          Save Changes
        </LoadingButton>
      </FormProvider>
    </Box>
  );
};

export default PersonalForm;

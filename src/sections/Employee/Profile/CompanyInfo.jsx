import { Button, Divider, Snackbar, Stack, Typography } from "@mui/material";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ArrowForward } from "@mui/icons-material";

import FormProvider from "../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../hooks/hooks-form/RHFTextField";
import RHFTextArea from "../../../hooks/hooks-form/TextArea";
import {
  updateCompanyData,
  updateStep,
} from "../../../redux/slices/createCompanyProfileSlice";
import { useEffect } from "react";
import { useState } from "react";

const CompanyInfo = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.company);
  const { companyProfileData } = useSelector((state) => state.company);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const infoData = companyProfileData.companyInfo;

  const methods = useForm({
    defaultValues: {
      logo: "",
      banner: "",
      companyName: "",
      about: "",
    },
    mode: "onChange",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const { register, handleSubmit, reset } = methods;
  useEffect(() => {
    if (infoData) {
      reset({
        companyName: infoData.companyName || "",
        about: infoData.about || "",
        logo: "",
        banner: "",
      });
    }
  }, [infoData, reset]);

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
    return data.secure_url; // <- Cloudinary image URL
  };

  const onSubmit = async (data) => {
    let cloudinarylogoUrl = infoData?.logoUrl || "";
    let cloudinarybannerUrl = infoData?.bannerUrl || "";

    if (data.logo?.[0]) {
      cloudinarylogoUrl = await uploadToCloudinary(data.logo[0]);
    }

    if (data.banner?.[0]) {
      cloudinarybannerUrl = await uploadToCloudinary(data.banner[0]);
    }

    const dataToStore = {
      companyName: data.companyName,
      about: data.about,
      logoUrl: cloudinarylogoUrl,
      bannerUrl: cloudinarybannerUrl,
    };

    console.log("dataToStore", dataToStore);

    dispatch(updateCompanyData({ companyInfo: dataToStore }));
    dispatch(updateStep(step + 1));
    setOpenSnackbar(true);
  };

  return (
    <Stack width="50vw">
      <Typography variant="h6" fontWeight={600}>
        Logo and Banner Image
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" gap={4} py={3}>
          {infoData.logoUrl ? (
            <Stack sx={{ width: "30%" }}>
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
                  src={infoData.logoUrl}
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
                  {...register("logo")}
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
                  {...register("logo")}
                />
              </Stack>
            </>
          )}

          {/* Banner Upload */}
          {infoData.bannerUrl ? (
            <Stack sx={{ width: "70%" }}>
              <Stack
                spacing={2}
                sx={{
                  border: 1,
                  borderRadius: 2,
                }}
                height={300}
              >
                <img
                  src={infoData.bannerUrl}
                  alt="Logo"
                  width={"100%"}
                  height={"100%"}
                />
              </Stack>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{
                  borderRadius: 2,
                  width: "100%",
                  cursor: "pointer",
                }}
                component="label"
              >
                <MdOutlineCloudUpload size={36} />
                <Typography fontWeight="bold">Replace</Typography>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  {...register("banner")}
                />
              </Stack>
            </Stack>
          ) : (
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{
                border: 2,
                borderStyle: "dashed",
                backgroundColor: "#E5E5E5",
                borderRadius: 2,
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
                Only PDF format available. Max file size 12MB.
              </Typography>
              <input
                type="file"
                hidden
                accept="image/*"
                {...register("banner")}
              />
            </Stack>
          )}
        </Stack>

        <Divider orientation="horizontal" />

        <Stack gap={2} py={4}>
          <RHFTextField
            name="companyName"
            label="Company Name"
            placeholder="Company Name"
          />
          <RHFTextArea
            name="about"
            label="About Us"
            placeholder="Write about the company here. Let candidates know who we are."
          />
        </Stack>

        <Button variant="contained" type="submit">
          Save & Next <ArrowForward />
        </Button>
      </FormProvider>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message="Company Information Saved Successfully!"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Stack>
  );
};

export default CompanyInfo;

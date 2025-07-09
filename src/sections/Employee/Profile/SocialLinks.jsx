import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useForm } from "react-hook-form";
import RHFSocialForm from "../../../hooks/hooks-form/RHFSocial";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCompanyData,
  updateStep,
} from "../../../redux/slices/createCompanyProfileSlice";

const SocialLinks = () => {
  const dispatch = useDispatch();
  const { step, companyProfileData } = useSelector((state) => state.company);
  const infoData = companyProfileData.SocialInfo;

  const methods = useForm({
    defaultValues: {
      socialLinks: [],
    },
  });

  const { reset, setValue, watch, handleSubmit } = methods;
  const socialLinks = watch("socialLinks");

  useEffect(() => {
    if (infoData && infoData.length) {
      reset({
        socialLinks: infoData,
      });
    }
  }, [infoData, reset]);

  const handleAddSocialLink = () => {
    setValue("socialLinks", [...socialLinks, { platform: "", link: "" }]);
  };

  const handleRemoveSocialLink = (index) => {
    setValue(
      "socialLinks",
      socialLinks.filter((_, i) => i !== index),
    );
  };

  const onSubmit = (data) => {
    console.log("Social Links Data:", data);
    dispatch(updateCompanyData({ socialLinks: data.socialLinks }));
    dispatch(updateStep(step + 1));
  };

  return (
    <Box width="50vw">
      <Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {socialLinks.map((_, index) => (
            <Stack py={2} key={index}>
              <Typography>Social Link {index + 1}</Typography>
              <RHFSocialForm
                index={index}
                onRemove={() => handleRemoveSocialLink(index)}
              />
            </Stack>
          ))}

          <Button variant="contained" fullWidth onClick={handleAddSocialLink}>
            <BsPlus size={28} />
            Add new social link
          </Button>

          <Stack direction="row" justifyContent="flex-start" spacing={2} pt={3}>
            <Button variant="outlined" type="button">
              Previous
            </Button>
            <Button variant="contained" type="submit">
              Save & Next
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Box>
  );
};

export default SocialLinks;

import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { useForm } from "react-hook-form";
import FormProvider from "../../../hooks/hooks-form/FormProvider";
import RHFSocialForm from "../../../hooks/hooks-form/RHFSocial";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCompanyData,
  updateStep,
} from "../../../redux/slices/createCompanyProfileSlice";

const SocialLinks: React.FC = () => {
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.company);
  const { companyProfileData } = useSelector((state) => state.company);
  const infoData = companyProfileData.socialLinks;

  const methods = useForm({
    defaultValues: {
      socialLinks: [],
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (infoData) {
      reset({
        socialLinks: infoData.socialLinks || "",
      });
    }
  }, [infoData, reset]);

  const { setValue, watch } = methods;
  const socialLinks = watch("socialLinks");

  const handleAddSocialLink = () => {
    setValue("socialLinks", [...socialLinks, { platform: "", link: "" }]);
  };

  const handleRemoveSocialLink = (index: number) => {
    setValue(
      "socialLinks",
      socialLinks.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(updateCompanyData({ SocialInfo: data }));
    dispatch(updateStep(step + 1));
  };
  return (
    <Box width={"50vw"}>
      <Stack>
        <FormProvider methods={methods}>
          {socialLinks.map((_, index) => (
            <Stack py={2}>
              <Typography>Social Link {index + 1}</Typography>
              <RHFSocialForm
                key={index}
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
            <Button
              variant="contained"
              onClick={methods.handleSubmit(onSubmit)}
            >
              Save & Next
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Box>
  );
};

export default SocialLinks;

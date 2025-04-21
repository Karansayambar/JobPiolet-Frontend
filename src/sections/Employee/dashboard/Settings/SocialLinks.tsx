import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { useForm } from "react-hook-form";
import FormProvider from "../../../../hooks/hooks-form/FormProvider";
import RHFSocialForm from "../../../../hooks/hooks-form/RHFSocial";

const SocialLinks: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      socialLinks: [],
    },
  });

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
  return (
    <Box>
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
        </FormProvider>
      </Stack>
    </Box>
  );
};

export default SocialLinks;

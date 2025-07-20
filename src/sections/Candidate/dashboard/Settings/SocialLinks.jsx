import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFSocialForm from "../../../../hooks/hooks-form/RHFSocial";

const SocialLinks = () => {
  const methods = useForm({
    defaultValues: {
      socialLinks: [{ platform: "", link: "" }],
    },
  });

  const [socialLinks, setSocialLinks] = useState([{ platform: "", link: "" }]);

  const handleAdd = () => {
    setSocialLinks([...socialLinks, { platform: "", link: "" }]);
  };

  const handleRemove = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
    // Also remove from react-hook-form values if needed
    methods.setValue(
      "socialLinks",
      updatedLinks.map((_, idx) => ({
        platform: methods.getValues(`socialLinks.${idx}.platform`),
        link: methods.getValues(`socialLinks.${idx}.link`),
      }))
    );
  };

  const onSubmit = (data) => {
    console.log("Submitted Social Links:", data.socialLinks);
  };

  return (
    <Box maxWidth={1200} p={{ md: 5 }}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Typography variant="h6" gutterBottom>
            Social Links
          </Typography>

          <Stack spacing={2}>
            {socialLinks.map((_, index) => (
              <RHFSocialForm
                key={index}
                index={index}
                onRemove={() => handleRemove(index)}
              />
            ))}

            <Button variant="contained" onClick={handleAdd}>
              Add Social Link
            </Button>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default SocialLinks;

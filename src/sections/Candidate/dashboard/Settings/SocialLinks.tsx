import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFSocialForm from "../../../../hooks/hooks-form/RHFSocial";

interface FormValues {
  socialLinks: { platform: string; link: string }[];
}

const SocialLinks: React.FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      socialLinks: [{ platform: "", link: "" }],
    },
  });

  const [socialLinks, setSocialLinks] = useState([{ platform: "", link: "" }]);

  const handleAdd = () => {
    setSocialLinks([...socialLinks, { platform: "", link: "" }]);
  };

  const handleRemove = (index: number) => {
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

  const onSubmit = (data: FormValues) => {
    console.log("Submitted Social Links:", data.socialLinks);
  };

  return (
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
  );
};

export default SocialLinks;

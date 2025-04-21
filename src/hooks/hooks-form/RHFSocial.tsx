import { Stack, TextField, IconButton, MenuItem } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { MdClose } from "react-icons/md";

interface RHPSocialFormProps {
  index: number;
  onRemove: () => void;
}

const socialPlatforms = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
];

const RHFSocialForm: React.FC<RHPSocialFormProps> = ({ index, onRemove }) => {
  const { control } = useFormContext();

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {/* Social Platform Select */}
      <Controller
        name={`socialLinks.${index}.platform`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField select fullWidth label="Platform" {...field}>
            {socialPlatforms.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Social Link Input */}
      <Controller
        name={`socialLinks.${index}.link`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField fullWidth label="Profile Link" {...field} />
        )}
      />

      {/* Remove Button */}
      <IconButton color="error" onClick={onRemove}>
        <MdClose />
      </IconButton>
    </Stack>
  );
};

export default RHFSocialForm;

import { Stack, TextField, Button } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

interface RHFSocialFormProps {
  index: number;
  onRemove: () => void;
}

const RHFSocialForm: React.FC<RHFSocialFormProps> = ({ index, onRemove }) => {
  const { control } = useFormContext(); // Get control from form context

  const { field: platformField } = useController({
    name: `socialLinks.${index}.platform`,
    control,
    defaultValue: "",
  });

  const { field: linkField } = useController({
    name: `socialLinks.${index}.link`,
    control,
    defaultValue: "",
  });

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        {...platformField}
        label={`Platform ${index + 1}`}
        fullWidth
        variant="outlined"
      />
      <TextField {...linkField} label="Link" fullWidth variant="outlined" />
      <Button variant="contained" color="error" onClick={onRemove}>
        Remove
      </Button>
    </Stack>
  );
};

export default RHFSocialForm;

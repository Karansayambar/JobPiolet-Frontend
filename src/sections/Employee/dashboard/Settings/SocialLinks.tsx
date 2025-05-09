import { Stack, TextField, Button } from "@mui/material";
import { useController } from "react-hook-form";

interface RHFSocialFormProps {
  index: number;
  onRemove: () => void;
}

const RHFSocialForm: React.FC<RHFSocialFormProps> = ({ index, onRemove }) => {
  const { field: platformField } = useController({
    name: `socialLinks[${index}].platform`,
    defaultValue: "",
  });

  const { field: linkField } = useController({
    name: `socialLinks[${index}].link`,
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

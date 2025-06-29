import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

const RHFTextArea = ({ name, label, rows = 4, placeholder }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          multiline
          rows={rows}
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          error={!!error}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
};

export default RHFTextArea;

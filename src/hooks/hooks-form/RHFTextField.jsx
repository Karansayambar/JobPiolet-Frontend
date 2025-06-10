import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const RHFTextField = ({ name, helperText, ...other }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={field.value === 0 ? "" : field.value || ""}
          error={!!error}
          helperText={error?.message || helperText}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;

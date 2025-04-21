import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";

type RHFSelectProps = {
  name: string;
  label: string;
  options: { value: string | number; label: string }[];
};

const RHFSelect: React.FC<RHFSelectProps> = ({ name, label, options }) => {
  const formContext = useFormContext();
  if (!formContext) {
    console.error("RHFSelect must be used within a FormProvider.");
    return null;
  }

  const { control } = formContext;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel>{label}</InputLabel>
          <Select {...field}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default RHFSelect;

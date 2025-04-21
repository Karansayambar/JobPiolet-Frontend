import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type RHFTextFieldProps = TextFieldProps & {
  name: string;
  helperText?: React.ReactNode;
};

const RHFTextField: React.FC<RHFTextFieldProps> = ({
  name,
  helperText,
  ...other
}) => {
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

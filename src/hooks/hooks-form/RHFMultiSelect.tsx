import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

export default function RHFMultiSelect({
  name,
  label,
  placeholder,
  options = [],
  creatable = false,
  ...other
}) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref },
  } = useController({ name, control });

  const handleChange = (event, newValue) => {
    // Prevent duplicates
    const uniqueValues = Array.from(new Set(newValue));
    onChange(uniqueValues);
  };

  return (
    <Autocomplete
      multiple
      freeSolo={creatable}
      options={options.map((opt) =>
        typeof opt === "string" ? opt : opt.value
      )}
      value={value || []}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          inputRef={ref}
          fullWidth
        />
      )}
      {...other}
    />
  );
}

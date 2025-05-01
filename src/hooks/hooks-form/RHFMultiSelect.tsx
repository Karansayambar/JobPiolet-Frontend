import { useController, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

interface RHFMultiSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: Array<string | { value: string }>;
  creatable?: boolean;
  [key: string]: any; // for any other props like 'disabled' etc
}

export default function RHFMultiSelect({
  name,
  label,
  placeholder,
  options = [],
  creatable = false,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, ref },
  } = useController({ name, control });

  const handleChange = (newValue: any) => {
    // Remove duplicates
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

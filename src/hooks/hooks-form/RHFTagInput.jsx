// RHFTagInput.tsx
import { Autocomplete, Chip, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const RHFTagInput = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          multiple
          freeSolo
          options={[
            "React",
            "JavaScript",
            "Node.js",
            "MongoDB",
            "CSS",
            "HTML",
            "TypeScript",
          ]}
          value={value}
          onChange={(event, newValue) => onChange(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={label} />
          )}
        />
      )}
    />
  );
};

export default RHFTagInput;

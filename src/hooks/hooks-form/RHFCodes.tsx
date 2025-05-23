import { useRef } from "react";
// form
import { useFormContext, Controller, FieldValues } from "react-hook-form";
// @mui
import { Stack, TextField, TextFieldProps } from "@mui/material";

type RHFCodesProps = {
  keyName?: string;
  inputs: string[];
} & TextFieldProps;

export default function RHFCodes({
  keyName = "",
  inputs = [],
  ...other
}: RHFCodesProps) {
  const codesRef = useRef<HTMLDivElement | null>(null);

  const { control } = useFormContext<FieldValues>();

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    handleChange: (value: string) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, "");
    const fieldIntIndex = Number(fieldIndex);

    const nextfield = document.querySelector<HTMLInputElement>(
      `input[name='${keyName}${fieldIntIndex + 1}']`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }

    if (value.length >= maxLength && fieldIntIndex < 6 && nextfield !== null) {
      nextfield.focus();
    }

    handleChange(value);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder="-"
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}

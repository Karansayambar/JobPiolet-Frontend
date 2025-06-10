import { Stack, Typography } from "@mui/material";
import PersonalForm from "./Forms/PersonalForm";

const Personal = () => {
  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6">Basic Information</Typography>
        <PersonalForm />
      </Stack>
    </>
  );
};

export default Personal;

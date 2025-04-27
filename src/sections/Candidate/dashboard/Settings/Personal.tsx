import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import PersonalForm from "./Forms/PersonaForml";

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

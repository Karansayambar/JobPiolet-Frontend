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
import { FaFileAlt } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import FormProvider from "../../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../../hooks/hooks-form/RHFTextField";

const Personal = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h6">Basic Information</Typography>
        <PersonalForm />
        <Stack py={2}>
          <Typography>Your Cv/Resume</Typography>
          <Stack
            p={3}
            sx={{ borderStyle: "dotted" }}
            borderRadius={2}
            border={2}
            width={250}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <FaFileAlt size={28} />
              <Stack>
                <Typography>Professional Resume</Typography>
                <Typography fontSize="14px" color="gray">
                  3.5MB
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Open Upload Modal Button */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Upload New Resume
      </Button>

      {/* Upload CV Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Cv/Resume</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {/* Resume Name Input */}
            <Typography>CV/Resume Name</Typography>
            <FormProvider>
              <RHFTextField
                name="resumeName"
                label="Enter Resume Name"
                fullWidth
              />
            </FormProvider>

            {/* Upload Box */}
            <Typography>Upload your Cv/Resume</Typography>
            <Stack
              spacing={2}
              alignItems="center"
              justifyContent="center"
              border={2}
              borderStyle="dashed"
              borderRadius={2}
              p={5}
              width="100%"
            >
              <MdOutlineCloudUpload size={36} />
              <Typography fontWeight="bold">
                Browse File or Drop here
              </Typography>
              <Typography fontSize="14px" color="gray">
                Only PDF format available. Max file size 12MB.
              </Typography>
              <Input type="file" accept=".pdf" onChange={handleFileChange} />
            </Stack>
          </Stack>
        </DialogContent>

        {/* Buttons */}
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" disabled={!selectedFile}>
            Add Cv/Resume
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Personal;

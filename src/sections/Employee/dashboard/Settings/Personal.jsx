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
import PersonalForm from "./Forms/PersonalForm";
import { FaFileAlt } from "react-icons/fa";
import { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import FormProvider from "../../../../hooks/hooks-form/FormProvider";
import RHFTextField from "../../../../hooks/hooks-form/RHFTextField";
import { useForm } from "react-hook-form";

const Personal = () => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const methods = useForm();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 12 * 1024 * 1024) {
        alert("File size exceeds 12MB.");
        setSelectedFile(null);
        return;
      }
      if (!file.name.endsWith(".pdf")) {
        alert("Only PDF files are allowed.");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    if (!selectedFile) return;

    console.log("Resume Name:", data.resumeName);
    console.log("Selected File:", selectedFile);

    // TODO: handle your file upload logic here

    handleClose(); // close modal after submission
  };

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

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Upload New Resume
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Cv/Resume</DialogTitle>

        <FormProvider
          methods={methods}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <Typography>CV/Resume Name</Typography>
              <RHFTextField
                name="resumeName"
                label="Enter Resume Name"
                fullWidth
              />

              <Typography>Upload your Cv/Resume</Typography>
              <Stack
                sx={{
                  spacing: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  border: 2,
                  borderStyle: "dashed",
                  borderRadius: 2,
                  p: 5,
                  width: "100%",
                }}
              >
                <MdOutlineCloudUpload size={36} />
                <Typography fontWeight="bold">
                  Browse File or Drop here
                </Typography>
                <Typography fontSize="14px" color="gray">
                  Only PDF format available. Max file size 12MB.
                </Typography>
                <Input
                  type="file"
                  inputProps={{ accept: ".pdf" }}
                  onChange={handleFileChange}
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!selectedFile}
            >
              Add Cv/Resume
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default Personal;

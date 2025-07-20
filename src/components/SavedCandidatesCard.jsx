import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Icon, Stack, Typography, useTheme } from "@mui/material";
import { FaBookmark } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import ViewApplicantsDetailsModel from "../sections/Employee/dashboard/ViewApplicantsDetailsModel";

export const SavedCandidatesCard = ({ applicant, name, profileImg }) => {
  const [openModel, setOpenModel] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const theme = useTheme();

  const handleOpenModel = () => {
    setSelectedApplicant(applicant);
    setOpenModel(true);
  };
  return (
    <>
      <Stack
        direction={"row"}
        p={2}
        alignItems={"center"}
        justifyContent={"space-between"}
        border={"1px solid #ddd"}
        borderRadius={2}
        mb={2}
        bgcolor={openModel && theme.palette.primary.main}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={profileImg}
            alt={name}
            style={{ borderRadius: "50%", height: "80px", width: "80px" }}
          />
          <Typography variant="h6">{name}</Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Icon>
            <FaBookmark />
          </Icon>
          <Button variant="contained" onClick={() => handleOpenModel()}>
            View Profile <ArrowForward />
          </Button>
          <Icon>
            <BsThreeDotsVertical />
          </Icon>
        </Stack>
      </Stack>
      {openModel && selectedApplicant && (
        <Box
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <ViewApplicantsDetailsModel
            applicant={selectedApplicant}
            onClose={() => setOpenModel(false)}
          />
        </Box>
      )}
    </>
  );
};

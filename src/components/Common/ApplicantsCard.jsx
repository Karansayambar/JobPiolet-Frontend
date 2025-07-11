import {
  Avatar,
  Box,
  Divider,
  List,
  Stack,
  Typography,
  ListItem,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { dateConverter } from "../../utils/dateConverter";
import { BookmarkSimple, Download } from "phosphor-react";
import { useState } from "react";
import ViewApplicantsDetailsModel from "../../sections/Employee/dashboard/ViewApplicantsDetailsModel";
import { useParams } from "react-router-dom";
import {
  useSaveCandidateMutation,
  useUnsavedCandidateMutation,
} from "../../services/companyApi";

const ApplicantsCard = ({ applicants, setApplicants }) => {
  const [openModel, setOpenModel] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [savedCandidate] = useSaveCandidateMutation();
  const [unsavedCandidate] = useUnsavedCandidateMutation();
  const theme = useTheme();
  const handleOpenModel = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenModel(true);
  };
  const jobId = useParams();

  function handleSaveCandidate(candidateId, isSaved) {
    const payload = { candidateId, jobId: jobId.id };
    const action = isSaved ? unsavedCandidate : savedCandidate;

    action(payload).then(() => {
      setApplicants((prev) =>
        prev.map((el) =>
          el.userId === candidateId ? { ...el, isSaved: !isSaved } : el
        )
      );
    });
  }

  // Add safety checks
  if (!applicants || !Array.isArray(applicants)) {
    return <Typography>No applicants data available</Typography>;
  }

  return (
    <>
      <Box
        p={4}
        style={{ opacity: openModel ? 0.3 : 1 }}
        bgcolor={theme.palette.background.paper}
      >
        {applicants.map((applicant, index) => {
          // Skip if applicant data is invalid
          if (!applicant?.candidateInfo) return null;

          return (
            <Box
              key={applicant.id || `applicant-${index}`}
              mb={2}
              border={1}
              width={300}
              borderRadius={2}
              borderColor={"#e0e0e0"}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
                spacing={2}
                p={2}
              >
                <Avatar
                  src={applicant.candidateInfo.avatar}
                  alt={applicant.candidateInfo.fullName}
                  sx={{ width: 56, height: 56 }} // Better sizing
                />
                <Stack>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {applicant.candidateInfo.fullName || "No name provided"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {applicant.candidateInfo.title || "No title provided"}
                  </Typography>
                </Stack>
                <Tooltip title={"Save"} placement="top-start" arrow>
                  <IconButton
                    onClick={() =>
                      handleSaveCandidate(applicant.userId, applicant.isSaved)
                    }
                  >
                    <BookmarkSimple
                      weight={applicant.isSaved ? "fill" : "regular"}
                      size={30}
                    />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Divider />

              <List>
                <ListItem>
                  <Typography variant="body2">
                    {applicant.candidateInfo.experience || "0"} years of
                    experience
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">
                    Education:{" "}
                    {applicant.candidateInfo.education || "Not specified"}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body2">
                    Applied:{" "}
                    {dateConverter(applicant.appliedDate) ||
                      "Date not available"}
                  </Typography>
                </ListItem>
              </List>
              <Stack
                alignItems={"end"}
                gap={1}
                direction={"row"}
                p={1}
                color={"#0a65cc"}
              >
                <Download size={25} />{" "}
                <a
                  href={applicant.candidateInfo.resume.replace(
                    "/upload/",
                    "/upload/fl_attachment/"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#0a65cc", textDecoration: "none" }}
                >
                  Download Resume
                </a>
              </Stack>

              <Typography
                textAlign="center"
                p={1}
                onClick={() => handleOpenModel(applicant)}
              >
                View Profile
              </Typography>
            </Box>
          );
        })}
      </Box>
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

export default ApplicantsCard;

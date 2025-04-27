import {
  Avatar,
  Box,
  Divider,
  List,
  Stack,
  Typography,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { dateConverter } from "../../utils/dateConverter";
import { Download } from "phosphor-react";

const ApplicantsCard = ({ applicants }) => {
  console.log("applicant from ApplicantCard", applicants);

  // Add safety checks
  if (!applicants || !Array.isArray(applicants)) {
    return <Typography>No applicants data available</Typography>;
  }

  return (
    <Box p={4}>
      {applicants.map((applicant, index) => {
        // Skip if applicant data is invalid
        if (!applicant?.candidateInfo) return null;

        return (
          <Box
            key={applicant.id || `applicant-${index}`}
            mb={2}
            border={1}
            width={250}
            borderRadius={2}
            borderColor={"#e0e0e0"}
          >
            <Stack direction="row" alignItems="center" spacing={2} p={2}>
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
                  {dateConverter(applicant.appliedDate) || "Date not available"}
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

            <Link
              to={`/candidates/${applicant.id}`}
              style={{ textDecoration: "none" }}
            >
              <Typography color="primary" textAlign="center" p={1}>
                View Profile
              </Typography>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
};

export default ApplicantsCard;

import { Box, Stack, Typography } from "@mui/material";

const ViewApplicantsDetailsModel = ({ applicant, onClose }) => {
  return (
    <Box
      width="700px"
      height="600px"
      bgcolor="white"
      p={4}
      borderRadius={2}
      boxShadow={4}
      position="relative"
    >
      <Typography
        onClick={onClose}
        color="error"
        sx={{ cursor: "pointer", position: "absolute", top: 16, right: 16 }}
      >
        Close
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h6" fontSize={28}>
          Applicant Details
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          p={2}
        >
          <Stack p={1} spacing={2}>
            <Stack spacing={2}>
              <Typography>
                <strong>Name</strong>: {applicant.candidateInfo.fullName}
              </Typography>
              <Typography>
                <strong>Title</strong>: {applicant.candidateInfo.title}
              </Typography>
              <Typography>
                <strong>Experience</strong>:{" "}
                {applicant.candidateInfo.experience}
              </Typography>
              <Typography>
                <strong>Biography</strong>: {applicant.profileInfo.biography}
              </Typography>
            </Stack>
            <Stack spacing={2}>
              <Typography>
                <strong>Education</strong>: {applicant.candidateInfo.education}
              </Typography>
              <Typography>
                <strong>Address</strong>: {applicant.contactInfo.address}
              </Typography>
              <Typography>
                <strong>Experience</strong>: {applicant.contactInfo.emial}
              </Typography>
              <Typography>
                <strong>Education</strong>: {applicant.contactInfo.phone}
              </Typography>
            </Stack>
          </Stack>

          <img
            src={applicant.candidateInfo.avatar}
            width={200}
            height={200}
            style={{ borderRadius: "30px", objectFit: "cover" }}
            alt="avatar"
          />
        </Stack>

        <a
          href={applicant.candidateInfo.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </a>
      </Stack>
    </Box>
  );
};

export default ViewApplicantsDetailsModel;

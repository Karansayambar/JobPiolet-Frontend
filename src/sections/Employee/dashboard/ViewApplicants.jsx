import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useViewApplicantsQuery } from "../../../services/jobsApi";
import { useParams } from "react-router-dom";
import ApplicantsCard from "../../../components/Common/ApplicantsCard";

const ViewApplicants = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useViewApplicantsQuery(id);
  const [applicants, setApplicants] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (data?.usersData) {
      console.log("Applicants data:", data.usersData);
      setApplicants(data.usersData);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4}>
        <Alert severity="error">
          Error loading applicants:{" "}
          {"status" in error
            ? JSON.stringify(error.data)
            : error.message || "Unknown error"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      p={4}
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
      height={"100vh"}
    >
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Applicants
        </Typography>

        {applicants?.length > 0 ? (
          <ApplicantsCard
            applicants={applicants}
            setApplicants={setApplicants}
          />
        ) : (
          <Typography variant="body1">
            No applicants found for this job posting.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ViewApplicants;

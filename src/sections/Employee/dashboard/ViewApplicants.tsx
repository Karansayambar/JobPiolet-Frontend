import { Box, Stack, Typography, CircularProgress, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useViewApplicantsQuery } from "../../../services/jobsApi";
import { useParams } from "react-router-dom";
import ApplicantsCard from "../../../components/Common/ApplicantsCard";
import { SerializedError } from "@reduxjs/toolkit";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  resumeUrl: string;
  // Add any other relevant fields
}

export interface ViewApplicantsResponse {
  usersData: Applicant[];
}

const ViewApplicants = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useViewApplicantsQuery(id);
  const [applicants, setApplicants] = useState([]);

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
            : (error as SerializedError).message || "Unknown error"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Applicants
        </Typography>

        {applicants?.length > 0 ? (
          <ApplicantsCard applicants={applicants} />
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

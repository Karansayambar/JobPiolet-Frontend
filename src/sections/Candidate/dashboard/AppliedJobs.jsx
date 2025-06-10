import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useGetAppliedJobsQuery } from "../../../services/jobsApi";
import notFound from "../../../assets/404.png";
import DashboardJobCard from "../../../components/Common/CandidateDashboardJobCard";

// src/types/jobTypes.ts

const AppliedJobs = () => {
  const { data, isLoading } = useGetAppliedJobsQuery();
  const [appliedJobs, setappliedJobs] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("applied jobs:", data.appliedJobs);
      setappliedJobs(data.appliedJobs);
    }
  }, [data]);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      {appliedJobs ? (
        <Stack
          flex={4}
          bgcolor="background.paper"
          p={3}
          borderRadius={2}
          overflow="auto" // or "scroll"
          height="800px" // Set a specific height
          sx={{
            "&::-webkit-scrollbar": { display: "none" }, // Hides scrollbar in Webkit browsers
          }}
        >
          <Typography variant="body1" fontWeight={600} fontSize={18} py={3}>
            Applied Jobs(598)
          </Typography>
          <Table>
            <TableHead>
              <TableRow
                sx={{ textTransform: "uppercase", bgcolor: "action.hover" }}
              >
                <TableCell>Jobs</TableCell>
                <TableCell>Date Applied</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <DashboardJobCard data={appliedJobs} />
            </TableBody>
          </Table>
        </Stack>
      ) : (
        <Stack alignItems={"center"}>
          <img style={{ width: "500px" }} src={notFound} alt="" />
          <Typography variant="body2" fontSize={30}>
            Not Applied Jobs Ate
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default AppliedJobs;

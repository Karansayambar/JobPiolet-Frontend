import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardJobCard from "../../../components/Common/CandidateDashboardJobCard";
import { useGetAppliedJobsQuery } from "../../../services/jobsApi";

const AppliedJobs: React.FC = () => {
  const { data, isLoading, isError } = useGetAppliedJobsQuery();
  const [appliedJobs, setappliedJobs] = useState([]);
  useEffect(() => {
    if (data) {
      console.log("applied jobs:", data.data);
      setappliedJobs(data.data);
    }
  }, [data]);
  return (
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
  );
};

export default AppliedJobs;

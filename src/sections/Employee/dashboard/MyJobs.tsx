import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardJobCard from "../../../components/Common/CompanyDashboardJobCard";
import { useEffect } from "react";
import { useGetAllJobsQuery } from "../../../services/jobsApi"; // Correct hook import
import NotFound from "../../../assets/404.png";

// src/types/jobTypes.ts

export interface Job {
  id: string;
  title: string;
  status: string;
  applications: number;
  // Add more fields based on your backend response
}

export interface AllJobsResponse {
  jobs: Job[];
}

const MyJobs: React.FC = () => {
  const { data, error, isLoading } = useGetAllJobsQuery(); // Use getAllJobs query here

  useEffect(() => {
    if (data) {
      console.log("Fetched Jobs:", data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh">
        <Typography>Error fetching jobs</Typography>
      </Stack>
    );
  }

  return (
    <>
      {data && data.jobs && data.jobs.length > 0 ? (
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
          {/* Statistics Cards */}
          <Stack py={4}>
            <Typography variant="h6">My Jobs</Typography>
          </Stack>

          {/* Jobs Table */}
          <Table>
            <TableHead>
              <TableRow
                sx={{ textTransform: "uppercase", bgcolor: "action.hover" }}
              >
                <TableCell>Jobs</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <DashboardJobCard jobDetails={data.jobs} />{" "}
              {/* Pass the jobs correctly */}
            </TableBody>
          </Table>
        </Stack>
      ) : (
        <Stack alignItems={"center"}>
          <img style={{ width: "500px" }} src={NotFound} alt="" />
          <Typography variant="body2" fontSize={30}>
            No jobs found
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default MyJobs;

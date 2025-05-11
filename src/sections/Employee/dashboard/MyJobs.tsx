import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardJobCard, {
  JobDashboard,
} from "../../../components/Common/CompanyDashboardJobCard";
import { useEffect, useState } from "react";
import { useGetMyJobsQuery } from "../../../services/jobsApi"; // Correct hook import
import NotFound from "../../../assets/404.png";

export interface AllJobsResponse {
  success: boolean;
  message: string;
  jobs: JobDashboard[];
}

const MyJobs: React.FC = () => {
  const { data, error, isLoading } = useGetMyJobsQuery();
  const [jobs, setJobs] = useState<JobDashboard[]>([]);

  useEffect(() => {
    if (data && data.jobs) {
      console.log("Fetched Jobs from my jobs:", data);
      setJobs(data.jobs);
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

  // Check if data exists and has jobs array
  // const jobs = data?.jobs || [];

  return (
    <>
      {jobs.length > 0 ? (
        <Stack
          flex={4}
          bgcolor="background.paper"
          p={3}
          borderRadius={2}
          overflow="auto"
          height="800px"
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Stack py={4}>
            <Typography variant="h6">My Jobs</Typography>
          </Stack>

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
              <DashboardJobCard jobDetails={jobs} />
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

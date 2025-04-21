import { ArrowForward, Check } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardJobCard from "../../../components/Common/CompanyDashboardJobCard";
import { useEffect } from "react";
import { useGetMyJobsQuery } from "../../../services/jobsApi";
const MyJobs: React.FC = () => {
  const theme = useTheme();

  const { data, isLoading, isError, error, refetch } = useGetMyJobsQuery();

  useEffect(() => {
    if (data) {
      console.log("Fetched Jobs:", data);
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
          {data && <DashboardJobCard jobDetails={data.jobs} />}{" "}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default MyJobs;

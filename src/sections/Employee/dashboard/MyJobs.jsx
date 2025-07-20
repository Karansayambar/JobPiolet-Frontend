import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import DashboardJobCard from "../../../components/Common/CompanyDashboardJobCard";
import { useEffect, useState } from "react";
import { useGetMyJobsQuery } from "../../../services/jobsApi"; // Correct hook import
import NotFound from "../../../assets/404.png";

const MyJobs = () => {
  const { data, error, isLoading } = useGetMyJobsQuery();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const theme = useTheme();

  useEffect(() => {
    if (data && data.jobs) {
      console.log("Fetched Jobs from my jobs:", data);
      setJobs(data.jobs);
    }
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedJobs = jobs.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
          borderRadius={2}
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Stack py={8}>
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
              <DashboardJobCard jobs={paginatedJobs} />
            </TableBody>
            <TablePagination
              component="div"
              count={jobs.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
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

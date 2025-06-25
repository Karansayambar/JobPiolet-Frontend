import {
  Stack,
  Table,
  TableBody,
  TablePagination,
  Typography,
} from "@mui/material";
import DashboardJobCard from "../../../components/Common/CandidateDashboardJobCard";
import useAlertJobs from "../../../hooks/useAlertJobs";
import { useState } from "react";

const JobAlerts = () => {
  const { jobsAlert, alertCount, message, isLoading } = useAlertJobs();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const paginatedJobs = jobsAlert.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
        {`Job Alerts ${alertCount}`}
      </Typography>
      <Table>
        <TableBody>{<DashboardJobCard data={paginatedJobs} />}</TableBody>
        <TablePagination
          component="div"
          count={jobsAlert.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Table>
    </Stack>
  );
};

export default JobAlerts;

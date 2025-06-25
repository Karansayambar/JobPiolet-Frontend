import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyDollarThin } from "react-icons/pi";
import { MdAccessTime, MdCancel, MdLock, MdWork } from "react-icons/md";
import {
  Button,
  Stack,
  styled,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { dateConverter } from "../../utils/dateConverter";
import CompanyLogo from "./CompanyLogo";

// Status color utility
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "success.main";
    case "pending":
      return "warning.main";
    case "rejected":
      return "error.main";
    default:
      return "text.secondary";
  }
};

// Styled chip for work mode
const JobModeChip = styled("div")(({ theme }) => ({
  borderRadius: 5,
  backgroundColor: "#E7F7FA",
  color: "#5c99dd",
  padding: "4px 10px",
  fontSize: "14px",
  fontWeight: 600,
  textAlign: "center",
  minWidth: 80,
}));

const DashboardJobCard = ({ data }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(data);
  }, [data]);

  return (
    <>
      {jobs?.map((job) => (
        <TableRow key={job._id}>
          <TableCell>
            <Stack direction="row" alignItems="center" spacing={2}>
              <CompanyLogo companyName={job?.companyName} size={50} />

              <Stack spacing={0.5}>
                <Typography fontWeight="bold" variant="subtitle1">
                  {job.jobTitle || job?.jobDetails?.jobTitle}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <JobModeChip>
                    {job.workMode || job?.jobDetails?.workMode || "On-site"}
                  </JobModeChip>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <CiLocationOn size={18} />
                    <Typography variant="body2">
                      {(
                        job?.city ||
                        job?.jobDetails?.city ||
                        "N/A"
                      ).toUpperCase()}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <PiCurrencyDollarThin size={18} />
                    <Typography variant="body2">
                      ₹{job.minSalary || job?.jobDetails?.minSalary} - ₹
                      {job.maxSalary || job?.jobDetails?.maxSalary}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </TableCell>

          <TableCell>
            <Typography variant="body2">
              {dateConverter(job.createdAt || job.applicationDate)}
            </Typography>
          </TableCell>

          <TableCell>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              color={getStatusColor(job.status)}
            >
              {job.status?.toLowerCase() === "active" ? (
                <MdWork size={20} />
              ) : job.status?.toLowerCase() === "pending" ? (
                <MdAccessTime size={20} />
              ) : job.status?.toLowerCase() === "rejected" ? (
                <MdCancel size={20} />
              ) : (
                <MdLock size={20} />
              )}
              <Typography variant="body2" fontWeight="bold">
                {job.status || "N/A"}
              </Typography>
            </Stack>
          </TableCell>

          <TableCell>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                textTransform: "capitalize",
                fontWeight: 500,
                borderRadius: 2,
              }}
              onClick={() =>
                navigate(`/candidate/findjob/${job._id ?? job.jobDetails?._id}`)
              }
            >
              View Details
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DashboardJobCard;

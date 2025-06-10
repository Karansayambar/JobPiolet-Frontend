import { useEffect, useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyDollarThin } from "react-icons/pi";
import {
  Button,
  Stack,
  styled,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { MdAccessTime, MdCancel, MdLock, MdWork } from "react-icons/md";
import { dateConverter } from "../../utils/dateConverter";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "./CompanyLogo";

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "success.main";
    case "Pending":
      return "warning.main";
    case "Rejected":
      return "error.main";
    default:
      return "text.secondary";
  }
};

export const JobModeChip = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 5,
  backgroundColor: `#E7F7FA`,
  textTransform: "capitalize",
  color: "#5c99dd",
  padding: "4px 8px",
  fontSize: "16px",
  fontWeight: 600,
  marginRight: theme.spacing(2),
  width: "80px",
  textAlign: "center",
}));

const DashboardJobCard = ({ data }) => {
  const navigate = useNavigate();
  const [job, setJob] = useState([]);

  useEffect(() => {
    setJob(data);
  }, [data]);

  return (
    <>
      {job?.map((job) => (
        <TableRow key={job._id}>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={2}>
              {/* <img
                src={logo}
                height={50}
                alt="Company Logo"
                style={{ backgroundColor: "#E7F7FA", padding: "4px" }}
              /> */}
              <CompanyLogo companyName={job?.companyName} size={40} />

              <Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography fontWeight="bold">
                    {job.jobTitle || job?.jobDetails?.jobTitle}
                  </Typography>
                  <JobModeChip>
                    {job.workMode || job?.jobDetails?.workMode
                      ? "Remote"
                      : "On-site"}
                  </JobModeChip>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CiLocationOn size={20} />
                    <Typography variant="body2">
                      {(
                        job?.city ||
                        job?.jobDetails?.city ||
                        "N/A"
                      ).toUpperCase()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PiCurrencyDollarThin size={20} />
                    <Typography variant="body2">
                      {job.minSalary || job?.jobDetails?.minSalary} -
                      {job.maxSalary || job?.jobDetails?.minSalary}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography>{dateConverter(job.createdAt)}</Typography>
          </TableCell>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={1}>
              <Stack
                color={getStatusColor(job.status)}
                alignItems={"center"}
                direction={"row"}
                gap={1}
              >
                {job.status === "Active" ? (
                  <MdWork color="green" />
                ) : job.status === "Pending" ? (
                  <MdAccessTime color="orange" />
                ) : job.status === "Rejected" ? (
                  <MdCancel color="red" />
                ) : (
                  <MdLock color="gray" />
                )}
                {job.status}
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Button
              variant="contained"
              onClick={() => {
                console.log("jobId", job);
                navigate(
                  `/candidate/findjob/${job._id ?? job.jobDetails?._id}`
                );
              }}
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

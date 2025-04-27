import React, { useEffect, useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyDollarThin } from "react-icons/pi";
import logo from "../../assets/auth/Rectangle 43.png";
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

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  dateApplied: string;
  status: "Active" | "Pending" | "Rejected";
  remote: boolean;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "Networking Engineer",
    location: "Washington",
    salary: "$50k-80k/month",
    dateApplied: "Feb 2, 2019 19:28",
    status: "Active",
    remote: true,
  },
  {
    id: 2,
    title: "Frontend Developer",
    location: "San Francisco",
    salary: "$70k-100k/month",
    dateApplied: "Mar 5, 2023 15:20",
    status: "Pending",
    remote: false,
  },
  {
    id: 3,
    title: "Software Engineer",
    location: "New York",
    salary: "$90k-120k/month",
    dateApplied: "Jan 18, 2023 11:45",
    status: "Active",
    remote: true,
  },
  {
    id: 4,
    title: "Data Analyst",
    location: "Chicago",
    salary: "$60k-85k/month",
    dateApplied: "Apr 12, 2022 08:30",
    status: "Rejected",
    remote: false,
  },
  {
    id: 5,
    title: "Cloud Architect",
    location: "Seattle",
    salary: "$100k-140k/month",
    dateApplied: "Jul 7, 2022 14:10",
    status: "Active",
    remote: true,
  },
  {
    id: 6,
    title: "Cybersecurity Analyst",
    location: "Austin",
    salary: "$80k-110k/month",
    dateApplied: "Oct 21, 2023 09:50",
    status: "Pending",
    remote: false,
  },
  {
    id: 7,
    title: "Product Manager",
    location: "Boston",
    salary: "$110k-150k/month",
    dateApplied: "Dec 1, 2021 16:30",
    status: "Rejected",
    remote: true,
  },
  {
    id: 8,
    title: "DevOps Engineer",
    location: "Los Angeles",
    salary: "$95k-125k/month",
    dateApplied: "Nov 3, 2022 12:00",
    status: "Active",
    remote: false,
  },
  {
    id: 9,
    title: "Machine Learning Engineer",
    location: "Denver",
    salary: "$120k-160k/month",
    dateApplied: "May 30, 2023 13:45",
    status: "Pending",
    remote: true,
  },
  {
    id: 10,
    title: "Backend Developer",
    location: "Houston",
    salary: "$85k-115k/month",
    dateApplied: "Aug 17, 2021 10:15",
    status: "Rejected",
    remote: false,
  },
];

const getStatusColor = (status: Job["status"]): string => {
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
      {job?.map((job: Job) => (
        <TableRow key={job.id}>
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
                      {job?.city?.toUpperCase() ||
                        job?.jobDetails?.city.toUpperCase()}
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
                navigate(`/candidate/findjob/${job._id || job.jobDetails._id}`);
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

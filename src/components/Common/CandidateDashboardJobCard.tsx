import React from "react";

import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyDollarThin } from "react-icons/pi";
import logo from "../../assets/auth/Rectangle 43.png";
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";

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

const DashboardJobCard = () => {
  return (
    <>
      {jobs.map((job: Job) => (
        <TableRow key={job.id}>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={2}>
              <img src={logo} height={50} alt="Company Logo" />
              <Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography fontWeight="bold">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.remote ? "Remote" : "On-site"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CiLocationOn size={20} />
                    <Typography variant="body2">{job.location}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PiCurrencyDollarThin size={20} />
                    <Typography variant="body2">{job.salary}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography>{job.dateApplied}</Typography>
          </TableCell>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography color={getStatusColor(job.status)}>
                {job.status}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Button variant="contained">View Details</Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DashboardJobCard;

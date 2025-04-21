import React from "react";

import { CiLocationOn } from "react-icons/ci";
import { PiCurrencyDollarThin } from "react-icons/pi";
import logo from "../../assets/auth/Rectangle 43.png";
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { dateConverter } from "../../utils/dateConverter";

interface Job {
  id: number;
  title: string;
  dateApplied: string;
  applicants: string;
  status: "ActivPendinge" | "Pending" | "Expire";
  type: string;
}

// const jobs: Job[] = [
//   {
//     id: 1,
//     title: "Networking Engineer",
//     dateApplied: "Feb 2, 2019 19:28",
//     status: "Active",
//     applicants: "340 Applicants",
//     type: "internship",
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     dateApplied: "Mar 5, 2023 15:20",
//     status: "Expire",
//     applicants: "140 Applicants",
//     type: "fulltime",
//   },
//   {
//     id: 3,
//     title: "Software Engineer",
//     dateApplied: "Jan 18, 2023 11:45",
//     status: "Active",
//     applicants: "840 Applicants",
//     type: "internship",
//   },
//   {
//     id: 4,
//     title: "Data Analyst",
//     applicants: "240 Applicants",
//     dateApplied: "Apr 12, 2022 08:30",
//     status: "Expire",
//     type: "fulltime",
//   },
//   {
//     id: 5,
//     title: "Cloud Architect",
//     applicants: "340 Applicants",
//     dateApplied: "Jul 7, 2022 14:10",
//     status: "Active",
//     type: "internship",
//   },
//   {
//     id: 6,
//     title: "Cybersecurity Analyst",
//     dateApplied: "Oct 21, 2023 09:50",
//     status: "Active",
//     applicants: "340 Applicants",
//     type: "fulltime",
//   },
//   {
//     id: 7,
//     title: "Product Manager",
//     dateApplied: "Dec 1, 2021 16:30",
//     status: "Expire",
//     applicants: "340 Applicants",
//     type: "fulltime",
//   },
//   {
//     id: 8,
//     title: "DevOps Engineer",
//     dateApplied: "Nov 3, 2022 12:00",
//     status: "Active",
//     applicants: "940 Applicants",
//     type: "fulltime",
//   },
//   {
//     id: 9,
//     title: "Machine Learning Engineer",
//     dateApplied: "May 30, 2023 13:45",
//     status: "Active",
//     applicants: "140 Applicants",
//     type: "internship",
//   },
//   {
//     id: 10,
//     title: "Backend Developer",
//     dateApplied: "Aug 17, 2021 10:15",
//     status: "Expire",
//     applicants: "40 Applicants",
//     type: "fulltime",
//   },
// ];

const getStatusColor = (status: Job["status"]): string => {
  switch (status) {
    case "open":
      return "success.main";
    case "closed":
      return "error.main";
    default:
      return "text.secondary";
  }
};

const DashboardJobCard = ({ jobDetails }: { jobDetails: any }) => {
  console.log("job details", jobDetails);

  return (
    <>
      {jobDetails.map((job: Job) => (
        <TableRow key={job.id}>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={2}>
              <Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography fontWeight="bold">{job.jobTitle}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body2">{job.workMode}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <PiCurrencyDollarThin size={20} />
                    <Typography variant="body2">
                      {dateConverter(job.updatedAt)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography color={getStatusColor(job.jobStatus)}>
                {job.jobStatus}
              </Typography>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography>
              {job.applicants.length > 0 ? job.applicants.length : 0}
            </Typography>
          </TableCell>
          <TableCell>
            <Button variant="contained">View Applicants</Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DashboardJobCard;

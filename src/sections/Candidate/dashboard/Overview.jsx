import { ArrowForward } from "@mui/icons-material";
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
import { IoBag } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaBell } from "react-icons/fa";

import { useGetAllJobsQuery } from "../../../services/jobsApi";
import { useEffect, useState } from "react";
import DashboardJobCard from "../../../components/Common/CandidateDashboardJobCard";
import { createSocket } from "../../../utils/socket";

const Overview = () => {
  const theme = useTheme();
  const [jobs, setJobs] = useState([]);

  // const { data } = useGetAllJobsQuery();

  // useEffect(() => {
  //   if (data) {
  //     console.log("Fetched Jobs:", data.jobs);
  //     const allJobs = data.jobs;
  //     setJobs(allJobs);
  //   }
  // }, [data]);

  useEffect(() => {
    const userJobTitle = localStorage.getItem("title")?.toLowerCase();

    // Create socket after token is saved
    const socket = createSocket();

    // On connect, then emit
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("getJobsForUser");
    });

    // Listen for jobs
    socket.on("jobsForUser", (data) => {
      console.log("Received jobs:", data);
      if (data.success) {
        setJobs(data.matchingJobs);
      } else {
        console.error(data.message);
        setJobs([]);
        setMessage(data.message);
      }
    });

    // Listen for new job broadcast
    socket.on("newJobPosted", (newJob) => {
      if (userJobTitle) {
        if (
          newJob.jobRole.toLowerCase().includes(userJobTitle) ||
          newJob.jobTitle.toLowerCase().includes(userJobTitle)
        ) {
          setJobs((prevJobs) => [...prevJobs, newJob]);
          alert(`New matching job: ${newJob.jobRole}`);
        }
      }
    });

    // Clean up on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const stats = [
    { label: "Applied Jobs", count: 2, icon: <IoBag size={30} /> },
    { label: "Favorite Jobs", count: 1, icon: <CiBookmark size={30} /> },
    { label: "Job Alerts", count: 0, icon: <FaBell size={30} /> },
  ];

  const bgColors = ["#D6E6FF", "#FFE6CC", "#D4EDDA"]; // Light Blue, Light Orange, Light Green

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
      {/* Welcome Message */}
      <Typography variant="h6">Hello, Easter Howard</Typography>
      <Typography variant="body1" color="text.secondary">
        Here is your daily activities and job alerts
      </Typography>

      {/* Statistics Cards */}
      <Stack direction="row" gap={3} py={3} flexWrap="wrap">
        {stats.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderRadius={2}
            p={2}
            width={280}
            sx={{
              backgroundColor: bgColors[index],
            }}
          >
            <Box>
              <Typography variant="h4">{item.count}</Typography>
              <Typography color="text.secondary">{item.label}</Typography>
            </Box>
            <Box color={theme.palette.primary.main}>{item.icon}</Box>
          </Stack>
        ))}
      </Stack>

      {/* Profile Completion Card */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        bgcolor="#E05151"
        borderRadius={3}
        color="white"
      >
        <Stack direction="row" alignItems="center" gap={3}>
          <Avatar sx={{ bgcolor: "white", color: "#E05151" }} />
          <Stack>
            <Typography variant="body1" fontWeight="bold">
              Your profile editing is not completed
            </Typography>
            <Typography variant="body2">
              Complete your profile to build your custom resume.
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        >
          Edit Profile <ArrowForward />
        </Button>
      </Stack>

      {/* Recently Applied Jobs */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
      >
        <Typography variant="h6">Recently Applied</Typography>
        <Button endIcon={<ArrowForward />}>View All</Button>
      </Stack>

      {/* Jobs Table */}
      <Table>
        <TableHead>
          <TableRow
            sx={{ textTransform: "uppercase", bgcolor: "action.hover" }}
          >
            <TableCell>Jobs</TableCell>
            <TableCell>Date Applied</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <DashboardJobCard data={jobs} />
        </TableBody>
      </Table>
    </Stack>
  );
};

export default Overview;

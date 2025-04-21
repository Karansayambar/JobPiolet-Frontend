import { ArrowForward, Check, Pin } from "@mui/icons-material";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Star, Bell, Gear, StackOverflowLogo } from "phosphor-react";
import { BsSuitcaseLg } from "react-icons/bs";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Overview from "../../sections/Candidate/dashboard/Overview";
import AppliedJobs from "../../sections/Candidate/dashboard/AppliedJobs";
import FavoriteJobs from "../../sections/Candidate/dashboard/FavoriteJobs";
import JobAlerts from "./JobAlerts";
import Settings from "../../sections/Candidate/dashboard/Settings/Settings";

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState<string>("Overview");

  const menuItems = [
    {
      id: 0,
      label: "Overview",
      icon: <StackOverflowLogo size={20} />,
      component: <Overview />,
    },
    {
      id: 1,
      label: "Applied Jobs",
      icon: <BsSuitcaseLg size={20} />,
      component: <AppliedJobs />,
    },
    {
      id: 2,
      label: "Favorite Jobs",
      icon: <Star size={20} />,
      component: <FavoriteJobs />,
    },
    {
      id: 3,
      label: "Job Alerts",
      icon: <Bell size={20} />,
      component: <JobAlerts />,
    },
    {
      id: 4,
      label: "Settings",
      icon: <Gear size={20} />,
      component: <Settings />,
    },
  ];

  return (
    <Box py={5}>
      <Divider />
      <Stack direction="row" spacing={5} px={30} py={3}>
        {/* Left Sidebar */}
        <Stack flex={1} spacing={2}>
          <Typography
            variant="body1"
            color="grey"
            sx={{ textTransform: "uppercase" }}
          >
            Candidate Dashboard
          </Typography>
          {menuItems.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
              bgcolor={
                item.label === selectedSection
                  ? "#D6E6FF"
                  : theme.palette.background
              }
              mb={1}
              sx={{
                cursor: "pointer",
                p: 2,
                borderRadius: 1,
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
              onClick={() => setSelectedSection(item.label)}
            >
              {item.icon}
              <Typography>{item.label}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider orientation="vertical" flexItem />

        {/* Right Content Area */}
        <Box flex={4}>
          {menuItems.find((item) => item.label === selectedSection)?.component}
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;

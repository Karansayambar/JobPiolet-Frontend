import {
  Box,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Star,
  Bell,
  Gear,
  StackOverflowLogo,
  ArrowsInLineHorizontal,
  ArrowsOutLineHorizontal,
  User,
  Moon,
  Sun,
} from "phosphor-react";
import { BsSuitcaseLg } from "react-icons/bs";

import { useEffect, useState } from "react";
import Overview from "../../sections/Candidate/dashboard/Overview";
import AppliedJobs from "../../sections/Candidate/dashboard/AppliedJobs";
import FavoriteJobs from "../../sections/Candidate/dashboard/FavoriteJobs";
import Settings from "../../sections/Candidate/dashboard/Settings/Settings";
import ProfilePage from "../../sections/Candidate/dashboard/ProfilePage";
import JobAlerts from "../../sections/Candidate/dashboard/JobAlerts";
import { useGetCandidateProfileQuery } from "../../services/candidateApi";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

const menuItems = [
  {
    id: 0,
    label: "Overview",
    icon: <StackOverflowLogo size={23} />,
    component: <Overview />,
  },
  {
    id: 1,
    label: "Applied Jobs",
    icon: <BsSuitcaseLg size={23} />,
    component: <AppliedJobs />,
  },
  {
    id: 2,
    label: "Favorite Jobs",
    icon: <Star size={23} />,
    component: <FavoriteJobs />,
  },
  {
    id: 3,
    label: "Job Alerts",
    icon: <Bell size={23} />,
    component: <JobAlerts />,
  },
  {
    id: 4,
    label: "Settings",
    icon: <Gear size={23} />,
    component: <Settings />,
  },
  {
    id: 5,
    label: "Profile",
    icon: <User size={23} />,
    component: <ProfilePage />,
  },
];

const DashboardPage = () => {
  const { data, isLoading, error } = useGetCandidateProfileQuery();
  const theme = useTheme();
  const [sideMenum, setSideMenu] = useState(false);
  const dispatch = useDispatch();

  const [selectedSection, setSelectedSection] = useState("Overview");
  const { themeMode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (data) {
      console.log("profile data of user", data);
      setSelectedSection("Overview");
    } else {
      setSelectedSection("Settings");
    }
  }, [data]);
  const handleToggleSidebar = () => {
    setSideMenu(!sideMenum);
  };

  return (
    <Box
      py={5}
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "20px",
      }}
      height={"100vh"}
    >
      <Divider />
      <Stack direction="row" spacing={5} px={3} py={3}>
        {/* Left Sidebar */}
        <Stack gap={3}>
          {sideMenum && (
            <Typography
              variant="body1"
              color="grey"
              sx={{ textTransform: "uppercase" }}
            >
              Candidate Dashboard
            </Typography>
          )}
          {menuItems.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={3}
              alignItems="center"
              bgcolor={
                item.label === selectedSection
                  ? themeMode === "dark"
                    ? "#6480acff"
                    : "#D6E6FF"
                  : theme.palette.background.paper
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
              <Tooltip title={item.label} placement="top-start" arrow>
                <IconButton p={2}>{item.icon}</IconButton>
              </Tooltip>
              {sideMenum && <Typography>{item.label}</Typography>}
            </Stack>
          ))}
          {/* Sidebar Toggle Button */}
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              cursor: "pointer",
              p: 1,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              transition: "background-color 0.2s ease",
            }}
          >
            {themeMode === "dark" ? (
              <Moon size={28} onClick={() => dispatch(toggleTheme())} />
            ) : (
              <Sun size={28} onClick={() => dispatch(toggleTheme())} />
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={sideMenum ? "space-between" : "flex-start"}
            gap={1}
            sx={{
              cursor: "pointer",
              p: 1,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
              transition: "background-color 0.2s ease",
            }}
            onClick={handleToggleSidebar}
          >
            {sideMenum ? (
              <>
                <ArrowsInLineHorizontal size={28} />
                <Typography variant="body2" color="text.secondary">
                  Hide
                </Typography>
              </>
            ) : (
              <ArrowsOutLineHorizontal size={28} />
            )}
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />

        {/* Right Content Area */}
        <Box flex={4}>
          {menuItems.find((item) => item.label === selectedSection)?.label ===
          "Overview" ? (
            <Overview onEditProfile={() => setSelectedSection("Settings")} />
          ) : (
            menuItems.find((item) => item.label === selectedSection)?.component
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default DashboardPage;

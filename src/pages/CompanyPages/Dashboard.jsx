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
  ArrowsInLineHorizontal,
  ArrowsOutLineHorizontal,
  Gear,
  Moon,
  StackOverflowLogo,
  Sun,
} from "phosphor-react";
import { BsSuitcaseLg } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineFactCheck } from "react-icons/md";
import OverviewCompany from "../../sections/Employee/dashboard/OverviewCaompany";
import SavedCandidatesList from "../../sections/Employee/dashboard/SavedCandidatesList";
import PostAJob from "../../sections/Employee/dashboard/PostAJob";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/slices/authSlice";
import CompanyProfile from "../../sections/Employee/dashboard/CompanyProfile";
import MyJobs from "../../sections/Employee/dashboard/MyJobs";
import PlansAndBillingPage from "../../sections/Employee/dashboard/PlansAndBillingPage";
import Settings from "../../sections/Employee/dashboard/Settings/Settings";
import { toggleTheme } from "../../redux/slices/themeSlice";

const menuItems = [
  {
    label: "Overview",
    icon: <StackOverflowLogo size={25} />,
    component: <OverviewCompany />,
  },
  {
    label: "Company Profile",
    icon: <CgProfile size={25} />,
    component: <CompanyProfile />,
  },
  {
    label: "Post a Job",
    icon: <IoAddCircleSharp size={25} />,
    component: <PostAJob />,
  },
  {
    label: "My Jobs",
    icon: <BsSuitcaseLg size={25} />,
    component: <MyJobs />,
  },
  {
    label: "Saved Candidate",
    icon: <CiBookmark size={25} />,
    component: <SavedCandidatesList />,
  },
  {
    label: "Plans and Belling",
    icon: <MdOutlineFactCheck size={25} />,
    component: <PlansAndBillingPage />,
  },
  { label: "Settings", icon: <Gear size={25} />, component: <Settings /> },
];

const DashboardPage = () => {
  const { themeMode } = useSelector((state) => state.theme);
  const theme = useTheme();
  console.log("themeMode", themeMode);
  console.log("theme", theme);

  useEffect(() => {
    console.log("Theme object:", theme);
  }, [theme]);
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState("Overview");
  const dispatch = useDispatch();
  const [sideMenum, setSideMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("profileCreated");
    localStorage.removeItem("companyProfile");
    dispatch(signOut());
    navigate("/");
  };

  const handleToggleSidebar = () => {
    setSideMenu(!sideMenum);
  };
  return (
    <Stack
      direction="row"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: "20px",
      }}
    >
      {/* Left Sidebar */}
      <Stack alignItems={"center"} p={3}>
        <Stack flex={1} gap={2}>
          {sideMenum && (
            <Typography
              variant="body1"
              color="grey"
              sx={{ textTransform: "uppercase" }}
            >
              Company Dashboard
            </Typography>
          )}
          {menuItems.map((item, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                cursor: "pointer",
                p: 2,
                borderRadius: 1,
                "&:hover": { backgroundColor: theme.palette.action.hover },
                background:
                  selectedSection === item.label
                    ? theme.palette.background.paper
                    : "",
              }}
              onClick={() => setSelectedSection(item.label)}
            >
              <Tooltip title={item.label} placement="top-start" arrow>
                <IconButton>{item.icon}</IconButton>
              </Tooltip>

              {sideMenum && <Typography>{item.label}</Typography>}
            </Stack>
          ))}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between" // Ensures items stretch across the container
          sx={{
            cursor: "pointer",
            p: 1,
            borderRadius: 1,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            transition: "background-color 0.2s ease", // Smooth hover effect
            marginY: 2,
          }}
        >
          {/* Sidebar Toggle Button (Collapse/Expand) */}
          <Stack direction="column" spacing={2} sx={{ p: 1 }}>
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
            {/* Sidebar Toggle Button */}
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

            {/* Logout Button (Appears Below) */}
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
              onClick={(e) => {
                e.stopPropagation();
                handleLogout();
              }}
            >
              {sideMenum && (
                <Typography variant="body2" color="text.secondary">
                  Logout
                </Typography>
              )}
              <CgLogOut size={25} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Divider orientation="vertical" flexItem />

      {/* Right Content Area */}
      <Box
        flex={4}
        height={"100vh"}
        overflow={"scroll"}
        bgcolor={"#f8f9fa"}
        px={10}
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {menuItems.find((item) => item.label === selectedSection)?.component}
      </Box>
      {/* <Box flex={2}></Box> */}
    </Stack>
  );
};

export default DashboardPage;

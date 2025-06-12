import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Gear, StackOverflowLogo } from "phosphor-react";
import { BsSuitcaseLg } from "react-icons/bs";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Overview from "../../sections/Candidate/dashboard/Overview";
import { IoAddCircleSharp } from "react-icons/io5";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineFactCheck } from "react-icons/md";
import { MdChecklistRtl } from "react-icons/md";
import OverviewCompany from "../../sections/Employee/dashboard/OverviewCaompany";
import SavedCandidatesList from "../../sections/Employee/dashboard/SavedCandidatesList";
import PostAJob from "../../sections/Employee/dashboard/PostAJob";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/slices/authSlice";
import CompanyProfile from "../../sections/Employee/dashboard/CompanyProfile";
import MyJobs from "../../sections/Employee/dashboard/MyJobs";
import PlansAndBillingPage from "../../sections/Employee/dashboard/PlansAndBillingPage";
import Settings from "../../sections/Employee/dashboard/Settings/Settings";

const DashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedSection, setSelectedSection] = useState("Overview");
  const dispatch = useDispatch();

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
    {
      label: "All Companies",
      icon: <MdChecklistRtl size={25} />,
      component: <Overview />,
    },
    { label: "Settings", icon: <Gear size={25} />, component: <Settings /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("profileCreated");
    localStorage.removeItem("companyProfile");
    dispatch(signOut());
    navigate("/");
  };
  return (
    <Box py={5}>
      <Divider />
      <Stack direction="row" spacing={5} px={30} py={3}>
        {/* Left Sidebar */}
        <Stack alignItems={"center"}>
          <Stack flex={1}>
            <Typography
              variant="body1"
              color="grey"
              sx={{ textTransform: "uppercase" }}
            >
              Company Dashboard
            </Typography>
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
                }}
                onClick={() => setSelectedSection(item.label)}
              >
                {item.icon}
                <Typography>{item.label}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Typography>Logout</Typography>
            <CgLogOut size={25} onClick={() => handleLogout()} />
          </Stack>
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

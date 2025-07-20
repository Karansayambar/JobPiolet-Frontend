import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { Faders, MagnifyingGlass } from "phosphor-react";
import { PinDropOutlined } from "@mui/icons-material";
import JobCard from "../../components/Common/JobCard";
import CustomIcons from "../../utils/PaginationItem";
import SideBar from "../../sections/Candidate/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllJobsQuery } from "../../services/jobsApi";
import { getAllJobs } from "../../redux/slices/jobSlice";
const FindJob = () => {
  const theme = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const itemsPerPage = 12;
  const [allJobs, setAllJobs] = useState([]);
  const { data: data } = useGetAllJobsQuery();
  const dispatch = useDispatch();
  const { filteredJobs } = useSelector((state) => state.jobs.filteredJobs);

  useEffect(() => {
    if (data?.jobs) {
      setJobs(data?.jobs);
      setAllJobs(data?.jobs);
      dispatch(getAllJobs(data?.jobs));
      // console.log("jobs", data);
    }
  }, [data, filteredJobs, dispatch]);
  // const userJobTitle = localStorage.getItem("title")?.toLowerCase();

  // useEffect(() => {
  //   const userJobTitle = localStorage.getItem("title")?.toLowerCase();

  //   // Create socket after token is saved
  //   const socket = createSocket();

  //   // On connect, then emit
  //   socket.on("connect", () => {
  //     console.log("Socket connected:", socket.id);
  //     socket.emit("getJobsForUser");
  //   });

  //   // Listen for jobs
  //   socket.on("jobsForUser", (data) => {
  //     console.log("Received jobs:", data);
  //     if (data.success) {
  //       setJobs(data.matchingJobs);
  //       setAllJobs(data.matchingJobs);
  //     } else {
  //       console.error(data.message);
  //       setJobs([]);
  //       setMessage(data.message);
  //     }
  //   });

  //   // Listen for new job broadcast
  //   socket.on("newJobPosted", (newJob) => {
  //     if (userJobTitle) {
  //       if (
  //         newJob.jobRole.toLowerCase().includes(userJobTitle) ||
  //         newJob.jobTitle.toLowerCase().includes(userJobTitle)
  //       ) {
  //         setJobs((prevJobs) => [...prevJobs, newJob]);
  //         alert(`New matching job: ${newJob.jobRole}`);
  //       }
  //     }
  //   });

  //   // Clean up on unmount
  //   return () => {
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  const handleSidebarClose = () => {
    setShowSidebar(false);
  };

  const handleSidebarOpen = () => {
    setShowSidebar(true);
  };

  const handlePageChange = (event, value) => {
    console.log("Page changed to:", value);
    setPage(value);
  };

  // Filter jobs based on search input
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue) {
      setJobs(allJobs); // Reset to all jobs if search input is empty
      return;
    }
    const filteredJobs = jobs?.filter(
      (job) =>
        console.log("Job:", job) ||
        job.jobTitle.toLowerCase().includes(searchValue) ||
        job.jobRole.toLowerCase().includes(searchValue) ||
        job.companyName.toLowerCase().includes(searchValue) ||
        job.city.toLowerCase().includes(searchValue)
    );
    setJobs(filteredJobs);
  };

  const handleFilterChange = (filters) => {};
  console.log("Filtered Jobs:", filteredJobs);

  const startIndex = (page - 1) * itemsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  return (
    <>
      <Box
        bgcolor={theme.palette.background.default}
        color={theme.palette.text.primary}
        height={"100vh"}
      >
        {/* Header */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={3}
          px={30}
          bgcolor={theme.palette.background.paper}
          color={theme.palette.text.primary}
        >
          <Typography>Job Details</Typography>
          <Typography>Home / Find Job /</Typography>
        </Stack>

        {/* Search & Filter */}
        <Stack direction={"row"} alignItems={"center"} px={30} py={3}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{
              border: `1px solid ${theme.palette.grey[300]}`,
              borderRadius: 1,
              px: 2,
              py: 1,
              width: "100%",
            }}
            bgcolor={theme.palette.background.paper}
            color={theme.palette.text.primary}
          >
            {/* Search by title */}
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" size={18} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Job title, keyword, company"
                inputProps={{ "aria-label": "JobTitle, Company" }}
                value={searchInput}
                onChange={(e) => handleSearch(e)}
              />
            </Search>

            <Divider orientation="vertical" flexItem />

            {/* Search by location */}
            {/* <Search>
              <SearchIconWrapper>
                <PinDropOutlined style={{ color: "#709CE6", fontSize: 18 }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Your Location"
                inputProps={{ "aria-label": "location" }}
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </Search> */}

            {/* Buttons */}
            <Stack gap={2} direction={"row"}>
              <Button
                variant="outlined"
                onClick={handleSidebarOpen}
                sx={{
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  width: "200px",
                  gap: "10px",
                }}
              >
                <Faders size={25} />
                Filters
              </Button>
              <Button
                variant="contained"
                sx={{
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  width: "200px",
                }}
              >
                Find Job
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {/* Jobs Grid */}
        <Stack
          px={10}
          spacing={3}
          gap={3}
          direction="column"
          alignItems={"center"}
          sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {currentJobs?.map((job, index) => (
            <JobCard key={`${job.id} - ${index}`} job={job} />
          ))}
        </Stack>

        {/* Pagination */}
        <CustomIcons
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>

      {/* Filter Sidebar */}
      {showSidebar && <SideBar handleSidebarClose={handleSidebarClose} />}
    </>
  );
};

export default FindJob;

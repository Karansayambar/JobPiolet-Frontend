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
import { useSelector } from "react-redux";
import { useGetAllJobsQuery } from "../../services/jobsApi";

const FindJob = () => {
  const theme = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [quickFilter, setQuickFilter] = useState([]);
  const [advanceFilters, setAdvanceFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const itemsPerPage = 12;

  const { data: data } = useGetAllJobsQuery();

  useEffect(() => {
    if (data?.jobs) {
      setJobs(data?.jobs);
      console.log("jobs", data);
    }
  }, [data]);

  const filters = useSelector((state) => state.jobs.filters);
  const handleSearch = () => {
    const parsedFilters = {};
    Object.values(filters).forEach((item) => {
      const [key, value] = item.split(":").map((str) => str.trim());
      if (key && value) parsedFilters[key] = value;
    });
    console.log("parsedFilters", parsedFilters);

    const quick = jobs.filter(
      (el) =>
        el.location.toLowerCase().includes(locationInput.toLowerCase()) ||
        el.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    const advance = jobs.filter((el) => {
      const jobTypeMatch = parsedFilters["Job-Type"]
        ? el.type.toLowerCase().trim().normalize() ===
          parsedFilters["Job-Type"].toLowerCase().trim().normalize()
        : true;

      const locationMatch = parsedFilters.Location
        ? el.location.toLowerCase().trim().normalize() ===
          parsedFilters.Location.toLowerCase().trim().normalize()
        : true;

      const roleMatch = parsedFilters.Role
        ? el.title.toLowerCase().trim().normalize() ===
          parsedFilters.Role.toLowerCase().trim().normalize()
        : true;
      console.log(jobTypeMatch, locationMatch, roleMatch);
      return jobTypeMatch || locationMatch || roleMatch;
    });

    console.log("advance", advance);
    console.log("quick", quick);

    if (Object.keys(parsedFilters).length > 0) {
      setAdvanceFilters(advance);
      setQuickFilter([]);
    } else if (searchInput || locationInput) {
      setQuickFilter(quick);
      setAdvanceFilters([]);
    } else {
      setAdvanceFilters([]);
      setQuickFilter([]);
      setPage(1); // Reset to first page on new search
    }
  };

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

  // 🔥 Final data to display
  const finalData =
    advanceFilters.length > 0
      ? advanceFilters
      : quickFilter.length > 0
      ? quickFilter
      : jobs;

  const startIndex = (page - 1) * itemsPerPage;
  const currentJobs = finalData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(finalData.length / itemsPerPage);

  return (
    <>
      <Box>
        {/* Header */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={3}
          px={30}
          bgcolor={theme.palette.grey[100]}
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
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Search>

            <Divider orientation="vertical" flexItem />

            {/* Search by location */}
            <Search>
              <SearchIconWrapper>
                <PinDropOutlined style={{ color: "#709CE6", fontSize: 18 }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Your Location"
                inputProps={{ "aria-label": "location" }}
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
              />
            </Search>

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
                onClick={handleSearch}
              >
                Find Job
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {/* Jobs Grid */}
        <Stack
          px={30}
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

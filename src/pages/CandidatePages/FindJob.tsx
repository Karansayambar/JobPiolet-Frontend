import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { RootState } from "../../redux/store";

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  companyName?: string;
  description?: string;
  [key: string]: any; // fallback to allow other fields
};

export type GetJobsResponse = {
  jobs: Job[];
};

const FindJob: React.FC = () => {
  const theme = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [quickFilter, setQuickFilter] = useState<Job[]>([]);
  const [advanceFilters, setAdvanceFilters] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const itemsPerPage = 12;

  const { data } = useGetAllJobsQuery<GetJobsResponse>();

  useEffect(() => {
    if (data?.jobs) {
      setJobs(data?.jobs);
      console.log("jobs", data);
    }
  }, [data]);

  const filters: Record<string, string> = useSelector(
    (state: RootState) => state.jobs.filters
  );
  const handleSearch = () => {
    const parsedFilters: any = {};
    Object.values(filters).forEach((item: any) => {
      const [key, value] = item.split(":").map((str: any) => str.trim());
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

  const handlePageChange = (value: any) => {
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
                onChange={(e: any) => setSearchInput(e.target.value)}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchInput(e.target.value)
                }
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

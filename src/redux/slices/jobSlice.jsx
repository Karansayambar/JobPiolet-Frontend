import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  filters: {},
  filteredJobs: [],
};

// jobSlice.js
const jobSlice = createSlice({
  name: "jobs", // Note this name is used in useSelector
  initialState,
  reducers: {
    // Load all jobs
    getAllJobs(state, action) {
      console.log("action payload:", action.payload);
      state.jobs = action.payload || jobs;
    },

    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },

    // Reset all filters
    // resetFilters(state) {
    //   state.filters = initialState.filters;
    //   state.filteredJobs = state.jobs;
    // },
  },
});

// Helper function for filtering logic
function applyFilters(state) {
  const { Role, JobType, Location } = state.filters;

  state.filteredJobs = state.jobs.filter((job) => {
    const matchesRole =
      !Role || job.jobTitle.toLowerCase().includes(Role.toLowerCase());
    const matchesJobType =
      !JobType || job.workMode.toLowerCase().includes(JobType.toLowerCase());
    const matchesLocation =
      !Location || job.city.toLowerCase().includes(Location.toLowerCase());
    console.log("Filtering jobs:", {
      matchesRole,
      matchesJobType,
      matchesLocation,
    });
    console.log("Job details:", matchesJobType, matchesRole, matchesLocation);
    return matchesRole && matchesJobType && matchesLocation;
  });
}

export const { setFilters, resetFilters, getAllJobs, filteredJobs } =
  jobSlice.actions;
export default jobSlice.reducer;

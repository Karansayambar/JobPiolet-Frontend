import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  filteredJobs: [],
  filters: {},
};

// jobSlice.js
const jobSlice = createSlice({
  name: "jobs", // Note this name is used in useSelector
  initialState,
  reducers: {
    // Load all jobs
    // getAllJobs(state, action) {
    //   state.jobs = action.payload || jobs;
    //   state.filteredJobs = jobs; // Initialize filteredJobs with all jobs
    // },

    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      // applyFilters(state);
    },

    // Reset all filters
    resetFilters(state) {
      state.filters = initialState.filters;
      state.filteredJobs = state.jobs;
    },
  },
});

// Helper function for filtering logic
// function applyFilters(state) {
//   const { role, location, salary, experience, remoteOnly, searchQuery } =
//     state.filters;

//   state.filteredJobs = state.jobs.filter((job) => {
//     const matchesRole = !role || job.role === role;
//     const matchesLocation =
//       !location || job.location.toLowerCase().includes(location.toLowerCase());
//     const matchesSalary = !salary || job.salary >= Number(salary);
//     const matchesExperience = !experience || job.experienceLevel === experience;
//     const matchesRemote = !remoteOnly || job.remote === true;
//     const matchesSearch =
//       !searchQuery ||
//       job.title.toLowerCase().includes(searchQuery.toLowerCase());

//     return (
//       matchesRole &&
//       matchesLocation &&
//       matchesSalary &&
//       matchesExperience &&
//       matchesRemote &&
//       matchesSearch
//     );
//   });
// }

export const { setFilters, resetFilters } = jobSlice.actions;
export default jobSlice.reducer;

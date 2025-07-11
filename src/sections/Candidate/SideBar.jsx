import React, { useState } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Chip,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputAdornment,
  Button,
} from "@mui/material";
import { X } from "phosphor-react";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/slices/jobSlice";

const locations = [
  "Pune",
  "Hydrabad",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Remote",
];
const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Designer",
  "Data Scientist",
];
const salaryRanges = [
  { label: "$40,000 - $60,000", value: "40-60" },
  { label: "$60,000 - $80,000", value: "60-80" },
  { label: "$80,000 - $100,000", value: "80-100" },
  { label: "$100,000 - $120,000", value: "100-120" },
  { label: "Custom", value: "custom" },
];

const SideBar = ({ handleSidebarClose }) => {
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedJobType, setSelectedJobType] = useState("Job");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState("40-60");
  const [customSalary, setCustomSalary] = useState({ min: "", max: "" });

  // Update filters dynamically
  const updateFilters = (type, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (value) {
        newFilters[type] = value;
      } else {
        delete newFilters(type);
      }
      return newFilters;
    });
  };

  // Handle individual selections
  const handleRoleChange = (newValue) => {
    setSelectedRole(newValue);
    updateFilters("Role", newValue);
  };

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
    updateFilters("JobType", event.target.value);
  };

  const handleLocationChange = (newValue) => {
    setSelectedLocation(newValue);
    updateFilters("Location", newValue);
  };

  const handleSalaryChange = (event) => {
    setSelectedSalary(event.target.value);
    if (event.target.value === "custom") {
      updateFilters("Salary", null); // Remove predefined salary if custom is selected
    } else {
      updateFilters(
        "Salary",
        salaryRanges.find((s) => s.value === event.target.value)?.label || ""
      );
    }
  };

  const handleCustomSalaryChange = (field, value) => {
    setCustomSalary((prev) => ({ ...prev, [field]: value }));
    updateFilters("Salary", `$${customSalary.min} - $${customSalary.max}`);
  };

  // Handle chip deletion
  const handleDelete = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((item) => item !== filter)
    );
    if (filter.startsWith("Role:")) setSelectedRole(null);
    if (filter.startsWith("JobType:")) setSelectedJobType("Job");
    if (filter.startsWith("Location:")) setSelectedLocation(null);
    if (filter.startsWith("Salary:")) {
      setSelectedSalary("40-60");
      setCustomSalary({ min: "", max: "" });
    }
  };

  const handleFilterJobs = () => {
    console.log("selectrf filters", selectedFilters);
    dispatch(setFilters(selectedFilters));
  };

  return (
    <Box
      width={350}
      height={"100vh"}
      position={"absolute"}
      top={0}
      left={0}
      bgcolor={"White"}
      p={2}
      boxShadow={3}
    >
      {/* Sidebar Header */}

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          Filters
        </Typography>
        <IconButton onClick={() => handleSidebarClose()}>
          <X size={20} />
        </IconButton>
      </Stack>

      {/* Active Filters Section */}
      <Stack spacing={2} mt={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          Active Filters
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {selectedFilters.length > 0 ? (
            selectedFilters.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                onDelete={() => handleDelete(filter)}
                color="primary"
                variant="outlined"
                clickable
              />
            ))
          ) : (
            <Typography color="gray">No active filters</Typography>
          )}
        </Stack>
      </Stack>

      {/* Role Selector */}
      <Stack spacing={2} mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Select Role
        </Typography>
        <Autocomplete
          options={roles}
          value={selectedRole}
          onChange={(_event, newValue) => handleRoleChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Job Role" variant="outlined" />
          )}
        />
      </Stack>

      {/* Job Type Selector (Radio Buttons) */}
      <Stack spacing={2} mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Select Job Type
        </Typography>
        <FormControl>
          <RadioGroup value={selectedJobType} onChange={handleJobTypeChange}>
            <FormControlLabel
              value="full-time"
              control={<Radio />}
              label="Full Time Job"
            />
            <FormControlLabel
              value="Internship"
              control={<Radio />}
              label="Internship"
            />
          </RadioGroup>
        </FormControl>
      </Stack>

      {/* Location Selector */}
      <Stack spacing={2} mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Select Location
        </Typography>
        <Autocomplete
          options={locations}
          value={selectedLocation}
          onChange={(_event, newValue) => handleLocationChange(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Job Location" variant="outlined" />
          )}
        />
      </Stack>

      {/* Salary Range Selector */}
      <Stack spacing={2} mt={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          Select Salary Range
        </Typography>
        <FormControl>
          <RadioGroup value={selectedSalary} onChange={handleSalaryChange}>
            {salaryRanges.map((salary) => (
              <FormControlLabel
                key={salary.value}
                value={salary.value}
                control={<Radio />}
                label={salary.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        {/* Custom Salary Range Inputs */}
        {selectedSalary === "custom" && (
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Min Salary"
              type="number"
              variant="outlined"
              value={customSalary.min}
              onChange={(e) => handleCustomSalaryChange("min", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Max Salary"
              type="number"
              variant="outlined"
              value={customSalary.max}
              onChange={(e) => handleCustomSalaryChange("max", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Stack>
        )}
      </Stack>
      {/* Apply Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ borderRadius: 2, textTransform: "none", fontSize: "16px" }}
        onClick={() => handleFilterJobs()}
      >
        Apply Filters
      </Button>
    </Box>
  );
};

export default SideBar;

import { Stack, Typography } from "@mui/material";
import JobCard from "../../Common/JobCard";

// JobList component to render multiple JobCards
const FeaturedJobs: React.FC = () => {
  return (
    <Stack spacing={2} px={{ xs: 2, sm: 6, md: 10, lg: 30 }} py={4}>
      <Typography variant="h4" fontWeight={600} py={3}>
        Featured Jobs
      </Typography>
      <Stack
        spacing={2}
        gap={3}
        direction="column"
        alignItems={"center"}
        sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {/* {jobs.slice(0, 9).map((job, index) => (
          <JobCard key={index} job={job} />
        ))} */}
      </Stack>
    </Stack>
  );
};

export default FeaturedJobs;

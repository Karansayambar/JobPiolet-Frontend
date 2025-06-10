import { Box } from "@mui/material";
import React, { Suspense, lazy } from "react";

const HeroComponent = lazy(() =>
  import("../../components/HomePage/Hero/HeroComponent")
);
const MostPopularVacancies = lazy(() =>
  import("../../components/HomePage/MostPopularVacancies/MostPopularVacancies")
);
const PopularCategory = lazy(() =>
  import("../../components/HomePage/MostPopularVacancies/PopularCategory")
);
const FeaturedJobs = lazy(() =>
  import("../../components/HomePage/FeaturedJobs")
);
const Testimonial = lazy(() => import("../../components/HomePage/Testimonial"));
const HomePage = () => {
  return (
    <Box>
      <Suspense fallback={<p>Loading...</p>}>
        <HeroComponent />
        <MostPopularVacancies />
        <PopularCategory />
        <FeaturedJobs />
        <Testimonial />
      </Suspense>
    </Box>
  );
};

export default HomePage;

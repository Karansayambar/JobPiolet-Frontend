import { Box, useTheme } from "@mui/material";
import { Suspense, lazy } from "react";

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
  const theme = useTheme();

  return (
    <Box
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
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

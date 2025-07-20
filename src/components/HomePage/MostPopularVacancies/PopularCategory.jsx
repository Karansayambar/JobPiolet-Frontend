import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { PopularCategoryChip } from "../../Common/HeroChip";
import { ArrowForward } from "@mui/icons-material";

const PopularCategory = () => {
  const theme = useTheme();
  return (
    <Box px={{ xs: 4, sm: 6, md: 15, lg: 30 }} py={{ md: 10 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography variant="h4" fontWeight={600} alignItems={"center"}>
          Popular category
        </Typography>
        <Button variant="outlined">
          View All <ArrowForward />
        </Button>
      </Stack>
      <PopularCategoryChip />
    </Box>
  );
};

export default PopularCategory;

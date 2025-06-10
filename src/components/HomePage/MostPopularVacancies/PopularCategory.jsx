import { Box, Button, Stack, Typography } from "@mui/material";
import { PopularCategoryChip } from "../../Common/HeroChip";
import { ArrowForward } from "@mui/icons-material";

const PopularCategory = () => {
  return (
    <Box px={{ xs: 4, sm: 6, md: 15, lg: 30 }} py={10}>
      <Stack direction={"row"} justifyContent={"space-between"}>
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

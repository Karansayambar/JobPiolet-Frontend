import { Box, Stack, Table, TableBody, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardJobCard from "../../../components/Common/CandidateDashboardJobCard";
import { useGetAllfavoritesQuery } from "../../../services/jobsApi";

const FavoriteJobs: React.FC = () => {
  const [favouriteJob, setFaviorateJob] = useState([]);
  const { data } = useGetAllfavoritesQuery();
  useEffect(() => {
    if (data) {
      console.log("data form favorite", data);
      setFaviorateJob(data.favoriteJobs);
    }
  }, [data]);

  return (
    <Stack
      flex={4}
      bgcolor="background.paper"
      p={3}
      borderRadius={2}
      overflow="auto" // or "scroll"
      height="800px" // Set a specific height
      sx={{
        "&::-webkit-scrollbar": { display: "none" }, // Hides scrollbar in Webkit browsers
      }}
    >
      <Typography variant="body1" fontWeight={600} fontSize={18} py={3}>
        Favorite Jobs(17)
      </Typography>
      <Table>
        <TableBody>
          <DashboardJobCard data={favouriteJob} />
        </TableBody>
      </Table>
    </Stack>
  );
};

export default FavoriteJobs;

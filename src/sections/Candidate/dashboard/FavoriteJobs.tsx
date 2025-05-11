import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardJobCard, {
  Job,
} from "../../../components/Common/CandidateDashboardJobCard";
import { useGetAllfavoritesQuery } from "../../../services/jobsApi";
import notFound from "../../../assets/404.png";

export type FavoriteJobsResponse = {
  message: string;
  favoriteJobs: Job[];
};
const FavoriteJobs: React.FC = () => {
  const [favouriteJob, setFaviorateJob] = useState<Job[]>([]);
  const { data, isLoading } = useGetAllfavoritesQuery();
  useEffect(() => {
    if (data) {
      console.log("data form favorite", data);
      setFaviorateJob(data?.favoriteJobs);
    }
  }, [data]);
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {favouriteJob ? (
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
            Favorite Jobs
          </Typography>
          <Table>
            <TableBody>
              <DashboardJobCard data={favouriteJob} />
            </TableBody>
          </Table>
        </Stack>
      ) : (
        <Stack alignItems={"center"}>
          <img style={{ width: "500px" }} src={notFound} alt="" />
          <Typography variant="body2" fontSize={30}>
            Not Favorite job added ate
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default FavoriteJobs;

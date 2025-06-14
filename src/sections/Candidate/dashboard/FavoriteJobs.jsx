import {
  Box,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import DashboardJobCard from "../../../components/Common/CandidateDashboardJobCard";
import { useGetAllfavoritesQuery } from "../../../services/jobsApi";
import notFound from "../../../assets/404.png";
import useFavoriteJobs from "../../../hooks/useFavoriteJobs";

const FavoriteJobs = () => {
  // const [favouriteJob, setFaviorateJob] = useState([]);
  // const { data, isLoading } = useGetAllfavoritesQuery();
  // useEffect(() => {
  //   if (data) {
  //     console.log("data form favorite", data);
  //     setFaviorateJob(data?.favoriteJobs);
  //   }
  // }, [data]);

  const { favoriteJobs, isLoading } = useFavoriteJobs();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isLoading && favoriteJobs.length === 0) {
    return (
      <Stack alignItems={"center"}>
        <img style={{ width: "500px" }} src={notFound} alt="" />
        <Typography variant="body2" fontSize={30}>
          Not Favorite job added ate
        </Typography>
      </Stack>
    );
  }

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
        Favorite Jobs
      </Typography>
      <Table>
        <TableBody>
          <DashboardJobCard data={favoriteJobs} />
        </TableBody>
      </Table>
    </Stack>
  );
};

export default FavoriteJobs;

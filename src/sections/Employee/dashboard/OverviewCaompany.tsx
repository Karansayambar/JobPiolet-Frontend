import { ArrowForward } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { CiBookmark } from "react-icons/ci";
import DashboardJobCard from "../../../components/Common/CompanyDashboardJobCard";
import { useGetMyJobsQuery } from "../../../services/jobsApi";
import { useEffect } from "react";
import { Suitcase } from "phosphor-react";
import notfound from "../../../assets/404.png";

const OverviewCompany: React.FC = () => {
  const theme = useTheme();

  const { data, isLoading } = useGetMyJobsQuery();

  useEffect(() => {
    if (data) {
      console.log("Fetched Jobs:", data);
    }
  }, [data]);

  const openJobs = data?.jobs.filter((el: any) => el.jobStatus === "open");

  const stats = [
    {
      label: "open Jobs",
      count: openJobs?.length,
      icon: <Suitcase size={30} />,
    },
    { label: "Saved Candidates", count: 0, icon: <CiBookmark size={30} /> },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  const bgColors = ["#D6E6FF", "#FFE6CC", "#D4EDDA"]; // Light Blue, Light Orange, Light Green

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
      {/* Welcome Message */}
      <Typography variant="h6">Hello, Easter Howard</Typography>
      <Typography variant="body1" color="text.secondary">
        Here is your daily activities and job alerts
      </Typography>

      {/* Statistics Cards */}
      <Stack direction="row" gap={3} py={3} flexWrap="wrap">
        {stats.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderRadius={2}
            p={2}
            width={280}
            sx={{
              backgroundColor: bgColors[index],
            }}
          >
            <Box>
              <Typography variant="h4">{item.count}</Typography>
              <Typography color="text.secondary">{item.label}</Typography>
            </Box>
            <Box color={theme.palette.primary.main}>{item.icon}</Box>
          </Stack>
        ))}
      </Stack>

      {/* Profile Completion Card */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        bgcolor="#E05151"
        borderRadius={3}
        color="white"
      >
        <Stack direction="row" alignItems="center" gap={3}>
          <Avatar sx={{ bgcolor: "white", color: "#E05151" }} />
          <Stack>
            <Typography variant="body1" fontWeight="bold">
              Your profile editing is not completed
            </Typography>
            <Typography variant="body2">
              Complete your profile to build your custom resume.
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        >
          Edit Profile <ArrowForward />
        </Button>
      </Stack>

      {/* Recently Applied Jobs */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={4}
      >
        <Typography variant="h6">Recently Posed Jobs</Typography>
        <Button endIcon={<ArrowForward />}>View All</Button>
      </Stack>

      {/* Jobs Table */}
      {data ? (
        <>
          <Table>
            <TableHead>
              <TableRow
                sx={{ textTransform: "uppercase", bgcolor: "action.hover" }}
              >
                <TableCell>Jobs</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && <DashboardJobCard jobDetails={data?.jobs} />}
            </TableBody>
          </Table>
        </>
      ) : (
        <Stack alignItems={"center"}>
          <img style={{ width: "500px" }} src={notfound} alt="" />
          <Typography variant="body2" fontSize={30}>
            Not Jobs Posted Ate
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default OverviewCompany;

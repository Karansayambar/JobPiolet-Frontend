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
  useMediaQuery,
} from "@mui/material";
import { CiBookmark } from "react-icons/ci";
import DashboardJobCard from "../../../components/Common/CompanyDashboardJobCard";
import { useGetMyJobsQuery } from "../../../services/jobsApi";
import { useEffect } from "react";
import { Suitcase } from "phosphor-react";
import notfound from "../../../assets/404.png";

const OverviewCompany = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { data, isLoading } = useGetMyJobsQuery();

  useEffect(() => {
    if (data) {
      console.log("Fetched Jobs:", data);
    }
  }, [data]);

  const openJobs = data?.jobs.filter((el) => el.jobStatus === "open");

  const stats = [
    {
      label: "open Jobs",
      count: openJobs?.length,
      icon: <Suitcase size={isMobile ? 20 : 30} />,
    },
    {
      label: "Saved Candidates",
      count: 0,
      icon: <CiBookmark size={isMobile ? 20 : 30} />,
    },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  const bgColors = ["#D6E6FF", "#FFE6CC", "#D4EDDA"];

  return (
    <Stack
      flex={4}
      bgcolor="background.paper"
      p={{ xs: 1, sm: 2, md: 3 }}
      height={{ xs: "auto", md: "100vh" }}
      borderRadius={2}
      overflow="auto"
      sx={{
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {/* Welcome Message */}
      <Typography variant={isMobile ? "subtitle1" : "h6"}>
        Hello, Easter Howard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Here is your daily activities and job alerts
      </Typography>

      {/* Statistics Cards */}
      <Stack direction="row" gap={2} py={3} flexWrap="wrap">
        {stats.map((item, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderRadius={2}
            p={2}
            width={{ xs: 200 }}
            sx={{
              backgroundColor: bgColors[index],
            }}
          >
            <Box>
              <Typography variant={isMobile ? "h5" : "h4"}>
                {item.count}
              </Typography>
              <Typography
                variant={isMobile ? "caption" : "body2"}
                color="text.secondary"
              >
                {item.label}
              </Typography>
            </Box>
            <Box color={theme.palette.primary.main}>{item.icon}</Box>
          </Stack>
        ))}
      </Stack>

      {/* Profile Completion Card */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        p={{ xs: 1.5, sm: 3 }}
        bgcolor="#E05151"
        borderRadius={3}
        color="white"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "#E05151",
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
            }}
          />
          <Stack>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              fontWeight="bold"
            >
              Your profile editing is not completed
            </Typography>
            <Typography variant={isMobile ? "caption" : "body2"}>
              Complete your profile to build your custom resume.
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          sx={{
            color: "white",
            borderColor: "white",
            whiteSpace: "nowrap",
          }}
        >
          Edit Profile <ArrowForward fontSize={isMobile ? "small" : "medium"} />
        </Button>
      </Stack>

      {/* Recently Applied Jobs */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={{ xs: 2, sm: 4 }}
      >
        <Typography variant={isMobile ? "subtitle1" : "h6"}>
          Recently Posted Jobs
        </Typography>
        <Button
          size={isMobile ? "small" : "medium"}
          endIcon={<ArrowForward fontSize={isMobile ? "small" : "medium"} />}
        >
          {isMobile ? "All" : "View All"}
        </Button>
      </Stack>

      {/* Jobs Table */}
      {data ? (
        <Box sx={{ overflowX: "auto", height: "100vh" }}>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow
                sx={{
                  textTransform: "uppercase",
                  bgcolor: "action.hover",
                  "& th": {
                    py: isMobile ? 1 : 2,
                    fontSize: isMobile ? "0.7rem" : "0.875rem",
                  },
                }}
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
        </Box>
      ) : (
        <Stack alignItems={"center"} p={2}>
          <img
            style={{
              width: "100%",
              maxWidth: 500,
              height: "auto",
            }}
            src={notfound}
            alt="No jobs found"
          />
          <Typography variant={isMobile ? "body1" : "h6"}>
            No Jobs Posted Yet
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default OverviewCompany;

import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Book, BookmarkSimple, Calendar, Link } from "phosphor-react";
import { useEffect, useState } from "react";
import { CompanyLogoStyle, Duration } from "../../components/Common/JobCard";
import {
  ArrowForward,
  AttachMoney,
  Facebook,
  LinkedIn,
  LocationOn,
  Mail,
  WalletOutlined,
  X,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
// import { jobs } from "../../utils/data";
import { BsClock, BsDot } from "react-icons/bs";
import { MdCastForEducation } from "react-icons/md";
import logo from "../../assets/auth/Rectangle 43.png";
import {
  useAddToFavoriteMutation,
  useGetAppliedStatusQuery,
  useGetFavioriteJobQuery,
  useGetJobDetailQuery,
} from "../../services/jobsApi";
import CompanyLogo from "../../components/Common/CompanyLogo";

const JobDetails = () => {
  const { jobId } = useParams();
  const theme = useTheme();
  const [job, setJob] = useState(null);
  const [localFavorited, setLocalFavorited] = useState(false);
  console.log("jobId", jobId);

  const navigate = useNavigate();

  // Api calls
  const { data: jobData, isLoading } = useGetJobDetailQuery(jobId);
  const { data: isAppliedValue } = useGetAppliedStatusQuery(jobId);
  const { data: isFavorited } = useGetFavioriteJobQuery(jobId);
  // const [applyToJob] = useApplyToJobMutation();
  const [addToFavorite] = useAddToFavoriteMutation();

  useEffect(() => {
    if (jobData) {
      setJob(jobData?.data);
    }
    console.log("isAppliedValue", isAppliedValue);
    console.log("isFavoriteeValue", isFavorited?.isFavorited);
  }, [jobData, isAppliedValue, isFavorited]);

  useEffect(() => {
    if (isFavorited) {
      setLocalFavorited(isFavorited?.isFavorited);
    }
  }, [isFavorited, localFavorited]);

  // // job apply functionality
  // const handleApply = async () => {
  //   try {
  //     jobId;
  //     const response = await applyToJob(jobId).unwrap();
  //     console.log("Response:", response);
  //   } catch (err) {
  //     console.error("Error applying:", err);
  //   }
  // };

  const handleFavorite = async () => {
    setLocalFavorited((prev) => !prev);
    try {
      await addToFavorite(jobId);
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  if (!job) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "white",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={3}
          >
            <Typography variant="h4" fontWeight={600} color="text.primary">
              Job Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Home / Find Job
            </Typography>
          </Stack>
        </Container>
      </Paper>

      {/* Job Details */}
      {job ? (
        <Stack px={20}>
          {/* Job Heading */}
          <Card
            sx={{
              my: 4,
              borderRadius: 3,
              overflow: "visible",
              position: "relative",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "flex-start", md: "center" }}
                justifyContent="space-between"
                spacing={3}
              >
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <CompanyLogo companyName={job.companyName} size={40} />
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4" fontWeight={700} color="primary">
                      {job?.jobTitle}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Typography variant="h6" color="text.secondary">
                        at {job?.companyName}
                      </Typography>
                      <Chip
                        label={job?.workMode}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mt={1}
                    >
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {job?.city}, {job?.address}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Tooltip
                    title={
                      localFavorited
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    <IconButton
                      onClick={handleFavorite}
                      sx={{
                        bgcolor: localFavorited
                          ? alpha(theme.palette.primary.main, 0.1)
                          : "transparent",
                        border: `2px solid ${localFavorited ? theme.palette.primary.main : theme.palette.grey[300]}`,
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      <BookmarkSimple
                        size={24}
                        weight={localFavorited ? "fill" : "regular"}
                        color={
                          localFavorited
                            ? theme.palette.primary.main
                            : theme.palette.grey[600]
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate(`/candidate/test/${jobId}`)}
                    disabled={isAppliedValue?.isApplied || isLoading}
                    endIcon={<ArrowForward />}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      px: 3,
                      fontWeight: 600,
                      boxShadow: theme.shadows[8],
                    }}
                  >
                    {isLoading
                      ? "Applying..."
                      : isAppliedValue?.isApplied
                        ? "Applied"
                        : "Apply Now"}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          {/* Job Body */}
          <Stack direction="row" gap={10}>
            {/* Left Side */}
            <Stack flex={3}>
              <Typography variant="h5" fontWeight={700} mb={3}>
                Job Description
              </Typography>
              <Typography
                variant="body1"
                lineHeight={1.8}
                color="text.secondary"
              >
                {job?.jobDescription}
              </Typography>

              <Typography variant="h6" fontSize={25} fontWeight={600}>
                Requirements
              </Typography>
              <List>
                {job?.jobRequirements?.map((req, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <Typography
                      variant="body1"
                      lineHeight={1.8}
                      color="text.secondary"
                    >
                      <BsDot /> {req}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Responsibilities
              </Typography>
              <List>
                {job?.jobResponsibilities?.map((benefit, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <Typography
                      variant="body1"
                      lineHeight={1.8}
                      color="text.secondary"
                    >
                      <BsDot /> {benefit}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Preferences
              </Typography>
              <List>
                {job?.jobPreferences?.map((benefit, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <Typography
                      variant="body1"
                      lineHeight={1.8}
                      color="text.secondary"
                    >
                      <BsDot /> {benefit}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* Right Side */}
            <Stack flex={2} p={3} borderRadius={2} gap={4}>
              {/* Salary & Job Location */}
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Stack spacing={3} direction={"row"}>
                    <Box>
                      <Stack direction={"row"} alignItems={"center"}>
                        <AttachMoney
                          sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
                        />
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          color="text.secondary"
                        >
                          Salary (USD)
                        </Typography>
                      </Stack>
                      <Typography variant="h4" fontWeight={400} color="primary">
                        ${job?.minSalary} - ${job?.maxSalary}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job?.salaryType} Salary
                      </Typography>
                    </Box>

                    <Divider />

                    <Box>
                      <Stack direction={"row"} alignItems={"center"}>
                        <LocationOn
                          sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                        />
                        <Typography variant="h6" fontWeight={600}>
                          {job?.city ?? "Location Unavailable"}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {job?.address}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Job Benefits */}
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                    color="primary"
                  >
                    Job Benefits
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1} mb={4}>
                    {job?.jobBenefits?.map((benefit, index) => (
                      <Chip
                        key={index}
                        label={benefit}
                        variant="outlined"
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Stack>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                    color="primary"
                  >
                    Required Skills
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {job?.sills?.map((skill, index) => (
                      <Chip
                        key={index}
                        label={skill}
                        variant="filled"
                        color="secondary"
                        size="small"
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Job Overview */}
              <Card elevation={2} sx={{ borderRadius: 3 }}>
                <Stack>
                  <Typography variant="h6" fontWeight="bold" p={2}>
                    Job Overview
                  </Typography>
                  <CardContent sx={{ p: 2 }}>
                    <Grid container spacing={5} justifyContent="start">
                      {[
                        {
                          icon: <Calendar size={24} />,
                          label: "Job Posted",
                          value: job?.posted,
                        },
                        {
                          icon: <BsClock size={24} />,
                          label: "Job Expire In",
                          value: job?.deadline,
                        },
                        {
                          icon: <BsClock size={24} />,
                          label: "Job Level",
                          value: job?.jobLevel,
                        },
                        {
                          icon: <WalletOutlined fontSize="medium" />,
                          label: "Experience",
                          value: job.experience,
                        },
                        {
                          icon: <WalletOutlined fontSize="medium" />,
                          label: "Working Hours",
                          value: job.workingHours,
                        },
                        {
                          icon: <WalletOutlined fontSize="medium" />,
                          label: "Job Status",
                          value: job.jobStatus,
                        },
                        {
                          icon: <WalletOutlined fontSize="medium" />,
                          label: "Contract Length",
                          value: job.contractLength,
                        },
                        {
                          icon: <MdCastForEducation size={24} />,
                          label: "Education",
                          value: job.education,
                        },
                        {
                          icon: <MdCastForEducation size={24} />,
                          label: "Vacancies",
                          value: job.vacancies,
                        },
                      ].map((item, index) => (
                        <Grid key={index}>
                          <Stack
                            alignItems="center"
                            spacing={1}
                            textAlign="center"
                          >
                            <Box
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: "primary.main",
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Typography
                              variant="caption"
                              fontWeight={600}
                              color="text.secondary"
                            >
                              {item.label}
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {item.value ?? "N/A"}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Stack>
              </Card>

              {/* Share Job */}
              <Stack
                border="1px solid grey"
                p={2}
                borderRadius={2}
                textAlign="center"
              >
                <Typography variant="h6">Share this job:</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  justifyContent="center"
                >
                  <Button variant="outlined">
                    <Link size={20} />
                    Copy Link
                  </Button>
                  <Stack direction="row" spacing={1}>
                    <IconButton>
                      <LinkedIn />
                    </IconButton>
                    <IconButton>
                      <Facebook />
                    </IconButton>
                    <IconButton>
                      <X />
                    </IconButton>
                    <IconButton>
                      <Mail />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h6" textAlign="center" py={5}>
          {isLoading && <>Loading</>}
        </Typography>
      )}

      {/* Related Jobs */}
      {/* <Stack py={10} spacing={3}>
        <Typography variant="h6" fontSize={30}>
          Related Jobs
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          whiteSpace={"collapse"}
          width="100%"
          alignItems={"center"}
          justifyContent={"start"}
          gap={4}
        >
          {jobs.slice(0, 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </Stack>
      </Stack> */}
    </Box>
  );
};

export default JobDetails;

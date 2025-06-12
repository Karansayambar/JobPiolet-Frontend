import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Book, BookmarkSimple, Calendar, Link } from "phosphor-react";
import { useEffect, useState } from "react";
import { CompanyLogoStyle, Duration } from "../../components/Common/JobCard";
import {
  ArrowForward,
  Facebook,
  LinkedIn,
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        bgcolor={theme.palette.grey[300]}
      >
        <Typography variant="h6">Job Details</Typography>
        <Typography variant="body2">Home / Find Job</Typography>
      </Stack>

      {/* Job Details */}
      {job ? (
        <Stack px={20}>
          {/* Job Heading */}
          <Stack
            py={4}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <CompanyLogoStyle>
              <CompanyLogo companyName={job.companyName} size={60} />
            </CompanyLogoStyle>
              <Stack>
                <Typography variant="h5">{job?.jobTitle}</Typography>
                <Stack direction="row" gap={2}>
                  <Typography variant="body2">at {job?.companyName}</Typography>
                  <Duration>{job?.workMode}</Duration>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap={3}>
              <IconButton onClick={() => handleFavorite()}>
                <BookmarkSimple
                  size={26}
                  weight={localFavorited ? "fill" : "regular"}
                  color={localFavorited ? "#1976d2" : "#757575"}
                />
              </IconButton>
              <Button
                variant="contained"
                onClick={() => navigate(`/candidate/test/${jobId}`)}
                // onClick={
                //   !isAppliedValue?.isApplied && !isLoading
                //     ? handleApply
                //     : "undefined"
                // }
                disabled={isAppliedValue?.isApplied || isLoading}
              >
                {isLoading
                  ? "Applying..."
                  : isAppliedValue?.isApplied
                  ? "Applied"
                  : "Applay Now"}
                <ArrowForward />
              </Button>
            </Stack>
          </Stack>

          {/* Job Body */}
          <Stack direction="row" gap={10}>
            {/* Left Side */}
            <Stack flex={3}>
              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Job Description
              </Typography>
              <Typography fontSize={20} mb={3}>
                {job?.jobDescription}
              </Typography>

              <Typography variant="h6" fontSize={25} fontWeight={600}>
                Requirements
              </Typography>
              <List>
                {job?.jobRequirements?.map((req, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <BsDot /> {req}
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Responsibilities
              </Typography>
              <List>
                {job?.jobResponsibilities?.map((benefit, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <BsDot /> {benefit}
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Preferences
              </Typography>
              <List>
                {job?.jobPreferences?.map((benefit, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <BsDot /> {benefit}
                  </ListItem>
                ))}
              </List>
            </Stack>

            {/* Right Side */}
            <Stack flex={2} p={3} borderRadius={2} gap={4}>
              {/* Salary & Job Location */}
              <Grid
                container
                spacing={2}
                alignItems="center"
                border="1px solid grey"
                borderRadius={2}
                justifyContent={"space-between"}
                p={4}
              >
                {/* Salary Section */}
                <Grid textAlign="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Salary (USD)
                  </Typography>
                  <Typography variant="h6">
                    {`${job?.minSalary} - ${job?.maxSalary}`}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {job?.salaryType} Salary
                  </Typography>
                </Grid>

                {/* Vertical Divider */}
                <Grid display="flex" justifyContent="center">
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "100%" }}
                  />
                </Grid>

                {/* Job Location Section */}
                <Grid textAlign="center">
                  <Book size={32} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job?.city ?? "Location Unavailable"}
                  </Typography>
                  <Typography variant="body2">{job?.address}</Typography>
                </Grid>
              </Grid>

              {/* Job Benefits */}
              <Stack border={1} p={2} borderRadius={2}>
                <Typography p={2} variant="h6">
                  Job Benefits
                </Typography>
                <Stack direction="row" flexWrap="wrap" p={2} gap={2}>
                  {job?.jobBenefits?.map((benefit, index) => (
                    <Duration key={index}>{benefit}</Duration>
                  ))}
                </Stack>

                <Typography p={2} variant="h6">
                  Skills
                </Typography>
                <Stack direction="row" flexWrap="wrap" p={2} gap={2}>
                  {job?.sills?.map((benefit, index) => (
                    <Duration key={index}>{benefit}</Duration>
                  ))}
                </Stack>
              </Stack>

              {/* Job Overview */}
              <Stack
                border="1px solid grey"
                borderRadius={2}
                p={2}
                spacing={2}
                textAlign={"start"}
              >
                <Typography variant="h6" fontWeight="bold" p={2}>
                  Job Overview
                </Typography>

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
                      <Stack alignItems="center" spacing={1} width={100}>
                        <Box color={theme.palette.primary.main}>
                          {item.icon}
                        </Box>
                        <Box textAlign="center">
                          <Typography variant="subtitle2" fontWeight="bold">
                            {item.label}
                          </Typography>
                          <Typography variant="body2">
                            {item.value ?? "N/A"}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Stack>

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

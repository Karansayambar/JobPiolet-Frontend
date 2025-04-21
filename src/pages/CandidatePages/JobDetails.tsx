import {
  Box,
  Button,
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
import React from "react";
import JobCard, { Duration } from "../../components/Common/JobCard";
import {
  ArrowForward,
  Facebook,
  LinkedIn,
  Mail,
  WalletOutlined,
  X,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { jobs } from "../../utils/data";
import { BsClock, BsDot } from "react-icons/bs";
import { MdCastForEducation } from "react-icons/md";
import logo from "../../assets/auth/Rectangle 43.png";

const JobDetails: React.FC = () => {
  const { id } = useParams();
  const theme = useTheme();
  const job = jobs.find((job) => job._id == id) || null; // Fetch job safely
  const navigate = useNavigate();

  return (
    <Box px={30}>
      {/* Header */}
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        px={30}
        bgcolor={theme.palette.grey[100]}
      >
        <Typography variant="h6">Job Details</Typography>
        <Typography variant="body2">Home / Find Job</Typography>
      </Stack> */}

      {/* Job Details */}
      {job ? (
        <Stack px={30}>
          {/* Job Heading */}
          <Stack
            py={4}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignIalignItemstems="center" gap={2}>
              <img src={logo} height={50} alt={job.companyName} />
              <Stack>
                <Typography variant="h5">{job.jobTitle}</Typography>
                <Stack direction="row" gap={2}>
                  <Typography variant="body2">at {job.companyName}</Typography>
                  <Duration>{job.workMode}</Duration>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems="center" gap={3}>
              <IconButton>
                <BookmarkSimple size={26} />
              </IconButton>
              <Button
                variant="contained"
                onClick={() => navigate("/candidate/test")}
              >
                Apply Now <ArrowForward />
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
                {job.jobDescription}
              </Typography>

              <Typography variant="h6" fontSize={25} fontWeight={600}>
                Requirements
              </Typography>
              <List>
                {job.jobRequirements?.map((req, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <BsDot /> {req}
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Responsibilities
              </Typography>
              <List>
                {job.jobResponsibilities?.map((benefit, index) => (
                  <ListItem key={index} sx={{ fontSize: "20px" }}>
                    <BsDot /> {benefit}
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" fontSize={25} fontWeight={600} mb={2}>
                Preferences
              </Typography>
              <List>
                {job.jobPreferences?.map((benefit, index) => (
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
                <Grid item xs={5} textAlign="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    Salary (USD)
                  </Typography>
                  <Typography variant="h6">
                    {`${job?.minSalary} - ${job.maxSalary}`}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {job.salaryType} Salary
                  </Typography>
                </Grid>

                {/* Vertical Divider */}
                <Grid item xs={1} display="flex" justifyContent="center">
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "100%" }}
                  />
                </Grid>

                {/* Job Location Section */}
                <Grid item xs={6} textAlign="center">
                  <Book size={32} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {job?.city ?? "Location Unavailable"}
                  </Typography>
                  <Typography variant="body2">{job.address}</Typography>
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
                      value: job.posted,
                    },
                    {
                      icon: <BsClock size={24} />,
                      label: "Job Expire In",
                      value: job.deadline,
                    },
                    {
                      icon: <BsClock size={24} />,
                      label: "Job Level",
                      value: job.jobLevel,
                    },
                    {
                      icon: <WalletOutlined size={24} />,
                      label: "Experience",
                      value: job.experience,
                    },
                    {
                      icon: <WalletOutlined size={24} />,
                      label: "workingHours",
                      value: job.workingHours,
                    },

                    {
                      icon: <WalletOutlined size={24} />,
                      label: "jobStatus",
                      value: job.jobStatus,
                    },
                    {
                      icon: <WalletOutlined size={24} />,
                      label: "contractLength",
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
                    <Grid item xs={12} sm={6} md={3} key={index}>
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
          Job not found!
        </Typography>
      )}

      {/* Related Jobs */}
      <Stack py={10} spacing={3}>
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
      </Stack>
    </Box>
  );
};

export default JobDetails;

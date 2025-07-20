import { Box, Icon, Stack, styled, Typography, useTheme } from "@mui/material";
import { BookmarkSimple, MapPin } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import CompanyLogo from "./CompanyLogo";
import { useSelector } from "react-redux";

// Styled component for job type
export const Duration = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 5,
  backgroundColor: `#E7F6EA`,
  textTransform: "capitalize",
  color: "#28B446",
  padding: "4px 8px",
  fontSize: "16px",
  fontWeight: 600,
  marginRight: theme.spacing(2),
  width: "80px",
  textAlign: "center",
}));

export const CompanyLogoStyle = styled("div")(() => ({
  position: "relative",
  borderRadius: 3, // Removed quotes, now valid
  backgroundColor: "#e1f5fe",
  padding: "4px", // More padding for better spacing
  width: "50px",
  minHeight: "40px", // Ensures consistent height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
}));

// JobCard component
const JobCard = ({ job }) => {
  const theme = useTheme();
  const { themeMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  console.log("jobId", job._id);
  // Random company logo (returns URL)

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      color={theme.palette.text.primary}
      sx={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: 2,
        background: `${
          themeMode === "dark"
            ? "linear-gradient(to right,rgba(245, 185, 20, 0.08),rgba(29, 27, 27, 0.72))"
            : "linear-gradient(to right,rgba(245, 185, 20, 0.08),rgba(255, 255, 255, 0.97))"
        }`,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 3,
        },
      }}
      minWidth={350}
    >
      <Stack gap={2}>
        <Box onClick={() => navigate(`/candidate/findjob/${job._id}`)}>
          <Typography variant="body1" fontWeight={600} fontSize={22}>
            {job.jobTitle}
          </Typography>
          <Typography>{job.jobRole}</Typography>
          <Stack direction="row" alignItems="center" mt={1}>
            <Duration>{job.workMode}</Duration>
            <Typography variant="body2" fontSize={20} color="text.secondary">
              Salary: {`$${job.minSalary} - $${job.maxSalary}`}
            </Typography>
          </Stack>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={2}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <CompanyLogoStyle>
              <CompanyLogo companyName={job.companyName} size={60} />
            </CompanyLogoStyle>
            <Stack>
              <Typography fontSize="18px" fontWeight={500}>
                {job.companyName}
              </Typography>
              <Typography fontSize="18px" color="text.secondary">
                <MapPin size={22} /> {job.address}
              </Typography>
            </Stack>
          </Stack>
          <Icon>
            <BookmarkSimple size={25} />
          </Icon>
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobCard;

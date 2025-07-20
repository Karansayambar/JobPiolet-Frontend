import {
  Box,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import proceesImage from "../../../assets/auth/Process.png";

const MostPopularVacancies = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const vacancies = [
    { title: "Anesthesiologists", positions: "45,904 Open Positions" },
    { title: "Software Engineers", positions: "78,210 Open Positions" },
    { title: "Marketing Managers", positions: "35,672 Open Positions" },
    { title: "Graphic Designers", positions: "22,890 Open Positions" },
    { title: "Data Scientists", positions: "40,561 Open Positions" },
    { title: "Project Managers", positions: "50,210 Open Positions" },
    { title: "Civil Engineers", positions: "32,000 Open Positions" },
    { title: "Accountants", positions: "41,530 Open Positions" },
    {
      title: "Customer Support Specialists",
      positions: "29,800 Open Positions",
    },
    { title: "Cybersecurity Analysts", positions: "25,670 Open Positions" },
    { title: "Human Resources Managers", positions: "38,450 Open Positions" },
    { title: "UX/UI Designers", positions: "27,320 Open Positions" },
  ];

  return (
    <Box>
      {/* Most Popular Vacancies */}
      <Stack spacing={3} px={{ xs: 2, sm: 6, md: 15, lg: 30 }} py={10}>
        {/* Section Title */}
        <Typography variant="h4" fontWeight={600} textAlign="center">
          Most Popular Vacancies
        </Typography>

        {/* List of Popular Vacancies */}
        <List
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,2fr)" : "repeat(4, 1fr)", // Single column on mobile, four on desktop
            gap: 3,
            textAlign: "left",
          }}
        >
          {vacancies.map((vacancy, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Left alignment
                textAlign: "left", // Ensure text stays left-aligned
                p: 2,
                borderRadius: "8px",
                backgroundColor: "background.paper",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: 3,
                },
              }}
            >
              <Typography variant="h6" fontWeight="500">
                {vacancy.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {vacancy.positions}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Stack>
      <Stack spacing={3} py={8}>
        {/* Section Title */}
        <Typography variant="h4" fontWeight={600} textAlign={"center"} py={4}>
          How jobpilot work
        </Typography>
        <Stack px={{ xs: 2, sm: 6, md: 15, lg: 30 }}>
          <img src={proceesImage} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default MostPopularVacancies;

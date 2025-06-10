import { Box, Stack, Typography, Paper } from "@mui/material";
import {
  SuitcaseSimple,
  Buildings,
  Users,
  PenNib,
  Code,
  MegaphoneSimple,
  VideoCamera,
  MusicNote,
  FirstAidKit,
  Database,
} from "phosphor-react";

// Reusable StatCard Component
const StatCard = ({ icon, numbers, title }) => (
  <Paper
    elevation={0}
    sx={{
      padding: 3,
      borderRadius: 1,
      minWidth: 250,
      maxWidth: 390,
      textAlign: "left",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      bgcolor: "white",
    }}
  >
    <Box p={1}>{icon}</Box>
    <Box>
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {numbers}
      </Typography>
    </Box>
  </Paper>
);

const data = [
  {
    icon: <SuitcaseSimple size={32} color="#1976d2" weight="duotone" />,
    numbers: "1,75,324",
    title: "Live Jobs",
  },
  {
    icon: <Buildings size={32} color="#1976d2" weight="duotone" />,
    numbers: "97,354",
    title: "Companies",
  },
  {
    icon: <Users size={32} color="#1976d2" weight="duotone" />,
    numbers: "38,47,154",
    title: "Candidates",
  },
  {
    icon: <SuitcaseSimple size={32} color="#1976d2" weight="duotone" />,
    numbers: "75,320",
    title: "New Jobs",
  }, // Fixed formatting
];

const category = [
  {
    icon: <PenNib size={32} color="#1976d2" weight="duotone" />,
    numbers: "357 Open position",
    title: "Graphics & Design",
  },
  {
    icon: <Code size={32} color="#1976d2" weight="duotone" />,
    numbers: "312 Open position",
    title: "Code & Programming",
  },
  {
    icon: <MegaphoneSimple size={32} color="#1976d2" weight="duotone" />,
    numbers: "297 Open position",
    title: "Digital Marketing",
  },
  {
    icon: <VideoCamera size={32} color="#1976d2" weight="duotone" />,
    numbers: "247 Open position",
    title: "Video & Animation",
  },
  {
    icon: <MusicNote size={32} color="#1976d2" weight="duotone" />,
    numbers: "204 Open position",
    title: "Music & Audio",
  },
  {
    icon: <Buildings size={32} color="#1976d2" weight="duotone" />,
    numbers: "167 Open position",
    title: "Account & Finance",
  },
  {
    icon: <FirstAidKit size={32} color="#1976d2" weight="duotone" />,
    numbers: "125 Open position",
    title: "Health & Care",
  },
  {
    icon: <Database size={32} color="#1976d2" weight="duotone" />,
    numbers: "247 Open position",
    title: "Data & Science",
  },
];

const HeroChip = () => (
  <Box py={6}>
    <Stack direction="row" spacing={4} flexWrap="wrap">
      {data.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </Stack>
  </Box>
);

const PopularCategoryChip = () => (
  <Box py={6}>
    <Stack
      direction="row"
      gap={4}
      sx={{
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {category.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </Stack>
  </Box>
);

export { PopularCategoryChip, HeroChip };

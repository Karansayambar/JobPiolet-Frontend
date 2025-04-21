import { Stack, styled, Typography } from "@mui/material";
import logo from "../../assets/auth/Logo.png";

// Define the progress bar component
const ProcessBar = () => {
  const { step } = useSelector((state) => state.company);
  console.log("i am happy", step);
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={3}
      px={20}
    >
      <img src={logo} alt="Company Logo" />
      <Stack gap={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          spacing={5}
        >
          <Typography>Setup Process</Typography>
          <Typography>{(step * 100) / 4}% Complete</Typography>
        </Stack>
        <Stack>
          <CustomizedProgressBars />
        </Stack>
      </Stack>
    </Stack>
  );
};

// Define the progress bar UI
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));
const CustomizedProgressBars = () => {
  const { step } = useSelector((state) => state.company);
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={(step * 100) / 4} />
    </Stack>
  );
};

// Export ProcessBar as the default and CustomizedProgressBars as a named export
export default ProcessBar;
export { CustomizedProgressBars };

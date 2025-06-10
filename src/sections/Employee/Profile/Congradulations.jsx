import { ArrowForward } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

const Congradulations = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  // Stop confetti after 5 seconds
  useEffect(() => {
    localStorage.setItem("companyProfile", "true");
    const timer = setTimeout(() => setShowConfetti(false), 7000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ height: "100vh", width: "100%", display: "flex" }}
    >
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Button
        sx={{
          padding: "20px",
          borderRadius: "50%",
          backgroundColor: "#E7F0F7",
        }}
      >
        <IoCheckmarkDoneSharp size={35} />
      </Button>
      <Stack alignItems={"center"} spacing={2}>
        <Typography variant="h5">
          🎉 Congradulations, Your profile is 100% complete !
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Now you can start posting jobs and managing your dashboard
          efficiently.
        </Typography>
        <Stack direction="row" justifyContent="flex-start" spacing={2} pt={3}>
          <Button
            variant="outlined"
            type="button"
            component={Link}
            to="/company/dashboard"
          >
            View Dashboard
          </Button>
          <Button variant="contained" type="submit">
            Post Job <ArrowForward />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Congradulations;

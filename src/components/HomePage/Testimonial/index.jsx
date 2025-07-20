import { Box, Stack, Typography, useTheme } from "@mui/material";
import banner1 from "../../../assets/auth/Candidate & Employers.jpg";
import banner2 from "../../../assets/auth/Candidate & Employers (1).jpg";
import { TestimonialCard, testimonials } from "../../Common/TestimonialCard";

const Testimonial = () => {
  const theme = useTheme();
  return (
    <>
      <Stack bgcolor={theme.palette.background.default} py={8}>
        <Typography
          textAlign={"center"}
          alignItems={"center"}
          variant="h4"
          fontWeight={600}
        >
          Database Clients Testimonial
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          py={4}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} data={testimonial} />
          ))}
        </Stack>
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        gap={4}
        p={{ xs: 4, sm: 10 }}
      >
        <Box
          component="img"
          width={{ xs: "90%" }}
          sx={{
            height: "auto", // maintain aspect ratio
            objectFit: "cover", // optional: control how image fits
          }}
          src={banner1}
          alt="Descriptive alt text" // Always include alt text
        />
        <Box
          component="img"
          width={{ xs: "90%" }}
          sx={{
            height: "auto", // maintain aspect ratio
            objectFit: "cover", // optional: control how image fits
          }}
          src={banner2}
          alt="Descriptive alt text" // Always include alt text
        />
      </Stack>
    </>
  );
};

export default Testimonial;

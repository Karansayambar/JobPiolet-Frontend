import { Stack, Typography, useTheme } from "@mui/material";
import banner1 from "../../../assets/auth/Candidate & Employers.jpg";
import banner2 from "../../../assets/auth/Candidate & Employers (1).jpg";
import { TestimonialCard, testimonials } from "../../Common/TestimonialCard";

const Testimonial = () => {
  const theme = useTheme();
  return (
    <>
      <Stack bgcolor={theme.palette.grey[100]} py={8}>
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
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={4}
        p={10}
      >
        <img src={banner1} />
        <img src={banner2} />
      </Stack>
    </>
  );
};

export default Testimonial;

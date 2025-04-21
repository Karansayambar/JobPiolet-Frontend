import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { Quotes, Star } from "phosphor-react";
import React from "react";

// Testimonial Data
export const testimonials = [
  {
    name: "Robert Fox",
    role: "UI/UX Designer",
    text: "“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Cooper",
    role: "Software Engineer",
    text: "“Amazing experience! The process was smooth, and the team was very supportive throughout.”",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "John Doe",
    role: "Product Manager",
    text: "“Highly recommended! Their professionalism and attention to detail are top-notch.”",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

// Testimonial Card Component
export const TestimonialCard: React.FC<{ data: (typeof testimonials)[0] }> = ({
  data,
}) => {
  return (
    <Card
      sx={{
        p: 3,
        maxWidth: 380,
        maxHeight: 300,
        borderRadius: 3,
        backgroundColor: "background.paper",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      {/* Star Icon */}
      <Star size={24} weight="fill" color="#FFC107" />

      {/* Testimonial Text */}
      <Typography variant="body1" sx={{ mt: 2, fontStyle: "italic" }}>
        {data.text}
      </Typography>

      {/* User Info */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mt: 3 }}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={2}>
          <Avatar src={data.image} alt={data.name} />
          <Stack textAlign="left">
            <Typography variant="h6" fontWeight={600}>
              {data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.role}
            </Typography>
          </Stack>
        </Stack>

        {/* Quote Icon */}
        <Box sx={{ mt: 2 }}>
          <Quotes size={32} weight="fill" color="#6C63FF" />
        </Box>
      </Stack>
    </Card>
  );
};

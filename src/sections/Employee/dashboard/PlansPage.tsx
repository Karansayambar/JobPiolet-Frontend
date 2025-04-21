import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import planImage from "../../../assets/plan-image.png";
import { Check } from "@mui/icons-material";
import { loadStripe } from "@stripe/stripe-js";
import CustomePlanCard from "../../../components/CustomePlanCard";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QwlGiFvL7ejiYUx21FXJtV9OdSzrIa5kW7ess7cQnj5pm13CefzNJRA3MkYIrrAmO1aFHBcHq2oQXZ8xqJ7upo900PzpApPCg"
);

const plans = [
  {
    name: "Basic",
    price: "$19",
    priceId: "price_1RCviuFvL7ejiYUxG3DbBcUL",
    billingCycle: "/ month",
    subtext:
      "Best for individuals or small teams starting out. Includes essential tools to begin posting jobs.",
    features: [
      "Post up to 5 jobs",
      "Basic analytics",
      "Limited visibility",
      "Email support",
    ],
    buttonText: "Choose Plan",
  },
  {
    name: "Standard",
    price: "$49",
    priceId: "price_1RCvjUFvL7ejiYUxKDQGr5td",
    billingCycle: "/ month",
    subtext:
      "Ideal for growing teams needing better exposure and tools. Unlock enhanced visibility and insights.",
    features: [
      "Post up to 20 jobs",
      "Advanced analytics",
      "Priority listing",
      "Chat & email support",
    ],
    buttonText: "Choose Plan",
  },
  {
    name: "Premium",
    price: "$99",
    priceId: "price_1RCvk0FvL7ejiYUxPTFk8N4Z",
    billingCycle: "/ month",
    subtext:
      "For companies hiring at scale. Get the best visibility, support, and recruitment features.",
    features: [
      "Unlimited job posts",
      "Full analytics suite",
      "Top listing priority",
      "Dedicated support manager",
    ],
    buttonText: "Choose Plan",
  },
];

const PlansPage = () => {
  const handlePayment = async (plan) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "http://localhost:5000/api/payment/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plan,
          }),
        }
      );

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ Redirects to Stripe checkout
      } else {
        console.error("Checkout session URL not found");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
  return (
    <>
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          width={"90%"}
        >
          <Box width={"50%"}>
            <Typography variant="h6" fontWeight={600}>
              Buy Premium Subscription to Post a Job
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              fontSize={18}
              py={2}
            >
              Gain access to exclusive features that boost your hiring
              experience. With a premium subscription, you can post unlimited
              jobs and attract top talent faster. Your listings get prioritized
              in search results, improving visibility. Enjoy detailed analytics
              to track job performance and streamline your recruitment process
              with premium support.
            </Typography>
          </Box>
          <Box>
            <img src={planImage} />
          </Box>
        </Stack>
        <Stack
          direction={"row"}
          gap={5}
          py={5}
          alignItems={"center"}
          position={"relative"}
        >
          {plans?.map((plan, index) => (
            <Card
              variant="outlined"
              key={index}
              sx={{
                width: index % 2 === 0 ? 250 : 350,
                height: index % 2 === 0 ? 650 : 580,

                p: 2,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "primary.main",
                  cursor: "pointer",
                },
              }}
              outlined
              elevation={1}
              position={"relative"}
            >
              <CardContent>
                {plan.price === "$49" && (
                  <Stack
                    position={"absolute"}
                    top={50}
                    padding={1}
                    paddingInline={3}
                    bgcolor={"primary.main"}
                    textAlign={"center"}
                    color={"white"}
                    borderRadius={1}
                  >
                    <Typography fontSize={18}>Recomended</Typography>
                  </Stack>
                )}
                <Typography
                  variant="body2"
                  py={2}
                  textTransform={"uppercase"}
                  fontSize={25}
                >
                  {plan.name}
                </Typography>
                <Typography>{plan.subtext}</Typography>
                <Stack py={3} direction={"row"} gap={2} alignItems={"center"}>
                  <Typography sx={{ color: "primary.main", fontSize: 40 }}>
                    {plan.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" fontSize={30}>
                    {plan.billingCycle}
                  </Typography>
                </Stack>
                <Stack>
                  {plan.features.map((feature) => (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      alignItems={"center"}
                      padding={2}
                      fontSize={18}
                    >
                      <Check
                        sx={{ color: "primary.main", paddingInline: "5px" }}
                      />
                      {feature}
                    </Typography>
                  ))}
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() => {
                    handlePayment(plan);
                  }}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default PlansPage;

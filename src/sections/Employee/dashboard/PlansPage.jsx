import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import planImage from "../../../assets/plan-image.png";
import { Check } from "@mui/icons-material";
import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51QwlGiFvL7ejiYUx21FXJtV9OdSzrIa5kW7ess7cQnj5pm13CefzNJRA3MkYIrrAmO1aFHBcHq2oQXZ8xqJ7upo900PzpApPCg"
// );

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
  const [loading, setLoading] = useState(false); // Loading state for payment
  const [error, setError] = useState(""); // Error state for API calls

  const handlePayment = async (plan) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to subscribe.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://job-piolet-frontend.vercel.app/api/payment/create-subscription",
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
        setError("An error occurred while creating the subscription.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box py={8}>
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
            <img src={planImage} alt="Subscription Plans" />
          </Box>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Stack
          spacing={5}
          py={5}
          justifyContent="center"
          direction={"flex"}
          gap={2}
        >
          {plans.map((plan, index) => (
            <Stack key={index}>
              <Card
                variant="outlined"
                sx={{
                  height: "700px",
                  width: "250px",
                  p: 2,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "primary.main",
                    cursor: "pointer",
                  },
                }}
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
                      <Typography fontSize={18}>Recommended</Typography>
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
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      fontSize={30}
                    >
                      {plan.billingCycle}
                    </Typography>
                  </Stack>
                  <Stack>
                    {plan.features.map((feature, index) => (
                      <Typography
                        key={index}
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
                    onClick={() => handlePayment(plan)}
                    disabled={loading} // Disable the button when loading
                  >
                    {loading ? <CircularProgress size={24} /> : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default PlansPage;

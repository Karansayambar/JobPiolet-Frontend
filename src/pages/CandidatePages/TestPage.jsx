import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { questions } from "../../utils/data";
import Question from "../../components/Common/Question";
import * as blazeface from "@tensorflow-models/blazeface";
import { useApplyToJobMutation } from "../../services/jobsApi";
import { useParams } from "react-router-dom";

const TestPage = () => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [faceViolations, setFaceViolations] = useState(0);
  const [applyToJob] = useApplyToJobMutation();
  const { jobId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds

  const videoRef = useRef(); // Type videoRef

  const handleAnswer = ({ qIndex, selectedOption, isCorrect }) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: selectedOption,
    }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleApply();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    // Type seconds
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start camera
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };
    startVideo();
  }, []);

  // Tab switch detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setTabSwitchCount((prev) => prev + 1);
        alert("⚠️ Tab switching is not allowed!");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Clipboard restrictions
  useEffect(() => {
    const preventAction = (e) => {
      // Type the event as ClipboardEvent
      e.preventDefault();
      alert("❌ This action is not allowed!");
    };
    document.addEventListener("copy", preventAction);
    document.addEventListener("paste", preventAction);
    document.addEventListener("cut", preventAction);
    return () => {
      document.removeEventListener("copy", preventAction);
      document.removeEventListener("paste", preventAction);
      document.removeEventListener("cut", preventAction);
    };
  }, []);

  const detectFace = async (video, model) => {
    const predictions = await model.estimateFaces(video, false);

    if (predictions.length === 0) return { status: "no-face" };
    if (predictions.length > 1) return { status: "multiple-faces" };

    const face = predictions[0];
    const landmarks = face.landmarks; // Explicitly cast landmarks as an array of [x, y] pairs

    // Ensure landmarks are defined and of the expected length
    if (!landmarks || landmarks.length < 2) {
      return { status: "no-face" };
    }

    const rightEye = landmarks[0]; // [x, y]
    const leftEye = landmarks[1]; // [x, y]

    const eyeDiffX = Math.abs(rightEye[0] - leftEye[0]);

    const threshold = 100;
    if (eyeDiffX < threshold) return { status: "looking-away" };

    return { status: "face-detected" };
  };

  // Face detection
  useEffect(() => {
    let model;
    const init = async () => {
      model = await blazeface.load();
    };
    init();

    const interval = setInterval(async () => {
      if (videoRef.current && model) {
        const result = await detectFace(videoRef.current, model);
        if (
          result.status === "no-face" ||
          result.status === "multiple-faces" ||
          result.status === "looking-away"
        ) {
          setFaceViolations((prev) => prev + 1);
        }
        console.log("Face Status:", result.status);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleApply = async () => {
    if (!jobId) {
      alert("Invalid job ID!");
      return;
    }

    try {
      const response = await applyToJob({ jobId, score }).unwrap();
      console.log("Response:", response);
      setIsSubmitted(true);
      alert("✅ Test submitted successfully!");
    } catch (err) {
      console.error("Error applying:", err);
    }
  };

  return (
    <Box>
      <Stack direction="row" p={4}>
        {/* Left side - Questions navigation */}
        <Stack
          flex={1}
          spacing={3}
          textAlign="center"
          overflow="scroll"
          height="100vh"
          p={4}
        >
          {questions.map((_, index) => {
            const isSelected = selectedQuestionIndex === index;
            const isAnswered = answers[index] !== undefined;
            return (
              <Box
                key={index}
                p={4}
                m={1}
                bgcolor={
                  isSelected ? "#1976d2" : isAnswered ? "#90caf9" : "#EEEEEE"
                }
                color={isSelected ? "white" : "black"}
                borderRadius={1}
                boxShadow={1}
                sx={{ cursor: "pointer", transition: "0.3s" }}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                <Typography variant="h6">{index + 1}</Typography>
              </Box>
            );
          })}
        </Stack>

        {/* Center - Question display */}
        <Stack flex={14} p={5}>
          <Question
            question={questions[selectedQuestionIndex]}
            index={selectedQuestionIndex}
            onAnswer={handleAnswer}
          />
        </Stack>

        {/* Right side - Info panel */}
        <Stack flex={4}>
          <Stack alignItems="center" spacing={2}>
            <Button
              onClick={handleApply}
              variant="contained"
              disabled={isSubmitted}
            >
              Submit Test
            </Button>

            <Box width={350} height={200} border={1} my={4}>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            <Typography variant="h5" gutterBottom>
              Test Instructions
            </Typography>
            <Stack gap={4}>
              <Typography>* Stay in front of your webcam.</Typography>
              <Typography>
                * 30 MCQs | 30 mins | 1 correct option per question.
              </Typography>
              <Typography>
                * No tab switching or background movement allowed.
              </Typography>
              <Typography>* Read each question carefully.</Typography>
            </Stack>

            <Stack gap={2} alignItems="center" mt={3}>
              <Typography variant="h6">
                ⏱️ Time Left: {formatTime(timeLeft)}
              </Typography>
              <Typography color="error">
                Tab Switches: {tabSwitchCount}
              </Typography>
              <Typography color="error">
                Face Violations: {faceViolations}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TestPage;

import { Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { questions } from "../../utils/data";
import Question from "../../components/Common/Question";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";

const TestPage = () => {
  const theme = useTheme();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [faceViolations, setFaceViolations] = useState(0);

  const videoRef = useRef(null);

  const handleAnswer = ({ qIndex, selectedOption, isCorrect }) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: selectedOption,
    }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
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

  // Clipboard actions block
  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault();
      alert("❌ Copying is not allowed!");
    };
    const handlePaste = (e) => {
      e.preventDefault();
      alert("❌ Pasting is not allowed!");
    };
    const handleCut = (e) => {
      e.preventDefault();
      alert("❌ Cutting is not allowed!");
    };

    document.addEventListener("copy", handleCopy);
    document.addEventListener("paste", handlePaste);
    document.addEventListener("cut", handleCut);

    return () => {
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("paste", handlePaste);
      document.removeEventListener("cut", handleCut);
    };
  }, []);

  // Face detection logic
  const detectFace = async (video, model) => {
    const predictions = await model.estimateFaces(video, false);

    if (predictions.length === 0) return { status: "no-face" };
    if (predictions.length > 1) return { status: "multiple-faces" };

    const face = predictions[0];
    const rightEye = face.landmarks[0];
    const leftEye = face.landmarks[1];
    const eyeDiffX = Math.abs(rightEye[0] - leftEye[0]);

    const threshold = 100; // tune if needed
    if (eyeDiffX < threshold) return { status: "looking-away" };

    return { status: "face-detected" };
  };

  // Load model and periodically check face
  useEffect(() => {
    let model;
    const init = async () => {
      model = await blazeface.load();
    };
    init();

    const interval = setInterval(async () => {
      if (videoRef.current && model) {
        const result = await detectFace(videoRef);

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

  return (
    <Box>
      <Stack>
        <Stack direction={"row"} p={4}>
          <Stack
            flex={1}
            spacing={3}
            textAlign={"center"}
            overflow={"scroll"}
            height={"100vh"}
            p={4}
          >
            {questions.map((el, index) => {
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

          <Stack flex={14} p={5}>
            <Question
              question={questions[selectedQuestionIndex]}
              index={selectedQuestionIndex}
              onAnswer={handleAnswer}
            />
          </Stack>

          <Stack flex={4}>
            <Stack alignItems={"center"}>
              <Stack gap={2} alignItems={"center"}>
                <Typography variant="h5" gutterBottom>
                  30.0 Minutes Remaining
                </Typography>
                <Typography color="error">
                  Tab Switches: {tabSwitchCount}
                </Typography>
                <Typography color="error">
                  Face Violations: {faceViolations}
                </Typography>
                <Typography variant="h6" color="error">
                  Face Violations: {faceViolations}
                </Typography>
              </Stack>

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
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TestPage;

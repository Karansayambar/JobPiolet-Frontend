import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";

type DetectionEntry = {
  time: string;
  type: string;
};

const useFaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [detectionLog, setDetectionLog] = useState<DetectionEntry[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    };
    loadModels();
  }, []);

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

  useEffect(() => {
    if (!videoRef.current) return;

    const interval = setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        videoRef.current as HTMLVideoElement,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length > 1) {
        const timestamp = new Date().toISOString();
        setAlerts((prev) => [...prev, "⚠️ Multiple faces detected"]);
        setDetectionLog((prev) => [
          ...prev,
          { time: timestamp, type: "Multiple Faces" },
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { videoRef, alerts, detectionLog };
};

export default useFaceDetection;

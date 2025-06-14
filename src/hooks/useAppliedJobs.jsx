import { useEffect } from "react";
import { useState } from "react";
import { createSocket } from "../utils/socket";

const useAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();

  useEffect(() => {
    setIsLoading(true);
    const socket = createSocket();

    socket.on("connect", () => {
      socket.emit("getAppliedJobs");
    });

    socket.on("getAppliedJobs", (data) => {
      if (data.success) {
        const jobs = data.appliedJobs.map((job) => ({
          ...job.getJobDetails,
          applicationDate: job.applicationDate,
          status: job.status,
        }));
        setAppliedJobs(jobs);
        setCount(data.count);
      } else {
        setAppliedJobs([]);
        setMessage(data.message);
      }
      setIsLoading(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return { appliedJobs, message, count, isLoading };
};

export default useAppliedJobs;

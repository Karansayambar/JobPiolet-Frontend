import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "../utils/socket";
// import { createSocket } from "../utils/socket";

const useAlertJobs = () => {
  const [jobsAlert, setJobsAlert] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alertCount, setAlertCount] = useState();
  const socket = useSocket();

  useEffect(() => {
    const jobPreference = localStorage.getItem("title")?.toLowerCase();
    setIsLoading(true);
    if (socket) {
      socket.emit("getJobsForUser");

      socket.on("jobsForUser", (data) => {
        if (data.success) {
          const targetDate = new Date("2025-06-11");

          const newJobs = data.matchingJobs.filter((job) => {
            const jobDate = new Date(job.createdAt);
            return (
              jobDate.getFullYear() === targetDate.getFullYear() &&
              jobDate.getMonth() === targetDate.getMonth() &&
              jobDate.getDate() === targetDate.getDate()
            );
          });
          console.log("newJobs", newJobs);
          setJobsAlert(newJobs);
          setAlertCount(newJobs.length);
          setIsLoading(false);
        } else {
          console.error(data.message);
          setJobsAlert([]);
          setMessage(data.setMessage);
          setIsLoading(false);
        }
      });
      // Listen for new job broadcast
      socket.on("newJobPosted", (newJob) => {
        if (jobPreference) {
          if (
            newJob.jobRole.toLowerCase().includes(jobPreference) ||
            newJob.jobTitle.toLowerCase().includes(jobPreference)
          ) {
            setJobsAlert((prevJobs) => [...prevJobs, newJob]);
            alert(`New matching job: ${newJob.jobRole}`);
          }
        }
      });
    }
    return () => {
      socket?.off("jobsForUser");
      socket?.off("newJobPosted");
    };
  }, []);
  return { jobsAlert, message, alertCount, isLoading };
};

export default useAlertJobs;

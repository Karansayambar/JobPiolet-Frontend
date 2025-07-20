import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "../utils/socket";

const useAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState();
  const socket = useSocket();

  useEffect(() => {
    setIsLoading(true);
    if (socket) {
      socket.emit("getAppliedJobs");
      socket.on("getAppliedJobs", (data) => {
        if (data.success) {
          console.log("data", data);
          setAppliedJobs(data.appliedJobs);
          setCount(data.appliedJobs.length);
        } else {
          setAppliedJobs([]);
          setMessage(data.message);
        }
        setIsLoading(false);
      });
    }

    return () => {
      socket?.off("getAppliedJobs");
    };
  }, []);

  return { appliedJobs, message, count, isLoading };
};

export default useAppliedJobs;

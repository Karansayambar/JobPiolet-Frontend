import { useEffect } from "react";
import { useState } from "react";
import { createSocket } from "../utils/socket";

const useFavoriteJobs = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const socket = createSocket();
    socket.on("connect", () => {
      socket.emit("getFavoriteJobs");
    });

    try {
      socket.on("getFavoriteJobs", (data) => {
        if (data.success) {
          setFavoriteJobs(data.favoriteJobsList);
          setFavoriteCount(data.favoriteJobsList.length);
          setMessage(data.message);
        } else {
          setMessage(data.message);
        }
        setIsLoading(false);
      });
    } catch (error) {
      setMessage(error.message);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  return { favoriteJobs, favoriteCount, isLoading };
};

export default useFavoriteJobs;

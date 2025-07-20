import { useEffect } from "react";
import { useState } from "react";
import { useSocket } from "../utils/socket";

const useFavoriteJobs = () => {
  const [favoriteJobs, setFavoriteJobs] = useState([]);
  const [message, setMessage] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    setIsLoading(true);
    if (socket) {
      socket.emit("getFavoriteJobs");

      try {
        socket.on("getFavoriteJobs", (data) => {
          if (data.success) {
            console.log("data", data);
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
    }

    return () => {
      socket?.off("getFavoriteJobs");
    };
  }, []);

  return { favoriteJobs, favoriteCount, isLoading };
};

export default useFavoriteJobs;

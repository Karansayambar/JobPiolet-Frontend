import { io } from "socket.io-client";

export const createSocket = () => {
  return io("https://jobpiolet-backend-1.onrender.com", {
    auth: {
      token: localStorage.getItem("token"),
    },
  });
};

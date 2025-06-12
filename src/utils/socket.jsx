import { io } from "socket.io-client";

// const url = "http://localhost:5000"; // Update this to your backend URL
const url = "https://jobpiolet-backend-1.onrender.com"; // Update this to your backend URL
export const createSocket = () => {
  return io(url, {
    auth: {
      token: localStorage.getItem("token"),
    },
  });
};

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";

const url = "http://localhost:5000"; // Update this to your backend URL
// const url = "https://jobpiolet-backend-1.onrender.com"; // Update this to your backend URL
// export const createSocket = () => {
//   return io(url, {
//     auth: {
//       token: localStorage.getItem("token"),
//     },
//   });
// };

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      auth: { token: localStorage.getItem("token") },
    });

    newSocket.on("connect", () => {
      console.log("🔌 Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

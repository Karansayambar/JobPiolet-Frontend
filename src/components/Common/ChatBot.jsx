import React, { useEffect, useRef, useState } from "react";
import chatBotImg from "../../assets/chatbot.png";
import { Chat } from "phosphor-react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  Paper,
  Fade,
  Slide,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Send } from "@mui/icons-material";
import { useSocket } from "../../utils/socket";
// import { createSocket } from "../../utils/socket";

const ChatBot = () => {
  const [closeBox, setCloseBox] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef([]);
  const messagesEndRef = useRef(null);
  const theme = useTheme();

  const socket = useSocket();
  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    messagesRef.current = messages;
  }, [messages]);

  // Send message handler
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    setMessages((prev) => [...prev, { from: "user", text: inputText }]);
    socket.emit("send_message", { message: inputText });
    setInputText("");
    setIsTyping(true);
  };

  useEffect(() => {
    if (!socket) return;

    const handleReceiveChunk = (data) => {
      console.log("Chunk received:", data);
      const currentMessages = [...messagesRef.current];

      if (
        currentMessages.length &&
        currentMessages[currentMessages.length - 1].from !== "user"
      ) {
        currentMessages[currentMessages.length - 1].text += data.chunk;
      } else {
        currentMessages.push({ from: "bot", text: data.chunk });
      }

      setMessages(currentMessages);
    };

    const handleCompleteMessage = () => {
      console.log("Bot finished message");
      setIsTyping(false);
    };

    const handleErrorMessage = (data) => {
      console.error("AI Error:", data.error);
      const currentMessages = [...messagesRef.current];
      currentMessages.push({
        from: "bot",
        text: "⚠️ Error processing your request.",
      });
      setMessages(currentMessages);
      setIsTyping(false);
    };

    // Register listeners
    socket.on("receive_chunk", handleReceiveChunk);
    socket.on("complete_message", handleCompleteMessage);
    socket.on("error_message", handleErrorMessage);

    // Cleanup
    return () => {
      socket?.off("receive_chunk", handleReceiveChunk);
      socket?.off("complete_message", handleCompleteMessage);
      socket?.off("error_message", handleErrorMessage);
    };
  }, [socket]);

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
      {closeBox ? (
        <Fade in={closeBox}>
          <Box
            onClick={() => setCloseBox(false)}
            sx={{
              position: "fixed",
              bottom: 80,
              right: 30,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <img
              src={chatBotImg}
              alt="Chat Bot"
              style={{ width: "80px", height: "80px", padding: "10px" }}
            />
          </Box>
        </Fade>
      ) : (
        <Slide direction="left" in={!closeBox} mountOnEnter unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              position: "fixed",
              bottom: 60,
              right: 30,
              width: 400,
              height: 500,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              overflow: "hidden",
              zIndex: 999,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                Chat Bot
              </Typography>
              <IconButton
                onClick={() => setCloseBox(true)}
                sx={{ color: "primary.contrastText" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Chat Messages */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
              }}
            >
              {messages.map((msg, i) => (
                <Box
                  sx={{
                    textAlign: msg.from === "user" ? "left" : "right",
                  }}
                >
                  <Typography
                    key={i}
                    variant="body2"
                    my={10}
                    sx={{
                      textAlign: msg.from === "user" ? "left" : "left",
                      my: 1,
                      p: 1,
                      borderRadius: 1,
                      bgcolor: msg.from === "user" ? "#cce5ff" : "#e2e3e5",
                      display: "inline-block",
                      maxWidth: "85%",
                    }}
                  >
                    {msg.text.split(/(?<=[.?!])\s*/).map((sentence, index) => (
                      <React.Fragment key={index}>
                        <span>{sentence}</span>
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </Box>
              ))}

              {isTyping && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "left",
                    fontStyle: "italic",
                    color: "gray",
                    mt: 1,
                  }}
                >
                  Bot is typing...
                </Typography>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input Area */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                borderTop: "1px solid #ccc",
                gap: 1,
              }}
            >
              <Chat size={22} color="#007bff" />
              <TextField
                placeholder="Ask something..."
                size="small"
                variant="outlined"
                fullWidth
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              />
              <IconButton onClick={handleSendMessage}>
                <Send />
              </IconButton>
            </Box>
          </Paper>
        </Slide>
      )}
    </Box>
  );
};

export default ChatBot;

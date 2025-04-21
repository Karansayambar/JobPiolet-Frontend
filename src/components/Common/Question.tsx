import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const Question = ({ question, index, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState({});

  const handleSelectOption = (option) => {
    setSelectedOption((prev) => ({
      ...prev,
      [index]: option,
    }));
    const isCorrect = option === question.answer;
    onAnswer({ qIndex: index, selectedOption: option, isCorrect });
  };
  return (
    <Box width={"100%"}>
      <Stack textAlign={"start"}>
        <Typography variant="h4" mb={4}>
          {question.question}
        </Typography>
        {question.options.map((option, i) => (
          <Box
            key={i}
            p={3}
            my={3}
            borderRadius={2}
            sx={{
              backgroundColor:
                selectedOption[index] === option ? "#90caf9" : "#EEEEEE",
              //   color: selectedOption[index] === option ? "#fff" : "#000",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => handleSelectOption(option)}
          >
            <Typography variant="body1">{option}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Question;

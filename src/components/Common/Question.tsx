import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface QuestionProps {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  index: number;
  onAnswer: (result: {
    qIndex: number;
    selectedOption: string;
    isCorrect: boolean;
  }) => void;
}

const Question = ({ question, index, onAnswer }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<Record<number, string>>(
    {}
  );

  const handleSelectOption = (option: string) => {
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

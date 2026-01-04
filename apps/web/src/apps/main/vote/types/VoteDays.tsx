import { useState } from "react";
import VoteIcons from "../icons/VoteIcons";
import { Swipe } from "../SwipeUtils";
import { Box, Typography, Button, Stack } from "@mui/material";
import DayVoteCard from "../../components/DayVoteCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  fDV: () => void;
  days_to_vote_on: { id: string }[] | undefined;
  setDLikes: React.Dispatch<React.SetStateAction<string[]>>;
  onBack: () => void;
};

const VoteDays = ({ days_to_vote_on, fDV, setDLikes, onBack }: Props) => {
  const length = days_to_vote_on?.length;
  const [index, setIndex] = useState<number>(0);
  const time = days_to_vote_on && days_to_vote_on[index];
  const [swipe, setSwipe] = useState<Swipe>({ id: "", direction: "" });

  if (index === length) {
    fDV();
    return <></>;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ pt: 2 }}
    >
      <Stack
        spacing={2}
        sx={{ width: "100%", maxWidth: "600px", mb: 3, px: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon fontSize="small" />}
            onClick={onBack}
            size="small"
            sx={{
              color: "#F59E0B",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                bgcolor: "rgba(245, 158, 11, 0.1)",
              },
            }}
          >
            Back
          </Button>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            {index + 1} / {length}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight={600}>
          Pick Your Days
        </Typography>
      </Stack>
      <DayVoteCard dayId={time?.id} swipe={swipe} />
      <VoteIcons
        index={index}
        item={time}
        items={days_to_vote_on}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setDLikes}
      />
    </Box>
  );
};

export default VoteDays;

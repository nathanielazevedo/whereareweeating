import { useState } from "react";
import VoteIcons from "../icons/VoteIcons";
import { Swipe, getSwipe } from "../SwipeUtils";
import { Box, Typography, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  times_to_vote_on: { id: string }[] | undefined;
  fTV: () => void;
  setHLikes: React.Dispatch<React.SetStateAction<string[]>>;
  onBack: () => void;
};

const VoteTime = ({ times_to_vote_on, fTV, setHLikes, onBack }: Props) => {
  const length = times_to_vote_on?.length;
  const [index, setIndex] = useState<number>(0);
  const time = times_to_vote_on && times_to_vote_on[index];
  const [swipe, setSwipe] = useState<Swipe>({ id: "", direction: "" });

  if (index === length) {
    fTV();
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
          Pick Your Times
        </Typography>
      </Stack>
      <Box className={time && getSwipe(time.id, swipe)} sx={styles.c}>
        <Box sx={styles.iC}>
          <Typography variant="h1">{time?.id}</Typography>
        </Box>
      </Box>
      <VoteIcons
        index={index}
        item={time}
        items={times_to_vote_on}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setHLikes}
      />
    </Box>
  );
};

export default VoteTime;

const styles = {
  c: {
    height: "350px",
    display: "flex",
    borderRadius: "12px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    width: { xs: "350px", md: "500px" },
  },
  iC: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};

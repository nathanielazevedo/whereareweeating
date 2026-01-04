import VoteIcons from "../icons/VoteIcons";
import { Swipe } from "../SwipeUtils";
import { useEffect, useState } from "react";
import RCard from "../../../../components/RCard";
import { Box, LinearProgress, Stack, Typography, Button } from "@mui/material";
import { Restaurant } from "../../../../models/Restaurant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  fRV: () => void;
  restaurants: Restaurant[] | undefined;
  setRLikes: React.Dispatch<React.SetStateAction<string[]>>;
  onBack: () => void;
};

const VoteRestaurant = ({ restaurants, fRV, setRLikes, onBack }: Props) => {
  const [index, setIndex] = useState<number>(0);
  const length = restaurants && restaurants.length;
  const restaurant = restaurants && restaurants[index];
  const [swipe, setSwipe] = useState<Swipe>({ id: "", direction: "" });

  useEffect(() => {
    restaurants?.forEach((restaurant) => {
      const img = new Image();
      img.src = restaurant.image_url;
    });
  }, [restaurants]);

  if (index === length) {
    fRV();
    return <></>;
  }

  const progress = length ? ((index + 1) / length) * 100 : 0;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      sx={{ width: "100%", maxWidth: "600px", mx: "auto", pt: 2 }}
    >
      <Stack spacing={2} sx={{ width: "100%", mb: 3, px: 2 }}>
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
          Pick Your Favorites
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "background.paper",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              background: "linear-gradient(90deg, #E04F3F 0%, #F2A93B 100%)",
            },
          }}
        />
      </Stack>
      <RCard restaurant={restaurant} swipe={swipe} />
      <VoteIcons
        index={index}
        item={restaurant}
        items={restaurants}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setRLikes}
      />
    </Box>
  );
};

export default VoteRestaurant;

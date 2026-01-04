import StepsCard from "./StepsCard";
import { Box, Typography } from "@mui/material";
import { constants } from "../../constants";

const HowItWorks = () => {
  return (
    <Box sx={styles.outerContainer}>
      <Typography variant="h4" fontWeight={600} mb={6} textAlign="center">
        How It Works
      </Typography>
      <Box sx={styles.cardsContainer}>
        {constants.marketingCards.map((card, i) => {
          return <StepsCard key={i} i={i} card={card} />;
        })}
      </Box>
    </Box>
  );
};

export default HowItWorks;

const styles = {
  outerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: { xs: "80px 20px", lg: "100px 20px" },
  },
  cardsContainer: {
    display: "flex",
    alignItems: "stretch",
    gap: "24px",
    width: "100%",
    maxWidth: "1100px",
    flexDirection: { xs: "column", lg: "row" },
  },
};

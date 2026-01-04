import { Box, Typography } from "@mui/material";

type Props = {
  card: {
    title: string;
    description: string;
  };
  i: number;
};

const StepsCard = ({ card, i }: Props) => {
  return (
    <Box
      key={i}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: { xs: "100%", lg: "800px" },
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "-20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          color: "text.primary",
        }}
      >
        <Typography variant="h4" color="primary">
          {Number(i) + 1}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          minHeight: "190px",
          maxHeight: "190px",
          marginTop: "20px",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            marginBottom: "10px",
            color: "text.primary",
          }}
        >
          {card.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {card.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default StepsCard;

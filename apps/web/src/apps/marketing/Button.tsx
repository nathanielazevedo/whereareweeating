import { setSwipeDirection } from "../../state";
import { useAppDispatch } from "../../state/redux";
import { Button as MuiButton, Typography } from "@mui/material";

const Button = ({ text, onClick }: { text: string; onClick?: () => void }) => {
  const dispatch = useAppDispatch();
  return (
    <MuiButton
      fullWidth
      color="primary"
      variant="contained"
      sx={{
        height: "50px",
        width: { xs: "100%", sm: "100%" },
        borderRadius: "5px",
        bgcolor: "#F59E0B",
        "&:hover": {
          bgcolor: "#D97706",
        },
      }}
      onClick={() => {
        dispatch(setSwipeDirection("left"));
        onClick && onClick();
      }}
    >
      <Typography color="#000000" variant="h6" fontWeight={600}>
        {text}
      </Typography>
    </MuiButton>
  );
};

export default Button;

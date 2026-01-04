import { setSwipeDirection } from "../state";
import { useAppDispatch } from "../state/redux";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  text: string;
  height?: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean | undefined;
  type?: "button" | "submit" | "reset" | undefined;
};

const MainButton = ({
  text,
  icon,
  type,
  height,
  onClick,
  selected = false,
  disabled = false,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      fullWidth
      variant="outlined"
      disabled={disabled}
      type={type ?? "button"}
      onClick={() => {
        onClick && onClick();
        dispatch(setSwipeDirection("left"));
      }}
      sx={{
        height: height ?? "50px",
        borderColor: selected ? "primary.main" : "divider",
        color: selected ? "primary.contrastText" : "text.primary",
        backgroundColor: selected ? "primary.main" : "transparent",
        transition: "background-color 150ms ease, border-color 150ms ease",
        "&:hover": {
          borderColor: "primary.main",
          backgroundColor: selected
            ? "primary.light"
            : "rgba(224, 79, 63, 0.12)",
        },
        "&:disabled": {
          opacity: 0.4,
          color: "text.secondary",
          borderColor: "divider",
        },
      }}
    >
      <Typography color="inherit">{text}</Typography>
      {icon && (
        <Box display="flex" alignSelf="center" alignItems="center">
          {icon}
        </Box>
      )}
    </Button>
  );
};

export default MainButton;

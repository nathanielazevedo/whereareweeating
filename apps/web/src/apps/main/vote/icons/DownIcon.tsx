import { useState } from "react";
import { Swipe } from "../SwipeUtils";
import { animated, useSpring } from "react-spring";
import { Restaurant } from "../../../../models/Restaurant";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

type Props = {
  index: number;
  buttonsActive: boolean;
  setSwipe: (swipe: Swipe) => void;
  setLikes: (likes: string[]) => void;
  item: Restaurant | { id: string } | undefined;
  items: Restaurant[] | { id: string }[] | undefined;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setButtonsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const DownIcon = (props: Props) => {
  const [state, toggle] = useState(false);
  const { item, setSwipe, setIndex, buttonsActive, setButtonsActive } = props;

  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  });
  return (
    <animated.div
      style={{
        scale: x.to({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
        }),
      }}
    >
      <IconButton
        onClick={() => {
          if (!buttonsActive) return;
          toggle(!state);
          setButtonsActive(false);
          item && setSwipe({ id: item.id, direction: "left" });
          setTimeout(() => {
            setIndex((prevState: number) => prevState + 1);
            setButtonsActive(true);
          }, 1000);
        }}
        sx={{
          width: 70,
          height: 70,
          bgcolor: "rgba(244, 67, 54, 0.15)",
          border: "2px solid",
          borderColor: "error.main",
          "&:hover": {
            bgcolor: "error.main",
            transform: "scale(1.1)",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
          transition: "all 0.2s ease",
        }}
      >
        <CloseIcon sx={{ fontSize: 40, color: "error.main" }} />
      </IconButton>
    </animated.div>
  );
};

export default DownIcon;

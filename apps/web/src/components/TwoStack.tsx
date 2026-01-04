import { Link } from "react-router-dom";
import Button from "../apps/marketing/Button";
import { Box, Typography } from "@mui/material";

type Props = {
  title?: string;
  body: string;
  variant: string;
  noButton?: boolean;
  noTitle?: boolean;
};

const TwoStack = ({ title, body, variant, noButton, noTitle }: Props) => {
  if (variant === "hero") {
    return (
      <Box>
        {!noTitle && title && (
          <Typography variant="h2" mb={1.5}>
            {title}
          </Typography>
        )}
        {body && (
          <Typography mb={3} variant="h6" color="text.secondary">
            {body}
          </Typography>
        )}
        <Link to="/party/create">
          <Button text="Create a Party" />
        </Link>
      </Box>
    );
  } else {
    return (
      <Box>
        <Typography mb={1} variant="h3" fontWeight="bold" color="text.primary">
          {title}
        </Typography>
        <Typography color="text.secondary" mb={2}>
          {body}
        </Typography>
        {!noButton && (
          <Link to="/party/create">
            <Button text="Create a Party" />
          </Link>
        )}
      </Box>
    );
  }
};

export default TwoStack;

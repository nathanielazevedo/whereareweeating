import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import {
  Button,
  DialogActions,
  Slide,
  Typography,
  Box,
  Stack,
  IconButton,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { logo } from "../../../assets";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const NewPartyDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: "500px",
          maxWidth: "90vw",
          padding: 0,
          backgroundImage: "none",
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(24, 27, 34, 0) 100%)",
          borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
          p: 3,
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "text.secondary",
            "&:hover": {
              bgcolor: "rgba(245, 158, 11, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Where are we eating?"
            sx={{
              height: "48px",
              width: "auto",
            }}
          />
        </Box>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          Welcome to the Party!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Let's find the perfect place to eat together
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                bgcolor: "rgba(245, 158, 11, 0.1)",
                borderRadius: "8px",
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HowToVoteIcon sx={{ color: "#F59E0B" }} />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={600} mb={0.5}>
                Vote on restaurants
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Swipe through options and pick your favorites
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box
              sx={{
                bgcolor: "rgba(245, 158, 11, 0.1)",
                borderRadius: "8px",
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShareIcon sx={{ color: "#F59E0B" }} />
            </Box>
            <Box>
              <Typography variant="body1" fontWeight={600} mb={0.5}>
                Share with friends
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Copy the link and invite everyone to vote
              </Typography>
            </Box>
          </Stack>

          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#F59E0B",
              color: "#000",
              fontWeight: 700,
              py: 1.5,
              borderRadius: "8px",
              "&:hover": {
                bgcolor: "#D97706",
              },
            }}
          >
            Let's Go!
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default NewPartyDialog;

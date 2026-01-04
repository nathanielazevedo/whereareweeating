import Dialog from "@mui/material/Dialog";
import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleBack: (res: string) => void;
};

const BackDialog = ({ open, setOpen, handleBack }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        style: {
          padding: 0,
          backgroundImage: "none",
          borderRadius: "12px",
          maxWidth: "460px",
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

        <Typography variant="h6" fontWeight={600} color="text.primary">
          Are you sure?
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Going back will reset your votes. Do you want to submit your votes so
          far? If you submit your votes, you will not be able to change them
          later.
        </Typography>

        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              onClick={() => handleBack("cancel")}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "rgba(128, 128, 128, 0.3)",
                color: "text.primary",
                fontWeight: 600,
                py: 1.5,
                "&:hover": {
                  borderColor: "rgba(128, 128, 128, 0.5)",
                  bgcolor: "rgba(128, 128, 128, 0.05)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleBack("leave")}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#F59E0B",
                color: "#F59E0B",
                fontWeight: 600,
                py: 1.5,
                "&:hover": {
                  borderColor: "#FBBF24",
                  bgcolor: "rgba(245, 158, 11, 0.1)",
                },
              }}
            >
              Just Leave
            </Button>
          </Box>
          <Button
            onClick={() => handleBack("submit")}
            variant="contained"
            fullWidth
            sx={{
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
            Leave and Submit
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default BackDialog;

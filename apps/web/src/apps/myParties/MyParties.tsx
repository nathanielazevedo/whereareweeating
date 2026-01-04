import { setRParty } from "../../state";
import { Link } from "react-router-dom";
import SlideIn from "../../components/SlideIn";
import {
  Box,
  Card,
  Stack,
  Typography,
  IconButton,
  Dialog,
  Button,
} from "@mui/material";
import { useAppDispatch } from "../../state/redux";
import {
  LocalParty,
  getPartiesFromLocal,
  removePartyFromLocal,
} from "../../utils/localStorage";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { logo } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MyParties = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  dispatch(setRParty(undefined));

  const [parties, setParties] = useState<LocalParty[]>(
    (getPartiesFromLocal() || []).sort((a, b) => {
      // Sort by created_at descending (newest first)
      const aTime = a.created_at || 0;
      const bTime = b.created_at || 0;
      return bTime - aTime;
    })
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partyToDelete, setPartyToDelete] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, partyId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setPartyToDelete(partyId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (partyToDelete) {
      removePartyFromLocal(partyToDelete);
      setParties(
        (getPartiesFromLocal() || []).sort((a, b) => {
          const aTime = a.created_at || 0;
          const bTime = b.created_at || 0;
          return bTime - aTime;
        })
      );
    }
    setDeleteDialogOpen(false);
    setPartyToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPartyToDelete(null);
  };

  return (
    <SlideIn>
      <Box sx={{ mb: 3 }}>
        <Box
          component="img"
          src={logo}
          alt="Where are we eating?"
          onClick={() => navigate("/")}
          sx={{
            height: "88px",
            width: "auto",
            cursor: "pointer",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Your Parties
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {parties.length} {parties.length === 1 ? "party" : "parties"}
        </Typography>
      </Box>

      {parties.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          <RestaurantIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.primary" mb={1} fontWeight={600}>
            No parties yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first party to get started!
          </Typography>
        </Card>
      ) : (
        <Stack spacing={2} sx={{ mb: 40 }}>
          {parties.map((party: LocalParty) => (
            <Link
              key={party._id}
              to={`/party/${party._id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  p: 2.5,
                  position: "relative",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(245, 158, 11, 0.15)",
                      flexShrink: 0,
                    }}
                  >
                    <RestaurantIcon
                      sx={{
                        fontSize: 28,
                        color: "#F59E0B",
                      }}
                    />
                  </Box>

                  <Stack spacing={1} flexGrow={1} sx={{ minWidth: 0 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {party.name || "Food Party"}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      {party.r_likes && party.r_likes.length > 0 && (
                        <Typography variant="body2" color="text.secondary">
                          🍽️ {party.r_likes.length}{" "}
                          {party.r_likes.length === 1 ? "like" : "likes"}
                        </Typography>
                      )}
                      <Typography variant="caption" color="text.secondary">
                        Party ID: {party._id.slice(-6)}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={(e) => handleDeleteClick(e, party._id)}
                      size="small"
                      sx={{
                        color: "text.secondary",
                        "&:hover": {
                          color: "error.main",
                          bgcolor: "rgba(244, 67, 54, 0.1)",
                        },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                    <ChevronRightIcon sx={{ color: "text.secondary" }} />
                  </Box>
                </Box>
              </Card>
            </Link>
          ))}
        </Stack>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 460,
            width: "100%",
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)",
            borderBottom: "2px solid #F59E0B",
            py: 2.5,
            px: 3,
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#F59E0B",
              textAlign: "center",
              pr: 4,
            }}
          >
            Delete Party?
          </Typography>
          <IconButton
            onClick={handleCancelDelete}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255, 255, 255, 0.7)",
              "&:hover": {
                color: "#F59E0B",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              textAlign: "center",
              mb: 3,
              fontSize: "1rem",
            }}
          >
            Are you sure you want to delete this party? This action cannot be
            undone.
          </Typography>

          {/* Actions */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              onClick={handleCancelDelete}
              variant="outlined"
              sx={{
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "rgba(255, 255, 255, 0.7)",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              sx={{
                backgroundColor: "#dc2626",
                color: "white",
                textTransform: "none",
                px: 3,
                "&:hover": {
                  backgroundColor: "#b91c1c",
                },
              }}
            >
              Delete Party
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </SlideIn>
  );
};

export default MyParties;

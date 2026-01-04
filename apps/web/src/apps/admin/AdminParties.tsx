import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Stack,
  Typography,
  Chip,
  IconButton,
  Dialog,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Party } from "../../models/Party";
import { logo } from "../../assets";
import SlideIn from "../../components/SlideIn";
import { baseUrl } from "../../api";

interface Feedback {
  _id: string;
  liked: boolean;
  message: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminParties = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [parties, setParties] = useState<Party[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partyToDelete, setPartyToDelete] = useState<string | null>(null);
  const [partiesPage, setPartiesPage] = useState(1);
  const [feedbackPage, setFeedbackPage] = useState(1);
  const [partiesPagination, setPartiesPagination] = useState({
    total: 0,
    totalPages: 0,
    hasMore: false,
  });
  const [feedbackPagination, setFeedbackPagination] = useState({
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  // Only allow access in development
  useEffect(() => {
    if (import.meta.env.PROD) {
      navigate("/");
      return;
    }

    const fetchAllParties = async () => {
      try {
        const response = await fetch(
          `${baseUrl}party/all?page=${partiesPage}&limit=50`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch parties");
        }
        const data = await response.json();
        setParties(data.parties);
        setPartiesPagination(data.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load parties");
      } finally {
        setLoading(false);
      }
    };

    const fetchAllFeedback = async () => {
      try {
        const response = await fetch(
          `${baseUrl}feedback?page=${feedbackPage}&limit=50`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch feedback");
        }
        const data = await response.json();
        setFeedbacks(data.feedback);
        setFeedbackPagination(data.pagination);
      } catch (err) {
        console.error("Failed to load feedback:", err);
      }
    };

    fetchAllParties();
    fetchAllFeedback();
  }, [navigate, partiesPage, feedbackPage]);

  const handleDeleteClick = (e: React.MouseEvent, partyId: string) => {
    e.stopPropagation();
    setPartyToDelete(partyId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!partyToDelete) return;

    try {
      const response = await fetch(`${baseUrl}party/${partyToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete party");
      }

      // Remove from local state
      setParties(parties.filter((p) => p._id !== partyToDelete));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete party");
    } finally {
      setDeleteDialogOpen(false);
      setPartyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPartyToDelete(null);
  };

  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <SlideIn>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
          pb: 4,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(245, 158, 11, 0.2)",
            py: 2,
            px: 3,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton
                onClick={() => navigate("/")}
                sx={{
                  color: "#F59E0B",
                  "&:hover": {
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                  },
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Admin Dashboard
              </Typography>
              <Chip
                label="DEV ONLY"
                size="small"
                sx={{
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  color: "#EF4444",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              />
            </Stack>
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "40px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            />
          </Stack>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "rgba(245, 158, 11, 0.2)",
            px: 3,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                "&.Mui-selected": {
                  color: "#F59E0B",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#F59E0B",
              },
            }}
          >
            <Tab label={`Parties (${partiesPagination.total})`} />
            <Tab label={`Feedback (${feedbackPagination.total})`} />
          </Tabs>
        </Box>

        {/* Content */}
        <Box sx={{ maxWidth: 1200, mx: "auto", px: 3, pt: 4 }}>
          {loading ? (
            <Typography
              sx={{ color: "rgba(255, 255, 255, 0.7)", textAlign: "center" }}
            >
              Loading...
            </Typography>
          ) : error ? (
            <Typography sx={{ color: "#EF4444", textAlign: "center" }}>
              {error}
            </Typography>
          ) : (
            <>
              {activeTab === 0 ? (
                // Parties Tab
                parties.length === 0 ? (
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      textAlign: "center",
                    }}
                  >
                    No parties found
                  </Typography>
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: "rgba(255, 255, 255, 0.5)",
                        mb: 3,
                        fontSize: "0.9rem",
                      }}
                    >
                      Total: {parties.length}{" "}
                      {parties.length === 1 ? "party" : "parties"}
                    </Typography>
                    <Stack spacing={2}>
                      {parties.map((party) => (
                        <Card
                          key={party._id}
                          onClick={() => navigate(`/party/${party._id}`)}
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: 2,
                            p: 3,
                            cursor: "pointer",
                            transition: "all 0.2s",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.08)",
                              borderColor: "#F59E0B",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <Stack spacing={2}>
                            {/* Party Name & ID */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    color: "#F59E0B",
                                    fontWeight: 600,
                                    mb: 0.5,
                                  }}
                                >
                                  {party.name || "Food Party"}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                                >
                                  ID: {party._id}
                                </Typography>
                              </Box>
                              <IconButton
                                onClick={(e) => handleDeleteClick(e, party._id)}
                                sx={{
                                  color: "rgba(255, 255, 255, 0.5)",
                                  "&:hover": {
                                    color: "#EF4444",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                  },
                                }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Box>

                            {/* Stats */}
                            <Stack direction="row" spacing={3}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <RestaurantIcon
                                  sx={{ color: "#F59E0B", fontSize: 20 }}
                                />
                                <Typography
                                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                                >
                                  {party.restaurants?.length || 0} restaurants
                                </Typography>
                              </Stack>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <PeopleIcon
                                  sx={{ color: "#F59E0B", fontSize: 20 }}
                                />
                                <Typography
                                  sx={{ color: "rgba(255, 255, 255, 0.9)" }}
                                >
                                  {party.max_voters || "Unlimited"} max voters
                                </Typography>
                              </Stack>
                            </Stack>

                            {/* Location & Type */}
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {party.location && (
                                <Chip
                                  label={party.location}
                                  size="small"
                                  sx={{
                                    backgroundColor: "rgba(128, 128, 128, 0.1)",
                                    color: "rgba(255, 255, 255, 0.7)",
                                    border:
                                      "1px solid rgba(128, 128, 128, 0.2)",
                                  }}
                                />
                              )}
                              {party.type && (
                                <Chip
                                  label={party.type}
                                  size="small"
                                  sx={{
                                    backgroundColor: "rgba(128, 128, 128, 0.1)",
                                    color: "rgba(255, 255, 255, 0.7)",
                                    border:
                                      "1px solid rgba(128, 128, 128, 0.2)",
                                  }}
                                />
                              )}
                              {party.price && (
                                <Chip
                                  label={party.price}
                                  size="small"
                                  sx={{
                                    backgroundColor: "rgba(128, 128, 128, 0.1)",
                                    color: "rgba(255, 255, 255, 0.7)",
                                    border:
                                      "1px solid rgba(128, 128, 128, 0.2)",
                                  }}
                                />
                              )}
                            </Stack>

                            {/* Voting Options */}
                            {(party.vote_on_days || party.vote_on_hours) && (
                              <Stack direction="row" spacing={1}>
                                {party.vote_on_days && (
                                  <Chip
                                    label="Day Voting"
                                    size="small"
                                    sx={{
                                      backgroundColor:
                                        "rgba(245, 158, 11, 0.1)",
                                      color: "#F59E0B",
                                      border:
                                        "1px solid rgba(245, 158, 11, 0.3)",
                                    }}
                                  />
                                )}
                                {party.vote_on_hours && (
                                  <Chip
                                    label="Time Voting"
                                    size="small"
                                    sx={{
                                      backgroundColor:
                                        "rgba(245, 158, 11, 0.1)",
                                      color: "#F59E0B",
                                      border:
                                        "1px solid rgba(245, 158, 11, 0.3)",
                                    }}
                                  />
                                )}
                              </Stack>
                            )}
                          </Stack>
                        </Card>
                      ))}
                    </Stack>

                    {/* Pagination Controls */}
                    {partiesPagination.totalPages > 1 && (
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mt: 4 }}
                      >
                        <Button
                          onClick={() =>
                            setPartiesPage((p) => Math.max(1, p - 1))
                          }
                          disabled={partiesPage === 1}
                          variant="outlined"
                          sx={{
                            borderColor: "rgba(245, 158, 11, 0.3)",
                            color: "#F59E0B",
                            "&:hover": {
                              borderColor: "#F59E0B",
                              backgroundColor: "rgba(245, 158, 11, 0.1)",
                            },
                            "&:disabled": {
                              borderColor: "rgba(255, 255, 255, 0.1)",
                              color: "rgba(255, 255, 255, 0.3)",
                            },
                          }}
                        >
                          Previous
                        </Button>
                        <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          Page {partiesPage} of {partiesPagination.totalPages}
                        </Typography>
                        <Button
                          onClick={() => setPartiesPage((p) => p + 1)}
                          disabled={!partiesPagination.hasMore}
                          variant="outlined"
                          sx={{
                            borderColor: "rgba(245, 158, 11, 0.3)",
                            color: "#F59E0B",
                            "&:hover": {
                              borderColor: "#F59E0B",
                              backgroundColor: "rgba(245, 158, 11, 0.1)",
                            },
                            "&:disabled": {
                              borderColor: "rgba(255, 255, 255, 0.1)",
                              color: "rgba(255, 255, 255, 0.3)",
                            },
                          }}
                        >
                          Next
                        </Button>
                      </Stack>
                    )}
                  </>
                )
              ) : // Feedback Tab
              feedbacks.length === 0 ? (
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                  }}
                >
                  No feedback yet
                </Typography>
              ) : (
                <>
                  <Stack spacing={2}>
                    {feedbacks.map((feedback) => (
                      <Card
                        key={feedback._id}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: 2,
                          p: 3,
                        }}
                      >
                        <Stack spacing={2}>
                          {/* Header with like/dislike */}
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              {feedback.liked ? (
                                <ThumbUpIcon
                                  sx={{ color: "#22C55E", fontSize: 20 }}
                                />
                              ) : (
                                <ThumbDownIcon
                                  sx={{ color: "#EF4444", fontSize: 20 }}
                                />
                              )}
                              <Typography
                                sx={{
                                  color: feedback.liked ? "#22C55E" : "#EF4444",
                                  fontWeight: 600,
                                }}
                              >
                                {feedback.liked ? "Positive" : "Negative"}
                              </Typography>
                            </Stack>
                            <Typography
                              sx={{
                                color: "rgba(255, 255, 255, 0.4)",
                                fontSize: "0.85rem",
                              }}
                            >
                              {new Date(feedback.createdAt).toLocaleString()}
                            </Typography>
                          </Stack>

                          {/* Message */}
                          {feedback.message && (
                            <Box
                              sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                borderRadius: 1,
                                p: 2,
                                borderLeft: `3px solid ${
                                  feedback.liked ? "#22C55E" : "#EF4444"
                                }`,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "rgba(255, 255, 255, 0.9)",
                                  fontSize: "0.95rem",
                                  fontStyle: feedback.message
                                    ? "normal"
                                    : "italic",
                                }}
                              >
                                {feedback.message || "No message provided"}
                              </Typography>
                            </Box>
                          )}

                          {/* Meta info */}
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                              pt: 1,
                              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            {feedback.ipAddress && (
                              <Typography
                                sx={{
                                  color: "rgba(255, 255, 255, 0.4)",
                                  fontSize: "0.8rem",
                                }}
                              >
                                IP: {feedback.ipAddress}
                              </Typography>
                            )}
                          </Stack>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>

                  {/* Pagination Controls */}
                  {feedbackPagination.totalPages > 1 && (
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                      sx={{ mt: 4 }}
                    >
                      <Button
                        onClick={() =>
                          setFeedbackPage((p) => Math.max(1, p - 1))
                        }
                        disabled={feedbackPage === 1}
                        variant="outlined"
                        sx={{
                          borderColor: "rgba(245, 158, 11, 0.3)",
                          color: "#F59E0B",
                          "&:hover": {
                            borderColor: "#F59E0B",
                            backgroundColor: "rgba(245, 158, 11, 0.1)",
                          },
                          "&:disabled": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            color: "rgba(255, 255, 255, 0.3)",
                          },
                        }}
                      >
                        Previous
                      </Button>
                      <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Page {feedbackPage} of {feedbackPagination.totalPages}
                      </Typography>
                      <Button
                        onClick={() => setFeedbackPage((p) => p + 1)}
                        disabled={!feedbackPagination.hasMore}
                        variant="outlined"
                        sx={{
                          borderColor: "rgba(245, 158, 11, 0.3)",
                          color: "#F59E0B",
                          "&:hover": {
                            borderColor: "#F59E0B",
                            backgroundColor: "rgba(245, 158, 11, 0.1)",
                          },
                          "&:disabled": {
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            color: "rgba(255, 255, 255, 0.3)",
                          },
                        }}
                      >
                        Next
                      </Button>
                    </Stack>
                  )}
                </>
              )}
            </>
          )}
        </Box>

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
              Are you sure you want to permanently delete this party from the
              database? This action cannot be undone.
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
      </Box>
    </SlideIn>
  );
};

export default AdminParties;

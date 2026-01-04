import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  Fade,
  Card,
  TextField,
  IconButton,
} from "@mui/material";

import API from "../../../api";
import { setRParty } from "../../../state";
import { useAppSelector } from "../../../state/redux";
import {
  addPartyToLocal,
  getPartyFromLocal,
  haveLocalParties,
  removePartyFromLocal,
} from "../../../utils/localStorage";

import PartyDeleted from "../PartyDeleted";
import SlideIn from "../../../components/SlideIn";
import NewPartyDialog from "../dialogs/NewPartyDialog";
import PasswordDialog from "../dialogs/PasswordDialog";

import PartyHeader from "../components/PartyHeader";
import RCarousel from "../components/RCarousel";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DCarousel from "../components/DCarousel";
import HCarousel from "../components/HCarousel";
import { logo } from "../../../assets";

const Entry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [voted, setVoted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const party = useAppSelector((state) => state.party);

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const res = await API.getParty(id);
        dispatch(setRParty(res));

        const newParty = { _id: id, has_voted: false, name: res.name };
        const partiesInLocal = haveLocalParties();

        if (!partiesInLocal) {
          addPartyToLocal(newParty);
        } else {
          const localParty = getPartyFromLocal(id);
          if (!localParty) {
            addPartyToLocal(newParty);
          } else {
            setVoted(localParty.has_voted);
          }
        }

        if (searchParams.get("new")) {
          setShowNewDialog(true);
        }
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message) {
          id && removePartyFromLocal(id);
          setShowDelete(true);
        } else {
          console.log("uh oh");
        }
      }
    };

    getParty();
  }, [dispatch, id, searchParams]);

  const handleCopy = () => {
    if (!party || !party._id) return;
    const url = `${window.location.origin}/party/${party._id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!party || !party._id) return;
    const url = `${window.location.origin}/party/${party._id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: party.name || "Food Party",
          text: `Vote on where we should eat! Join "${
            party.name || "Food Party"
          }"`,
          url: url,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      handleCopy();
    }
  };

  const handleEditName = () => {
    setEditedName(party.name || "Food Party");
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    if (!party || !party._id || !editedName.trim()) return;
    try {
      await API.updateParty(party._id, { name: editedName.trim() });
      dispatch(setRParty({ ...party, name: editedName.trim() }));
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update party name", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName("");
  };

  if (showDelete) return <PartyDeleted />;
  if (!party)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 3,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Loading..."
          sx={{
            height: "120px",
            width: "auto",
            animation: "pulse 2s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                opacity: 1,
                transform: "scale(1)",
              },
              "50%": {
                opacity: 0.6,
                transform: "scale(1.05)",
              },
            },
          }}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              bgcolor: "#F59E0B",
              animation: "bounce 1.4s ease-in-out infinite",
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                  opacity: 0.5,
                },
                "40%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              bgcolor: "#F59E0B",
              animation: "bounce 1.4s ease-in-out 0.2s infinite",
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                  opacity: 0.5,
                },
                "40%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              bgcolor: "#F59E0B",
              animation: "bounce 1.4s ease-in-out 0.4s infinite",
              "@keyframes bounce": {
                "0%, 80%, 100%": {
                  transform: "scale(0)",
                  opacity: 0.5,
                },
                "40%": {
                  transform: "scale(1)",
                  opacity: 1,
                },
              },
            }}
          />
        </Stack>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontWeight: 600 }}
        >
          Loading your party...
        </Typography>
      </Box>
    );

  return (
    <>
      <PasswordDialog
        open={showPassword}
        setOpen={setShowPassword}
        party={party}
      />
      <NewPartyDialog open={showNewDialog} setOpen={setShowNewDialog} />

      <SlideIn>
        {/* Header with Logo */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          <Button
            variant="outlined"
            onClick={() => navigate("/party/my-parties")}
            sx={{
              borderColor: "#F59E0B",
              color: "#F59E0B",
              fontWeight: 600,
              textTransform: "none",
              borderWidth: "2px",
              "&:hover": {
                borderColor: "#D97706",
                bgcolor: "rgba(245, 158, 11, 0.05)",
                borderWidth: "2px",
              },
            }}
          >
            My Parties
          </Button>
        </Box>

        {/* Party Header with Stats */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(24, 27, 34, 0) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)",
            },
          }}
        >
          {isEditingName ? (
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <TextField
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                variant="outlined"
                size="small"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveName();
                  if (e.key === "Escape") handleCancelEdit();
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    fontWeight: 700,
                    fontSize: "2rem",
                    "& fieldset": {
                      borderColor: "#F59E0B",
                      borderWidth: "2px",
                    },
                    "&:hover fieldset": {
                      borderColor: "#FBBF24",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#F59E0B",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    py: 1,
                  },
                }}
              />
              <IconButton
                onClick={handleSaveName}
                sx={{
                  color: "#22C55E",
                  "&:hover": { bgcolor: "rgba(34, 197, 94, 0.1)" },
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                onClick={handleCancelEdit}
                sx={{
                  color: "text.secondary",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Typography variant="h4" fontWeight={700}>
                {party.name || "Food Party"}
              </Typography>
              <IconButton
                onClick={handleEditName}
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    color: "#F59E0B",
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          )}

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2}>
            <Chip
              label={`${party.restaurants?.length || 0} places`}
              size="small"
              sx={{
                bgcolor: "rgba(245, 158, 11, 0.15)",
                color: "#F59E0B",
                fontWeight: 600,
              }}
            />
            <Chip
              label={`${party.voters_so_far || 0} voted`}
              size="small"
              sx={{
                bgcolor: "rgba(245, 158, 11, 0.15)",
                color: "#F59E0B",
                fontWeight: 600,
              }}
            />
            {voted && (
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                label="You voted"
                size="small"
                sx={{
                  bgcolor: "rgba(34, 197, 94, 0.15)",
                  color: "#22C55E",
                  fontWeight: 600,
                }}
              />
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack spacing={2} mb={4}>
          {/* Vote Button - Primary CTA */}
          <Link
            to={`/party/${id}/vote`}
            style={{
              textDecoration: "none",
              pointerEvents: voted ? "none" : "auto",
            }}
          >
            <Button
              size="large"
              startIcon={<HowToVoteOutlinedIcon />}
              variant="contained"
              fullWidth
              disabled={voted}
              sx={{
                height: "56px",
                bgcolor: voted ? "rgba(245, 158, 11, 0.3)" : "#F59E0B",
                color: voted ? "rgba(0, 0, 0, 0.4)" : "#000000",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: voted ? "rgba(245, 158, 11, 0.3)" : "#D97706",
                },
              }}
            >
              {voted ? "✓ Already Voted" : "Vote Now"}
            </Button>
          </Link>

          {/* Share Buttons Row */}
          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              startIcon={shareSuccess ? <CheckCircleIcon /> : <ShareIcon />}
              onClick={handleShare}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: shareSuccess ? "#22C55E" : "#F59E0B",
                color: shareSuccess ? "#22C55E" : "#F59E0B",
                borderRadius: "5px",
                fontWeight: 600,
                textTransform: "none",
                borderWidth: "2px",
                "&:hover": {
                  borderColor: shareSuccess ? "#22C55E" : "#D97706",
                  bgcolor: shareSuccess
                    ? "rgba(34, 197, 94, 0.05)"
                    : "rgba(245, 158, 11, 0.05)",
                  borderWidth: "2px",
                },
              }}
            >
              {shareSuccess ? "Shared!" : "Share"}
            </Button>

            <Button
              size="large"
              startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
              onClick={handleCopy}
              variant="outlined"
              fullWidth
              sx={{
                borderColor: copied ? "#22C55E" : "#F59E0B",
                color: copied ? "#22C55E" : "#F59E0B",
                borderRadius: "5px",
                fontWeight: 600,
                textTransform: "none",
                borderWidth: "2px",
                "&:hover": {
                  borderColor: copied ? "#22C55E" : "#D97706",
                  bgcolor: copied
                    ? "rgba(34, 197, 94, 0.05)"
                    : "rgba(245, 158, 11, 0.05)",
                  borderWidth: "2px",
                },
              }}
            >
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </Stack>
        </Stack>

        {/* Restaurant List */}
        <Stack spacing={3}>
          {party.restaurants && party.restaurants.length > 0 && (
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <RestaurantIcon sx={{ color: "#F59E0B" }} />
                <Typography variant="h6" fontWeight={700}>
                  Restaurants ({party.restaurants.length})
                </Typography>
              </Stack>
              <Stack spacing={2}>
                {party.restaurants
                  .map((restaurant) => ({
                    ...restaurant,
                    voteCount: party.r_votes[restaurant.id] || 0,
                  }))
                  .sort((a, b) => b.voteCount - a.voteCount)
                  .map((restaurant, index) => {
                    const rank = index + 1;
                    const isTopVoted = rank === 1 && restaurant.voteCount > 0;

                    return (
                      <Card
                        key={restaurant.id || index}
                        sx={{
                          p: 0,
                          height: "110px",
                          borderRadius: "12px",
                          background: isTopVoted
                            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(251, 191, 36, 0.1) 100%)"
                            : "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                          border: isTopVoted
                            ? "2px solid #F59E0B"
                            : "1px solid rgba(245, 158, 11, 0.2)",
                          transition: "all 0.2s ease",
                          overflow: "hidden",
                          position: "relative",
                          "&:hover": {
                            borderColor: "#F59E0B",
                          },
                          "&::before": isTopVoted
                            ? {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: "3px",
                                background:
                                  "linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%)",
                                animation: "shimmer 2s infinite",
                              }
                            : {},
                          "@keyframes shimmer": {
                            "0%": { backgroundPosition: "-200% 0" },
                            "100%": { backgroundPosition: "200% 0" },
                          },
                        }}
                      >
                        <Stack direction="row" spacing={0} height="100%">
                          {/* Restaurant Image */}
                          {restaurant.image_url && (
                            <Box
                              sx={{
                                width: "110px",
                                height: "110px",
                                flexShrink: 0,
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                component="img"
                                src={restaurant.image_url}
                                alt={restaurant.name}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              {/* Vote Badge */}
                              {restaurant.voteCount > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 8,
                                    left: 8,
                                    background: isTopVoted
                                      ? "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)"
                                      : "rgba(0, 0, 0, 0.8)",
                                    color: isTopVoted ? "#000" : "#fff",
                                    borderRadius: "8px",
                                    px: 1.5,
                                    py: 0.75,
                                    fontSize: "0.75rem",
                                    fontWeight: 800,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    boxShadow: isTopVoted
                                      ? "0 2px 12px rgba(245, 158, 11, 0.6), 0 0 20px rgba(255, 215, 0, 0.4)"
                                      : "0 2px 8px rgba(0, 0, 0, 0.3)",
                                    border: isTopVoted
                                      ? "2px solid #000"
                                      : "none",
                                    transform: isTopVoted
                                      ? "scale(1.05)"
                                      : "scale(1)",
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  {isTopVoted && (
                                    <span style={{ fontSize: "1rem" }}>🏆</span>
                                  )}
                                  {restaurant.voteCount}{" "}
                                  {restaurant.voteCount === 1
                                    ? "vote"
                                    : "votes"}
                                </Box>
                              )}
                            </Box>
                          )}

                          {/* Restaurant Info */}
                          <Stack
                            spacing={1}
                            p={1.5}
                            flex={1}
                            justifyContent="center"
                          >
                            {/* Restaurant Name & Rating */}
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              spacing={1}
                            >
                              <Box flex={1} minWidth={0}>
                                <Typography
                                  variant="body2"
                                  fontWeight={700}
                                  noWrap
                                >
                                  {restaurant.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  noWrap
                                  sx={{ fontSize: "0.75rem" }}
                                >
                                  {restaurant.location?.address1}
                                </Typography>
                              </Box>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                flexShrink={0}
                              >
                                <Typography
                                  variant="caption"
                                  fontWeight={600}
                                  color="#F59E0B"
                                  sx={{ fontSize: "0.75rem" }}
                                >
                                  ⭐ {restaurant.rating}
                                </Typography>
                                {restaurant.price && (
                                  <Typography
                                    variant="caption"
                                    fontWeight={600}
                                    color="#F59E0B"
                                    sx={{ fontSize: "0.75rem" }}
                                  >
                                    • {restaurant.price}
                                  </Typography>
                                )}
                              </Stack>
                            </Stack>

                            {/* Categories */}
                            {restaurant.categories &&
                              restaurant.categories.length > 0 && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  {restaurant.categories
                                    .slice(0, 2)
                                    .map((cat, idx) => (
                                      <Chip
                                        key={idx}
                                        label={cat.title}
                                        size="small"
                                        sx={{
                                          height: 18,
                                          fontSize: "0.625rem",
                                          bgcolor: "rgba(128, 128, 128, 0.1)",
                                          color: "text.secondary",
                                          border:
                                            "1px solid rgba(128, 128, 128, 0.2)",
                                        }}
                                      />
                                    ))}
                                </Box>
                              )}

                            {/* Bottom Row */}
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.7rem" }}
                              >
                                {restaurant.review_count} reviews
                              </Typography>
                              {restaurant.url && (
                                <Button
                                  href={restaurant.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  size="small"
                                  sx={{
                                    color: "#F59E0B",
                                    textTransform: "none",
                                    p: 0,
                                    minWidth: "auto",
                                    fontSize: "0.7rem",
                                    "&:hover": {
                                      bgcolor: "transparent",
                                      textDecoration: "underline",
                                    },
                                  }}
                                >
                                  Yelp →
                                </Button>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      </Card>
                    );
                  })}
              </Stack>
            </Box>
          )}

          {party.day_options && party.day_options.length > 0 && (
            <Card
              sx={{
                p: 2.5,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <CalendarTodayIcon sx={{ color: "#F59E0B" }} />
                <Typography variant="h6" fontWeight={700}>
                  Day Options
                </Typography>
              </Stack>
              <DCarousel party={party} />
            </Card>
          )}

          {party.time_options && party.time_options.length > 0 && (
            <Card
              sx={{
                p: 2.5,
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <AccessTimeIcon sx={{ color: "#F59E0B" }} />
                <Typography variant="h6" fontWeight={700}>
                  Time Options
                </Typography>
              </Stack>
              <HCarousel party={party} />
            </Card>
          )}
        </Stack>
      </SlideIn>
    </>
  );
};

export default Entry;

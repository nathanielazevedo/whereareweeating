import { useState } from "react";
import CustomDialog from "./CustomDialog";
import SlideIn from "../../components/SlideIn";
import MainButton from "../../components/MainButton";
import BackIconAction from "../../components/backIcons/BackIconAction";
import { logo } from "../../assets";
import {
  Box,
  Card,
  Chip,
  IconButton,
  Link,
  Skeleton,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  CustomRestaurant,
  Restaurant,
  RestaurantCreate,
} from "../../models/Restaurant";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  fetchMore: () => void;
  createParty: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  restaurants: Restaurant[] | undefined;
  setRestaurants: React.Dispatch<
    React.SetStateAction<(Restaurant | CustomRestaurant)[] | undefined>
  >;
  submitting: boolean;
};

const RPreview = ({
  setStep,
  fetchMore,
  restaurants,
  submitting,
  setRestaurants,
  createParty,
}: Props) => {
  const [customOpen, setCustomOpen] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const removeRestaurant = (id: string) => {
    setRestaurants((prev) => prev?.filter((r) => r.id !== id));
  };

  const handleFetchMore = async () => {
    setLoadingMore(true);
    const prevLength = restaurants?.length || 0;
    await fetchMore();
    setLoadingMore(false);
    setSnackbarOpen(true);
    // Scroll to top to show new restaurants
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const createRestaurant = (restaurant: RestaurantCreate) => {
    setCustomOpen(false);
    const obj = {
      ...restaurant,
      location: {
        address1: restaurant.location as string,
      },
    } as CustomRestaurant;
    setRestaurants((prev) => (prev ? [...prev, obj] : [obj]));
  };

  const hasEnough = () => (restaurants?.length ?? 0) >= 2;

  return (
    <>
      <SlideIn>
        {customOpen && (
          <CustomDialog
            open={customOpen}
            setOpen={setCustomOpen}
            createRestaurant={createRestaurant}
          />
        )}

        {/* Sticky Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "background.default",
            pb: 2,
            mb: 2,
            borderBottom: "1px solid",
            borderColor: "rgba(245, 158, 11, 0.2)",
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ArrowBackIcon fontSize="small" />}
                onClick={() => setStep(0)}
                size="small"
                sx={{
                  color: "#F59E0B",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgba(245, 158, 11, 0.1)",
                  },
                }}
              >
                Go Back
              </Button>
              <Box
                component="img"
                src={logo}
                alt="Where are we eating?"
                sx={{
                  height: "60px",
                  width: "auto",
                }}
              />
            </Box>

            <Button
              fullWidth
              disabled={!hasEnough() || submitting}
              onClick={createParty}
              variant="contained"
              sx={{
                height: "56px",
                bgcolor: "#F59E0B",
                color: "#000000",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#D97706",
                },
                "&:disabled": {
                  bgcolor: "rgba(245, 158, 11, 0.3)",
                  color: "rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              {submitting ? "Creating..." : "Create Party"}
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Chip
                  icon={
                    loadingMore ? (
                      <CircularProgress size={16} sx={{ color: "#F59E0B" }} />
                    ) : (
                      <RefreshIcon fontSize="small" />
                    )
                  }
                  label={loadingMore ? "Loading..." : "Load More"}
                  onClick={handleFetchMore}
                  disabled={loadingMore}
                  variant="outlined"
                  size="medium"
                  sx={{
                    borderColor: "#F59E0B",
                    color: "#F59E0B",
                    "&:hover": {
                      bgcolor: "rgba(245, 158, 11, 0.1)",
                      borderColor: "#F59E0B",
                    },
                  }}
                />
                <Chip
                  icon={<AddIcon fontSize="small" />}
                  label="Add Custom"
                  onClick={() => setCustomOpen(true)}
                  variant="outlined"
                  size="medium"
                  sx={{
                    borderColor: "#F59E0B",
                    color: "#F59E0B",
                    "&:hover": {
                      bgcolor: "rgba(245, 158, 11, 0.1)",
                      borderColor: "#F59E0B",
                    },
                  }}
                />
              </Box>

              {restaurants && restaurants.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {restaurants.length} restaurant
                  {restaurants.length === 1 ? "" : "s"}
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>

        {/* Restaurant Cards */}
        <Stack spacing={2} sx={{ mb: 40 }}>
          {restaurants ? (
            restaurants.map((restaurant) => (
              <Card
                key={restaurant.id}
                sx={{
                  p: 0,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  background:
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    "& .restaurant-image": {
                      transform: "scale(1.05)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      "linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover::before": {
                    opacity: 1,
                  },
                }}
              >
                {/* Remove Button */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRestaurant(restaurant.id);
                  }}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    bgcolor: "rgba(15, 17, 21, 0.8)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "error.main",
                      borderColor: "error.main",
                      color: "error.contrastText",
                      transform: "rotate(90deg)",
                    },
                  }}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                <Box
                  sx={{
                    display: "flex",
                    gap: 0,
                    minHeight: 140,
                    position: "relative",
                  }}
                >
                  {/* Restaurant Image */}
                  {restaurant?.image_url && (
                    <Box
                      component="img"
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="restaurant-image"
                      sx={{
                        width: 140,
                        minHeight: 140,
                        objectFit: "cover",
                        flexShrink: 0,
                        transition: "transform 0.3s ease",
                      }}
                    />
                  )}

                  {/* Info - Overlapping Card */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      ml: 0,
                      bgcolor: "background.paper",
                      // borderRadius: "4px",
                      boxShadow:
                        "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
                      zIndex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Stack
                      spacing={1.2}
                      sx={{
                        p: 2.5,
                        height: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.2,
                          fontSize: "1rem",
                        }}
                      >
                        {restaurant.name}
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          fontSize: "0.75rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {restaurant.location?.display_address?.join(", ") ||
                          restaurant.location?.address1}
                      </Typography>

                      {restaurant.categories &&
                        restaurant.categories.length > 0 && (
                          <Box
                            sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
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

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {restaurant.price && (
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="primary.main"
                          >
                            {restaurant.price}
                          </Typography>
                        )}
                        {restaurant.rating && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body2" fontWeight={500}>
                              ⭐ {restaurant.rating}
                            </Typography>
                            {restaurant.review_count && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ({restaurant.review_count})
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>

                      {restaurant.url && (
                        <Link
                          href={restaurant.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "primary.main",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          View on Yelp →
                        </Link>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Card>
            ))
          ) : (
            <Stack spacing={2}>
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  sx={{
                    p: 0,
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, rgba(224, 79, 63, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 0 }}>
                    <Skeleton variant="rectangular" width={120} height={140} />
                    <Stack spacing={1} flexGrow={1} sx={{ p: 2 }}>
                      <Skeleton variant="text" width="70%" height={28} />
                      <Skeleton variant="text" width="90%" />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Skeleton variant="rounded" width={60} height={20} />
                        <Skeleton variant="rounded" width={80} height={20} />
                      </Box>
                      <Skeleton variant="text" width="40%" />
                    </Stack>
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>
      </SlideIn>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="New restaurants loaded"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default RPreview;

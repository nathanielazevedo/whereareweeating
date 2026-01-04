import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SlideIn from "../../components/SlideIn";
import { logo } from "../../assets";
import { yelp_logo } from "../../assets/yelp";
import {
  toMiles,
  toMeters,
  rFormSchema,
  RFormType,
  typeOptions,
} from "./CreateHelpers";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Slider,
  MenuItem,
  Stack,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

type Props = {
  formData: RFormType;
  rError: string | null;
  fetchRestaurants: (formData: RFormType) => void;
};

const RForm = ({ rError, formData, fetchRestaurants }: Props) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <SlideIn>
        <Formik
          initialValues={formData}
          onSubmit={fetchRestaurants}
          validationSchema={rFormSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            const handleUseMyLocation = async () => {
              if (!navigator.geolocation) {
                alert("Geolocation is not supported by your browser");
                return;
              }

              setLoadingLocation(true);
              navigator.geolocation.getCurrentPosition(
                async (position) => {
                  const { latitude, longitude } = position.coords;
                  try {
                    const response = await fetch(
                      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    // Build the most specific location string possible
                    const city =
                      data.address?.city ||
                      data.address?.town ||
                      data.address?.village ||
                      "";
                    const state = data.address?.state || "";
                    const postcode = data.address?.postcode || "";

                    // Prioritize: "City, State Zipcode" or just "Zipcode" if no city
                    let locationString = "";
                    if (city && state && postcode) {
                      locationString = `${city}, ${state} ${postcode}`;
                    } else if (city && state) {
                      locationString = `${city}, ${state}`;
                    } else if (postcode) {
                      locationString = postcode;
                    } else if (city) {
                      locationString = city;
                    } else {
                      locationString = `${latitude.toFixed(
                        4
                      )}, ${longitude.toFixed(4)}`;
                    }

                    setFieldValue("location", locationString);
                  } catch (error) {
                    console.error("Error fetching location:", error);
                    setFieldValue(
                      "location",
                      `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
                    );
                  } finally {
                    setLoadingLocation(false);
                  }
                },
                (error) => {
                  console.error("Error getting location:", error);
                  alert("Unable to retrieve your location");
                  setLoadingLocation(false);
                }
              );
            };

            return (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Box
                    component="img"
                    src={logo}
                    alt="Where are we eating?"
                    onClick={() => navigate("/")}
                    sx={{
                      height: "88px",
                      width: "auto",
                      mb: -5,
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Box>
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
                >
                  <TextField
                    name="location"
                    label="City Name or Zip Code"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    required
                    helperText={touched.location && errors.location}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" variant="filled">
                          <Tooltip title="Use my location" arrow>
                            <IconButton
                              onClick={handleUseMyLocation}
                              disabled={loadingLocation}
                              edge="end"
                              sx={{
                                color: "#F59E0B",
                                "&:hover": {
                                  bgcolor: "rgba(245, 158, 11, 0.1)",
                                  borderColor: "#FBBF24",
                                },
                                "&:disabled": {
                                  borderColor: "rgba(245, 158, 11, 0.3)",
                                  color: "rgba(245, 158, 11, 0.3)",
                                },
                              }}
                            >
                              {loadingLocation ? (
                                <CircularProgress
                                  size={20}
                                  sx={{ color: "#F59E0B" }}
                                />
                              ) : (
                                <MyLocationIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "#F59E0B",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#F59E0B",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#F59E0B",
                      },
                    }}
                  />

                  <Box
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    sx={{
                      cursor: "pointer",
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {showAdvanced ? "▼" : "▶"} Advanced Options
                  </Box>

                  {showAdvanced && (
                    <Box
                      sx={{
                        p: 2.5,
                        borderRadius: "12px",
                        border: "1px solid",
                        borderColor: "rgba(245, 158, 11, 0.2)",
                        bgcolor: "rgba(245, 158, 11, 0.03)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Stack spacing={2}>
                        <TextField
                          select
                          name="type"
                          label="Type of Place"
                          variant="outlined"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.type}
                          error={Boolean(touched.type) && Boolean(errors.type)}
                          helperText={
                            errors.type && touched.type
                              ? errors.type
                              : "Choose a category"
                          }
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#F59E0B",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#F59E0B",
                              },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "#F59E0B",
                            },
                          }}
                        >
                          {typeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>

                        <TextField
                          select
                          name="price"
                          label="Max Price"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          required
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": {
                                borderColor: "#F59E0B",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#F59E0B",
                              },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                              color: "#F59E0B",
                            },
                          }}
                        >
                          <MenuItem value="0">No Limit</MenuItem>
                          <MenuItem value="1">$</MenuItem>
                          <MenuItem value="2">$$</MenuItem>
                          <MenuItem value="3">$$$</MenuItem>
                          <MenuItem value="4">$$$$</MenuItem>
                        </TextField>

                        <Box>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color="#F59E0B"
                            mb={2}
                            display="block"
                          >
                            DISTANCE RANGE
                          </Typography>
                          <Box
                            width="100%"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={2}
                            >
                              <Typography fontWeight={500}>
                                Max Distance From Location
                              </Typography>
                              <Box
                                sx={{
                                  px: 2,
                                  py: 0.5,
                                  borderRadius: "20px",
                                  bgcolor: "#F59E0B",
                                }}
                              >
                                <Typography fontWeight={700} color="#000000">
                                  {toMiles(values.max_distance)} miles
                                </Typography>
                              </Box>
                            </Box>
                            <Box sx={{ mr: 1 }}>
                              <Slider
                                min={1}
                                step={1}
                                max={24}
                                marks={[
                                  { value: 1, label: "1" },
                                  { value: 5, label: "5" },
                                  { value: 10, label: "10" },
                                  { value: 15, label: "15" },
                                  { value: 20, label: "20" },
                                  { value: 24, label: "24" },
                                ]}
                                valueLabelDisplay="auto"
                                aria-label="Max Distance"
                                value={toMiles(values.max_distance)}
                                onChange={(_e, value) =>
                                  setFieldValue(
                                    "max_distance",
                                    toMeters(value as number)
                                  )
                                }
                                sx={{
                                  color: "#F59E0B",
                                  "& .MuiSlider-thumb": {
                                    bgcolor: "#F59E0B",
                                    "&:hover, &.Mui-focusVisible": {
                                      boxShadow:
                                        "0 0 0 8px rgba(245, 158, 11, 0.16)",
                                    },
                                  },
                                  "& .MuiSlider-track": {
                                    bgcolor: "#F59E0B",
                                  },
                                  "& .MuiSlider-rail": {
                                    opacity: 0.3,
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Stack>
                    </Box>
                  )}

                  <Box
                    component="button"
                    type="submit"
                    sx={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "5px",
                      border: "2px solid #F59E0B",
                      bgcolor: "transparent",
                      color: "#F59E0B",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(245, 158, 11, 0.1)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                      },
                      "&:active": {
                        transform: "translateY(0)",
                      },
                    }}
                  >
                    Find Places
                  </Box>

                  {/* Powered by Yelp */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      Powered by
                    </Typography>
                    <Box
                      component="img"
                      src={yelp_logo}
                      alt="Yelp"
                      sx={{
                        height: "24px",
                        width: "auto",
                        opacity: 0.7,
                      }}
                    />
                  </Box>

                  {rError && (
                    <Typography color="error" mt="px">
                      {rError}
                    </Typography>
                  )}
                </FormControl>
              </form>
            );
          }}
        </Formik>
      </SlideIn>
    </>
  );
};

export default RForm;

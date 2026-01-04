import { Box, Typography, Stack, Button } from "@mui/material";
import { constants } from "../../constants";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <Box sx={styles.outerContainer}>
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.06) 0%, transparent 50%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        /> */}
        <Box sx={styles.innerContainer}>
          <Box sx={styles.copyColumn}>
            <Box sx={{ textAlign: "left" }}>
              <Box
                sx={{
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  mb: 2,
                  borderRadius: "20px",
                  bgcolor: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: "#F59E0B" }}
                >
                  ✨ Stop the indecision
                </Typography>
              </Box>
              <Typography
                variant="h3"
                fontWeight={700}
                mb={2}
                sx={{
                  lineHeight: 1.2,
                  fontSize: { xs: "2.5rem", sm: "3rem" },
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #F59E0B 50%, #FBBF24 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textAlign: "left",
                }}
              >
                Where are we eating?
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight={400}
                sx={{
                  lineHeight: 1.7,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  mb: 1,
                  textAlign: "left",
                }}
              >
                Stop the group chat chaos. Everyone votes on restaurants
                anonymously, and we'll show you the top picks.
              </Typography>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#F59E0B" }}
                  >
                    Fast
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#F59E0B" }}
                  >
                    Anonymous
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    •
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: "#F59E0B" }}
                  >
                    Free
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Link
              to="/party/create"
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontWeight: "bold",
                }}
              >
                CREATE A PARTY
              </Button>
            </Link>
          </Box>

          <Stack
            spacing={3}
            sx={{
              display: { xs: "none", lg: "flex" },
              width: "100%",
              maxWidth: "400px",
            }}
          >
            {constants.marketingCards.map((step, index) => (
              <Box
                key={step.title}
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                  p: 2.5,
                  borderRadius: "12px",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "rgba(24, 27, 34, 0.5)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#F59E0B",
                    bgcolor: "rgba(245, 158, 11, 0.05)",
                    transform: "translateX(8px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    bgcolor: "#F59E0B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                  }}
                >
                  <Typography variant="h6" fontWeight={700} color="#000000">
                    {index + 1}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600} mb={0.5}>
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Hero;

const styles = {
  outerContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    py: { xs: 6, md: 8 },
  },
  innerContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: { xs: "95%", sm: "90%", lg: "1100px" },
    justifyContent: { xs: "flex-start", lg: "space-between" },
    gap: { xs: "48px", lg: "96px" },
    flexDirection: { xs: "column", lg: "row" },
    position: "relative",
    zIndex: 1,
  },
  copyColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
    maxWidth: "520px",
    alignItems: { xs: "flex-start", lg: "flex-start" },
  },
};

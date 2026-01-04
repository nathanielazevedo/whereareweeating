import { Box, Typography, Stack, Card, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import CodeIcon from "@mui/icons-material/Code";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { logo } from "../../assets";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navigation */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          bgcolor: "background.default",
          borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
          backdropFilter: "blur(10px)",
          py: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Where are we eating?"
            onClick={() => navigate("/")}
            sx={{
              height: "60px",
              width: "auto",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* Header Section */}
        <Stack spacing={3} mb={6}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: "20px",
              bgcolor: "rgba(245, 158, 11, 0.1)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              width: "fit-content",
            }}
          >
            <RestaurantIcon sx={{ color: "#F59E0B", fontSize: 20 }} />
            <Typography
              variant="caption"
              fontWeight={600}
              sx={{ color: "#F59E0B" }}
            >
              About the Creator
            </Typography>
          </Box>

          <Typography
            variant="h2"
            fontWeight={700}
            sx={{
              lineHeight: 1.2,
              fontSize: { xs: "2.5rem", sm: "3rem" },
              background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Hey, I'm Nate
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              lineHeight: 1.7,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Where are we eating? was built by me as a side project to solve a
            problem we all face: deciding where to eat with friends.
          </Typography>
        </Stack>

        {/* Story Card */}
        <Card
          sx={{
            p: 4,
            mb: 4,
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
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
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CodeIcon sx={{ color: "#F59E0B", fontSize: 28 }} />
              <Typography variant="h5" fontWeight={700}>
                Built with passion
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              I'm a full-stack developer with a passion for building beautiful
              and functional web applications. This project combines my love for
              coding with solving real-world problems. No more endless group
              chat debates about where to eat – just quick, anonymous voting and
              instant results.
            </Typography>
          </Stack>
        </Card>

        {/* Social Links */}
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={700}>
            Connect with me
          </Typography>

          <Stack direction="row" spacing={2}>
            <a
              href="https://www.linkedin.com/in/nateazevedo/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#F59E0B",
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    sx={{
                      bgcolor: "#0A66C2",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#004182",
                      },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      LinkedIn
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Professional network
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </a>

            <a
              href="https://github.com/nathanielazevedo"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "#F59E0B",
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(245, 158, 11, 0.2)",
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    sx={{
                      bgcolor: "#181717",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#000",
                      },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      GitHub
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Open source code
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </a>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default About;

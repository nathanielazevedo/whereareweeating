import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { yelp_logo } from "../../assets/yelp";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid",
        borderColor: "rgba(245, 158, 11, 0.15)",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(245, 158, 11, 0.03) 100%)",
        py: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          width: { xs: "95%", sm: "90%", lg: "1100px" },
          gap: { xs: 3, lg: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            textAlign: { xs: "center", lg: "left" },
          }}
        >
          <Typography
            variant="h6"
            letterSpacing=".15rem"
            fontWeight="700"
            sx={{
              background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.1rem",
            }}
          >
            WHERE ARE WE EATING?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: { xs: "center", lg: "flex-start" },
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" color="text.secondary" fontWeight="300">
              © 2023
            </Typography>
            <Typography variant="body2" color="text.secondary">
              •
            </Typography>
            <Typography
              component="a"
              href="mailto:contactchickentinder@gmail.com"
              variant="body2"
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
                cursor: "pointer",
                fontWeight: "300",
              }}
            >
              contactchickentinder@gmail.com
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, sm: 4 },
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link to="/party/about" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#F59E0B" },
                transition: "color 0.2s",
                fontWeight: "400",
              }}
            >
              About
            </Typography>
          </Link>
          <Link to="/party/contact" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#F59E0B" },
                transition: "color 0.2s",
                fontWeight: "400",
              }}
            >
              Contact
            </Typography>
          </Link>
          <Link to="/terms" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#F59E0B" },
                transition: "color 0.2s",
                fontWeight: "400",
              }}
            >
              Terms
            </Typography>
          </Link>
          <Link to="/disclaimer" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#F59E0B" },
                transition: "color 0.2s",
                fontWeight: "400",
              }}
            >
              Disclaimer
            </Typography>
          </Link>
          <Link to="/privacy-policy" style={{ textDecoration: "none" }}>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "#F59E0B" },
                transition: "color 0.2s",
                fontWeight: "400",
              }}
            >
              Privacy Policy
            </Typography>
          </Link>
        </Box>

        {/* Powered by Yelp */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", lg: "flex-end" },
            gap: 1,
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.75rem" }}
          >
            Powered by
          </Typography>
          <Box
            component="img"
            src={yelp_logo}
            alt="Yelp"
            sx={{
              height: "30px",
              width: "auto",
              opacity: 0.8,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

import { Box, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import MainButton from "../../components/MainButton";
import { logo } from "../../assets";

const NavBar = ({ myPartys }: { myPartys?: boolean }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        overflowX: "hidden",
        backgroundColor: "background.default",
        borderBottom: "1px solid",
        borderColor: "rgba(245, 158, 11, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(8px)",
        borderRadius: 0,
      }}
    >
      <Container
        sx={{
          width: { xs: "90%", sm: "90%", lg: "1100px" },
          maxWidth: { xs: "100%", sm: "90%", lg: "1100px" },
          padding: "0 !important",
          margin: "0 !important",
          display: "flex",
          justifyContent: "space-between",
          "& MuiContainer-root": {
            padding: "0 !important",
            margin: "0 !important",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            py: 2.5,
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Where are we eating?"
              sx={{
                height: { xs: "56px", sm: "64px" },
                width: "auto",
                filter: "drop-shadow(0 2px 8px rgba(245, 158, 11, 0.15))",
              }}
            />
          </Link>
          {myPartys && (
            <Box
              onClick={() => navigate("/party/my-parties")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "5px",
                border: "1.5px solid #F59E0B",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "rgba(245, 158, 11, 0.1)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: "#F59E0B" }}
              >
                My Parties
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;

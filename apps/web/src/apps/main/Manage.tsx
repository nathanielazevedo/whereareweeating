import API from "../../api";
import Results from "./Results";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { fetchParty, endParty as rEndParty } from "../../state";
import { Box, Skeleton, Typography, Button, Stack, Card } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/redux";
import { logo } from "../../assets";
import PeopleIcon from "@mui/icons-material/People";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Manage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [winner, setWinner] = useState(false);
  const party = useAppSelector((state) => state.party);

  useEffect(() => {
    try {
      if (!id || party) return;
      dispatch(fetchParty(id));
    } catch {
      navigate("/party" + id);
    }
  }, [dispatch, id, navigate, party]);

  //todo move this into redux
  const endParty = async () => {
    try {
      if (!id || !party) return;
      dispatch(rEndParty(id));
      await API.endParty(id);
      setWinner(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (winner) return <Results />;
  if (!party) return <Loading />;
  return (
    <>
      {party && (
        <Box>
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

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight={600} mb={1}>
              {party.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your party settings
            </Typography>
          </Box>

          {!party.r_winner && (
            <Button
              fullWidth
              variant="contained"
              onClick={endParty}
              sx={{
                height: "56px",
                bgcolor: "#F59E0B",
                color: "#000000",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: 700,
                textTransform: "none",
                mb: 3,
                "&:hover": {
                  bgcolor: "#D97706",
                },
              }}
            >
              End Voting & See Results
            </Button>
          )}

          <Stack spacing={2}>
            <Card
              sx={{
                p: 2.5,
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(245, 158, 11, 0.15)",
                  }}
                >
                  <PeopleIcon sx={{ fontSize: 28, color: "#F59E0B" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {party?.voters_so_far !== undefined ? (
                      `${party?.voters_so_far} / ${party?.max_voters}`
                    ) : (
                      <Skeleton variant="text" width={80} />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Voters
                  </Typography>
                </Box>
              </Box>
            </Card>

            <Card
              sx={{
                p: 2.5,
                background:
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(245, 158, 11, 0.15)",
                  }}
                >
                  <RestaurantIcon sx={{ fontSize: 28, color: "#F59E0B" }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {party?.restaurants !== undefined ? (
                      `${party?.restaurants.length}`
                    ) : (
                      <Skeleton variant="text" width={50} />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {party?.type || "Places"}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {party.hours_to_vote_on && party.hours_to_vote_on.length > 0 && (
              <Card
                sx={{
                  p: 2.5,
                  background:
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(245, 158, 11, 0.15)",
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 28, color: "#F59E0B" }} />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {party.hours_to_vote_on.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Time slots
                    </Typography>
                  </Box>
                </Box>
              </Card>
            )}

            {party.days_to_vote_on && party.days_to_vote_on.length > 0 && (
              <Card
                sx={{
                  p: 2.5,
                  background:
                    "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(24, 27, 34, 0) 100%)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "rgba(245, 158, 11, 0.15)",
                    }}
                  >
                    <CalendarTodayIcon
                      sx={{ fontSize: 28, color: "#F59E0B" }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight={600}>
                      {party.days_to_vote_on.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Days
                    </Typography>
                  </Box>
                </Box>
              </Card>
            )}
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Manage;

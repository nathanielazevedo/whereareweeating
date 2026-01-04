import { Box, Card, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { toMiles } from "../../create/CreateHelpers";
import { Party } from "../../../models/Party";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type Props = {
  party: Party;
  onManageClick: any;
};

const PartyHeader = ({ party }: Props) => {
  return (
    <Card
      sx={{
        p: 2.5,
        background:
          "linear-gradient(135deg, rgba(224, 79, 63, 0.08) 0%, rgba(24, 27, 34, 0) 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #E04F3F 0%, #F2A93B 100%)",
        },
      }}
    >
      <Stack spacing={2}>
        {/* Party Name */}
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {party.name ?? <Skeleton variant="text" width={200} />}
          </Typography>
        </Box>

        {/* Location & Type */}
        {party.max_distance && party.location ? (
          <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
            <LocationOnIcon
              sx={{ color: "primary.main", fontSize: 20, mt: 0.3 }}
            />
            <Box>
              <Typography variant="body2" fontWeight={500}>
                {party.location}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {party.type} • Within {toMiles(party.max_distance)} miles
              </Typography>
            </Box>
          </Box>
        ) : (
          <Skeleton variant="text" width={200} />
        )}

        {/* Additional Options */}
        {(party.vote_on_days || party.vote_on_hours) && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {party.vote_on_days && (
              <Chip
                label="Voting on Days"
                size="small"
                sx={{
                  bgcolor: "rgba(224, 79, 63, 0.1)",
                  color: "text.secondary",
                  border: "1px solid rgba(224, 79, 63, 0.2)",
                }}
              />
            )}
            {party.vote_on_hours && (
              <Chip
                label="Voting on Time"
                size="small"
                sx={{
                  bgcolor: "rgba(224, 79, 63, 0.1)",
                  color: "text.secondary",
                  border: "1px solid rgba(224, 79, 63, 0.2)",
                }}
              />
            )}
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default PartyHeader;

import { logo_p_trans } from "../../assets";
import { Box, Divider } from "@mui/material";
import TwoStack from "../../components/TwoStack";

const SectionThree = () => (
  <>
    <Divider />
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <TwoStack
          noButton={true}
          variant="body"
          title="Download Where are we eating?"
          body="An app without an app store. Save Where are we eating? to your home screen and use it like an app."
        />
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
            padding: "10px",
            backgroundColor: "background.paper",
          }}
        >
          <img src={logo_p_trans} width="150px" alt="logo" />
        </Box>
      </Box>
    </Box>
    <Divider />
  </>
);

export default SectionThree;

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: { xs: "70px 0", lg: "0" },
    height: { xs: "100%", lg: "50vh" },
  },
  innerContainer: {
    display: "flex",
    gap: { xs: "40px" },
    alignItems: "center",
    flexDirection: { xs: "column", lg: "row" },
    width: { xs: "95%", sm: "90%", md: "1100px" },
    justifyContent: { xs: "center", md: "space-between" },
  },
};

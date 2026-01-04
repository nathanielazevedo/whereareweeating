import Hero from "./Hero";
import Footer from "./Footer";
import NavBar from "./Navbar";
import FeedbackSection from "./FeedbackSection";
import { useEffect, useState } from "react";
import {
  getPartiesFromLocal,
  haveLocalParties,
} from "../../utils/localStorage";
import { Box } from "@mui/material";

const Intro = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [myParties, setMyParties] = useState<any>([]);

  useEffect(() => {
    if (haveLocalParties()) setMyParties(getPartiesFromLocal());
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar myPartys={myParties.length > 0} />
      <Hero />
      <FeedbackSection />
      <Footer />
    </Box>
  );
};

export default Intro;

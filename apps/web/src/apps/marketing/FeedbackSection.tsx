import { useState } from "react";
import { Box, Typography, Button, TextField, Stack } from "@mui/material";
import { baseUrl } from "../../api";

const FeedbackSection = () => {
  const [step, setStep] = useState<"initial" | "feedback" | "thanks">(
    "initial"
  );
  const [liked, setLiked] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = (value: boolean) => {
    setLiked(value);
    setStep("feedback");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          liked,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setStep("thanks");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStep("thanks");
    } finally {
      setIsSubmitting(false);

      setTimeout(() => {
        setStep("initial");
        setLiked(null);
        setMessage("");
      }, 3000);
    }
  };

  const handleSkip = () => {
    setStep("thanks");
    setTimeout(() => {
      setStep("initial");
      setLiked(null);
      setMessage("");
    }, 3000);
  };

  return (
    <Box
      sx={{
        py: 8,
        borderTop: "1px solid rgba(245, 158, 11, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 6,
          justifyContent: "space-between",
          width: { xs: "95%", sm: "90%", lg: "1100px" },
        }}
      >
        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Thank You
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: 1.7,
              fontSize: "1.1rem",
            }}
          >
            We've grown way beyond what I imagined. Your feedback helps us build
            something even better.
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: 380 },
            maxWidth: 380,
          }}
        >
          <Box>
            <Box>
              {step === "initial" && (
                <Stack spacing={2.5}>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    How's it going?
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      onClick={() => handleLike(true)}
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(34, 197, 94, 0.15)",
                        color: "#22C55E",
                        textTransform: "none",
                        flex: 1,
                        py: 1.2,
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        "&:hover": {
                          backgroundColor: "rgba(34, 197, 94, 0.25)",
                        },
                      }}
                    >
                      Great
                    </Button>
                    <Button
                      onClick={() => handleLike(false)}
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(239, 68, 68, 0.15)",
                        color: "#EF4444",
                        textTransform: "none",
                        flex: 1,
                        py: 1.2,
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        "&:hover": {
                          backgroundColor: "rgba(239, 68, 68, 0.25)",
                        },
                      }}
                    >
                      Not great
                    </Button>
                  </Stack>
                </Stack>
              )}

              {step === "feedback" && (
                <Stack spacing={2.5}>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.9)",
                      fontSize: "1rem",
                      fontWeight: 500,
                    }}
                  >
                    {liked ? "What's working?" : "What needs work?"}
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    placeholder="Optional"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "rgba(255, 255, 255, 0.9)",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        "& fieldset": {
                          borderColor: "rgba(245, 158, 11, 0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(245, 158, 11, 0.4)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#F59E0B",
                        },
                      },
                    }}
                  />
                  <Stack direction="row" spacing={2}>
                    <Button
                      onClick={handleSkip}
                      variant="text"
                      sx={{
                        color: "rgba(255, 255, 255, 0.5)",
                        textTransform: "none",
                        "&:hover": {
                          color: "rgba(255, 255, 255, 0.7)",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Skip
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      variant="contained"
                      sx={{
                        backgroundColor: "#F59E0B",
                        color: "white",
                        textTransform: "none",
                        flex: 1,
                        py: 1.2,
                        "&:hover": {
                          backgroundColor: "#D97706",
                        },
                        "&:disabled": {
                          backgroundColor: "rgba(245, 158, 11, 0.5)",
                        },
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </Button>
                  </Stack>
                </Stack>
              )}

              {step === "thanks" && (
                <Box>
                  <Typography
                    sx={{
                      color: "#F59E0B",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      mb: 0.5,
                    }}
                  >
                    Thanks!
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Your feedback helps us improve.
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackSection;
